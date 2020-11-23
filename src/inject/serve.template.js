module.exports = () => `
const isProd = () => (
  process.env.ENV && (
    process.env.ENV.toLowerCase() === 'prod'
    || process.env.ENV.toLowerCase() === 'production'
  )
) || (
  process.env.TYFON_SERVE_MODE && (
    process.env.TYFON_SERVE_MODE.toLowerCase() === 'prod'
    || process.env.TYFON_SERVE_MODE.toLowerCase() === 'production'
  )
);

const functions = isProd() ? require('./index') : require('../index');

const { server } = require('tyfon-server');

let serverName = 'Tyfon App';
let package = {};
try {
  package = require('../package.json');
  serverName = package.name;
} catch {}

const __api = require('./__api.json');

const port = process.env.PORT || 8000;
server(functions, __api).listen(port, () => {
  console.log(\`\$\{serverName\} listening at http://localhost:\$\{port\}\`)
});
`