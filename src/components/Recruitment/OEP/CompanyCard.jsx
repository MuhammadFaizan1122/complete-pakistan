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
import { useRouter } from 'next/navigation';

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
  mapLink,
  address,
  _id
}) {
  const router = useRouter()
  return (
    <Box
      bg="#f9f9f9"
      borderRadius="lg"
      boxShadow="md"
      p={4}
      display={{ base: 'block', md: "flex" }}
      gap={4}
      border={'1px solid #D1D5DB'}
      alignItems="center"
      w={'100%'}
      cursor={'pointer'}
      // onClick={() => router.push(`/recruitment/oep/details/${_id}`)}
    >
      {/* Left: Logo + Name */}
      <Box w={{ base: 'full', md: "25%" }} >
        <VStack align="center" spacing={1} >
          <Avatar size="xl" name={agencyName} src={agencyLogo} />
          <Text fontWeight="bold" fontSize="lg">
            {agencyName}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {headOffice}
          </Text>
        </VStack>
      </Box>
      <Box w={{ base: 'full', md: "75%" }} >

        {/* Center: Info Sections */}
        <Stack spacing={4} >
          <Box bg={'#fff'} p={2} rounded='lg'>
            <Text fontWeight="bold" mb={1}>
              Services & Expertise
            </Text>
            <HStack spacing={2} wrap="wrap" >
              {services?.map((service, idx) => (
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

            <Box bg={'#fff'} p={2} rounded='lg'>
              <Text fontWeight="bold" mb={2}>
                Business Info
              </Text>
              <VStack align="start" spacing={1} fontSize="sm">
                <HStack><Icon as={FaCalendarAlt} /> <Text>Since {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}</Text></HStack>
                <HStack><Icon as={FaIdCard} /> <Text>{licenceStatus}</Text></HStack>
                <HStack><Icon as={FaMapMarkerAlt} /> <Text>{address?.country}, {address?.state}, {address?.city}</Text></HStack>
              </VStack>
            </Box>
          </SimpleGrid>
        </Stack>
      </Box>
      <Box w={{ base: 'full', md: "25%" }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        {/* Right: Map + Social */}
        <VStack spacing={2} align="center">
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
          <SimpleGrid columns={2} spacing={2}>
            <IconButton icon={<FaFacebookF />} aria-label="Facebook" size="md" colorScheme="gray" variant={'outline'} w={'full'} />
            <IconButton icon={<FaTwitter />} aria-label="Twitter" size="md" colorScheme="gray" variant={'outline'} w={'full'} />
            <IconButton icon={<FaInstagram />} aria-label="Instagram" size="md" colorScheme="gray" variant={'outline'} w={'full'} />
            <IconButton icon={<FaLinkedinIn />} aria-label="LinkedIn" size="md" colorScheme="gray" variant={'outline'} w={'full'} />
          </SimpleGrid>
        </VStack>
      </Box>

    </Box>
  );
}
