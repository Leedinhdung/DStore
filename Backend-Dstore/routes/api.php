<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\OtpController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('signup', [AuthController::class, 'signup']);
    Route::post('send-otp', [OtpController::class, 'send']);
    Route::post('verify-otp', [OtpController::class, 'verify']);
});
