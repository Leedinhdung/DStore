<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('items.product')->paginate(10);
        return view('order.index', compact('orders'));
    }
    public function show(Order $order)
    {

        $order->load(['items.product', 'items.variant']);

        return view('order.show', compact('order'));
    }
    public function updateStatus(Request $request, Order $order)
    { 
        $order->status = $request->status;
        $order->save();

        return back()->with('success', 'Cập nhật trạng thái thành công.');
    }
}
