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
  FormErrorMessage,
  Box
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AuthLayout } from "../Login/Login";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);
  const onSubmit = async (data) => {
    try {
      console.log("Forgot password email:", data.email);
    } catch (error) {
      console.error("Forgot password error:", error);
    }
  };

  return (
    <AuthLayout>
      <Box display={'flex'} justifyContent={'center'} w={'full'} mx={'auto'}>
        <Image width={180} height={80} src="/Images/logo.png" alt="CompletePakistan Logo" />
      </Box>
      <Heading fontSize={{ base: "2xl", md: "3xl" }} my={4}>
        Forgot your password?</Heading>
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
            bg={'#0a7450'}
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
              <Link color="#0a7450">Login</Link>
            </NextLink>
          </Text>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;