<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * Default page of this application
 * named dashboard route
 */
Route::get('/', 'DashboardController@index');

/**
 * Roles route
 * from where add, view, update and delete action can be done
 */
Route::group(['prefix' => 'roles', /*'middleware' => ['auth.admin']*/], function () {
    Route::get('/', 'RoleController@index'); //Role's list page
});

/**
 * Permissions route
 * from where add, view, update and delete action can be done
 */
Route::group(['prefix' => 'permissions', 'middleware' => ['auth.admin']], function () {
    Route::get('/', 'PermissionController@index'); //Permission's list page
});

/**
 * Settings route
 * from where add, view, update and delete action can be done
 */
Route::group(['prefix' => 'settings', 'middleware' => ['auth.admin']], function () {
    Route::get('/', 'SettingController@index'); //Setting page
});
