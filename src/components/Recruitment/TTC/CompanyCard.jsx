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
  agencyName,
  agencyLogo,
  headOffice,
  services,
  contactPersonName,
  contactPersonPhone,
  agencyEmail,
  createdAt,
  licenceStatus,
  licenceNo,
  mapLink,
  address
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
          <Avatar size="xl" name={agencyName} src={agencyLogo} />
          <Text fontWeight="bold" fontSize="lg">
            {agencyName}
          </Text>
          <Text fontSize="md" color="#fff">
            {address?.country}
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
                <HStack><Icon as={FaPhoneAlt} /> <Text>{contactPersonPhone}</Text></HStack>
                <HStack><Icon as={FaEnvelope} /> <Text>{agencyEmail}</Text></HStack>
                <HStack><Icon as={FaUser} /> <Text>{contactPersonName}</Text></HStack>
              </VStack>
            </Box>

          </SimpleGrid>
        </Stack>
      </Box>
      <Box w={{ base: 'full', md: "33%" }} display="flex" justifyContent="flex-start" alignItems="flex-start" p={4}>
        <VStack spacing={2} align="flex-start" w="full">
          <Box w="100%" h="32" bg="gray.100" borderRadius="md" overflow="hidden">
            <iframe
              src={mapLink}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </Box>

          <VStack align="flex-start" spacing={1} fontSize="sm" w="full">
            <HStack><Text>Branch: {address?.country}</Text></HStack>
            <HStack><Text>Licence: {licenceNo}</Text></HStack>
            <HStack><Text>Since: {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}</Text></HStack>
          </VStack>
        </VStack>
      </Box>

    </Box>
  );
}
