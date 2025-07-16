'use client';
import React, { useState } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import CreateCVPage from '../CreateCV/CreateCV';
import SummaryForm from '../CreateCV/CvSummery/CvSummery';

const CVRoot = () => {
  const [selectedView, setSelectedView] = useState(null);

  if (selectedView === 'create') {
    return <CreateCVPage />;
  }
  if (selectedView === 'summary'){
    return <SummaryForm />;
  }

  return (
    <Flex
      minH="80vh"
      align="center"
      justify="center"
      bg="gray.50"
      direction="column"
      gap={8}
    >
      <Flex gap={6} wrap="wrap" justify="center">
        <Box
          onClick={() => setSelectedView('create')}
          cursor="pointer"
          bg="white"
          border="1px solid"
          borderColor="gray.300"
          rounded="2xl"
          p={10}
          w="280px"
          textAlign="center"
          _hover={{ shadow: 'lg', borderColor: '#309689' }}
          transition="all 0.2s"
        >
          <Text fontSize="xl" fontWeight="bold" color="gray.700">
            Create Complete CV
          </Text>
        </Box>

        <Box
          onClick={() => setSelectedView('summary')}
          cursor="pointer"
          bg="white"
          border="1px solid"
          borderColor="gray.300"
          rounded="2xl"
          p={10}
          w="280px"
          textAlign="center"
          _hover={{ shadow: 'lg', borderColor: '#309689' }}
          transition="all 0.2s"
        >
          <Text fontSize="xl" fontWeight="bold" color="gray.700">
            Add Summary
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default CVRoot;
