"use client";

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
} from "@chakra-ui/react";
import {
    FaStar,
    FaMapMarkerAlt,
    FaClock,
    FaPhone,
    FaEnvelope,
    FaGlobe,
} from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Dummy Agents Data
const agents = [
    {
        name: "Al-Noor Travel Services",
        owner: "Muhammad Ahmed Khan",
        rating: 4.8,
        city: "Karachi, Pakistan",
        timing: "9:00 AM - 8:00 PM",
        counters: "3 Counters",
        services: ["International", "Domestic"],
        airlines: ["PIA", "Saudi Airlines", "Emirates", "+2 more"],
    },
    {
        name: "Skyline Tours & Travels",
        owner: "Fatima Ali Shah",
        rating: 4.6,
        city: "Lahore, Pakistan",
        timing: "8:30 AM - 9:00 PM",
        counters: "5 Counters",
        services: ["International", "Domestic"],
        airlines: ["PIA", "Emirates", "Etihad", "+2 more"],
    },
    {
        name: "Global Air Services",
        owner: "Hassan Raza Malik",
        rating: 4.5,
        city: "Islamabad, Pakistan",
        timing: "9:00 AM - 7:00 PM",
        counters: "2 Counters",
        services: ["International"],
        airlines: ["Emirates", "Qatar Airways", "Turkish Airlines", "+1 more"],
    },
    {
        name: "Premium Travel Hub",
        owner: "Aisha Begum",
        rating: 4.9,
        city: "Rawalpindi, Pakistan",
        timing: "10:00 AM - 6:00 PM",
        counters: "1 Counter",
        services: ["International"],
        airlines: ["Emirates", "Qatar Airways", "Etihad", "+1 more"],
    },
    {
        name: "City Express Travel",
        owner: "Omar Farooq",
        rating: 4.3,
        city: "Faisalabad, Pakistan",
        timing: "8:00 AM - 9:00 PM",
        counters: "4 Counters",
        services: ["Domestic"],
        airlines: ["PIA", "Air Blue", "Serene Air", "+1 more"],
    },
    {
        name: "Royal Wings Travel",
        owner: "Zainab Ahmed",
        rating: 4.7,
        city: "Multan, Pakistan",
        timing: "9:00 AM - 8:00 PM",
        counters: "2 Counters",
        services: ["International", "Domestic"],
        airlines: ["Saudi Airlines", "PIA", "Qatar Airways", "+1 more"],
    },
    // ➕ Add more agents if needed
];

const itemsPerPage = 6;

export default function Ticketing() {
    const [currentPage, setCurrentPage] = useState(1);
const router = useRouter();
    const totalPages = Math.ceil(agents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAgents = agents.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Box bg="gray.50" minH="100vh" >
            <Box p={4} maxW="1440px" mx="auto">
                <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={2}>
                    Verified Travel Agents
                </Text>
                <Text textAlign="center" color="gray.600" mb={8}>
                    Choose from our network of trusted agents offering competitive prices
                    and excellent service
                </Text>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }} gap={6}>
                    {currentAgents.map((agent, index) => (
                        <GridItem
                            key={index}
                            borderWidth="1px"
                            borderRadius="lg"
                            p={5}
                            bg="white"
                            shadow="sm"
                        >
                            <Flex align="center" mb={3} gap={3}>
                                <Avatar name={agent.name} size="lg" rounded={'lg'} />
                                <Box>
                                    <Text fontWeight="bold">{agent.name}</Text>
                                    <Text fontSize="sm" color="gray.600">
                                        {agent.owner}
                                    </Text>
                                    <Flex align="center" gap={1} mb={2}>
                                        <FaStar color="gold" />
                                        <Text fontWeight="bold">{agent.rating}</Text>
                                    </Flex>
                                </Box>
                            </Flex>


                            <Flex align="center" gap={2} mb={2} fontSize="sm" color="gray.600">
                                <FaMapMarkerAlt /> {agent.city}
                            </Flex>
                            <Flex align="center" gap={2} mb={2} fontSize="sm" color="gray.600">
                                <FaClock /> {agent.timing}
                            </Flex>

                            <Text fontSize="sm" fontWeight="medium" mb={2}>
                                {agent.counters}
                            </Text>

                            <Flex gap={2} flexWrap="wrap" mb={2}>
                                {agent.services.map((service, i) => (
                                    <Tag key={i} size="sm" colorScheme="blue">
                                        {service}
                                    </Tag>
                                ))}
                            </Flex>

                            <Flex gap={2} flexWrap="wrap" mb={4}>
                                {agent.airlines.map((airline, i) => (
                                    <Tag key={i} size="sm" variant="subtle" colorScheme="gray">
                                        {airline}
                                    </Tag>
                                ))}
                            </Flex>


                            <Flex justify="space-around" fontSize="lg" color="gray.600">
                                <Icon as={FaPhone} />
                                <Icon as={FaEnvelope} />
                                <Icon as={FaGlobe} />
                            </Flex>
                            <Divider my={3} />
                            <Flex gap={2}>
                                <Button bg="#0a7450" color={'white'} w="full" mb={3} onClick={()=> router.push(`/ticketing/details/${agent.name}`)}>
                                    View Details
                                </Button>
                                <Button bg="#0a7450" color={'white'} w="full" mb={3} onClick={()=> router.push(`/ticketing/details/${agent.name}`)}>
                                    {`View Fares`}
                                </Button>
                            </Flex>
                        </GridItem>
                    ))}
                </Grid>

                {/* Pagination */}
                <Flex justify="center" mt={8} gap={2}>
                    <Button
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        isDisabled={currentPage === 1}
                    >
                        Prev
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                            key={i}
                            size="sm"
                            variant={currentPage === i + 1 ? "solid" : "outline"}
                            bg="#0a7450"
                            color="#fff"
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </Button>
                    ))}
                    <Button
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        isDisabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}
