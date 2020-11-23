const fs = require('fs').promises;
const path = require('path');

const createFunc = require('./create-func');


module.exports = async (origin, root, funcs) => {
  let code = `const { invoke } = require('tyfon-client'); \n\n`;
  funcs.forEach(func => code += createFunc(origin, func));
  code += `\n\nmodule.exports = { \n${funcs.map(f => '  ' + f).join(',\n')}\n}`;

  await fs.writeFile(path.join(root, 'index.js'), code);
}
