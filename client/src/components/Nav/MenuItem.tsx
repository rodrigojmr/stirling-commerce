import { ListItem, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  to: string;
  key: string;
}

const MenuItem = ({ children, to = '/' }: Props) => {
  return (
    <ListItem fontSize={9}>
      <Link color="white" as={RouterLink} to={to}>
        {children}
      </Link>
    </ListItem>
  );
};

export default MenuItem;
