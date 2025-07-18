<?php

namespace App\Http\Requests\Admin\Product;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $productId = $this->route('product') ?? $this->id;

        return [
            'title' => 'required|string|max:500',
            'brand' => 'required|string|max:255',
            'sku' => [
                'required',
                'string',
                'max:100',
                Rule::unique('products', 'sku')->ignore($productId)
            ],
            'condition' => 'required|in:instock,outofstock',
            'original_price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0|lte:original_price',
            'short_description' => 'required|string|max:500',
            'description' => 'required|string',
            'specification' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',

            'variants' => 'required|array|min:1',
            'variants.*.id' => 'nullable|integer|exists:product_variants,id',
            'variants.*.color' => 'nullable|string|max:100',
            'variants.*.price' => 'required|numeric|min:0',
            'variants.*.quantity' => 'required|integer|min:0',
            'variants.*.image' => 'nullable|array',
            'variants.*.image.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:1024',
            'category_id' => ['required', 'exists:categories,id'],
        ];
    }


    public function messages(): array
    {
        return [
            'title.required' => 'Vui lòng nhập tên sản phẩm.',
            'title.string' => 'Tên sản phẩm phải là chuỗi ký tự.',
            'title.max' => 'Tên sản phẩm không được vượt quá 500 ký tự.',

            'brand.required' => 'Vui lòng nhập thương hiệu.',
            'brand.string' => 'Thương hiệu phải là chuỗi ký tự.',
            'brand.max' => 'Thương hiệu không được vượt quá 255 ký tự.',

            'sku.required' => 'Vui lòng nhập mã SKU.',
            'sku.string' => 'Mã SKU phải là chuỗi ký tự.',
            'sku.max' => 'Mã SKU không được vượt quá 100 ký tự.',
            'sku.unique' => 'Mã SKU đã tồn tại.',

            'condition.required' => 'Vui lòng chọn trạng thái.',
            'condition.in' => 'Trạng thái không hợp lệ.',

            'original_price.required' => 'Vui lòng nhập giá gốc.',
            'original_price.numeric' => 'Giá gốc phải là số.',
            'original_price.min' => 'Giá gốc không được âm.',

            'sale_price.numeric' => 'Giá bán phải là số.',
            'sale_price.min' => 'Giá bán không được âm.',
            'sale_price.lte' => 'Giá bán không được cao hơn giá gốc.',

            'short_description.required' => 'Mô tả ngắn không được để trống.',
            'short_description.string' => 'Mô tả ngắn phải là chuỗi ký tự.',
            'short_description.max' => 'Mô tả ngắn không được vượt quá 500 ký tự.',

            'description.required' => 'Mô tả chi tiết không được để trống.',
            'description.string' => 'Mô tả chi tiết phải là chuỗi ký tự.',

            'specification.required' => 'Thông số kỹ thuật không được để trống.',
            'specification.string' => 'Thông số kỹ thuật phải là chuỗi ký tự.',

            'image.image' => 'Tệp tải lên phải là ảnh.',
            'image.mimes' => 'Ảnh phải có định dạng: jpeg, png, jpg, gif.',
            'image.max' => 'Kích thước ảnh không được vượt quá 2MB.',

            'variants.required' => 'Vui lòng thêm ít nhất một biến thể.',
            'variants.array' => 'Biến thể phải là mảng.',
            'variants.min' => 'Phải có ít nhất một biến thể.',

            'variants.*.color.string' => 'Màu sắc phải là chuỗi ký tự.',
            'variants.*.color.max' => 'Màu sắc không được vượt quá 100 ký tự.',

            'variants.*.price.required' => 'Giá biến thể không được để trống.',
            'variants.*.price.numeric' => 'Giá biến thể phải là số.',
            'variants.*.price.min' => 'Giá biến thể không được âm.',

            'variants.*.required' => 'Vui lòng nhập số lượng tồn kho.',
            'variants.*.integer' => 'Số lượng tồn kho phải là số nguyên.',
            'variants.*.min' => 'Số lượng tồn kho không được âm.',

            'variants.*.image.array' => 'Ảnh biến thể phải là mảng.',
            'variants.*.image.*.image' => 'Tệp tải lên phải là ảnh.',
            'variants.*.image.*.mimes' => 'Ảnh biến thể phải có định dạng: jpeg, png, jpg, gif.',
            'variants.*.image.*.max' => 'Kích thước ảnh biến thể không được vượt quá 1MB.',
        ];
    }
}
