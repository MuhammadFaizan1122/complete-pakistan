'use client';
import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

const StyledButton = ({ title, ...rest }) => {
    return (
        <Button
            bg="#0a7450"
            w="full"
            color="white"
            borderRadius="15px"
            py={{ base: 4, md: 6 }}
            fontSize={{ base: 'sm', md: 'md' }}
            border='2px solid transparent'
            _hover={{ bg: 'white', color: 'gray.500', border: '2px solid', borderColor: 'gray.300' }}
            {...rest}
        >
            {rest.icon && rest.icon}
            {title}
        </Button>
    );
};

export default StyledButton;
