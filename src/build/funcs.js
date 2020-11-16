const fs = require('fs').promises;
const path = require('path');
const shell = require('shelljs');

const funcsCode = require('../inject/funcs.template');


module.exports = () => new Promise(async (resolve, reject) => {
  await fs.writeFile(path.join('dist', '__funcs.js'), funcsCode());
  shell.exec('node dist/__funcs', {silent: true}, (status, response) => {
    shell.rm(path.join('dist', '__funcs.js'));
    resolve(response.split(' ').map(x => x.trim()));
  });
});
