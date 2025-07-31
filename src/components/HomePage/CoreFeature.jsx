'use client'
import { Box, Text, SimpleGrid, VStack } from "@chakra-ui/react";
import Image from "next/image";

const features = [
  {
    title: "Daily Updates",
    description:
      "Our team verifies BEOE permissions, contacts agencies, and posts real job data daily.",
    icon: '/Images/Icons/core-feature-1.png',
  },
  {
    title: "Transparency",
    description:
      "We display real company names and trades tried to permission numbers for complete transparency",
    icon: '/Images/Icons/core-feature-2.png',
  },
  {
    title: "Live Matching",
    description:
      "Our system matches CVs from candidates, agents, and TTCs to active job listings in real-time",
    icon: '/Images/Icons/core-feature-3.png',
  },
  {
    title: "Notifications",
    description:
      "Stay updated with WhatsApp and email alerts for job matches, visa updates, and medical expiries.",
    icon: '/Images/Icons/core-feature-4.png',
  },
];

export default function CoreFeatures() {
  return (
    <Box px={{ base: 2, sm: 4, md: 4 }} py={{ base: 8, md: 16 }}>
      <Box maxW="1440px" mx="auto">
        <VStack spacing={{ base: 2, md: 3 }} textAlign="center" mb={{ base: 8, md: 12 }}>
          <Text fontSize={{ base: "2xl", sm: "2xl", md: "50px" }} fontWeight="bold">
            Core Features
          </Text>
          <Text
            maxW={{ base: "90%", md: "600px" }}
            fontSize={{ base: "sm", sm: "md", md: "16px" }}
            color="black"
            px={{ base: 2, md: 0 }}
          >
            Complete Pakistan offers comprehensive solutions for every stakeholder in the overseas employment process
          </Text>
        </VStack>
        <SimpleGrid columns={{ base: 2, sm: 2, md: 4 }} spacing={{ base: 4, sm: 5, md: 6 }} justifyItems="center" >
          {features.map((feature, idx) => (
            <Box
              key={idx}
              bg="#0a745026"
              p={{ base: 4, md: 6 }}
              h={{ base: "250px", sm: "320px", md: "360px" }}
              w={{ base: "100%", sm: "90%", md: "306px" }}
              rounded="xl"
              shadow="md"
              textAlign="center"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Box
                rounded="md"
                mx="auto"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={{ base: 3, md: 4 }}
                w={{ base: "48px", sm: "54px", md: "60px" }}
                h={{ base: "48px", sm: "54px", md: "60px" }}
              >
                <Image
                  src={feature.icon}
                  alt="icon"
                  width={60}
                  height={60}
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 640px) 48px, (max-width: 768px) 54px, 60px"
                />
              </Box>
              <Text
                fontWeight="bold"
                fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                mb={{ base: 1, md: 2 }}
              >
                {feature.title}
              </Text>
              <Text
                fontSize={{ base: "sm", sm: "md", md: "16px" }}
                color="black"
              >
                {feature.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
