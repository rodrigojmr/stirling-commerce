import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger
} from '@chakra-ui/react';
import React from 'react';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactElement;
}

const CartNotif: React.FC<Props> = ({ isOpen, setIsOpen, children }) => {
  console.log('children: ', { children });
  const childrenCounnt = React.Children.count(children);
  console.log('childrenCounnt: ', childrenCounnt);
  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement="bottom"
      closeOnBlur={true}
      modifiers={[
        {
          name: 'offset',
          enabled: true,
          phase: 'main',
          fn: () => {},
          options: {
            offset: [0, 200]
          }
        }
      ]}
    >
      <PopoverTrigger>
        <>{children}</>
      </PopoverTrigger>
      <PopoverContent minWidth={30}>
        {/* <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader> */}
        <PopoverArrow />
        <PopoverBody>Added!</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CartNotif;
