// components/StyledSelect.tsx
'use client';
import { Select, SelectProps } from '@chakra-ui/react';

const StyledSelect = (props: SelectProps) => {
  return (
    <Select
      w="full"
      h="50px"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="15px"
      bg="white"
      outline="1px solid"
      outlineColor="gray.300"
      _focus={{
        ring: 2,
        ringColor: "#0a7450",
        borderColor: "transparent",
        outline: "none",
      }}
      _active={{ outline: "none" }}
      transition="all 0.2s"
      {...props}
    />
  );
};

export default StyledSelect;
