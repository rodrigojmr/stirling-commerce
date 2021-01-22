import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { SwitchTransition } from 'react-transition-group';
import FadeTransition from './Animations/FadeTransition';

interface Position {
  x: string;
  y: string;
}

interface Description {
  text: string;
}

type Props = Position & Description;

// const Container = styled.div<Position>`
//   position: absolute;
//   top: ${({ y }) => y};
//   left: ${({ x }) => x};
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   background-color: rgba(102, 102, 102, 0.5);
//   outline: none;
//   transition: all 0.2s;

//   &:hover,
//   &:focus {
//     background-color: ${({ theme }) => theme.colors.primary};

//     &::before {
//       background-color: black;
//     }
//   }

//   &::before {
//     content: '';
//     display: block;
//     width: 50%;
//     height: 50%;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     border-radius: 50%;
//     background-color: ${({ theme }) => theme.colors.primary};
//     transition: all 0.2s;
//   }

//   &::after {
//     content: '';
//     display: block;
//     width: 10%;
//     height: 10%;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     border-radius: 50%;
//     background-color: white;
//   }
// `;

const FocusStyles = {
  backgroundColor: 'primary.500',
  _before: {
    backgroundColor: 'black'
  }
};

// const ToolTip = styled.div`
//   position: absolute;
//   bottom: 150%;
//   left: -175%;
//   padding: 12px;
//   border-radius: 5px;
//   width: 450%;
//   height: 60px;
//   background-color: rgba(23, 23, 23, 0.8);
//   color: white;
//   z-index: 1;
//   text-overflow: clip;

//   &::before {
//     content: '';
//     position: absolute;
//     top: 100%;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 0;
//     height: 0;
//     border-style: solid;
//     border-width: 10px 15px 0 15px;
//     border-color: rgba(23, 23, 23, 0.8) transparent transparent transparent;
//   }
// `;

const ToolTip = ({ children }: { children: React.ReactNode }) => (
  <Box
    position="absolute"
    bottom="150%"
    left="-175%"
    padding="12px"
    borderRadius="5px"
    width="450%"
    height="60px"
    backgroundColor="rgba(23, 23, 23, 0.8)"
    color="white"
    zIndex="1"
    textOverflow="clip"
    _before={{
      content: `""`,
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '0',
      height: '0',
      borderStyle: 'solid',
      borderWidth: '10px 15px 0 15px',
      borderColor: 'rgba(23, 23, 23, 0.8) transparent transparent transparent'
    }}
  >
    {children}
  </Box>
);

const HighlightDot: React.FC<Props> = ({ x, y, text }) => {
  const [selected, setSelected] = useState(false);

  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    ref?.current.addEventListener('focus', () => setSelected(true));
    ref?.current.addEventListener('blur', () => setSelected(false));
  }, []);

  return (
    <Box
      ref={ref}
      tabIndex={0}
      onMouseEnter={() => setSelected(true)}
      onMouseLeave={() => setSelected(false)}
      position="absolute"
      top={x}
      left={y}
      width="50px"
      height="50px"
      borderRadius="50%"
      bg="rgba(102, 102, 102, 0.5)"
      outline="none"
      transition="all 0.2s"
      _hover={FocusStyles}
      _focus={FocusStyles}
      _before={{
        content: `""`,
        display: 'block',
        width: '50%',
        height: '50%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        backgroundColor: 'primary.500',
        transition: 'all 0.2s'
      }}
      _after={{
        content: `""`,
        display: 'block',
        width: '10%',
        height: '10%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        bg: 'white'
      }}
    >
      <SwitchTransition mode="out-in">
        <FadeTransition key={selected ? 'toolTip' : 'null'} timeout={0}>
          {selected ? (
            <ToolTip>
              <Box
                width="100%"
                height="100%"
                overflow="hidden"
                textOverflow="initial"
              >
                <Text fontWeight={600} fontSize="1.3rem">
                  {text}
                </Text>
              </Box>
            </ToolTip>
          ) : null}
        </FadeTransition>
      </SwitchTransition>
    </Box>
  );
};

export default HighlightDot;
