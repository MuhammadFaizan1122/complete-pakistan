"use client";

import React from "react";
import {
  Box,
  VStack,
  Text,
  Input,
  Textarea,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { IoMdMail } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\+?[0-9\s-]{7,15}$/, "Enter a valid phone number")
    .optional(),
  message: yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
});

const SendMessageForm = ({ agent }) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/travel-agent/info-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, toEmail: agent.email }),
      });

      const result = await res.json();
      if (result.success) {
        toast({
          title: "Message Sent Successful!",
          description: "Your message has been sent!",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
        reset();
      } else {
        toast({
          description: "Error: " + result.error,
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <Box borderRadius="md" border="1px solid green" p={4} mt={4}>
      <Box borderRadius="md" boxShadow="sm">
        <Text fontWeight="bold" mb={2} fontSize={{ base: 'md', md: 'lg' }}>Send Message</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack align="stretch" spacing={2}>
            <FormControl isInvalid={!!errors.name}>
              <Input placeholder="Name *" mb={2} size={{ base: 'sm', md: 'md' }} {...register("name")} />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
              <Input placeholder="Email *" mb={2} size={{ base: 'sm', md: 'md' }} {...register("email")} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.phone}>
              <Input placeholder="Phone" mb={2} size={{ base: 'sm', md: 'md' }} {...register("phone")} />
              <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.message}>
              <Textarea placeholder="Message * Tell us about your requirements..." mb={2} size={{ base: 'sm', md: 'md' }} {...register("message")} />
              <FormErrorMessage>{errors.message?.message}</FormErrorMessage>
            </FormControl>
            <Button
              bg="#0a7450"
              color="white"
              leftIcon={<Icon as={IoMdMail} boxSize={{ base: 4, md: 5 }} />}
              w="full"
              size={{ base: 'sm', md: 'md' }}
              type="submit"
              isLoading={isSubmitting}
            >
              Send
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default SendMessageForm;