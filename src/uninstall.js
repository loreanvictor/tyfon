const fs = require('fs').promises;

const exec = require('./util/exec');
const { g, h, b, l, say } = require('./util/echo');


module.exports = async (args = {}) => {
  const pkg = JSON.parse(await fs.readFile('package.json'));
  if (!pkg.tyfons) return;

  const entries = Object.entries(pkg.tyfons);
  const pnames = [];

  say();
  say('Removing packages', g('...'));
  say();

  for (let i = 0, name = args._[i]; i < args._.length; name = args._[++i]) {
    if (name.startsWith('localhost')) name = 'http://' + name;
    let url, pname, entry;
    if (name in pkg.tyfons) {
      url = name;
      pname = pkg.tyfons[url].name;
    } else if (entry = entries.find(e => e[1].name === name)) {
      url = entry[0];
      pname = name;
    }

    if (url, pname) {
      say('🧹 Removing', l(url), '(', h(pname), ')', g('...'));
      delete pkg.tyfons[url];
      pnames.push(pname);
    }
  }

  if (pnames.length > 0) {
    say();
    if (Object.keys(pkg.tyfons).length === 0) {
      delete pkg.tyfons;
    }

    await fs.writeFile('package.json', JSON.stringify(pkg, undefined, 2));
    await exec('npm', `uninstall ${pnames.join(' ')}`);
  }

  say();
  say('✨', b(pnames.length), 'SDKs removed.');
  say();
}

module.exports.usage = b('uninstall') + ' <url | package>';
module.exports.hint = 'Uninstalls given TyFON SDK.';
module.exports.examples = [
  'tyfon uninstall localhost:8000',
  'tyfon uninstall @api/my-tyfon',
]
module.exports.link = 'https://loreanvictor.github.io/tyfon/cli/uninstall';