//Вызываем галп
const gulp = require('gulp');
// Меняет имена файлов
const rename = require('gulp-rename');
//Плагин, который объединяет файлы в один файл.
const concat = require('gulp-concat');
//Планин, который расставляет префиксы. Очень удобно.
const autoprefixer = require('gulp-autoprefixer');
//Плагин для оптимизации стилей
const cleanCSS = require('gulp-clean-css');
//Плагин для оптимизации скриптов
const uglify = require('gulp-uglify');
//Плагин для удаления файлов.
const del = require('del');
//Синхронизация с браузером. Не надо нажимать com+r для чтобы увидить обновить.
const browserSync = require('browser-sync').create();
//Для препроцессоров стилей
const sourcemaps = require('gulp-sourcemaps');
//Препроцессор LESS
const less = require('gulp-less');
//Оптимизация картинок
const imagemin = require('gulp-imagemin');
// //
const plumber = require('gulp-plumber');
// Меняет формат изображений с png,jpeg на webp
const webp = require('gulp-webp');
// Объединяет все svg в один файл sprite.svg
const svgstore = require('gulp-svgstore');
//
const htmlmin = require('gulp-htmlmin');
//
const posthtml = require('gulp-posthtml');
//
const include = require('posthtml-include');


/*
const cssFiles = [
    './src/css/main.css',
    './src/css/media.css'
]
*/

// Массив с файлами из папки ./src/css/*.css
const lessFiles = [
  './src/css/fonts.less',
  './src/css/variables.less',
  './src/css/scaffolding.less',
  './src/css/main.less',
  './src/css/page-header.less',
  './src/css/programs.less',
  './src/css/process.less',
  './src/css/example.less',
  './src/css/page-catalog.less',
  './src/css/page-form.less',
  './src/css/form.less',
  './src/css/data.less',
  './src/css/catalog.less',
  './src/css/add-catalog.less',
  './src/css/list.less',
  './src/css/page-footer.less',
  './src/css/location.less',
  './src/css/copyright.less',
  './src/css/social-list.less'
]

// Массив с файлами из папки ./src/js/*.js
const jsFiles = [
  './src/js/lib.js',
  './src/js/main.js'
]

// Таск на стили CSS
gulp.task('styles', () => {
  //Шаблон для поиска файлов CSS
  //Все файлы по шаблону './src/css/**/*.css'
  return gulp.src(lessFiles)
    //Для препроцессоров стилей
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(less())
    //Объединение файлов в один файл.
    .pipe(concat('min.style.css'))
    //Данный плагин расставляет префиксы в css
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    //cleanCSS - минифицирует файл.
    .pipe(cleanCSS({
      level: 1
    }))
    .pipe(sourcemaps.write('./'))
    //Выходная папка для стилей
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
})

gulp.task('style', () => {
  //Шаблон для поиска файлов CSS
  //Все файлы по шаблону './src/css/**/*.css'
  return gulp.src(lessFiles)
    //Для препроцессоров стилей
    .pipe(less())
    //Объединение файлов в один файл.
    .pipe(concat('style.css'))
    //Данный плагин расставляет префиксы в css
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    //cleanCSS - минифицирует файл.
    //Выходная папка для стилей
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
})

// Таск на стили JS
gulp.task('scripts', () => {
  //Шаблон для поиска файлов JS
  //Все файлы по шаблону './src/js/**/*.js'
  return gulp.src(jsFiles)
    .pipe(concat('script.js'))
    //uglify - минифицирует файл.
    .pipe(uglify())
    //Выходная папка для стилей
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
})

//Таск для удаления файлов внутри папок
gulp.task('del', () => {
  return del(['build/*'])
})

//Таск для оптимизации картинок.
gulp.task('img-compress', () => {
  return gulp.src('./src/img/**')
    .pipe(imagemin({
      progressive: true

    }))
    .pipe(gulp.dest('./build/img/'))
})

gulp.task('webp', () => {
  return gulp.src('./src/img/**')
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('./build/img/'))
})

gulp.task('sprite', () => {
  return gulp.src('./src/img/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('./build/img/'))
})

gulp.task("html", function () {
  return gulp.src('src/*.html')
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'))
    .on('end', browserSync.reload);
});

gulp.task('fonts', () => {
  return gulp.src('./src/fonts/**')
    .pipe(gulp.dest('./build/fonts'))

})



//Таск, который следит за изменениями файлов и при сохранении срабатывает.
gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  //Следить за IMG файлами
  gulp.watch('./src/img/**', gulp.series('img-compress'))
  gulp.watch('./src/img/**', gulp.series('webp'))
  gulp.watch('./src/img/*.svg', gulp.series('sprite'))
  gulp.watch('./*.html', gulp.series('html'))
  gulp.watch('./src/fonts/**', gulp.series('fonts'))
  //Следить за CSS файлами
  //gulp.watch('./src/css/**/*.css', styles)
  //Следить за LESS файлами
  gulp.watch('./src/css/**/*.less', gulp.series('styles'))
  gulp.watch('./src/css/**/*.less', gulp.series('style'))
  //Следить за JS файлами
  gulp.watch('./src/js/**/*.js', gulp.series('scripts'))
  //Следить за HTML файлами
  gulp.watch("./src/index.html").on('change', browserSync.reload);
  gulp.watch("./src/catalog.html").on('change', browserSync.reload);
  gulp.watch("./src/form.html").on('change', browserSync.reload);
})

gulp.task('default', gulp.series('del', 'fonts', gulp.parallel('styles', 'style', 'scripts', 'img-compress', 'webp'), 'sprite', 'html', 'watch'));


