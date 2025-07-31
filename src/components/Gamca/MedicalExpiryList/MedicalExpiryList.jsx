'use client'
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  Button,
  Badge,
  Spinner,
  Center,
  useToast,
} from "@chakra-ui/react";
import { RiTeamFill } from "react-icons/ri";
import { handleGetCV } from "../../../handlers/CV/create-cv";
import { GamcaTokenDisplay } from "../MedicalCenters/GamceTokenDisplay";


export default function MedicalExpiryList({ expiryDays, title }) {
  const [cvs, setCvs] = useState([]);
  const [filteredCVs, setFilteredCVs] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const calculateTotalExperience = (experienceArray) => {
    let totalYears = 0, totalMonths = 0;
    experienceArray.forEach(exp => {
      const start = new Date(exp.startDate);
      const end = new Date(exp.endDate);
      let years = end.getFullYear() - start.getFullYear();
      const monthDiff = end.getMonth() - start.getMonth();
      const dayDiff = end.getDate() - start.getDate();
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) years--;
      totalYears += years;
      totalMonths += monthDiff;
      if (dayDiff < 0) totalMonths--;
      if (totalMonths < 0) totalMonths += 12;
      totalYears += Math.floor(totalMonths / 12);
      totalMonths = totalMonths % 12;
    });
    return { totalYears, totalMonths };
  };

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        setLoading(true);
        const response = await handleGetCV();
        if (response.status === 200) {
          const now = new Date();
          const startDate = new Date();
          startDate.setDate(now.getDate() - 60); // Medical expiry is 60 days from medicalDate
          const endDate = new Date();
          endDate.setDate(now.getDate() - (60 - expiryDays)); // Adjust for the range

          const startDateOnly = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate()
          );
          const endDateOnly = expiryDays === 0 ? startDateOnly : new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate()
          );

          const filtered = response.data.data.filter((cv) => {
            if (!cv.madicalDate) return false;
            const medicalDate = new Date(cv.madicalDate);
            const medicalDateOnly = new Date(
              medicalDate.getFullYear(),
              medicalDate.getMonth(),
              medicalDate.getDate()
            );
            if (expiryDays === 0) {
              return medicalDateOnly.getTime() === startDateOnly.getTime();
            }
            return (
              medicalDateOnly.getTime() >= startDateOnly.getTime() &&
              medicalDateOnly.getTime() <= endDateOnly.getTime()
            );
          });

          setCvs(response.data.data);
          setFilteredCVs(filtered);
        } else {
          throw new Error(response?.message || "Failed to fetch CVs");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error.message || "Something went wrong while fetching CVs.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCVs();
  }, []);

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="#0a7450" thickness="4px" />
      </Center>
    );
  }

  return (
    <Box py={{ base: 4, md: 8 }} maxW="1400px" mx="auto" minH="100vh">
      <VStack spacing={8} align="stretch">
        <HStack>
          <Heading
            fontSize={{ base: "2xl", md: "3xl" }}
            color="#1A3C34"
            fontWeight="bold"
            // bgGradient="linear(to-r, #0a7450, #1A3C34)"
            bg={'#0a7450'}
            bgClip="text"
            // display="flex"
            // alignItems="center"
          >
            <RiTeamFill className="mr-2" />
            {title}
            <Badge px={2} py={1} ml={2} fontSize="14px" colorScheme="red">
              {filteredCVs.length} CVs
            </Badge>
          </Heading>
        </HStack>
                  <GamcaTokenDisplay />
        
        <Grid
          templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          gap={6}
        >
          {filteredCVs.length === 0 ? (
            <Center py={12}>
              <Text fontSize="lg" color="gray.600" fontWeight="medium">
                No CVs with medical expiring {title.toLowerCase()}
              </Text>
            </Center>
          ) : (
            filteredCVs.map((candidate, index) => {
              const { totalYears } = calculateTotalExperience(candidate.experience || []);
              return (
                <Card
                  key={index}
                  bg="white"
                  borderRadius="20px"
                  overflow="hidden"
                  shadow="lg"
                  _hover={{
                    shadow: "xl",
                    transform: "translateY(-6px)",
                    bgGradient: "linear(to-b, white, #F7FAFC)",
                  }}
                  transition="all 0.3s"
                  border="1px"
                  borderColor="gray.100"
                >
                  <CardBody p={6}>
                    <VStack spacing={3} align="center">
                      <Box position="relative">
                        <Avatar
                          size="xl"
                          name={candidate?.name}
                          src={candidate?.avatar}
                          borderRadius="full"
                        />
                        {candidate?.gulfExp && (
                          <Badge position="absolute" top="0" right="0" colorScheme="green">
                            Gulf Exp
                          </Badge>
                        )}
                      </Box>
                      <VStack spacing={0} textAlign="center">
                        <Text fontWeight="bold" fontSize="lg" color="#1A3C34">
                          {candidate?.name}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          {candidate?.role}
                        </Text>
                      </VStack>
                      <VStack spacing={2} align="start" w="full" fontSize="sm" color="gray.700">
                        <HStack>
                          <Text>📍</Text>
                          <Text>{candidate?.city}</Text>
                        </HStack>
                        <HStack>
                          <Text>⏳</Text>
                          <Text>{totalYears} years</Text>
                        </HStack>
                        <HStack>
                          <Text>🆔</Text>
                          <Text>{candidate?.passport}</Text>
                        </HStack>
                        {candidate?.license && (
                          <HStack>
                            <Text>🚗</Text>
                            <Text>{candidate?.license}</Text>
                          </HStack>
                        )}
                        <HStack>
                          <Text>🌍</Text>
                          <Text>{candidate?.country}</Text>
                        </HStack>
                        <HStack>
                          <Text>📅</Text>
                          <Text>Medical: {new Date(candidate?.madicalDate).toLocaleDateString()}</Text>
                        </HStack>
                      </VStack>
                      <HStack pt={2}>
                        <Button size="sm" variant="outline" colorScheme="green">
                          View
                        </Button>
                        <Button size="sm" variant="outline" colorScheme="green">
                          Recommend
                        </Button>
                        <Button size="sm" colorScheme="yellow">
                          Matches
                        </Button>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              );
            })
          )}
        </Grid>
      </VStack>
    </Box>
  );
}