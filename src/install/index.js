const fs = require('fs').promises;
const install = require('./install-package');
const { say, b, i } = require('../util/echo');


module.exports = async (args = {}) => {
  const env = args.env || args.e || 'all';

  if (args._.length > 0) {
    const sdks = {};
    for (let i = 0, url = args._[i]; i < args._.length; url = args._[++i]) {
      const sdk = await install(url);
      if (sdk) {
        sdks[sdk.url] = { ...sdk, env };
      }
    }

    const pkg = JSON.parse(await fs.readFile('package.json'));
    pkg.tyfons = { ...pkg.tyfons || {}, ...sdks };
    await fs.writeFile('package.json', JSON.stringify(pkg, undefined, 2));
  } else {
    const pkg = JSON.parse(await fs.readFile('package.json'));
    const entries = Object.entries(pkg.tyfons || {});
    for (let i = 0, entry = entries[i]; i < entries.length; entry = entries[++i]) {
      const [url, sdk] = entry;
      if (sdk.env === 'all' || sdk.env === env) {
        await install(url);
      }
    }
  }
}

module.exports.hint = 'install TyFON SDK for given URL.';
module.exports.usage = b('install') + ' <url>';
module.exports.options = { 
  '--env': 'environment of the SDKs',
  '-e': 'shortcut for --env',
}
module.exports.examples = [
  'tyfon install localhost:8000',
  'tyfon install https://my-server.cloud --env prod',
  'tyfon install',
  'tyfon install --env prod',
]