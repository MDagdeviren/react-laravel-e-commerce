<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Models\TmpEmployee;
use Tymon\JWTAuth\JWTAuth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(AuthRequest $request)
    {
        // return $request;
        $validator = validator()->make(request()->all(), [
            'name' => 'string|required',
            'email' => 'email|required',
            'password' => 'string| min:6',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Registration Faild',

            ], 400);
        }
        if ($request->key) {
            $tmp_employee = TmpEmployee::select('store_admin_id')->where('key', $request->key)->first();
            // return  $tmp_employee->store_admin_id;
            $storeId = User::find($tmp_employee->store_admin_id);
            $user = User::where('email', $request->email);
            if ($user) {
                $user->update([
                    'name' => $request->input('name'),
                    'email' => $request->input('email'),
                    'password' => Hash::make($request->input('password')),
                    'user_level' => '2',
                    'store_id' => $storeId->store_id
                ]);
                return response()->json([
                    'message' => 'User Updated',
                    'user' => $user
                ]);
                $tmp_employee->delete();
            } else {
                $employee = User::create([
                    'name' => $request->input('name'),
                    'email' => $request->input('email'),
                    'password' => Hash::make($request->input('password')),
                    'user_level' => '2',
                    'store_id' => $storeId
                ]);
                return response()->json([
                    'message' => 'User Created',
                    'user' => $employee
                ]);
                $tmp_employee->delete();
            }
        } else {

            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
            ]);
            return response()->json([
                'message' => 'User Created',
                'user' => $user
            ]);
        }
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(AuthRequest $request)
    {
        $credentials = request(['email', 'password']);
        $user = User::select('id', 'name', 'email', 'user_level', 'store_id')->where('email', request('email'))->get(); //select('name', 'email', 'user_level')->
        if (!$token = auth()->claims(['user' => $user])->attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized-Please Check Your Inputs'], 401);
        }

        return response()->json([
            'token' => $this->respondWithToken($token)->original,
            // 'status' => 'success'
        ]); //->withCookie()
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl')
        ]);
    }
}
