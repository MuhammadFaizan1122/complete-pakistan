'use client'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  Flex,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  FormErrorMessage
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AuthLayout } from "../Login/Login";

// Validation schema
const setNewPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function SetNewPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(setNewPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      // Simulate password reset API call
      console.log("New password data:", data);
      // Example: await fetch('/api/reset-password', { method: 'POST', body: JSON.stringify(data) });
      toast({ title: "Password reset successfully", status: "success", isClosable: true });
      router.push("/login");
    } catch (error) {
      console.error("Password reset error:", error);
      toast({ title: "Failed to reset password", status: "error", isClosable: true });
    }
  };

  return (
    <AuthLayout>
      <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={4} textAlign="center">
        Set New Password
      </Heading>
      <Text fontSize="sm" color="gray.600" mb={6} textAlign="center">
        Enter your new password below.
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={!!errors.newPassword}>
            <FormLabel>New Password</FormLabel>
            <InputGroup>
              <Input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                rounded={'14px'}
                p={4}
                py={6}
                {...register("newPassword")}
              />
              <InputRightElement h="full">
                <IconButton
                  variant="ghost"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                  icon={showNewPassword ? <FiEyeOff /> : <FiEye />}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                rounded={'14px'}
                p={4}
                py={6}
                {...register("confirmPassword")}
              />
              <InputRightElement h="full">
                <IconButton
                  variant="ghost"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  icon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
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
            Reset Password
          </Button>
        </VStack>
      </form>
    </AuthLayout>
  );
}