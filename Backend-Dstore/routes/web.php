<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\BannerController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\CategoryController;

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


        //Banner
        Route::prefix('banner')->as('banner.')->group(function () {
            Route::get('/danh-sach', [BannerController::class, 'index'])->name('index');
            Route::get('/danh-sach/them-moi', [BannerController::class, 'create'])->name('create');
            Route::get('/danh-sach/sua/{id}', [BannerController::class, 'edit'])->name('edit');
            Route::put('/danh-sach/sua/{id}', [BannerController::class, 'edit'])->name('update');
        });

        //Category
        Route::prefix('danh-muc')->as('category.')->group(function () {
            Route::get('/danh-sach', [CategoryController::class, 'index'])->name('index');
            Route::get('/thung-rac', [CategoryController::class, 'trash'])->name('trash');
            Route::get('/danh-sach/them-moi', [CategoryController::class, 'create'])->name('create');
            Route::post('/danh-sach/them-moi', [CategoryController::class, 'store'])->name('store');
            Route::get('/danh-sach/sua/{id}', [CategoryController::class, 'edit'])->name('edit');
            Route::put('/danh-sach/sua/{id}', [CategoryController::class, 'update'])->name('update');
            Route::get('/danh-sach/xoa/{id}', [CategoryController::class, 'softDelete'])->name('softDelete');
            Route::get('/danh-sach/xoa-vinh-vien/{id}', [CategoryController::class, 'destroy'])->name('destroy');
            Route::get('/danh-sach/khoi-phuc/{id}', [CategoryController::class, 'restore'])->name('restore');
        });
    });
});
