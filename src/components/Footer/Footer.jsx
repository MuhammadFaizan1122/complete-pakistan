"use client";
import React from "react";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Flex,
  Divider,
} from "@chakra-ui/react";
import Image from "next/image";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      bg="gray.50"
      py={{ base: 10, md: 16 }}
      borderTop="1px solid"
      borderColor="gray.200"
    >
      <Container maxW="1440px" px={{ base: 4, md: 6 }}>
        <Grid
          templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }}
          gap={{ base: 8, md: 6 }}
        >
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Image
              width={160}
              height={60}
              src="/Images/logo.png"
              alt="CompletePakistan Logo"
              style={{ marginBottom: "1rem" }}
            />
            <Text fontSize="md" color="gray.600" lineHeight="tall">
              Connecting Pakistani talent with international opportunities. Your trusted partner
              for overseas employment in the Gulf region.
              <br /><br /> Licensed by Ministry of Overseas Pakistani & Human Resource Development.
            </Text>
          </GridItem>

          <GridItem>
            <Heading size="sm" mb={4}>
              Company
            </Heading>
            <Flex direction="column" gap={2} fontSize="md">
              <Link href="/about-us">About Us</Link>
              <Link href="/contact-us">Contact Us</Link>
              {/* <Text cursor="pointer">Our Team</Text>
              <Text cursor="pointer">Partners</Text>
              <Text cursor="pointer">For Candidates</Text>
              <Text cursor="pointer">For Employers</Text> */}
            </Flex>
          </GridItem>

          {/* Services */}
          <GridItem>
            <Heading size="sm" mb={4}>
              Services
            </Heading>
            <Flex direction="column" gap={2} fontSize="md">
              <Link href="/recruitment/oep">Overseas employment promoters</Link>
              {/* <Text cursor="pointer">Interview Scheduling</Text> */}
              {/* <Text cursor="pointer">Document Verification</Text> */}
              <Link href="/recruitment/ttc">Trade Testing</Link>
              <Link href="/recruitment/vtp">Verified trade partners</Link>
              <Link href="/help-center">Help Center</Link>
              <Link href="/naqal-kafala">Naqal Kafala</Link>
            </Flex>
          </GridItem>

          {/* Contact */}
          <GridItem>
            <Heading size="sm" mb={4}>
              Contact Us
            </Heading>
            <Flex align="center" mb={2} fontSize="md">
              <FaMapMarkerAlt style={{ marginRight: "8px" }} />
              Islamabad, Pakistan
            </Flex>
            <Flex align="center" mb={2} fontSize="md">
              <FaPhoneAlt style={{ marginRight: "8px" }} />
              <Link href="tel:+923102632470">+92 310 2632470</Link>
            </Flex>
            <Flex align="center" mb={2} fontSize="md">
              <FaEnvelope style={{ marginRight: "8px" }} />
              <Link href="mailto:info@completepakistan.com.pk">
                info@completepakistan.com.pk
              </Link>
            </Flex>

            <Heading size="sm" mt={4} mb={3}>
              Follow Us
            </Heading>
            <Flex gap={4}>
              <Link href="http://www.facebook.com/CompletePakistanOfficial" isExternal>
                <FaFacebook size={18} />
              </Link>
              <Link href="https://x.com" isExternal>
                <FaTwitter size={18} />
              </Link>
              <Link href="https://instagram.com" isExternal>
                <FaInstagram size={18} />
              </Link>
              <Link href="https://linkedin.com" isExternal>
                <FaLinkedin size={18} />
              </Link>
            </Flex>
          </GridItem>
        </Grid>

        {/* Bottom bar */}
        <Divider my={8} />
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "flex-start" }}
          gap={4}
        >
          <Text fontSize="md" color="gray.600">
            © {new Date().getFullYear()} Complete Pakistan. All rights reserved.
          </Text>
          <Flex gap={6} fontSize="md" color="gray.600">
            <Text cursor="pointer" textDecoration="underline">
              <Link href={'/privacy-policy'}>Privacy Policy</Link>
            </Text>
            <Text cursor="pointer" textDecoration="underline">
              <Link href={'/terms-and-conditions'}>Terms of Service</Link>
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
