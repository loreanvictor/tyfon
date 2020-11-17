const exec = require('./util/exec');


module.exports = async (args) => {
  const port = args.p || args.port || 8000;
  const env = [
    `PORT=${port}`, 
    ...args.e ? (Array.isArray(args.e) ? args.e : [args.e]) : [],
    ...args.env ? (Array.isArray(args.env) ? args.e : [args.env]) : [],
  ];

  await exec(`${env.join(' ')} ts-node-dev`, 'dist/__serve');
}
