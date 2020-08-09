<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('user', function (Request $request) {
    return $request->user();
});

/*/**
 * Landing page for dashboard
 */
//Route::get('/', 'DefaultController@index'); //Landing Page of App
//Route::get('/dashboard', 'DashboardController@index'); //Landing Page of Dashboard

/**
 * Roles Routes
 * All user defined role can be create, read, update and delete here
 */
Route::get('/roles', 'RoleController@getRole'); //Role view

/**
 * All roles action routes
 * Roles can be add, update and delete with this route
 */
Route::group(['prefix' => 'role'], function () {
    Route::post('store', 'RoleController@store');
    Route::get('edit/{id}', 'RoleController@edit');
    Route::post('update/{id}', 'RoleController@update');
    Route::delete('delete/{id}', 'RoleController@delete');
});
