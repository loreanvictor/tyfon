const shell = require('shelljs');
const chalk = require('chalk');
const strip = require('strip-ansi');

const PRIMARY = '#c355f5';
const GRAY = '#616161';
const LGRAY = '#9e9e9e';
const LINK = '#ed0cef';
const ERR = '#f05454';
const CHEERS = '#28df99';
const WARN = '#ffa62b';

module.exports = {
  b: (...stuff) => chalk`{bold ${stuff.join(' ')}}`,
  i: (...stuff) => chalk`{italic ${stuff.join(' ')}}`,
  u: (...stuff) => chalk`{underline ${stuff.join(' ')}}`,
  h: (...stuff) => chalk`{hex('${PRIMARY}') ${stuff.join(' ')}}`,
  l: (...stuff) => chalk`{underline.hex('${LINK}') ${stuff.join(' ')}}`,
  g: (...stuff) => chalk`{hex('${GRAY}') ${stuff.join(' ')}}`,
  e: (...stuff) => chalk`{hex('${ERR}') ${stuff.join(' ')}}`,
  c: (...stuff) => chalk`{hex('${CHEERS}') ${stuff.join(' ')}}`,
  w: (...stuff) => chalk`{hex('${WARN}') ${stuff.join(' ')}}`,
  bash: (...stuff) => chalk`{hex('${PRIMARY}') $} {hex('${LGRAY}') ${stuff.join(' ')}}`,

  pad: (L, ...stuff) => {
    const m = strip(stuff.join(' '));
    let p = '';
    for (let i = m.length; i < L - 1; i++) p += '.';
    return [...stuff, chalk`{hex('${GRAY}') ${p}}`].join(' ');
  },

  say: (...stuff) => shell.echo(chalk`{hex('${GRAY}') #} ${stuff.join(' ')}`),
  err: (...stuff) => shell.echo(chalk`{hex('${ERR}') #} ${stuff.join(' ')}`),
  ERR: (...stuff) => shell.echo(chalk`{hex('${ERR}') # ERROR:} ${stuff.join(' ')}`),
  cheer: (...stuff) => shell.echo(chalk`{hex('${CHEERS}') #} ${stuff.join(' ')}`),
  WARN: (...stuff) => shell.echo(chalk`{hex('${WARN}') # WARNING:} ${stuff.join(' ')}`),
  warn: (...stuff) => shell.echo(chalk`{hex('${WARN}') #} ${stuff.join(' ')}`),
  note: (...stuff) => shell.echo(chalk`{hex('${PRIMARY}') #} ${stuff.join(' ')}`),
}
