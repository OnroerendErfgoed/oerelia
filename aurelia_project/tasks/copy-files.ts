import * as gulp from 'gulp';
import * as path from 'path';
import * as minimatch from 'minimatch';
import * as project from '../aurelia.json';

export default function copyFiles(done) {
  if (typeof project.build.copyFiles !== 'object') {
    done();
    return;
  }

  const instruction = getNormalizedInstruction(project.build.copyFiles);
  const files = Object.keys(instruction);

  return gulp.src(files, { since: gulp.lastRun(copyFiles) })
    .pipe(gulp.dest(x => {
      const filePath = prepareFilePath(x.path);
      const key = files.find(f => minimatch(filePath, f));
      return instruction[key];
    }));
}


export function pluginCopyFiles(dest) {
  return function processPluginCopyFiles() {
    const instruction = getNormalizedInstruction(project.build.pluginCopyFiles);
    const files = Object.keys(instruction);

    return gulp
      .src(files, { since: gulp.lastRun(pluginCopyFiles) })
      .pipe(gulp.dest(
        (x) => {
          const filePath = prepareFilePath(x.path);
          const key = files.find(f => minimatch(filePath, f));
          return `${dest}/${instruction[key]}`.replace('//', '/');
        }));
  };


}

function getNormalizedInstruction(files) {
  let normalizedInstruction = {};

  for (let key in files) {
    normalizedInstruction[path.posix.normalize(key)] = files[key];
  }

  return normalizedInstruction;
}

function prepareFilePath(filePath) {
  let preparedPath = filePath.replace(process.cwd(), '').slice(1);

  //if we are running on windows we have to fix the path
  if (/^win/.test(process.platform)) {
    preparedPath = preparedPath.replace(/\\/g, '/');
  }

  return preparedPath;
}
