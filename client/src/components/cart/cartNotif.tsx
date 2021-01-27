import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
} from '@chakra-ui/react';
import React from 'react';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactElement;
}

const CartNotif: React.FC<Props> = ({ isOpen, setIsOpen, children }) => {
  return (
    <>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>{children} </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Are you sure you want to continue with your action?
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CartNotif;
