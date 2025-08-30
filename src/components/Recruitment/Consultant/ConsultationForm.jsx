"use client";

import React from "react";
import {
  VStack,
  Text,
  Input,
  Select,
  Textarea,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema
const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\+?[0-9\s-]{7,15}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  location: yup.string().required("Location is required"),
  service: yup.string().required("Please select a service"),
  message: yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
  preferredDate: yup.date().typeError("Invalid date").required("Preferred date is required"),
});


const RequestConsultationForm = ({ consultant }) => {
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
      const res = await fetch("/api/consultant/consultation-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, toEmail: consultant.email }),
      });

      const result = await res.json();
      if (result.success) {
        toast({
          title: "Request Sent Successful!",
          description: "Your consultation request has been sent!",
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack
        align="flex-start"
        spacing={6}
        p={4}
        bg="gray.50"
        borderRadius="lg"
        boxShadow="md"
      >
        <Text fontWeight="bold" fontSize="lg">
          Request Consultation
        </Text>

        <Flex w="full" gap={4}>
          <FormControl isInvalid={!!errors.fullName}>
            <FormLabel>Full Name</FormLabel>
            <Input placeholder="Enter your full name" {...register("fullName")} />
            <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="your.email@example.com" {...register("email")} />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
        </Flex>

        <Flex w="full" gap={4}>
          <FormControl isInvalid={!!errors.phone}>
            <FormLabel>Phone</FormLabel>
            <Input type="tel" placeholder="+1 (555) 123-4567" {...register("phone")} />
            <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.location}>
            <FormLabel>Location</FormLabel>
            <Input placeholder="Your current location" {...register("location")} />
            <FormErrorMessage>{errors.location?.message}</FormErrorMessage>
          </FormControl>
        </Flex>

        <FormControl isInvalid={!!errors.service}>
          <FormLabel>Service</FormLabel>
          <Select placeholder="Select a service" {...register("service")}>
            <option value="immigration">Immigration Consultation</option>
            <option value="visa">Visa Application</option>
            <option value="study">Study Abroad</option>
          </Select>
          <FormErrorMessage>{errors.service?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.message}>
          <FormLabel>Message</FormLabel>
          <Textarea
            placeholder="Please describe your requirements, timeline, and any specific questions..."
            {...register("message")}
          />
          <FormErrorMessage>{errors.message?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.preferredDate}>
          <FormLabel>Preferred Date</FormLabel>
          <Input type="date" {...register("preferredDate")} />
          <FormErrorMessage>{errors.preferredDate?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" bg="black" color="white" w="full" isLoading={isSubmitting}>
          Submit Consultation Request
        </Button>
      </VStack>
    </form>
  );
};

export default RequestConsultationForm;
