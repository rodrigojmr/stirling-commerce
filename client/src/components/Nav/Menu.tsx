import { ListItem, Link, UnorderedList, styled } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  links: Link[];
}

const MenuItem = ({ links }: Props) => {
  return (
    <UnorderedList display="flex" align="center" styleType="none">
      {links.map(link => (
        <ListItem
          p="1rem"
          _notLast={{ mr: '1rem' }}
          key={link.text.toLowerCase()}
          fontSize={9}
        >
          <Link fontSize={5} color="white" as={RouterLink} to={link.to}>
            {link.text}
          </Link>
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export default MenuItem;
