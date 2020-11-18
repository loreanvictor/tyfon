const exec = require('./util/exec');
const { say, l } = require('./util/echo');

const init = require('./init');
const build = require('./build');


module.exports = async (args) => {
  if (!await init.check(true)) await init();
  if (!await build.check(true)) await build();

  say();
  say('🚀 Serving exported functions on the netwrok ...');
  say();

  const port = args.p || args.port || 8000;
  const env = [
    `PORT=${port}`, 
    ...args.e ? (Array.isArray(args.e) ? args.e : [args.e]) : [],
    ...args.env ? (Array.isArray(args.env) ? args.e : [args.env]) : [],
  ];

  await exec(`${env.join(' ')} ts-node-dev`, 'dist/__serve');
}

module.exports.hint = `serve functions exported from local ${l('index.ts')}`
module.exports.options = { 
  '--port': 'the port to run the server on',
  '--env': 'environment variable for running the server',
  '-p': 'shortcut for --port',
  '-e': 'shortcut for --env',
}
module.exports.examples = [
  'tyfon serve --port 3000',
  'tyfon serve --env ENV=prod --env URL=https://google.com',
]
