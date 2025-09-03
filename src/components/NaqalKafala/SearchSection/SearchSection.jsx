'use client'
import { HeroSection } from "../../../components/Gamca/MedicalCenters/HeroSection";
import { Box, Heading, Text, Card, CardBody, SimpleGrid, FormControl, FormLabel, Select, Checkbox, Button, Input, Icon, Tabs, TabList, Tab, TabPanels, TabPanel, Grid, Center, Spinner, Badge, Flex, VStack, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegStar, FaRegUser, FaUser } from "react-icons/fa";
import { LuBuilding2 } from "react-icons/lu";
import { TfiBag } from "react-icons/tfi";
import { MdLocationOn, MdWork } from "react-icons/md";
import { useDisclosure } from "@chakra-ui/react";
import ProfilePopup from '../RequestForm/RequestForm'

const sampleCandidates = [
  {
    name: "Ahmed Hassan",
    title: "Civil Engineer",
    experience: 8,
    location: "Jeddah, Saudi Arabia",
    iqama: "Valid until 2025",
    languages: ["Arabic", "English", "Urdu"],
    status: "Available for job switch",
    skills: ["AutoCAD", "Project Management", "Site Supervision"],
  },
  {
    name: "Muhammad Ali",
    title: "Software Developer",
    experience: 5,
    location: "Abu Dhabi, UAE",
    iqama: "Valid until 2024",
    languages: ["English", "Urdu", "Hindi"],
    status: "Seeking new opportunities",
    skills: ["React", "Node.js", "Python", "+1 more"],
  },
  {
    name: "Hassan Sheikh",
    title: "Mechanical Technician",
    experience: 12,
    location: "Kuwait City, Kuwait",
    iqama: "Azad Visa",
    languages: ["Arabic", "English", "Punjabi"],
    status: "Immediately available",
    skills: ["HVAC", "Industrial Maintenance", "Safety Protocols"],
  },
  {
    name: "Fatima Khan",
    title: "Nurse",
    experience: 7,
    location: "Doha, Qatar",
    iqama: "Valid until 2026",
    languages: ["English", "Arabic", "Urdu"],
    status: "Open to relocation",
    skills: ["Patient Care", "Emergency Response", "Medical Records"],
  },
  {
    name: "Ali Raza",
    title: "Electrician",
    experience: 10,
    location: "Riyadh, Saudi Arabia",
    iqama: "Transferable",
    languages: ["Urdu", "Arabic"],
    status: "Available for job switch",
    skills: ["Wiring", "Troubleshooting", "Safety Standards"],
  },
  {
    name: "Sara Ahmed",
    title: "Accountant",
    experience: 4,
    location: "Dubai, UAE",
    iqama: "Valid until 2025",
    languages: ["English", "Hindi", "Urdu"],
    status: "Seeking new opportunities",
    skills: ["QuickBooks", "Financial Reporting", "Tax Preparation"],
  },
  {
    name: "Omar Farooq",
    title: "Welder",
    experience: 15,
    location: "Manama, Bahrain",
    iqama: "Azad Visa",
    languages: ["Arabic", "Punjabi"],
    status: "Immediately available",
    skills: ["Arc Welding", "MIG Welding", "Fabrication"],
  },
  {
    name: "Aisha Malik",
    title: "Teacher",
    experience: 6,
    location: "Muscat, Oman",
    iqama: "Valid until 2024",
    languages: ["English", "Arabic", "Sindhi"],
    status: "Open to relocation",
    skills: ["Curriculum Development", "Classroom Management", "Online Teaching"],
  },
  {
    name: "Bilal Hussain",
    title: "Driver",
    experience: 9,
    location: "Sharjah, UAE",
    iqama: "Transferable",
    languages: ["Urdu", "English"],
    status: "Available for job switch",
    skills: ["Heavy Vehicle", "GPS Navigation", "Vehicle Maintenance"],
  },
];

