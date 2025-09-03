'use client'
import React from 'react';
import { Box, FormControl, FormLabel, Grid, Input, Select, Text, Textarea } from '@chakra-ui/react';
import { ChevronDown } from 'lucide-react';

const ProfessionalDetails = ({ formData, handleInputChange, errors }) => {
  return (
    <Box>
      <Text fontSize={{ base: 'xl', md: '26px' }} fontWeight="semibold" mb={{ base: 8, md: 10 }}>
        Professional Details
      </Text>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} mt={8}>
        <FormControl isInvalid={!!errors.appliedPositions}>
          <FormLabel fontSize="md">Applied Position</FormLabel>
          <Box
            bg="#E8F4F3"
            px={4}
            py={3}
            borderRadius="15px"
            border="1px solid"
            borderColor="gray.300"
          >
            <Text color="gray.700">Electronic Technician</Text>
          </Box>
          {errors.appliedPositions && <Text color="red.500" fontSize="sm">{errors.appliedPositions}</Text>}
        </FormControl>
        <FormControl isInvalid={!!errors.education}>
          <FormLabel fontSize="md">Education</FormLabel>
          <Select
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            placeholder="Select"
            borderRadius="15px"
            h="50px"
            focusBorderColor="#0a7450"
            icon={
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            }
          >
            <option value="High School">High School</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Certificate">Certificate</option>
          </Select>
          {errors.education && <Text color="red.500" fontSize="sm">{errors.education}</Text>}
        </FormControl>
        <FormControl isInvalid={!!errors.gulfExperience}>
          <FormLabel fontSize="md">Gulf Experience</FormLabel>
          <Select
            name="gulfExperience"
            value={formData.gulfExperience}
            onChange={handleInputChange}
            placeholder="Select"
            borderRadius="15px"
            h="50px"
            focusBorderColor="#0a7450"
            icon={
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            }
          >
            <option value="No Experience">No Experience</option>
            <option value="1-2 Years">1-2 Years</option>
            <option value="3-5 Years">3-5 Years</option>
            <option value="5+ Years">5+ Years</option>
          </Select>
          {errors.gulfExperience && <Text color="red.500" fontSize="sm">{errors.gulfExperience}</Text>}
        </FormControl>
        <FormControl isInvalid={!!errors.gulfLicense}>
          <FormLabel fontSize="md">Gulf License</FormLabel>
          <Select
            name="gulfLicense"
            value={formData.gulfLicense}
            onChange={handleInputChange}
            placeholder="Select"
            borderRadius="15px"
            h="50px"
            focusBorderColor="#0a7450"
            icon={
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            }
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Select>
          {errors.gulfLicense && <Text color="red.500" fontSize="sm">{errors.gulfLicense}</Text>}
        </FormControl>
        <FormControl isInvalid={!!errors.pakistaniLicense}>
          <FormLabel fontSize="md">Pakistani License</FormLabel>
          <Select
            name="pakistaniLicense"
            value={formData.pakistaniLicense}
            onChange={handleInputChange}
            placeholder="Select"
            borderRadius="15px"
            h="50px"
            focusBorderColor="#0a7450"
            icon={
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            }
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Select>
          {errors.pakistaniLicense && <Text color="red.500" fontSize="sm">{errors.pakistaniLicense}</Text>}
        </FormControl>
        <FormControl isInvalid={!!errors.keySkills}>
          <FormLabel fontSize="md">Key Skills</FormLabel>
          <Input
            name="keySkills"
            value={formData.keySkills}
            onChange={handleInputChange}
            placeholder="Enter key skills"
            borderRadius="15px"
            px={4}
            py={6}
            focusBorderColor="#0a7450"
          />
          {errors.keySkills && <Text color="red.500" fontSize="sm">{errors.keySkills}</Text>}
        </FormControl>
      </Grid>
    </Box>
  );
};

export default ProfessionalDetails;