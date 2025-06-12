'use client'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  FormErrorMessage
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AuthLayout } from "../Login/Login";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});


const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Forgot password email:", data.email);
    } catch (error) {
      console.error("Forgot password error:", error);
    }
  };

  return (
    <AuthLayout>
      <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={6}>Forgot your password?</Heading>
      <Text fontSize="sm" color="gray.600" mb={4}>
        Enter your email address and we’ll send you a link to reset your password.
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              rounded={'14px'}
              p={4}
              py={6}
              {...register("email")}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <Button
            bg={'#309689'}
            color={'#fff'}
            rounded={'14px'}
            size="lg"
            w="full"
            type="submit"
            isLoading={isSubmitting}
          >
            Send Reset Link
          </Button>
          <Text fontSize="sm" textAlign="center">
            Back to{' '}
            <NextLink href="/login" passHref>
              <Link color="#309689">Login</Link>
            </NextLink>
          </Text>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;