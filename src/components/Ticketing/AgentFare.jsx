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
    Spinner,
    Badge,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { FaPlaneDeparture, FaClock, FaSuitcase, FaArrowRight } from "react-icons/fa";
import { handleGetFlightById } from "../../handlers/Flights/Flights";
import { useEffect, useState } from "react";

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
    const { id } = useParams();
    const [flight, setFlight] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleFetch = async () => {
        try {
            const res = await handleGetFlightById(id);
            console.log('res', res)
            if (res?.status === 200) {
                setFlight(res.data.data);
            }
        } catch (error) {
            console.error("Fetch flight error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) handleFetch();
    }, [id]);
    if (loading) {
        return (
            <Flex justify="center" align="center" minH="60vh">
                <Spinner size="xl" />
            </Flex>
        );
    }
    return (

        <Box maxW="1440px" mx="auto" p={4} minH={'50vh'}>
            {!flight.length ?
                <Text textAlign={'center'} my={10}>
                    No Flights Available
                </Text>
                : flight.map((f, index) => (
                    <Box
                        key={index}
                        borderWidth="1px"
                        borderRadius="2xl"
                        p={0}
                        mb={6}
                        bg="white"
                        shadow="lg"
                        overflow="hidden"
                        transition="all 0.3s ease"
                        _hover={{ shadow: "xl", transform: "translateY(-4px)" }}
                    >
                        {/* Header Section */}
                        <Box
                            bgGradient="linear(to-r, teal.600, green.500)"
                            color="white"
                            px={5}
                            py={3}
                        >
                            <Flex justify="space-between" align="center">
                                <Flex align="center" gap={2} fontWeight="bold" fontSize="lg">
                                    <FaPlaneDeparture /> {f.airline} - {f.flightNo}
                                </Flex>
                                <Badge
                                    colorScheme="yellow"
                                    fontSize="lg"
                                    px={3}
                                    py={1}
                                    borderRadius="md"
                                >
                                    {f.price} PKR
                                </Badge>
                            </Flex>
                            <Text fontSize="sm" opacity={0.9}>
                                Date: {new Date(f.date).toDateString()} | by {f.agent}
                            </Text>
                        </Box>

                        {/* Body Section */}
                        <Box px={5} py={4}>
                            {f.routes.map((route, idx) => (
                                <Box key={route._id || idx}>
                                    <Flex
                                        justify="space-between"
                                        align="center"
                                        direction={{ base: "column", md: "row" }}
                                        gap={{ base: 4, md: 8 }}
                                    >
                                        {/* Departure */}
                                        <Box flex="1" textAlign="center">
                                            <Text fontWeight="bold" fontSize="xl" color="teal.700">
                                                {route.departureTime}
                                            </Text>
                                            <Text fontSize="sm" color="gray.600">
                                                {route.departureAirport}
                                            </Text>
                                            <Text fontSize="xs" color="gray.500">
                                                {route.fromCity}
                                            </Text>
                                        </Box>

                                        {/* Route Info (center only for first leg) */}
                                        {idx === 0 && (
                                            <Box flex="1" textAlign="center">
                                                <Flex
                                                    direction="column"
                                                    justify="center"
                                                    alignItems="center"
                                                >
                                                    <Flex align="center" gap={2} fontWeight="semibold" mb={2}>
                                                        {route.fromCity} <FaArrowRight /> {route.toCity}
                                                    </Flex>
                                                    <Flex
                                                        align="center"
                                                        justify="center"
                                                        color="gray.600"
                                                        mb={1}
                                                        fontSize="sm"
                                                    >
                                                        <FaClock /> <Text ml={1}>{f.duration}</Text>
                                                    </Flex>
                                                    <Text fontSize="sm" color="gray.600">
                                                        {f.type}
                                                    </Text>
                                                </Flex>
                                            </Box>
                                        )}

                                        {/* Arrival */}
                                        <Box flex="1" textAlign="center">
                                            <Text fontWeight="bold" fontSize="xl" color="teal.700">
                                                {route.arrivalTime}
                                            </Text>
                                            <Text fontSize="sm" color="gray.600">
                                                {route.arrivalAirport}
                                            </Text>
                                            <Text fontSize="xs" color="gray.500">
                                                {route.toCity}
                                            </Text>
                                        </Box>
                                    </Flex>

                                    {/* Divider between multi-routes */}
                                    {idx < f.routes.length - 1 && (
                                        <Divider my={6} borderColor="gray.300" />
                                    )}
                                </Box>
                            ))}
                        </Box>

                        {/* Footer Section */}
                        <Box
                            px={5}
                            py={3}
                            borderTop="1px solid"
                            borderColor="gray.100"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Flex align="center" gap={2} color="gray.600">
                                <FaSuitcase /> <Text fontSize="sm">{f.baggage}</Text>
                            </Flex>
                            <Button
                                bg="teal.600"
                                color="white"
                                size="md"
                                px={6}
                                _hover={{ bg: "teal.700" }}
                                borderRadius="md"
                                onClick={() => {
                                    if (f.companyId?.whatsappBusiness) {
                                        window.open(`https://wa.me/${f.companyId.whatsappBusiness}`, "_blank");
                                    }
                                }}
                            >
                                Contact Agent
                            </Button>


                        </Box>
                    </Box>
                ))}
        </Box>
    );
}
