<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::view('/login', 'welcome');
Route::view('/register', 'welcome');