import React from 'react';
import { VStack, Text, Box, Flex, Tag, Button } from '@chakra-ui/react';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdImportantDevices } from 'react-icons/md';
import { IoMdNotifications } from 'react-icons/io';

const Notice = ({ consultant }) => {
  return (
    <VStack align="flex-start" spacing={6} borderRadius="lg">
      <Flex justify="space-between" align="center" w="full">
        <Text fontWeight="bold" fontSize="lg">Important Notices</Text>
      </Flex>
      {consultant.notices.length ?
        consultant.notices.map((item, i) => {
          return (
            <Box className="p-4 rounded-lg !border-[2px] border-gray-200" w="full">
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontWeight="bold">{item.heading}</Text>
                  <Text fontSize="sm" color="gray.600">{item.description}</Text>
                  <Button
                    size="sm"
                    mt={2}
                    bg="yellow.200"
                    rounded="full"
                    leftIcon={<FaCalendarAlt />}
                  >
                    {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                  </Button>
                </Box>
                <Tag size="sm" colorScheme={item.priority === 'Important' ? 'red' : 'gray'} p={2} borderRadius="full" display="flex" alignItems="center">
                  <MdImportantDevices style={{ marginRight: '4px' }} /> {item.priority}
                </Tag>
              </Flex>
            </Box>
          )
        })
        : 'No Notice Available'}
    </VStack>
  );
};

export default Notice;