var gulp = require('gulp');
var deploy = require('gulp-gh-pages');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var cssmin = require('gulp-cssmin');
var runSequence = require('run-sequence');

/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});

// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'ng'
    }
  })
})

// Convert SCSS to CSS
gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest('public/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// Watch main SCSS file
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('scss/**/*.scss', ['sass']);
  // Other watchers
});

// Live reloading with browserSync
gulp.task('sass', function() {
  return gulp.src(['scss/main.scss', 'scss/articles/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Optimization Tasks
// ------------------

// Optimizing CSS and JavaScript
// gulp.task('useref', function(){
//   return gulp.src('ng/*.html')
//     .pipe(useref())
//     .pipe(gulpIf('*.js', uglify()))
//     .pipe(gulpIf('*.css', cssnano()))
//     .pipe(gulp.dest('dist'))
// });

// Minify CSS
gulp.task('mincss', function () {
    gulp.src('public/**/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('public'));
});
