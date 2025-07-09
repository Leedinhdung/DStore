<?php

namespace App\Http\Requests\Admin\Banner;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBannerRequest extends FormRequest
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
        return [
            'url' => ['nullable', 'url', 'required_without:image'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048', 'required_without:url'],
        ];
    }
    public function messages(): array
    {
        return [
            'url.required_without'   => 'Vui lòng nhập đường dẫn hoặc chọn ảnh.',
            'url.url'                => 'Đường dẫn không hợp lệ.',
            'image.required_without' => 'Vui lòng chọn ảnh hoặc nhập đường dẫn.',
            'image.image'            => 'Tệp tải lên phải là một hình ảnh.',
            'image.mimes'            => 'Ảnh phải có định dạng: jpg, jpeg, png hoặc webp.',
            'image.max'              => 'Ảnh không được vượt quá 2MB.',
        ];
    }
}
