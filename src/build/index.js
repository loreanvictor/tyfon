const fs = require('fs').promises;
const path = require('path');

const exec = require('../util/exec');
const serveCode = require('../inject/serve.template');

const info = require('./info');
const types = require('./types');
const funcs = require('./funcs');
const init = require('../init');

const { say, cheer } = require('../util/echo');


module.exports = async () => {
  if (!await init.check(true)) {
    await init();
  }

  say();
  say('🏗️ Building network layer code and client SDK metadata ...');
  say();

  await fs.writeFile(path.join('dist', '__serve.js'), serveCode());
  await exec('tsc', `-d index.ts --outDir dist`);

  const _types = await types();
  const _funcs = await funcs();
  const _info = await info();

  await fs.writeFile(path.join('dist', '__api.json'), JSON.stringify({
    ..._info,
    types: _types,
    funcs: _funcs
  }, undefined, 2));

  const version = require('../../package.json').version;
  await fs.writeFile(path.join('dist', '__build.json'), JSON.stringify({
    cliVersion: version,
    date: new Date(),
  }, undefined, 2));

  cheer();
  cheer('✅ Network layer code and client SDK metadata built! 🍻');
  cheer();
}

module.exports.check = require('./check');
module.exports.hint = 'build network layer and client SDK metadata.'