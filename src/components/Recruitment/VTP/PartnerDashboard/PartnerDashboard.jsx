
import { Box, Flex, Text, Button, IconButton, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaFileAlt, FaBell, FaPlus } from "react-icons/fa";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

const PartnerDashboard = () => {
    return (
        <Box className="bg-white p-6 rounded-lg mx-auto max-w-[1440px]">
            <Flex align="center" justify="space-between" mb="6">
                <Box>
                    <Text className="text-2xl font-bold text-purple-900">Muhammad Ahmed</Text>
                    <Text className="text-gray-600">★★★★ 4.8/5 (155 reviews)</Text>
                    <Text className="text-gray-500">WhatsApp Number XXXXXXXX</Text>
                </Box>
                <Flex>
                    <IconButton icon={<FaPhone />} aria-label="Call" className="mr-2 bg-purple-600 text-white" />
                    <IconButton icon={<FaEnvelope />} aria-label="Email" className="bg-purple-600 text-white" />
                </Flex>
            </Flex>
            <Text className="text-gray-500 mb-4">Member Since 2024</Text>

            <Tabs variant="enclosed" colorScheme="purple">
                <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Ready Medical</Tab>
                    <Tab>Jobs</Tab>
                    <Tab>CVs</Tab>
                    <Tab>Notice</Tab>
                    <Tab>Associate OEP & TTC</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Flex>
                            <Box flex="1" p="4" borderWidth="1px" borderRadius="md" mr="4">
                                <Text className="text-purple-900 font-bold">OEP</Text>
                                <Text>Working with: Global Recruitment Services</Text>
                                <Text>Since: 3/15/2020</Text>
                                <Text>Last login: 7/25/2023</Text>
                            </Box>
                            <Box flex="1" p="4" borderWidth="1px" borderRadius="md" mr="4">
                                <Text className="text-purple-900 font-bold">TTC</Text>
                                <Text>Working with: Global Recruitment Services</Text>
                                <Text>Since: 3/15/2020</Text>
                                <Text>Last login: 7/25/2023</Text>
                            </Box>
                        </Flex>
                        <Box p="4" borderWidth="1px" borderRadius="md" mt="4">
                            <Text className="text-purple-900 font-bold">Current</Text>
                            <Text>#: PAK-2023-7890 Embassy, Islamabad</Text>
                            <Text>Shrika Baytur - Saudi Arabia, Jeddah</Text>
                            <Text className="text-purple-900 font-bold mt-2">Manpower Requirements</Text>
                            <Flex justify="space-between">
                                <Text>Plumber</Text><Text>1500-2500 SAR</Text><Text>20</Text>
                                <Text>Electrician</Text><Text>1500-2500 SAR</Text><Text>30</Text>
                                <Text>Tile Fixer</Text><Text>1500-2500 SAR</Text><Text>20</Text>
                            </Flex>
                            <Flex justify="space-between" mt="2">
                                <Text>Construction Labour</Text><Text>1500-2500 SAR</Text><Text>20</Text>
                                <Text>Cleaner Labour</Text><Text>1500-2500 SAR</Text><Text>30</Text>
                                <Text>Helper Labour</Text><Text>1500-2500 SAR</Text><Text>20</Text>
                            </Flex>
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <p>Ready Medical content here...</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Jobs content here...</p>
                    </TabPanel>
                    <TabPanel>
                        <p>CVs content here...</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Medical content here...</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Associate OEP & TTC content here...</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <Box p="4" borderWidth="1px" borderRadius="md" mt="4">
                <Text className="text-purple-900 font-bold">Location</Text>
                <Text>Business Address: Office #405, Al-Hafeez Shopping Mall, Gulberg III, Lahore</Text>
                <Text>Home Address: 123 Main Street, Gulberg III, Lahore</Text>
            </Box>

            <Flex mt="4" justify="space-between">
                <Button leftIcon={<FaCheckCircle />} colorScheme="purple" variant="outline">
                    Ready Medical <Text className="ml-2">45</Text>
                </Button>
                <Button leftIcon={<FaFileAlt />} colorScheme="purple" variant="outline">
                    CVs Data Showcase <Text className="ml-2">234</Text>
                </Button>
                <Button leftIcon={<FaBell />} colorScheme="purple" variant="outline">
                    Notice
                </Button>
                <Button leftIcon={<FaPlus />} colorScheme="purple" variant="outline">
                    Jobs
                </Button>
            </Flex>

            <Box p="4" borderWidth="1px" borderRadius="md" mt="4">
                <Text className="text-purple-900 font-bold">Contact & Social</Text>
                <Text><FaPhone /> +92 300 1234567</Text>
                <Text><FaEnvelope /> ahmed@example.com</Text>
                <Flex>
                    <FiFacebook className="mr-2" />
                    <FiInstagram className="mr-2" />
                    <FiTwitter />
                </Flex>
                <Text className="text-green-500 mt-2">Verified</Text>
            </Box>
        </Box>
    );
};

export default PartnerDashboard;