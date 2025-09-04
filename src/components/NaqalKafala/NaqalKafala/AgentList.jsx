'use client'
import { Box, Heading, SimpleGrid, Card, CardBody, Text, Button, Flex, Badge, Icon, HStack } from "@chakra-ui/react";
import { TfiBag } from "react-icons/tfi";
import { MdLocationOn } from "react-icons/md";
import { useState } from "react";

const AgentList = ({ agents }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const agentsPerPage = 3;

  // Pagination logic
  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents = agents.slice(indexOfFirstAgent, indexOfLastAgent);
  const totalPages = Math.ceil(agents.length / agentsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box mt={{ base: 6, md: 10 }} maxW="1440px" mx="auto" px={{ base: 2, md: 4 }}>
      <Heading as="h3" size={{ base: "sm", md: "md" }} mb={6} display="flex" alignItems="center">
        <Icon as={TfiBag} color="blue.500" mr={2} boxSize={{ base: 4, md: 5 }} /> Top Rated Agents
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 4, md: 6 }}>
        {currentAgents.length === 0 ? (
          <Text>No agents found</Text>
        ) : (
          currentAgents.map((agent, index) => (
            <Card
              key={agent._id || index}
              borderLeft="4px solid"
              borderColor="blue.400"
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
                gap={2}
              >
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>{agent.agencyName}</Text>
                </Flex>
                <Flex justify="flex-start">
                  <Text
                    color="gray.500"
                    mb={2}
                    display="flex"
                    alignItems="center"
                    mr={2}
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    <Icon as={MdLocationOn} mr={1} boxSize={{ base: 4, md: 5 }} /> {agent.address?.city}, {agent.address?.country}
                  </Text>
                </Flex>
                <Text color="gray.500" mb={2} fontSize={{ base: "sm", md: "md" }}>
                  Premier recruitment services for {agent.services.join(", ")} professionals.
                </Text>
                <HStack spacing={2} mb={4} flexWrap="wrap">
                  {agent.services.map((service, i) => (
                    <Badge key={i} colorScheme="gray" variant="outline" borderRadius="full" px={3} fontSize={{ base: "xs", md: "sm" }}>
                      {service}
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
                  Contact Agent
                </Button>
              </CardBody>
            </Card>
          ))
        )}
      </SimpleGrid>
      <Flex justify="center" mt={{ base: 4, md: 6 }} gap={2} flexWrap="wrap">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page, idx) => (
          <Button
            key={idx}
            onClick={() => handlePageChange(page)}
            colorScheme={currentPage === page ? "blue" : "gray"}
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

export default AgentList;