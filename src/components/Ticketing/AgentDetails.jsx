'use client'
import React from 'react';
import {
  Box,
  Grid,
  GridItem,
  Text,
  Flex,
  Button,
  Avatar,
  Tag,
  Icon,
  Divider,
  HStack,
  VStack,
  Badge,
  SimpleGrid,
  IconButton
} from "@chakra-ui/react";
import {
  FaStar,
  FaThumbsUp,
  FaComment,
  FaGlobe,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaClock,
  FaUsers,
  FaMapMarkerAlt,
  FaEye
} from "react-icons/fa";

export default function TravelAgentDetail() {
  const agent = {
    name: "Al-Noor Travel Services",
    owner: "Muhammad Ahmed Khan",
    rating: 4.8,
    likes: 156,
    comments: 12,
    established: "Est. 2008",
    services: ["International", "Domestic"],
    description: "Al-Noor Travel Services has been serving customers for over 15 years with reliable and affordable travel solutions. We specialize in international ticketing, Hajj & Umrah packages, and comprehensive travel services.",
    offeredServices: [
      "Visa Processing",
      "Travel Insurance", 
      "Hotel Booking",
      "Airport Transfer"
    ],
    partnerAirlines: ["PIA", "Saudi Airlines", "Emirates", "Qatar Airways", "Turkish Airlines"],
    teamMembers: [
      {
        name: "Muhammad Ahmed Khan",
        role: "Managing Director",
        phone: "+92-300-1234567",
        whatsapp: "+92-300-1234567",
        mobile: "+92-21-34567891"
      },
      {
        name: "Fatima Shah",
        role: "Operations Manager", 
        phone: "+92-300-9876543",
        whatsapp: "+92-300-9876543",
        mobile: "+92-21-34567892"
      },
      {
        name: "Ali Hassan",
        role: "Customer Service Lead",
        phone: "+92-300-5555444",
        whatsapp: "+92-300-5555444", 
        mobile: "+92-21-34567893"
      }
    ],
    contact: {
      mainPhone: "+92-21-34567890",
      whatsapp: "+92-300-1234567",
      landline: "+92-21-34567891",
      email: "info@alnoor-travel.com"
    },
    officeHours: {
      time: "9:00 AM - 8:00 PM",
      days: "Monday - Saturday"
    },
    serviceCounters: "3 available",
    branches: [
      {
        name: "Karachi Main Branch",
        address: "Shop # 45, 2nd Floor, Tariq Road, Karachi",
        phone: "+92-21-34567890",
        whatsapp: "+92-300-1234567",
        visits: "1245 visits"
      },
      {
        name: "Lahore Branch", 
        address: "Liberty Market, Gulberg III, Lahore",
        phone: "+92-42-35987654",
        whatsapp: "+92-300-9876543",
        visits: "890 visits"
      }
    ]
  };
 const fareOffers = [
    {
      route: "Karachi to Riyadh",
      price: "PKR 75,000",
      airline: "via Saudi Airlines",
      validTill: "Valid till 31 Dec 2024"
    },
    {
      route: "Lahore to Jeddah",
      price: "PKR 85,000",
      airline: "via PIA",
      validTill: "Valid till 15 Jan 2025"
    },
    {
      route: "Islamabad to Dubai",
      price: "PKR 65,000",
      airline: "via Emirates",
      validTill: "Valid till 28 Dec 2024"
    }
  ];

  return (
    <Box bg="gray.50" minH="100vh">
      <Box p={4} maxW="1440px" mx="auto">
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
          {/* Left Column - Main Content */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Header Card */}
              <Box bg="white" borderRadius="lg" p={6} shadow="sm">
                <Flex direction={{ base: "column", sm: "row" }} align="start" gap={4} mb={4}>
                  <Avatar name={agent.name} size="lg" rounded={'lg'}/>
                  <Box flex={1}>
                    <Flex direction={{ base: "column", sm: "row" }} justify="space-between" align={{ base: "start", sm: "center" }} gap={2} mb={2}>
                      <Text fontSize="xl" fontWeight="bold">{agent.name}</Text>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FaFacebook />}
                          size="sm"
                          variant="ghost"
                          colorScheme="facebook"
                          aria-label="Facebook"
                        />
                        <IconButton
                          icon={<FaTwitter />}
                          size="sm"
                          variant="ghost"
                          colorScheme="twitter"
                          aria-label="Twitter"
                        />
                        <IconButton
                          icon={<FaInstagram />}
                          size="sm"
                          variant="ghost"
                          colorScheme="pink"
                          aria-label="Instagram"
                        />
                        <IconButton
                          icon={<FaGlobe />}
                          size="sm"
                          variant="ghost"
                          colorScheme="green"
                          aria-label="Website"
                        />
                      </HStack>
                    </Flex>
                    <Text color="gray.600" fontSize="sm" mb={2}>
                      Proprietor: {agent.owner}
                    </Text>
                    <HStack spacing={4} fontSize="sm" flexWrap="wrap">
                      <Flex align="center" gap={1}>
                        <Icon as={FaStar} color="yellow.500" />
                        <Text fontWeight="bold">{agent.rating}</Text>
                      </Flex>
                      <Flex align="center" gap={1}>
                        <Icon as={FaThumbsUp} color="gray.400" />
                        <Text>{agent.likes}</Text>
                      </Flex>
                      <Flex align="center" gap={1}>
                        <Icon as={FaComment} color="gray.400" />
                        <Text>{agent.comments}</Text>
                      </Flex>
                    </HStack>
                  </Box>
                </Flex>
                
                <HStack spacing={2} mb={4} flexWrap="wrap">
                  {agent.services.map((service, index) => (
                    <Tag key={index} size="md" colorScheme="blue">
                      {service}
                    </Tag>
                  ))}
                  <Badge colorScheme="gray" px={3} py={1}>
                    {agent.established}
                  </Badge>
                </HStack>
                
                <Text color="gray.700" fontSize="sm" lineHeight="tall">
                  {agent.description}
                </Text>
              </Box>

              {/* Services Offered */}
              <Box bg="white" borderRadius="lg" p={6} shadow="sm">
                <Flex align="center" gap={2} mb={4}>
                  <Icon as={FaUsers} color="gray.600" />
                  <Text fontSize="lg" fontWeight="semibold">Services Offered</Text>
                </Flex>
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                  {agent.offeredServices.map((service, index) => (
                    <Flex key={index} align="center" gap={2}>
                      <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                      <Text fontSize="sm" color="gray.700">{service}</Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              </Box>

              {/* Partner Airlines */}
              <Box bg="white" borderRadius="lg" p={6} shadow="sm">
                <Flex align="center" gap={2} mb={4}>
                  <Icon as={FaUsers} color="gray.600" />
                  <Text fontSize="lg" fontWeight="semibold">Partner Airlines</Text>
                </Flex>
                <HStack spacing={2} flexWrap="wrap">
                  {agent.partnerAirlines.map((airline, index) => (
                    <Tag key={index} size="md" variant="subtle" colorScheme="gray">
                      {airline}
                    </Tag>
                  ))}
                </HStack>
              </Box>

              {/* Team Members */}
              <Box bg="white" borderRadius="lg" p={6} shadow="sm">
                <Flex align="center" gap={2} mb={4}>
                  <Icon as={FaUsers} color="gray.600" />
                  <Text fontSize="lg" fontWeight="semibold">Team Members</Text>
                </Flex>
                <VStack spacing={4} align="stretch">
                  {agent.teamMembers.map((member, index) => (
                    <Box key={index} borderBottom={index < agent.teamMembers.length - 1 ? "1px" : "none"} borderColor="gray.200" pb={index < agent.teamMembers.length - 1 ? 4 : 0}>
                      <Text fontWeight="semibold" color="gray.900" mb={1}>{member.name}</Text>
                      <Text fontSize="sm" color="gray.600" mb={2}>{member.role}</Text>
                      <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={2} fontSize="xs">
                        <Flex align="center" gap={1} color="green.600">
                          <Icon as={FaPhone} w={3} h={3} />
                          <Text>{member.phone}</Text>
                        </Flex>
                        <Flex align="center" gap={1} color="green.600">
                          <Icon as={FaWhatsapp} w={3} h={3} />
                          <Text>{member.whatsapp}</Text>
                        </Flex>
                        <Flex align="center" gap={1} color="gray.600">
                          <Icon as={FaPhone} w={3} h={3} />
                          <Text>{member.mobile}</Text>
                        </Flex>
                      </SimpleGrid>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </GridItem>

          {/* Right Column - Contact & Office Info */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Contact Information */}
              <Box bg="white" borderRadius="lg" p={6} shadow="sm">
                <Flex justify="space-between" align="center" mb={4}>
                  <Text fontSize="lg" fontWeight="semibold">Contact Information</Text>
                  <HStack spacing={1}>
                    <Button size="sm" variant="outline" colorScheme="gray">
                      Location
                    </Button>
                  </HStack>
                </Flex>
                
                <VStack spacing={3} align="stretch">
                  <Flex align="center" gap={3}>
                    <Icon as={FaPhone} color="green.600" />
                    <Box>
                      <Text fontWeight="semibold" fontSize="sm">{agent.contact.mainPhone}</Text>
                      <Text fontSize="xs" color="gray.500">Main number</Text>
                    </Box>
                  </Flex>
                  
                  <Flex align="center" gap={3}>
                    <Icon as={FaWhatsapp} color="green.600" />
                    <Box>
                      <Text fontWeight="semibold" fontSize="sm">{agent.contact.whatsapp}</Text>
                      <Text fontSize="xs" color="gray.500">WhatsApp</Text>
                    </Box>
                  </Flex>
                  
                  <Flex align="center" gap={3}>
                    <Icon as={FaPhone} color="green.600" />
                    <Box>
                      <Text fontWeight="semibold" fontSize="sm">{agent.contact.landline}</Text>
                      <Text fontSize="xs" color="gray.500">Landline</Text>
                    </Box>
                  </Flex>
                  
                  <Flex align="center" gap={3}>
                    <Icon as={FaEnvelope} color="red.600" />
                    <Box>
                      <Text fontWeight="semibold" fontSize="sm">{agent.contact.email}</Text>
                      <Text fontSize="xs" color="gray.500">Email inquiries</Text>
                    </Box>
                  </Flex>
                </VStack>
                
                <VStack spacing={2} mt={6}>
                  <Button w="full" bg="green.600" color="white" leftIcon={<FaPhone />} _hover={{ bg: "blue.700" }}>
                    Call Now
                  </Button>
                  <Button w="full" bg="gray.100" border={'1px solid gray'} color="gray.700" fontWeight={'semibold'} leftIcon={<FaWhatsapp />} _hover={{ bg: "green.700" }}>
                    WhatsApp
                  </Button>
                  <Button w="full" bg="gray.100" border={'1px solid gray'} color="gray.700" fontWeight={'semibold'} leftIcon={<FaEnvelope />} _hover={{ bg: "gray.700" }}>
                    Send Email
                  </Button>
                </VStack>
              </Box>

              {/* Office Details */}
              <Box bg="white" borderRadius="lg" p={6} shadow="sm">
                <Text fontSize="lg" fontWeight="semibold" mb={4}>Office Details</Text>
                
                <Box mb={4}>
                  <Text fontWeight="semibold" color="gray.700" mb={2}>Office Hours</Text>
                  <Flex align="center" gap={2}>
                    <Icon as={FaClock} color="yellow.600" />
                    <Box>
                      <Text fontWeight="semibold" fontSize="sm" color="yellow.600">{agent.officeHours.time}</Text>
                      <Text fontSize="xs" color="gray.500">{agent.officeHours.days}</Text>
                    </Box>
                  </Flex>
                </Box>
                
              </Box>

              {/* Branch Information */}
              <Box bg="white" borderRadius="lg" p={6} shadow="sm">
                <Flex align="center" gap={2} mb={4}>
                  <Icon as={FaMapMarkerAlt} color="gray.600" />
                  <Text fontSize="lg" fontWeight="semibold">Branch Information</Text>
                </Flex>
                
                <VStack spacing={4} align="stretch">
                  {agent.branches.map((branch, index) => (
                    <Box key={index} borderBottom={index < agent.branches.length - 1 ? "1px" : "none"} borderColor="gray.200" pb={index < agent.branches.length - 1 ? 4 : 0}>
                      <Flex justify="space-between" align="center" mb={2}>
                        <Text fontWeight="semibold" color="gray.900" fontSize="sm">{branch.name}</Text>
                        <Flex align="center" gap={1} fontSize="xs" color="gray.500">
                          <Icon as={FaEye} w={3} h={3} />
                          <Text>{branch.visits}</Text>
                        </Flex>
                      </Flex>
                      <Text fontSize="xs" color="gray.600" mb={2}>{branch.address}</Text>
                      <VStack spacing={1} align="stretch">
                        <Flex align="center" gap={1} fontSize="xs">
                          <Icon as={FaPhone} w={3} h={3} color="green.600" />
                          <Text color="green.600">{branch.phone}</Text>
                        </Flex>
                        <Flex align="center" gap={1} fontSize="xs">
                          <Icon as={FaWhatsapp} w={3} h={3} color="green.600" />
                          <Text color="green.600">{branch.whatsapp}</Text>
                        </Flex>
                      </VStack>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
        <Box bg="gray.50" py={8}>
      <Box maxW="1440px" mx="auto" px={4}>
        {/* Header */}
        <VStack spacing={2} mb={8}>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            Current Fare Offers
          </Text>
          <Text color="gray.600" textAlign="center">
            Special deals from Al-Noor Travel Services
          </Text>
        </VStack>

        {/* Fare Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {fareOffers.map((offer, index) => (
            <Box
              key={index}
              bg="white"
              borderRadius="lg"
              p={6}
              shadow="sm"
              border="1px"
              borderColor="gray.200"
              textAlign="center"
              _hover={{ shadow: "md", transform: "translateY(-2px)" }}
              transition="all 0.2s"
            >
              <VStack spacing={4}>
                {/* Route */}
                <Text fontSize="lg" fontWeight="semibold" color="green.600">
                  {offer.route}
                </Text>

                {/* Price */}
                <Text fontSize="2xl" fontWeight="bold" color="yellow.500">
                  {offer.price}
                </Text>

                {/* Airline */}
                <Text fontSize="sm" color="gray.600">
                  {offer.airline}
                </Text>

                {/* Valid Till */}
                <Text fontSize="xs" color="gray.500">
                  {offer.validTill}
                </Text>

                {/* Book Now Button */}
                <Button
                  bg="green.600"
                  color="white"
                  w="full"
                  py={3}
                  fontWeight="semibold"
                  _hover={{ bg: "blue.700" }}
                  _active={{ bg: "blue.800" }}
                >
                  Book Now
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
    </Box>
  );
}