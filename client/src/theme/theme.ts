import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      darkGrey: string;
      lightGrey: string;
      grey: string;
    };
    breakpoints: {
      xsPhone: string;
      phone: string;
      landscape: string;
      desktop: string;
      xlDesktop: string;
    };
  }
}

export const theme: DefaultTheme = {
  colors: {
    primary: '#19CE96',
    darkGrey: '#171717',
    lightGrey: '#F2F2F2',
    grey: '#474747'
  },
  breakpoints: {
    xsPhone: '576px',
    phone: '668px',
    landscape: '992x',
    desktop: '1200px',
    xlDesktop: '1400px'
  }
};
