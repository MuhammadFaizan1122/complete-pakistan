"use client";

import {
    Box,
    Flex,
    Text,
    Button,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Tag,
    VStack,
    HStack,
    Icon,
    Divider,
    Grid,
    SimpleGrid,
} from "@chakra-ui/react";
import {
    FaDownload,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaYoutube,
    FaUserTie,
    FaFileAlt,
    FaGlobe,
    FaGraduationCap,
    FaCheckCircle,
} from "react-icons/fa";
import SuccessStories from "./SuccessStories";
import Notice from "./Notice";
import RequestConsultationForm from "./ConsultationForm";
import Gallery from "./Gallery";

export default function Info() {
    return (
        <Box className="max-w-[1440px] mx-auto px-4 md:px-4 py-8">
            {/* Grid Layout */}
            <Flex
                gap={8}
                direction={{ base: "column", md: "row" }}
                className="w-full"
            >
                {/* Left Content */}
                <Box flex="3">
                    {/* Top Banner */}
                    <Box className="bg-gray-100 text-sm px-4 py-3 rounded-lg mb-6 flex items-center">
                        <span className="mr-2">🆕</span>
                        <Text>
                            New fast-track processing available for work permits! Book your
                            consultation today for priority handling.
                        </Text>
                    </Box>

                    {/* Stats Grid */}
                    <Grid
                        gap={4}
                        wrap="wrap"
                    >
                        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={{ base: 4, md: 6 }}>
                            <Box className="bg-green-50 rounded-lg text-center py-6 shadow-sm w-full">
                                <Text fontSize="2xl" fontWeight="bold" color="green.600">
                                    97%
                                </Text>
                                <Text color="gray.600">Success Rate</Text>
                            </Box>
                            <Box className="bg-blue-50 rounded-lg text-center py-6 shadow-sm w-full">
                                <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                                    850+
                                </Text>
                                <Text color="gray.600">Clients Helped</Text>
                            </Box>
                            <Box className="bg-purple-50 rounded-lg text-center py-6 shadow-sm w-full">
                                <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                                    12+ years
                                </Text>
                                <Text color="gray.600">Years Experience</Text>
                            </Box>
                            <Box className="bg-red-50 rounded-lg text-center py-6 shadow-sm w-full">
                                <Text fontSize="2xl" fontWeight="bold" color="red.600">
                                    1247
                                </Text>
                                <Text color="gray.600">Likes</Text>
                            </Box>
                        </SimpleGrid>
                    </Grid>
                    <Tabs variant="soft-rounded" colorScheme="gray" w="100%">
                        <TabList
                            w="100%"
                            gap={{ base: 2, md: 2 }}
                            mb={{ base: 4, md: 10 }}
                            bg={'gray.100'}
                            mt={4}
                            p={1}
                            rounded={'lg'}
                            flexWrap={{ base: "wrap", md: "nowrap" }}
                            overflowX={{ base: "auto", md: "visible" }}
                        >
                            <Tab
                                flex={{ base: "1 1 45%", md: "1" }}
                                rounded="lg"
                                _selected={{ bg: "white" }}
                                fontSize={{ base: "sm", md: "md" }}
                                p={{ base: 2, md: 3 }}
                            >
                                Portfolio
                            </Tab>
                            <Tab
                                flex={{ base: "1 1 45%", md: "1" }}
                                rounded="lg"
                                _selected={{ bg: "white" }}
                                fontSize={{ base: "sm", md: "md" }}
                                p={{ base: 2, md: 3 }}
                            >
                                Success Stories
                            </Tab>
                            <Tab
                                flex={{ base: "1 1 45%", md: "1" }}
                                rounded="lg"
                                _selected={{ bg: "white" }}
                                fontSize={{ base: "sm", md: "md" }}
                                p={{ base: 2, md: 3 }}
                            >
                                Notices
                            </Tab>
                            <Tab
                                flex={{ base: "1 1 45%", md: "1" }}
                                rounded="lg"
                                _selected={{ bg: "white" }}
                                fontSize={{ base: "sm", md: "md" }}
                                p={{ base: 2, md: 3 }}
                            >
                                Request Form
                            </Tab>
                            <Tab
                                flex={{ base: "1 1 45%", md: "1" }}
                                rounded="lg"
                                _selected={{ bg: "white" }}
                                fontSize={{ base: "sm", md: "md" }}
                                p={{ base: 2, md: 3 }}
                            >
                                Gallery
                            </Tab>
                        </TabList>
                        <TabPanels>
                            {/* Portfolio Tab */}
                            <TabPanel border={'1px solid'} borderColor={'gray.200'} rounded={'xl'} boxShadow={'md'}>
                                <VStack align="flex-start" spacing={6}>
                                    <Flex
                                        justify="space-between"
                                        align="center"
                                        className="w-full"
                                    >
                                        <Text fontWeight="bold" fontSize="lg">
                                            Professional Portfolio
                                        </Text>
                                        <Button
                                            size="sm"
                                            leftIcon={<FaDownload />}
                                            variant="outline"
                                        >
                                            Download Portfolio PDF
                                        </Button>
                                    </Flex>

                                    <Box className="p-4 rounded-lg !border-l-[4px] !border-black">
                                        <Flex justify="space-between" align="center">
                                            <Box>
                                                <Text fontWeight="bold">
                                                    Successful Work Permit Applications
                                                </Text>
                                                <Text fontSize="sm" color="gray.600">
                                                    Helped 150+ professionals secure work permits in
                                                    Canada, USA, and Australia
                                                </Text>
                                                <Tag
                                                    size="sm"
                                                    colorScheme="green"
                                                    mt={2}
                                                    fontWeight="medium"
                                                >
                                                    95% Success Rate
                                                </Tag>
                                            </Box>
                                            <Text color="gray.500" fontSize="sm">
                                                2023-2024
                                            </Text>
                                        </Flex>
                                    </Box>

                                    <Box className="p-4 rounded-lg !border-l-[4px] !border-black">
                                        <Flex justify="space-between" align="center">
                                            <Box>
                                                <Text fontWeight="bold">Student Visa Approvals</Text>
                                                <Text fontSize="sm" color="gray.600">
                                                    Guided 200+ students to top universities worldwide
                                                </Text>
                                                <Tag
                                                    size="sm"
                                                    colorScheme="green"
                                                    mt={2}
                                                    fontWeight="medium"
                                                >
                                                    92% Approval Rate
                                                </Tag>
                                            </Box>
                                            <Text color="gray.500" fontSize="sm">
                                                2022-2024
                                            </Text>
                                        </Flex>
                                    </Box>
                                </VStack>
                            </TabPanel>

                            {/* Other Tabs */}
                            <TabPanel border={'1px solid'} borderColor={'gray.200'} rounded={'xl'} boxShadow={'md'}>
                                <SuccessStories />
                            </TabPanel>
                            <TabPanel border={'1px solid'} borderColor={'gray.200'} rounded={'xl'} boxShadow={'md'}>
                                <Notice />
                            </TabPanel>
                            <TabPanel border={'1px solid'} borderColor={'gray.200'} rounded={'xl'} boxShadow={'md'}>
                                <RequestConsultationForm />
                            </TabPanel>
                            <TabPanel border={'1px solid'} borderColor={'gray.200'} rounded={'xl'} boxShadow={'md'}>
                                <Gallery />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    {/* Left Column */}
                    <Box className="md:col-span-2 space-y-6" mt={6}>
                        {/* About Section */}
                        <Box className="p-5 border rounded-lg shadow-md bg-white">
                            <Text fontWeight="bold" fontSize="lg" mb={2}>
                                About Ahmed Hassan
                            </Text>
                            <Text color="gray.600">
                                Ahmed is a highly experienced immigration consultant with over 12
                                years of expertise in helping clients achieve their dreams of
                                working and studying abroad. He specializes in complex work permit
                                applications, business immigration, and has a proven track record
                                of success across multiple countries including UAE, Canada,
                                Australia, and UK.
                            </Text>
                        </Box>

                        {/* Our Services */}
                        <Box className="p-5 border rounded-lg shadow-md bg-white">
                            <Text fontWeight="bold" fontSize="lg" mb={1}>
                                Our Services
                            </Text>
                            <Text color="gray.600" mb={4}>
                                Comprehensive abroad services to help you achieve your goals
                            </Text>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                                <HStack align="flex-start" spacing={3}>
                                    <Icon as={FaUserTie} fontSize="20px" mt={1} />
                                    <Box>
                                        <Text fontWeight="bold">
                                            Client Consultation & Guidance
                                        </Text>
                                        <Text fontSize="sm" color="gray.600">
                                            Personalized consultation to understand your goals and
                                            provide expert guidance on available options.
                                        </Text>
                                    </Box>
                                </HStack>

                                <HStack align="flex-start" spacing={3}>
                                    <Icon as={FaFileAlt} fontSize="20px" mt={1} />
                                    <Box>
                                        <Text fontWeight="bold">Documentation Assistance</Text>
                                        <Text fontSize="sm" color="gray.600">
                                            Complete support in preparing and verifying all required
                                            documents for your application.
                                        </Text>
                                    </Box>
                                </HStack>

                                <HStack align="flex-start" spacing={3}>
                                    <Icon as={FaGlobe} fontSize="20px" mt={1} />
                                    <Box>
                                        <Text fontWeight="bold">
                                            Visa & Work Permit Processing
                                        </Text>
                                        <Text fontSize="sm" color="gray.600">
                                            Expert handling of visa and work permit applications with
                                            regular status updates.
                                        </Text>
                                    </Box>
                                </HStack>

                                <HStack align="flex-start" spacing={3}>
                                    <Icon as={FaGraduationCap} fontSize="20px" mt={1} />
                                    <Box>
                                        <Text fontWeight="bold">
                                            Student Visa & Admission Services
                                        </Text>
                                        <Text fontSize="sm" color="gray.600">
                                            Comprehensive support for university selection, admissions,
                                            and student visa applications.
                                        </Text>
                                    </Box>
                                </HStack>
                            </SimpleGrid>
                        </Box>

                        {/* Why Choose Us */}
                        <Box className="p-5 border rounded-lg shadow-md bg-white">
                            <Text fontWeight="bold" fontSize="lg" mb={2}>
                                Why Choose Our Services?
                            </Text>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                                {[
                                    "Legal compliance and guidance",
                                    "Faster processing times",
                                    "Post-arrival support",
                                    "Document verification",
                                    "24/7 customer support",
                                    "Fraud protection",
                                ].map((item, i) => (
                                    <HStack key={i} spacing={2}>
                                        <Icon as={FaCheckCircle} color="green.500" />
                                        <Text>{item}</Text>
                                    </HStack>
                                ))}
                            </SimpleGrid>
                        </Box>
                    </Box>
                </Box>
                {/* Right Sidebar */}
                <Box flex="1" className="space-y-6">
                    {/* Contact Info */}
                    <Box className="p-4 border rounded-lg shadow-sm">
                        <Text fontWeight="bold" mb={3}>
                            Contact Information
                        </Text>

                        <HStack spacing={3} mb={3}>
                            <Icon as={FaFacebook} color="blue.600" />
                            <Icon as={FaTwitter} color="blue.400" />
                            <Icon as={FaInstagram} color="pink.500" />
                            <Icon as={FaLinkedin} color="blue.700" />
                            <Icon as={FaYoutube} color="red.600" />
                        </HStack>

                        <VStack align="flex-start" spacing={2} fontSize="sm">
                            <HStack>
                                <Icon as={FaPhone} />
                                <Text>+971 (555) 123-4567</Text>
                            </HStack>
                            <HStack>
                                <Icon as={FaEnvelope} />
                                <Text>ahmed.hassan@consultancy.com</Text>
                            </HStack>
                            <HStack>
                                <Icon as={FaMapMarkerAlt} />
                                <Text>Dubai, UAE</Text>
                            </HStack>
                        </VStack>

                        <Box
                            className="mt-4 h-24 w-full border rounded-lg flex items-center justify-center text-gray-400 text-sm"
                        >
                            Office Location
                        </Box>

                        <Button
                            w="full"
                            bg="black"
                            color="white"
                            mt={4}
                            _hover={{ bg: "gray.800" }}
                        >
                            Schedule Consultation
                        </Button>
                    </Box>

                    {/* Languages */}
                    <Box className="p-4 border rounded-lg shadow-sm">
                        <Text fontWeight="bold" mb={2}>
                            Languages Spoken
                        </Text>
                        <HStack spacing={2} wrap="wrap">
                            <Tag>English</Tag>
                            <Tag>Arabic</Tag>
                            <Tag>Urdu</Tag>
                            <Tag>Hindi</Tag>
                        </HStack>
                    </Box>
                    <Box className="p-5 border rounded-lg shadow-md bg-white w-full">
                        <Text fontWeight="bold" mb={3}>
                            TikTok Videos
                        </Text>
                        <SimpleGrid columns={2} spacing={4}>
                            <Box className="relative bg-gray-100 h-68 rounded-lg flex items-center justify-center text-gray-400">
                                ▶
                                <Tag
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    colorScheme="blackAlpha"
                                >
                                    12.5K
                                </Tag>
                                <Text
                                    fontSize="sm"
                                    className="absolute bottom-2 left-2 text-gray-700"
                                >
                                    Quick Tips for Work Permit Applications
                                </Text>
                            </Box>
                            <Box className="relative bg-gray-100 h-68 rounded-lg flex items-center justify-center text-gray-400">
                                ▶
                                <Tag
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    colorScheme="blackAlpha"
                                >
                                    8.3K
                                </Tag>
                                <Text
                                    fontSize="sm"
                                    className="absolute bottom-2 left-2 text-gray-700"
                                >
                                    Common Visa Mistakes to Avoid
                                </Text>
                            </Box>
                        </SimpleGrid>
                    </Box>
                    <Box className="p-5 border rounded-lg shadow-md bg-white w-full">
                        <Text fontWeight="bold" mb={3}>
                            YouTube Videos
                        </Text>
                        
                        <Box className="relative bg-gray-100 h-48 rounded-lg flex items-center justify-center text-gray-400 mb-4">
                            ▶
                            <Tag
                                size="sm"
                                className="absolute bottom-2 right-2"
                                colorScheme="blackAlpha"
                            >
                                15:42
                            </Tag>
                            <Text
                                fontSize="sm"
                                className="absolute bottom-2 left-2 text-gray-700"
                            >
                                Complete Guide to Student Visa Process
                            </Text>
                        </Box>
                        <Box className="relative bg-gray-100 h-48 rounded-lg flex items-center justify-center text-gray-400 mb-4">
                            ▶
                            <Tag
                                size="sm"
                                className="absolute bottom-2 right-2"
                                colorScheme="blackAlpha"
                            >
                                15:42
                            </Tag>
                            <Text
                                fontSize="sm"
                                className="absolute bottom-2 left-2 text-gray-700"
                            >
                                Complete Guide to Student Visa Process
                            </Text>
                        </Box>
                    </Box>
                </Box>

            </Flex>
        </Box>
    );
}
