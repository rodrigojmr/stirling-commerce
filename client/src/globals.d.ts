import { ResponsiveValue } from '@chakra-ui/react';
import * as CSS from 'csstype';

declare global {
  interface Link {
    to: string;
    text: string;
  }
  type ChakraOrder = ResponsiveValue<CSS.Property.Order>;
}
