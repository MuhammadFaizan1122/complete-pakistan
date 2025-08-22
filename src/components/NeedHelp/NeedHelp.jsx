'use client'
import { Box, Heading, Text, Card, CardBody, SimpleGrid, FormControl, FormLabel, Input, Select, Button, Icon } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const NeedHelp = () => {
  return (
    <Box
      bg="blue.50"
      py={20}
      px={4}
      textAlign="center"
      position="relative"
    >
      <Box mb={6}>
        <Icon as={FaHeart} color="green.500" mb={2} />
        <Heading as="h2" size="lg" color="gray.800" mb={2}>
          Need Help? We're Here for You
        </Heading>
        <Text color="gray.600" maxW="600px" mx="auto">
          If you've been a victim of fraud or need guidance on staying safe, our support team is ready to help you 24/7.
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} maxW="1440px" mx="auto">
        {/* Victim Support Form */}
        <Card variant="outline" p={{ base: 0, md: 6 }} bg="white">
          <CardBody>
            <Text fontWeight="bold" mb={4} fontSize={'xl'}>Get Help - Victim Support Form</Text>
            <FormControl mb={4}>
              <FormLabel>Your Name</FormLabel>
              <Input placeholder="Enter your full name" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Phone Number</FormLabel>
              <Input placeholder="Your contact number" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email Address</FormLabel>
              <Input placeholder="your.email@example.com" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Type of Help Needed</FormLabel>
              <Select placeholder="Select the type of help you need">
                <option value="fraud">Fraud Support</option>
                <option value="guidance">Safety Guidance</option>
                <option value="emergency">Emergency Assistance</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Describe Your Situation</FormLabel>
              <Input placeholder="Please describe what happened, when it occurred, and what kind of help you need. The more details you provide, the better we can assist you." />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>When Did This Happen?</FormLabel>
              <Input placeholder="dd/mm/yyyy" type="date" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Preferred Contact Method</FormLabel>
              <Select placeholder="How should we contact you?">
                <option value="phone">Phone</option>
                <option value="email">Email</option>
              </Select>
            </FormControl>
            <Box bg="yellow.50" p={2} mb={4} borderRadius="md" color="orange.600" fontSize="sm">
              Emergency Situations: If this is an emergency or you're in immediate danger, please contact local authorities first. For ongoing fraud attempts, report to your bank and police immediately.
            </Box>
            <Button colorScheme="green" size="lg" width="full">
              Submit Help Request
            </Button>
          </CardBody>
        </Card>

        {/* Emergency Contact */}
        <Box>
          <Card variant="outline" p={4} mb={4} bg="orange.50">
            <CardBody>
              <Text fontWeight="bold" fontSize={'xl'} mb={2}>Emergency Contact</Text>
              <Text fontSize="2xl" color="orange.500" mb={1}>24/7 Helpline</Text>
              <Text>+92-123-456-7890</Text>
            </CardBody>
          </Card>
          <Card variant="outline" p={4} mb={4} bg="blue.50" >
            <CardBody>
              <Text color="blue.500" mb={1} fontSize={'xl'}>Email</Text>
              <Text>help@fraudwise.com</Text>
            </CardBody>
          </Card>
          <Card variant="outline" p={4} mb={4} bg="green.50">
            <CardBody>
              <Text fontWeight="bold" fontSize={'xl'} mb={2}>Response Time</Text>
              <Text>Within 2 hours</Text>
            </CardBody>
          </Card>
          <Card variant="outline" p={4} bg="gray.50">
            <CardBody>
              <Text fontWeight="bold" fontSize={'xl'} mb={2}>What Happens Next?</Text>
              <Text as="ol" textAlign="left" pl={4}>
                <li>Immediate response: We'll contact you within 2 hours</li>
                <li>Assessment: We'll assess your situation and needs</li>
                <li>Action Plan: We'll provide next steps and resources</li>
              </Text>
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default NeedHelp;