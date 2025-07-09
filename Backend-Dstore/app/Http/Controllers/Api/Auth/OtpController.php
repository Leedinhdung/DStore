<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Services\OtpService;
use Illuminate\Http\Request;

class OtpController extends Controller
{
    protected $otpService;

    public function __construct(OtpService $otpService)
    {
        $this->otpService = $otpService;
    }

    // Gửi OTP về email
    public function send(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);
        $this->otpService->sendOtp($request->email);
        return response()->json(['message' => 'OTP đã được gửi về email!']);
    }

    // Xác thực OTP
    public function verify(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:6',
        ]);
        $result = $this->otpService->verifyOtp($request->email, $request->otp);
        if ($result) {
            return response()->json(['message' => 'Đăng ký thành công!']);
        }
        return response()->json(['message' => 'OTP không hợp lệ hoặc đã hết hạn!'], 422);
    }
}
