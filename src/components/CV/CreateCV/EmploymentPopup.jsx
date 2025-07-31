'use client'
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
  Select
} from '@chakra-ui/react';
import { Country, State } from 'country-state-city';

const EmploymentPopup = ({ isOpen, onOpen, onClose, formData, setFormData }) => {
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);

  const [employmentData, setEmploymentData] = useState({
    designation: '',
    company: '',
    country: '',
    state: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleInputChange = (field, value) => {
    setEmploymentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancel = () => {
    setEmploymentData({
      designation: '',
      company: '',
      country: '',
      state: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    onClose();
  };

  const handleDone = () => {
      const currentEducation = formData.experience || [];
      setFormData('experience', [...currentEducation, employmentData]);

    // setFormData(prev => ({
    //   ...prev,
    //   experience: [...(prev.experience || []), employmentData]
    // }));
    onClose();
  };
  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    const selectedCountry = countries.find(c => c.name === countryCode);
    const stateList = State.getStatesOfCountry(selectedCountry.isoCode);
    setStates(stateList);
    // setCities([]);
  };
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered width={'656px'} h={'1000px'} className={'!h-auto'}>
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
                Employment
              </Text>
              <HStack spacing={4}>

                <FormControl>
                  <FormLabel
                    fontSize="16px"
                    color="gray.700"
                    fontWeight="normal"
                    mb={2}
                  >
                    Designation
                  </FormLabel>
                  <Input
                    placeholder="Enter your designation"
                    value={employmentData.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
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
                      ringColor: "#0a7450",
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
                    Company Name
                  </FormLabel>
                  <Input
                    placeholder="Enter company"
                    value={employmentData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
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
                      ringColor: "#0a7450",
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
                    Country
                  </FormLabel>
                  <Select
                    placeholder="Country"
                    value={employmentData.country}
                    onChange={e => { setEmploymentData({ ...employmentData, country: e.target.value }), handleCountryChange(e) }}
                    w="full"
                    h="50px"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="15px"
                    bg="white"
                    outline="1px solid"
                    outlineColor="gray.300"
                    _focus={{
                      ring: 2,
                      ringColor: "#0a7450",
                      borderColor: "transparent",
                      outline: "none"
                    }}
                    _active={{
                      outline: "none"
                    }}
                    transition="all 0.2s"
                  >
                    {countries.map(c => (
                      <option key={c.isoCode} value={c.name}>{c.name}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel
                    fontSize="16px"
                    color="gray.700"
                    fontWeight="normal"
                    mb={2}
                  >
                    State
                  </FormLabel>
                  <Select
                    placeholder="State"
                    value={employmentData.state}
                    onChange={e => setEmploymentData({ ...employmentData, state: e.target.value })}
                    w="full"
                    h="50px"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="15px"
                    bg="white"
                    outline="1px solid"
                    outlineColor="gray.300"
                    _focus={{
                      ring: 2,
                      ringColor: "#0a7450",
                      borderColor: "transparent",
                      outline: "none"
                    }}
                    _active={{
                      outline: "none"
                    }}
                    transition="all 0.2s"
                  >
                    {states.map(c => (
                      <option key={c.isoCode} value={c.name}>{c.name}</option>
                    ))}
                  </Select>
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
                      value={employmentData.startDate}
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
                      max={new Date().toISOString().split("T")[0]}

                      outlineColor="gray.300"
                      _focus={{
                        ring: 2,
                        ringColor: "#0a7450",
                        borderColor: "transparent",
                        outline: "none"
                      }}
                      _active={{
                        outline: "none"
                      }}
                    />
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
                      value={employmentData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      bg="gray.50"
                      type='date'
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="12px"
                      max={new Date().toISOString().split("T")[0]}

                      py={6}
                      px={4}
                      fontSize="14px"
                      _placeholder={{ color: 'gray.400' }}
                      outline="1px solid"
                      outlineColor="gray.300"
                      _focus={{
                        ring: 2,
                        ringColor: "#0a7450",
                        borderColor: "transparent",
                        outline: "none"
                      }}
                      _active={{
                        outline: "none"
                      }}
                    />
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
                  value={employmentData.description}
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
                    ringColor: "#0a7450",
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
                  bg="#0a7450"
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

export default EmploymentPopup;