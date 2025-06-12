'use client'
// chakra-auth-pages.tsx
// This file contains Login, Signup, and Forgot Password screens using Chakra UI

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";

export const LoginPage = () => {
    return (
        <AuthLayout>
            <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={6}>Sign in to your account</Heading>
            <Stack spacing={4}>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" placeholder="Enter your email" rounded={'14px'} p={4} py={6} />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder="Enter your password" rounded={'14px'} p={4} py={6} />
                </FormControl>
                <Flex justify="space-between" align="center">
                    <NextLink href="/forgot-password" passHref>
                        <Link color="#309689" fontSize="sm">Forgot password?</Link>
                    </NextLink>
                </Flex>
                <Button bg={'#309689'} color={'#fff'} size="lg" w="full" rounded={'14px'} >Sign In</Button>
                <Text fontSize="sm" textAlign="center">
                    Don't have an account?{' '}
                    <NextLink href="/signup" passHref>
                        <Link color="#309689">Sign up</Link>
                    </NextLink>
                </Text>
            </Stack>
        </AuthLayout>
    );
};


export const AuthLayout = ({ children }) => {
    return (
        <Flex minH="90vh" align="center" justify="center" bg={'#BADDD9'}>
            <Box
                bg={useColorModeValue('white', 'gray.700')}
                px={8}
                py={10}
                rounded="2xl"
                shadow="lg"
                w={{ base: '90%', sm: '400px' }}
            >
                {children}
            </Box>
        </Flex>
    );
};