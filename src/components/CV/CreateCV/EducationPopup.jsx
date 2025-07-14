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
  Select,
  FormErrorMessage
} from '@chakra-ui/react';
import { Country, State } from 'country-state-city';

const EmploymentPopup = ({ isOpen, onOpen, onClose, formData, setFormData }) => {
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);

  const [employmentData, setEmploymentData] = useState({
    level: '',
    institute: '',
    country: '',
    state: '',
    startDate: '',
    endDate: '',
    details: ''
  });
  const [errors, setErrors] = useState({
    level: '',
    institute: '',
    country: '',
    state: '',
    startDate: '',
    endDate: '',
  });


  const handleInputChange = (field, value) => {
    setEmploymentData({ ...employmentData, [field]: value });
    setErrors(prev => ({ ...prev, [field]: '' }));
  };


  const handleCancel = () => {
    setEmploymentData({
      level: '',
      institute: '',
      country: '',
      state: '',
      startDate: '',
      endDate: '',
      details: ''
    });
    onClose();
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      level: '',
      institute: '',
      country: '',
      state: '',
      startDate: '',
      endDate: '',
    };

    if (!employmentData.level) {
      newErrors.level = 'Level is required';
      isValid = false;
    }
    if (!employmentData.country) {
      newErrors.country = 'Country is required';
      isValid = false;
    }
    if (!employmentData.state) {
      newErrors.state = 'State is required';
      isValid = false;
    }
    if (!employmentData.startDate) {
      newErrors.startDate = 'Start date is required';
      isValid = false;
    }
    if (!employmentData.endDate) {
      newErrors.endDate = 'End Date is required';
      isValid = false;
    }
    if (!employmentData.institute || employmentData.institute.trim() === '') {
      newErrors.institute = 'Institute name is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleDone = () => {
    console.log('handleDone called with employmentData:', employmentData);
    try {
      if (!validateForm()) {
        console.log('Validation failed');
        return;
      }

      // Update education array using react-hook-form's setValue
      const currentEducation = formData.education || [];
      setFormData('education', [...currentEducation, employmentData]);
      setEmploymentData({
        level: '',
        institute: '',
        country: '',
        state: '',
        startDate: '',
        endDate: '',
        details: ''
      });
      console.log('Education updated:', [...currentEducation, employmentData]);
      console.log('Calling onClose');
      onClose();
    } catch (error) {
      console.error('Error in handleDone:', error);
      throw error; // Rethrow for debugging
    }
  };
  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    const selectedCountry = countries.find(c => c.name === countryCode);
    const stateList = State.getStatesOfCountry(selectedCountry.isoCode);
    setStates(stateList);
    // setCities([]);
  };
  // console.log('errors', errors)
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
                Education
              </Text>
              <HStack spacing={4}>

                <FormControl isRequired isInvalid={!!errors.level}>
                  <FormLabel
                    fontSize="16px"
                    color="gray.700"
                    fontWeight="normal"
                    mb={2}
                  >
                    Level
                  </FormLabel>
                  <Select
                    placeholder="Level"
                    required
                    value={employmentData.level}
                    // onChange={e => { setEmploymentData({ ...employmentData, level: e.target.value }), handleCountryChange(e) }}
                    onChange={(e) => {
                      setEmploymentData({ ...employmentData, level: e.target.value });
                      setErrors(prev => ({ ...prev, level: '' }));
                    }}
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
                      ringColor: "#309689",
                      borderColor: "transparent",
                      outline: "none"
                    }}
                    _active={{
                      outline: "none"
                    }}
                    transition="all 0.2s"
                  >
                    <option value={'Middle'}>Middle</option>
                    <option value={'Bachelar'}>Bachelar</option>
                    <option value={'Diploma'}>LevDiploma</option>
                    <option value={'Course'}>Course</option>
                  </Select>
                  <FormErrorMessage>{errors.level}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.institute}>
                  <FormLabel
                    fontSize="16px"
                    color="gray.700"
                    fontWeight="normal"
                    mb={2}
                  >
                    Institute name
                  </FormLabel>
                  <Input
                    placeholder="Enter institute name"
                    value={employmentData.institute}
                    onChange={(e) => handleInputChange('institute', e.target.value)}
                    bg="gray.50"
                    required
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
                  <FormErrorMessage>{errors.institute}</FormErrorMessage>

                </FormControl>
              </HStack>

              <HStack spacing={4}>
                <FormControl isRequired isInvalid={!!errors.country}>
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
                    // onChange={e => { setEmploymentData({ ...employmentData, country: e.target.value }), handleCountryChange(e) }}
                    onChange={(e) => {
                      setEmploymentData({ ...employmentData, country: e.target.value });
                      setErrors(prev => ({ ...prev, country: '' }));
                      handleCountryChange(e);
                    }}
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
                      ringColor: "#309689",
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
                  <FormErrorMessage>{errors.countries}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.state}>
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
                    // onChange={e => setEmploymentData({ ...employmentData, state: e.target.value })}
                    onChange={(e) => {
                      setEmploymentData({ ...employmentData, state: e.target.value });
                      setErrors(prev => ({ ...prev, state: '' }));
                    }}
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
                      ringColor: "#309689",
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
                  <FormErrorMessage>{errors.states}</FormErrorMessage>
                </FormControl>
              </HStack>

              <HStack spacing={4}>
                <FormControl isRequired isInvalid={!!errors.startDate}>
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
                        ringColor: "#309689",
                        borderColor: "transparent",
                        outline: "none"
                      }}
                      _active={{
                        outline: "none"
                      }}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.startDate}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.endDate}>
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
                        ringColor: "#309689",
                        borderColor: "transparent",
                        outline: "none"
                      }}
                      _active={{
                        outline: "none"
                      }}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.endDate}</FormErrorMessage>
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel
                  fontSize="16px"
                  color="gray.700"
                  fontWeight="normal"
                  mb={2}
                >
                  Other Details
                </FormLabel>
                <Textarea
                  placeholder="Enter details..."
                  value={employmentData.details}
                  onChange={(e) => handleInputChange('details', e.target.value)}
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

export default EmploymentPopup;