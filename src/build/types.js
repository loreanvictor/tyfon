const fs = require('fs').promises;
const path = require('path');

const exec = require('../util/exec');


module.exports = async () => {
  await exec('rollup', `-c ${path.join('dist', 'rollup.config.js')}`);
  const typeBundle = await fs.readFile(path.join('dist', '__spec.d.ts'));
  return {
    'index.d.ts': typeBundle.toString()
  }
}
