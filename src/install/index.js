const install = require('./install-package');


module.exports = async (args) => {
  if (args._.length > 0) {
    for (let i = 0, url = args._[i]; i < args._.length; url = args._[++i]) {
      await install(url);
    }
  }
}
