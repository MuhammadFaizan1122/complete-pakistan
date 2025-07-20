'use client';
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  Spinner,
  Center,
  Button,
  SimpleGrid,
  Stack,
  Divider,
  Badge,
  Icon,
  HStack,
  Tooltip
} from "@chakra-ui/react";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { handleFetchMadicals } from "../../../handlers/gamca/gamca-madical";

export default function GamcaMedicalList() {
  const [medicals, setMedicals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await handleFetchMadicals();
      if (data.success === true) {
        setMedicals(data.data);
        setError(null);
      } else {
        setError("Failed to fetch medical records");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Center minH="100vh" bg="gray.50">
        <Spinner size="xl" color="#309689" thickness="4px" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
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
    <Box py={{ base: 4, md: 8 }} maxW="1400px" mx="auto" minH="100vh">
      <VStack spacing={10} align="stretch">
        <Heading
          fontSize={{ base: "2xl", md: "3xl" }}
          color="#1A3C34"
          textAlign="center"
          fontWeight="bold"
          bgGradient="linear(to-r, #309689, #1A3C34)"
          bgClip="text"
        >
          GAMCA Medical Centers
        </Heading>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {medicals.map((medical) => (
            <Card
              key={medical._id}
              bg="white"
              shadow="lg"
              rounded="2xl"
              border="1px solid"
              borderColor="gray.100"
              _hover={{ shadow: "2xl", transform: "translateY(-5px)" }}
              transition="all 0.3s ease"
            >
              <CardBody p={6}>
                <VStack align="start" spacing={3}>
                  <Heading size="md" color="#1A3C34" fontWeight="bold">
                    {medical.name}
                  </Heading>

                  <Badge colorScheme="green" rounded="full" px={2}>
                    {medical.country}
                  </Badge>

                  <Divider borderColor="gray.200" />

                  <Stack spacing={2} fontSize="sm" color="gray.700">
                    <HStack>
                      <Icon as={FiMail} />
                      <Text>{medical.email}</Text>
                    </HStack>

                    <HStack>
                      <Icon as={FiPhone} />
                      <Text>{medical.phone}</Text>
                    </HStack>

                    {medical.whatsapp && (
                      <HStack>
                        <Icon as={FiPhone} />
                        <Text>WhatsApp: {medical.whatsapp}</Text>
                      </HStack>
                    )}

                    <HStack>
                      <Icon as={FiMapPin} />
                      <Text>{medical.city}, {medical.state}</Text>
                    </HStack>

                    <Text color="gray.600">
                      <strong>Address:</strong> {medical.address}
                    </Text>

                    <HStack mt={2}>
                      <Icon as={FiClock} />
                      <Text>
                        Added on:{" "}
                        {new Date(medical.createdAt).toLocaleDateString("en-GB")}
                      </Text>
                    </HStack>
                  </Stack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {medicals.length === 0 && (
          <Center py={12}>
            <Text fontSize="lg" color="gray.600" fontWeight="medium">
              No records found
            </Text>
          </Center>
        )}
      </VStack>
    </Box>
  );
}