const SearchSection = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 3;
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(`/api/slider?page=NaqalKafala`);
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

  // Pagination logic
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = sampleCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);
  const totalPages = Math.ceil(sampleCandidates.length / candidatesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <HeroSection sliderImages={sliderImages} news={news} />
      <Box
        bg="gray.50"
        py={{ base: 6, md: 10 }}
        px={{ base: 2, md: 4 }}
        textAlign="center"
        position="relative"
      >
        <Box mb={6} maxW="1440px" mx="auto">
          <Box my={6} position={'relative'}>

            <Heading as="h2" size={{ base: "md", md: "lg" }} color="gray.800" mb={2}>
              Find Your Perfect Match
            </Heading>
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
              // onClick={() => router.push("/ticketing/agent/registration")}
              onClick={onOpen}
            >
              Request Form
            </Button>
            <Text color="gray.600" maxW={{ base: "100%", md: "600px" }} mx="auto" fontSize={{ base: "sm", md: "md" }}>
              Connect with trusted agents or skilled candidates across Gulf countries
            </Text>
          </Box>
        </Box>
        <Box mb={6} bg="white" maxW="1440px" mx="auto" rounded="lg" p={{ base: 2, md: 2 }}>
          <Tabs variant="soft-rounded" colorScheme="gray" w="100%">
            <TabList
              w="100%"
              gap={{ base: 2, md: 2 }}
              mb={{ base: 4, md: 10 }}
              flexWrap={{ base: "wrap", md: "nowrap" }}
              overflowX={{ base: "auto", md: "visible" }}
            >
              <Tab
                flex={{ base: "1 1 45%", md: "1" }}
                rounded="lg"
                bg="white"
                fontSize={{ base: "sm", md: "md" }}
                p={{ base: 2, md: 3 }}
              >
                <FaRegUser className="mr-2" /> Search Candidates
              </Tab>
              <Tab
                flex={{ base: "1 1 45%", md: "1" }}
                rounded="lg"
                bg="white"
                fontSize={{ base: "sm", md: "md" }}
                p={{ base: 2, md: 3 }}
              >
                <LuBuilding2 className="mr-2" /> Search Agents
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0}>
                <Card
                  variant="outline"
                  p={{ base: 4, md: 6 }}
                  bg="white"
                  borderRadius="xl"
                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
                  maxW="1440px"
                  mx="auto"
                >
                  <CardBody>
                    <Text
                      fontWeight="bold"
                      fontSize={{ base: "md", md: "lg" }}
                      mb={4}
                      display="flex"
                      alignItems="center"
                    >
                      <Icon as={FaUser} color="blue.500" mr={2} boxSize={{ base: 4, md: 5 }} /> Find Skilled Candidates
                    </Text>
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 2, md: 4 }}>
                      <FormControl>
                        <FormLabel fontSize={{ base: "sm", md: "md" }}>Select Country</FormLabel>
                        <Select placeholder="Select Country" variant="outline" bg="gray.50" size={{ base: "sm", md: "md" }}>
                          <option value="saudi">Saudi Arabia</option>
                          <option value="uae">UAE</option>
                          <option value="qatar">Qatar</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize={{ base: "sm", md: "md" }}>Province/State</FormLabel>
                        <Select placeholder="Province/State" variant="outline" bg="gray.50" size={{ base: "sm", md: "md" }}>
                          <option value="riyadh">Riyadh</option>
                          <option value="dubai">Dubai</option>
                          <option value="doha">Doha</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize={{ base: "sm", md: "md" }}>City</FormLabel>
                        <Select placeholder="City" variant="outline" bg="gray.50" size={{ base: "sm", md: "md" }}>
                          <option value="jeddah">Jeddah</option>
                          <option value="abuDhabi">Abu Dhabi</option>
                          <option value="alRayyan">Al Rayyan</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize={{ base: "sm", md: "md" }}>Industry</FormLabel>
                        <Select placeholder="Industry" variant="outline" bg="gray.50" size={{ base: "sm", md: "md" }}>
                          <option value="construction">Construction</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="it">IT</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize={{ base: "sm", md: "md" }}>Experience Level</FormLabel>
                        <Select placeholder="Experience Level" variant="outline" bg="gray.50" size={{ base: "sm", md: "md" }}>
                          <option value="entry">Entry Level</option>
                          <option value="mid">Mid Level</option>
                          <option value="senior">Senior Level</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize={{ base: "sm", md: "md" }}>Iqama Status</FormLabel>
                        <Select placeholder="Iqama Status" variant="outline" bg="gray.50" size={{ base: "sm", md: "md" }}>
                          <option value="valid">Valid</option>
                          <option value="expired">Expired</option>
                          <option value="transferable">Transferable</option>
                        </Select>
                      </FormControl>
                    </SimpleGrid>
                    <Box mt={{ base: 4, md: 6 }} textAlign="left">
                      <FormLabel fontSize={{ base: "sm", md: "md" }}>Languages</FormLabel>
                      <Grid templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)" }} gap={2}>
                        <Checkbox colorScheme="blue" mb={2} size={{ base: "sm", md: "md" }}>Arabic</Checkbox>
                        <Checkbox colorScheme="blue" mb={2} size={{ base: "sm", md: "md" }}>English</Checkbox>
                        <Checkbox colorScheme="blue" mb={2} size={{ base: "sm", md: "md" }}>Urdu</Checkbox>
                        <Checkbox colorScheme="blue" mb={2} size={{ base: "sm", md: "md" }}>Punjabi</Checkbox>
                        <Checkbox colorScheme="blue" mb={2} size={{ base: "sm", md: "md" }}>Saraiki</Checkbox>
                        <Checkbox colorScheme="blue" mb={2} size={{ base: "sm", md: "md" }}>Sindhi</Checkbox>
                        <Checkbox colorScheme="blue" mb={2} size={{ base: "sm", md: "md" }}>Pashto</Checkbox>
                      </Grid>
                    </Box>
                    <Box mt={{ base: 4, md: 6 }} textAlign="left">
                      <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={2}>
                        <Checkbox colorScheme="blue" mb={2} size={{ base: "sm", md: "md" }}>Has Driving License</Checkbox>
                        <Checkbox colorScheme="blue" mb={2} size={{ base: "sm", md: "md" }}>Job Switch Candidates</Checkbox>
                        <Checkbox colorScheme="blue" mb={2} size={{ base: "sm", md: "md" }}>Azad Visa Candidates</Checkbox>
                      </Grid>
                    </Box>
                    <Button
                      colorScheme="blue"
                      mt={{ base: 4, md: 6 }}
                      size={{ base: "md", md: "lg" }}
                      width="full"
                      borderRadius="md"
                    >
                      Search Candidates
                    </Button>
                  </CardBody>
                </Card>
              </TabPanel>
              <TabPanel p={0}>
                <Card
                  variant="outline"
                  p={{ base: 4, md: 6 }}
                  bg="white"
                  borderRadius="xl"
                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
                  maxW="1440px"
                  mx="auto"
                >
                  <CardBody>
                    <Text
                      fontWeight="bold"
                      fontSize={{ base: "md", md: "lg" }}
                      mb={4}
                      display="flex"
                      alignItems="center"
                    >
                      <Icon as={LuBuilding2} color="blue.500" mr={2} boxSize={{ base: 4, md: 5 }} /> Find Trusted Agents
                    </Text>
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 2, md: 4 }}>
                      <FormControl>
                        <FormLabel fontSize={{ base: "sm", md: "md" }}>Select Country</FormLabel>
                        <Select placeholder="Select Country" variant="outline" bg="gray.50" size={{ base: "sm", md: "md" }}>
                          <option value="saudi">Saudi Arabia</option>
                          <option value="uae">UAE</option>
                          <option value="qatar">Qatar</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize={{ base: "sm", md: "md" }}>Province/State</FormLabel>
                        <Select placeholder="Province/State" variant="outline" bg="gray.50" size={{ base: "sm", md: "md" }}>
                          <option value="riyadh">Riyadh</option>
                          <option value="dubai">Dubai</option>
                          <option value="doha">Doha</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize={{ base: "sm", md: "md" }}>City</FormLabel>
                        <Select placeholder="City" variant="outline" bg="gray.50" size={{ base: "sm", md: "md" }}>
                          <option value="jeddah">Jeddah</option>
                          <option value="abuDhabi">Abu Dhabi</option>
                          <option value="alRayyan">Al Rayyan</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize={{ base: "sm", md: "md" }}>Rating</FormLabel>
                        <Select placeholder="Rating" variant="outline" bg="gray.50" size={{ base: "sm", md: "md" }}>
                          <option value="4+">4+ Stars</option>
                          <option value="3+">3+ Stars</option>
                          <option value="2+">2+ Stars</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize={{ base: "sm", md: "md" }}>Specialization</FormLabel>
                        <Select placeholder="Specialization" variant="outline" bg="gray.50" size={{ base: "sm", md: "md" }}>
                          <option value="construction">Construction</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="it">IT</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize={{ base: "sm", md: "md" }}>Service Type</FormLabel>
                        <Select placeholder="Service Type" variant="outline" bg="gray.50" size={{ base: "sm", md: "md" }}>
                          <option value="recruitment">Recruitment</option>
                          <option value="visa">Visa Processing</option>
                          <option value="legal">Legal Advice</option>
                        </Select>
                      </FormControl>
                    </SimpleGrid>
                    <Button
                      colorScheme="yellow"
                      mt={{ base: 4, md: 6 }}
                      size={{ base: "md", md: "lg" }}
                      width="full"
                      borderRadius="md"
                    >
                      Search Agents
                    </Button>
                  </CardBody>
                </Card>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        {/* Top Rated Agents Listing */}
        <Box mt={{ base: 6, md: 10 }} maxW="1440px" mx="auto" px={{ base: 2, md: 4 }}>
          <Heading as="h3" size={{ base: "sm", md: "md" }} mb={6} display="flex" alignItems="center">
            <Icon as={TfiBag} color="blue.500" mr={2} boxSize={{ base: 4, md: 5 }} /> Top Rated Agents
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 4, md: 6 }}>
            {currentCandidates.map((candidate, index) => (
              <Card
                key={index}
                borderLeft="4px solid"
                borderColor="blue.400"
                borderRadius="md"
                boxShadow="md"
                p={{ base: 3, md: 4 }}
                bg="white"
              >
                <CardBody
                  p={0}
                  textAlign="left"
                  display="flex"
                  flexDirection="column"
                  gap={2}
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>{candidate.name}</Text>
                    <Text px={3} fontSize={{ base: "xs", md: "xs" }} color="gray.500">
                      {candidate.experience} years
                    </Text>
                  </Flex>
                  <Flex justify="flex-start">
                    <Text
                      color="gray.500"
                      mb={2}
                      display="flex"
                      alignItems="center"
                      mr={2}
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      <Icon as={MdLocationOn} mr={1} boxSize={{ base: 4, md: 5 }} /> {candidate.title}
                    </Text>
                    <Text
                      color="gray.500"
                      mb={2}
                      display="flex"
                      alignItems="center"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      <Icon as={FaRegStar} color="yellow.400" mr={1} boxSize={{ base: 4, md: 5 }} /> {candidate.location}
                    </Text>
                  </Flex>
                  <Text color="gray.500" mb={2} fontSize={{ base: "sm", md: "md" }}>
                    Premier recruitment services for healthcare and IT professionals across Gulf.
                  </Text>
                  <HStack spacing={2} mb={4} flexWrap="wrap">
                    {candidate.skills.map((skill, i) => (
                      <Badge key={i} colorScheme="gray" variant="outline" borderRadius="full" px={3} fontSize={{ base: "xs", md: "sm" }}>
                        {skill}
                      </Badge>
                    ))}
                  </HStack>
                  <Button
                    variant="outline"
                    width="full"
                    colorScheme="blue"
                    mt="auto"
                    size={{ base: "sm", md: "md" }}
                  >
                    Contact Agent
                  </Button>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
          {/* Pagination */}
          <Flex justify="center" mt={{ base: 4, md: 6 }} gap={2} flexWrap="wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                colorScheme={currentPage === page ? "blue" : "gray"}
                variant={currentPage === page ? "solid" : "outline"}
                size={{ base: "sm", md: "md" }}
                minW={{ base: "30px", md: "40px" }}
              >
                {page}
              </Button>
            ))}
          </Flex>
        </Box>
        {/* Featured Candidates Listing */}
        <Box mt={{ base: 6, md: 10 }} maxW="1440px" mx="auto" px={{ base: 2, md: 4 }}>
          <Heading as="h3" size={{ base: "sm", md: "md" }} mb={6} display="flex" alignItems="center">
            <Icon as={FaRegStar} color="yellow.400" mr={2} fontSize={{ base: "20px", md: "28px" }} /> Featured Candidates
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 4, md: 6 }}>
            {currentCandidates.map((candidate, index) => (
              <Card
                key={index}
                borderLeft="4px solid"
                borderColor="yellow.400"
                borderRadius="md"
                boxShadow="md"
                p={{ base: 3, md: 4 }}
                bg="white"
              >
                <CardBody
                  p={0}
                  textAlign="left"
                  display="flex"
                  flexDirection="column"
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>{candidate.name}</Text>
                    <Text px={3} fontSize={{ base: "xs", md: "xs" }} color="gray.500">
                      {candidate.experience} years
                    </Text>
                  </Flex>
                  <Text
                    color="gray.500"
                    mb={2}
                    display="flex"
                    alignItems="center"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    <Icon as={MdWork} mr={1} boxSize={{ base: 4, md: 5 }} /> {candidate.title}
                  </Text>
                  <Text
                    color="gray.500"
                    mb={2}
                    display="flex"
                    alignItems="center"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    <Icon as={MdLocationOn} mr={1} boxSize={{ base: 4, md: 5 }} /> {candidate.location}
                  </Text>
                  <Text color="gray.500" mb={2} fontSize={{ base: "sm", md: "md" }}>
                    Iqama Status: <Badge fontWeight="thin" px="6px" variant="outline" rounded="full">{candidate.iqama}</Badge>
                  </Text>
                  <Text color="gray.500" mb={2} fontSize={{ base: "sm", md: "md" }}>
                    Languages: {candidate.languages.join(", ")}
                  </Text>
                  <Text color="gray.500" mb={4} fontSize={{ base: "sm", md: "md" }}>
                    Status: <Badge variant="solid" px="10px" bg="yellow.400" rounded="full">{candidate.status}</Badge>
                  </Text>
                  <HStack spacing={2} mb={4} flexWrap="wrap">
                    {candidate.skills.map((skill, i) => (
                      <Badge key={i} colorScheme="gray" variant="outline" borderRadius="full" px={3} fontSize={{ base: "xs", md: "sm" }}>
                        {skill}
                      </Badge>
                    ))}
                  </HStack>
                  <Button
                    variant="outline"
                    width="full"
                    colorScheme="blue"
                    mt="auto"
                    size={{ base: "sm", md: "md" }}
                  >
                    View Profile
                  </Button>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
          {/* Pagination */}
          <Flex justify="center" mt={{ base: 4, md: 6 }} gap={2} flexWrap="wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                colorScheme={currentPage === page ? "yellow" : "gray"}
                variant={currentPage === page ? "solid" : "outline"}
                size={{ base: "sm", md: "md" }}
                minW={{ base: "30px", md: "40px" }}
              >
                {page}
              </Button>
            ))}
          </Flex>
        </Box>
      </Box>
      <ProfilePopup isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SearchSection;