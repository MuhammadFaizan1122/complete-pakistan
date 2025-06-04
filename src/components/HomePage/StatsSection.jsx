'use client'
import { Box, Flex, Text, VStack, Icon, useBreakpointValue } from "@chakra-ui/react";
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
    icon: FaUsers,
    title: "Visitors",
    subtitle: "152,430+ visited",
  },
  {
    icon: FaUserFriends,
    title: "Active Users",
    subtitle: "8,920+ active users.",
  },
  {
    icon: FaGlobeAsia,
    title: "Active Agents",
    subtitle: "Pakistan and more.",
  },
  {
    icon: FaBriefcase,
    title: "Job Posted",
    subtitle: "5,000+ Verified Jobs.",
  },
  {
    icon: FaBuilding,
    title: "Recruiting Agencies",
    subtitle: "120+ Trusted Agencies.",
  },
  {
    icon: FaShieldAlt,
    title: "Fraud Alerts",
    subtitle: "Read real fraud stories. Stay Safe.",
  },
];

export function StatsSection() {
  const iconSize = useBreakpointValue({ base: "40px", md: "50px" });

  return (
    <Box py={12} bg="white">
      <Flex
        maxW="7xl"
        mx="auto"
        px={6}
        wrap="wrap"
        justify="center"
        gap={{ base: 6, md: 10 }}
      >
        {statsData.map((item, index) => (
          <VStack key={index} spacing={3} textAlign="center" flex="1 1 140px">
            <Box
              bg="teal.600"
              borderRadius="full"
              boxSize={iconSize}
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
            >
              <Icon as={item.icon} boxSize="6" />
            </Box>
            <Text fontWeight="bold" fontSize="md">{item.title}</Text>
            <Text fontSize="sm" color="gray.600">
              {item.subtitle}
            </Text>
          </VStack>
        ))}
      </Flex>
    </Box>
  );
}
