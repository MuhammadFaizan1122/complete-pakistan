// components/StyledInput.tsx
'use client';
import { Input, InputProps } from '@chakra-ui/react';

const StyledInput = (props: InputProps) => {
  return (
    <Input
      rounded="15px"
      p={4}
      border="1px solid"
      borderColor="gray.300"
      py={6}
      outline="1px solid"
      outlineColor="gray.300"
      _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
      _active={{ outline: "none" }}
      transition="all 0.2s"
      {...props}
    />
  );
};

export default StyledInput;
