import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '30em', // 480px
  md: '36em', // 576px
  lg: '48em', //  768px
  xl: '62em', // 992px
  '2xl': '80em', // 1280px
  '3xl': '87.5em' //  1400px
});

export const CustomTheme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "'Source Sans Pro', sans-serif",
        fontWeight: 400,
        color: '#222'
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
  breakpoints: breakpoints,
  fonts: {
    heading: 'Bebas Neue',
    body: 'Source Sans Pro, sans-serif'
  },
  sizes: {
    max: '95rem'
  },
  components: {
    Input: {
      baseStyle: {
        fontFamily: 'Bebas Neue'
      }
    },
    Link: {
      baseStyle: {
        lineHeight: 1,
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
          borderRadius: '6rem',
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
        },
        primary: {
          bg: 'primary.500',
          color: 'white'
        },
        hamburger: props => ({
          background: props.checked ? 'transparent' : 'primary.500',
          height: '3px',
          position: 'relative',
          transition: 'background 0.2s ease-out',
          minWidth: '30px',
          _before: {
            content: `""`,
            display: 'block',
            top: props.checked ? '1px' : '-10px',
            left: '0',
            position: 'absolute',
            width: '100%',
            background: 'primary.500',
            height: '100%',
            transition: 'all 0.2s ease-out',
            transformOrigin: 'top center',
            transform: props.checked ? 'rotate(-45deg)' : 'rotate(0)'
          },
          _after: {
            content: `""`,
            top: props.checked ? '0px' : '10px',
            left: '0',
            position: 'absolute',
            display: 'block',
            width: '100%',
            background: 'primary.500',
            height: '100%',
            transition: 'all 0.2s ease-out',
            transformOrigin: 'bottom center',
            transform: props.checked ? 'rotate(45deg)' : 'rotate(0)'
          }
        })
      }
    }
  }
});

export type ThemeType = typeof CustomTheme;
