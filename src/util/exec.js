const path = require('path');
const { exec, spawn } = require('child_process');


module.exports = (cmd, params, env, hook) => new Promise((resolve, reject) => {
  if (process.platform === 'win32') {
    const _path = (process.env.PATH ? process.env.PATH + ';' : '') 
                  + path.join(__dirname, '..' , '..', 'node_modules', '.bin')
    ;

    const child = exec(cmd + ' ' + params, {
      env: { 
        ...process.env,
        ...(env || {}),
        PATH: _path,
        Path: _path,
        NODE_PATH:
          (process.env.NODE_PATH ? (process.env.NODE_PATH + ';') : '') 
          + path.join(__dirname, '../../node_modules'),
      }
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on('close', status => {
      if (status !== 0) reject();
      else resolve();
    });

    if (hook) hook(child);
  }
  else {
    const child = spawn(cmd, [params], { 
      stdio: 'inherit',
      shell: 'bash',
      env: { 
        ...process.env,
        ...(env || {}),
        PATH:
          (process.env.PATH ? process.env.PATH + ':' : '')
          + path.join(__dirname, '..', '..', 'node_modules', '.bin'),
        NODE_PATH: 
          (process.env.NODE_PATH ? (process.env.NODE_PATH + ':') : '') 
          + path.join(__dirname, '../../node_modules'),
      }
    });

    child.on('close', status => {
      if (status !== 0) reject();
      else resolve();
    });

    if (hook) hook(child);
  }
});
