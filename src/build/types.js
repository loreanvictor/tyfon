const { files, pathMatch, readFile } = require('rxline/fs');


module.exports = () => new Promise((resolve, reject) => {
  const res = {};

  files('.', { root: 'dist' })
  .pick(pathMatch(/\.d\.ts$/))
  .drop(pathMatch(/node_modules/))
  .pipe(readFile())
  .pipe(file => res[file.path] = file.content)
  .collect(() => resolve(res));
});
