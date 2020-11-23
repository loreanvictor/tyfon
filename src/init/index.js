const shell = require('shelljs');
const mkdir = require('mkdirp');
const fs = require('fs').promises;

const exec = require('../util/exec');
const rollupCode = require('../inject/rollup.template');
const { cheer, say, b, h, g } = require('../util/echo');


module.exports = async() => {
  say();
  say('Initializing', b(h('tyfon')), g(' ...'));

  await mkdir('dist');

  shell.cd('dist');

  say('📦 installing network layer packages', g(' ...'));
  say();

  await fs.writeFile('package.json', '{}');
  await exec('npm', 'i tyfon-server');
  await exec('npm', 'i --save-dev typescript rollup-plugin-dts');
  await fs.writeFile('rollup.config.js', rollupCode());

  shell.cd('..');

  cheer();
  cheer(b(h('tyfon')), 'successfully initialized! 🍻');
  cheer();
};

module.exports.check = require('./check');
module.exports.hint = 'initialize TyFON server.';
module.exports.link = 'https://loreanvictor.github.io/tyfon/cli/init';
