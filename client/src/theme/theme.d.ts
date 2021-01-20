import '@emotion/react';
import { theme } from '@chakra-ui/react';

declare module '@emotion/react' {
  type ChakraTheme = typeof theme;
  export interface Theme extends ChakraTheme {}
}
