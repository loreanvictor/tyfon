const shell = require('shelljs');
const { say, h, b, c, pad } = require('./util/echo');


const version = pkg => new Promise((resolve, reject) => {
  shell.exec(`npm show ${pkg} version`, { silent: true }, (status, version) => {
    if (status === 0) resolve(version.trim());
    else reject();
  });
});

module.exports = async () => {
  say();
  const local = require('../package.json').version;
  say(' ', pad(32, '💻 Installed version:'), h(b(local)));

  const latest = await version('tyfon');
  say(' ', pad(32, '🚀 Latest version:'), c(b(latest)));
  say();
}

module.exports.hint = 'Show CLI version.';
module.exports.link = 'https://loreanvictor.github.io/tyfon/cli/version';