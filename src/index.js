#!/usr/bin/env node

try {
  require('./' + process.argv[2])().then();
} catch {}