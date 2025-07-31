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
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH={{ base: "auto", md: "450px" }}
      py={{ base: 8, md: 12 }}
      boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
    >
      <Container maxW="1440px" px={{ base: 4, md: 0 }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap={{ base: 8, md: 6 }}
          mb={{ base: 8, md: 4 }}
        >
          <Box>
            <Image
              width={150}
              height={50}
              src="/Images/logo.png"
              alt="CompletePakistan Logo"
              style={{ marginBottom: "2rem" }}
            />
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="bold"
              color="black"
            >
              Opportunities for Agents, Trade, <br /> Careers & Consultancies
            </Text>
          </Box>
          <Box>
            <Heading size="md" mb={{ base: 3, md: 2 }} fontSize={{ base: "lg", md: "xl" }}>
              Company
            </Heading>
            <Text as={Link} href={'/about-us'} className="!mb-4" mb={6} cursor="pointer" fontSize={{ base: "sm", md: "md" }}>
              About Us
            </Text>
            <br />
            <Text as={Link} href={'/contact-us'} mb={2} className="!mb-4" cursor="pointer" fontSize={{ base: "sm", md: "md" }}>
              Contact Us
            </Text>
            <Text mb={2} cursor="pointer" fontSize={{ base: "sm", md: "md" }}>
              Our Team
            </Text>
            <Text mb={2} cursor="pointer" fontSize={{ base: "sm", md: "md" }}>
              Partners
            </Text>
            <Text mb={2} cursor="pointer" fontSize={{ base: "sm", md: "md" }}>
              For Candidates
            </Text>
            <Text mb={2} cursor="pointer" fontSize={{ base: "sm", md: "md" }}>
              For Employers
            </Text>
          </Box>
          <Box>
            <Heading size="md" mb={{ base: 3, md: 2 }} fontSize={{ base: "lg", md: "xl" }}>
              Job Categories
            </Heading>
            <Text mb={2} cursor="pointer" fontSize={{ base: "sm", md: "md" }}>
              Telecommunications
            </Text>
            <Text mb={2} cursor="pointer" fontSize={{ base: "sm", md: "md" }}>
              Hotels & Tourism
            </Text>
            <Text mb={2} cursor="pointer" fontSize={{ base: "sm", md: "md" }}>
              Construction
            </Text>
            <Text mb={2} cursor="pointer" fontSize={{ base: "sm", md: "md" }}>
              Education
            </Text>
            <Text mb={2} cursor="pointer" fontSize={{ base: "sm", md: "md" }}>
              Financial Services
            </Text>
          </Box>
          <Box>
            <Heading size="md" mb={{ base: 3, md: 2 }} fontSize={{ base: "lg", md: "xl" }}>
              Newsletter
            </Heading>
            <Text
              fontSize={{ base: "xs", md: "sm" }}
              my={{ base: 3, md: 2 }}
              color="gray.600"
            >
              Eu nunc pretium vitae platea. Non netus <br /> elementum vulputate
            </Text>
            <Input
              placeholder="Email Address"
              bg="white"
              color="black"
              mb={2}
              borderRadius="xl"
              p={{ base: 4, md: 6 }}
              border="1px"
              borderColor="black"
              fontSize={{ base: "sm", md: "md" }}
            />
            <Button
              bg="#0a7450"
              w="full"
              color="white"
              borderRadius="xl"
              py={{ base: 4, md: 6 }}
              fontSize={{ base: "sm", md: "md" }}
              _hover={{ bg: "white", color: "black", border: "1px solid black" }}
            >
              Subscribe Now
            </Button>
          </Box>
        </Flex>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "flex-start" }}
          mt={{ base: 6, md: 10 }}
        >
          <Text
            fontSize={{ base: "sm", md: "md" }}
            textAlign={{ base: "center", md: "left" }}
            mb={{ base: 4, md: 0 }}
          >
            © Copyright Complete Pakistan {new Date().getFullYear()}.
          </Text>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify={{ base: "center", md: "flex-end" }}
            align="center"
            gap={{ base: 2, md: 4 }}
          >
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="black"
              textDecoration="underline"
              cursor="pointer"
            >
              Privacy Policy
            </Text>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="black"
              textDecoration="underline"
              cursor="pointer"
            >
              Terms of Service
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}