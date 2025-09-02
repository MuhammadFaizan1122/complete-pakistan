'use client'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  FormErrorMessage,
  Box,
  useToast
} from "@chakra-ui/react";
import Link from "next/link";
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
  const toast = useToast()
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
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: data.email }),
        headers: { "Content-Type": "application/json" },
      });
      const datas = await res.json();
      if (datas.success) {
        toast({
          title: "Message Sent!",
          description: "Verification OTP send to your email successfully",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        router.push(`/auth/forgot-password-verify-otp?email=${data.email}`);
      } else {
        toast({
          description: datas.error,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      }
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
        Enter your email address and we’ll send you a OTP to reset your password.
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
            Send Reset OTP
          </Button>
          <Text fontSize="md" textAlign="center" display={'flex'} alignItems={'center'} justifyContent={'center'}>
            Back to{' '}
            <Link href="/login" passHref>
              <Text ml={1} fontWeight={'bold'} color="#0a7450">Login</Text>
            </Link>
          </Text>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;