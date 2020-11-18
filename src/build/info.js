const fs = require('fs').promises;

const { warn, WARN, l } = require('../util/echo');


module.exports = async () => {
  let package = {};
  try {
    package = JSON.parse(await fs.readFile('package.json'));
  } catch {}

  if (!package.name) {
    warn();
    WARN('package name not found!');
    warn('please check', l('package.json'), 'to see if name is set properly.');
    warn();
  }

  return {
    name: package.name || 'unnamed-api',
    version: package.version || '0.0.0',
  }
}
