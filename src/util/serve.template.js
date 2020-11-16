module.exports = () => `
const express = require('express');
const functions = require('../index');
const app = express();

app.use(require('cors')());
app.use(require('body-parser').json());

let name = 'Tyfon App';
try {
  const package = require('../package.json');
  name = package.name;
} catch {}

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
  .then(result => res.status(200).send(result))
  .catch(error => {
    console.log(error);
    res.status(500).send(\`\$\{error\}\`);
  });
}

const source = req => {
  if (req.method === 'GET') return req.query;
  if (req.method === 'POST') return req.body;
  if (req.method === 'PUT') return req.body;
  if (req.method === 'DELETE') return req.query;
}

const postfix = (post, name) => post.toLowerCase() + name[0].toUpperCase() + name.substr(1);

const find = req => {
  const name = req.params.method;
  const post = postfix(req.method, name);

  if (req.method === 'POST') {
    return functions[name] || functions[post];
  } else {
    return functions[post];
  }
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
  console.log(\`\$\{name\} listening at http://localhost:\$\{port\}\`)
});
`