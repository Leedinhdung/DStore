<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Banner\StoreBannerRequest;
use App\Http\Requests\Admin\Banner\UpdateBannerRequest;
use App\Models\Banner;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $banners = Banner::paginate(5);
//        dd($banners);
        return view('banner.index', compact('banners'));
    }

    public function trash()
    {
        $banners = Banner::onlyTrashed()->paginate(10);
        return view('banner.trash', compact('banners'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBannerRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->except('image');
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = 'banner_' . time() . '.' . $image->getClientOriginalExtension();
                $pathImage = Storage::putFileAs('banners', $image, $imageName);
                $data['image'] = $pathImage;
            }
            $newBanner = Banner::create($data);
            if (!$newBanner) {
                throw new Exception('Thêm mới thất bại');
            }
            DB::commit();
            return redirect()->route('banner.index')->with(['success' => 'Thêm mới thành công']);
        } catch (Exception $e) {
            DB::rollBack();
            if (!empty($imagePath)) {
                Storage::delete($imagePath);
            }
            return redirect()->route('admin.banner.index')->with(['error' => 'Thêm mới thất bại!']);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('banner.add');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $banner = Banner::findOrFail($id);
        return view('banner.edit', compact('banner'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBannerRequest $request, string $id)
    {
        $banner = Banner::findOrFail($id);
        DB::beginTransaction();
        try {
            $data = $request->except('image');
            if ($request->hasFile('image')) {
                if (!empty($banner->image) && Storage::exists($banner->image)) {
                    Storage::delete($banner->image);
                }
                $image = $request->file('image');
                $newNameImage = 'banner_' . time() . '.' . $image->getClientOriginalExtension();
                $data['image'] = Storage::putFileAs('banners', $request->file('image'),$newNameImage);
            }
            $banner->update($data);
            DB::commit();
            return redirect()->route('admin.banner.index')->with('success', 'Cập nhật thành công');
        } catch (Exception $exception) {
            DB::rollBack();
            if (!empty($data['image'])) {
                Storage::delete($data['image']);
            }
            return redirect()->route('admin.banner.index')->with('error', 'Cập nhật thất bại!');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function softDelete(string $id)
    {
        $banner = Banner::findOrFail($id);
        DB::beginTransaction();
        try {
            $banner->delete();
            DB::commit();
            return back()->with(['success' => 'Xóa thành công']);
        } catch (Exception $exception) {
            DB::rollBack();
            return redirect()->route('admin.banner.index')->with('error', 'Xóa thất bại!');
        }
    }

    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $banner = Banner::onlyTrashed()->findOrFail($id);
            if ($banner->image && Storage::exists($banner->image)) {
                Storage::delete($banner->image);
            }
            $banner->forceDelete();
            DB::commit();
            return back()->With(['success' => 'Xóa thành công']);
        } catch (Exception $exception) {
            DB::rollBack();
            return back()->withInput()->withErrors(['name' => $exception->getMessage()]);
        }

    }

    public function restore(string $id)
    {
        $banner = Banner::onlyTrashed()->findOrFail($id);
        $banner->restore();
        return back()->with(['success' => 'Khôi phục thành công']);
    }
}
