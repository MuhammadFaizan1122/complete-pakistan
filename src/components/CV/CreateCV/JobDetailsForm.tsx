import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";

interface JobDetailsFormProps {
  register: any;
  setValue: any;
  watch: any;
  errors: any;
  setUserIndustry: (val: string) => void;
  setUserCategory: (val: string) => void;
  setUserSubCategory: (val: string) => void;
}

export default function JobDetailsForm({
  register,
  setValue,
  watch,
  errors,
  setUserIndustry,
  setUserCategory,
  setUserSubCategory,
}: JobDetailsFormProps) {
  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="lg" color="#2D3748" fontWeight="bold">Job Details</Text>
      <FormControl isInvalid={!!errors.jobTitle}>
        <FormLabel className="text-[#2D3748] pl-1 mt-2">Job Title</FormLabel>
        <Input
          placeholder="Enter job title"
          rounded="15px"
          p={4}
          py={6}
          border="1px solid"
          borderColor="gray.300"
          bg="white"
          outline="1px solid"
          outlineColor="gray.300"
          _focus={{ ring: 2, ringColor: "#309689", borderColor: "transparent", outline: "none" }}
          _active={{ outline: "none" }}
          transition="all 0.2s"
          {...register("jobTitle")}
        />
        <FormErrorMessage>{errors.jobTitle?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.industry}>
        <FormLabel className="text-[#2D3748] pl-1 mt-2">Industry</FormLabel>
        <Select
          placeholder="Select industry"
          rounded="15px"
          h="50px"
          border="1px solid"
          borderColor="gray.300"
          bg="white"
          outline="1px solid"
          outlineColor="gray.300"
          _focus={{ ring: 2, ringColor: "#309689", borderColor: "transparent", outline: "none" }}
          _active={{ outline: "none" }}
          transition="all 0.2s"
          {...register("industry")}
          onChange={(e) => {
            setUserIndustry(e.target.value);
            setValue("industry", e.target.value);
          }}
        >
          {["Construction", "Manufacturing", "IT", "Healthcare", "Education"].map((industry) => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </Select>
        <FormErrorMessage>{errors.industry?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.category}>
        <FormLabel className="text-[#2D3748] pl-1 mt-2">Category</FormLabel>
        <Select
          placeholder="Select category"
          rounded="15px"
          h="50px"
          border="1px solid"
          borderColor="gray.300"
          bg="white"
          outline="1px solid"
          outlineColor="gray.300"
          _focus={{ ring: 2, ringColor: "#309689", borderColor: "transparent", outline: "none" }}
          _active={{ outline: "none" }}
          transition="all 0.2s"
          {...register("category")}
          onChange={(e) => {
            setUserCategory(e.target.value);
            setValue("category", e.target.value);
          }}
        >
          {["Technical", "Management", "Support", "Other"].map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </Select>
        <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.subcategory}>
        <FormLabel className="text-[#2D3748] pl-1 mt-2">Subcategory</FormLabel>
        <Select
          placeholder="Select subcategory"
          rounded="15px"
          h="50px"
          border="1px solid"
          borderColor="gray.300"
          bg="white"
          outline="1px solid"
          outlineColor="gray.300"
          _focus={{ ring: 2, ringColor: "#309689", borderColor: "transparent", outline: "none" }}
          _active={{ outline: "none" }}
          transition="all 0.2s"
          {...register("subcategory")}
          onChange={(e) => {
            setUserSubCategory(e.target.value);
            setValue("subcategory", e.target.value);
          }}
        >
          {["Engineer", "Technician", "Supervisor", "Other"].map((subcategory) => (
            <option key={subcategory} value={subcategory}>{subcategory}</option>
          ))}
        </Select>
        <FormErrorMessage>{errors.subcategory?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.jobDetails}>
        <FormLabel className="text-[#2D3748] pl-1 mt-2">Job Details</FormLabel>
        <Input
          placeholder="Enter job details"
          rounded="15px"
          p={4}
          py={6}
          border="1px solid"
          borderColor="gray.300"
          bg="white"
          outline="1px solid"
          outlineColor="gray.300"
          _focus={{ ring: 2, ringColor: "#309689", borderColor: "transparent", outline: "none" }}
          _active={{ outline: "none" }}
          transition="all 0.2s"
          {...register("jobDetails")}
        />
        <FormErrorMessage>{errors.jobDetails?.message}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
}