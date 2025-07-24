'use client';
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  Spinner,
  Center,
  Button,
  SimpleGrid,
  Stack,
  Divider,
  Badge,
  Icon,
  HStack,
  Flex
} from "@chakra-ui/react";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { handleFetchMadicals } from "../../../handlers/gamca/gamca-madical";
import Link from "next/link";
import { HeroSection } from "./HeroSection";
import { City, Country, State } from "country-state-city";
import StyledSelect from "../../../components/CV/CvDirectory/StyledSelect";
import { FaWhatsapp, FaWhatsappSquare } from "react-icons/fa";

export default function GamcaMedicalList() {
  const [medicals, setMedicals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [location, setLocation] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [sliderImages, setSliderImages] = useState([]);
  const [news, setNews] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await handleFetchMadicals();
      const response = await fetch(`/api/slider?page=GAMCAApprovedMedicals`);
      const sliderData = await response.json();
      setSliderImages(sliderData?.data?.sliderImgs || []);
      setNews(sliderData?.data?.news || []);

      if (data.success === true) {
        setMedicals(data.data);
        setError(null);
      } else {
        setError("Failed to fetch medical records");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Center minH="100vh" bg="gray.50">
        <Spinner size="xl" color="#309689" thickness="4px" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <VStack spacing={6}>
          <Text fontSize="xl" color="red.500" fontWeight="medium">{error}</Text>
          <Button
            bgGradient="linear(to-r, #309689, #1A3C34)"
            color="white"
            rounded="full"
            px={8}
            py={6}
            _hover={{ bgGradient: "linear(to-r, #28796f, #162f2a)", transform: "scale(1.05)" }}
            transition="all 0.3s"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </VStack>
      </Center>
    );
  }
  const handleCountryChange = (e) => {
    const countryName = e.target.value;
    setLocation(countryName);
    const selectedCountry = countries.find((c) => c.name === countryName);
    const stateList = State.getStatesOfCountry(selectedCountry?.isoCode || "");
    setStates(stateList);
    setState('');
    setCity('');
  };

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setState(stateName);
    const selectedState = states.find((s) => s.name === stateName);

    if (selectedState) {
      const cityList = City.getCitiesOfState(selectedState.countryCode, selectedState.isoCode);
      setCities(cityList);
      setCity('');
    }
  };
  const filteredMedicals = medicals.filter((medical) => {
    const matchesCountry = location ? medical.country?.toLowerCase() === location.toLowerCase() : true;
    const matchesState = state ? medical.state?.toLowerCase() === state.toLowerCase() : true;
    const matchesCity = city ? medical.city?.toLowerCase() === city.toLowerCase() : true;

    return matchesCountry && matchesState && matchesCity;
  });

  return (
    <>
      <HeroSection sliderImages={sliderImages} news={news} />
      {/* <Box w={'full'} bg={'gray.200'} height={'50px'} >
        <Box w={'full'} py={2} textAlign={'left'} maxW={'1400px'} mx={'auto'}>
          <Text fontWeight={'semibold'} color={'#309689'} fontSize={'22px'}>Latest News / <span className="text-[18px] text-black"> New GAMCA requirements effective from January 2025</span></Text>
        </Box>
      </Box> */}
      <Box py={{ base: 4, md: 8 }} maxW="1400px" mx="auto" minH="100vh">
        <VStack spacing={10} align="stretch">
          <Heading
            fontSize={{ base: "2xl", md: "3xl" }}
            color="#1A3C34"
            textAlign="center"
            fontWeight="bold"
            bgGradient="linear(to-r, #309689, #309689)"
            bgClip="text"
          >
            GAMCA Approved Medical Centers in Pakistan
          </Heading>
          <Flex align="center" gap={2}>
            <StyledSelect placeholder="Location" value={location} onChange={handleCountryChange}>
              {countries.map((c) => (
                <option key={c.isoCode} value={c.name}>{c.name}</option>
              ))}
            </StyledSelect>

            <StyledSelect placeholder="State" value={state} onChange={handleStateChange}>
              {states.map((s) => (
                <option key={s.isoCode} value={s.name}>{s.name}</option>
              ))}
            </StyledSelect>

            <StyledSelect placeholder="City" value={city} onChange={(e) => setCity(e.target.value)}>
              {cities.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </StyledSelect>
          </Flex>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
            {filteredMedicals.map((medical) => (
              <Card
                key={medical._id}
                bg="white"
                shadow="lg"
                rounded="2xl"
                border="1px solid"
                borderColor="gray.100"
                _hover={{ shadow: "2xl", transform: "translateY(-5px)" }}
                transition="all 0.3s ease"
              >
                <CardBody p={0} >
                  <Box className="h-52"
                    bgImage={medical.bannerImageUrl || "/Images/placeholder.png"}
                    bgSize="cover"
                    bgPosition="center"
                    roundedTop="2xl">

                  </Box>
                  <VStack align="start" spacing={3} p={6}>
                    <Heading size="lg" color="#1A3C34" fontWeight="bold">
                      {medical.name}
                    </Heading>
                    <Flex gap={2}>
                      <Badge colorScheme="green" rounded="full" px={2}>
                        {medical.country}
                      </Badge>
                      <Badge colorScheme="green" rounded="full" px={2}>
                        GAMCA APPROVED
                      </Badge>
                    </Flex>

                    <Divider borderColor="gray.200" />

                    <Stack spacing={2} fontSize="md" color="gray.700" w={'full'}>
                      <HStack>
                        <Icon as={FiMail} />
                        <Text color="blue.400">{medical.email}</Text>
                      </HStack>

                      <HStack>
                        <Icon as={FiPhone} />
                        <Text color="blue.400">{medical.phone}</Text>
                      </HStack>

                      {medical.whatsapp && (
                        <HStack>
                          <Icon as={FaWhatsapp} />
                          <Text color="green.400">{medical.whatsapp}</Text>
                        </HStack>
                      )}

                      <HStack>
                        <Icon as={FiMapPin} />
                        <Text>{medical.city}, {medical.state}</Text>
                      </HStack>

                      {
                        medical?.workingDays && medical?.workingHours &&
                        <HStack mt={2}>
                          <Icon as={FiClock} />
                          <Text>
                            Added on:{" "}
                            {medical?.workingDays + " | " + medical?.workingHours}
                          </Text>
                        </HStack>
                      }
                      <Text color="gray.600">
                        <strong>Address:</strong> {medical.address}
                      </Text>
                      {
                        medical?.googleMapLink &&
                        <Button
                          as={Link}
                          href={medical.googleMapLink}
                          target='_blank'
                          bg="#309689"
                          w="full"
                          color="white"
                          borderRadius="xl"
                          py={{ base: 4, md: 6 }}
                          fontSize={{ base: "sm", md: "md" }}
                          _hover={{ bg: "white", color: "black", border: "1px solid black" }}
                        >

                          <Icon as={FiMapPin} mr={2} />
                          View on Google Maps
                        </Button>
                      }
                      {
                        medical?.facebookPageLink &&
                        <Button
                          as={Link}
                          href={medical.facebookPageLink}
                          target='_blank'
                          bg="#309689"
                          w="full"
                          color="white"
                          borderRadius="xl"
                          py={{ base: 4, md: 6 }}
                          fontSize={{ base: "sm", md: "md" }}
                          _hover={{ bg: "white", color: "black", border: "1px solid black" }}
                        >

                          <Icon as={FiMapPin} mr={2} />
                          Visit Facebook Page
                        </Button>
                      }
                    </Stack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          {filteredMedicals.length === 0 && (
            <Center py={12}>
              <Text fontSize="lg" color="gray.600" fontWeight="medium">
                No records found
              </Text>
            </Center>
          )}
        </VStack>
      </Box>
    </>
  );
}
