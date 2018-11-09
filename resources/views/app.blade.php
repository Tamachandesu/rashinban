<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon" href="favicon.ico" type="image/vnd.microsoft.icon">
    <link rel="stylesheet" href="{{ asset('/css/app.css') }}">
    <link rel="shortcut icon" href="public/favicon.ico" type="image/vnd.microsoft.icon">
    <title>RASHINBAN</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="{{asset('/js/app.js')}}"></script>
  </body>
</html>
