var Server = require('static-server'),
    gulp = require('gulp');

gulp.task('default', function () {
  new Server({
    rootPath: '.',
    port: 8000
  }).start();

  return Promise.resolve();
});