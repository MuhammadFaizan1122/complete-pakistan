'use client';

import { useState } from 'react';
import {
  Box,
  Text,
  Avatar,
  Badge,
  HStack,
  VStack,
  Icon,
  SimpleGrid,
  Stack,
  IconButton,
} from '@chakra-ui/react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
  FaIdCard,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export default function CompanyCard({
  name,
  logoUrl,
  location,
  services,
  contactPerson,
  phone,
  email,
  since,
  license,
  address,
}) {
  return (
    <Box
      borderRadius="lg"
      boxShadow="md"
      display={{ base: 'block', md: "flex" }}
      p={2}
      gap={4}
      border={'1px solid #D1D5DB'}
      alignItems="center"
      w={'100%'}
    >
      {/* Left: Logo + Name */}
      <Box
        w={{ base: 'full', md: '33%' }}
        bgGradient="linear(to-r, #3b82f6, #8b5cf6)"
        color="white"
        p={4}
        py={8}
        borderRadius="md"
        roundedTopEnd={'0px'}
        roundedBottomEnd={'0px'}
      >
        <VStack align="left" spacing={1} >
          <Avatar size="xl" name={name} src={logoUrl} />
          <Text fontWeight="bold" fontSize="lg">
            {name}
          </Text>
          <Text fontSize="md" color="#fff">
            {location}
          </Text>
        </VStack>
      </Box>
      <Box w={{ base: 'full', md: "34%" }} >

        {/* Center: Info Sections */}
        <Stack spacing={4} >
          <Box bg={'#fff'} p={2} rounded='lg'>
            <Text fontWeight="bold" mb={1}>
              Services & Expertise
            </Text>
            <HStack spacing={2} wrap="wrap" >
              {services.map((service, idx) => (
                <Badge
                  key={idx}
                  variant="subtle"
                  fontSize="xs"
                  colorScheme="blue"
                  px={2}
                  py={1}
                  rounded="md"
                  bg="blue.50"
                >
                  {service}
                </Badge>
              ))}
            </HStack>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Box bg={'#fff'} p={2} rounded='lg'>
              <Text fontWeight="bold" mb={2}>
                Contact Details
              </Text>
              <VStack align="start" spacing={1} fontSize="sm">
                <HStack><Icon as={FaPhoneAlt} /> <Text>{phone}</Text></HStack>
                <HStack><Icon as={FaEnvelope} /> <Text>{email}</Text></HStack>
                <HStack><Icon as={FaUser} /> <Text>{contactPerson}</Text></HStack>
              </VStack>
            </Box>

          </SimpleGrid>
        </Stack>
      </Box>
      <Box w={{ base: 'full', md: "33%" }} display="flex" justifyContent="flex-start" alignItems="flex-start" p={4}>
        <VStack spacing={2} align="flex-start" w="full">
          <Box w="100%" h="32" bg="gray.100" borderRadius="md" overflow="hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.850020506004!2d-74.00601548459341!3d40.712775779331794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1615261526583!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </Box>

          <VStack align="flex-start" spacing={1} fontSize="sm" w="full">
            <HStack><Text>Branch: {address}</Text></HStack>
            <HStack><Text>Licence: {license}</Text></HStack>
            <HStack><Text>Since: {since}</Text></HStack>
          </VStack>
        </VStack>
      </Box>

    </Box>
  );
}
