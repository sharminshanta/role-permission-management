<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('user', function (Request $request) {
    return $request->user();
});

/*/**
 * Landing page for dashboard
 */
Route::get('/', 'DefaultController@index'); //Landing Page of App
Route::get('/dashboard', 'DashboardController@index'); //Landing Page of Dashboard
Route::get('/roles', 'RoleController@getRole'); //Role view

