import React from 'react';
import { VStack, Text, Box, Flex, Tag, Button } from '@chakra-ui/react';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdImportantDevices } from 'react-icons/md';
import { IoMdNotifications } from 'react-icons/io';

const Notice = () => {
  return (
    <VStack align="flex-start" spacing={6} borderRadius="lg">
      <Flex justify="space-between" align="center" w="full">
        <Text fontWeight="bold" fontSize="lg">Important Notices</Text>
      </Flex>
      <Box className="p-4 rounded-lg !border-[2px] border-gray-200" w="full">
        <Flex justify="space-between" align="center">
          <Box>
            <Text fontWeight="bold">New Immigration Policy Updates</Text>
            <Text fontSize="sm" color="gray.600">Important changes to work permit processing times and requirements.</Text>
            <Button
              size="sm"
              mt={2}
              bg="yellow.200"
              rounded="full"
              leftIcon={<FaCalendarAlt />}
            >
              2024-01-15
            </Button>
          </Box>
          <Tag size="sm" colorScheme="red" p={2} borderRadius="full" display="flex" alignItems="center">
            <MdImportantDevices style={{ marginRight: '4px' }} /> Important
          </Tag>
        </Flex>
      </Box>
      <Box className="p-4 rounded-lg !border-[2px] border-gray-200" w="full">
        <Flex justify="space-between" align="center">
          <Box>
            <Text fontWeight="bold">Holiday Schedule</Text>
            <Text fontSize="sm" color="gray.600">Office will be closed from Dec 25-Jan 2. Emergency consultations available.</Text>
            <Button
              size="sm"
              mt={2}
              bg="yellow.200"
              rounded="full"
              leftIcon={<FaCalendarAlt />}
            >
              2024-01-10
            </Button>
          </Box>
          <Tag size="sm" colorScheme="gray" p={2} borderRadius="full" display="flex" alignItems="center">
            <IoMdNotifications style={{ marginRight: '4px' }} /> Notice
          </Tag>
        </Flex>
      </Box>
    </VStack>
  );
};

export default Notice;