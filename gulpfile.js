var gulp       = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('src/sass/**/*.scss') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('src/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'src' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'src/libs/jquery.ui.core.js',
		'src/libs/jquery.ui.datepicker.js',
		 'src/libs/jquery.ui.widget.js',
		 'src/libs/jquery.nicescroll.min.js',
		 'src/libs/jquery.mousewheel.min.js',
		 'src/libs/select2.min.js',
		 'src/libs/placeholders.min.js',
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('src/js')); // Выгружаем в папку app/js
});
gulp.task('styles', function(){
	return gulp.src(['src/css/fonts.css', 'src/css/main.css'])
		.pipe(concat('style.css'))
		.pipe(gulp.dest('src/css/'));
});
gulp.task('css-libs', ['sass'], function() {
	return gulp.src(['src/css/select2.css', 'src/css/tipuedrop.css'])
		.pipe(concat('libs.css'))
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('src/css')); // Выгружаем в папку app/css
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts', 'styles'], function() {
	gulp.watch('src/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('src/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('src/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
	return del.sync(['dist/**/*', '!dist/img', '!dist/img/**/*','!dist/fonts', '!dist/fonts/**/*', '!dist/uploads', '!dist/uploads/**/*']); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*') // Берем все изображения из app
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts', 'styles'], function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'src/css/style.css',
		'src/css/libs.min.css',
		'src/css/base/**/*'
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('src/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
