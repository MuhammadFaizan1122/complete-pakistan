'use client';
import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import CreateCVPage from '../CreateCV/CreateCV';
import SummaryForm from '../CreateCV/CvSummery/CvSummery';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const CVRoot = () => {
  const [selectedView, setSelectedView] = useState(null);
  const boxBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBorderColor = '#309689';
  const router = useRouter();
      const { data: session, status } = useSession();
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);
  if (selectedView === 'create') {
    return <CreateCVPage type="default" />;
  }
  if (selectedView === 'summary') {
    return <SummaryForm type="summary" />;
  }

  return (
    <Flex
      minH="80vh"
      align="center"
      justify="center"
      bg="gray.50"
      direction="column"
      px={4}
      py={10}
    >
      <Text fontSize="3xl" fontWeight="bold" mb={10} color="gray.700">
        Choose an Option to Proceed
      </Text>

      <Flex
        gap={8}
        wrap="wrap"
        justify="center"
        align="center"
      >
        <Box
          onClick={() => setSelectedView('create')}
          cursor="pointer"
          bg={boxBg}
          border="1px solid"
          borderColor={borderColor}
          rounded="2xl"
          p={10}
          w="280px"
          textAlign="center"
          _hover={{ shadow: 'md', borderColor: hoverBorderColor, transform: 'translateY(-4px)' }}
          transition="all 0.25s ease"
        >
          <Text fontSize="xl" fontWeight="semibold" color="gray.700">
            Create Professional CV
          </Text>
        </Box>

        <Box
          cursor="default"
          p={4}
          w="80px"
          textAlign="center"
          userSelect="none"
        >
          <Text fontSize="xl" color="gray.600" my={8}>
            OR
          </Text>
        </Box>

        <Box
          onClick={() => setSelectedView('summary')}
          cursor="pointer"
          bg={boxBg}
          border="1px solid"
          borderColor={borderColor}
          rounded="2xl"
          p={10}
          w="280px"
          textAlign="center"
          _hover={{ shadow: 'md', borderColor: hoverBorderColor, transform: 'translateY(-4px)' }}
          transition="all 0.25s ease"
        >
          <Text fontSize="xl" fontWeight="semibold" color="gray.700">
            Drop Your Summary
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default CVRoot;
