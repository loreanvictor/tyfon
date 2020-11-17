const fs = require('fs').promises;
const path = require('path');

const exec = require('../util/exec');
const serveCode = require('../inject/serve.template');
const info = require('./info');
const types = require('./types');
const funcs = require('./funcs');


module.exports = async () => {
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
}
