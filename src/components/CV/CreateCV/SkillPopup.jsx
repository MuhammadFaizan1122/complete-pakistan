'use client'
import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Text,
  Textarea,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
// import { ChevronDownIcon } from '@chakra-ui/icons';

const SkillPopup = ({ isOpen, onClose, formData, setFormData }) => {
  const [formDataState, setFormDataState] = useState({
    skills: [],
  });

  // Predefined skills options
  const skillOptions = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'SQL',
    'TypeScript',
    'Git',
  ];

  const handleInputChange = (field, value) => {
    setFormDataState(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillsChange = (skill) => {
    setFormDataState(prev => {
      const newSkills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills: newSkills };
    });
  };

  const handleCancel = () => {
    setFormDataState({
      skills: [],
    });
    const currentSkills = formDataState.skills || [];
    setFormData('skills', [...currentSkills, formDataState.skills]);
    onClose();
  };

  const handleDone = () => {
    setFormData('skills', [...(formData.skills || []), ...formDataState.skills]);
    onClose();
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered width={'656px'} height={'auto'}>
        <ModalOverlay bg="blackAlpha.600" />
        <ModalContent
          maxW="656px"
          height="auto"
          bg="white"
          borderRadius="20px"
          border="2px solid"
          borderColor="transparent"
          boxShadow="0 10px 30px rgba(0,0,0,0.3)"
          mx={4}
          my={4}
        >
          <ModalBody p={8}>
            <VStack spacing={6} align="stretch">
              <Text
                fontSize="28px"
                fontWeight="500"
                color="gray.700"
                mb={2}
              >
                Skill
              </Text>

              <FormControl>
                <FormLabel
                  fontSize="16px"
                  color="gray.700"
                  fontWeight="normal"
                  mb={2}
                >
                  Add Skills
                </FormLabel>
                <Menu closeOnSelect={false}>
                  <MenuButton
                    as={Button}
                    // rightIcon={<ChevronDownIcon />}
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="12px"
                    w={'full'}
                    py={6}
                    px={4}
                    fontSize="14px"
                    textAlign="left"
                    color={formData.skills.length === 0 ? 'gray.400' : 'gray.700'}
                    _hover={{ bg: 'gray.100' }}
                    _active={{ bg: 'gray.200' }}
                    _focus={{
                      ring: 2,
                      ringColor: '#309689',
                      borderColor: 'transparent',
                      outline: 'none',
                    }}
                  >
                    {formData.skills.length > 0 ? `${formData.skills.length} skill(s) selected` : 'Select skills...'}
                  </MenuButton>
                  <MenuList maxH="200px" overflowY="auto">
                    {skillOptions.map(skill => (
                      <MenuItem key={skill} onClick={() => handleSkillsChange(skill)}>
                        <Checkbox
                          isChecked={formDataState.skills.includes(skill)}
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
                  {formDataState.skills.map(skill => (
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
                  _hover={{ bg: 'gray.300' }}
                  _active={{ bg: 'gray.400' }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDone}
                  bg="#309689"
                  color="white"
                  fontSize="16px"
                  fontWeight="bold"
                  py={6}
                  px={8}
                  borderRadius="12px"
                  flex={1}
                >
                  Done
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SkillPopup;