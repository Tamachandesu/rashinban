<?php

use Illuminate\Http\Request;

Route::get('users', 'UserController@getUser');
Route::post('signup', 'UserController@signup');
Route::post('signin', 'UserController@signin');
Route::get('/refreshToken', 'UserController@refreshToken');

// 一旦APIトークン無視、CREATE
 Route::post('schedule', 'ScheduleController@store');

// 一旦APIトークン無視、EDIT
 Route::patch('schedule/{schedule_id}', 'ScheduleController@update');
//  一旦APIトークン無視、DELETE
 Route::get('schedule/{schedule_id}/delete', 'ScheduleController@delete');
 Route::delete('schedule/{schedule_id}', 'ScheduleController@destroy');

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('user', 'UserController@index');
    Route::group(['prefix' => 'user/{user_id}'], function () {
        Route::get('schedule', 'ScheduleController@index');
    });
});

//Route::resource('user', 'UserController');