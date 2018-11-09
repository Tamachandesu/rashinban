<?php

namespace App\Repositories\Eloquent\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = [
        'schedule_date', 'start', 'end', 'title', 'memo', 'location_id', 'repeat_settings',
    ];
    public function users() {
        return $this->belongsToMany('App\Repositories\Eloquent\Models\User', 'user_schedule');
    }
}