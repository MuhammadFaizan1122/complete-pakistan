"use client";
import { Box, Flex, Text, Image, Button, VStack, HStack, Stack, Badge, Center, Spinner, Avatar, Icon, SimpleGrid, Divider } from "@chakra-ui/react";
import { FaUniversity, FaMapMarkerAlt, FaEnvelope, FaGlobe } from "react-icons/fa";
import { useMediaQuery } from "@chakra-ui/react";
import { HeroSection } from "../../../components/Gamca/MedicalCenters/HeroSection";
import { handleGetOEPs } from "../../../handlers/recruitment/oep";
import { useEffect, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdOutlineDateRange, MdVerified } from "react-icons/md";
import Link from "next/link";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import CompanyCatalogue from "./Catalogue";
import { handleGetAllGulfCompanies } from "../../../handlers/companies/companies";
const ITEMS_PER_PAGE = 9;

export default function GulfCompanies() {
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [sliderImages, setSliderImages] = useState([]);
    const [news, setNews] = useState([]);
    const [CompaniesList, setCompaniesList] = useState([])
    const [error, setError] = useState('');

    const totalPages = Math.ceil(CompaniesList.length / ITEMS_PER_PAGE);
    const paginatedData = CompaniesList.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const Resp = await handleGetAllGulfCompanies();
            const response = await fetch(`/api/slider?page=gulfCompanies`);
            const sliderData = await response.json();
            setSliderImages(sliderData?.data?.sliderImgs || []);
            setNews(sliderData?.data?.news || []);
            if (Resp.status === 200) {
                setCompaniesList(Resp.data.data);
                setError(null);
            } else {
                setError("Failed to fetch medical records");
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    const partners = [
        { name: "Dubai Ports World", workers: "56 workers", location: "UAE" },
        { name: "SABIC Industries", workers: "09 workers", location: "Saudi Arabia" },
        { name: "Qatar Petroleum", workers: "67 workers", location: "Qatar" },
        { name: "ADNOC Group", workers: "123 workers", location: "UAE" },
    ];
    if (loading) {
        return (
            <Center minH="100vh" bg="gray.50">
                <Spinner size="xl" color="#0a7450" thickness="4px" />
            </Center>
        );
    }
    return (
        <Box minH="100vh">
            <HeroSection sliderImages={sliderImages} news={news} />
            <Box maxW={'1440px'} mx={'auto'} px={{ base: 4, md: 'auto' }}>
                <CompanyCatalogue />
                <Flex direction={isMobile ? "column" : "row"} gap={isMobile ? 4 : 6}>
                    <Box flex={isMobile ? "1" : "3"} bg="white">
                        <Flex justify="space-between" align="center" mb={4}>
                            <Text fontSize={isMobile ? "lg" : "xl"} fontWeight="bold" color={'#0a7450'}>Company Details</Text>
                            <Button variant="outline" size={isMobile ? "xs" : "sm"}>Filter</Button>
                        </Flex>

                        {
                            paginatedData.map((company, index) => {
                                return (
                                    <Box
                                        key={index}
                                        bg="white"
                                        shadow="md"
                                        rounded="2xl"
                                        p={isMobile ? 3 : 6}
                                        border="1px solid"
                                        borderColor="#0a7450"
                                        className="w-full mx-auto"
                                        mb={4}
                                    >
                                        <Flex direction={isMobile ? "column" : "row"} justify="space-between" align="center">
                                            <Flex gap={isMobile ? 2 : 4} align="center" mb={isMobile ? 2 : 0}>
                                                <Avatar src={company.logo} size={isMobile ? "md" : "lg"} name={company.name} borderRadius="10px" />
                                                <Box>
                                                    <Text fontSize={isMobile ? "md" : "xl"} fontWeight="bold">
                                                        {company.name}
                                                    </Text>
                                                    <Text color="gray.600" fontSize={isMobile ? "sm" : "md"}>{company.city}, {company.country}</Text>
                                                    <Badge mt={1} colorScheme="teal" fontSize={isMobile ? "xs" : "sm"}>
                                                        {company?.industry}
                                                    </Badge>
                                                </Box>
                                            </Flex>
                                            <Flex direction={isMobile ? "column" : "row"} align={isMobile ? "flex-start" : "flex-end"} mt={isMobile ? 2 : 0}>
                                                <Badge colorScheme="green" rounded="md" fontSize={isMobile ? "xs" : "sm"}>
                                                    Ongoing
                                                </Badge>
                                                <Flex align="center" mt={isMobile ? 1 : 2} gap={1}>
                                                    <Icon as={BsFillPeopleFill} />
                                                    <Text fontSize={isMobile ? "xs" : "sm"}>{company?.workers_count || 0} Workers</Text>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                        <Divider my={isMobile ? 2 : 4} />
                                        {/* Details */}
                                        <SimpleGrid columns={isMobile ? 1 : [1, 2]} spacing={isMobile ? 2 : 4} mb={isMobile ? 2 : 4}>
                                            <Flex gap={2} align="center">
                                                <Icon as={FaMapMarkerAlt} color="blue.500" boxSize={isMobile ? 4 : 5} />
                                                <Box>
                                                    <Text fontWeight="medium" fontSize={isMobile ? "sm" : "md"}>Location Details</Text>
                                                    <Text fontSize={isMobile ? "xs" : "sm"} color="gray.600">
                                                        {company.city}, {company.country}
                                                    </Text>
                                                </Box>
                                            </Flex>
                                            <Flex gap={2} align="center">
                                                <Icon as={FaUniversity} color="purple.500" boxSize={isMobile ? 4 : 5} />
                                                <Box>
                                                    <Text fontWeight="medium" fontSize={isMobile ? "sm" : "md"}>Embassy</Text>
                                                    <Text fontSize={isMobile ? "xs" : "sm"} color="gray.600">
                                                        {company?.embassy || 'N/A'}
                                                    </Text>
                                                </Box>
                                            </Flex>
                                            <Flex gap={2} align="center">
                                                <Icon as={MdOutlineDateRange} color="orange.500" boxSize={isMobile ? 4 : 5} />
                                                <Box>
                                                    <Text fontWeight="medium" fontSize={isMobile ? "sm" : "md"}>Duration</Text>
                                                    <Text fontSize={isMobile ? "xs" : "sm"} color="gray.600">
                                                        {company?.duration || 'N/A'}
                                                    </Text>
                                                </Box>
                                            </Flex>
                                            <Box>
                                                <Text fontWeight="medium" fontSize={isMobile ? "sm" : "md"}>Visa Details</Text>
                                                <Text fontSize={isMobile ? "xs" : "sm"} color="gray.600">
                                                    Number: {company.visaNumber} <br />
                                                    ID: {company.idNumber}
                                                </Text>
                                            </Box>
                                            <Flex gap={2} align="center">
                                                <Icon as={FaEnvelope} color="red.500" boxSize={isMobile ? 4 : 5} />
                                                <Link href="mailto:hr@alrajhi-construction.sa" color="blue.600" fontSize={isMobile ? "xs" : "sm"}>
                                                    {company?.hr_email || 'N/A'}
                                                </Link>
                                            </Flex>
                                            <Flex gap={2} align="center">
                                                <Icon as={FaGlobe} color="green.500" boxSize={isMobile ? 4 : 5} />
                                                <Link href="https://www.alrajhi-construction.sa" isExternal color="blue.600" fontSize={isMobile ? "xs" : "sm"}>
                                                    {company?.website || 'N/A'}
                                                </Link>
                                            </Flex>
                                        </SimpleGrid>

                                        <Divider my={isMobile ? 2 : 4} />

                                        {/* Ratings */}
                                        <Text fontWeight="bold" mb={isMobile ? 2 : 3} fontSize={isMobile ? "md" : "lg"}>
                                            Public Reviews & Ratings
                                        </Text>
                                        <SimpleGrid columns={isMobile ? 1 : [1, 2]} spacing={isMobile ? 2 : 4} mb={isMobile ? 2 : 6}>
                                            <RatingItem label="Provides Salary On Time" percent={89} fontSize={isMobile ? "xs" : "sm"} />
                                            <RatingItem label="Working Safety Standards" percent={91} fontSize={isMobile ? "xs" : "sm"} />
                                            <RatingItem label="Provides Food On Time" percent={92} fontSize={isMobile ? "xs" : "sm"} />
                                            <RatingItem label="Good Treatment Quality" percent={88} fontSize={isMobile ? "xs" : "sm"} />
                                            <RatingItem label="Good Accommodation" percent={85} fontSize={isMobile ? "xs" : "sm"} />
                                        </SimpleGrid>

                                        {/* Footer Actions */}
                                        <Flex direction={isMobile ? "column" : "row"} justify="space-between" align="center" gap={isMobile ? 2 : 0}>
                                            <Flex gap={isMobile ? 2 : 4}>
                                                <Flex align="center" gap={1}>
                                                    <Icon as={AiFillLike} color="blue.500" boxSize={isMobile ? 4 : 5} />
                                                    <Text fontSize={isMobile ? "xs" : "sm"}>234</Text>
                                                </Flex>
                                                <Flex align="center" gap={1}>
                                                    <Icon as={AiFillDislike} color="red.500" boxSize={isMobile ? 4 : 5} />
                                                    <Text fontSize={isMobile ? "xs" : "sm"}>12</Text>
                                                </Flex>
                                            </Flex>
                                            <Flex gap={isMobile ? 2 : 2}>
                                                <Button variant="outline" size={isMobile ? "xs" : "sm"}>
                                                    Share
                                                </Button>
                                                <Button bg="#0a7450" color='#fff' size={isMobile ? "xs" : "sm"} leftIcon={<MdVerified boxSize={isMobile ? 4 : 5} />}>
                                                    Recommend
                                                </Button>
                                            </Flex>
                                        </Flex>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                    <Box flex={isMobile ? "1" : "1"} bg="white" px={0} borderRadius="md" boxShadow="sm">
                        <Text fontSize={isMobile ? "lg" : "xl"} fontWeight="bold" color={'#0a7450'} mb={isMobile ? 2 : 4}>Quick Stats</Text>
                        <VStack align="center" spacing={isMobile ? 3 : 6}>
                            <Box p={isMobile ? 3 : 6} borderColor="#0a7450" border="1px solid" w={'full'} rounded={'xl'} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                                <Text fontSize={isMobile ? "xl" : "2xl"} fontWeight="bold">7</Text>
                                <Text color="black" fontSize={isMobile ? "sm" : "md"}>Active Partners</Text>
                            </Box>
                            <Box p={isMobile ? 3 : 6} borderColor="#0a7450" border="1px solid" w={'full'} rounded={'xl'} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                                <Text fontSize={isMobile ? "xl" : "2xl"} fontWeight="bold">490</Text>
                                <Text color="black" fontSize={isMobile ? "sm" : "md"}>Workers Placed</Text>
                                <Text fontSize={isMobile ? "xs" : "sm"} color="black">Ongoing: 133 workers</Text>
                                <Text fontSize={isMobile ? "xs" : "sm"} color="black">189 plumbers found for visa issuance</Text>
                            </Box>
                            <Box p={isMobile ? 3 : 6} borderColor="#0a7450" border="1px solid" w={'full'} rounded={'xl'} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                                <Text fontSize={isMobile ? "xl" : "2xl"} fontWeight="bold">3</Text>
                                <Text color="black" fontSize={isMobile ? "sm" : "md"}>Countries</Text>
                            </Box>
                            <Box p={isMobile ? 3 : 6} borderColor="#0a7450" border="1px solid" w={'full'} rounded={'xl'} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                                <Text color="black" fontSize={isMobile ? "sm" : "md"}>Other Partners</Text>
                                <VStack align="start" spacing={isMobile ? 1 : 1}>
                                    <HStack>
                                        <Badge colorScheme="gray" fontSize={isMobile ? "xs" : "sm"}>Dubai Ports World</Badge>
                                        <Text fontSize={isMobile ? "xs" : "sm"} color="black">56 workers - UAE</Text>
                                    </HStack>
                                    <HStack>
                                        <Badge colorScheme="gray" fontSize={isMobile ? "xs" : "sm"}>SABIC Industries</Badge>
                                        <Text fontSize={isMobile ? "xs" : "sm"} color="black">09 workers - Saudi Arabia</Text>
                                    </HStack>
                                </VStack>
                            </Box>
                            <Box
                                p={isMobile ? 3 : 4}
                                bg="white"
                                borderRadius="xl"
                                w={"100%"}
                            >
                                <Text fontSize={isMobile ? "lg" : "xl"} fontWeight="bold" mb={isMobile ? 2 : 4} color="#0a7450">
                                    Other Partners
                                </Text>
                                <VStack align="start" spacing={isMobile ? 2 : 3}>
                                    {partners.map((partner, index) => (
                                        <HStack
                                            key={index}
                                            p={isMobile ? 1 : 2}
                                            bg="gray.50"
                                            borderRadius="md"
                                            w="full"
                                            justify="space-between"
                                            border="1px solid"
                                            borderColor="gray.200"
                                        >
                                            <HStack spacing={isMobile ? 1 : 2}>
                                                <Image src="/Images/placeholder.png" alt={`${partner.name} Logo`} boxSize={isMobile ? "30px" : "40px"} objectFit="contain" />
                                                <VStack align="start" spacing={isMobile ? 0 : 0}>
                                                    <Text fontSize={isMobile ? "xs" : "sm"} fontWeight="medium">{partner.name}</Text>
                                                    <Text fontSize={isMobile ? "xs" : "xs"} color="gray.500">
                                                        {partner.workers} - {partner.location}
                                                    </Text>
                                                </VStack>
                                            </HStack>
                                            <Badge colorScheme="blue" borderRadius="full" p={isMobile ? 0.5 : 1} fontSize={isMobile ? "xs" : "sm"}>
                                                <span role="img" aria-label="info">ℹ️</span>
                                            </Badge>
                                        </HStack>
                                    ))}
                                </VStack>
                            </Box>
                            <Box
                                p={isMobile ? 3 : 4}
                                bg="white"
                                borderRadius="xl"
                                boxShadow="sm"
                                border="1px solid"
                                borderColor="#0a7450"
                                w={"100%"}
                            >
                                <Text fontSize={isMobile ? "lg" : "xl"} fontWeight="bold" mb={isMobile ? 2 : 4} color="#0a7450">
                                    Success Metrics
                                </Text>
                                <VStack align="start" spacing={isMobile ? 2 : 3}>
                                    <HStack justify="space-between" w="full">
                                        <Text fontSize={isMobile ? "xs" : "sm"}>Success Rate</Text>
                                        <Badge colorScheme="green" fontSize={isMobile ? "xs" : "sm"}>96.5%</Badge>
                                    </HStack>
                                    <HStack justify="space-between" w="full">
                                        <Text fontSize={isMobile ? "xs" : "sm"}>Avg. Processing Time</Text>
                                        <Badge colorScheme="green" fontSize={isMobile ? "xs" : "sm"}>15 days</Badge>
                                    </HStack>
                                    <HStack justify="space-between" w="full">
                                        <Text fontSize={isMobile ? "xs" : "sm"}>Client Satisfaction</Text>
                                        <Badge colorScheme="green" fontSize={isMobile ? "xs" : "sm"}>4.8/5</Badge>
                                    </HStack>
                                </VStack>
                            </Box>
                        </VStack>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
}

function RatingItem({ label, percent, fontSize }) {
    return (
        <Flex
            justify="space-between"
            align="center"
            p={3}
            rounded="xl"
            border="1px solid"
            borderColor="gray.200"
            _hover={{ bg: "gray.50" }}
        >
            <Text fontSize={fontSize} fontWeight="medium">
                {label}
            </Text>
            <Text fontWeight="bold" fontSize={fontSize}>{percent}%</Text>
        </Flex>
    );
}