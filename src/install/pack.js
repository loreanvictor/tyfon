const shell = require('shelljs');


module.exports = root => new Promise(async (resolve, reject) => {
  shell.exec(`npm pack ${root}`, (status, response) => {
    shell.exec(`npm i ${response}`, () => {
      shell.rm('-rf', response);
      resolve();
    });
  });
});
