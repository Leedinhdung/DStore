<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Product\StoreProductRequest;
use App\Http\Requests\Admin\Product\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    private function handleImageUpload($request, $directory)
    {
        if (!$request->hasFile('image') || !$request->file('image')->isValid()) {
            return null;
        }

        $image = $request->file('image');
        $imageName = $directory . '_' . time() . '.' . $image->getClientOriginalExtension();
        return Storage::putFileAs($directory, $image, $imageName);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::withSum('variants', 'quantity')->paginate(10);
        return view('product.index', compact('products'));
    }
    public function trash()
    {
        $products = Product::onlyTrashed()->paginate(10);
        return view('product.trash', compact('products'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {

        $pathImage = null;
        DB::beginTransaction();
        try {
            $data = $request->validated();

            // Tạo slug từ title
            if (!empty($data['title'])) {
                $data['slug'] = Str::slug($data['title']);
            }

            if ($request->hasFile('image')) {
                $data['image'] = $this->handleImageUpload($request, 'products');
                $pathImage = $data['image'];
            }
            $product = Product::create($data);

            if (!$product) {
                throw new Exception('Không thể tạo sản phẩm');
            }

            if (!is_array($request->variants) || empty($request->variants)) {
                throw new Exception('Chưa cung cấp biến thể');
            }

            foreach ($request->variants as $variantData) {
                $variant = $product->variants()->create([
                    'color' => $variantData['color'] ?? null,
                    'price' => $variantData['price'] ?? null,
                    'quantity' => $variantData['quantity'] ?? null,
                ]);

                if (!$variant) {
                    throw new Exception('Không thể tạo biến thể');
                }

                if (!empty($variantData['image'])) {
                    foreach ($variantData['image'] as $imageFile) {
                        if ($imageFile && $imageFile->isValid()) {
                            $path = $imageFile->store('variants', 'public');
                            $variant->images()->create(['image_path' => $path]);
                        }
                    }
                }
            }

            DB::commit();
            return redirect()->route('admin.product.index')->with('success', 'Thêm sản phẩm thành công');
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Product store failed: ' . $e->getMessage(), [
                'request_data' => $request->except(['image', 'variants']),
                'user_id' => auth()->id()
            ]);

            if (!empty($pathImage) && Storage::exists($pathImage)) {
                Storage::delete($pathImage);
            }

            return redirect()->route('admin.product.index')->with('error', 'Thêm mới thất bại: ' . $e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::whereNull('parent_id')
            ->where('status', 'active')
            ->with(['children' => function ($q) {
                $q->where('status', 'active');
            }])
            ->get();
        return view('product.add', compact('categories'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::with('variants')->findOrFail($id);
        return view('product.show', compact('product'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $categories = Category::with('children')->where('parent_id', null)->get();
        $product = Product::with('variants.images')->findOrFail($id);
        return view('product.edit', compact('product', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, string $id)
    {
        DB::beginTransaction();

        try {
            $product = Product::with('variants.images')->findOrFail($id);
            $data = $request->validated();

            // Tạo slug mới nếu có title
            if (!empty($data['title'])) {
                $data['slug'] = Str::slug($data['title']);
            }

            // Xử lý ảnh chính sản phẩm
            if ($request->hasFile('image')) {
                $newImagePath = $this->handleImageUpload($request, 'products');
                if ($newImagePath) {
                    if ($product->image && Storage::disk('public')->exists($product->image)) {
                        Storage::disk('public')->delete($product->image);
                    }
                    $data['image'] = $newImagePath;
                }
            }

            $product->update($data);

            $existingVariantIds = $product->variants()->pluck('id')->toArray();
            $incomingVariantIds = [];

            if (!empty($request->variants)) {
                foreach ($request->variants as $variantData) {
                    $variantId = $variantData['id'] ?? null;

                    if ($variantId && $variant = $product->variants()->with('images')->find($variantId)) {
                        // Cập nhật biến thể
                        $variant->update([
                            'color' => $variantData['color'] ?? null,
                            'price' => $variantData['price'] ?? null,
                            'quantity' => $variantData['quantity'] ?? null,
                        ]);
                        $incomingVariantIds[] = $variant->id;

                        // Nếu có ảnh mới, xóa ảnh cũ rồi thêm ảnh mới
                        if (!empty($variantData['image'])) {
                            foreach ($variant->images as $image) {
                                if (Storage::disk('public')->exists($image->image_path)) {
                                    Storage::disk('public')->delete($image->image_path);
                                }
                            }
                            $variant->images()->delete();

                            foreach ($variantData['image'] as $file) {
                                if ($file && $file->isValid()) {
                                    $path = $file->store('variants', 'public');
                                    $variant->images()->create(['image_path' => $path]);
                                }
                            }
                        }
                    } else {
                        // Tạo mới biến thể
                        $variant = $product->variants()->create([
                            'color' => $variantData['color'] ?? null,
                            'price' => $variantData['price'] ?? null,
                            'quantity' => $variantData['quantity'] ?? null,
                        ]);
                        $incomingVariantIds[] = $variant->id;

                        // Lưu ảnh mới nếu có
                        if (!empty($variantData['image'])) {
                            foreach ($variantData['image'] as $file) {
                                if ($file && $file->isValid()) {
                                    $path = $file->store('variants', 'public');
                                    $variant->images()->create(['image_path' => $path]);
                                }
                            }
                        }
                    }
                }
            }

            // Xoá các biến thể không còn trong form
            $variantsToDelete = array_diff($existingVariantIds, $incomingVariantIds);
            foreach ($variantsToDelete as $variantId) {
                $variant = $product->variants()->with('images')->find($variantId);
                if ($variant) {
                    foreach ($variant->images as $image) {
                        if (Storage::disk('public')->exists($image->image_path)) {
                            Storage::disk('public')->delete($image->image_path);
                        }
                    }
                    $variant->images()->delete();
                    $variant->delete();
                }
            }

            DB::commit();

            return redirect()->route('admin.product.index')->with('success', 'Cập nhật sản phẩm thành công.');
        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Product update failed: ' . $e->getMessage(), [
                'request_data' => $request->except(['image', 'variants']),
                'user_id' => auth()->id(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);

            return redirect()->route('admin.product.index')->with('error', 'Sửa thất bại: ' . $e->getMessage());
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function softDelete(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return back()->with('success', 'Đã xóa sản phẩm!');
    }

    public function restore($id)
    {
        $product = Product::onlyTrashed()->findOrFail($id);
        $product->restore();
        return back()->with('success', 'Khôi phục sản phẩm thành công!');
    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $product = Product::onlyTrashed()->with('variants.images')->findOrFail($id);

            // Xóa ảnh đại diện
            if ($product->image && Storage::exists($product->image)) {
                Storage::delete($product->image);
            }
            // Xóa ảnh variant
            foreach ($product->variants as $variant) {
                foreach ($variant->images as $image) {
                    if ($image->image_path && Storage::disk('public')->exists($image->image_path)) {
                        Storage::disk('public')->delete($image->image_path);
                    }
                }
            }
            // Xóa bản ghi
            $product->forceDelete();

            DB::commit();
            return redirect()->back()->with('success', 'Đã xóa vĩnh viễn sản phẩm và toàn bộ ảnh liên quan!');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Product force delete failed: ' . $e->getMessage());
            return redirect()->route('admin.product.index')->with('error', 'Xóa vĩnh viễn thất bại: ' . $e->getMessage());
        }
    }
}
