import React from 'react';
import { VStack, Text, SimpleGrid, Box, Flex, Icon } from '@chakra-ui/react';
import { FaCamera } from 'react-icons/fa';
import Image from 'next/image';
const Gallery = ({ consultant }) => {
  return (
    <VStack align="flex-start" spacing={6} p={4} bg="gray.50" borderRadius="lg" boxShadow="md">
      <Text fontWeight="bold" fontSize="lg">Picture Gallery</Text>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} w="full">
        {consultant?.gallery?.length ? (
          consultant.gallery.map((item, i) => (
            <Box key={i}>
              <Flex
                align="center"
                justify="center"
                h="150px"
                bg="gray.100"
                borderRadius="md"
                border="1px"
                borderColor="green.200"
                overflow="hidden"
              >
                <Image
                  src={item.url || "/Images/placeholder.png"}
                  alt="Client Profile"
                  width={150}
                  height={150}
                  className="w-full h-full object-contain"
                />
              </Flex>

              <Text fontSize="sm" color="gray.600" mt={2} textAlign="center">
                {item.caption}
              </Text>
            </Box>
          ))
        ) : (
          "No Data Available"
        )}
      </SimpleGrid>

    </VStack>
  );
};

export default Gallery;