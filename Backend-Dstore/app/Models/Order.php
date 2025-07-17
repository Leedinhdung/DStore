<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'code',
        'customer_name',
        'customer_email',
        'customer_phone',
        'shipping_address',
        'total_amount',
        'payment_method',
        'status',
        'note',
        'user_id',
        'vnp_transaction_id',
        'vnp_response_code',
        'vnp_bank_code',
        'paid_at',
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function markAsPaid()
    {
        $this->update([
            'status' => 'paid',
        ]);
    }
}
