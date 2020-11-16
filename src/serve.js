const exec = require('./util/exec');

module.exports = async () => {
  let port = 8000;
  if (process.argv[3] === '-p') {
    port = process.argv[4];
  }

  await exec(`PORT=${port} ts-node-dev`, 'dist/__serve');
}
