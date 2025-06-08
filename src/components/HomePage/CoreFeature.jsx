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
    <Box px={4} py={16} >
      <Box maxW={'1440px'} mx={'auto'}>
        <VStack spacing={3} textAlign="center" mb={12}>
          <Text fontSize={{ base: "2xl", md: "50px" }} fontWeight="bold">
            Core features
          </Text>
          <Text maxW="600px" fontSize="16px" color="black">
            complete Pakistan offers comprehensive solutions for every stakeholders in the overseas employment process
          </Text>
        </VStack>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6} >
          {features.map((feature, idx) => (
            <Box
              key={idx}
              bg={'#30968926'}
              p={6}
              h={'360px'}
              w={'306px'}
              rounded="xl"
              shadow="md"
              textAlign="center"
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'column'}
            >
              <Box
                rounded="md"
                mx="auto"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={4}
              >
                <Image src={feature.icon} alt="icon" width={60} height={60} />
              </Box>
              <Text fontWeight="bold" fontSize="24px" mb={2} >
                {feature.title}
              </Text>
              <Text fontSize="16px" color="black">
                {feature.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
