const init = require('./init');
const build = require('./build');
const install = require('./install');
const uninstall = require('./uninstall');
const serve = require('./serve');
const help = require('./help');

const _help = args => help(cmds, args);
_help.hint = help.hint;
_help.usage = help.usage;

const cmds = {
  commands: {
    init, build, serve, install, uninstall, help: _help,
  },
  shortcuts: {
    b: build,
    s: serve,
    i: install,
    h: _help,
  }
}

module.exports = cmds;