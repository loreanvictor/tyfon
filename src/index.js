const exec = require('./exec');

exec('npm', 'i express');
exec('tsc', `-d ${process.argv[2] || '.'}/index.ts --outDir dist`);
