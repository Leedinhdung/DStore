<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Middleware\AdminAuthenticate;
use Illuminate\Support\Facades\Route;

Route::prefix('quan-tri')->as('admin.')->group(function () {

    // 👉 Các route không cần đăng nhập
    Route::get('/dang-nhap', [AuthController::class, 'index'])->name('login');
    Route::post('/dang-nhap', [AuthController::class, 'login'])->name('login');

    // 👉 Các route cần đăng nhập
    Route::middleware(AdminAuthenticate::class)->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/dang-xuat', [AuthController::class, 'logout'])->name('logout');
    });

});
 