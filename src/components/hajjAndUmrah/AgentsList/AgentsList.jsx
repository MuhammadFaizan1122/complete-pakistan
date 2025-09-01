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
import { HeroSection } from "../../Gamca/MedicalCenters/HeroSection";

const itemsPerPage = 6;

export default function AgentsList() {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();
    const [sliderImages, setSliderImages] = useState([]);
    const [news, setNews] = useState([]);
    console.log('agents', agents)
    // 🔹 Fetch agents from API
    useEffect(() => {
        const fetchAgents = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/slider?page=HajjAndUmrah`);
                const sliderData = await response.json();
                setSliderImages(sliderData?.data?.sliderImgs || []);
                setNews(sliderData?.data?.news || []);
                const res = await fetch(
                    `/api/travel-agent?page=${currentPage}&limit=${itemsPerPage}`
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
                <Box p={4} maxW="1440px" mx="auto" >
                    <Box my={6} position={'relative'}>
                        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={2}>
                            Verified Hajj and Umrah Agents
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
                            onClick={() => router.push("/hajj-and-umrah/agent/registration")}
                        >
                            Become Hajj and Umrah Agent
                        </Button>

                        <Text textAlign="center" color="gray.600" mb={8} mt={6}>
                            Choose from our network of trusted agents offering competitive
                            prices and excellent service
                        </Text>
                    </Box>

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
                                display="flex"
                                flexDirection="column"
                            >
                                <Flex mb={3} gap={2}>
                                    <Avatar
                                        name={agent.agencyName}
                                        src={agent.logo || ""}
                                        size="xl"
                                        rounded="lg"
                                        border="2px solid gray"
                                    />
                                    <Flex flexDirection={'column'} gap={2}>
                                        <Text fontWeight="bold" fontSize="xl">
                                            {agent.agencyName}
                                        </Text>
                                        <Text fontSize="lg" color="gray.600">
                                            {agent.state} {agent.country}
                                        </Text>
                                        <Flex align="center" gap={1} mb={2}>
                                            <FaStar color="gold" />
                                            <Text fontWeight="bold">{agent.rating || "N/A"}</Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Text my={2} color={'black'} fontWeight={'bold'}>Address</Text>

                                <Flex align="center" gap={2} mb={2} fontSize="md" color="gray.600">
                                    <FaMapMarkerAlt />
                                    <Text noOfLines={2} wordBreak="break-word">
                                        {agent.address}
                                    </Text>
                                </Flex>
                                <Text my={2} color={'black'} fontWeight={'bold'}>Services</Text>
                                <Flex gap={2} flexWrap="wrap" mb={6}>
                                    {agent.services?.map((service, i) => (
                                        <Tag key={i} size="md" colorScheme="blue">
                                            {service}
                                        </Tag>
                                    ))}
                                </Flex>

                                <Flex justify="space-around" fontSize="lg" color="gray.600" mt="auto">
                                    <Link href={`tel:${agent.phone}`} target="_blank">
                                        <Icon as={FaPhone} _hover={{ color: "teal.500" }} cursor="pointer" />
                                    </Link>

                                    <Link href={`mailto:${agent.email}`} target="_blank">
                                        <Icon as={FaEnvelope} _hover={{ color: "teal.500" }} cursor="pointer" />
                                    </Link>

                                    <Link href={agent.website} target="_blank">
                                        <Icon as={FaGlobe} _hover={{ color: "teal.500" }} cursor="pointer" />
                                    </Link>
                                </Flex>

                                <Divider my={3} />

                                <Flex gap={2} mt="auto">
                                    <Button
                                        bg="#0a7450"
                                        color="white"
                                        w="full"
                                        mb={3}
                                        onClick={() =>
                                            router.push(`/hajj-and-umrah/agent-details/${agent._id}`)
                                        }
                                    >
                                        View Details
                                    </Button>
                                </Flex>
                            </GridItem>

                        ))}
                    </Grid>

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
