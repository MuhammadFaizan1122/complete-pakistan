'use client';

import { Box, IconButton, VStack, Link } from '@chakra-ui/react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { useState } from 'react';

const SocialSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const socialLinks = [
    { icon: <FaFacebookF />, url: 'https://facebook.com', bg: '#3b5998' },
    { icon: <FaTwitter />, url: 'https://twitter.com', bg: '#1da1f2' },
    { icon: <FaInstagram />, url: 'https://instagram.com', bg: '#e1306c' },
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com', bg: '#0077b5' },
    { icon: <FaYoutube />, url: 'https://youtube.com', bg: '#ff0000' },
  ];

  return (
    <>
      <Box
        position="fixed"
        top="calc(50% - 165px)"
        right="0"
        zIndex={1000}
      >
        <IconButton
          aria-label="Toggle Sidebar"
          icon={isOpen ? <FaChevronRight /> : <FaChevronLeft />}
          size="md"
          onClick={() => setIsOpen(!isOpen)}
          bg="gray.700"
          color="white"
          _hover={{ bg: 'gray.600' }}
          borderRadius="0"
        />
      </Box>

      <Box
        position="fixed"
        top="50%"
        right={isOpen ? '0' : '-60px'}
        transform="translateY(-50%)"
        zIndex={999}
        transition="right 0.3s ease"
      >
        <VStack spacing={0} align="stretch">
          {socialLinks.map((item, idx) => (
            <Link
              key={idx}
              href={item.url}
              isExternal
              _hover={{ textDecor: 'none', opacity: 0.8 }}
            >
              <Box
                bg={item.bg}
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="60px"
                h="50px"
                transition="all 0.3s ease"
              >
                <Box fontSize="20px">{item.icon}</Box>
              </Box>
            </Link>
          ))}
        </VStack>
      </Box>
    </>
  );
};

export default SocialSidebar;
