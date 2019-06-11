import * as gulp from 'gulp';
import * as del from 'del';
import {pluginMarkup} from './process-markup';
import {pluginCSS} from './process-css';
import {pluginJson} from './process-json';
import {buildPluginJavaScript} from './transpile';

function clean() {
  return del('dist');
}

export default gulp.series(
  clean,
  gulp.parallel(
    // package.json "module" field pointing to dist/index.js
    pluginMarkup('dist'),
    pluginCSS('dist'),
    pluginJson('dist'),
    buildPluginJavaScript('dist', 'es2015'),
  ),
  () => console.log('Finish building Aurelia plugin to dist')
);
