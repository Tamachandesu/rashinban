let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/components/pages/App.js', 'public/js')
    .react('resources/js/components/atoms/Form.js', 'public/js')
    .react('resources/js/components/organisms/Signin.js', 'public/js')
    .react('resources/js/components/organisms/Signup.js', 'public/js')
    .react('resources/js/components/templates/Top.js', 'public/js')
    .react('resources/js/components/organisms/Home.js', 'public/js')
    .react('resources/js/components/melecules/Heading.js', 'public/js')
    .react('resources/js/components/melecules/Sidebar.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');
