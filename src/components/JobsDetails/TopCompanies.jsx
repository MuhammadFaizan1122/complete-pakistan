'use client'
import { Box, Text, SimpleGrid, VStack } from "@chakra-ui/react";
import Image from "next/image";

const features = [
  {
    title: "Instagram",
    description:
      "Our team verifies BEOE permissions, contacts agencies, and posts real job data daily.",
    icon: '/Images/Icons/insta.png',
  },
  {
    title: "Tesle",
    description:
      "We display real company names and trades tried to permission numbers for complete transparency",
    icon: '/Images/Icons/tesla.png',
  },
  {
    title: `McDonald's`,
    description:
      "Our system matches CVs from candidates, agents, and TTCs to active job listings in real-time",
    icon: '/Images/Icons/mcdonald.png',
  },
  {
    title: "Apple",
    description:
      "Stay updated with WhatsApp and email alerts for job matches, visa updates, and medical expiries.",
    icon: '/Images/Icons/apple.png',
  },
];

export default function TopCompanies() {
  return (
    <Box px={4} py={16} bg={'#3096891A'}>
      <Box maxW={'1440px'} mx={'auto'}>
        <VStack spacing={3} textAlign="center" mb={12}>
          <Text fontSize={{ base: "2xl", md: "50px" }} fontWeight="bold">
            Top Companies
          </Text>
          <Text maxW="600px" fontSize="16px" color="black">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum
          </Text>
        </VStack>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6} >
          {features.map((feature, idx) => (
            <Box
              key={idx}
              bg={'#fff'}
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
                justifyContent="space-evenly"
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
              <Box bg={'#3096891A'} px={2} py={1} borderRadius="md" mt={4}>
                <Text fontSize="14px" color="gray.500">
                  18 Jobs Posted
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
