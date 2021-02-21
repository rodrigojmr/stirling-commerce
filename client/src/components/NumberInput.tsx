import {
  HStack,
  Button,
  Input,
  useNumberInput,
  SystemStyleObject
} from '@chakra-ui/react';
import { SerializedStyles } from '@emotion/react';
import { useEffect } from 'react';

interface Props {
  max: number;
  default: number;
  handleNumChange: (value: number) => void;
  style?: SystemStyleObject;
}

const NumberInput = ({
  max,
  default: amount,
  handleNumChange,
  style
}: Props) => {
  const {
    valueAsNumber,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps
  } = useNumberInput({
    step: 1,
    defaultValue: amount,
    min: 1,
    max: max
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({
    'aria-readonly': true,
    inputMode: 'numeric'
  });

  useEffect(() => {
    handleNumChange(valueAsNumber);
  }, [valueAsNumber]);

  return (
    <HStack maxW="320px">
      <Button px={2} minW={0} {...dec}>
        -
      </Button>
      <Input textAlign="center" sx={style} type="number" {...input} />
      <Button px={2} minW={0} {...inc}>
        +
      </Button>
    </HStack>
  );
};

export default NumberInput;
