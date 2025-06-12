'use client'
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
import { AuthLayout } from "../Login/Login";

const SignupPage = () => {
    return (
        <AuthLayout>
            <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={6}>Create an account</Heading>
            <Stack spacing={4}>
                <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input type="text" placeholder="Enter your full name" rounded={'14px'} p={4} py={6} />
                </FormControl>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" placeholder="Enter your email" rounded={'14px'} p={4} py={6} />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder="Create a password" rounded={'14px'} p={4} py={6} />
                </FormControl>
                <Button bg={'#309689'} color={'#fff'} rounded={'14px'} size="lg" w="full">Sign Up</Button>
                <Text fontSize="sm" textAlign="center">
                    Already have an account?{' '}
                    <NextLink href="/login" passHref>
                        <Link color="#309689">Login</Link>
                    </NextLink>
                </Text>
            </Stack>
        </AuthLayout>
    );
};

export default SignupPage;