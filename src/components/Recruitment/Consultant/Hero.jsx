"use client";

import {
  Box,
  Flex,
  Text,
  Button,
  Tag,
  HStack,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

export default function Hero({ consultant }) {
  if (!consultant) return null;

  return (
    <Box className="w-full bg-gradient-to-b">
      {/* Top Banner */}
      <Box className="w-full bg-black text-white text-center py-2 text-sm font-medium">
        🎉 New: Free 30-minute consultation for first-time clients – Limited time offer!
      </Box>

      {/* Hero Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        className="max-w-[1440px] mx-auto px-6 py-10 my-20"
      >
        {/* Left Content */}
        <VStack align="flex-start" spacing={4} className="w-full md:w-2/4">
          <HStack spacing={2} color="gray.600" fontSize="sm">
            <Icon as={FaMapMarkerAlt} />
            <Text>
              {consultant.locationCity}, {consultant.locationCountry}
            </Text>
          </HStack>

          <Text fontSize="3xl" fontWeight="bold">
            {consultant.fullName}
          </Text>
          <Text fontSize="lg" color="gray.600">
            {consultant.title}
          </Text>

          <HStack spacing={2} wrap="wrap">
            {consultant.specializations?.map((spec, index) => (
              <Tag key={index} colorScheme="gray">
                {spec}
              </Tag>
            ))}
          </HStack>

          <HStack spacing={3}>
            <HStack>
              <Icon as={FaStar} color="yellow.400" />
              <Text fontWeight="semibold">{consultant.rating || "0.0"}</Text>
              <Text fontSize="sm" color="gray.500">
                ({consultant.clientsHelped || "0"} reviews)
              </Text>
            </HStack>
            <Text fontWeight="semibold">{consultant.clientsHelped || "0"}+</Text>
            <Text color="gray.700" fontWeight="medium">
              clients helped
            </Text>
          </HStack>

          <HStack spacing={4} mt={4}>
            <Button
              colorScheme="blackAlpha"
              bg="black"
              color="white"
              px={6}
              py={2}
              rounded="md"
              _hover={{ bg: "gray.800" }}
              onClick={() => window.location.href = `tel:${consultant.phone}`}
            >
              Schedule Consultation
            </Button>
            <Button
              variant="outline"
              px={6}
              py={2}
              rounded="md"
              onClick={() => {
                if (consultant.portfolioPdf) {
                  window.open(consultant.portfolioPdf, '_blank');
                } else {
                  alert("Portfolio PDF not available");
                }
              }}
            >
              Download Portfolio
            </Button>
          </HStack>
        </VStack>

        {/* Right Content */}
        <Box
          className="w-full md:w-1/3 mt-8 md:mt-0 flex items-center justify-center bg-gray-100 rounded-2xl relative h-82 shadow-xl"
        >
          <Box className="absolute -top-4 -right-8 bg-white px-6 py-4 rounded-xl shadow-xl text-sm font-medium border-2 border-[gray]">
            <span className="text-[16px] font-bold">
              {consultant.experienceYears || "0"}+ years
            </span>{" "}
            <br />
            <span className="text-gray-500 text-xs">Experience</span>
          </Box>
          <Box className="absolute -bottom-4 -left-16 bg-white px-6 py-4 rounded-xl shadow-xl text-sm font-medium border-2 border-[gray]">
            <span className="text-[16px] font-bold">
              {consultant.successRate || "0"}%
            </span>{" "}
            <br />
            <span className="text-gray-500 text-xs">Success Rate</span>
          </Box>
          <span className="text-gray-400 ">
              <img src={consultant.profilePhoto || '/Images/placeholder.png'} alt="Profile" className="h-full w-full object-cover" />
          </span>
        </Box>
      </Flex>
    </Box>
  );
}