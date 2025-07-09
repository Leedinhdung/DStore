<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Auth\SignupRequest;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Otp;
use App\Mail\OtpMail;
use Illuminate\Http\Request;

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
                'email'=>$user->email,
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
}
