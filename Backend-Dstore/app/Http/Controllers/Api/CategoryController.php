<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    public function getCategories()
    {
        try {
            //Lấy những trường dữ liệu trong database.
            $categories = Category::where('status', 'active')
                ->whereNull('parent_id') // chỉ lấy danh mục cha
                ->select('id', 'slug', 'name', 'icon_svg')
                ->with(['children' => function ($query) {
                    $query->select('id', 'slug', 'name', 'icon_svg', 'parent_id')
                        ->where('status', 'active');
                }])
                ->get();

            //Kiểm tra dữ nếu rỗng thì trả về 204
            if ($categories->isEmpty()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không có danh mục nào.',
                    'data' => []
                ], status: 204);
            }
            //Lấy dữ liệu thành công thì trả về 200
            return response()->json([
                'status' => 'success',
                'message' => 'Danh mục.',
                'data' => $categories
            ], 200);
        } catch (\Exception $e) {
            //Nếu lỗi dữ liệu server thì trả về 500
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình lấy danh mục.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
