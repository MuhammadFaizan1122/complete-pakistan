'use client';
import { Box, VStack, Text, Button, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";

export default function UnderDevelopment() {
  return (
    <Box
      px={{ base: 4, md: 8 }}
      py={{ base: 10, md: 20 }}
      minH="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box maxW="960px" mx="auto">
        <VStack spacing={{ base: 6, md: 10 }} textAlign="center">
          
          <Box
            w={{ base: "90%", sm: "70%", md: "500px" }}
            h={{ base: "220px", sm: "280px", md: "340px" }}
            mx="auto"
          >
            <Image
              src="/Images/underdev.png" 
              alt="Under Development"
              width={500}
              height={340}
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
              priority
            />
          </Box>

          {/* Heading */}
          <Heading
            bgGradient="linear(to-r, #0a7450, #287a6f)"
            bgClip="text"
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="extrabold"
          >
            🚧 Page Under Development 🚀
          </Heading>

          {/* Subtext */}
          <Text
            maxW={{ base: "90%", md: "600px" }}
            fontSize={{ base: "md", md: "lg" }}
            color="gray.600"
          >
            We’re working hard to bring you something amazing!  
            This page is currently under development stay tuned for updates.
          </Text>

          {/* Buttons */}
          <VStack spacing={3}>
            <Button
              as={Link}
              href="/"
              bg="#0a7450"
              color="white"
              rounded="xl"
              px={{ base: 6, md: 8 }}
              py={{ base: 3, md: 4 }}
              fontSize={{ base: "sm", md: "md" }}
              _hover={{ bg: "#287a6f" }}
              shadow="md"
            >
              Back to Home
            </Button>
          </VStack>

        </VStack>
      </Box>
    </Box>
  );
}
