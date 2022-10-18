<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        if (request('format') == "login") {
            return [
                "email" => "email|required",
                "password" => "required"
            ];
        } else if (request('format') == "register") {
            return [
                "name" => "string|required",
                "email" => "email|required|unique:users",
                "password" => "required|min:6"
            ];
        }
    }
}
