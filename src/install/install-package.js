const fetch = require('node-fetch');
const mkdir = require('mkdirp');
const path = require('path');
const shell = require('shelljs');
const fs = require('fs').promises;

const exec = require('../util/exec');
const { say, cheer, err, ERR, l, g, h } = require('../util/echo');
const createTypes = require('./create-types');
const createMain = require('./create-main');
const pack = require('./pack');


module.exports = async (url) => {
  try {
    say();
    say('🚚 Installing TyFON SDK for', l(url), g('...'));
    say();
    
    if (url.startsWith('localhost')) {
      url = 'http://' + url;
    }

    const response = await fetch(`${url}/__api`);
    const api = await response.json();
    const pkg = {
      name: '@api/' + api.name,
      version: api.version,
      types: 'index.d.ts',
      main: 'index.js',
      dependencies: {
        'tyfon-client': '^0.1.6'
      }
    };

    const root = path.join('.', 'node_modules', '@api', api.name);
    shell.rm('-rf', root);
    await mkdir(root);
    await fs.writeFile(path.join(root, 'package.json'), JSON.stringify(pkg, undefined, 2));

    await createTypes(root, api.types || {});
    await createMain(url, root, api.funcs || []);
    await pack(root);

    cheer();
    cheer('📦 TyFON SDK for', l(url), '(', h(`@api/${api.name}`), ') installed successfully!');
    cheer();

    return {
      name: pkg.name,
      version: pkg.version,
      url: url,
    }
  } catch(error) {
    err();
    ERR('Installing TyFON SDK for', l(url), 'failed!');
    if (error) err(error);
    err();

    return undefined;
  }
}
