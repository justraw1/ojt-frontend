<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class addUser extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'username' => 'Admin',
            'user_type' => 'Admin', // or whatever user type you need
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin2102'), // Hashes the password
        ]);
    }
}
