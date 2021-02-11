import { Box, ListItem, Link, UnorderedList, Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
interface Props {
  links: Link[];
  order: ChakraOrder;
}
// const Hamburger = styled.button<{ checked: boolean }>`
//   background: ${({ checked }) => (checked ? 'transparent' : 'primary.500')};
//   height: '2px';
//   position: 'relative';
//   transition: 'background 0.2s ease-out';
//   width: '18px';
//   &::before {
//     content: '';
//     top: '5px';
//     position: 'absolute';
//     width: '100%';
//     background: 'primary.500';
//     display: 'block';
//     height: '100%';
//     transition: 'all 0.2s ease-out';
//     transform: ${({ checked }) => (checked ? 'rotate(-45deg)' : 'rotate(0)')};
//   }
//   &::after {
//     content: '';
//     top: '-5px';
//     position: 'absolute';
//     width: '100%';
//     background: 'primary.500';
//     display: 'block';
//     height: '100%';
//     transition: 'all 0.2s ease-out';
//     transform: ${({ checked }) => (checked ? 'rotate(45deg)' : 'rotate(0)')};
//   }
// `;

const Menu = ({ order, links }: Props) => {
  const [show, setShow] = useState(false);

  const navRef = useRef(null);

  return (
    <>
      {/* <Hamburger checked={show} onClick={() => setShow(!show)}></Hamburger> */}
      <Box
        display={{ base: 'inline-block', lg: 'none' }}
        cursor="pointer"
        p=".25rem"
        onClick={() => setShow(!show)}
      >
        <Button
          order={order}
          minW="none"
          width=".5rem"
          checked={show}
          variant="hamburger"
        ></Button>
      </Box>

      <Box
        ref={navRef}
        as="nav"
        position={{ base: 'absolute', lg: 'relative' }}
        top={{ base: '97%', lg: 'initial' }}
        left={{ base: show ? '0' : '-50%', lg: 'initial' }}
        zIndex={3}
        bg={show ? 'dark-grey' : ''}
        height={{ base: '100vh', lg: 'auto' }}
        px={{ base: '5', lg: '3' }}
        py={{ base: '8', lg: '2' }}
        animation="all .5s ease-in-out"
        order={{ base: 1, lg: 'initial' }}
        transition=".4s all ease-in-out"
      >
        <UnorderedList
          ml="0"
          display="flex"
          flexDirection={{ base: 'column', lg: 'row' }}
          align="center"
          styleType="none"
        >
          {links.map(link => (
            <ListItem py={2} px={4} key={link.text.toLowerCase()} fontSize={9}>
              <Link fontSize="2xl" color="white" as={RouterLink} to={link.to}>
                {link.text}
              </Link>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </>
  );
};

export default Menu;
