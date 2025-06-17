import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Text,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  useDisclosure
} from '@chakra-ui/react';
import { SlCalender } from "react-icons/sl";
import Image from 'next/image';

const SkillPopup = ({ isOpen, onOpen, onClose }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    position: '',
    employer: '',
    city: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancel = () => {
    setFormData({
      position: '',
      employer: '',
      city: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    onClose();
  };

  const handleDone = () => {
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered width={'656px'} height={'705px'}>
        <ModalOverlay bg="blackAlpha.600" />
        <ModalContent
          maxW="656px"
          height="705px"
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
                  Position
                </FormLabel>
                <Input
                  placeholder="Enter your detail"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  bg="gray.50"
                  border="1px solid"
                  borderColor="gray.300"
                  py={6}
                  px={4}
                  borderRadius="12px"
                  fontSize="14px"
                  _placeholder={{ color: 'gray.400' }}
                  outline="1px solid"
                  outlineColor="gray.300"
                  _focus={{
                    ring: 2,
                    ringColor: "#309689",
                    borderColor: "transparent",
                    outline: "none"
                  }}
                  _active={{
                    outline: "none"
                  }}
                />
              </FormControl>

              <HStack spacing={4}>
                <FormControl>
                  <FormLabel
                    fontSize="16px"
                    color="gray.700"
                    fontWeight="normal"
                    mb={2}
                  >
                    Employer
                  </FormLabel>
                  <Input
                    placeholder="Enter your school name"
                    value={formData.employer}
                    onChange={(e) => handleInputChange('employer', e.target.value)}
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="12px"
                    py={6}
                    px={4}
                    fontSize="14px"
                    _placeholder={{ color: 'gray.400' }}
                    outline="1px solid"
                    outlineColor="gray.300"
                    _focus={{
                      ring: 2,
                      ringColor: "#309689",
                      borderColor: "transparent",
                      outline: "none"
                    }}
                    _active={{
                      outline: "none"
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel
                    fontSize="16px"
                    color="gray.700"
                    fontWeight="normal"
                    mb={2}
                  >
                    City
                  </FormLabel>
                  <Input
                    placeholder="Enter your city name"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="12px"
                    py={6}
                    px={4}
                    fontSize="14px"
                    _placeholder={{ color: 'gray.400' }}
                    outline="1px solid"
                    outlineColor="gray.300"
                    _focus={{
                      ring: 2,
                      ringColor: "#309689",
                      borderColor: "transparent",
                      outline: "none"
                    }}
                    _active={{
                      outline: "none"
                    }}
                  />
                </FormControl>
              </HStack>

              <HStack spacing={4}>
                <FormControl>
                  <FormLabel
                    fontSize="16px"
                    color="gray.700"
                    fontWeight="normal"
                    mb={2}
                  >
                    Start
                  </FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="dd/mm/yyyy"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      bg="gray.50"
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="12px"
                      type='date'
                      py={6}
                      px={4}
                      fontSize="14px"
                      _placeholder={{ color: 'gray.400' }}
                      outline="1px solid"
                      outlineColor="gray.300"
                      _focus={{
                        ring: 2,
                        ringColor: "#309689",
                        borderColor: "transparent",
                        outline: "none"
                      }}
                      _active={{
                        outline: "none"
                      }}
                    />
                    {/* <InputRightElement
                      pointerEvents="none"
                      children={
                        <Image alt={'icons'} src={'/Images/Icons/calender.png'} width={15} height={15} />
                        // <SlCalender color="gray.400" />
                      }
                      pr={4}
                    /> */}
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel
                    fontSize="16px"
                    color="gray.700"
                    fontWeight="normal"
                    mb={2}
                  >
                    End
                  </FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="dd/mm/yyyy"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      bg="gray.50"
                      type='date'
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="12px"
                      py={6}
                      px={4}
                      fontSize="14px"
                      _placeholder={{ color: 'gray.400' }}
                      outline="1px solid"
                      outlineColor="gray.300"
                      _focus={{
                        ring: 2,
                        ringColor: "#309689",
                        borderColor: "transparent",
                        outline: "none"
                      }}
                      _active={{
                        outline: "none"
                      }}
                    />
                    {/* <InputRightElement
                      pointerEvents="none"
                      children={
                        <Image alt={'icons'} src={'/Images/Icons/calender.png'} width={15} height={15} />
                      }
                      pr={4}
                    /> */}
                  </InputGroup>
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel
                  fontSize="16px"
                  color="gray.700"
                  fontWeight="normal"
                  mb={2}
                >
                  Description
                </FormLabel>
                <Textarea
                  placeholder="Enter description..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  bg="gray.50"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="12px"
                  py={6}
                  px={4}
                  fontSize="14px"
                  minH="120px"
                  resize="vertical"
                  _placeholder={{ color: 'gray.400' }}
                  outline="1px solid"
                  outlineColor="gray.300"
                  _focus={{
                    ring: 2,
                    ringColor: "#309689",
                    borderColor: "transparent",
                    outline: "none"
                  }}
                  _active={{
                    outline: "none"
                  }}
                />
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