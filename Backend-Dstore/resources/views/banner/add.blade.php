@extends('layouts.master')
@section('title')
    Thêm mới
@endsection
@section('content')
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0">Thêm mới banner</h4>

                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="{{route('admin.banner.index')}}">Danh sách banner</a></li>
                        <li class="breadcrumb-item active">Thêm mới banner</li>
                    </ol>
                </div>

            </div>
        </div>
    </div>
    <!-- end page title -->
    <form action="{{route('admin.banner.store')}}" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="row">
            <div class="card">
                <div class="row">
                    <div class=" col-8">
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="choices-publish-status-input" class="form-label">Trạng thái</label>
                                <input type="text" name="url" class="form-control">
                                @error('url')
                                <div class="text-danger my-2"> {{$message}} </div>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class=" col-4">
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="choices-publish-status-input" class="form-label">Trạng thái</label>

                                <select class="form-select" name="status">
                                    <option value="active" selected>Hoạt động</option>
                                    <option value="inactive">Không hoạt động</option>
                                </select>
                            </div>
                        </div>
                        <!-- end card body -->
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Ảnh banner</h5>
                </div>
                <div class="card-body">
                    <div>
                        <h5 class="fs-14 mb-1">Ảnh</h5>
                        <p class="text-muted">Thêm ảnh banner.</p>
                        <input type="file" class="form-control" name="image">
                        @error('image')
                        <div class="text-danger my-2"> {{$message}} </div>
                        @enderror
                    </div>
                </div>
            </div>
            <!-- end card -->
            <div class="text-end mb-3">
                <button type="submit" class="btn btn-success w-sm">Thêm</button>
            </div>
            <!-- end col -->
        </div>
        <!-- end row -->
    </form>
@endsection
@section('style-libs')
    <link href="{{asset('assets/libs/dropzone/dropzone.css')}}" rel="stylesheet" type="text/css"/>
@endsection
@section('script-libs')
    <script src="{{asset('assets/libs/@ckeditor/ckeditor5-build-classic/build/ckeditor.js')}}"></script>

    <!-- dropzone js -->
    <script src="{{asset('assets/libs/dropzone/dropzone-min.js')}}"></script>

    <script src="{{asset('assets/js/pages/ecommerce-product-create.init.js')}}"></script>
@endsection
