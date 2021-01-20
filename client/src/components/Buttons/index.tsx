import styled from '@emotion/styled';

export const RoundButton = styled.button<
  ThemeOrColorsProps & { fontSize?: string }
>`
  padding: 1rem 1.5rem;
  color: ${({ themed, secondary }) => themed || secondary};
  font-family: 'Bebas Neue';
  font-size: ${({ fontSize }) => fontSize || '2.5rem'};
  border: 3px solid ${({ themed, primary }) => themed || primary};
  border-radius: 3rem;
`;

// export { default as ButtonLink } from './ButtonLink';
