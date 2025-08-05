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
import Link from 'next/link';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from 'react-icons/fa';

export default function CompanyCard(item) {
  return (
    <Box
      bg="white"
      maxW="md"
      mx="auto"
      p={6}
      borderRadius="lg"
      boxShadow="md"
      border="1px solid"
      borderColor="#D1D5DB"
      className="space-y-4"
      position="relative"
    >
      {/* Card Clickable Area */}
      <Link href={`/recruitment/vtp/${item.vtpId}`} passHref>
        <Box
          as="a"
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={0}
        />
      </Link>

      <VStack spacing={4} align="center" pb={4} zIndex={1} position="relative" pointerEvents="none">
        <Avatar
          name={item.agencyName}
          src={item.agencyLogo}
          size="xl"
          mb={4}
        />
        <Text fontSize="xl" fontWeight="bold" color="gray.900" mb={2}>
          {item.agencyName}
        </Text>
        <Text fontSize="md" color="gray.600">
          {item?.businessAddress}
        </Text>

        <HStack spacing={1} flexWrap="wrap" justify="center">
          {item?.services?.map((service, idx) => (
            <Badge
              key={idx}
              variant="outline"
              color="#374151"
              borderColor="#D1D5DB"
              fontSize="sm"
              rounded="md"
              className="!border-[#D1D5DB] !outline-[#D1D5DB]"
            >
              {service}
            </Badge>
          ))}
        </HStack>
      </VStack>

      {/* Map (non-clickable) */}
      <Box w="full" h="32" bg="gray.100" rounded="md" overflow="hidden" zIndex={1} position="relative">
        <iframe
          src={item?.mapLink}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>

      {/* Contact Info */}
      <Box fontSize="sm" className="space-y-2" zIndex={1} position="relative" pointerEvents="none">
        <Text color="gray.600">Contact: <span className="text-gray-900">{item?.contactPersonName}</span></Text>
        <Text color="gray.600">Phone: <span className="text-gray-900">{item?.contactPersonPhone}</span></Text>
        <Text color="gray.600" isTruncated>
          Email: <span className="text-gray-900 truncate">{item?.email}</span>
        </Text>
        <Text color="gray.600">Since: <span className="text-gray-900">
          {item?.createdAt ? new Date(item?.createdAt).toLocaleDateString() : 'N/A'}
        </span></Text>
      </Box>

      {/* Social Media Buttons (interactive) */}
      <HStack spacing={3} pt={2} zIndex={1} position="relative">
        {item.socialMedia.facebook && (
          <IconButton
            as={Link}
            href={item.socialMedia.facebook}
            aria-label="Facebook"
            icon={<FaFacebookF />}
            size="lg"
            color="#2563EB"
            variant="ghost"
            isExternal
            target="_blank"
          />
        )}
        {item.socialMedia.twitter && (
          <IconButton
            as={Link}
            href={item.socialMedia.twitter}
            aria-label="Twitter"
            icon={<FaTwitter />}
            size="lg"
            color="#60A5FA"
            variant="ghost"
            isExternal
            target="_blank"
          />
        )}
        {item.socialMedia.instagram && (
          <IconButton
            as={Link}
            href={item.socialMedia.instagram}
            aria-label="Instagram"
            icon={<FaInstagram />}
            size="lg"
            color="#DB2777"
            variant="ghost"
            isExternal
            target="_blank"
          />
        )}
        {item.socialMedia.tiktok && (
          <IconButton
            as={Link}
            href={item.socialMedia.tiktok}
            aria-label="TikTok"
            icon={<FaTiktok />}
            size="lg"
            color="#1D4ED8"
            variant="ghost"
            isExternal
            target="_blank"
          />
        )}
      </HStack>
    </Box>
  );
}
