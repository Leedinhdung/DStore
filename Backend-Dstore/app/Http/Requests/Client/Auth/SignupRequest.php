<?php

namespace App\Http\Requests\Client\Auth;

use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends FormRequest
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
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ];
    }
    public function messages(): array{
        return [
            'full_name.required' => 'Họ và tên không được để trống',
            'email.required'=>'Email không được để trống',
            'email.email'=>'Vui lòng nhập đúng định dạng email',
            'password.required'=>'Mật khẩu không được để trống',
            'password.min'=>'Mật khẩu phải có ít nhất 8 kí tự',
            'password.confirmed' => 'Mật khẩu xác nhận không khớp.',
        ];
    }
}
