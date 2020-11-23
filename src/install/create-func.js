module.exports = (origin, name) => {
    return `
function ${name}(...args) {
  return invoke('${origin}', '${name}', ...args);
}
`;
}
