<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getProducts()
    {
        try {
            // Lấy tất cả sản phẩm kèm danh mục và danh mục cha
            $products = Product::with(['variants', 'variants.images', 'category.parent'])->get();

            // Gom sản phẩm theo danh mục cha (dựa vào slug nếu có)
            $groupedProducts = collect();

            foreach ($products as $product) {
                $category = $product->category;
                $parent = $category?->parent;

                // Dùng slug của danh mục cha nếu có, nếu không thì dùng slug của chính nó
                $key = $parent?->slug ?? $category?->slug ?? 'Chưa phân loại';

                $groupedProducts->push([
                    'key' => $key,
                    'product' => $product
                ]);
            }

            // Gộp lại các sản phẩm theo key
            $grouped = $groupedProducts->groupBy('key')->map(function ($items) {
                return $items->pluck('product');
            });

            return response()->json([
                'status' => 'success',
                'data' => $grouped
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình lấy danh sách sản phẩm.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function getProductsByCategory(Request $request, string $slug)
    {
        try {
            $category = Category::where('slug', $slug)->first();
            $listProducts = $category->products()->get();
            return response()->json([
                'status' => 'success',
                'data' => $listProducts
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi lưu bài viết',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
