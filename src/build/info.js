const fs = require('fs').promises;


module.exports = async () => {
  let package = {};
  try {
    package = JSON.parse(await fs.readFile('package.json'));
  } catch {}

  return {
    name: package.name || 'unnamed-api',
    version: package.version || '0.0.0',
  }
}
