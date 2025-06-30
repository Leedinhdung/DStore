@extends('layouts.master')
@section('title')
    Thêm sản phẩm
@endsection
@section('content')
    <!-- start page title -->
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0">Thêm sản phẩm</h4>
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="{{route('admin.product.index')}}">Danh sách sản phẩm</a>
                        </li>
                        <li class="breadcrumb-item active">Thêm sản phẩm</li>
                    </ol>
                </div>

            </div>
        </div>
    </div>
    <!-- end page title -->
    <form action="{{route('admin.product.create')}}" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="row">
            <div class="col-xl-8">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Thông tin</h5>
                    </div>
                    <div class="card-body">
                        <div class="mb-3 ">
                            <label class="form-label" for="product-title-input">Tên sản phẩm</label>
                            <input type="text" class="form-control" name="title" value="{{old('title')}}"
                                   placeholder="Nhập tên sản phẩm">
                            @error('title')
                            <div class="text-danger my-2"> {{$message}} </div>
                            @enderror
                        </div>
                        <div class="row">
                            <div class=" col-3 mb-3">
                                <label class="form-label" for="product-title-input">Thương hiệu</label>
                                <input type="text" class="form-control" name="brand" value="{{old('brand')}}"
                                       placeholder="Nhập thương hiệu">
                                @error('brand')
                                <div class="text-danger my-2"> {{$message}} </div>
                                @enderror
                            </div>
                            <div class=" col-3 mb-3">
                                <label class="form-label" for="product-title-input">SKU</label>
                                <input type="text" class="form-control" name="sku" value="{{old('sku')}}"
                                       placeholder="Nhập mã sản phẩm">
                                @error('sku')
                                <div class="text-danger my-2"> {{$message}} </div>
                                @enderror
                            </div>
                            <div class=" col-3 mb-3">
                                <label class="form-label" for="product-title-input">Số lượng</label>
                                <input type="text" class="form-control" name="stock" value="{{old('stock')}}"
                                       placeholder="Nhập số lượng">
                                @error('stock')
                                <div class="text-danger my-2"> {{$message}} </div>
                                @enderror
                            </div>
                            <div class=" col-3 mb-3">
                                <label class="form-label" for="product-title-input">Tình trạng</label>
                                <select class="form-select" name="condition">
                                    <option value="instock">Còn hàng</option>
                                    <option value="outofstock">Hết hàng</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class=" col-4 mb-3">
                                <label class="form-label" for="product-title-input">Giá gốc</label>
                                <input type="number" step="10000" class="form-control" name="original_price" value="{{old('original_price')}}"
                                       placeholder="Nhập giá gốc">
                                @error('original_price')
                                <div class="text-danger my-2"> {{$message}} </div>
                                @enderror
                            </div>
                            <div class=" col-4 mb-3">
                                <label class="form-label" for="product-title-input">Giá khuyến mãi</label>
                                <input type="text" class="form-control" name="sale_price" value="{{old('sale_price')}}"
                                       placeholder="Nhập giá khuyến mãi">
                                @error('sale_price')
                                <div class="text-danger my-2"> {{$message}} </div>
                                @enderror
                            </div>
                            <div class="mb-3 col-4">
                                <label for="choices-publish-status-input" class="form-label">Trạng thái</label>
                                <select class="form-select" name="status">
                                    <option value="active" selected>Hoạt động</option>
                                    <option value="inactive">Không hoạt động</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="ckeditor-short">Mô tả ngắn</label>
                            <textarea name="short_description" id="ckeditor-short"></textarea>
                            @error('short_description')
                            <div class="text-danger my-2"> {{$message}} </div>
                            @enderror
                        </div>
                    </div>
                </div>
                <!-- end card -->


                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Biến thể</h5>
                    </div>
                    <!-- end card header -->
                    <div class="card-body">
                        <div class="tab-content">
                            <div id="variant-container">
                                <div class="row variant-group" data-index="0">
                                    <div class="col-lg-4">
                                        <div class="mb-3">
                                            <label class="form-label">Màu sắc</label>
                                            <input type="text" class="form-control" name="variants[0][color]"
                                                   placeholder="e.g. Black" >
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="mb-3">
                                            <label class="form-label">Giá</label>
                                            <input type="number" class="form-control" name="variants[0][price]"
                                                   placeholder="e.g. 350000" >
                                        </div>
                                    </div>
                                    <div class="col-lg-3">
                                        <div class="mb-3">
                                            <label class="form-label">Ảnh</label>
                                            <input type="file" class="form-control" name="variants[0][image][]"
                                                   accept="image/*" multiple >
                                        </div>
                                    </div>
                                    <div class="col-lg-1 d-flex align-items-center">
                                        <button type="button" class="btn btn-danger remove-variant-btn mt-2">Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" id="add-variant-btn" class="btn btn-secondary mt-2">+ Thêm</button>

                        </div>
                        <!-- end tab content -->
                    </div>
                    <!-- end card body -->
                </div>
                <!-- end card -->
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Thông số</h5>
                    </div>
                    <!-- end card header -->
                    <div class="card-body">
                        <div class="mb-3">
                            <label for="ckeditor-full">Mô tả chi tiết</label>
                            <textarea name="description" id="ckeditor-full"></textarea>
                            @error('description')
                            <div class="text-danger my-2"> {{$message}} </div>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <label for="ckeditor-specs">Thông số kỹ thuật</label>
                            <textarea name="specification" id="ckeditor-specs"></textarea>
                            @error('specification')
                            <div class="text-danger my-2"> {{$message}} </div>
                            @enderror
                        </div>
                    </div>
                    <!-- end card body -->
                </div>
                <!-- end card -->

            </div>
            <!-- end col -->
            <div class="col-xl-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Ảnh sản phẩm</h5>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <p class="text-muted">Thêm ảnh chính của sản phẩm</p>
                            <div class="text-center">
                                <div class="mb-3">
                                    <input class="form-control" id="main-image-input" name="image"
                                           type="file" accept="image/png, image/gif, image/jpeg">
                                    @error('image')
                                    <div class="text-danger my-2"> {{$message}} </div>
                                    @enderror
                                </div>
                                <div class="mx-auto">
                                    <img id="main-image-preview" src="#" alt="Ảnh xem trước"
                                         style="max-height: 200px; display: none; border: 1px solid #ddd; padding: 4px; margin-top: 10px;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end card -->
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Danh mục</h5>
                    </div>
                    <div class="card-body">
                        <p class="text-muted mb-2">Chọn danh mục sản phẩm</p>
                        <select class="form-select" name="category_id"
                               >
                            @foreach($categories as $parent)
                                <option value="{{$parent->id}}">{{$parent->name}}</option>
                                @if ($parent->children)
                                    @foreach ($parent->children as $child)
                                        <option value="{{ $child->id }}">- {{ $child->name }}</option>
                                    @endforeach
                                @endif
                            @endforeach
                        </select>
                    </div>
                    <!-- end card body -->
                </div>
                <!-- end card -->
                <div class="text-end mb-3">
                    <button type="submit" class="btn btn-success w-sm">Thêm</button>
                </div>
                <!-- end card -->
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
    <script>
        let variantIndex = 1;

        document.getElementById('add-variant-btn').addEventListener('click', () => {
            const container = document.getElementById('variant-container');
            const html = `
        <div class="row variant-group" data-index="${variantIndex}">
            <div class="col-lg-4">
                <div class="mb-3">
                    <label class="form-label">Màu sắc</label>
                    <input type="text" class="form-control" name="variants[${variantIndex}][color]" >
                </div>
            </div>
            <div class="col-lg-4">
                <div class="mb-3">
                    <label class="form-label">Giá</label>
                    <input type="number" class="form-control" name="variants[${variantIndex}][price]" >
                </div>
            </div>
            <div class="col-lg-3">
                <div class="mb-3">
                    <label class="form-label">Ảnh</label>
                    <input type="file" class="form-control" name="variants[${variantIndex}][image][]" accept="image/*" multiple >
                </div>
            </div>
            <div class="col-lg-1 d-flex align-items-center">
                <button type="button" class="btn btn-danger remove-variant-btn mt-2">Xóa</button>
            </div>
        </div>
    `;
            container.insertAdjacentHTML('beforeend', html);
            variantIndex++;
        });

        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('remove-variant-btn')) {
                e.target.closest('.variant-group').remove();
            }
        });
    </script>
    <script>
        document.getElementById('main-image-input').addEventListener('change', function (event) {
            const [file] = event.target.files;
            const preview = document.getElementById('main-image-preview');

            if (file) {
                preview.src = URL.createObjectURL(file);
                preview.style.display = 'block';
            } else {
                preview.style.display = 'none';
                preview.src = '#';
            }
        });
    </script>
    <script src="https://cdn.ckeditor.com/ckeditor5/35.4.0/classic/ckeditor.js"></script>

    <script>
        const editors = ['#ckeditor-short', '#ckeditor-full', '#ckeditor-specs'];

        editors.forEach(id => {
            const el = document.querySelector(id);
            if (el) {
                ClassicEditor
                    .create(el)
                    .catch(error => console.error(`Lỗi CKEditor tại ${id}:`, error));
            }
        });
    </script>


    <script src="https://cdn.ckeditor.com/ckeditor5/35.4.0/classic/ckeditor.js"></script>

    <script src="{{asset('assets/libs/@ckeditor/ckeditor5-build-classic/build/ckeditor.js')}}"></script>

    <!-- dropzone js -->
    <script src="{{asset('assets/libs/dropzone/dropzone-min.js')}}"></script>

    <script src="{{asset('assets/js/pages/ecommerce-product-create.init.js')}}"></script>
@endsection
