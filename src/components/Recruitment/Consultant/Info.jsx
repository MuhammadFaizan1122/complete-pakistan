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
import { useState } from "react";
import Link from "next/link";

export default function Info({ consultant, tabIndex, setTabIndex }) {
    if (!consultant) return null;
    const stats = {
        successRate: consultant.successRate || 0,
        clientsHelped: consultant.clientsHelped || 0,
        experienceYears: consultant.experienceYears || 0,
        likes: consultant.likes || 0,
    };

    const socialLinks = {
        facebook: consultant.socialLinks?.facebook || "",
        twitter: consultant.socialLinks?.twitter || "",
        instagram: consultant.socialLinks?.instagram || "",
        linkedin: consultant.socialLinks?.linkedin || "",
        youtube: consultant.socialLinks?.youtube || "",
    };
    console.log('consultant', consultant)
    return (
        <Box className="max-w-[1440px] mx-auto px-4 md:px-4 py-8">
            <Flex
                gap={8}
                direction={{ base: "column", md: "row" }}
                className="w-full"
            >
                <Box flex="3">
                    {/* <Box className="bg-gray-100 text-sm px-4 py-3 rounded-lg mb-6 flex items-center">
                        <span className="mr-2">🆕</span>
                        <Text>
                            New fast-track processing available for work permits! Book your
                            consultation today for priority handling.
                        </Text>
                    </Box> */}

                    {/* Stats Grid */}
                    <Grid gap={4} wrap="wrap">
                        <SimpleGrid
                            columns={{ base: 1, sm: 2, md: 3 }}
                            spacing={{ base: 4, md: 6 }}
                        >
                            <Box className="bg-green-50 rounded-lg text-center py-6 shadow-sm w-full">
                                <Text fontSize="2xl" fontWeight="bold" color="green.600">
                                    {stats.successRate}%
                                </Text>
                                <Text color="gray.600">Success Rate</Text>
                            </Box>
                            <Box className="bg-blue-50 rounded-lg text-center py-6 shadow-sm w-full">
                                <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                                    {stats.clientsHelped}+
                                </Text>
                                <Text color="gray.600">Clients Helped</Text>
                            </Box>
                            <Box className="bg-purple-50 rounded-lg text-center py-6 shadow-sm w-full">
                                <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                                    {stats.experienceYears}+ years
                                </Text>
                                <Text color="gray.600">Years Experience</Text>
                            </Box>
                            {/* <Box className="bg-red-50 rounded-lg text-center py-6 shadow-sm w-full">
                                <Text fontSize="2xl" fontWeight="bold" color="red.600">
                                    {stats.likes}
                                </Text>
                                <Text color="gray.600">Likes</Text>
                            </Box> */}
                        </SimpleGrid>
                    </Grid>
                    <Tabs variant="soft-rounded" colorScheme="gray" w="100%"
                        index={tabIndex}
                        onChange={(index) => setTabIndex(index)}
                    >
                        <TabList
                            w="100%"
                            gap={{ base: 2, md: 2 }}
                            mb={{ base: 4, md: 10 }}
                            bg="gray.100"
                            mt={4}
                            p={1}
                            rounded="lg"
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
                            <TabPanel
                                border="1px solid"
                                borderColor="gray.200"
                                rounded="xl"
                                boxShadow="md"
                            >
                                <VStack align="flex-start" spacing={6}>
                                    <Flex justify="space-between" align="center" className="w-full">
                                        <Text fontWeight="bold" fontSize="lg">
                                            Professional Portfolio
                                        </Text>
                                        {
                                            consultant.portfolioPdf &&
                                            <Button
                                                size="sm"
                                                leftIcon={<FaDownload />}
                                                variant="outline"
                                                onClick={() => {
                                                    if (consultant.portfolioPdf) {
                                                        window.open(consultant.portfolioPdf, "_blank");
                                                    } else {
                                                        alert("Portfolio PDF not available");
                                                    }
                                                }}
                                            >
                                                Download Portfolio PDF
                                            </Button>
                                        }
                                    </Flex>

                                    {consultant.portfolioItems?.length > 0 ? (
                                        consultant.portfolioItems.map((item, index) => (
                                            <Box
                                                key={index}
                                                className="p-4 rounded-lg border-l-[4px] border-black"
                                            >
                                                <Flex justify="space-between" align="center">
                                                    <Box>
                                                        <Text fontWeight="bold">{item.title}</Text>
                                                        <Text fontSize="sm" color="gray.600">
                                                            {item.description || "No description available"}
                                                        </Text>
                                                        <Tag
                                                            size="sm"
                                                            colorScheme="green"
                                                            mt={2}
                                                            fontWeight="medium"
                                                        >
                                                            {item.successRate
                                                                ? `${item.successRate}% Success Rate`
                                                                : "N/A"}
                                                        </Tag>
                                                    </Box>
                                                    <Text color="gray.500" fontSize="sm">
                                                        {item.year || "N/A"}
                                                    </Text>
                                                </Flex>
                                            </Box>
                                        ))
                                    ) : (
                                        <Text color="gray.500">No portfolio items available.</Text>
                                    )}
                                </VStack>
                            </TabPanel>

                            {/* Success Stories Tab */}
                            <TabPanel
                                border="1px solid"
                                borderColor="gray.200"
                                rounded="xl"
                                boxShadow="md"
                            >
                                <SuccessStories consultant={consultant} />
                            </TabPanel>

                            {/* Notices Tab */}
                            <TabPanel
                                border="1px solid"
                                borderColor="gray.200"
                                rounded="xl"
                                boxShadow="md"
                            >
                                <Notice consultant={consultant} />
                            </TabPanel>

                            {/* Request Form Tab */}
                            <TabPanel
                                border="1px solid"
                                borderColor="gray.200"
                                rounded="xl"
                                boxShadow="md"
                            >
                                <RequestConsultationForm consultant={consultant} />
                            </TabPanel>

                            {/* Gallery Tab */}
                            <TabPanel
                                border="1px solid"
                                borderColor="gray.200"
                                rounded="xl"
                                boxShadow="md"
                            >
                                <Gallery consultant={consultant} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                    {/* About, Services, Why Choose Us Sections */}
                    <Box className="md:col-span-2 space-y-6" mt={6}>
                        {/* About Section */}
                        <Box className="p-5 border rounded-lg shadow-md bg-white">
                            <Text fontWeight="bold" fontSize="lg" mb={2}>
                                About {consultant.fullName}
                            </Text>
                            <Text color="gray.600">
                                {consultant.about || "No description available."}
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
                                {consultant.services?.length > 0 ? (
                                    consultant.services.map((service, index) => (
                                        <HStack key={index} align="flex-start" spacing={3}>
                                            <Icon
                                                as={
                                                    index === 0
                                                        ? FaUserTie
                                                        : index === 1
                                                            ? FaFileAlt
                                                            : index === 2
                                                                ? FaGlobe
                                                                : FaGraduationCap
                                                }
                                                fontSize="20px"
                                                mt={1}
                                            />
                                            <Box>
                                                <Text fontWeight="bold">{service}</Text>
                                                <Text fontSize="sm" color="gray.600">
                                                    {service.includes("Consultation")
                                                        ? "Personalized consultation to understand your goals and provide expert guidance on available options."
                                                        : service.includes("Documentation")
                                                            ? "Complete support in preparing and verifying all required documents for your application."
                                                            : service.includes("Visa")
                                                                ? "Expert handling of visa and work permit applications with regular status updates."
                                                                : "Comprehensive support for university selection, admissions, and student visa applications."}
                                                </Text>
                                            </Box>
                                        </HStack>
                                    ))
                                ) : (
                                    <Text color="gray.500">No services listed.</Text>
                                )}
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
                            {socialLinks.facebook && (
                                <Link href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                                    <Icon as={FaFacebook} color="blue.600" className="cursor-pointer" />
                                </Link>
                            )}
                            {socialLinks.twitter && (
                                <Link href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                                    <Icon as={FaTwitter} color="blue.400" className="cursor-pointer" />
                                </Link>
                            )}
                            {socialLinks.instagram && (
                                <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                                    <Icon as={FaInstagram} color="pink.500" className="cursor-pointer" />
                                </Link>
                            )}
                            {socialLinks.linkedin && (
                                <Link href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                                    <Icon as={FaLinkedin} color="blue.700" className="cursor-pointer" />
                                </Link>
                            )}
                            {socialLinks.youtube && (
                                <Link href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                                    <Icon as={FaYoutube} color="red.600" className="cursor-pointer" />
                                </Link>
                            )}

                        </HStack>

                        <VStack align="flex-start" spacing={2} fontSize="sm">
                            <HStack>
                                <Icon as={FaPhone} />
                                <Text>{consultant.phone || "N/A"}</Text>
                            </HStack>
                            <HStack>
                                <Icon as={FaEnvelope} />
                                <Text>{consultant.email || "N/A"}</Text>
                            </HStack>
                            <HStack>
                                <Icon as={FaMapMarkerAlt} />
                                <Text>
                                    {consultant.locationCity}, {consultant.locationCountry}
                                </Text>
                            </HStack>
                        </VStack>

                        <Box
                            className="mt-4 h-24 w-full border rounded-lg flex items-center justify-center text-gray-400 text-sm"
                        >
                            {consultant.officeAddress || "Office location not provided"}
                        </Box>

                        <Button
                            w="full"
                            bg="black"
                            color="white"
                            mt={4}
                            _hover={{ bg: "gray.800" }}
                            onClick={() => setTabIndex(3)}
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
                            {consultant.languages?.length > 0 ? (
                                consultant.languages.map((lang, index) => (
                                    <Tag key={index}>{lang}</Tag>
                                ))
                            ) : (
                                <Text color="gray.500">No languages listed.</Text>
                            )}
                        </HStack>
                    </Box>

                    {/* YouTube Videos */}
                    <Box className="p-5 border rounded-lg shadow-md bg-white w-full">
                        <Text fontWeight="bold" mb={3}>
                            YouTube Videos
                        </Text>
                        {consultant.videoLinks && consultant.videoLinks.length > 0 ? (
                            consultant.videoLinks.map((link, index) => {
                                let videoId = null;

                                try {
                                    const url = new URL(link);
                                    if (url.hostname.includes("youtu.be")) {
                                        videoId = url.pathname.slice(1);
                                    } else if (url.hostname.includes("youtube.com")) {
                                        videoId = url.searchParams.get("v");
                                    }
                                } catch (e) {
                                    console.error("Invalid URL:", link);
                                }
                                return (
                                    <Box
                                        key={index}
                                        w="100%"
                                        h={{ base: "200px" }}
                                        mb={4}
                                        borderRadius="lg"
                                        overflow="hidden"
                                        boxShadow="md"
                                    >
                                        {videoId ? (
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={`https://www.youtube.com/embed/${videoId}`}
                                                title={`YouTube video ${index + 1}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        ) : (
                                            <Text color="gray.500" textAlign="center" p={4}>
                                                Invalid YouTube link
                                            </Text>
                                        )}
                                    </Box>
                                );
                            })
                        ) : (
                            <Text color="gray.500">No YouTube videos available.</Text>
                        )}
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
}