<?php

namespace App\Services;

use App\Models\Otp;
use App\Mail\OtpMail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class OtpService
{
    /**
     * Tạo và gửi OTP
     */
    public function sendOtp($email)
    {
        // Xóa OTP cũ nếu có
        Otp::where('email', $email)->delete();

        // Tạo OTP mới
        $otp = $this->generateOtp();
        $expiresAt = Carbon::now()->addMinutes(5);

        // Lưu OTP vào database
        Otp::create([
            'email' => $email,
            'otp' => $otp,
            'expires_at' => $expiresAt,
            'used' => false
        ]);

        // Gửi email
        Mail::to($email)->send(new OtpMail($otp, $email));

        return true;
    }

    /**
     * Xác thực OTP
     */
    public function verifyOtp($email, $otp)
    {
        $otpRecord = Otp::where('email', $email)
            ->where('otp', $otp)
            ->where('used', false)
            ->where('expires_at', '>', Carbon::now())
            ->first();

        if ($otpRecord) {
            // Đánh dấu OTP đã dùng
            $otpRecord->markAsUsed();

            // Cập nhật user đã xác thực email
            $user = User::where('email', $email)->first();
            if ($user && is_null($user->email_verified_at)) {
                $user->email_verified_at = now();
                $user->save();
            }

            return true;
        }
        return false;
    }

    /**
     * Tạo mã OTP ngẫu nhiên 6 số
     */
    private function generateOtp()
    {
        return str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
    }

    /**
     * Kiểm tra xem email có OTP hợp lệ không
     */
    public function hasValidOtp($email)
    {
        return Otp::where('email', $email)
            ->where('used', false)
            ->where('expires_at', '>', Carbon::now())
            ->exists();
    }
}
