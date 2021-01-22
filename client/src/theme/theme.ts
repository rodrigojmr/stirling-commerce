import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "'Source Sans Pro', sans-serif",
        fontWeight: 400,
        color: '#222'
      },
      html: {
        fontSize: '62.5%'
      },
      input: {
        fontFamily: 'Bebas Neue'
      }
    }
  },
  colors: {
    primary: {
      50: '#dcfff5',
      100: '#b4f8e3',
      200: '#89f2d2',
      300: '#5decc0',
      400: '#32e6af',
      500: '#19cd95',
      600: '#0a9f74',
      700: '#017252',
      800: '#004531',
      900: '#00190f'
    },
    'dark-grey': '#171717',
    'light-grey': '#F2F2F2',
    grey: '#444444',
    'lighter-grey': '#aaaaaa',
    red: 'red'
  },
  breakpoints: ['36em', '42.5em', '62em', '80em', '87.5em'],
  fonts: {
    heading: 'Bebas Neue',
    body: 'Source Sans Pro, sans-serif'
  },
  fontSizes: ['.8rem', '1rem', '1.3rem', '1.5rem', '2rem', '2.5rem', '3rem'],
  // TODO replace components' spacing with default them evalues
  space: [
    '4px',
    '8px',
    '10px',
    '1rem',
    '1.2rem',
    '1.4rem',
    '1.6rem',
    '1.8rem',
    '2rem',
    '2.5rem',
    '3rem',
    '4rem',
    '5rem'
  ],
  sizes: {
    s: '80ch',
    m: '120ch',
    l: '200ch',
    xxl: '140rem'
  },
  components: {
    Input: {
      baseStyle: {
        fontFamily: 'Bebas Neue'
      }
    },
    Link: {
      baseStyle: {
        fontFamily: 'Bebas Neue',
        fontWeight: '600',
        _hover: {
          color: 'primary.500',
          textDecoration: 'none'
        }
      }
    },
    Button: {
      variants: {
        'round-arrow': {
          height: '2.5em',
          paddingLeft: '1.5em',
          paddingRight: '.7em',
          borderWidth: '3px',
          borderStyle: 'solid',
          borderRadius: '3rem',
          fontFamile: 'Bebas Neue'
        },
        link: {
          fontFamily: 'Bebas Neue',
          border: 'none',
          backgroundColor: 'transparent',
          color: 'primary.500',
          padding: 0,
          lineHeight: 1,
          minWidth: 'auto',
          _hover: {
            textDecoration: 'none'
          }
        }
      }
    }
  }
});

interface RoundButtonProps {
  borderColor: string;
}

export default theme;
