import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  HStack,
  VStack,
  FormErrorMessage,
  Text,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";

interface EducationFormProps {
  register: any;
  setValue: any;
  watch: any;
  errors: any;
  onEducationOpen: () => void;
}

export default function EducationForm({ register, setValue, watch, errors, onEducationOpen }: EducationFormProps) {
  const education = watch("education");

  const handleTagRemove = (index: number) => {
    const updated = [...education];
    updated.splice(index, 1);
    setValue("education", updated, { shouldValidate: true });
  };

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="lg" color="#2D3748" fontWeight="bold">Education</Text>
      <FormControl isInvalid={!!errors.education}>
        <FormLabel className="text-[#2D3748] pl-1 my-2">Education</FormLabel>
        <HStack
          border="1px solid"
          borderColor="gray.300"
          rounded="15px"
          bg="white"
          outline="1px solid"
          outlineColor="gray.300"
          px={5}
          py={3}
          flexWrap="wrap"
        >
          {education.map((edu: any, idx: number) => (
            <Tag
              key={idx}
              bg="#309689"
              color="white"
              m={1}
              rounded="8px"
              px={2}
            >
              <TagLabel>{edu?.institute}</TagLabel>
              <TagCloseButton onClick={() => handleTagRemove(idx)} />
            </Tag>
          ))}
          <Button
            onClick={onEducationOpen}
            rounded="15px"
            border="1px dashed"
            borderColor="gray.400"
            bg="white"
            color="black"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <MdAdd size={24} />
            Add
          </Button>
        </HStack>
        <FormErrorMessage>{errors.education?.message}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
}