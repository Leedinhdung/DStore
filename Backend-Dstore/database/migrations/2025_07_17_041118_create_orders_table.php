<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->foreignId('user_id')->nullable();
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            $table->text('shipping_address');
            $table->decimal('total_amount', 15, 2);
            $table->enum('payment_method', ['cod', 'vnpay'])->default('vnpay');
            $table->enum('status', ['pending', 'confirmed', 'shipped', 'cancelled'])->default('pending');
            $table->enum('payment_status', ['unpaid', 'paid'])->default('unpaid');
            $table->text('note')->nullable();
            $table->string('vnp_transaction_id')->nullable();
            $table->string('vnp_response_code')->nullable();
            $table->string('vnp_bank_code')->nullable();
            $table->timestamp('vnp_paid_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
