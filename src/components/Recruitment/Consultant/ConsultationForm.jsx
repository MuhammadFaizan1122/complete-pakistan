import React from 'react';
import { VStack, Text, Input, Select, Textarea, Button, Flex } from '@chakra-ui/react';
import { FaCalendarAlt } from 'react-icons/fa'; 

const RequestConsultationForm = () => {
  return (
    <VStack align="flex-start" spacing={6} p={4} bg="gray.50" borderRadius="lg" boxShadow="md">
      <Text fontWeight="bold" fontSize="lg">Request Consultation</Text>
      <Flex w="full" gap={4}>
        <Input placeholder="Enter your full name" variant="outline" flex={1} isRequired />
        <Input placeholder="your.email@example.com" type="email" variant="outline" flex={1} isRequired />
      </Flex>
      <Flex w="full" gap={4}>
        <Input placeholder="+1 (555) 123-4567" type="tel" variant="outline" flex={1} isRequired />
        <Input placeholder="Your current location" variant="outline" flex={1} />
      </Flex>
      <Select placeholder="Select a service" variant="outline" isRequired>
        {/* Options can be added dynamically */}
      </Select>
      <Textarea placeholder="Please describe your requirements, timeline, and any specific questions you have..." variant="outline" isRequired />
      <Input placeholder="dd/mm/yyyy" type="text" variant="outline" rightIcon={<FaCalendarAlt />} />
      <Button bg={'black'} color={'white'} w="full" mt={4}>
        Submit Consultation Request
      </Button>
    </VStack>
  );
};

export default RequestConsultationForm;