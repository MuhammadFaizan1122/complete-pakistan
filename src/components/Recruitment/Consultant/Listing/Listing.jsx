"use client";
import { Box, Card, CardBody, Stack, Heading, Text, Button, Flex, Icon, SimpleGrid, Center, Spinner } from "@chakra-ui/react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useEffect, useState } from "react";
import { HeroSection } from "../../../../components/Gamca/MedicalCenters/HeroSection";

export default function ConsultantCard() {
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 16;
    const totalCards = Array.from({ length: 9 }, (_, i) => i);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = totalCards.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(totalCards.length / cardsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sliderImages, setSliderImages] = useState([]);
    const [news, setNews] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch(`/api/slider?page=HajjAndUmrah`);
            const sliderData = await response.json();
            setSliderImages(sliderData?.data?.sliderImgs || []);
            setNews(sliderData?.data?.news || []);
            setLoading(false);
        };
        fetchData();
    }, []);
    if (loading) {
        return (
            <Center minH="100vh" bg="gray.50">
                <Spinner size="xl" color="#0a7450" thickness="4px" />
            </Center>
        );
    }
    return (
        <>
            <HeroSection sliderImages={sliderImages} news={news} />
            <Box maxW="1440px" mx="auto" p={4}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} justifyContent="center">
                    {currentCards.map((item, index) => (
                        <Card
                            key={index}
                            borderRadius="lg"
                            overflow="hidden"
                            boxShadow="lg"
                            className="bg-white"
                        >
                            <CardBody>
                                <Box bg="green.500" p={4} color="white" textAlign="center">
                                    <Heading size="md">Global Education Consultants</Heading>
                                    <Text fontSize="sm" mt={1}>Since 2018</Text>
                                    <Text fontSize="xl" mt={2}>★ 4.6</Text>
                                </Box>
                                <Stack mt={4} spacing={3}>
                                    <Flex alignItems="center">
                                        <Icon as={MdLocationOn} color="gray.500" mr={2} />
                                        <Text fontSize="sm">Karachi, Sindh</Text>
                                    </Flex>
                                    <Text fontSize="sm" color="gray.600">6 years</Text>
                                    <Flex alignItems="center">
                                        <Icon as={MdLocationOn} color="gray.500" mr={2} />
                                        <Text fontSize="sm">MBA, International Business</Text>
                                    </Flex>
                                    <Flex wrap="wrap" gap={2}>
                                        <Button size="sm" colorScheme="gray">MBA Programs</Button>
                                        <Button size="sm" colorScheme="gray">Engineering</Button>
                                        <Button size="sm" colorScheme="gray">Medical Studies</Button>
                                    </Flex>
                                    <Flex gap={2} mt={4}>
                                        <Button size={'sm'} leftIcon={<FaPhone />} colorScheme="green" variant="outline">
                                            Call
                                        </Button>
                                        <Button size={'sm'} leftIcon={<FaWhatsapp />} colorScheme="green" variant="outline">
                                            WhatsApp
                                        </Button>
                                        <Button size={'sm'} colorScheme="green">View Details</Button>
                                    </Flex>
                                </Stack>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
                <Flex justifyContent="center" mt={4}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            colorScheme={currentPage === page ? "green" : "gray"}
                            variant={currentPage === page ? "solid" : "outline"}
                            mx={1}
                        >
                            {page}
                        </Button>
                    ))}
                </Flex>
            </Box>
        </>
    );
}