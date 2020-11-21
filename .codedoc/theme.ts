import { createTheme } from '@codedoc/core/transport';


export const theme = /*#__PURE__*/createTheme({
  light: {
    primary: '#c355f5'
  },
  dark: {
    primary: '#c355f5',
    background: '#080808',
    border: '#181818'
  },
  toc: {
    dark: {
      background: '#0C0C0C',
      border: '#111111',
    }
  },
  quote: {
    dark: {
      background: '#111111',
      border: '#212121'
    }
  },
  code: {
    wmbar: false,
    light: {
      shadow: 'none'
    },
    dark: {
      shadow: 'none'
    }
  }
});
