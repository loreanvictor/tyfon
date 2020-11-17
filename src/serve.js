const exec = require('./util/exec');


module.exports = async (args) => {
  const port = args.p || args.port || 8000;

  await exec(`PORT=${port} ts-node-dev`, 'dist/__serve');
}
