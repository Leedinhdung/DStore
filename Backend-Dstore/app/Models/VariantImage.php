<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VariantImage extends Model
{
    use HasFactory, softDeletes;

    protected $fillable = [
        'variant_id',
        'image_path'
    ];
    public function variant(){
        return $this->belongsTo(ProductVariant::class,'product_variant_id');
    }
}
