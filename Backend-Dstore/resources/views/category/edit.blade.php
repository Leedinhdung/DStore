@extends('layouts.master')
@section('title')
Sửa danh mục
@endsection
@section('content')
<!-- start page title -->
<div class="row">
    <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0">Sửa danh mục</h4>

            <div class="page-title-right">
                <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item"><a href="{{route('admin.category.index')}}">Danh sách danh mục</a>
                    </li>
                    <li class="breadcrumb-item active">Sửa danh mục</li>
                </ol>
            </div>

        </div>
    </div>
</div>
<!-- end page title -->

<form action="{{route('admin.category.update',$categoryById->id)}}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')
    <div class="row">
        <div class="col-lg-8">
            <div class="card">
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label" for="product-title-input">Tên danh mục</label>
                        <input type="text" class="form-control" value="{{$categoryById->name}}" name="name"
                            placeholder="Nhập tên danh mục"">
                            @error('name')
                            <div class=" text-danger my-2"> {{$message}}
                    </div>
                    @enderror
                </div>
                <div>
                    <label>Biểu tượng</label>
                    <textarea name="icon_svg" class="form-control">
                        {{$categoryById->icon_svg}}
                            </textarea>
                </div>
                <div>
                    <label>Mô tả danh mục</label>
                    <textarea id="ckeditor-classic" name="description">
{{$categoryById->description}}
                            </textarea>
                </div>
            </div>
        </div>
        <!-- end card -->
        <div class="text-end mb-3">
            <button type="submit" class="btn btn-success w-sm">Sửa</button>
        </div>
    </div>
    <!-- end col -->

    <div class="col-lg-4">
        <div class="card">
            <div class="card-body">
                <div class="mb-3">
                    <label for="choices-publish-status-input" class="form-label">Trạng thái</label>
                    <select class="form-select" name="status">
                        <option value="active" {{ old('status', $categoryById->status ?? '') == 'active' ? 'selected' :
                            '' }}>
                            Hoạt động
                        </option>
                        <option value="inactive" {{ old('status', $categoryById->status ?? '') == 'inactive' ?
                            'selected' : '' }}>
                            Không hoạt động
                        </option>
                    </select>
                </div>
            </div>
            <!-- end card body -->
        </div>
        <!-- end card -->
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Danh mục</h5>
            </div>
            <div class="card-body">
                <p class="text-muted mb-2">Chọn danh mục</p>
                <select class="form-select" name="parent_id">
                    <option value="">- Không có danh mục cha -</option>
                    @foreach($categories as $parent)
                    <option value="{{ $parent->id }}" {{ old('parent_id', $categoryById->parent_id ?? '') == $parent->id
                        ? 'selected' : '' }}>
                        {{ $parent->name }}
                    </option>
                    @if ($parent->children)
                    @foreach ($parent->children as $child)
                    <option value="{{ $child->id }}" {{ old('parent_id', $categoryById->parent_id ?? '') == $child->id ?
                        'selected' : '' }}>
                        - {{ $child->name }}
                    </option>
                    @endforeach
                    @endif
                    @endforeach
                </select>

            </div>
            <!-- end card body -->
        </div>
        <!-- end card -->
    </div>
    <!-- end col -->
    </div>
    <!-- end row -->
</form>
@endsection
@section('style-libs')
<link href="{{asset('assets/libs/dropzone/dropzone.css')}}" rel="stylesheet" type="text/css" />
@endsection
@section('script-libs')
<script src="{{asset('assets/libs/@ckeditor/ckeditor5-build-classic/build/ckeditor.js')}}"></script>

<!-- dropzone js -->
<script src="{{asset('assets/libs/dropzone/dropzone-min.js')}}"></script>

<script src="{{asset('assets/js/pages/ecommerce-product-create.init.js')}}"></script>
@endsection
