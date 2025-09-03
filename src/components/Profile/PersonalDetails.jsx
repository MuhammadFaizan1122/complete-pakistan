'use client'
import React from 'react';
import { Box, FormControl, FormLabel, Grid, Input, Flex, Text } from '@chakra-ui/react';

const PersonalDetails = ({ formData, handleInputChange, errors }) => {
  return (
    <Box>
      <Text fontSize={{ base: 'xl', md: '26px' }} fontWeight="semibold" mb={{ base: 8, md: 10 }}>
        Personal Details
      </Text>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
        <FormControl isRequired isInvalid={!!errors.name}>
          <FormLabel fontSize="md">Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            borderRadius="15px"
            focusBorderColor="#0a7450"
            px={4}
            py={6}
          />
          {errors.name && <Text color="red.500" fontSize="sm">{errors.name}</Text>}
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.fatherName}>
          <FormLabel fontSize="md">Father Name</FormLabel>
          <Input
            name="fatherName"
            value={formData.fatherName}
            onChange={handleInputChange}
            placeholder="Enter your father name"
            borderRadius="15px"
            focusBorderColor="#0a7450"
            px={4}
            py={6}
          />
          {errors.fatherName && <Text color="red.500" fontSize="sm">{errors.fatherName}</Text>}
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.cnicNumber}>
          <FormLabel fontSize="md">CNIC Number</FormLabel>
          <Input
            name="cnicNumber"
            value={formData.cnicNumber}
            onChange={handleInputChange}
            placeholder="00000-0000000-0"
            borderRadius="15px"
            focusBorderColor="#0a7450"
            px={4}
            py={6}
          />
          {errors.cnicNumber && <Text color="red.500" fontSize="sm">{errors.cnicNumber}</Text>}
        </FormControl>
        <FormControl isInvalid={!!errors.passportNumber}>
          <FormLabel fontSize="md">Passport Number</FormLabel>
          <Input
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleInputChange}
            placeholder="Enter passport number"
            borderRadius="15px"
            focusBorderColor="#0a7450"
            px={4}
            py={6}
          />
          {errors.passportNumber && <Text color="red.500" fontSize="sm">{errors.passportNumber}</Text>}
        </FormControl>
        <FormControl isInvalid={!!errors.passportExpiry}>
          <FormLabel fontSize="md">Passport Expiry</FormLabel>
          <Input
            name="passportExpiry"
            value={formData.passportExpiry}
            onChange={handleInputChange}
            placeholder="dd/mm/yyyy"
            borderRadius="15px"
            type='date'
            focusBorderColor="#0a7450"
            px={4}
            py={6}
            pr="2.5rem"
          />
          {errors.passportExpiry && <Text color="red.500" fontSize="sm">{errors.passportExpiry}</Text>}
        </FormControl>
        <FormControl isInvalid={!!errors.dateOfBirth}>
          <FormLabel fontSize="md">Date of Birth</FormLabel>
          <Input
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            placeholder="dd/mm/yyyy"
            borderRadius="15px"
            type='date'
            focusBorderColor="#0a7450"
            px={4}
            py={6}
            pr="2.5rem"
          />
          {errors.dateOfBirth && <Text color="red.500" fontSize="sm">{errors.dateOfBirth}</Text>}
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.email}>
          <FormLabel fontSize="md">Email Address</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            borderRadius="15px"
            focusBorderColor="#0a7450"
            px={4}
            py={6}
          />
          {errors.email && <Text color="red.500" fontSize="sm">{errors.email}</Text>}
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.phoneNumber}>
          <FormLabel fontSize="md">Phone Number</FormLabel>
          <Flex>
            <Flex
              align="center"
              px={3}
              py={3}
              border="1px solid"
              borderRight="none"
              borderColor="gray.300"
              borderRadius="15px"
              borderRightRadius="none"
              bg="gray.50"
            >
              <Box w="5" h="4" bgGradient="linear(to-b, black, red.500, yellow.400)" rounded="sm" mr={2}></Box>
              <Text fontSize="sm" color="gray.600">+370</Text>
            </Flex>
            <Input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone number"
              borderRadius="15px"
              borderLeftRadius="1px"
              borderColor="gray.300"
              px={4}
              py={6}
              focusBorderColor="#0a7450"
            />
          </Flex>
          {errors.phoneNumber && <Text color="red.500" fontSize="sm">{errors.phoneNumber}</Text>}
        </FormControl>
        <FormControl isInvalid={!!errors.city}>
          <FormLabel fontSize="md">City</FormLabel>
          <Input
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Enter your city"
            borderRadius="15px"
            focusBorderColor="#0a7450"
            px={4}
            py={6}
          />
          {errors.city && <Text color="red.500" fontSize="sm">{errors.city}</Text>}
        </FormControl>
        <FormControl isInvalid={!!errors.completeAddress}>
          <FormLabel fontSize="md">Complete Address</FormLabel>
          <Input
            name="completeAddress"
            value={formData.completeAddress}
            onChange={handleInputChange}
            placeholder="Enter complete address"
            borderRadius="15px"
            focusBorderColor="#0a7450"
            px={4}
            py={6}
          />
          {errors.completeAddress && <Text color="red.500" fontSize="sm">{errors.completeAddress}</Text>}
        </FormControl>
      </Grid>
    </Box>
  );
};

export default PersonalDetails;