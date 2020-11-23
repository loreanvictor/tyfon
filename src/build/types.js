const fs = require('fs').promises;
const path = require('path');

const exec = require('../util/exec');

// const { files, pathMatch, readFile } = require('rxline/fs');


// module.exports = () => new Promise((resolve, reject) => {
//   const res = {};

//   files('.', { root: 'dist' })
//   .pick(pathMatch(/\.d\.ts$/))
//   .drop(pathMatch(/node_modules/))
//   .pipe(readFile())
//   .pipe(file => res[file.path] = file.content)
//   .collect(() => resolve(res));
// });
module.exports = async () => {
  await exec('rollup', `-c ${path.join('dist', 'rollup.config.js')}`);
  const typeBundle = await fs.readFile(path.join('dist', '__spec.d.ts'));
  return {
    'index.d.ts': typeBundle.toString()
  }
}
