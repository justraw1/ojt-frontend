<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request) {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $tokenResult = $user->createToken('Personal Access Token');

            return response()->json([
                'status' => 'success',
                'token' => $tokenResult->plainTextToken,
                'username' => $user->username,
                'user_type' => $user->user_type,
                'user_id' => $user->user_id,
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Incorrect Password',
        ]);
    }

    public function logout(Request $request) {
        $user = Auth::user();
    
        if ($user) {
            $user->tokens()->delete();
    
            return response()->json([
                'status' => 'success',
                'message' => 'Logged out successfully',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'No user is currently authenticated',
            ], 401);
        }
    }

    public function register(Request $request) {
        $user = User::create([
            "username" => $request->username,
            "email" => $request->email,
            "password" => Hash::make($request->password),
            "user_type" => "Faculty",
        ]);

        return response()->json([
            "status" => "success",
        ]);
    }
}
