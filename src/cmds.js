const init = require('./init');
const build = require('./build');
const install = require('./install');
const uninstall = require('./uninstall');
const serve = require('./serve');
const watch = require('./watch');
const help = require('./help');
const version = require('./version');

const _help = args => help(cmds, args);
_help.hint = help.hint;
_help.usage = help.usage;

const cmds = {
  commands: {
    init, build, serve, watch, install, uninstall, help: _help, version,
  },
  shortcuts: {
    b: build,
    s: serve,
    i: install,
    w: watch,
    h: _help,
    v: version,
  }
}

module.exports = cmds;