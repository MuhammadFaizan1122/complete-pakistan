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
import { useRouter } from "next/navigation";
import { AuthLayout } from "../Login/Login";

const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});



const VerifyOtpPage = () => {
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("OTP submitted:", data.otp);
      toast({ title: "OTP verified successfully", status: "success", isClosable: true });
      router.push("/login");
    } catch (error) {
      console.error("OTP verification error:", error);
      toast({ title: "Invalid OTP", status: "error", isClosable: true });
    }
  };

  const handleResendOtp = () => {
    console.log("Resending OTP...");
    toast({ title: "OTP resent successfully", status: "success", isClosable: true });
  };

  return (
    <AuthLayout>
      <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={4} textAlign="center">
        Verify OTP
      </Heading>
      <Text fontSize="sm" color="gray.600" mb={6} textAlign="center">
        Enter the 6-digit code sent to your email.
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
            bg={'#309689'}
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
            <Link color="#309689" onClick={handleResendOtp}>
              Resend OTP
            </Link>
          </Text>
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

export default VerifyOtpPage;