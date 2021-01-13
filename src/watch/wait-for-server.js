const fetch = require('node-fetch');

module.exports = async (port) => new Promise(resolve => {
  let _try = () => {
    fetch(`http://localhost:${port}/__api`)
    .then(() => resolve())
    .catch(err => {
      setTimeout(_try, 1000)
    });
  };

  _try();
});

