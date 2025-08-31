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
    Spinner,
} from "@chakra-ui/react";
import {
    FaStar,
    FaMapMarkerAlt,
    FaClock,
    FaPhone,
    FaEnvelope,
    FaGlobe,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HeroSection } from "../Gamca/MedicalCenters/HeroSection";

const itemsPerPage = 6;

export default function Ticketing() {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();
    const [sliderImages, setSliderImages] = useState([]);
    const [news, setNews] = useState([]);

    // 🔹 Fetch agents from API
    useEffect(() => {
        const fetchAgents = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/slider?page=Ticketing`);
                const sliderData = await response.json();
                setSliderImages(sliderData?.data?.sliderImgs || []);
                setNews(sliderData?.data?.news || []);
                const res = await fetch(
                    `/api/ticketing-agent?page=${currentPage}&limit=${itemsPerPage}`
                );
                const data = await res.json();

                if (data.success) {
                    setAgents(data.data);
                    setTotalPages(data.pagination.totalPages);
                }
            } catch (err) {
                console.error("Error fetching agents:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAgents();
    }, [currentPage]);

    if (loading) {
        return (
            <Flex justify="center" align="center" minH="100vh">
                <Spinner size="xl" color="#0a7450" />
            </Flex>
        );
    }

    return (
        <>
            <HeroSection sliderImages={sliderImages} news={news} />
            <Box bg="gray.50" minH="100vh">
                <Box p={4} maxW="1440px" mx="auto" position={'relative'}>
                    <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={2}>
                        Verified Ticketing Agents
                    </Text>

                    <Button
                        position="absolute"
                        right={0}
                        top={4}
                        fontSize={{ base: "sm", md: "md" }}
                        fontWeight="bold"
                        px={{ base: 6, md: 10 }}
                        py={{ base: 3, md: 4 }}
                        borderRadius="full"
                        bg="#0a7450"
                        color="white"
                        _hover={{ bg: "#065f46" }}
                        _active={{ bg: "#054d3a" }}
                        onClick={() => router.push("/ticketing/agent/registration")}
                    >
                        Become Travel Agents
                    </Button>

                    <Text textAlign="center" color="gray.600" mb={8} mt={6}>
                        Choose from our network of trusted agents offering competitive
                        prices and excellent service
                    </Text>

                    <Grid
                        templateColumns={{
                            base: "1fr",
                            md: "1fr 1fr",
                            lg: "1fr 1fr 1fr",
                        }}
                        gap={6}
                    >
                        {agents.map((agent, index) => (
                            <GridItem
                                key={index}
                                borderWidth="1px"
                                borderRadius="lg"
                                p={5}
                                bg="white"
                                shadow="sm"
                            >
                                {/* 🔹 Agent Header */}
                                <Flex align="" mb={3} gap={3}>
                                    <Avatar
                                        name={agent.businessName}
                                        src={agent.corporateLogo || ""}
                                        size="lg"
                                        rounded={"lg"}
                                    />
                                    <Box>
                                        <Text fontWeight="bold" fontSize="lg">{agent.businessName}</Text>
                                        <Text fontSize="md" color="gray.600">
                                            {agent.proprietorName}
                                        </Text>
                                        <Flex align="center" gap={1} mb={2}>
                                            <FaStar color="gold" />
                                            <Text fontWeight="bold">{agent.rating || "N/A"}</Text>
                                        </Flex>
                                    </Box>
                                </Flex>

                                {/* 🔹 Address / Timings */}
                                <Flex
                                    align="center"
                                    gap={2}
                                    mb={2}
                                    fontSize="sm"
                                    color="gray.600"
                                >
                                    <FaMapMarkerAlt />   <Text noOfLines={2} wordBreak="break-word">
                                        {agent.officeAddress}
                                    </Text>
                                </Flex>
                                <Flex
                                    align="center"
                                    gap={2}
                                    mb={2}
                                    fontSize="md"
                                    color="gray.600"
                                >
                                    <FaClock /> {agent.officeTimings}
                                </Flex>

                                {/* 🔹 Services */}
                                <Flex gap={2} flexWrap="wrap" mb={2}>
                                    {agent.services?.map((service, i) => (
                                        <Tag key={i} size="md" colorScheme="blue">
                                            {service}
                                        </Tag>
                                    ))}
                                </Flex>

                                {/* 🔹 Airlines */}
                                <Flex gap={2} flexWrap="wrap" mb={4}>
                                    {agent.airlines?.map((airline, i) => (
                                        <Tag
                                            key={i}
                                            size="md"
                                            variant="subtle"
                                            colorScheme="gray"
                                        >
                                            {airline}
                                        </Tag>
                                    ))}
                                </Flex>

                                <Flex justify="space-around" fontSize="lg" color="gray.600">
                                    <Link href={`tel:${agent.primaryMobile}`} target="_blank">
                                        <Icon as={FaPhone} _hover={{ color: "teal.500" }} cursor="pointer" />
                                    </Link>

                                    <Link href={`mailto:${agent.businessEmail}`} target="_blank">
                                        <Icon as={FaEnvelope} _hover={{ color: "teal.500" }} cursor="pointer" />
                                    </Link>

                                    <Link href={agent.websiteUrl} target="_blank">
                                        <Icon as={FaGlobe} _hover={{ color: "teal.500" }} cursor="pointer" />
                                    </Link>
                                </Flex>
                                <Divider my={3} />
                                <Flex gap={2}>
                                    <Button
                                        bg="#0a7450"
                                        color={"white"}
                                        w="full"
                                        mb={3}
                                        onClick={() =>
                                            router.push(`/ticketing/agent-details/${agent._id}`)
                                        }
                                    >
                                        View Details
                                    </Button>
                                    <Button
                                        bg="#0a7450"
                                        color={"white"}
                                        w="full"
                                        mb={3}
                                        onClick={() =>
                                            router.push(`/ticketing/details/${agent._id}`)
                                        }
                                    >
                                        {`View Fares`}
                                    </Button>
                                </Flex>
                            </GridItem>
                        ))}
                    </Grid>

                    {/* 🔹 Pagination */}
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
                                bg={currentPage === i + 1 ? "#0a7450" : "white"}
                                color={currentPage === i + 1 ? "#fff" : "black"}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </Button>
                        ))}
                        <Button
                            size="sm"
                            onClick={() =>
                                setCurrentPage((p) => Math.min(p + 1, totalPages))
                            }
                            isDisabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </>
    );
}
