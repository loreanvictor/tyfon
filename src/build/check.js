const shell = require('shelljs');
const { err, ERR, h, b, bash} = require('../util/echo');


module.exports = (grace=false) => {
  if (!(
    shell.test('-e', 'dist/__serve.js')
    && shell.test('-e', 'dist/__api.json')
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
  }

  return true;
}
