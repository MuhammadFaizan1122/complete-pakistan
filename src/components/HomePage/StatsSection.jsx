'use client'
import { Box, Flex, Text, VStack, Icon, useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";

const statsData = [
  {
    icon: '/Images/Icons/community.png',
    title: "Visitors",
    subtitle: "152,430+ visited",
  },
  {
    icon: '/Images/Icons/user-outline.png',
    title: "Active Users",
    subtitle: "8,920+ active users.",
  },
  {
    icon: '/Images/Icons/global.png',
    title: "Active Agents",
    subtitle: "Pakistan and more.",
  },
  {
    icon: '/Images/Icons/bag.png',
    title: "Job Posted",
    subtitle: "5,000+ Verified Jobs.",
  },
  {
    icon: '/Images/Icons/building.png',
    title: "Recruiting Agencies",
    subtitle: "120+ Trusted Agencies.",
  },
  {
    icon: '/Images/Icons/shield.png',
    title: "Fraud Alerts",
    subtitle: "Read real fraud stories. Stay Safe.",
  },
];

export function StatsSection() {
  const iconSize = useBreakpointValue({ base: "40px", md: "50px" });

  return (
    <Box bg="white">
      <Flex
        maxW="1440px"
        mx="auto"
        h={{ base: 'auto', md: '308px' }}
        px={{ base: 4, md: 6 }}
        my={{ base: 10, md: 0 }}
        wrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap={{ base: 6, md: 10 }}
      >
        {statsData.map((item, index) => (
          <VStack
            key={index}
            spacing={1}
            textAlign="center"
            flex={{ base: '1 1 120px', sm: '1 1 130px', md: '1 1 140px' }}
            minW={{ base: '100px', md: '140px' }}
          >
            <Box
              bg="#0a7450"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              w={{ base: '50px', sm: '60px', md: '68.24px' }}
              h={{ base: '50px', sm: '60px', md: '68.24px' }}
              padding={{ base: '6px', sm: '8px', md: '9.1px' }}
            >
              <Image
                src={item.icon}
                alt="icons"
                width={30}
                height={30}
              />
            </Box>
            <Text
              fontWeight="bold"
              fontSize={{ base: '16px', sm: '18px', md: '22.75px' }}
            >
              {item.title}
            </Text>
            <Text
              fontSize={{ base: '14px', sm: '16px', md: '18.2px' }}
              color="#1F1F1F"
            >
              {item.subtitle}
            </Text>
          </VStack>
        ))}
      </Flex>
    </Box>
  );
}
