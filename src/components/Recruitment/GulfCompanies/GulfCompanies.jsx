'use client';
import React, { useEffect, useState } from 'react';
import {
    Box,
    VStack,
    Heading,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Spinner,
    Center,
    Text,
    Button,
    useColorModeValue,
    Icon,
    Flex,
    Tag,
    TagLabel,
    SimpleGrid,
    List,
    ListItem,
    ListIcon,
    Stack,
} from '@chakra-ui/react';
import { MdBusiness, MdCheckCircle, MdLocationPin, MdCardMembership, MdStar } from 'react-icons/md';
import { handleGetAllGulfCompanies } from '../../../handlers/companies/companies';
import { HeroSection } from '../../Gamca/MedicalCenters/HeroSection';
import Image from 'next/image';

const InfoLine = ({ icon, label, value, iconColor = "gray.500" }) => (
    <Flex align="center" gap={2}>
        <Icon as={icon} color={iconColor} boxSize={5} />
        <Text fontSize="sm" color="gray.700" _dark={{ color: "gray.200" }}>
            <Text as="span" fontWeight="medium">{label}:</Text> {value}
        </Text>
    </Flex>
);
export default function GulfCompanies() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sliderImages, setSliderImages] = useState([]);
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const data = await handleGetAllGulfCompanies();
                console.log('data', data);
                const response = await fetch(`/api/slider?page=gulfCompanies`);
                const sliderData = await response.json();
                setSliderImages(sliderData?.data?.sliderImgs || []);
                setNews(sliderData?.data?.news || []);
                if (data.status === 200) {
                    setCompanies(data.data.data);
                    setError(null);
                } else {
                    setError("Failed to fetch Gulf companies.");
                }
            } catch (err) {
                setError("An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    const cardBg = useColorModeValue("white", "gray.800");
    const companyIconColor = useColorModeValue("blue.400", "blue.300");
    const detailIconColor = useColorModeValue("green.500", "green.400");

    if (loading) {
        return (
            <Center minH="100vh">
                <Spinner size="xl" color="#0a7450" thickness="4px" />
            </Center>
        );
    }

    if (error) {
        return (
            <Center minH="100vh">
                <VStack spacing={6}>
                    <Text fontSize="xl" color="red.500" fontWeight="medium">{error}</Text>
                    <Button
                        bgGradient="linear(to-r, #0a7450, #0a7450)"
                        color="white"
                        rounded="full"
                        px={8}
                        py={6}
                        _hover={{ bgGradient: "linear(to-r, #0a7450, #0a7450)", transform: "scale(1.05)" }}
                        transition="all 0.3s"
                        onClick={() => window.location.reload()}
                    >
                        Retry
                    </Button>
                </VStack>
            </Center>
        );
    }

    return (
        <>
            <HeroSection sliderImages={sliderImages} news={news} />
            <Box maxW="1440px" mx="auto" py={12} px={{ base: 4, md: 8 }} minH="100vh">
                <VStack spacing={10} align="stretch">
                    <Heading
                        fontSize={{ base: "2xl", md: "4xl" }}
                        textAlign="center"
                        fontWeight="extrabold"
                        bgGradient="linear(to-r, #0a7450, #0a7450)"
                        bgClip="text"
                    >
                        Gulf Companies
                    </Heading>

                    {companies.length === 0 ? (
                        <Center py={20}>
                            <Text fontSize="lg" color="gray.500">No companies found.</Text>
                        </Center>
                    ) : (
                        <Accordion allowToggle defaultIndex={[0]}>
                            {companies.map((company, index) => (
                                <AccordionItem
                                    key={company._id}
                                    bg={cardBg}
                                    boxShadow="sm"
                                    rounded="xl"
                                    mb={4}
                                    border="1px solid"
                                    borderColor="gray.200"
                                    transition="all 0.3s"
                                    _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
                                >
                                    <h2>
                                        <AccordionButton px={6} py={4}>
                                            <Flex flex="1" textAlign="left" align="center" gap={3}>
                                                <Icon as={MdBusiness} boxSize={5} color={companyIconColor} />
                                                <Text fontSize="md" fontWeight="semibold" color="#1A3C34">
                                                    {index + 1}. {company.name}
                                                </Text>
                                            </Flex>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={6} pt={4} px={6} bg="gray.50" _dark={{ bg: "gray.800" }} borderRadius="lg" boxShadow="md">
                                        <Flex align="center" gap={3} mb={6}>
                                            <Icon as={MdCheckCircle} color="green.500" boxSize={5} />
                                            <Tag size="md" variant="solid" colorScheme="green">
                                                <TagLabel fontWeight="medium">Company Details</TagLabel>
                                            </Tag>
                                        </Flex>

                                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                                            <VStack align="start" spacing={3}>
                                                <InfoLine icon={MdLocationPin} label="Location" value={`${company.city}, ${company.country}`} />
                                                <InfoLine icon={MdCardMembership} label="Visa Number" value={company.visaNumber} />
                                                <InfoLine icon={MdCardMembership} label="ID Number" value={company.idNumber} />
                                                {company.rating && (
                                                    <InfoLine icon={MdStar} label="Rating" value={`${company.rating}/5`} iconColor="yellow.400" />
                                                )}
                                            </VStack>

                                            {company.logo && (
                                                <Box border="1px" borderColor="gray.200" _dark={{ borderColor: "gray.700" }} borderRadius="md" p={2}>
                                                    <Image
                                                        width={150}
                                                        height={150}
                                                        src={company.logo}
                                                        alt={`${company.name} Logo`}
                                                        // maxW="150px"
                                                        // borderRadius="md"
                                                        // mx="auto"
                                                    />
                                                </Box>
                                            )}
                                        </SimpleGrid>

                                        <Box mt={8}>
                                            <Text fontSize="lg" fontWeight="bold" color="gray.700" _dark={{ color: "white" }} mb={3}>
                                                Authorized Trades
                                            </Text>
                                            <Stack spacing={4}>
                                                {company.visaAuthorizedTrade.map((trade, tradeIndex) => (
                                                    <Box
                                                        key={tradeIndex}
                                                        p={4}
                                                        bg="white"
                                                        _dark={{ bg: "gray.700" }}
                                                        rounded="md"
                                                        border="1px solid"
                                                        borderColor="gray.200"
                                                        _darkBorderColor="gray.600"
                                                        boxShadow="sm"
                                                    >
                                                        <Text fontWeight="semibold" color="gray.800" _dark={{ color: "white" }} mb={1}>
                                                            <Icon as={MdCheckCircle} color="green.500" mr={2} />
                                                            {trade.authorized_trade}
                                                        </Text>
                                                        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={1} fontSize="sm" color="gray.700" _dark={{ color: "gray.200" }}>
                                                            <Text>- Required: {trade.required_trade}</Text>
                                                            <Text>- Salary: {trade.salary} {trade.currency}</Text>
                                                            <Text>- Quantity: {trade.quantity}</Text>
                                                            <Text>- Duty Timings: {trade.dutyTimings}</Text>
                                                            <Text>- Overtime: {trade.overtime}</Text>
                                                            <Text>- Benefits: {trade.benefits.join(', ')}</Text>
                                                            <Text>- Contract Period: {trade.contractPeriod}</Text>
                                                            <Text>- NAVTAC: {trade.NAVTAC}</Text>
                                                        </SimpleGrid>
                                                    </Box>
                                                ))}
                                            </Stack>
                                        </Box>
                                    </AccordionPanel>

                                </AccordionItem>
                            ))}
                        </Accordion>
                    )}
                </VStack>
            </Box>
        </>
    );
}