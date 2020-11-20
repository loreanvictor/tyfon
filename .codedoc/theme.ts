import { createTheme } from '@codedoc/core/transport';


export const theme = /*#__PURE__*/createTheme({
  light: {
    primary: '#c355f5'
  },
  dark: {
    primary: '#c355f5',
    background: '#080808',
    border: '#0A0A0A'
  },
  toc: {
    dark: {
      background: '#0C0C0C',
      border: '#111111',
    }
  },
  quote: {
    dark: {
      background: '#0C0C0C',
      border: '#111111'
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
