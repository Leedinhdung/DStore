@extends('layouts.master')
@section('title')
Đơn hàng
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
                    {{-- <a href="{{route('admin.product.create')}}" class="btn btn-primary">Thêm mới +</a> --}}
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
                            <th>Mã đơn hàng</th>
                            <th>Tên khách hàng</th>
                            <th>Email</th>
                            <th>Điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Tổng tiền</th>
                            <th>Phương thức</th>
                            <th>Trạng thái</th>
                            <th>Ngày đặt hàng</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php $i=0 ?>
                        @foreach($orders as $item)
                        <?php $i++ ?>
                        <tr>
                            <th scope="row">
                                <div class="form-check">
                                    <input class="form-check-input fs-15" type="checkbox" name="checkAll"
                                        value="option1">
                                </div>
                            </th>
                            <td>{{$i}}</td>
                            <td>{{$item->code}}</td>
                            <td>{{$item->customer_name}}</td>
                            <td class="text-wrap">{{$item->customer_email}}</td>
                            <td>{{$item->customer_phone}}</td>
                            <td>{{$item->shipping_address}}</td>
                            <td>{{number_format($item->total_amount, 0, ',', '.') }} VND</td>
                            <td>{{$item->payment_method}}</td>
                            <td>
                                @if($item->status === 'pending')
                                <span class="badge bg-warning">Chờ xử lý</span>
                                @elseif($item->status === 'paid')
                                <span class="badge bg-success">Đã thanh toán</span>
                                @elseif($item->status === 'cancelled')
                                <span class="badge bg-danger">Đã hủy</span>
                                @endif
                            </td>
                             <td>{{$item->created_at}}</td>
                             <td>
                            <div class="dropdown d-inline-block">

                                <a href="{{route('admin.order.show',$item->id)}}" class="dropdown-item"><i
                                                class="ri-eye-fill align-bottom me-2 text-muted"></i> Chi tiết đơn hàng
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
        {{ $orders->links() }}
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
