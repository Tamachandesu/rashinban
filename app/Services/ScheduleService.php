<?php
namespace App\Services;

use App\Repositories\Eloquent\Models\Schedule;
use App\Repositories\Eloquent\Models\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;


class ScheduleService {
    public function getAll($user_id) {
        $user = User::find($user_id);
        return $user->schedules()->get();
    }

    public function createSchedule(Request $request) {
        // 配列
        $user_ids = $request['users'];
        //unset($request['tag_id']);
        // TODO memoのnull許容
        // TODO 中間テーブルに外部キー、ondelete設定
        $schedule = Schedule::create([
            'start' => $request['start'],
            'end' => $request['end'],
            'title' => $request['title'],
            'memo' => $request['memo'],
        ]);
            
        //eval(\Psy\sh());
        //$schedule->users()->sync($user_id);
        // attach複数の場合
        foreach((array)$user_ids as $user_id) {
             $schedule->users()->attach((int)$user_id);
        }
    }

    public function update(Request $request) {
        //eval(\Psy\sh());
        // TODO 中間テーブル考える
        $schedule_id = $request['id'];
        $schedule = Schedule::find($schedule_id);
        $schedule-> title = $request->title;
        $schedule-> start = $request->start;
        $schedule-> end = $request->end;
        $schedule-> memo = $request->memo;
        $schedule->save();
    }

    public function destroy(Request $request) {
        $schedule_id = $request['id'];
        $user_ids = $request['users'];
        //eval(\Psy\sh());
        $schedule = Schedule::find($schedule_id);
        $schedule->delete();
        foreach((array)$user_ids as $user_id) {
            $schedule->users()->detach((int)$user_id);
       }
    }
}