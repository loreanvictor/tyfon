const exec = require('./util/exec');
const build = require('./build');

module.exports = async() => {
  await exec('npm', 'i express cors body-parser');
  await build();
};
