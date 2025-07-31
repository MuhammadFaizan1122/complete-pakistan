import React, { useState } from "react";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
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
}

export default function SkillsForm({ downloadPDF, register, setValue, watch, errors, setTabIndex }: SkillsFormProps) {
  const skills = watch("skills") || [];
  const [isAdding, setIsAdding] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState({ skills: "" });

  // Predefined skills options
  const skillOptions = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "SQL",
    "TypeScript",
    "Git",
  ];

  const handleTagRemove = (index: number) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setValue("skills", updated, { shouldValidate: true });
  };

  const goNext = () => setTabIndex((prev: number) => prev + 1);
  const goBack = () => setTabIndex((prev: number) => Math.max(prev - 1, 0));

  const handleSkillsChange = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
    setFormErrors({ skills: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { skills: "" };

    if (selectedSkills.length === 0) {
      newErrors.skills = "At least one skill is required";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleDone = () => {
    if (!validateForm()) return;
    setValue("skills", [...skills, ...selectedSkills], { shouldValidate: true });
    setSelectedSkills([]);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setSelectedSkills([]);
    setFormErrors({ skills: "" });
    setIsAdding(false);
  };

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="lg" color="#2D3748" fontWeight="bold">
        Skills & Expertise
      </Text>
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
              bg="#0a7450"
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
            onClick={() => setIsAdding(true)}
            rounded="15px"
            border="1px dashed"
            borderColor="gray.400"
            bg="white"
            color="black"
            display="flex"
            alignItems="center"
            gap={2}
            isDisabled={isAdding}
          >
            <MdAdd size={24} />
            Add
          </Button>
        </HStack>
        <FormErrorMessage>{errors.skills?.message}</FormErrorMessage>
      </FormControl>

      {isAdding && (
        <VStack spacing={6} align="stretch" mt={4}>
          <FormControl isInvalid={!!formErrors.skills}>
            <FormLabel fontSize="16px" color="gray.700" fontWeight="normal" mb={2}>
              Add Skills
            </FormLabel>
            <Menu closeOnSelect={false}>
              <MenuButton
                as={Button}
                bg="gray.50"
                border="1px solid"
                borderColor="gray.300"
                borderRadius="12px"
                w="full"
                py={6}
                px={4}
                fontSize="14px"
                textAlign="left"
                color={selectedSkills.length === 0 ? "gray.400" : "gray.700"}
                _hover={{ bg: "gray.100" }}
                _active={{ bg: "gray.200" }}
                _focus={{
                  ring: 2,
                  ringColor: "#0a7450",
                  borderColor: "transparent",
                  outline: "none",
                }}
              >
                {selectedSkills.length > 0 ? `${selectedSkills.length} skill(s) selected` : "Select skills..."}
              </MenuButton>
              <MenuList maxH="200px" overflowY="auto">
                {skillOptions.map((skill) => (
                  <MenuItem key={skill} onClick={() => handleSkillsChange(skill)}>
                    <Checkbox
                      isChecked={selectedSkills.includes(skill)}
                      onChange={() => handleSkillsChange(skill)}
                      colorScheme="teal"
                    >
                      {skill}
                    </Checkbox>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <HStack mt={2} wrap="wrap" spacing={2}>
              {selectedSkills.map((skill) => (
                <Tag
                  key={skill}
                  size="md"
                  borderRadius="8px"
                  variant="solid"
                  bg="#E6FFFA"
                  color="gray.700"
                >
                  <TagLabel>{skill}</TagLabel>
                  <TagCloseButton onClick={() => handleSkillsChange(skill)} />
                </Tag>
              ))}
            </HStack>
            <FormErrorMessage>{formErrors.skills}</FormErrorMessage>
          </FormControl>

          <HStack spacing={4} mt={4}>
            <Button
              onClick={handleCancel}
              bg="#F1F2F4"
              color="gray.700"
              fontSize="16px"
              fontWeight="bold"
              py={6}
              px={8}
              borderRadius="12px"
              flex={1}
              _hover={{ bg: "gray.300" }}
              _active={{ bg: "gray.400" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDone}
              bg="#0a7450"
              color="white"
              fontSize="16px"
              fontWeight="bold"
              py={6}
              px={8}
              borderRadius="12px"
              flex={1}
              _hover={{ bg: "#28796f" }}
            >
              Done
            </Button>
          </HStack>
        </VStack>
      )}

      <HStack>
        <Button
          mt={4}
          w="full"
          bg="#0a7450"
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
          bg="#0a7450"
          color="white"
          w="full"
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
          bg="#0a7450"
          w="full"
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
          bg="#0a7450"
          w="full"
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