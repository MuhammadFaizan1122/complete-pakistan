'use client'
import { Box, Heading, Text, Card, CardBody, SimpleGrid, FormControl, FormLabel, Select, Input, Button, Icon } from "@chakra-ui/react";
import { FaExclamationTriangle } from "react-icons/fa";

const VictomOfFraud = () => {
  return (
    <Box
      py={20}
      px={4}
      textAlign="center"
      position="relative"
    >
      <Box mb={6}>
        <Icon as={FaExclamationTriangle} color="orange.500" mb={2} />
        <Heading as="h2" size="lg" color="gray.800" mb={2}>
          Been a Victim of Fraud?
        </Heading>
        <Text color="gray.600" maxW="600px" mx="auto">
          Report suspicious activities to help protect others from becoming victims. Your report can save someone else from falling into the same trap.
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} maxW="1440px" mx="auto">
        <Card variant="outline" p={{ base: 0, md: 6 }} bg="white" borderColor="orange.100" boxShadow="0 4px 12px rgba(255, 165, 0, 0.4)">
          <CardBody>
            <Text fontWeight="bold" fontSize={'lg'} mb={4}>Report Fraud Now</Text>
            <FormControl mb={4}>
              <FormLabel>Type of Fraud</FormLabel>
              <Select placeholder="Select fraud type">
                <option value="job">Job Scam</option>
                <option value="visa">Visa Fraud</option>
                <option value="payment">Payment Fraud</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Urgency Level</FormLabel>
              <Select placeholder="Select urgency">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Company/Agency Name</FormLabel>
              <Input placeholder="Enter name of fraudulent entity" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Their Contact Information</FormLabel>
              <Input placeholder="Phone, email address" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Detailed Description</FormLabel>
              <Input placeholder="Describe what happened, how they contacted you, what they promised, and how you discovered it was fraud..." />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Amount Lost (if any)</FormLabel>
              <Input placeholder="Amount PKR" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Your Contact (optional)</FormLabel>
              <Input placeholder="For follow-up if needed" />
            </FormControl>
            <Button colorScheme="orange" size="lg" width="full">
              Submit Fraud Report
            </Button>
          </CardBody>
        </Card>

        {/* Community Impact */}
        <Box>
          <Card variant="outline" p={4} mb={4} bg="yellow.50">
            <CardBody>
              <Text fontWeight="bold" mb={2}>Community Impact</Text>
              <Text fontSize="2xl" color="red.500" mb={1}>2,847</Text>
              <Text>Reports Submitted</Text>
            </CardBody>
          </Card>
          <Card variant="outline" p={4} mb={4} bg="green.50">
            <CardBody>
              <Text fontSize="2xl" color="green.500" mb={1}>1,234</Text>
              <Text>People Protected</Text>
            </CardBody>
          </Card>
          <Card variant="outline" p={4} mb={4} bg="blue.50">
            <CardBody>
              <Text fontSize="2xl" color="blue.500" mb={1}>Rs50M+</Text>
              <Text>Fraud Prevented</Text>
            </CardBody>
          </Card>
          <Button colorScheme="blue" mt={4}>
            Real Fraud Stories
          </Button>
          <Text mt={2} color="gray.600" fontSize="sm">
            Learn from others' experiences to protect yourself from similar fraud attempts.
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default VictomOfFraud;