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

const ForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={6}>Forgot your password?</Heading>
      <Text fontSize="sm" color="gray.600" mb={4}>
        Enter your email address and we’ll send you a link to reset your password.
      </Text>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" placeholder="Enter your email" rounded={'14px'} p={4} py={6}/>
        </FormControl>
        <Button bg={'#309689'} color={'#fff'} rounded={'14px'} size="lg" w="full">Send Reset Link</Button>
        <Text fontSize="sm" textAlign="center">
          Back to{' '}
          <NextLink href="/login" passHref>
            <Link color="#309689">Login</Link>
          </NextLink>
        </Text>
      </Stack>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;