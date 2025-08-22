import React from 'react';
import { VStack, Text, SimpleGrid, Box, Flex, Icon } from '@chakra-ui/react';
import { FaCamera } from 'react-icons/fa'; // Placeholder icon for images

const Gallery = () => {
  return (
    <VStack align="flex-start" spacing={6} p={4} bg="gray.50" borderRadius="lg" boxShadow="md">
      <Text fontWeight="bold" fontSize="lg">Picture Gallery</Text>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} w="full">
        <Box>
          <Flex
            align="center"
            justify="center"
            h="150px"
            bg="gray.100"
            borderRadius="md"
            border="1px"
            borderColor="green.200"
          >
            <Icon as={FaCamera} boxSize={8} color="gray.500" />
          </Flex>
          <Text fontSize="sm" color="gray.600" mt={2} textAlign="center">
            One-on-one consultation sessions with clients
          </Text>
        </Box>
        <Box>
          <Flex
            align="center"
            justify="center"
            h="150px"
            bg="gray.100"
            borderRadius="md"
            border="1px"
            borderColor="purple.200"
          >
            <Icon as={FaCamera} boxSize={8} color="gray.500" />
          </Flex>
          <Text fontSize="sm" color="gray.600" mt={2} textAlign="center">
            Celebrating client success at graduation ceremonies
          </Text>
        </Box>
        <Box>
          <Flex
            align="center"
            justify="center"
            h="150px"
            bg="gray.100"
            borderRadius="md"
            border="1px"
            borderColor="green.200"
          >
            <Icon as={FaCamera} boxSize={8} color="gray.500" />
          </Flex>
          <Text fontSize="sm" color="gray.600" mt={2} textAlign="center">
            Successful visa approvals and work permits
          </Text>
        </Box>
        <Box>
          <Flex
            align="center"
            justify="center"
            h="150px"
            bg="gray.100"
            borderRadius="md"
            border="1px"
            borderColor="orange.200"
          >
            <Icon as={FaCamera} boxSize={8} color="gray.500" />
          </Flex>
          <Text fontSize="sm" color="gray.600" mt={2} textAlign="center">
            Our expert team working on client applications
          </Text>
        </Box>
        <Box>
          <Flex
            align="center"
            justify="center"
            h="150px"
            bg="gray.100"
            borderRadius="md"
            border="1px"
            borderColor="pink.200"
          >
            <Icon as={FaCamera} boxSize={8} color="gray.500" />
          </Flex>
          <Text fontSize="sm" color="gray.600" mt={2} textAlign="center">
            Happy clients sharing their success stories
          </Text>
        </Box>
      </SimpleGrid>
    </VStack>
  );
};

export default Gallery;