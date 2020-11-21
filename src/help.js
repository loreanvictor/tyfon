const { ERR, err, say, bash, pad, h, b, i, e, l } = require('./util/echo');


module.exports = (cmds, args = {}) => {
  if (args._[0]) {
    const cmd = args._[0];
    const mod = cmds.commands[cmd] || cmds.shortcuts[cmd];

    if (!mod) {
      err();
      ERR('command', e(cmd), 'not found.');
      err('use', h(b('tyfon help')), 'for a list of possible commands.');
      err();
      return;
    }

    say();
    if (mod.usage) {
      say(h(b('tyfon'), mod.usage));
    } else {
      say(h(b('tyfon', cmd)));
    }
    say(); say(mod.hint);

    if (mod.options) {
      say('options:'); say();
      Object.entries(mod.options).forEach(([opt, hint]) => {
        say(' ', pad(32, b(opt)), hint);
      })
    }

    if (mod.examples) {
      say();
      say('example usage:');
      say();
      mod.examples.forEach(example => say(bash(example)));
    }

    if (mod.link) {
      say();
      say('👉 Read', l(mod.link), 'for more info.');
      say();
    } else {
      say();
      say('👉 Read', l('https://loreanvictor.github.io/tyfon'), 'for more info.');
      say();
    }
  } else {
    say();
    say('Usage:', h(b('tyfon'), '<command>'));
    say('Possible commands:');
    say();
    Object.entries(cmds.commands).forEach(([cmd, mod]) => {
      say(' ', pad(32, h(mod.usage || b(cmd))), mod.hint || '');
    });

    say();
    say('👉 Read', l('https://loreanvictor.github.io/tyfon'), 'for more info about TyFON.');
    say();
  }
}

module.exports.hint = 'print usage help.'
module.exports.usage = b('help') + ' <command>';
module.exports.link = 'https://loreanvictor.github.io/tyfon/cli/help';