const { gulp } = tars.packages;
const { gulpif } = tars.packages;
const { plumber } = tars.packages;
const { notifier } = tars.helpers;

const beml = require('gulp-beml');

/**
 * Minify HTML (optional task)
 */
module.exports = () => {
  return gulp.task('html:minify-html', () => {
    const usersModifyOptions = require(`${tars.root}/user-tasks/html/helpers/modify-options`);
    const minifyOpts = Object.assign(tars.pluginsConfig['gulp-htmlmin'], usersModifyOptions.minifyOpts);
    /* eslint-disable camelcase */
    const prettifyOpts = Object.assign(
      tars.pluginsConfig['gulp-html-prettify'],
      usersModifyOptions.prettifyOpts
    );
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
      .pipe(
        gulpif(
          tars.config.minifyHtml,
          tars.require('gulp-htmlmin')(minifyOpts),
          tars.require('gulp-html-prettify')(prettifyOpts)
        )
      )
      .pipe(gulp.dest(`${tars.config.devPath}`))
      .pipe(notifier.success("Compiled html've been processed."));
  });
};
