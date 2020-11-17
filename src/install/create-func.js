const deprefix = (prefix, name) => {
  const _name = name.substr(prefix.length);
  return _name[0].toLowerCase() + _name.substr(1);
}

const decouple = name => {
  const getPres = ['get'];
  const postPres = ['post', 'add', 'create'];
  const putPres = ['put', 'set', 'update'];
  const delPres = ['delete', 'remove'];

  let pre = '';
  if (pre = getPres.find(p => name.startsWith(p))) return ['GET', deprefix(pre, name)];
  if (pre = postPres.find(p => name.startsWith(p))) return ['POST', deprefix(pre, name)];
  if (pre = putPres.find(p => name.startsWith(p))) return ['PUT', deprefix(pre, name)];
  if (pre = delPres.find(p => name.startsWith(p))) return ['DELETE', deprefix(pre, name)];

  return ['POST', name];
}

module.exports = (origin, name) => {
  const [method, url] = decouple(name);
  if (method === 'GET' || method === 'DELETE') {
    return `
function ${name}(...args) {
  return fetch(
    '${origin}/${url}?' + args.map((arg, index) => '' + index + '=' + encodeURIComponent(arg)).join('&'),
    { method: '${method}' }
  ).then(r => r.json());
}
`;
  } else {
    return `
function ${name}(...args) {
  return fetch(
    '${origin}/${url}',
    {
      method: '${method}',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ ...args })
    }
  ).then(r => r.json());
}
`;
  }
}
