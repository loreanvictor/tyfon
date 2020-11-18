#!/usr/bin/env node

const args = require('yargs-parser')(process.argv.slice(2));

const cmds = require('./cmds');
const help = require('./help');
const { err, ERR, e } = require('./util/echo');

const cmd = args._[0];
const rest = { ...args, _: args._.slice(1) };

(async () => {
  if (cmd in cmds.commands) {
    try {
      await cmds.commands[cmd](rest);
    } catch(error) {
      err();
      ERR('❌ operation failed!');
      if (error) err(error);
      err();
    }
  } else if (cmd in cmds.shortcuts) {
    try {
      await cmds.shortcuts[cmd](rest);
    } catch(error) {
      err();
      ERR('❌ operation failed!');
      if (error) err(error);
      err();
    }
  } else {
    if (cmd && cmd.length > 0) {
      err();
      ERR('unrecognized command:', e(cmd))
      err();
    }
    help(cmds, rest);
  }
})();

