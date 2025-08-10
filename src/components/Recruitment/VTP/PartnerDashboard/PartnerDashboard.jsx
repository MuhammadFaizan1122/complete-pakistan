"use client"
import { Box, Flex, Text, Button, IconButton, Tabs, TabList, TabPanels, Tab, TabPanel, Avatar, Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaFileAlt, FaBell, FaPlus, FaWhatsapp, FaGlobe, FaTiktok, FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { RiWhatsappFill } from "react-icons/ri";
import { handleGetVTPById } from "../../../../handlers/recruitment/vtp";
import { useParams } from "next/navigation";
import Link from "next/link";
import Agencies from "./Agencies";
import LikedCompaniesDisplay from "./LikedCompaniesDisplay";

const PartnerDashboard = () => {
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [agentData, setAgentData] = useState()
    const [error, setError] = useState()
    console.log('agentData', agentData)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await handleGetVTPById(params.id);
            console.log('data', data)
            if (data.status === 200) {
                setAgentData(data.data.data);
                setError(null);
            }
            else {
                setError("Failed to fetch Trade Partners");
            }
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
        <Box className="bg-white p-6 rounded-lg mx-auto max-w-[1440px]">
            <Flex align="center" justify="space-between" mb="6" bg={'#0a7450'} p={6}>
                <Box>
                    <Flex>
                        <Box mr={4}>
                            <Avatar
                                name={agentData?.agencyName}
                                src={agentData?.agencyLogo || '/Images/placeholder.png'}
                                size="xl"
                            />
                        </Box>
                        <Box>
                            <Text className="text-2xl font-bold text-white">{agentData?.agencyName}</Text>
                            <Text className="text-white">★★★★★ {agentData?.rating}/5 </Text>
                            <Text className="text-white">Member Since:  {" " + agentData?.createdAt ? new Date(agentData?.createdAt).toLocaleDateString() : 'N/A'}
                            </Text>
                        </Box>
                    </Flex>
                </Box>
                <Flex gap={4}>
                    <IconButton
                        as={Link}
                        href={`https://wa.me/${agentData?.whatsappNo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        icon={<RiWhatsappFill />}
                        aria-label="WhatsApp"
                        className="mr-2 bg-purple-600 !text-[22px] text-white"
                    />
                    <IconButton
                        as={Link}
                        href={`tel:${agentData?.contactPersonPhone}`}
                        icon={<FaPhone />}
                        aria-label="Call"
                        className="mr-2 bg-purple-600 text-white"
                    />
                    <IconButton
                        as={Link}
                        href={`mailto:${agentData?.email}`}
                        icon={<FaEnvelope />}
                        aria-label="Email"
                        className="bg-purple-600 text-white"
                    />
                </Flex>

            </Flex>

            <Tabs variant="enclosed-colored" colorScheme="green" w="100%">
                <TabList w="100%">
                    <Tab flex="1">Overview</Tab>
                    <Tab flex="1">Ready Medical</Tab>
                    <Tab flex="1">Jobs</Tab>
                    <Tab flex="1">CVs</Tab>
                    <Tab flex="1">Notice</Tab>
                    <Tab flex="1">Associate OEP & TTC</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel px='0'>
                        <LikedCompaniesDisplay />
                    </TabPanel>
                    <TabPanel>
                        <p>Ready Medical content here...</p>
                    </TabPanel>
                    <TabPanel className="!px-0">
                        <p>Jobs content here...</p>
                    </TabPanel>
                    <TabPanel>
                        <p>CVs content here...</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Medical content here...</p>
                    </TabPanel>
                    <TabPanel px={0}>
                        <Agencies />
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <Box p="4" borderWidth="1px" borderRadius="md" mt="4">
                <Text className="text-[#0a7450] font-bold">Location</Text>
                <Text>Business Address: {agentData?.businessAddress + ", " + agentData?.address?.city + ", " + agentData?.address?.state + ", " + agentData?.address?.country}</Text>
                <Text>Home Address: {agentData?.homeTownAddress + ", " + agentData?.address?.city + ", " + agentData?.address?.country}</Text>
            </Box>

            <Flex mt="4" justify="space-between">
                <Box p="6" borderWidth="1px" borderRadius="md" borderColor="#0a7450" textAlign="center" w="22%" bg="white" boxShadow="md">
                    <FaCheckCircle color="#0a7450" size="24px" className="mx-auto text-center" />
                    <Text className="text-[#0a7450] font-bold mt-2">Ready Medical</Text>
                    <Text className="text-2xl font-bold mt-2">45</Text>
                </Box>
                <Box p="6" borderWidth="1px" borderRadius="md" borderColor="#0a7450" textAlign="center" w="22%" bg="white" boxShadow="md">
                    <FaFileAlt color="#0a7450" size="24px" className="mx-auto text-center" />
                    <Text className="text-[#0a7450] font-bold mt-2">CVs Data Showcase</Text>
                    <Text className="text-2xl font-bold mt-2">234</Text>
                </Box>
                <Box p="6" borderWidth="1px" borderRadius="md" borderColor="#0a7450" textAlign="center" w="22%" bg="white" boxShadow="md">
                    <FaBell color="#0a7450" size="24px" className="mx-auto text-center" />
                    <Text className="text-[#0a7450] font-bold mt-2">Notice</Text>
                    <Text className="text-2xl font-bold mt-2">0</Text>
                </Box>
                <Box p="6" borderWidth="1px" borderRadius="md" borderColor="#0a7450" textAlign="center" w="22%" bg="white" boxShadow="md">
                    <FaPlus color="#0a7450" size="24px" className="mx-auto text-center" />
                    <Text className="text-[#0a7450] font-bold mt-2">Jobs</Text>
                    <Text className="text-2xl font-bold mt-2">0</Text>
                </Box>
            </Flex>

            <Box p="4" borderWidth="1px" borderRadius="md" mt="4" gap={4} >
                <Text className="flex items-center text-[#0a7450] font-bold text-xl !mb-4"> <FaPhone className="mr-4 text-xl" /> Contact & Social</Text>
                <Flex justify={'space-between'}>
                    <Text className="flex items-center"><FaPhone className="mr-4" /> {agentData?.contactPersonPhone}</Text>
                    <Text className="text-black mt-2">Verified</Text>
                </Flex>
                <Flex justify={'space-between'}>
                    <Text className="flex items-center"><FaEnvelope className="mr-4" /> {agentData?.email}</Text>
                    <Text className="text-black mt-2">Verified</Text>
                </Flex>
                <Text className="flex items-center"><FaGlobe className="mr-4" /> {agentData.websiteUrl}</Text>
                <Flex gap={4} my={4}>
                    {agentData?.socialMedia?.facebook && (
                        <IconButton
                            as={Link}
                            href={agentData?.socialMedia?.facebook}
                            aria-label="Facebook"
                            icon={<FaFacebookF />}
                            size="lg"
                            color="#2563EB"
                            variant="ghost"
                            isExternal
                            target="_blank"
                        />
                    )}
                    {agentData?.socialMedia?.twitter && (
                        <IconButton
                            as={Link}
                            href={agentData?.socialMedia?.twitter}
                            aria-label="Twitter"
                            icon={<FaTwitter />}
                            size="lg"
                            color="#60A5FA"
                            variant="ghost"
                            isExternal
                            target="_blank"
                        />
                    )}
                    {agentData?.socialMedia?.instagram && (
                        <IconButton
                            as={Link}
                            href={agentData?.socialMedia?.instagram}
                            aria-label="Instagram"
                            icon={<FaInstagram />}
                            size="lg"
                            color="#DB2777"
                            variant="ghost"
                            isExternal
                            target="_blank"
                        />
                    )}
                    {agentData?.socialMedia?.tiktok && (
                        <IconButton
                            as={Link}
                            href={agentData?.socialMedia?.tiktok}
                            aria-label="TikTok"
                            icon={<FaTiktok />}
                            size="lg"
                            color="#1D4ED8"
                            variant="ghost"
                            isExternal
                            target="_blank"
                        />
                    )}
                </Flex>
            </Box>
        </Box>
    );
};

export default PartnerDashboard;