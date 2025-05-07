<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IncidentController;

#Incidents
Route::resource('incidents', IncidentController::class);