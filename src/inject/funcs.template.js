module.exports = () => `
const funcs = require('./index');

const funcnames = [];

Object.entries(funcs).forEach(([key, value]) => {
  const func = funcs[key];
  if (typeof func === 'function') {
    funcnames.push(key);
  }
});

console.log(funcnames.join(' '));
`;