<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use \App\Models\Category;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Category::class)->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('title')->unique();
            $table->string('slug')->unique();
            $table->string('brand');
            $table->string('sku')->unique();
            $table->string('image');
            $table->decimal('original_price',15,2);
            $table->decimal('sale_price',15,2)->nullable();
            $table->enum('condition', ['instock', 'outofstock'])->default('instock');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->text('description');
            $table->text('short_description');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
