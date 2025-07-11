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

interface SkillsFormProps {
  register: any;
  setValue: any;
  watch: any;
  errors: any;
  onSkillOpen: () => void;
}

export default function SkillsForm({ register, setValue, watch, errors, onSkillOpen }: SkillsFormProps) {
  const skills = watch("skills");

  const handleTagRemove = (index: number) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setValue("skills", updated, { shouldValidate: true });
  };

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="lg" color="#2D3748" fontWeight="bold">Skills & Expertise</Text>
      <FormControl isInvalid={!!errors.skills}>
        <FormLabel className="text-[#2D3748] pl-1 my-2">Skills & Expertise</FormLabel>
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
          {skills.map((skill: string, idx: number) => (
            <Tag
              key={idx}
              bg="#309689"
              color="white"
              m={1}
              rounded="8px"
              px={2}
            >
              <TagLabel>{skill}</TagLabel>
              <TagCloseButton onClick={() => handleTagRemove(idx)} />
            </Tag>
          ))}
          <Button
            onClick={onSkillOpen}
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
        <FormErrorMessage>{errors.skills?.message}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
}