const fs = require('fs').promises;


module.exports = async () => {
  try {
    const package = JSON.parse(await fs.readFile('package.json'));
    return package.name;
  } catch {
    return 'unnamed-api';
  }
}
