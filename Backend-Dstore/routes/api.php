<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\OtpController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('signup', [AuthController::class, 'signup']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('refresh-token', [AuthController::class, 'refreshToken']);
    Route::post('send-otp', [OtpController::class, 'send']);
    Route::post('verify-otp', [OtpController::class, 'verify']);
    Route::post('checkout', [CheckoutController::class, 'store']);
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
Route::get('chi-tiet-san-pham/{slug}',[ProductController::class,'getProductsBySlug']);
Route::get('san-pham-sale',[ProductController::class,'getProductSale']);
Route::get('san-pham-noi-bat',[ProductController::class,'getBestSellingProducts']);
});

Route::get('banners',[BannerController::class,'getBanners']);

Route::get('search',[ProductController::class,'searchProduts']);

Route::get('vnpay/return', [CheckoutController::class, 'vnpayReturn'])->name('vnpay.return');
Route::post('vnpay/ipn', [CheckoutController::class, 'vnpayIPN'])->name('vnpay.ipn');
