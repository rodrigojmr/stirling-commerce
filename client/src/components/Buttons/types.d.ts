interface ThemeProps {
  themed: string;
  primary?: never;
  secondary?: never;
}
interface TwoColorsProps {
  themed?: never;
  primary: string;
  secondary: string;
}

type ThemeOrColorsProps = ThemeProps | TwoColorsProps;

interface ButtonLinkProps {
  children: React.ReactNode;
  to: string;
}

type ButtonLinkType = ButtonLinkProps & ThemeOrColorsProps;
