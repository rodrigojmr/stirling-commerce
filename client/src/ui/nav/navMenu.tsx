import { Box, ListItem, Link, UnorderedList, styled } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  links: Link[];
}

const Menu = ({ links }: Props) => {
  return (
    <Box as="nav">
      <UnorderedList display="flex" align="center" styleType="none">
        {links.map(link => (
          <ListItem py={2} px={4} key={link.text.toLowerCase()} fontSize={9}>
            <Link fontSize="2xl" color="white" as={RouterLink} to={link.to}>
              {link.text}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default Menu;
