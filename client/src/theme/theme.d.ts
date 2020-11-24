import {} from "styled-components";
import theme from "./theme";

declare module "styled-components" {
  type Theme = typeof theme;
  export type DefaultTheme = Theme;
}
