<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\OtpController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('signup', [AuthController::class, 'signup']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('refresh-token', [AuthController::class, 'refreshToken']);
    Route::post('send-otp', [OtpController::class, 'send']);
    Route::post('verify-otp', [OtpController::class, 'verify']);
});
Route::middleware('auth:sanctum')->group(function(){
    Route::prefix('auth')->group(function(){
        Route::post('logout',[AuthController::class,'logout']);
    });
});

Route::prefix('categories')->group(function(){
Route::get('danh-muc',[CategoryController::class,'getCategories']);
});
Route::prefix('products')->group(function(){
Route::get('san-pham',[ProductController::class,'getProducts']);
Route::get('san-pham/{slug}',[ProductController::class,'getProductsByCategory']);
});

Route::get('banners',[BannerController::class,'getBanners']);

