"use client";

import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Flex,
  Button,
  Divider,
} from "@chakra-ui/react";
import { FaPlaneDeparture, FaClock, FaSuitcase } from "react-icons/fa";

// Example Data
const flightData = [
  {
    route: "Karachi to Riyadh",
    price: "75,000 PKR",
    flights: [
      {
        airline: "Saudi Airlines",
        flightNo: "SV 714",
        departureTime: "2:30 AM",
        departureAirport: "Karachi (KHI)",
        arrivalTime: "5:45 AM",
        arrivalAirport: "Riyadh (RUH)",
        date: "12 Aug 2025",
        duration: "3h 15m",
        type: "Via Flight",
        price: "75,000 PKR",
        agent: "Al-Noor Travel Services",
        baggage: "30kg",
      },
      {
        airline: "PIA",
        flightNo: "PK 741",
        departureTime: "11:30 PM",
        departureAirport: "Karachi (KHI)",
        arrivalTime: "2:45 AM",
        arrivalAirport: "Riyadh (RUH)",
        date: "11 Aug 2025",
        duration: "3h 15m",
        type: "Direct Flight",
        price: "72,000 PKR",
        agent: "Skyline Tours",
        baggage: "25kg",
      },
    ],
  },
  {
    route: "Lahore to Jeddah",
    price: "95,000 PKR",
    flights: [
      {
        airline: "Emirates",
        flightNo: "EK 713",
        departureTime: "4:00 PM",
        departureAirport: "Lahore (LHE)",
        arrivalTime: "7:00 PM",
        arrivalAirport: "Jeddah (JED)",
        date: "13 Aug 2025",
        duration: "4h 00m",
        type: "Direct Flight",
        price: "95,000 PKR",
        agent: "Premium Travel Hub",
        baggage: "30kg",
      },
    ],
  },
  {
    route: "Islamabad to Dubai",
    price: "45,000 PKR",
    flights: [
      {
        airline: "AirBlue",
        flightNo: "PA 210",
        departureTime: "9:00 AM",
        departureAirport: "Islamabad (ISB)",
        arrivalTime: "11:30 AM",
        arrivalAirport: "Dubai (DXB)",
        date: "14 Aug 2025",
        duration: "2h 30m",
        type: "Direct Flight",
        price: "45,000 PKR",
        agent: "City Express Travel",
        baggage: "20kg",
      },
    ],
  },
];

export default function AgentFare() {
  return (
    <Box maxW="1440px" mx="auto" p={4}>
      {/* Tabs */}
      <Tabs variant="unstyled">
        <Box overflowX="auto" borderBottom="1px solid #e2e8f0" mb={4}>
          <TabList minW="max-content" display="flex">
            {flightData.map((route, i) => (
              <Tab
                key={i}
                px={4}
                py={2}
                mr={2}
                borderRadius="md"
                fontWeight="semibold"
                _selected={{ bg: "#0a7450", color: "white" }}
                _hover={{ bg: "#f0fdf4" }}
              >
                ✈ {route.route}
                <Text ml={2} fontSize="sm" fontWeight="bold" color="inherit">
                  {route.price}
                </Text>
              </Tab>
            ))}
          </TabList>
        </Box>

        <TabPanels>
          {flightData.map((route, i) => (
            <TabPanel key={i}>
              <Box textAlign="center" my={6}>
                <Text fontSize="2xl" fontWeight="bold">
                  {route.route} Flight Schedule
                </Text>
                <Text color="gray.600">
                  Choose from available flights and contact agents directly
                </Text>
              </Box>

              {route.flights.map((f, idx) => (
                <Box
                  key={idx}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={5}
                  mb={5}
                  bg="white"
                  shadow="md"
                >
                  <Flex justify="space-between" align="center" flexWrap="wrap">
                    {/* Airline Info */}
                    <Flex direction="column" flex="1">
                      <Flex align="center" gap={2} fontWeight="bold" mb={1}>
                        <FaPlaneDeparture /> {f.airline} - {f.flightNo}
                      </Flex>
                      <Text fontSize="sm" color="gray.600">
                        Date {f.date}
                      </Text>
                    </Flex>

                    {/* Flight Timeline */}
                    <Flex
                      justify="center"
                      flex="1.5"
                      textAlign="center"
                      align="center"
                      gap={8}
                    >
                      <Box>
                        <Text fontWeight="bold" fontSize="lg">
                          {f.departureTime}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          {f.departureAirport}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          Departure
                        </Text>
                      </Box>

                      <Box>
                        <Flex
                          align="center"
                          justify="center"
                          color="gray.600"
                          mb={1}
                        >
                          <FaClock /> <Text ml={1}>{f.duration}</Text>
                        </Flex>
                        <Text fontSize="sm" color="gray.600">
                          {f.type}
                        </Text>
                      </Box>

                      <Box>
                        <Text fontWeight="bold" fontSize="lg">
                          {f.arrivalTime}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          {f.arrivalAirport}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          Arrival
                        </Text>
                      </Box>
                    </Flex>

                    {/* Price + Agent */}
                    <Flex
                      direction="column"
                      flex="1"
                      textAlign="right"
                      align="flex-end"
                    >
                      <Text fontSize="xl" fontWeight="bold" color="#0a7450">
                        {f.price}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        by {f.agent}
                      </Text>
                      <Flex
                        align="center"
                        gap={1}
                        justify="flex-end"
                        color="gray.600"
                        mt={2}
                      >
                        <FaSuitcase /> <Text fontSize="sm">{f.baggage}</Text>
                      </Flex>
                      <Button
                        mt={2}
                        bg="#0a7450"
                        color="white"
                        size="sm"
                        _hover={{ bg: "#065f46" }}
                      >
                        Contact Agent
                      </Button>
                    </Flex>
                  </Flex>

                  <Divider mt={4} />
                </Box>
              ))}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}
