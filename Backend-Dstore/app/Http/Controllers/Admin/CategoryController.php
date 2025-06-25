<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::paginate(10);

        return view('category.index', compact('categories'));
    }

    public function trash()
    {
        $categories = Category::onlyTrashed()->paginate(10);
        return view('category.trash', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();
            $newCategory = Category::create($data);
            if (!$newCategory) {
                throw new \Mockery\Exception('Thêm mới thất bại');
            }
            DB::commit();
            return redirect()->route('admin.category.index')->with(['success' => 'Thêm mới thành công!']);
        } catch (\Exception $exception) {
            DB::rollBack();
            return back()->withInput()->withErrors(['name' => $exception->getMessage()]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::with('children')->where('parent_id', null)->get();
        return view('category.add', compact('categories'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $categories = Category::with('children')->where('parent_id', null)->get();
        $categoryById = Category::findOrFail($id);
        return view('category.edit', compact('categoryById', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, string $id)
    {
        $category = Category::findOrFail($id);
        DB::beginTransaction();
        try {
            $data = $request->all();
            $category->update($data);
            DB::commit();
            return redirect()->route('admin.category.index')->with(['success' => 'Cập nhật thành công']);
        } catch (\Exception $exception) {
            DB::rollBack();
            return back()->withInput()->withErrors(['name' => $exception->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function softDelete(string $id)
    {
        $category = Category::findOrFail($id);
        DB::beginTransaction();
        try {
            $category->delete();
            DB::commit();
            return back()->with(['success' => 'Xóa thành công']);
        } catch (\Exception $exception) {
            DB::rollBack();
            return back()->withInput()->withErrors(['name' => $exception->getMessage()]);
        }
    }

    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $category = Category::onlyTrashed()->findOrFail($id);
            $category->forceDelete();
            DB::commit();
            return back()->With(['success' => 'Xóa thành công']);
        } catch (\Exception $exception) {
            DB::rollBack();
            return back()->withInput()->withErrors(['name' => $exception->getMessage()]);
        }

    }

    public function restore(string $id)
    {
        $category = Category::onlyTrashed()->findOrFail($id);
        $category->restore();
        return back()->with(['success' => 'Khôi phục thành công']);
    }
}
