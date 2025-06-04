import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";

export default function Footer() {
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} h={'450px'}>
      <Container maxW="1440px">
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap={6} mb={4}>
          <Box>
            <Image width={150} height={50} src="/Images/logo.png" alt="CompletePakistan Logo" className="mb-10" />
            <Text className="text-[20px] font-bold text-black">Opportunities for Agents, Trade, <br /> Careers & Consultancies</Text>
          </Box>
          <Box>
            <Heading size="md" mb={2}>Company</Heading>
            <Text mb={'2px'} cursor="pointer">About Us</Text>
            <Text mb={'2px'} cursor="pointer">Our Team</Text>
            <Text mb={'2px'} cursor="pointer">Partners</Text>
            <Text mb={'2px'} cursor="pointer">For Candidates</Text>
            <Text mb={'2px'} cursor="pointer">For Employers</Text>
          </Box>
          <Box>
            <Heading size="md" mb={2}>Job Categories</Heading>
            <Text mb={'2px'} cursor="pointer">Telecomunications</Text>
            <Text mb={'2px'} cursor="pointer">Hotels & Tourism</Text>
            <Text mb={'2px'} cursor="pointer">Construction</Text>
            <Text mb={'2px'} cursor="pointer">Education</Text>
            <Text mb={'2px'} cursor="pointer">Financial Services</Text>
          </Box>
          <Box>
            <Heading size="md" mb={2}>Newsletter</Heading>
            <Text fontSize="14px" className="truncate" my={2}>Eu nunc pretium vitae platea. Non netus <br/> elementum vulputate </Text>
            <Input placeholder="Email Adress" bg="white" color="black" mb={2} borderRadius={'xl'} p={6} border={'1px'} borderColor={'#000'}/>
            <Button bg={'#309689'} w={'full'} color={'#fff'} borderRadius={'xl'} py={6}>Subscribe Now</Button>
          </Box>
        </Flex>
        <Flex justify={'space-between'}>
          <Text mt={10} textAlign="center" className="text-[16px]">&copy; Copyright Complete Pakistan {new Date().getFullYear()}.</Text>
          <Flex justifyContent={'flex-end'} mt={10} textAlign="center">
            <Text className="text-[16px] text-black" textDecoration={'underline'} cursor="pointer" mr={4}>Privacy Policy</Text>
            <Text className="text-[16px] text-black" textDecoration={'underline'} cursor="pointer">Terms of Service</Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
