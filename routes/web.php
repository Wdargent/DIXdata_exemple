<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});



// Redirection de toutes les autres routes vers la vue 'app'
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');