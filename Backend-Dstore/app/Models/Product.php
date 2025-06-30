<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, softDeletes;
    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'brand',
        'sku',
        'stock',
        'condition',
        'original_price',
        'sale_price',
        'status',
        'short_description',
        'description',
        'specification',
        'image',
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }
}
