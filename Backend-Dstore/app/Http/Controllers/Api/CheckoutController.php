<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariant;
use App\Models\VariantImage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CheckoutController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'shipping_address' => 'required|string',
            'total' => 'required|numeric|min:1000',
            'payment_method' => 'required|in:cod,vnpay',
            'note' => 'nullable|string|max:255',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|exists:products,id',
            'items.*.variant_id' => 'required|exists:product_variants,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        DB::beginTransaction();
        try {
            $order = Order::create([
                'code' => 'HD' . time() . rand(100, 999),
                'customer_name' => $request->customer_name,
                'customer_email' => $request->customer_email,
                'customer_phone' => $request->customer_phone,
                'shipping_address' => $request->shipping_address,
                'total_amount' => $request->total,
                'payment_method' => $request->payment_method,
                'status' => 'pending',
                'note' => $request->note,
                'user_id' => null,
            ]);

            foreach ($request->items as $item) {
                // 1. Tạo order item
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);

                $variant = ProductVariant::find($item['variant_id']);
                if ($variant) {
                    $variant->quantity -= $item['quantity'];
                    $variant->quantity = max(0, $variant->quantity);
                    $variant->save();

                    if ($variant->quantity === 0) {
                        $product = $variant->product;
                        if ($product && !$product->variants()->where('quantity', '>', 0)->exists()) {
                            $product->condition = 'outofstock';
                            $product->save();
                        }
                    }
                }
            }

            if ($request->payment_method === 'vnpay') {
                DB::commit();
                return response()->json([
                    'success' => true,
                    'redirect_url' => $this->createVNPayUrl($order),
                    'order_code' => $order->code,
                    'message' => 'Đơn hàng đã được tạo, đang chuyển hướng đến VNPay...',
                ]);
            }

            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.',
                'order_code' => $order->code,
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Checkout error: ' . $e->getMessage());
            return response()->json([
                'error' => true,
                'message' => 'Lỗi khi tạo đơn hàng: ' . $e->getMessage(),
            ], 500);
        }
    }

    protected function createVNPayUrl(Order $order)
    {
        $vnp_Url = env('VNP_URL');
        $vnp_Returnurl = env('VNP_RETURN_URL');
        $vnp_TmnCode = env('VNP_TMNCODE');
        $vnp_HashSecret = env('VNP_HASH_SECRET');

        $vnp_TxnRef = $order->code;
        $vnp_OrderInfo = 'Thanh toán đơn hàng ' . $order->code . ' - ' . $order->customer_name;
        $vnp_Amount = $order->total_amount * 100;
        $vnp_Locale = 'vn';
        $vnp_BankCode = 'NCB';
        $vnp_IpAddr = request()->ip();

        $inputData = [
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => now()->format('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => "billpayment",
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
        ];

        ksort($inputData);

        $hashData = '';
        $query = '';
        $i = 0;
        foreach ($inputData as $key => $value) {
            $encoded = urlencode($key) . '=' . urlencode($value);
            if ($i == 1) {
                $hashData .= '&' . $encoded;
                $query .= '&' . $encoded;
            } else {
                $hashData .= $encoded;
                $query .= $encoded;
                $i = 1;
            }
        }

        $vnp_SecureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);
        $vnp_Url .= '?' . $query . '&vnp_SecureHash=' . $vnp_SecureHash;

        return $vnp_Url;
    }


    public function vnpayReturn(Request $request)
    {
        $vnp_HashSecret = env('VNP_HASH_SECRET');
        $inputData = $request->except('vnp_SecureHashType', 'vnp_SecureHash');
        ksort($inputData);

        $hashData = "";
        $i = 0;
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData .= '&' . urlencode($key) . '=' . urlencode($value);
            } else {
                $hashData .= urlencode($key) . '=' . urlencode($value);
                $i = 1;
            }
        }

        $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

        Log::info('VNPay return data: ', $request->all());
        Log::info('Hash data: ' . $hashData);
        Log::info('Generated hash: ' . $secureHash);
        Log::info('VNPay provided hash: ' . $request->vnp_SecureHash);

        if ($secureHash === $request->vnp_SecureHash) {
            if ($request->vnp_ResponseCode == '00') {
                $order = Order::where('code', $request->vnp_TxnRef)->first();
                if ($order) {
                    $order->update([
                        'status' => 'paid',
                        'vnp_transaction_id' => $request->vnp_TransactionNo ?? null,
                        'vnp_bank_code' => $request->vnp_BankCode ?? null,
                        'vnp_response_code' => $request->vnp_ResponseCode ?? null,
                        'vnp_paid_at' => now(),
                    ]);
                }
                return redirect(env('FRONTEND_URL', 'http://localhost:3000') . '?payment/success?order_code=' . $request->vnp_TxnRef);
            } else {
                return redirect(env('FRONTEND_URL', 'http://localhost:3000') . '/payment/failed?message=' . urlencode($request->vnp_Message ?? 'Payment failed'));
            }
        }

        return redirect(env('FRONTEND_URL', 'http://localhost:3000') . '/payment/failed?message=' . urlencode('Chữ ký VNPay không hợp lệ'));
    }




    public function vnpayIPN(Request $request)
    {
        $vnp_HashSecret = env('VNP_HASH_SECRET');
        $inputData = $request->except('vnp_SecureHashType', 'vnp_SecureHash');
        ksort($inputData);

        $hashData = '';
        $i = 0;
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData .= '&' . urlencode($key) . '=' . urlencode($value);
            } else {
                $hashData .= urlencode($key) . '=' . urlencode($value);
                $i = 1;
            }
        }

        $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

        Log::info('VNPay IPN data: ', $request->all());
        Log::info('IPN Hash data: ' . $hashData);
        Log::info('Generated hash: ' . $secureHash);
        Log::info('VNPay provided hash: ' . $request->vnp_SecureHash);

        if ($secureHash === $request->vnp_SecureHash) {
            if ($request->vnp_ResponseCode == '00') {
                $order = Order::where('code', $request->vnp_TxnRef)->first();
                if ($order && $order->status === 'pending') {
                    $order->update([
                        'status' => 'paid',
                        'vnpay_transaction_id' => $request->vnp_TransactionNo ?? null,
                        'vnpay_bank_code' => $request->vnp_BankCode ?? null,
                        'paid_at' => now(),
                    ]);
                    return response()->json(['RspCode' => '00', 'Message' => 'Success']);
                } else {
                    return response()->json(['RspCode' => '02', 'Message' => 'Order already confirmed']);
                }
            } else {
                return response()->json(['RspCode' => '00', 'Message' => 'Success']);
            }
        }

        return response()->json(['RspCode' => '97', 'Message' => 'Invalid signature']);
    }

    // API để tra cứu đơn hàng bằng mã đơn hàng (không cần đăng nhập)
    public function getOrderByCode(Request $request)
    {
        $request->validate([
            'order_code' => 'required|string',
            'customer_email' => 'required|email',
        ]);

        $order = Order::where('code', $request->order_code)
            ->where('customer_email', $request->customer_email)
            ->with('items.product')
            ->first();

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy đơn hàng hoặc email không khớp',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'order' => $order,
        ]);
    }
}
