const exec = require('./util/exec');
const { say, l } = require('./util/echo');

const init = require('./init');
const build = require('./build');


module.exports = async (args = {}, hook, nowatch) => {
  if (!await init.check(true)) await init();
  if (!await build.check(true)) await build();

  say();
  say('🚀 Serving exported functions on the netwrok ...');
  say();

  const port = args.p || args.port || 8000;
  const mode = args.m || args.mode || 'dev';
  const env = { PORT: port, TYFON_SERVE_MODE: mode };
  if (args.e) {
    (Array.isArray(args.e) ? args.e : [args.e]).forEach(arg => {
      const split = arg.split('=');
      env[split[0]] = split[1];
    });
  }

  if (args.env) {
    (Array.isArray(args.env) ? args.env : [args.env]).forEach(arg => {
      const split = arg.split('=');
      env[split[0]] = split[1];
    });
  }

  if (nowatch) {
    await exec(`ts-node`, 'dist/__serve', env, hook);
  } else {
    await exec(`ts-node-dev`, 'dist/__serve', env, hook);
  }
}

module.exports.hint = `serve functions exported from local ${l('index.ts')}`
module.exports.options = { 
  '--port': 'the port to run the server on',
  '--env': 'environment variable for running the server',
  '--mode': 'serving mode, can be prod or dev',
  '-p': 'shortcut for --port',
  '-e': 'shortcut for --env',
  '-m': 'shortcut for --mode',
}
module.exports.examples = [
  'tyfon serve --port 3000',
  'tyfon serve --env ENV=prod --env URL=https://google.com',
  'tyfon serve --mode prod',
]
module.exports.link = 'https://loreanvictor.github.io/tyfon/cli/serve';