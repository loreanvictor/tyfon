const shell = require('shelljs');
const { err, ERR, h, b, bash} = require('../util/echo');


module.exports = (grace=false) => {
  if (!(
    shell.test('-d', 'dist')
    && shell.test('-e', 'dist/package.json')
    && shell.test('-d', 'dist/node_modules/express')
    && shell.test('-d', 'dist/node_modules/cors')
    && shell.test('-d', 'dist/node_modules/body-parser')
  )) {
    if (grace) return false;

    err();
    ERR('improper initialization.');
    err();
    err('it seems like', h(b('tyfon')), 'was not properly initialized in current folder.');
    err('please run the following command:');
    err();
    err(bash('tyfon init'));
    err();
    process.exit(0);
  }

  return true;
}
