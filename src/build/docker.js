const fs = require('fs').promises;
const path = require('path');
const shell = require('shelljs');

const exec = require('../util/exec');
const dockerCode = require('../inject/docker.template');

const { say, cheer, err, ERR, h, g, bash } = require('../util/echo');


module.exports = async (image) => {
  if (!shell.which('docker')) {
    err();
    ERR('Docker is not installed.');
    err();
    throw Error();
  }

  say();
  say('🚢 Building docker image', h(image), g('...'));
  say();

  await fs.writeFile(path.join('dist', 'Dockerfile'), dockerCode());
  await exec('docker', `build -f dist/Dockerfile -t ${image} .`);

  cheer();
  cheer('✅ Docker image', h(image), 'successfully built!');
  cheer();
  cheer('👉 Test the image locally:');
  cheer(bash(`docker run -it -p 8000:8000 ${image}`));
  cheer();
  cheer('🚀 Deploy the image:');
  cheer(bash(`docker push ${image}`));
  cheer();

}
