#!/usr/bin/env node

const args = require('yargs-parser')(process.argv.slice(2))

try {
  require('./' + args._[0])({ ...args, _: args._.slice(1) }).then();
} catch (err) {
  console.log(err);
}