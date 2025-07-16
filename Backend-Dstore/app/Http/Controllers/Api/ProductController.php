<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            if ($category->parent_id === null) {
                $childIds = $category->children()->pluck('id')->toArray();
                $allCategoryIds = array_merge([$category->id], $childIds);
                $listProducts = Product::whereIn('category_id', $allCategoryIds)->get();
            } else {
                $listProducts = $category->products()->get();
            }

            return response()->json([
                'status' => 'success',
                'data' => $listProducts
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function getProductsBySlug(Request $request, string $slug)
    {
        try {
            $product = Product::with('variants', 'variants.images')->where('slug', $slug)->first();
            if (!$product) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không có sản phẩm nào',
                    'data' => []
                ], 204);
            }
            $similarProducts = Product::where('category_id', $product->category_id)->where('id', '!=', $product->id)->limit(10)->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Lấy danh sách sản phẩm thành công',
                'data' => [
                    'product' => $product,
                    'similarProducts' => $similarProducts,
                ]
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function searchProduts(Request $request)
    {
        $query = $request->input('q');
        $result = Product::search($query)->get();
        return response()->json([
            'status' => 'success',
            'data' => $result
        ], 200);
    }
    public function getProductSale()
    {
        try {
            $products = Product::whereNotNull('sale_price')
                ->whereColumn('sale_price', '<', 'original_price')
                ->with('variants')
                ->select('*')
                ->orderByRaw('(original_price - sale_price) / original_price DESC')
                ->limit(10)
                ->get();

            return response()->json([
                'status' => 'success',
                'data' => $products
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi .',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    // public function getBestSellingProducts()
    // {
    //     try {
    //         $products = Product::select('products.*', DB::raw('SUM(order_items.quantity) as total_sold'))
    //             ->join('order_items', 'products.id', '=', 'order_items.product_id')
    //             ->groupBy('products.id')
    //             ->orderByDesc('total_sold')
    //             ->limit(10)
    //             ->get();

    //         return response()->json([
    //             'status' => 'success',
    //             'data' => $products
    //         ]);
    //     } catch (Exception $e) {
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => 'Đã xảy ra lỗi .',
    //             'error' => $e->getMessage(),
    //         ], 500);
    //     }
    // }
}
