// pages/set-new-password.tsx
"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetNewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast({ title: "All fields are required", status: "error", isClosable: true });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords do not match", status: "error", isClosable: true });
      return;
    }
    toast({ title: "Password reset successfully", status: "success", isClosable: true });
    router.push("/login");
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="teal.50">
      <Box bg="white" p={8} rounded="2xl" shadow="lg" maxW="sm" w="full">
        <Heading size="lg" mb={4} textAlign="center">
          Set New Password
        </Heading>
        <Text fontSize="sm" color="gray.600" mb={6} textAlign="center">
          Enter your new password below.
        </Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="new-password">
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </FormControl>
            <FormControl id="confirm-password">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" w="full">
              Reset Password
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
