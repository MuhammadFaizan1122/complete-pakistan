'use client';

import {
  Box,
  VStack,
  Text,
  Badge,
  HStack,
  Image,
  IconButton,
  Avatar,
} from '@chakra-ui/react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

export default function CompanyCard({
  name,
  location,
  services,
  contactPerson,
  phone,
  email,
  since,
  mapLink,
}) {
  return (
    <Box
      bg="white"
      maxW="md"
      mx="auto"
      p={6}
      borderRadius="lg"
      boxShadow="md"
      border={'1px solid'}
      borderColor={'#D1D5DB'}
      className="space-y-4"
    >
      <VStack spacing={4} align="center" pb={4}>
        <Avatar
          name={name}
          src="/path-to-logo.png" 
          size="xl"
          mb={4}
        />
        <Text fontSize="xl" fontWeight="bold" color="gray.900" mb={2}>
          {name}
        </Text>
        <Text fontSize="md" color="gray.600">
          {location}
        </Text>

        <HStack spacing={1} flexWrap="wrap" justify="center">
          {services.map((service, idx) => (
            <Badge
              key={idx}
              variant="outline"
              color="#374151"
              borderColor="#D1D5DB"
              fontSize="sm"
              rounded={'md'}
              className='!border-[#D1D5DB] !outline-[#D1D5DB]'
            >
              {service}
            </Badge>
          ))}
        </HStack>

        <Box w="full" h="32" bg="gray.100" rounded="md" overflow="hidden">
          <iframe
            src={mapLink}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>

      </VStack>

      <Box fontSize="sm" className="space-y-2">
        <Text color="gray.600">Contact: <span className="text-gray-900">{contactPerson}</span></Text>
        <Text color="gray.600">Phone: <span className="text-gray-900">{phone}</span></Text>
        <Text color="gray.600" isTruncated>
          Email: <span className="text-gray-900 truncate">{email}</span>
        </Text>
        <Text color="gray.600">Since: <span className="text-gray-900">{since}</span></Text>
      </Box>

      <HStack spacing={3} pt={2}>
        <IconButton
          aria-label="Facebook"
          icon={<FaFacebookF />}
          size="lg"
          color="#2563EB"
          variant="ghost"
        />
        <IconButton
          aria-label="Twitter"
          icon={<FaTwitter />}
          size="lg"
          color="#60A5FA"
          variant="ghost"
        />
        <IconButton
          aria-label="Instagram"
          icon={<FaInstagram />}
          size="lg"
          color="#DB2777"
          variant="ghost"
        />
        <IconButton
          aria-label="LinkedIn"
          icon={<FaLinkedinIn />}
          size="lg"
          color="#1D4ED8"
          variant="ghost"
        />
      </HStack>
    </Box>
  );
}
