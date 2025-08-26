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
  useToast,
  FormErrorMessage
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthLayout } from "../Login/Login";
import { useState } from "react";

const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

const VerifyOtpPage = () => {
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [isResending, setIsResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const verifyOTP = async (otpData) => {
    try {
      const payload = {
        otp: otpData.otp,
        userData:
        {
          name: "Muhammad Faizan",
          email: "muh.faizaan@gmail.com",
          password: "$2b$10$mHppnZ5kl2nUwrQkXVm7eOJslbxepT3jXTjcg57eEuHujOGMouuIm"
        }
      }
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: "muh.faizaan@gmail.com",
          otp: otpData.otp,
          userData: payload,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Account created successfully",
          status: "success",
          isClosable: true
        });
        router.push("/auth/login");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
  };

  const resendOTP = async () => {
    setIsResending(true);
    try {
      const response = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "OTP resent successfully",
          status: "success",
          isClosable: true
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Failed to resend OTP",
        status: "error",
        isClosable: true
      });
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      await verifyOTP(data);
    } catch (error) {
      toast({
        title: error.message || "Invalid OTP",
        status: "error",
        isClosable: true
      });
    }
  };

  return (
    <AuthLayout>
      <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={4} textAlign="center">
        Verify OTP
      </Heading>
      <Text fontSize="sm" color="gray.600" mb={6} textAlign="center">
        Enter the 6-digit code sent to {email}
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.otp}>
            <FormLabel>OTP Code</FormLabel>
            <Input
              type="text"
              placeholder="Enter 6-digit OTP"
              rounded={'14px'}
              p={4}
              py={6}
              maxLength={6}
              {...register("otp")}
            />
            <FormErrorMessage>{errors.otp?.message}</FormErrorMessage>
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
            Verify OTP
          </Button>
          <Text fontSize="sm" textAlign="center">
            Didn't receive the code?{' '}
            <Link
              color="#0a7450"
              onClick={resendOTP}
              isLoading={isResending}
            >
              Resend OTP
            </Link>
          </Text>
          <Text fontSize="sm" textAlign="center">
            Back to{' '}
            <NextLink href="/auth/login" passHref>
              <Link color="#0a7450">Login</Link>
            </NextLink>
          </Text>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default VerifyOtpPage;