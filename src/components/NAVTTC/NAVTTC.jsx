"use client";

import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Input,
    SimpleGrid,
    Text,
    Tag,
    VStack,
    HStack,
    Icon,
    Divider,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Center,
    Spinner,
} from "@chakra-ui/react";
import { FaCalendarAlt, FaCheckCircle, FaDownload, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaPhone, FaSearchLocation, FaWhatsapp } from "react-icons/fa";
import YouTube from "react-youtube";
import { HeroSection } from "../Gamca/MedicalCenters/HeroSection";
import { useEffect, useState } from "react";

export default function NavttcPage() {
    const [loading, setLoading] = useState(true);
    const [sliderImages, setSliderImages] = useState([]);
    const [news, setNews] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch(`/api/slider?page=NAVTTC`);
            const sliderData = await response.json();
            setSliderImages(sliderData?.data?.sliderImgs || []);
            setNews(sliderData?.data?.news || []);
            setLoading(false);
        };
        fetchData();
    }, []);

    const resources = [
        {
            title: "NAVTTC Centers List",
            desc: "Latest Updated PDF with all authorized centers",
            icon: FaDownload,
        },
        {
            title: "Sample of NAVTTC Report",
            desc: "Sample NAVTTC test report format",
            icon: FaDownload,
        },
        {
            title: "Gulf Jobs Advisory Guidelines",
            desc: "Complete guidance for Gulf employment",
            icon: FaDownload,
        },
    ];

    const centers = [
        {
            id: 1,
            name: "Gulf Skills Testing Center",
            address: "Block 15, Gulshan-e-Iqbal, Karachi",
            contact: "+92-21-34567890",
            city: "Karachi",
            timing: "9:00 AM - 5:00 PM",
            person: "Ahmad Hassan",
            email: "info@gulfskills.pk",
            website: "www.gulfskills.pk",
        },
        {
            id: 2,
            name: "Technical Training Institute",
            address: "Industrial Area, Faisalabad",
            contact: "+92-41-2345678",
            city: "Faisalabad",
            timing: "8:00 AM - 4:00 PM",
            person: "Muhammad Ali",
            email: "contact@tti.edu.pk",
            website: "www.tti.edu.pk",
        },
        {
            id: 3,
            name: "Professional Skills Center",
            address: "Johar Town, Lahore",
            contact: "+92-42-3456789",
            city: "Lahore",
            timing: "9:00 AM - 6:00 PM",
            person: "Fatima Khan",
            email: "info@psc.pk",
            website: "www.psc.pk",
        },
    ];
    const videos = [
        {
            id: "dQw4w9WgXcQ",
            title: "NAVTTC Test for Drivers",
            desc: "Complete guide for driving test preparation",
        },
        {
            id: "dQw4w9WgXcQ",
            title: "Heavy Machinery Operator Test",
            desc: "Practical test examples and tips",
        },
        {
            id: "dQw4w9WgXcQ",
            title: "Plumbing Skills Practical Test",
            desc: "Step-by-step plumbing test process",
        },
        {
            id: "dQw4w9WgXcQ",
            title: "Tips & Tricks for Passing NAVTTC Test",
            desc: "Expert advice from successful candidates",
        },
    ];
    const gulfAdvisory = {
        howNavttcHelps: {
            title: "How NAVTTC Helps in Gulf Jobs",
            desc: "NAVTTC certification provides credible proof of your technical skills to Gulf employers, increasing your chances of employment and better salary packages.",
            benefits: [
                "Skill verification by authorized body",
                "Recognition by Gulf countries",
                "Higher salary prospects",
            ],
        },
        requiredDocuments: {
            title: "Required Documents",
            desc: "Prepare these documents before visiting NAVTTC center:",
            items: [
                "Original CNIC and photocopy",
                "Passport copy (if available)",
                "Experience proof/certificates",
                "Educational certificates",
            ],
        },
    };
    const TipsAndTricks = {
        tips: [
            'Practice with actual tools before test',
            'For drivers - be prepared for theory + driving practice',
            'For plumber -> prepare pipe fitting, leakage control, reading blueprints',
            'Dress properly (safety shoes, helmet if required)',
            'For welders -> review safety rules and welding types ',
        ],
    };
    const onYouTubeReady = (event) => {
        event.target.playVideo();
    };

    const opts = {
        height: '150px',
        width: "100%",
        playerVars: {
            autoplay: 0,
        },
    };
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
            <Box bg="white" minH="100vh" py={10}>
                <Container maxW="1440px" px={4}>
                    {/* ================= Search Section ================= */}
                    <VStack spacing={6} mb={20}>
                        <Heading
                            as="h1"
                            size="xl"
                            textAlign="center"
                            fontWeight="bold"
                            color="gray.800"
                        >
                            Find Your Trade Requirements
                        </Heading>
                        <Text textAlign="center" color="gray.600">
                            Search by occupation code, Arabic trade, or English trade
                        </Text>

                        <Box
                            w="full"
                            bg="white"
                            p={6}
                            borderWidth="1px"
                            borderRadius="xl"
                            boxShadow="sm"
                        >
                            {/* Search Inputs */}
                            <Flex
                                gap={4}
                                direction={{ base: "column", md: "row" }}
                                mb={6}
                                align="center"
                            >
                                <Input placeholder="Search by occupation code (e.g., 3112)" />
                                <Input placeholder="Search in Arabic (e.g., سائق)" />
                                <Input placeholder="Search in English (e.g., Driver)" />
                                <Button bg="#0a7450" color="white" px={8}>
                                    Search
                                </Button>
                            </Flex>

                            {/* Result Card */}
                            <Box borderWidth="1px" p={5} borderRadius="lg" bg="gray.50">
                                <Flex
                                    justify="space-between"
                                    align={{ base: "start", md: "center" }}
                                    direction={{ base: "column", md: "row" }}
                                    gap={4}
                                >
                                    <Box>
                                        <Text fontWeight="bold" fontSize="lg">
                                            Driver / سائق
                                        </Text>
                                        <Text color="gray.600" fontSize="md">
                                            Code: 3112
                                        </Text>
                                        <Text mt={2} fontSize="md" color="gray.700">
                                            Available at these trade centers:
                                        </Text>
                                        <HStack mt={3} spacing={3} wrap="wrap">
                                            <Button
                                                leftIcon={<FaSearchLocation />}
                                                size="md"
                                                colorScheme="teal"
                                                variant="outline"
                                            >
                                                Karachi Centers
                                            </Button>
                                            <Button
                                                leftIcon={<FaSearchLocation />}
                                                size="md"
                                                colorScheme="teal"
                                                variant="outline"
                                            >
                                                Lahore Centers
                                            </Button>
                                            <Button
                                                leftIcon={<FaSearchLocation />}
                                                size="md"
                                                colorScheme="teal"
                                                variant="outline"
                                            >
                                                Faisalabad Centers
                                            </Button>
                                        </HStack>
                                    </Box>
                                    <Tag size="lg" colorScheme="green" borderRadius="full">
                                        Available
                                    </Tag>
                                </Flex>
                            </Box>
                        </Box>
                    </VStack>

                    {/* ================= FAQ Section ================= */}
                    <Box textAlign="center" mb={10}>
                        <Heading as="h2" size="xl" mb={2}>
                            What is NAVTTC?
                        </Heading>
                        <Text color="gray.600">Frequently Asked Questions</Text>
                    </Box>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        <Box
                            p={6}
                            borderWidth="1px"
                            borderRadius="xl"
                            boxShadow="sm"
                            bg="white"
                            textAlign="left"
                        >
                            <HStack spacing={3} mb={3}>
                                <Icon as={FaCheckCircle} color="green.500" />
                                <Text fontWeight="bold">What is NAVTTC?</Text>
                            </HStack>
                            <Text color="gray.600" fontSize="md">
                                NAVTTC stands for National Vocational & Technical Training
                                Commission. It regulates technical skill testing & certification
                                in Pakistan.
                            </Text>
                        </Box>

                        <Box
                            p={6}
                            borderWidth="1px"
                            borderRadius="xl"
                            boxShadow="sm"
                            bg="white"
                            textAlign="left"
                        >
                            <HStack spacing={3} mb={3}>
                                <Icon as={FaCheckCircle} color="green.500" />
                                <Text fontWeight="bold">Why is NAVTTC report required for Gulf jobs?</Text>
                            </HStack>
                            <Text color="gray.600" fontSize="md">
                                Saudi Arabia & other Gulf countries require NAVTTC skill
                                verification for certain trades to ensure authenticity of worker
                                qualifications.
                            </Text>
                        </Box>

                        <Box
                            p={6}
                            borderWidth="1px"
                            borderRadius="xl"
                            boxShadow="sm"
                            bg="white"
                            textAlign="left"
                        >
                            <HStack spacing={3} mb={3}>
                                <Icon as={FaCheckCircle} color="green.500" />
                                <Text fontWeight="bold">For which trades NAVTTC is compulsory?</Text>
                            </HStack>
                            <Text color="gray.600" fontSize="md">
                                Drivers, Heavy Machinery Operators (Excavator, Crane, Loader),
                                Plumbers, Welders, Electricians, Mechanics, etc.
                            </Text>
                        </Box>

                        <Box
                            p={6}
                            borderWidth="1px"
                            borderRadius="xl"
                            boxShadow="sm"
                            bg="white"
                            textAlign="left"
                        >
                            <HStack spacing={3} mb={3}>
                                <Icon as={FaCheckCircle} color="green.500" />
                                <Text fontWeight="bold">How to apply for NAVTTC test?</Text>
                            </HStack>
                            <Text color="gray.600" fontSize="md">
                                Visit authorized NAVTTC Trade Centers, register with CNIC, and
                                take skill test & interview.
                            </Text>
                        </Box>
                    </SimpleGrid>
                    {/* ============ Downloadable Resources ============ */}
                    <VStack spacing={6} my={16}>
                        <Heading as="h2" size="xl" textAlign="center">
                            Downloadable Resources
                        </Heading>
                        <Text textAlign="center" color="gray.600">
                            Essential documents and guides
                        </Text>
                    </VStack>

                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={20}>
                        {resources.map((res, i) => (
                            <Box
                                key={i}
                                p={6}
                                borderWidth="1px"
                                borderRadius="xl"
                                textAlign="center"
                                bg="white"
                                boxShadow="sm"
                                _hover={{ shadow: "md" }}
                            >
                                <Icon as={res.icon} w={10} h={10} color="#0a7450" mb={4} />
                                <Heading size="md" mb={2}>
                                    {res.title}
                                </Heading>
                                <Text fontSize="md" color="gray.600" mb={4}>
                                    {res.desc}
                                </Text>
                                <Button
                                    leftIcon={<FaDownload />}
                                    bg="#0a7450" color="white"
                                    size="md"
                                    variant="solid"
                                >
                                    Download PDF
                                </Button>
                            </Box>
                        ))}
                    </SimpleGrid>

                    {/* ============ NAVTTC Authorized Trade Centers ============ */}
                    <VStack spacing={4} mb={8}>
                        <Heading as="h2" size="xl" textAlign="center">
                            NAVTTC Authorized Trade Centers
                        </Heading>
                        <Text textAlign="center" color="gray.600">
                            Directory of verified testing centers
                        </Text>
                    </VStack>

                    <TableContainer borderWidth="1px" borderRadius="xl" boxShadow="sm">
                        <Table size="md" variant="simple">
                            <Thead bg="#0a7450">
                                <Tr>
                                    <Th color="white">S#</Th>
                                    <Th color="white">Business Name</Th>
                                    <Th color="white">Address</Th>
                                    <Th color="white">Contact</Th>
                                    <Th color="white">City</Th>
                                    <Th color="white">Timing</Th>
                                    <Th color="white">Contact Person</Th>
                                    <Th color="white">Email</Th>
                                    <Th color="white">Website</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {centers.map((c) => (
                                    <Tr key={c.id}>
                                        <Td>{c.id}</Td>
                                        <Td>{c.name}</Td>
                                        <Td>
                                            <Flex align="center" gap={2}>
                                                <Icon as={FaMapMarkerAlt} color="#0a7450" />
                                                <Text>{c.address}</Text>
                                            </Flex>
                                        </Td>
                                        <Td>
                                            <Flex align="center" gap={2}>
                                                <Icon as={FaPhone} color="#0a7450" />
                                                <Text>{c.contact}</Text>
                                            </Flex>
                                        </Td>
                                        <Td>{c.city}</Td>
                                        <Td>{c.timing}</Td>
                                        <Td>{c.person}</Td>
                                        <Td>
                                            <Flex align="center" gap={2}>
                                                <Icon as={FaEnvelope} color="#0a7450" />
                                                <Text>{c.email}</Text>
                                            </Flex>
                                        </Td>
                                        <Td>
                                            <Flex align="center" gap={2}>
                                                <Icon as={FaGlobe} color="#0a7450" />
                                                <Text>{c.website}</Text>
                                            </Flex>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    {/* ============ Gulf Advisory ============ */}
                    <VStack spacing={6} my={16}>
                        <Heading as="h2" size="xl" textAlign="center">
                            Gulf Advisory
                        </Heading>
                        <Text textAlign="center" color="gray.600">
                            Tips & Guidance for Success
                        </Text>
                    </VStack>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={20}>
                        <Box p={6} borderWidth="1px" borderRadius="xl" bg="white" boxShadow="sm">
                            <Heading size="md" mb={4} color="#0a7450">
                                <Icon as={FaCheckCircle} mr={2} /> {gulfAdvisory.howNavttcHelps.title}
                            </Heading>
                            <Text fontSize="md" color="gray.600" mb={4}>
                                {gulfAdvisory.howNavttcHelps.desc}
                            </Text>
                            {gulfAdvisory.howNavttcHelps.benefits.map((benefit, i) => (
                                <Flex key={i} align="center" mb={2}>
                                    <Icon as={FaCheckCircle} color="green.500" mr={2} />
                                    <Text fontSize="md">{benefit}</Text>
                                </Flex>
                            ))}
                        </Box>
                        <Box p={6} borderWidth="1px" borderRadius="xl" bg="white" boxShadow="sm">
                            <Heading size="md" mb={4} color="#0a7450">
                                <Icon as={FaCheckCircle} mr={2} /> {gulfAdvisory.requiredDocuments.title}
                            </Heading>
                            <Text fontSize="md" color="gray.600" mb={4}>
                                {gulfAdvisory.requiredDocuments.desc}
                            </Text>
                            {gulfAdvisory.requiredDocuments.items.map((item, i) => (
                                <Text key={i} fontSize="md" color="gray.600" mb={2}>
                                    <Icon as={FaCheckCircle} color="orange.500" mr={2} /> {item}
                                </Text>
                            ))}
                        </Box>
                    </SimpleGrid>

                    {/* ============ Videos & Tutorials ============ */}
                    <VStack spacing={6} mt={16} mb={16}>
                        <Heading as="h2" size="xl" textAlign="center">
                            Videos & Tutorials
                        </Heading>
                        <Text textAlign="center" color="gray.600">
                            Learn from practical examples
                        </Text>
                    </VStack>

                    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={20} >
                        {videos.map((video, i) => (

                            <Box key={i} p={6} borderWidth="1px" borderRadius="xl" bg="white" boxShadow="sm" _hover={{ shadow: "md" }} h="270px">
                                <YouTube videoId={video.id} opts={opts} onReady={onYouTubeReady} />
                                <Heading size="md" mt={4} mb={2} className="!truncate">
                                    {video.title}
                                </Heading>
                                <Text fontSize="md" color="gray.600" className="!truncate">
                                    {video.desc}
                                </Text>
                            </Box>
                        ))}
                    </SimpleGrid>

                    {/* ============ Testimonials ============ */}
                    <VStack spacing={6} mb={16}>
                        <Heading as="h2" size="xl" textAlign="center">
                            Tips and Tricks
                        </Heading>
                        <Text textAlign="center" color="gray.600">
                            Expert advice for test success
                        </Text>
                    </VStack>

                    <Box p={6} borderWidth="1px" borderRadius="xl" bg="white" boxShadow="sm">
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                            {TipsAndTricks.tips.map((benefit, i) => (
                                <Flex key={i} align="center" mb={2}>
                                    <Icon as={FaCheckCircle} color="green.500" mr={2} size={'lg'} />
                                    <Text fontSize="md">{benefit}</Text>
                                </Flex>
                            ))}
                        </SimpleGrid>
                    </Box>

                    {/* ============ Contact & Help ============ */}
                    <VStack spacing={6} my={16}>
                        <Heading as="h2" size="xl" textAlign="center">
                            Contact & Help
                        </Heading>
                        <Text textAlign="center" color="gray.600">
                            Get personalized assistance
                        </Text>
                    </VStack>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={20}>
                        <Box p={6} borderWidth="1px" borderRadius="xl" bg="white" boxShadow="sm">
                            <Heading size="md" mb={4} color="#0a7450">
                                <Icon as={FaCalendarAlt} mr={2} /> Book Your NAVTTC Appointment
                            </Heading>
                            <Text fontSize="md" color="gray.600" mb={4}>
                                Fill the form below to schedule your NAVTTC test
                            </Text>
                            <VStack spacing={4} align="stretch">
                                <Input placeholder="Your full name" />
                                <Flex gap={4}>
                                    <Input placeholder="Your phone number" />
                                    <Input placeholder="e.g., 3112" />
                                </Flex>
                                <Flex gap={4}>
                                    <Input placeholder="e.g., Driver, Welder" />
                                    <Input placeholder="Alternative number" />
                                </Flex>
                                <Input placeholder="your.email@example.com" />
                                <Input placeholder="Your city" />
                                <Input placeholder="Any specific requirements or questions..." />
                                <Button leftIcon={<FaCalendarAlt />} bg="#0a7450" color="white" size="md" variant="solid">
                                    Book Appointment
                                </Button>
                            </VStack>
                        </Box>
                        <Box p={6} borderWidth="1px" borderRadius="xl" bg="white" boxShadow="sm">
                            <Heading size="md" mb={4} color="#0a7450">
                                Quick Contact
                            </Heading>
                            <Text fontSize="md" color="gray.600" mb={4}>
                                Get immediate assistance
                            </Text>
                            <VStack spacing={4} align="stretch">
                                <Button leftIcon={<FaWhatsapp />} colorScheme="green" size="md" variant="solid">
                                    WhatsApp Advisory
                                </Button>
                                <Button leftIcon={<FaPhone />} bg="#0a7450" color="white" size="md" variant="outline">
                                    Call for Consultation
                                </Button>
                                <Button leftIcon={<FaGlobe />} bg="#0a7450" color="white" size="md" variant="outline">
                                    Visit navttc.gov.pk
                                </Button>
                            </VStack>
                        </Box>
                    </SimpleGrid>
                </Container>
            </Box>
        </>
    );
}
