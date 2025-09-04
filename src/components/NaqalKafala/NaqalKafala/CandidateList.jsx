'use client'
import { Box, Heading, SimpleGrid, Card, CardBody, Text, Button, Flex, Badge, Icon, HStack } from "@chakra-ui/react";
import { FaRegStar } from "react-icons/fa";
import { MdWork, MdLocationOn } from "react-icons/md";
import { useState } from "react";

const CandidateList = ({ candidates }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 3;

  // Pagination logic
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = candidates.slice(indexOfFirstCandidate, indexOfLastCandidate);
  const totalPages = Math.ceil(candidates.length / candidatesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box mt={{ base: 6, md: 10 }} maxW="1440px" mx="auto" px={{ base: 2, md: 4 }}>
      <Heading as="h3" size={{ base: "sm", md: "md" }} mb={6} display="flex" alignItems="center">
        <Icon as={FaRegStar} color="yellow.400" mr={2} fontSize={{ base: "20px", md: "28px" }} /> Featured Candidates
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 4, md: 6 }}>
        {currentCandidates.length === 0 ? (
          <Text>No candidates found</Text>
        ) : (
          currentCandidates.map((candidate, index) => (
            <Card
              key={candidate._id || index}
              borderLeft="4px solid"
              borderColor="yellow.400"
              borderRadius="md"
              boxShadow="md"
              p={{ base: 3, md: 4 }}
              bg="white"
            >
              <CardBody
                p={0}
                textAlign="left"
                display="flex"
                flexDirection="column"
              >
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>{candidate.name}</Text>
                  <Text px={3} fontSize={{ base: "xs", md: "xs" }} color="gray.500">
                    {candidate.yearsOfExperience} years
                  </Text>
                </Flex>
                <Text
                  color="gray.500"
                  mb={2}
                  display="flex"
                  alignItems="center"
                  fontSize={{ base: "sm", md: "md" }}
                >
                  <Icon as={MdWork} mr={1} boxSize={{ base: 4, md: 5 }} /> {candidate.profession}
                </Text>
                <Text
                  color="gray.500"
                  mb={2}
                  display="flex"
                  alignItems="center"
                  fontSize={{ base: "sm", md: "md" }}
                >
                  <Icon as={MdLocationOn} mr={1} boxSize={{ base: 4, md: 5 }} /> {candidate.city}, {candidate.country}
                </Text>
                <Text color="gray.500" mb={2} fontSize={{ base: "sm", md: "md" }}>
                  Iqama Status: <Badge fontWeight="thin" px="6px" variant="outline" rounded="full">{candidate.iqamaStatus}</Badge>
                </Text>
                <Text color="gray.500" mb={2} fontSize={{ base: "sm", md: "md" }}>
                  Languages: {candidate.experties.join(", ")}
                </Text>
                <Text color="gray.500" mb={4} fontSize={{ base: "sm", md: "md" }}>
                  Status: <Badge variant="solid" px="10px" bg="yellow.400" rounded="full">{candidate.status}</Badge>
                </Text>
                <HStack spacing={2} mb={4} flexWrap="wrap">
                  {candidate.experties.map((skill, i) => (
                    <Badge key={i} colorScheme="gray" variant="outline" borderRadius="full" px={3} fontSize={{ base: "xs", md: "sm" }}>
                      {skill}
                    </Badge>
                  ))}
                </HStack>
                <Button
                  variant="outline"
                  width="full"
                  colorScheme="blue"
                  mt="auto"
                  size={{ base: "sm", md: "md" }}
                >
                  View Profile
                </Button>
              </CardBody>
            </Card>
          ))
        )}
      </SimpleGrid>
      <Flex justify="center" mt={{ base: 4, md: 6 }} gap={2} flexWrap="wrap">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            colorScheme={currentPage === page ? "yellow" : "gray"}
            variant={currentPage === page ? "solid" : "outline"}
            size={{ base: "sm", md: "md" }}
            minW={{ base: "30px", md: "40px" }}
          >
            {page}
          </Button>
        ))}
      </Flex>
    </Box>
  );
};

export default CandidateList;