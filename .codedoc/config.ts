
import { configuration } from '@codedoc/core';

import { theme } from './theme';


export const config = /*#__PURE__*/configuration({
  theme,
  dest: {
    namespace: '/tyfon',
    html: 'dist',
    assets: process.env.GITHUB_BUILD === 'true' ? 'dist' : '.',
    bundle: process.env.GITHUB_BUILD === 'true' ? 'bundle' : 'dist/bundle',
    styles: process.env.GITHUB_BUILD === 'true' ? 'styles' : 'dist/styles',
  },
  page: {
    title: {
      base: 'TyFON'
    },
    fonts: {
      text: {
        name: 'Inconsolata',
        url: 'https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;900&display=swap',
        fallback: 'monospace',
      }
    },
    favicon: '/favicon.ico',
  },
  misc: {
    github: {
      user: 'loreanvictor',
      repo: 'tyfon',
    }
  },
});
