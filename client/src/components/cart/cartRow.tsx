import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  SystemStyleObject,
  Text,
  useDisclosure,
  useTheme,
  VStack
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { CartProduct, IProduct } from '@shared/types';
import { ReactComponent as Trash } from 'assets/trash.svg';
import NumberInput from 'components/NumberInput';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { RootState } from 'store/rootReducer';
import { removeProduct, setProductAmount } from 'store/slices/cartSlice';
import { ThemeType } from 'theme/theme';
import { capitalizeEveryWord } from 'utils';

const inputStyle: SystemStyleObject = {
  width: '2.5rem',
  paddingLeft: '.5rem',
  paddingRight: '.5rem'
};

const TrashButton = styled(IconButton)`
  svg {
    transition: stroke 0.3s;
  }
`;

interface Props {
  item: CartProduct;
}

function CartRow({ item }: Props) {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const { product, amount } = item;

  const dispatch = useAppDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const onAmountChange = (product: IProduct, amount: number) => {
    const matchingProduct = cart.find(item => item.product.id === product.id);
    if (matchingProduct?.amount !== amount && amount > 0) {
      dispatch(setProductAmount({ product, amount }));
    }
  };

  const productTotal = ({ product, amount }: CartProduct) =>
    (amount * product.price).toFixed(2);

  const { colors } = useTheme<ThemeType>();
  const { red, gray } = colors;

  return (
    <Flex
      align="center"
      _notLast={{ borderBottom: `1px solid ${gray['200']}` }}
      bg="white"
      _first={{ borderTopRadius: '10px' }}
      _last={{ borderBottomRadius: '10px' }}
    >
      <Image
        p={4}
        mr={6}
        boxSize="8rem"
        objectFit="cover"
        fallback={
          <Center>
            <Spinner />
          </Center>
        }
        src={product.image}
        alt={product.title}
      />
      <VStack align="flex-start" flexGrow={1}>
        <Heading fontSize="xl" fontFamily="body" as="h3">
          {`${capitalizeEveryWord(product.brand)} - ${product.title}`}
        </Heading>
        <Text color="gray.500">{capitalizeEveryWord(product.colors[0])}</Text>
      </VStack>
      <Box px={4}>
        <NumberInput
          style={inputStyle}
          handleNumChange={value => onAmountChange(product, value)}
          max={product.stock}
          default={amount}
        />
      </Box>
      <Box textAlign="center" px={4} width={{ base: '6rem' }}>
        <Text>€{productTotal({ product, amount })}</Text>
      </Box>
      <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <PopoverTrigger>
          <TrashButton
            bg="transparent"
            w={8}
            h={8}
            fontSize={4}
            _hover={{ bg: 'transparent' }}
            css={{
              '&:hover svg': { stroke: red['500'] }
            }}
            aria-label="Remove product"
            icon={<Icon w={6} h={6} as={Trash} />}
          />
        </PopoverTrigger>
        <PopoverContent bg="gray.200">
          <PopoverArrow bg="gray.200" />
          <PopoverBody display="flex" alignItems="center">
            <Text px={4}>Remove product from cart?</Text>
            <Button
              size="sm"
              onClick={() => {
                onClose();
                dispatch(removeProduct(product));
              }}
              colorScheme="teal"
            >
              Remove
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}

export default CartRow;
