const exec = require('./util/exec');
const mkdir = require('mkdirp');
const fs = require('fs').promises;
const path = require('path');

const template = require('./util/serve.template');

module.exports = async () => {
  await mkdir('dist');
  await fs.writeFile(path.join('dist', '__serve.js'), template());
  await exec('tsc', `-d index.ts --outDir dist`);
}
