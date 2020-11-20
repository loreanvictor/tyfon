import { createTheme } from '@codedoc/core/transport';


export const theme = /*#__PURE__*/createTheme({
  light: {
    primary: '#c355f5'
  },
  dark: {
    primary: '#c355f5',
    background: '#000000',
    border: '#0A0A0A'
  },
  toc: {
    dark: {
      background: '#050505',
      border: '#0A0A0A',
    }
  },
  quote: {
    dark: {
      background: '#0A0A0A',
      border: '#111111'
    }
  },
  code: {
    wmbar: false,
    light: {
      shadow: 'none'
    },
    dark: {
      shadow: '0 0 2px #212121'
    }
  }
});
