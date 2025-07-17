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

interface ExperienceFormProps {
  register: any;
  setValue: any;
  watch: any;
  errors: any;
  tabIndex: any;
  setTabIndex: any;
  onEmploymentOpen: () => void;
}

export default function ExperienceForm({ register, setValue, watch, errors, onEmploymentOpen,setTabIndex }: ExperienceFormProps) {
  const experience = watch("experience");

  const handleTagRemove = (index: number) => {
    const updated = [...experience];
    updated.splice(index, 1);
    setValue("experience", updated, { shouldValidate: true });
  };
  const goNext = () => setTabIndex((prev) => prev + 1);
  const goBack = () => setTabIndex((prev) => Math.max(prev - 1, 0));
  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="lg" color="#2D3748" fontWeight="bold">Work Experience</Text>
      <FormControl isInvalid={!!errors.experience}>
        <FormLabel className="text-[#2D3748] pl-1 my-2">Work Experience</FormLabel>
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
          {experience.map((exp: any, idx: number) => (
            <Tag
              key={idx}
              bg="#309689"
              color="white"
              m={1}
              rounded="8px"
              px={2}
            >
              <TagLabel>{exp?.company}</TagLabel>
              <TagCloseButton onClick={() => handleTagRemove(idx)} />
            </Tag>
          ))}
          <Button
            onClick={onEmploymentOpen}
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
        <FormErrorMessage>{errors.experience?.message}</FormErrorMessage>
      </FormControl>
      <HStack>
        <Button
          mt={4}
          w={'full'}
          bg="#309689"
          color="white"
          rounded="15px"
          px={6}
          py={6}
          _hover={{ bg: "#28796f" }}
          onClick={goBack}
        >
          Previous
        </Button>
        <Button
          mt={4}
          w={'full'}
          bg="#309689"
          color="white"
          rounded="15px"
          px={6}
          py={6}
          _hover={{ bg: "#28796f" }}
          onClick={goNext}
        >
          Next
        </Button>
      </HStack>
    </VStack>
  );
}