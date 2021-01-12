const fs = require('fs').promises;
const path = require('path');
const shell = require('shelljs');
const crypto = require('crypto');

const install = require('../install');
const { l, g, note } = require('../util/echo');


const checksum = str => crypto.createHash('md5').update(str, 'utf8').digest('hex');

module.exports = async (arg, port) => {
  if (!arg) return;

  const server = shell.pwd().stdout;
  const client = path.isAbsolute(arg)
    ? arg
    : path.join(server, arg)
  ;

  const serverPkg = JSON.parse(await fs.readFile('package.json'));
  const clientPkg = JSON.parse(await fs.readFile(path.join(client, 'package.json')));

  const sdk = (clientPkg.tyfons || {})[`http://localhost:${port}`];

  if (!sdk) {
    throw new Error(`Client SDK not installed for ${l(`localhost:${port}`)}`);
  }

  if (sdk.name !== `@api/${serverPkg.name}`) {
    throw new Error(`Client SDK not installed for ${l(serverPkg.name)}`);
  }

  let check = '';
  try {
    check = checksum(await fs.readFile(path.join(client, `node_modules/@api/${serverPkg.name}/index.d.ts`)));
  } catch {}

  return async () => {
    try {
      const newcheck = checksum(await fs.readFile('dist/__spec.d.ts'));
      if (newcheck !== check) {
        note();
        note('Changes in API, updating client SDK ...');
        note();

        check = newcheck;
        shell.cd(client);
        await install({ _: [`localhost:${port}`] });
        shell.cd(server);
      } else {
        note();
        note('Client SDK is in sync with current API.');
        note(g('client address'), l(client));
        note();
      }
    } catch {}
  };
}
