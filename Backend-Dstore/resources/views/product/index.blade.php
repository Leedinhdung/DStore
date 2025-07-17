@extends('layouts.master')
@section('title')
Sản phẩm
@endsection
@section('content')
<!-- start page title -->
<div class="row">
    <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0">Danh sách sản phẩm</h4>

            <div class="page-title-right">
                <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item"><a href="javascript: void(0);">Quản lý sản phẩm</a></li>
                    <li class="breadcrumb-item active">Danh sách</li>
                </ol>
            </div>

        </div>
    </div>
</div>
<!-- end page title -->

<div class="row">
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-grid gap-3">
                        <h5 class="card-title mb-0">Danh sách sản phẩm</h5>
                        <a href="{{route('admin.product.trash')}}">Thùng rác</a>
                    </div>
                    <a href="{{route('admin.product.create')}}" class="btn btn-primary">Thêm mới +</a>
                </div>
            </div>
            <div class="card-body">
                <table id="scroll-horizontal" class="table nowrap align-middle" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col" style="width: 10px;">
                                <div class="form-check">
                                    <input class="form-check-input fs-15" type="checkbox" id="checkAll" value="option">
                                </div>
                            </th>
                            <th>ID</th>
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Hãng</th>
                            <th>SKU</th>
                            <th>Danh mục</th>
                            <th>Giá gốc</th>
                            <th>Giá khuyến mãi</th>
                            <th>Số lượng</th>
                            <th>Tình trạng</th>
                            <th>Trạng thái</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php $i=0 ?>
                        @foreach($products as $product)
                        <?php $i++ ?>
                        <tr>
                            <th scope="row">
                                <div class="form-check">
                                    <input class="form-check-input fs-15" type="checkbox" name="checkAll"
                                        value="option1">
                                </div>
                            </th>
                            <td>{{$i}}</td>
                            <td><img src="{{ Storage::url($product->image) }}" width="100px" alt=""></td>
                            <td class="text-wrap">{{$product->title}}</td>
                            <td>{{$product->brand}}</td>
                            <td>{{$product->sku}}</td>
                            <td>{{$product->category->name}}</td>
                            <td>{{ number_format($product->original_price, 0, ',', '.') }} VND</td>
                            <td>{{ number_format($product->sale_price, 0, ',', '.') }} VND</td>

                            <td>{{$product->variants_sum_quantity}}</td>
                            <td>
                                {!! $product->condition==='instock'
                                ? ' <span class="badge bg-primary">Còn hàng</span>'
                                :' <span class="badge bg-danger">Hết hàng</span>'
                                !!}
                            </td>
                            <td> {!! $product->status==='active'
                                ? ' <span class="badge bg-primary">Hoạt động</span>'
                                :' <span class="badge bg-danger">Không hoạt động</span>'
                                !!}</td>
                            <td>
                                <div class="dropdown d-inline-block">
                                    <button class="btn btn-soft-secondary btn-sm dropdown" type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="ri-more-fill align-middle"></i>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li><a href="{{route('admin.product.show',$product->id)}}"
                                                class="dropdown-item"><i
                                                    class="ri-eye-fill align-bottom me-2 text-muted"></i> Chi tiết</a>
                                        </li>
                                        <li><a href="{{route('admin.product.edit',$product->id)}}"
                                                class="dropdown-item edit-item-btn"><i
                                                    class="ri-pencil-fill align-bottom me-2 text-muted"></i>
                                                Sửa</a></li>
                                        <li>
                                            <a href="{{route('admin.product.softDelete',$product->id)}}"
                                                class="dropdown-item remove-item-btn">
                                                <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                Xóa
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!--end col-->
    <div>
        {{ $products->links() }}
    </div>
</div>
<!--end row-->

@endsection
@section('style-libs')

<!--datatable css-->
<link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" />
<!--datatable responsive css-->
<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap.min.css" />

<link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.2.2/css/buttons.dataTables.min.css">
@endsection
@section('script-libs')
<script src="https://code.jquery.com/jquery-3.6.0.min.js"
    integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

<!--datatable js-->
<script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js"></script>
<script src="https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.2.2/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.2.2/js/buttons.print.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.2.2/js/buttons.html5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>

<script src="{{asset('assets/js/pages/datatables.init.js')}}"></script>
@endsection
