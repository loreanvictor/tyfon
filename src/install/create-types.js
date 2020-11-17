const fs = require('fs').promises;
const mkdir = require('mkdirp');
const path = require('path');


module.exports = async (root, types) => {
  const entries = Object.entries(types);
  for (let i = 0, entry = entries[i]; i < entries.length; entry = entries[++i]) {
    const addr = path.join(root, entry[0]);
    const contents = entry[1];

    await mkdir(path.dirname(addr));
    await fs.writeFile(addr, contents);
  }
}
