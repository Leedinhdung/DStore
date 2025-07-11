<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Exception;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    public function getBanners()
    {
        try {
            $banners = Banner::where('status', 'active')->get();
            return response()->json([
                'status'=>'success',
                'message'=>'Lấy danh sách banner thành công',
                'data'=>$banners
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình lấy danh mục.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
