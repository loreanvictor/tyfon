const fs = require('fs').promises;
const path = require('path');
const shell = require('shelljs');
const { err, ERR, h, b, bash, warn, WARN } = require('../util/echo');


module.exports = async (grace=false) => {
  if (!(
    shell.test('-e', path.join('dist', '__serve.js'))
    && shell.test('-e', path.join('dist', '__api.json'))
    && shell.test('-e', path.join('dist', '__build.json'))
  )) {
    if (grace) return false;

    err();
    ERR('improper build.');
    err();
    err('it seems current folder was not properly built properly.');
    err('please run the following command:');
    err();
    err(bash('tyfon build'));
    err();
    process.exit(0);
  } else {
    const buildInfo = JSON.parse(await fs.readFile(path.join('dist', '__build.json')));
    const version = require('../../package.json').version;
    if (version !== buildInfo.cliVersion) {
      if (grace) return false;

      warn();
      WARN('outdated build.');
      warn();
      warn('last build was conducted using an older version of', h(b('tyfon')), '.');
      warn('please run the following command:');
      warn();
      warn(bash('tyfon build'));
      warn();
      process.exit(0);
    }
  }

  return true;
}
