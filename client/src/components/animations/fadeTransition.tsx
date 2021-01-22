import styled from '@emotion/styled';
import { Transition } from 'react-transition-group';

const FadeDiv = styled.div<{ state: string }>`
  transition: 0.3s ease-in-out;
  opacity: ${({ state }) => (state === 'entered' ? 1 : 0)};
  display: ${({ state }) => (state === 'exited' ? 'none' : 'block')};
`;

interface FadeProps {
  children: React.ReactNode;
  timeout: number;
}

const FadeTransition: React.FC<FadeProps> = ({ children, ...rest }) => (
  <Transition {...rest}>
    {state => <FadeDiv state={state}>{children}</FadeDiv>}
  </Transition>
);

export default FadeTransition;
