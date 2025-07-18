@extends('layouts.master')
@section('title')
Sửa sản phẩm
@endsection
@section('content')
<!-- start page title -->
<div class="row">
    <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0">Sửa sản phẩm</h4>
            <div class="page-title-right">
                <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item"><a href="{{route('admin.product.index')}}">Danh sách sản phẩm</a>
                    </li>
                    <li class="breadcrumb-item active">Sửa sản phẩm</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<!-- end page title -->
<form action="{{route('admin.product.update',$product->id)}}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')
    <div class="row">
        <div class="col-xl-8">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Thông tin</h5>
                </div>
                <div class="card-body">
                    <div class="mb-3 ">
                        <label class="form-label" for="product-title-input">Tên sản phẩm</label>
                        <input type="text" class="form-control" name="title" value="{{old('title',$product->title)}}"
                            placeholder="Nhập tên sản phẩm">
                        @error('title')
                        <div class="text-danger my-2"> {{$message}} </div>
                        @enderror
                    </div>
                    <div class="row">
                        <div class=" col-4 mb-3">
                            <label class="form-label" for="product-title-input">Thương hiệu</label>
                            <input type="text" class="form-control" name="brand"
                                value="{{old('brand',$product->brand)}}" placeholder="Nhập thương hiệu">
                            @error('brand')
                            <div class="text-danger my-2"> {{$message}} </div>
                            @enderror
                        </div>
                        <div class=" col-4 mb-3">
                            <label class="form-label" for="product-title-input">SKU</label>
                            <input type="text" class="form-control" name="sku" value="{{old('sku',$product->sku)}}"
                                placeholder="Nhập mã sản phẩm">
                            @error('sku')
                            <div class="text-danger my-2"> {{$message}} </div>
                            @enderror
                        </div>
                        <div class=" col-4 mb-3">
                            <label class="form-label" for="product-title-input">Tình trạng</label>
                            <select class="form-select" name="condition">
                                <option value="instock" {{ old('condition', $product->condition ?? '') == 'instock' ?
                                    'selected' : '' }}>Còn hàng</option>
                                <option value="outofstock" {{ old('condition', $product->condition ?? '') ==
                                    'outofstock' ? 'selected' : '' }}>Hết hàng</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class=" col-4 mb-3">
                            <label class="form-label" for="product-title-input">Giá gốc</label>
                            <input type="number" step="10000" class="form-control" name="original_price"
                                value="{{old('original',$product->original_price)}}" placeholder="Nhập giá gốc">
                            @error('original_price')
                            <div class="text-danger my-2"> {{$message}} </div>
                            @enderror
                        </div>
                        <div class=" col-4 mb-3">
                            <label class="form-label" for="product-title-input">Giá khuyến mãi</label>
                            <input type="text" class="form-control" name="sale_price"
                                value="{{old('sale_price',$product->sale_price)}}" placeholder="Nhập giá khuyến mãi">
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
                        <textarea name="short_description" id="ckeditor-short">
                                {{old('short_description',$product->short_description)}}
                            </textarea>
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
                        @foreach($product->variants as $variant)
                        @php $i = $loop->index; @endphp
                        <div id="variant-container">
                            <div class="row variant-group" data-index="{{ $i }}">
                                <input type="hidden" name="variants[{{ $i }}][id]" value="{{ $variant->id }}">

                                <div class="col-lg-3">
                                    <label class="form-label">Màu sắc</label>
                                    <input type="text" class="form-control" name="variants[{{ $i }}][color]"
                                        placeholder="e.g. Black" value="{{ old(" variants.$i.color", $variant->color)
                                    }}">
                                </div>

                                <div class="col-lg-3">
                                    <label class="form-label">Giá</label>
                                    <input type="number" class="form-control" name="variants[{{ $i }}][price]"
                                        value="{{ old(" variants.$i.price", $variant->price) }}" placeholder="e.g.
                                    350000">
                                </div>

                                <div class="col-lg-2">
                                    <label class="form-label">Số lượng</label>
                                    <input type="number" class="form-control" name="variants[{{ $i }}][quantity]"
                                        value="{{ old(" variants.$i.quantity", $variant->quantity) }}" placeholder="e.g.
                                    5">
                                </div>

                                <div class="col-lg-3">
                                    <label class="form-label">Ảnh</label>
                                    <input type="file" class="form-control" name="variants[{{ $i }}][image][]"
                                        accept="image/*" multiple>
                                </div>

                                <div class="col-lg-1 d-flex align-items-center">
                                    <button type="button" class="btn btn-danger remove-variant-btn mt-2">Xóa</button>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Ảnh đã có:</label>
                                <div class="d-flex flex-wrap gap-2">
                                    @forelse($variant->images as $image)
                                    <img src="{{ Storage::url($image->image_path) }}" alt="Variant Image"
                                        style="width: 80px; height: 80px; object-fit: cover;">
                                    @empty
                                    <span class="text-muted">Chưa có ảnh</span>
                                    @endforelse
                                </div>
                            </div>
                        </div>
                        @endforeach

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
                        <textarea name="description"
                            id="ckeditor-full">{{old('description',$product->description)}}</textarea>
                        @error('description')
                        <div class="text-danger my-2"> {{$message}} </div>
                        @enderror
                    </div>
                    <div class="mb-3">
                        <label for="ckeditor-specs">Thông số kỹ thuật</label>
                        <textarea name="specification"
                            id="ckeditor-specs">{{old('specification',$product->specification)}}</textarea>
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
                                <input class="form-control" id="main-image-input" name="image" type="file"
                                    accept="image/png, image/gif, image/jpeg">
                                @error('image')
                                <div class="text-danger my-2"> {{$message}} </div>
                                @enderror
                            </div>
                            <div class="mx-auto">
                                <img src="{{ Storage::url($product->image) }}" alt="Ảnh chính của sản phẩm"
                                    style="max-height: 200px; border: 1px solid #ddd; padding: 4px; margin-top: 10px;">
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
                    <select class="form-select" name="category_id">
                        @foreach($categories as $parent)
                        <option value="{{ $parent->id }}" {{ old('parent_id', $product->category_id ?? '') ==
                            $parent->id ? 'selected' : '' }}>
                            {{ $parent->name }}
                        </option>
                        @if ($parent->children)
                        @foreach ($parent->children as $child)
                        <option value="{{ $child->id }}" {{ old('parent_id', $product->category_id ?? '') == $child->id
                            ? 'selected' : '' }}>
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
<link href="{{asset('assets/libs/dropzone/dropzone.css')}}" rel="stylesheet" type="text/css" />
@endsection
@section('script-libs')
<script>
    let variantIndex = {{ $product->variants->count() }};

    document.getElementById('add-variant-btn').addEventListener('click', () => {
        const container = document.getElementById('variant-container');
        const html = `
            <div class="row variant-group" data-index="${variantIndex}">
                <div class="col-lg-4">
                    <div class="mb-3">
                        <label class="form-label">Màu sắc</label>
                        <input type="text" class="form-control" name="variants[${variantIndex}][color]">
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="mb-3">
                        <label class="form-label">Giá</label>
                        <input type="number" class="form-control" name="variants[${variantIndex}][price]">
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="mb-3">
                        <label class="form-label">Ảnh</label>
                        <input type="file" class="form-control" name="variants[${variantIndex}][image][]" accept="image/*" multiple>
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
