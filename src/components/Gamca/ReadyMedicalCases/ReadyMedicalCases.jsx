'use client';
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  Text,
  VStack,
  HStack,
  Avatar,
  Button,
  Badge,
  Spinner,
  Center,
  useToast,
  Input,
  Stack,
  IconButton,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { RiLayoutGridLine } from "react-icons/ri";
import { CgLayoutList } from "react-icons/cg";
import { MdCreditCard, MdEvent, MdLocationOn, MdOutlineMail, MdOutlineRemoveRedEye, MdPhone } from "react-icons/md";
import { UploadIcon } from "lucide-react";
import StyledSelect from "../../../components/CV/CvDirectory/StyledSelect";
import { handleFetchMedicalCases } from "../../../handlers/gamca/gamca-madical-cases";
import Link from "next/link";
import { City, Country, State } from "country-state-city";
import { HeroSection } from "../MedicalCenters/HeroSection";
import { GamcaTokenDisplay } from "../MedicalCenters/GamceTokenDisplay";
import { useParams } from "next/navigation";

export const calculateTotalExperience = (experienceArray) => {
  let totalYears = 0, totalMonths = 0;
  experienceArray.forEach(exp => {
    const start = new Date(exp.startDate);
    const end = new Date(exp.endDate);
    let years = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();
    const dayDiff = end.getDate() - start.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) years--;
    totalYears += years;
    totalMonths += monthDiff;
    if (dayDiff < 0) totalMonths--;
    if (totalMonths < 0) totalMonths += 12;
    totalYears += Math.floor(totalMonths / 12);
    totalMonths = totalMonths % 12;
  });
  return { totalYears, totalMonths };
};
export default function ReadyMedicalCases({ type }) {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [tradeJob, setTradeJob] = useState("All Trades");
  const [status, setStatus] = useState("All Status");
  const [medicalExpiry, setMedicalExpiry] = useState("All");
  const [isGridView, setIsGridView] = useState(false);
  const toast = useToast();
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [travelCountry, setTravelCountry] = useState("All Countries");
  const [travelState, setTravelState] = useState("All States");
  const [city, setCity] = useState("All Cities");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [news, setNews] = useState([]);
  const params = useParams()
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const response = await handleFetchMedicalCases({ type: type, userId: params.id });
        console.log('response', response)
        if (type !== 'trade-partner') {

          const response2 = await fetch(`/api/slider?page=GAMCAReadyMedicalCases`);
          const sliderData = await response2.json();
          setSliderImages(sliderData?.data?.sliderImgs || []);
          setNews(sliderData?.data?.news || []);
        }
        if (response.status === 200) {
          setCandidates(response.data);
          setFilteredCandidates(response.data);
        } else {
          throw new Error(response?.message || "Failed to fetch candidates");
        }
      } catch (error) {
        console.error('Fetch Error:', error);
        toast({
          title: "Error",
          description: error.message || "Something went wrong while fetching candidates.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  useEffect(() => {
    let filtered = candidates;

    if (searchTerm) {
      filtered = filtered.filter(candidate =>
      (candidate.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.passport?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (city !== "All Cities") {
      filtered = filtered.filter(candidate => candidate.city === city);
    }
    if (tradeJob !== "All Trades") {
      filtered = filtered.filter(candidate => candidate.role === tradeJob);
    }
    if (travelCountry !== "All Countries") {
      filtered = filtered.filter(candidate => candidate.country === travelCountry);
    }
    if (travelState !== "All States") {
      filtered = filtered.filter(candidate => candidate.state === travelState);
    }
    if (status !== "All Status") {
      filtered = filtered.filter(candidate => {
        const medicalDate = candidate.madicalDate ? new Date(candidate.madicalDate) : null;
        const now = new Date();
        const daysDiff = medicalDate ? Math.floor((now - medicalDate) / (1000 * 60 * 60 * 24)) : 0;
        if (status === "Fit" && daysDiff <= 60) return true;
        if (status === "Pending" && !medicalDate) return true;
        if (status === "Unfit" && daysDiff > 60) return true;
        return false;
      });
    }
    if (medicalExpiry !== "All") {
      filtered = filtered.filter(candidate => {
        if (!candidate.madicalDate) return false;
        const medicalDate = new Date(candidate.madicalDate);
        const now = new Date();
        const daysDiff = Math.floor((now - medicalDate) / (1000 * 60 * 60 * 24));
        return daysDiff >= 60 - medicalExpiry && daysDiff <= 60;
      });
    }

    setFilteredCandidates(filtered);
  }, [searchTerm, city, tradeJob, travelCountry, travelState, status, medicalExpiry, candidates]);

  const handleCountryChange = (e) => {
    const countryName = e.target.value;
    setTravelCountry(countryName);
    setTravelState("All States");
    setCity("All Cities");
    if (countryName === "All Countries") {
      setStates([]);
      setCities([]);
    } else {
      const selectedCountry = countries.find((c) => c.name === countryName);
      const stateList = State.getStatesOfCountry(selectedCountry?.isoCode || "");
      setStates(stateList);
      setCities([]);
    }
  };

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setTravelState(stateName);
    setCity("All Cities");
    if (stateName === "All States") {
      setCities([]);
    } else {
      const selectedCountry = countries.find((c) => c.name === travelCountry);
      const selectedState = states.find((s) => s.name === stateName);
      if (selectedCountry && selectedState) {
        const cityList = City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode);
        setCities(cityList);
      } else {
        setCities([]);
      }
    }
  };

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="#0a7450" thickness="4px" />
      </Center>
    );
  }

  return (
    <>
      {
        type !== 'trade-partner' &&
        <HeroSection sliderImages={sliderImages} news={news} />
      }
      <Box py={{ base: 4, md: 8 }} maxW="1400px" mx="auto" minH="100vh">
        <VStack spacing={4} align="stretch">
          <Text fontSize={'24px'} fontWeight="bold" color="#1A3C34">Search & Filter</Text>
          <Box py={0} borderRadius="md" mb={6}>
            <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}>
              <Box>
                <label fontSize="sm" color="gray.600">Search</label>
                <Input
                  placeholder="Name or Passport Number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  bg="white"
                  borderColor="gray.300"
                  w="full"
                  h="50px"
                  borderRadius="15px"
                  outline="1px solid"
                  outlineColor="gray.300"
                  _focus={{
                    ring: 2,
                    ringColor: "#0a7450",
                    borderColor: "transparent",
                    outline: "none",
                  }}
                  _active={{ outline: "none" }}
                  transition="all 0.2s"
                />
              </Box>
              <Box>
                <label className="m-0 mb-2 p-0">Travel Country</label>
                <StyledSelect value={travelCountry} onChange={(e) => { handleCountryChange(e), setTravelCountry(e.target.value) }} bg="white" borderColor="gray.300">
                  {countries.map((c) => (
                    <option key={c.isoCode} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </StyledSelect>
              </Box>
              <Box>
                <label className="m-0 mb-2 p-0">State</label>
                <StyledSelect value={travelState} onChange={(e) => { handleStateChange(e), setTravelState(e.target.value) }} bg="white" borderColor="gray.300">
                  {states.map((c) => (
                    <option key={c.isoCode} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </StyledSelect>
              </Box>
              <Box>
                <label className="m-0 mb-2 p-0">City</label>
                <StyledSelect value={city} onChange={(e) => setCity(e.target.value)} bg="white" borderColor="gray.300">
                  <option>All Cities</option>
                  {cities.map((s) => (
                    <option key={s.isoCode} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </StyledSelect>
              </Box>
              <Box>
                <label className="m-0 mb-2 p-0">Trade/Job</label>
                <StyledSelect value={tradeJob} onChange={(e) => setTradeJob(e.target.value)} bg="white" borderColor="gray.300">
                  <option>All Trades</option>
                  <option>Electrician</option>
                  <option>Plumber</option>
                  <option>Carpenter</option>
                </StyledSelect>
              </Box>
              <Box>
                <label className="m-0 mb-2 p-0">Status</label>
                <StyledSelect value={status} onChange={(e) => setStatus(e.target.value)} bg="white" borderColor="gray.300">
                  <option>All Status</option>
                  <option>Fit</option>
                  <option>Pending</option>
                  <option>Unfit</option>
                </StyledSelect>
              </Box>
              <Box>
                <label className="m-0 mb-2 p-0">Medical Expiry</label>
                <StyledSelect value={medicalExpiry} onChange={(e) => setMedicalExpiry(e.target.value)} bg="white" borderColor="gray.300">
                  <option>All</option>
                  <option>30</option>
                  <option>60</option>
                  <option>90</option>
                </StyledSelect>
              </Box>
            </Grid>
          </Box>

          <Flex alignItems={'center'} justify={'space-between'}>
            <Text fontSize="sm" color="gray.600">{filteredCandidates.length} results found</Text>
            <HStack spacing={2} ml="auto">
              <IconButton
                aria-label="Grid View"
                icon={<RiLayoutGridLine className="text-[22px]" />}
                bg={isGridView ? "#0a7450" : "gray.300"}
                color={isGridView ? "white" : "#0a7450"}
                onClick={() => setIsGridView(true)}
              />
              <IconButton
                aria-label="List View"
                icon={<CgLayoutList className="text-[34px]" />}
                bg={!isGridView ? "#0a7450" : "gray.300"}
                color={!isGridView ? "white" : "#0a7450"}
                onClick={() => setIsGridView(false)}
              />
            </HStack>
          </Flex>
          {
            type !== 'trade-partner' &&
            <GamcaTokenDisplay />
          }

          {isGridView ? (
            <Grid
              templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
              gap={8}
            >
              {filteredCandidates.length === 0 ? (
                <Center py={12}>
                  <Text fontSize="lg" color="gray.600" fontWeight="medium">
                    No candidates found
                  </Text>
                </Center>
              ) : (
                filteredCandidates.map((candidate, index) => {
                  const { totalYears } = calculateTotalExperience(candidate.experience || []);
                  const medicalDate = candidate.madicalDate ? new Date(candidate.madicalDate) : null;
                  const now = new Date();
                  const cleanNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                  const cleanMedicalDate = medicalDate
                    ? new Date(medicalDate.getFullYear(), medicalDate.getMonth(), medicalDate.getDate())
                    : null;
                  const daysDiff = cleanMedicalDate
                    ? Math.floor((cleanNow - cleanMedicalDate) / (1000 * 60 * 60 * 24))
                    : 0;
                  const daysLeft = cleanMedicalDate ? 60 - daysDiff : 0;
                  const isFit = daysDiff <= 60;

                  return (
                    <Card
                      key={index}
                      bg="white"
                      borderRadius="15px"
                      shadow="md"
                      border="1px solid"
                      borderColor="gray.100"
                      p={4}
                    >
                      <Flex justify="space-between" flexWrap="wrap" gap={4}>
                        <Box gap={4} mb={4}>
                          <Flex justify={'space-between'} >
                            <Box mr={2}>
                              <Avatar name={candidate?.name} src={candidate?.avatar} size="lg" />
                            </Box>
                            <Box minW="150px" textAlign="left">
                              <VStack spacing={2} mt={1} align="start">
                                <Text fontSize={'lg'} fontWeight={'bold'}>{candidate?.name}</Text>
                                <Badge colorScheme="blue" borderRadius="full" px={2}>
                                  {candidate?.designation || 'Role'}
                                </Badge>
                                <Badge colorScheme={isFit ? 'green' : 'red'} borderRadius="full" px={2}>
                                  {isFit ? 'FIT' : 'UNFIT'}
                                </Badge>
                              </VStack>
                            </Box>
                          </Flex>
                        </Box>
                      </Flex>

                      <Flex justify="space-between" gap={4} w={'100%'}>
                        <Box w={"50%"} >
                          <HStack spacing={2} mb={2} fontSize="sm" color="gray.600">
                            <Icon fontSize={'18px'} as={MdCreditCard} />
                            <Text fontSize={'md'} className="truncate">Passport: {candidate?.passport}</Text>
                          </HStack>
                          <HStack spacing={2} mb={2} fontSize="md" color="gray.600">
                            <Icon fontSize={'18px'} as={MdPhone} />
                            <Text fontSize={'md'} className="truncate">{candidate?.phone}</Text>
                            <Badge colorScheme="green" fontSize="0.7rem">
                              Verified
                            </Badge>
                          </HStack>
                          <HStack spacing={2} mb={2} fontSize="sm" color="gray.600">
                            <Icon fontSize={'18px'} as={MdEvent} />
                            <Text fontSize="md" className="truncate">
                              Medical:{' '}
                              {candidate?.madicalDate
                                ? new Date(candidate.madicalDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })
                                : 'Not Available'}
                            </Text>
                          </HStack>
                          <Badge mt={1} colorScheme="orange" px={2} py={0.5} borderRadius="full">
                            {candidate?.visaStatus || "Visa Applied"}
                          </Badge>
                        </Box>
                        <Box textAlign="right" flex="1" w={"50%"}>
                          <HStack justify="flex-end" mb={2}>
                            <Icon as={MdLocationOn} color="gray.600" />
                            <Text fontSize="sm" color="gray.700" className="truncate">
                              {candidate?.fromCity} ➔ {candidate?.country}
                            </Text>
                          </HStack>
                          <Text fontSize="sm" color="gray.600" mb={1} className="truncate">
                            <Icon as={MdOutlineMail} color="gray.600" fontSize={'20px'} mr={2} />
                            {candidate?.email}
                          </Text>
                          {daysLeft > 0 && (
                            <Badge colorScheme="blackAlpha" borderRadius="full" px={3} py={1} mt={2}>
                              {daysLeft} days left
                            </Badge>
                          )}
                        </Box>
                      </Flex>

                      <Stack direction="column" spacing={2} mt={4}>
                        <Button
                          as={Link}
                          href={candidate?.medicalReportUrl || '#'}
                          target="_blank"
                          size="lg"
                          leftIcon={<MdOutlineRemoveRedEye />}
                          variant="ghost"
                          p={4}
                          color={"#0a7450"}
                          border={'2px solid #0a7450'}
                          borderRadius={'15px'}
                          // onClick={() => handleViewMedicalReport(candidate?.medicalReportUrl)}
                          isDisabled={!candidate?.medicalReportUrl}
                        >
                          View Medical Report
                        </Button>
                        <Button
                          size="lg"
                          leftIcon={<UploadIcon />}
                          variant="ghost"
                          p={4}
                          color={"#0a7450"}
                          border={'2px solid #0a7450'}
                          borderRadius={'15px'}
                        >
                          Upload Visa Copy
                        </Button>
                      </Stack>

                      <HStack spacing={3} mt={4}>
                        <Button
                          size="lg"
                          flex="1"
                          p={4}
                          _hover={{ color: "#fff" }}
                          color={"#fff"}
                          bg={'#0a7450'}
                          border={'2px solid #0a7450'}
                          borderRadius={'15px'}
                        >
                          Match
                        </Button>
                        <Button
                          size="lg"
                          flex="1"
                          p={4}
                          color={"#0a7450"}
                          bg={'#fff'}
                          border={'2px solid #0a7450'}
                          borderRadius={'15px'}
                        >
                          Recommend
                        </Button>
                      </HStack>
                    </Card>
                  );
                })
              )}
            </Grid>
          ) : (
            <VStack spacing={4} align="stretch">
              {filteredCandidates.length === 0 ? (
                <Center py={12}>
                  <Text fontSize="lg" color="gray.600" fontWeight="medium">
                    No candidates found
                  </Text>
                </Center>
              ) : (
                filteredCandidates.map((candidate, index) => {
                  const { totalYears } = calculateTotalExperience(candidate.experience || []);
                  const medicalDate = candidate.madicalDate ? new Date(candidate.madicalDate) : null;
                  const now = new Date();
                  const cleanNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                  const cleanMedicalDate = medicalDate
                    ? new Date(medicalDate.getFullYear(), medicalDate.getMonth(), medicalDate.getDate())
                    : null;
                  const daysDiff = cleanMedicalDate
                    ? Math.floor((cleanNow - cleanMedicalDate) / (1000 * 60 * 60 * 24))
                    : 0;
                  const daysLeft = cleanMedicalDate ? 60 - daysDiff : 0;
                  const isFit = daysDiff <= 60;

                  return (
                    <Card
                      key={index}
                      bg="white"
                      borderRadius="15px"
                      shadow="md"
                      border="1px solid"
                      borderColor="gray.100"
                      p={6}
                    >
                      <Flex justify="space-between" flexWrap="wrap" gap={4}>
                        <Flex gap={4}>
                          <Flex justify={'space-between'} >
                            <Box mr={2}>
                              <Avatar name={candidate?.name} src={candidate?.avatar} size="lg" />
                            </Box>
                            <Box minW="150px" textAlign="left">
                              <VStack spacing={2} mt={1} align="start">
                                <Text fontSize={'md'} fontWeight={'bold'}>{candidate?.name}</Text>
                                <Badge colorScheme="blue" borderRadius="full" px={2}>
                                  {candidate?.designation || 'Role'}
                                </Badge>
                                <Badge colorScheme={isFit ? 'green' : 'red'} borderRadius="full" px={2}>
                                  {isFit ? 'FIT' : 'UNFIT'}
                                </Badge>
                              </VStack>
                            </Box>
                          </Flex>
                          <Box>
                            <HStack spacing={2} mb={2} fontSize="sm" color="gray.600">
                              <Icon fontSize={'18px'} as={MdCreditCard} />
                              <Text fontSize={'md'}>Passport: {candidate?.passport}</Text>
                            </HStack>
                            <HStack spacing={2} mb={2} fontSize="md" color="gray.600">
                              <Icon fontSize={'18px'} as={MdPhone} />
                              <Text fontSize={'md'}>{candidate?.phone}</Text>
                              <Badge colorScheme="green" fontSize="0.7rem">
                                Verified
                              </Badge>
                            </HStack>
                            <HStack spacing={2} mb={2} fontSize="sm" color="gray.600">
                              <Icon fontSize={'18px'} as={MdEvent} />
                              <Text fontSize="md">
                                Medical:{' '}
                                {candidate?.madicalDate
                                  ? new Date(candidate.madicalDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })
                                  : 'Not Available'}
                              </Text>
                            </HStack>
                            <Badge mt={1} colorScheme="orange" px={2} py={0.5} borderRadius="full">
                              {candidate?.visaStatus || "Visa Applied"}
                            </Badge>
                          </Box>
                        </Flex>
                        <Box textAlign="right" flex="1" maxW="300px">
                          <HStack justify="flex-end" mb={2}>
                            <Icon as={MdLocationOn} color="gray.600" />
                            <Text fontSize="sm" color="gray.700">
                              {candidate?.fromCity} ➔ {candidate?.country}
                            </Text>
                          </HStack>
                          <Text fontSize="sm" color="gray.600" mb={1}>
                            <Icon as={MdOutlineMail} color="gray.600" fontSize={'20px'} mr={2} />
                            {candidate?.email}
                          </Text>
                          {daysLeft > 0 && (
                            <Badge colorScheme="blackAlpha" borderRadius="full" px={3} py={1} mt={2}>
                              {daysLeft} days left
                            </Badge>
                          )}
                        </Box>
                      </Flex>
                      <Stack direction="column" spacing={2} mt={4}>
                        <Button
                          as={Link}
                          href={candidate?.medicalReportUrl || '#'}
                          target="_blank"
                          size="lg"
                          leftIcon={<MdOutlineRemoveRedEye />}
                          variant="ghost"
                          p={4}
                          color={"#0a7450"}
                          border={'2px solid #0a7450'}
                          borderRadius={'15px'}
                          // onClick={() => handleViewMedicalReport(candidate?.medicalReportUrl)}
                          isDisabled={!candidate?.medicalReportUrl}
                        >
                          View Medical Report
                        </Button>
                        <Button
                          size="lg"
                          leftIcon={<UploadIcon />}
                          variant="ghost"
                          p={4}
                          color={"#0a7450"}
                          border={'2px solid #0a7450'}
                          borderRadius={'15px'}
                        >
                          Upload Visa Copy
                        </Button>
                      </Stack>
                      <HStack spacing={3} mt={4}>
                        <Button
                          size="lg"
                          flex="1"
                          p={4}
                          _hover={{ color: "#fff" }}
                          color={"#fff"}
                          bg={'#0a7450'}
                          border={'2px solid #0a7450'}
                          borderRadius={'15px'}
                        >
                          Match
                        </Button>
                        <Button
                          size="lg"
                          flex="1"
                          p={4}
                          color={"#0a7450"}
                          bg={'#fff'}
                          border={'2px solid #0a7450'}
                          borderRadius={'15px'}
                        >
                          Recommend
                        </Button>
                      </HStack>
                    </Card>
                  );
                })
              )}
            </VStack>
          )}
        </VStack>
      </Box>
    </>
  );
}