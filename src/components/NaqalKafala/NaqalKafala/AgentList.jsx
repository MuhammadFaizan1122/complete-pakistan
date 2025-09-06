'use client'

import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Text,
  Button,
  Flex,
  Badge,
  Icon,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { TfiBag } from "react-icons/tfi";
import { MdLocationOn } from "react-icons/md";
import { useState } from "react";

const AgentList = ({ agents }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const agentsPerPage = 3;
  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents = agents.slice(indexOfFirstAgent, indexOfLastAgent);
  const totalPages = Math.ceil(agents.length / agentsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (agent) => {
    setSelectedAgent(agent);
    onOpen();
  };

  return (
    <Box mt={{ base: 6, md: 10 }} maxW="1440px" mx="auto" px={{ base: 2, md: 4 }}>
      <Heading as="h3" size={{ base: "sm", md: "md" }} mb={6} display="flex" alignItems="center">
        <Icon as={TfiBag} color="blue.500" mr={2} boxSize={{ base: 4, md: 5 }} /> Top Rated Agents
      </Heading>

      {/* Agent Cards */}
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
              p={{ base: 3, md: 0 }}
              bg="white"
            >
              <CardBody display="flex" flexDirection="column" justifyContent={'flex-start'} align="flex-start" gap={2}>
                <Flex justify="space-between" align="flex-start" mb={2}>
                  <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
                    {agent.agencyName}
                  </Text>
                </Flex>

                <Text fontSize="md" color="gray.600" textAlign={'left'}>
                  📧 {agent.agencyEmail}
                </Text>
                <Text fontSize="md" color="gray.600" textAlign={'left'}>
                  ☎ {agent.contactPersonPhone}
                </Text>
                <Text fontSize="md" color="gray.600" textAlign={'left'}>
                  Licence: {agent.licenceStatus} (exp:{" "}
                  {new Date(agent.licenceExpiry).toLocaleDateString()})
                </Text>

                <Flex align="center" color="gray.500" fontSize="md">
                  <Icon as={MdLocationOn} mr={1} />
                  {agent.vtpDetails[0]?.address?.city},{" "}
                  {agent.vtpDetails[0]?.address?.country}
                </Flex>

                <HStack spacing={2} mb={3} flexWrap="wrap">
                  {agent?.services?.map((service, i) => (
                    <Badge
                      key={i}
                      colorScheme="gray"
                      variant="outline"
                      borderRadius="full"
                      px={3}
                      fontSize="xs"
                    >
                      {service}
                    </Badge>
                  ))}
                </HStack>

                <Button
                  width="full"
                  colorScheme="blue"
                  mt="auto"
                  size="md"
                  onClick={() => handleViewDetails(agent)}
                >
                  View Details
                </Button>
              </CardBody>
            </Card>
          ))
        )}
      </SimpleGrid>

      {/* Pagination */}
      <Flex justify="center" mt={6} gap={2} flexWrap="wrap">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page, idx) => (
          <Button
            key={idx}
            onClick={() => handlePageChange(page)}
            colorScheme={currentPage === page ? "blue" : "gray"}
            variant={currentPage === page ? "solid" : "outline"}
            size="md"
            minW="35px"
          >
            {page}
          </Button>
        ))}
      </Flex>

      {/* Details Modal */}
      {selectedAgent && (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedAgent.agencyName} - Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                {selectedAgent.agencyCoverPhoto && (
                  <Image
                    src={selectedAgent.agencyCoverPhoto}
                    alt="Cover"
                    borderRadius="md"
                    maxH="200px"
                    objectFit="cover"
                  />
                )}

                <Flex gap={6} flexWrap="wrap">
                  <Box>
                    <Text><b>Agency Email:</b> {selectedAgent.agencyEmail}</Text>
                    <Text><b>Contact Person:</b> {selectedAgent.contactPersonName}</Text>
                    <Text><b>Phone:</b> {selectedAgent.contactPersonPhone}</Text>
                    <Text><b>WhatsApp:</b> {selectedAgent.whatsappNo}</Text>
                    <Text><b>Website:</b> {selectedAgent.websiteUrl}</Text>
                  </Box>

                  <Box>
                    <Text><b>Licence No:</b> {selectedAgent.licenceNo}</Text>
                    <Text><b>Licence Status:</b> {selectedAgent.licenceStatus}</Text>
                    <Text><b>Licence Expiry:</b>{" "}
                      {new Date(selectedAgent.licenceExpiry).toLocaleDateString()}
                    </Text>
                    <Text><b>Proprietor:</b> {selectedAgent.proprietorName}</Text>
                  </Box>
                </Flex>

                <Box>
                  <Heading size="sm" mb={2}>Address</Heading>
                  <Text>{selectedAgent.vtpDetails[0]?.address?.fullAddress}</Text>
                </Box>

                <Box>
                  <Heading size="sm" mb={2}>Supporting Documents</Heading>
                  <Image
                    src={selectedAgent.supportingDocument}
                    alt="Document"
                    maxH="150px"
                    borderRadius="md"
                  />
                </Box>

                <Box>
                  <Heading size="sm" mb={2}>Social Media</Heading>
                  <Text>Facebook: {selectedAgent.vtpDetails[0]?.socialMedia?.facebook}</Text>
                </Box>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default AgentList;
