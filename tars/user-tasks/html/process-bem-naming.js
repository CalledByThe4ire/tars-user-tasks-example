const { gulp } = tars.packages;
const { plumber } = tars.packages;
const { notifier } = tars.helpers;

const beml = require('gulp-beml');

/**
 * Minify HTML (optional task)
 */
module.exports = () => {
  return gulp.task('html:process-bem-naming', () => {
    const bemlOpts = {
      elemPrefix: '__',
      modPrefix: '--',
      modDlmtr: '-'
    };
    /* eslint-enable camelcase */

    return gulp
      .src(`${tars.config.devPath}**/*.html`)
      .pipe(
        plumber({
          errorHandler(error) {
            notifier.error('An error occurred while processing compiled html-files.', error);
          }
        })
      )
      .pipe(beml(bemlOpts))
      .pipe(gulp.dest(`${tars.config.devPath}`))
      .pipe(notifier.success("Compiled html've been processed."));
  });
};
