<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Otp extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'otp',
        'expires_at',
        'used'
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'used' => 'boolean',
    ];

    /**
     * Kiểm tra OTP có hợp lệ không
     */
    public function isValid()
    {
        return !$this->used && $this->expires_at->isFuture();
    }

    /**
     * Đánh dấu OTP đã được sử dụng
     */
    public function markAsUsed()
    {
        $this->update(['used' => true]);
    }
}
