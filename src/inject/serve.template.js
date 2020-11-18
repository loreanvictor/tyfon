module.exports = () => `
const express = require('express');
const functions = require('../index');
const app = express();

app.use(require('cors')());
app.use(require('body-parser').json());

let serverName = 'Tyfon App';
let package = {};
try {
  package = require('../package.json');
  serverName = package.name;
} catch {}

const __api = require('./__api.json');

app.get('/__api', (req, res) => {
  res.status(200).send(__api);
});

const extract = src => {
  const params = [];
  Object.entries(src).forEach(([key, value]) => {
    try {
      const index = parseInt(key);
      params[index] = value;
    } catch {}
  });

  return params
}

const run = (func, params, res) => {
  (async() => { return await func(...extract(params)); })()
  .then(result => res.status(200).json(result))
  .catch(error => {
    if (error) {
      const status = error.status || 500;
      const msg = error.message || '';
      res.status(status).send(msg);
    } else {
      res.status(500).send();
    }
  });
}

const source = req => {
  if (req.method === 'GET') return req.query;
  if (req.method === 'POST') return req.body;
  if (req.method === 'PUT') return req.body;
  if (req.method === 'DELETE') return req.query;
}

const prefix = (pre, name) => pre.toLowerCase() + name[0].toUpperCase() + name.substr(1);

const possibleFuncNames = req => {
  const name = req.params.method;
  if (req.method === 'GET') return [prefix('get', name)];
  if (req.method === 'POST') return [name, prefix('post', name), prefix('add', name), prefix('create', name)];
  if (req.method === 'PUT') return [prefix('put', name), prefix('update', name), prefix('set', name)];
  if (req.method === 'DELETE') return [prefix('delete', name), prefix('remove', name)];
}

const find = req => {
  const name = possibleFuncNames(req).find(n => n in functions);
  return name ? functions[name] : undefined;
}

app.all('/:method', (req, res) => {
  const func = find(req);
  if (func) {
    return run(func, source(req), res);
  }

  res.status(404).send();
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(\`\$\{serverName\} listening at http://localhost:\$\{port\}\`)
});
`