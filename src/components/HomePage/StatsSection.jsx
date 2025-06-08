'use client'
import { Box, Flex, Text, VStack, Icon, useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";
import {
  FaUsers,
  FaUserFriends,
  FaGlobeAsia,
  FaBriefcase,
  FaBuilding,
  FaShieldAlt,
} from "react-icons/fa";

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
    <Box  bg="white">
      <Flex
        maxW="1440px"
        mx="auto"
        h={'308px'} 
        px={6}
        wrap="wrap"
        justifyContent="center"
        alignItems="center"

        gap={{ base: 6, md: 10 }}
      >
        {statsData.map((item, index) => (
          <VStack key={index} spacing={1} textAlign="center" flex="1 1 140px">
            <Box
              bg="#309689"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              w={'68.24px'}
              h={'68.24px'}
              padding={'9.1px'}
            >
              <Image src={item.icon} alt="icons" width={30} height={30} />
            </Box>
            <Text fontWeight="bold" fontSize="22.75px">{item.title}</Text>
            <Text fontSize="18.2px" color="#1F1F1F">
              {item.subtitle}
            </Text>
          </VStack>
        ))}
      </Flex>
    </Box>
  );
}
