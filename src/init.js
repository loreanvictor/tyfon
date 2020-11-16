const shell = require('shelljs');
const mkdir = require('mkdirp');
const fs = require('fs').promises;

const exec = require('./util/exec');
const build = require('./build');


module.exports = async() => {
  await mkdir('dist');

  shell.cd('dist');
  await fs.writeFile('package.json', '{}');
  await exec('npm', 'i express cors body-parser');

  shell.cd('..');
  await build();
};
