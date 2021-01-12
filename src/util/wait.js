module.exports = async timeout => new Promise(resolve => {
  setTimeout(() => resolve(), timeout);
});
