const shell = require('shelljs');
const chokidar = require('chokidar');
const subject = require('callbag-subject');
const { pipe, subscribe, debounce } = require('callbag-common');

const { note, l, g } = require('../util/echo');
const serve = require('../serve');
const build = require('../build');

const waitForServer = require('./wait-for-server');
const syncClient = require('./sync-client');


module.exports = async (args = {}) => {
  let process;
  let lock = false;
  let queued = false;
  const port = args.p || args.port || 8000;
  const signal = subject();
  const clientSync = await syncClient(args.c || args.client, port);

  pipe(
    signal,
    debounce(1000),
    subscribe(async (initial) => {
      if (lock) return;

      lock = true;
      queued = false;

      if (!initial) {
        note();
        note('📡 Rebuilding due to queued changes ...');
        note();
      }

      if (process) process.kill();
      await build();
      if (queued) { lock = false; signal(1); return; }

      serve(args, p => process = p, true).catch(() => {});
      await waitForServer(port);
      if (queued) { lock = false; signal(1); return; }

      if (clientSync) await clientSync();
      lock = false;
      if (queued) signal(1);
    })
  );

  const watcher = chokidar.watch('.', {
    ignored: [
      'dist/**',
      'node_modules/**',
      '**/node_modules/**',
      '.git/**',
      '**/.git/**',
    ],
    ignoreInitial: true,
  });

  const handler = (file) => {
    queued = true;
    note('📡 Changes in:', l(file), g(' ... [QUEUED]'));
    signal(1);
  };

  watcher.on('add', handler);
  watcher.on('change', handler);
  watcher.on('unlink', handler);

  signal(1, true);
}

module.exports.hint = `serve and watch functions exported from local ${l('index.ts')}`
module.exports.options = { 
  '--port': 'the port to run the server on',
  '--env': 'environment variable for running the server',
  '--mode': 'serving mode, can be prod or dev',
  '--client': 'address of client project to keep in sync',
  '-p': 'shortcut for --port',
  '-e': 'shortcut for --env',
  '-m': 'shortcut for --mode',
  '-c': 'shortcut for --client',
}
module.exports.examples = [
  'tyfon serve --port 3000',
  'tyfon serve --env ENV=prod --env URL=https://google.com',
  'tyfon serve --mode prod',
  'tyfon serve --client ../my-tyfon-client'
]
module.exports.link = 'https://loreanvictor.github.io/tyfon/cli/watch';