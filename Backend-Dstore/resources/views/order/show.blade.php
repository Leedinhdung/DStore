@extends('layouts.master')

@section('title')
Chi tiết đơn hàng
@endsection

@section('content')
<!-- start page title -->
<div class="row">
    <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0">Đơn hàng #{{ $order->code }}</h4>
            <div class="page-title-right">
                <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item"><a href="{{ route('admin.order.index') }}">Danh sách đơn hàng</a></li>
                    <li class="breadcrumb-item active">Chi tiết</li>
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

                <!-- Thông tin khách hàng -->
                <div class="row mb-4">
                    <div class="col-md-6">
                        <h5>Thông tin khách hàng</h5>
                        <p class="fs-5"><strong>Họ tên:</strong> {{ $order->customer_name }}</p>
                        <p class="fs-5"><strong>Email:</strong> {{ $order->customer_email }}</p>
                        <p class="fs-5"><strong>SĐT:</strong> {{ $order->customer_phone }}</p>
                        <p class="fs-5"><strong>Địa chỉ:</strong> {{ $order->shipping_address }}</p>
                        <p class="fs-5"><strong>Ghi chú:</strong> {{ $order->note ?? 'Không có' }}</p>
                    </div>
                    <div class="col-md-6">
                        <h2>Thông tin đơn hàng</h2>
                        <p class="fs-5"><strong>Mã đơn hàng:</strong> {{ $order->code }}</p>
                        <p class="fs-5"><strong>Phương thức thanh toán:</strong> {{ strtoupper($order->payment_method)
                            }}</p>
                        <form method="POST" action="{{route('admin.order.updateStatus',$order->id)}}">
                            @csrf
                            @method('PUT')
                            <label class="fs-5"><strong>Trạng thái:</strong></label>
                            <select name="status" class="form-select w-auto d-inline-block"
                                onchange="this.form.submit()">
                                <option value="pending" {{ $order->status === 'pending' ? 'selected' : '' }}>Chờ xử lý
                                </option>
                                <option value="confirmed" {{ $order->status === 'confirmed' ? 'selected' : '' }}>Đã xác
                                    nhận</option>
                                <option value="shipped" {{ $order->status === 'shipped' ? 'selected' : '' }}>Đã giao
                                </option>
                                <option value="cancelled" {{ $order->status === 'cancelled' ? 'selected' : '' }}>Đã hủy
                                </option>
                            </select>
                        </form>
                    </div>
                </div>

                <!-- Danh sách sản phẩm -->
                <h5 class="mb-3">Sản phẩm trong đơn</h5>
                <div class="table-responsive">
                    <table class="table table-bordered align-middle">
                        <thead class="table-light">
                            <tr>
                                <th>Hình ảnh</th>
                                <th>Sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($order->items as $item)
                            <tr>
                                <td style="width: 100px;">
                                    <img src="{{Storage::url($item->product->image) }}"
                                        alt="{{ $item->product->title ?? 'SP' }}" class="img-fluid rounded" />
                                </td>
                                <td>
                                    <strong>{{ $item->product->title ?? 'Không tìm thấy' }}</strong>
                                    @if ($item->variant)
                                    <p class="text-muted mb-0">Biến thể: {{ $item->variant->color }}</p>
                                    @else
                                    <p class="text-muted mb-0">Không có biến thể</p>
                                    @endif
                                </td>

                                <td>{{ number_format($item->price, 0, ',', '.') }} VND</td>
                                <td>{{ $item->quantity }}</td>
                                <td>{{ number_format($item->price * $item->quantity, 0, ',', '.') }} VND</td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                <!-- Tổng cộng -->
                <div class="text-end mt-4">
                    <h4>Tổng tiền: {{ number_format($order->total_amount, 0, ',', '.') }} VND</h4>
                </div>

            </div>
        </div>
    </div>
</div>
@endsection
