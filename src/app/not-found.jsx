'use client';
import { Box, VStack, Text, Button, Heading, Image, HStack } from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
    return (
        <Box px={{ base: 2, sm: 4, md: 4 }} py={{ base: 8, md: 16 }} minH="70vh" display="flex" alignItems="center">
            <Box maxW="1440px" mx="auto">
                <VStack spacing={{ base: 4, md: 6 }} textAlign="center">

                    <Box
                        w={{ base: "100%", sm: "80%", md: "400px" }}
                        h={{ base: "200px", sm: "250px", md: "300px" }}
                        mx="auto"
                        mb={{ base: 4, md: 6 }}
                    >
                        <Image
                            src="/Images/404.avif"
                            alt="404 Illustration"
                            width={400}
                            height={300}
                            style={{ objectFit: "contain", width: "100%", height: "100%" }}
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 400px"
                        />
                    </Box>
                    <Text
                        maxW={{ base: "90%", md: "600px" }}
                        fontSize={{ base: "sm", sm: "md", md: "16px" }}
                        color="black"
                        px={{ base: 2, md: 0 }}
                    >
                        Oops! It looks like the page you're looking for doesn't exist or has been moved. Let's get you back on track to find your dream job!
                    </Text>

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
                    >
                        Back to Home
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}