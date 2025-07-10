<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Auth\LoginRequest;
use App\Http\Requests\Client\Auth\SignupRequest;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Otp;
use App\Mail\OtpMail;
use App\Models\RefreshToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        DB::beginTransaction();

        try {
            $data = $request->all();
            $otpCode = rand(100000, 999999);
            $expiresAt = Carbon::now()->addMinutes(10);

            $user = User::where('email', $data['email'])->first();

            if ($user) {
                if ($user->email_verified_at !== null) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Email này đã được sử dụng'
                    ], 400);
                }
            } else {
                $user = User::create([
                    'full_name' => $data['full_name'],
                    'email' => $data['email'],
                    'password' => bcrypt($data['password']),
                ]);
            }

            Otp::create([
                'user_id' => $user->id,
                'email' => $user->email,
                'otp' => $otpCode,
                'expires_at' => $expiresAt
            ]);

            Mail::to($data['email'])->queue(new OtpMail($otpCode, $data['email']));

            DB::commit();

            return response()->json([
                'message' => 'Mã OTP đã được gửi tới email của bạn',
                'status' => 201,
            ], 201);
        } catch (\Exception $exception) {
            DB::rollBack();

            return response()->json([
                'status' => 'error',
                'message' => 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.',
                'debug' => config('app.debug') ? $exception->getMessage() : null
            ], 500);
        }
    }
    public function login(LoginRequest $request)
    {
        try {
            $credentials = $request->validated();
            $errors = [];
            $user = User::where('email', $credentials['email'])->first();
            if (!$user) {
                $errors[] = [
                    'email' => 'Email không tồn tại'
                ];
            }
            if ($user && !Hash::check($credentials['password'], $user->password)) {
                $errors[] = [
                    'password' => 'Mật khẩu không chính xác'
                ];
            }
            if (!empty($errors)) {
                return response()->json([
                    'message' => 'Đã xảy ra lỗi xác thực',
                    'errors' => $errors,
                    'data' => [],
                    'status' => 422,
                ], 422);
            }
            Auth::login($user);
            $user = Auth::user();
            if (!$user->email_verified_at) {
                return response()->json([
                    'message' => 'Vui lòng xác nhận email trước khi đăng nhập',
                    'status' => 403,
                ], 403);
            }
            $token = $user->createToken('main', expiresAt: now()->addMinutes(config('sanctum.expiration')))->plainTextToken;
            $refreshToken = Str::random(60);

            $user->refreshTokens()->create([
                'token' => $refreshToken,
                'expires_at' => now()->addDays(30)
            ]);
            $cookie = cookie('refresh_token', $refreshToken, 43200, null, null, true, true, false, 'None');
            return response()->json([
                'message' => 'Đăng nhập thành công',
                'data' => [
                    'access_token' => $token,
                    'user' => $user->makeHidden('profile'),
                    'profile' => $user->profile
                ],
                'status' => 200,
            ], 200)->withCookie($cookie);
        } catch (Throwable $e) {
            Log::error("Login Exception", [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'message' => 'Đã xảy ra lỗi trong quá trình đăng nhập.',
                'data' => [],
                'status' => 500,
            ], 500);
        }
    }
    public function refreshToken(Request $request)
    {
        try {
            $refreshToken = $request->cookie('refresh_token');
            $token = RefreshToken::where('token', $refreshToken)->first();
            if (!$token || $token->expires_at < now()) {
                return response()->json([
                    'message' => 'Refresh token không hợp lệ hoặc đã hết hạn',
                    'status' => 400
                ], 400)->cookie(cookie(
                    'refresh_token',
                    '',
                    -1,
                    null,
                    null,
                    true,
                    true,
                    true,
                    'None'
                ));
            }
            $user = $token->user;
            $user->tokens()->delete();


            $newToken = $user->createToken('main', expiresAt: now()->addMinutes(config('sanctum.expiration')))->plainTextToken;
            $newRefreshToken = Str::random(60);
            $token->update([
                'token' => $newRefreshToken,
                'expires_at' => now()->addDays(30)
            ]);
            $cookie = cookie(
                'refresh_token',
                $refreshToken,
                43200,
                null,
                null,
                true,
                true,
                false,
                'None'
            );
            return response()->json([
                'message' => 'Refresh token thành công.',
                'data' => [
                    'access_token' => $newToken,
                ],
                'status' => 200,
            ], 200)->cookie($cookie);
        } catch (Throwable $e) {
            Log::error("Error: " . $e->getMessage());
            return response()->json([
                'message' => [
                    'msg' => 'Đã xảy ra lỗi khi làm mới token.',
                    'errors' => $e->getMessage()
                ],
                'data' => [],
                'status' => 500,
            ], 500);
        }
    }
    public function logout(Request $request)
    {
        try {
            $user = $request->user();
            $refreshToken = $request->cookie('refresh_token');
            RefreshToken::where('token', $refreshToken)->delete();
            $user->currentAccessToken()->delete();

            $cookie = cookie(
                'refresh_token',
                '',
                -1,
                null,
                null,
                true,
                true,
                true,
                'None'
            );
            return response()->json([
                'message' => 'Đăng xuất thành công.',
                'data' => [],
                'status' => 200,
            ], 200)->withCookie($cookie);
        } catch (Throwable $e) {
            Log::error("Error: " . $e->getMessage());
            return response()->json([
                'message' => 'Đã xảy ra lỗi trong quá trình đăng xuất.',
                'data' => [],
                'status' => 500,
            ], 500);
        }
    }
}
