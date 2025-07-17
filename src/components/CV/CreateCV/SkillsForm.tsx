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
  downloadPDF: any;
  register: any;
  setValue: any;
  watch: any;
  errors: any;
  tabIndex: any;
  setTabIndex: any;
  onSkillOpen: () => void;
}

export default function SkillsForm({ downloadPDF, register, setValue, watch, errors, onSkillOpen, setTabIndex }: SkillsFormProps) {
  const skills = watch("skills");

  const handleTagRemove = (index: number) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setValue("skills", updated, { shouldValidate: true });
  };
  const goNext = () => setTabIndex((prev) => prev + 1);
  const goBack = () => setTabIndex((prev) => Math.max(prev - 1, 0));
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
          type="submit"
          mt={4}
          bg="#309689"
          color="white"
          w={'full'}
          rounded="15px"
          px={6}
          py={6}
          _hover={{ bg: "#28796f" }}
        >
          Submit CV
        </Button>
        <Button
          onClick={downloadPDF}
          mt={4}
          bg="#309689"
          w={'full'}
          color="white"
          rounded="15px"
          px={6}
          py={6}
          _hover={{ bg: "#28796f" }}
        >
          Download CV
        </Button>
        <Button
          mt={4}
          bg="#309689"
          w={'full'}
          color="white"
          rounded="15px"
          px={6}
          py={6}
          _hover={{ bg: "#28796f" }}
        >
          Share CV
        </Button>
      </HStack>
    </VStack>
  );
}