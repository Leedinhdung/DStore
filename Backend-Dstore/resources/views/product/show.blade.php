@extends('layouts.master')
@section('title')
    Chi tiết
@endsection
@section('content')
    <!-- start page title -->
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0">{{$product->title}}</h4>
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="{{route('admin.product.index')}}">Danh sách</a></li>
                        <li class="breadcrumb-item active">{{$product->title}}</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <!-- end page title -->
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row gx-lg-5">
                        <div class="col-xl-4 col-md-8 mx-auto">
                            <div class="product-img-slider sticky-side-div">
                                <div class="swiper product-thumbnail-slider p-2 rounded bg-light">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide">
                                            <img src="{{asset('assets/images/products/img-8.png')}}" alt=""
                                                 class="img-fluid d-block"/>
                                        </div>
                                        <div class="swiper-slide">
                                            <img src="assets/images/products/img-6.png" alt=""
                                                 class="img-fluid d-block"/>
                                        </div>
                                        <div class="swiper-slide">
                                            <img src="assets/images/products/img-1.png" alt=""
                                                 class="img-fluid d-block"/>
                                        </div>
                                        <div class="swiper-slide">
                                            <img src="assets/images/products/img-8.png" alt=""
                                                 class="img-fluid d-block"/>
                                        </div>
                                    </div>
                                    <div class="swiper-button-next"></div>
                                    <div class="swiper-button-prev"></div>
                                </div>
                                <!-- end swiper thumbnail slide -->
                                <div class="swiper product-nav-slider mt-2">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide">
                                            <div class="nav-slide-item">
                                                <img src="assets/images/products/img-8.png" alt=""
                                                     class="img-fluid d-block"/>
                                            </div>
                                        </div>
                                        <div class="swiper-slide">
                                            <div class="nav-slide-item">
                                                <img src="assets/images/products/img-6.png" alt=""
                                                     class="img-fluid d-block"/>
                                            </div>
                                        </div>
                                        <div class="swiper-slide">
                                            <div class="nav-slide-item">
                                                <img src="assets/images/products/img-1.png" alt=""
                                                     class="img-fluid d-block"/>
                                            </div>
                                        </div>
                                        <div class="swiper-slide">
                                            <div class="nav-slide-item">
                                                <img src="assets/images/products/img-8.png" alt=""
                                                     class="img-fluid d-block"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end swiper nav slide -->
                            </div>
                        </div>
                        <!-- end col -->
                        <div class="col-xl-8">
                            <div class="mt-xl-0 mt-5">
                                <div class="d-flex">
                                    <div class="flex-grow-1">
                                        <h4>{{$product->title}}</h4>
                                        <div class="hstack gap-3 flex-wrap">
                                            <div>Thương hiệu: {{$product->brand}}</div>
                                            <div class="vr"></div>
                                            <div class="text-muted">SKU : <span class="text-body fw-medium">{{$product->sku}}</span>
                                            </div>
                                            <div class="text-muted">Tình trạng : <span class="text-body text-muted fw-medium">  {!!  $product->condition==='instock'
                                            ? 'Còn hàng'
                                            :' Hết hàng'
                                        !!}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex-shrink-0">
                                        <div>
                                            <a href="apps-ecommerce-add-product.html" class="btn btn-light"
                                               data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i
                                                    class="ri-pencil-fill align-bottom"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex flex-wrap gap-2 align-items-center mt-3">
                                    <div class="text-muted fs-16">
                                        <span class="mdi mdi-star text-warning"></span>
                                        <span class="mdi mdi-star text-warning"></span>
                                        <span class="mdi mdi-star text-warning"></span>
                                        <span class="mdi mdi-star text-warning"></span>
                                        <span class="mdi mdi-star text-warning"></span>
                                    </div>
                                    <div class="text-muted">( 5.50k Customer Review )</div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 col-sm-6">
                                        <div class="p-2 border border-dashed rounded">
                                            <div class="d-flex align-items-center">
                                                <div class="avatar-sm me-2">
                                                    <div class="avatar-title rounded bg-transparent text-success fs-24">
                                                        <i class="ri-money-dollar-circle-fill"></i>
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <p class="text-muted mb-1">Giá gốc :</p>
                                                    <h5 class="mb-0">{{$product->original_price}}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end col -->
                                    <div class="col-lg-3 col-sm-6">
                                        <div class="p-2 border border-dashed rounded">
                                            <div class="d-flex align-items-center">
                                                <div class="avatar-sm me-2">
                                                    <div class="avatar-title rounded bg-transparent text-success fs-24">
                                                        <i class="ri-money-dollar-circle-fill"></i>
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <p class="text-muted mb-1">Giá khuyến mãi :</p>
                                                    <h5 class="mb-0">{{$product->sale_price}}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end col -->
                                </div>
                                <div class="row">
                                        <div class="mt-4">
                                            <h5 class="fs-14">Màu sắc :</h5>
                                            <div class="d-flex flex-wrap gap-2">
                                                <div class="col-lg-3 col-sm-6">
                                                    @foreach($product->variants as $variant)
                                                        <label class="variant-option w-100 p-2 border border-dashed rounded mb-2 position-relative">
                                                            <input type="radio" name="selected_variant" value="{{ $variant->id }}" class="variant-radio d-none">
                                                            <div class="d-flex align-items-center">
                                                                <div class="flex-grow-1">
                                                                    <p class="mb-1">{{ $variant->color }}</p>
                                                                    <h5 class="mb-0">{{ number_format($variant->price) }}</h5>
                                                                </div>
                                                                <span class="checkmark position-absolute top-0 end-0 m-2 d-none">✔</span>
                                                            </div>
                                                        </label>
                                                    @endforeach
                                                </div>
                                            </div>
                                        </div>
                                    <!-- end col -->
                                </div>
                                <!-- end row -->
                                <div class="mt-4 text-muted">
                                    <h5 class="fs-14">Mô tả :</h5>
                                    <p>{!!$product->short_description!!}</p>
                                </div>
                                <div class="product-content mt-5">
                                    <h5 class="fs-14 mb-3">Mô tả sản phẩm :</h5>
                                    <nav>
                                        <ul class="nav nav-tabs nav-tabs-custom nav-success" id="nav-tab"
                                            role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="nav-speci-tab" data-bs-toggle="tab"
                                                   href="#nav-speci" role="tab" aria-controls="nav-speci"
                                                   aria-selected="true">Đặc điểm</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="nav-detail-tab" data-bs-toggle="tab"
                                                   href="#nav-detail" role="tab" aria-controls="nav-detail"
                                                   aria-selected="false">Chi tiết</a>
                                            </li>
                                        </ul>
                                    </nav>
                                    <div class="tab-content border border-top-0 p-4" id="nav-tabContent">
                                        <div class="tab-pane fade show active" id="nav-speci" role="tabpanel"
                                             aria-labelledby="nav-speci-tab">
                                            <div class="table-responsive">
                                                <table class="table mb-0">
                                                    <tbody>
                                                    <tr>
                                                        <th scope="row" style="width: 200px;">Danh mục</th>
                                                        <td>{{$product->category->name}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Brand</th>
                                                        <td>{{$product->brand}}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="nav-detail" role="tabpanel"
                                             aria-labelledby="nav-detail-tab">
                                            <div>
                                                <h5 class="font-size-16 mb-3">{{$product->title}}</h5>
                                                <p>{!!$product->description!!}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- product-content -->
                            </div>
                        </div>
                        <!-- end col -->
                    </div>
                    <!-- end row -->
                </div>
                <!-- end card body -->
            </div>
            <!-- end card -->
        </div>
        <!-- end col -->
    </div>
@endsection
@section('style-libs')
    <style>
        .variant-option {
            cursor: pointer;
        }
        .checkmark {
            font-size: 1.2rem;
            color: green;
        }
    </style>
@endsection
@section('script-libs')
    <script>
        document.querySelectorAll('.variant-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.variant-option .checkmark').forEach(c => c.classList.add('d-none'));
                this.querySelector('.checkmark').classList.remove('d-none');
                this.querySelector('input').checked = true;
            });
        });
    </script>
    <!--Swiper slider js-->
    <script src="{{asset('assets/libs/swiper/swiper-bundle.min.js')}}"></script>
    <!-- ecommerce product details init -->
    <script src="{{asset('assets/js/pages/ecommerce-product-details.init.js')}}"></script>
@endsection
