'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
  Center,
  Text,
  Button,
  useColorModeValue,
  Icon,
  Flex,
  Tag,
  TagLabel
} from '@chakra-ui/react';
import { MdReportProblem, MdCheckCircle } from 'react-icons/md';
import { handleGetAllIssues } from '../../../handlers/gamca/gamca-issues';
import { HeroSection } from '../MedicalCenters/HeroSection';

export default function GamcaIssuesList() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sliderImages, setSliderImages] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await handleGetAllIssues();
        const response = await fetch(`/api/slider?page=GAMCAIssues&Solutions`);
        const sliderData = await response.json();
        setSliderImages(sliderData?.data?.sliderImgs || []);
        setNews(sliderData?.data?.news || []);
        if (data.success) {
          setIssues(data.data);
          setError(null);
        } else {
          setError("Failed to fetch issues.");
        }
      } catch (err) {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const cardBg = useColorModeValue("white", "gray.800");
  const issueIconColor = useColorModeValue("red.400", "red.300");
  const solutionIconColor = useColorModeValue("green.500", "green.400");

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="#309689" thickness="4px" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center minH="100vh">
        <VStack spacing={6}>
          <Text fontSize="xl" color="red.500" fontWeight="medium">{error}</Text>
          <Button
            bgGradient="linear(to-r, #309689, #1A3C34)"
            color="white"
            rounded="full"
            px={8}
            py={6}
            _hover={{ bgGradient: "linear(to-r, #28796f, #162f2a)", transform: "scale(1.05)" }}
            transition="all 0.3s"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </VStack>
      </Center>
    );
  }

  return (
    <>
    <HeroSection sliderImages={sliderImages} news={news} />
    <Box maxW="1440px" mx="auto" py={12} px={{ base: 4, md: 8 }} minH="100vh">

      <VStack spacing={10} align="stretch">
        <Heading
          fontSize={{ base: "2xl", md: "4xl" }}
          textAlign="center"
          fontWeight="extrabold"
          bgGradient="linear(to-r, #309689, #309689)"
          bgClip="text"
        >
          GAMCA Issues & Their Solutions
        </Heading>

        {issues.length === 0 ? (
          <Center py={20}>
            <Text fontSize="lg" color="gray.500">No issues found.</Text>
          </Center>
        ) : (
          <Accordion allowToggle defaultIndex={[0]}>
            {issues.map((issue, index) => (
              <AccordionItem
                key={issue._id}
                bg={cardBg}
                boxShadow="sm"
                rounded="xl"
                mb={4}
                border="1px solid"
                borderColor="gray.200"
                transition="all 0.3s"
                _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
              >
                <h2>
                  <AccordionButton px={6} py={4}>
                    <Flex flex="1" textAlign="left" align="center" gap={3}>
                      <Icon as={MdReportProblem} boxSize={5} color={issueIconColor} />
                      <Text fontSize="md" fontWeight="semibold" color="#1A3C34">
                        {index + 1}. {issue.issue}
                      </Text>
                    </Flex>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={6} pt={2} px={6}>
                  <Flex align="center" gap={2} mb={2}>
                    <Icon as={MdCheckCircle} color={solutionIconColor} boxSize={5} />
                    <Tag variant="subtle" colorScheme="green">
                      <TagLabel>Suggested Solution</TagLabel>
                    </Tag>
                  </Flex>
                  <Text fontSize="sm" color="gray.700" lineHeight="1.75">
                    {issue.solution}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </VStack>
    </Box>
    </>
  );
}
