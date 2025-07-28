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
  Flex,
  IconButton,
  Avatar,
  Grid,
  Wrap
} from "@chakra-ui/react";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { handleFetchMadicals } from "../../handlers/gamca/gamca-madical";
import Link from "next/link";
import { City, Country, State } from "country-state-city";
import StyledSelect from "../../components/CV/CvDirectory/StyledSelect";
import FilterAndSearch from "./FilterAndSearch";
import { FaWhatsapp, FaWhatsappSquare } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { HeroSection } from "../Gamca/MedicalCenters/HeroSection";
import StyledButton from "../../utils/StyledButton";
import { RiLayoutGridLine } from "react-icons/ri";
import { CgLayoutList } from "react-icons/cg";
import { handleFetchMedicalCases } from "../../handlers/gamca/gamca-madical-cases";
import { calculateTotalExperience } from "../Gamca/ReadyMedicalCases/ReadyMedicalCases";
import { MdAccessTime, MdCreditCard, MdEvent, MdLocationOn, MdOutlineBrokenImage, MdOutlineFileDownload, MdOutlineMail, MdOutlinePhone, MdOutlineRemoveRedEye, MdPhone } from "react-icons/md";
import { UploadIcon } from "lucide-react";
import { SlCalender } from "react-icons/sl";
import { BiGroup } from "react-icons/bi";
import { handleGetJobApplications } from "../../handlers/JobApplicants/JobApplicants";

export default function Interviews() {
  const [medicals, setMedicals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [sliderImages, setSliderImages] = useState([]);
  const [news, setNews] = useState([]);
  const [isGridView, setIsGridView] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await handleGetJobApplications({ status: 'shortlisted' });
      const response = await fetch(`/api/slider?page=Interviews`);
      const sliderData = await response.json();
      setSliderImages(sliderData?.data?.sliderImgs || []);
      setNews(sliderData?.data?.news || []);
      console.log('data', data)
      if (data.status === 200) {
        setMedicals(data.data.data);
        setError(null);
      } else {
        setError("Failed to fetch Interview records");
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
            bgGradient="linear(to-r, #309689, #309689)"
            color="white"
            rounded="full"
            px={8}
            py={6}
            _hover={{ bgGradient: "linear(to-r, #309689, #309689)", transform: "scale(1.05)" }}
            transition="all 0.3s"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </VStack>
      </Center>
    );
  }
  const filteredMedicals = medicals.filter((medical) => {
    const matchesCity = city ? medical.city?.toLowerCase() === city.toLowerCase() : true;

    return matchesCity;
  });

  return (
    <>
      <HeroSection sliderImages={sliderImages} news={news} />
      <Box py={{ base: 4, md: 8 }} px={{ base: 2, sm: 0 }} maxW="1400px" mx="auto" minH="100vh">
        <VStack spacing={10} align="stretch">
          <FilterAndSearch />
          <Flex alignItems={'center'} justify={'space-between'}>
            <Box>
              <Text fontSize="xl" color="green.600" fontWeight={'extrabold'}>Current Interviews</Text>
              <Text fontSize="sm" color="gray.600">{filteredMedicals.length} results found</Text>
            </Box>
            <HStack spacing={2} ml="auto">
              <IconButton
                aria-label="Grid View"
                icon={<RiLayoutGridLine className="text-[22px]" />}
                bg={isGridView ? "#309689" : "gray.300"}
                color={isGridView ? "white" : "#309689"}
                onClick={() => setIsGridView(true)}
              />
              <IconButton
                aria-label="List View"
                icon={<CgLayoutList className="text-[34px]" />}
                bg={!isGridView ? "#309689" : "gray.300"}
                color={!isGridView ? "white" : "#309689"}
                onClick={() => setIsGridView(false)}
              />
            </HStack>
          </Flex>
          {isGridView ? (
            <Grid
              templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
              gap={8}
            >
              {filteredMedicals.length === 0 ? (
                <Center py={12}>
                  <Text fontSize="lg" color="gray.600" fontWeight="medium">
                    No candidates found
                  </Text>
                </Center>
              ) : (
                filteredMedicals.map((candidate, index) => {
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
                        <Box w="100%">
                          <Flex justify={'space-between'} align="center">
                            <Avatar name={candidate?.name} src={candidate?.avatar} size="lg" mr={4} />
                            <Box minW="150px" textAlign="left" flex="1">
                              <VStack spacing={1} align="start">
                                <Text fontSize="lg" textTransform={'capitalize'} fontWeight="bold">{candidate?.job_id.companyName}</Text>
                                <Text fontSize="sm" color="blue.500" fontWeight="semibold">
                                  {candidate?.job_id.jobTitle || 'Role'}
                                </Text>
                                <Text fontSize="xs" textTransform={'capitalize'} color="gray.500" fontWeight="semibold" noOfLines={1}>
                                  {candidate?.job_id.companyName} - License #{candidate.license}
                                </Text>
                              </VStack>
                            </Box>
                            <Box>
                              <Badge colorScheme={isFit ? "green" : "red"} fontSize="0.7rem">
                                {isFit ? "Medical Valid" : "Medical Expired"}
                              </Badge>
                            </Box>
                          </Flex>
                        </Box>
                      </Flex>

                      <Flex flexDirection={'row'} gap={0} mt={4}>
                        <Box w={{ base: "50%" }}>
                          <HStack spacing={2} mb={2} fontSize="sm" color="gray.600">
                            <Icon fontSize="18px" as={MdLocationOn} />
                            <Text fontSize="md" isTruncated>Location: {candidate?.address + ', ' + candidate?.city}</Text>
                          </HStack>

                          <HStack spacing={2} mb={2} fontSize="md" color="gray.600">
                            <Icon fontSize="18px" as={MdAccessTime} />
                            <Text fontSize="md" isTruncated>Timings: {candidate?.interview_timings}</Text>
                          </HStack>

                          {candidate?.must_have?.length > 0 && (
                            <>
                              <Text fontSize="md" mt={2} fontWeight="semibold">Requirements</Text>
                              <Wrap mt={1}>
                                {candidate.must_have.map((item, i) => (
                                  <Badge key={i} colorScheme="blackAlpha" px={2} py={0.5} borderRadius="full">
                                    {item}
                                  </Badge>
                                ))}
                              </Wrap>
                            </>
                          )}

                          <HStack spacing={2} mt={4}>
                            {candidate.benefits != '' && (
                              <Badge colorScheme="blackAlpha" borderRadius="full" px={3} py={1}>
                                {candidate.benefits}
                              </Badge>
                            )}
                            {candidate.interview_type != '' && (
                              <Badge colorScheme="orange" borderRadius="full" px={3} py={1}>
                                {candidate.interview_type} Interview
                              </Badge>
                            )}
                          </HStack>
                        </Box>

                        <Box w={{ base: "50%" }} textAlign="left" pl={2}>
                          <HStack justify="flex-start" mb={2}>
                            <Icon as={SlCalender} color="gray.600" />
                            <Text fontSize="sm" color="gray.700">
                              {candidate?.createdAt ? new Date(candidate?.createdAt).toLocaleDateString() : 'N/A'}
                            </Text>
                          </HStack>

                          {candidate.requirements.length > 0 &&
                            candidate.requirements.map((req, i) => {
                              return (
                                <Text key={i} fontSize="sm" color="gray.600" mb={1} isTruncated>
                                  <Icon as={BiGroup} color="gray.600" fontSize={'20px'} mr={2} />
                                  {req}
                                </Text>
                              )
                            })
                          }
                        </Box>
                      </Flex>

                      <SimpleGrid columns={{ base: 2 }} spacing={3} mt={6} w="full">
                        {candidate?.map_link && (
                          <StyledButton
                            as={Link}
                            href={candidate.map_link}
                            target="_blank"
                            title="Map"
                            icon={<Icon mr={2} fontSize="20px" as={MdLocationOn} />}
                          />
                        )}

                        {candidate?.contact && (
                          <StyledButton
                            title="Contact"
                            icon={<Icon mr={2} fontSize="20px" as={MdOutlinePhone} />}
                            as={Link}
                            href={`https://wa.me/${candidate.contact}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        )}

                        {candidate?.form && (
                          <StyledButton
                            title="Form"
                            icon={<Icon mr={2} fontSize="20px" as={MdOutlineFileDownload} />}
                            as={Link}
                            href={candidate.form}
                            target="_blank"
                          />
                        )}

                        {candidate?.notice && (
                          <StyledButton
                            title="Notice"
                            icon={<Icon mr={2} fontSize="20px" as={MdOutlineBrokenImage} />}
                            as={Link}
                            href={candidate.notice}
                            target="_blank"
                          />
                        )}

                        {candidate?.detail && (
                          <StyledButton
                            title="Details"
                            icon={<Icon mr={2} fontSize="20px" as={MdOutlineRemoveRedEye} />}
                            as={Link}
                            href={candidate.detail}
                            target="_blank"
                          />
                        )}
                      </SimpleGrid>
                    </Card>
                  );
                })
              )}
            </Grid>
          ) : (
            <VStack spacing={4} align="stretch">
              {filteredMedicals.length === 0 ? (
                <Center py={12}>
                  <Text fontSize="lg" color="gray.600" fontWeight="medium">
                    No candidates found
                  </Text>
                </Center>
              ) : (
                filteredMedicals.map((candidate, index) => {
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
                      <Flex justify="space-between" flexWrap="wrap" >
                        <Flex w={'33%'}>
                          <Flex justify={'space-between'} >
                            <Box mr={2}>
                              <Avatar name={candidate?.name} src={candidate?.avatar} size="lg" />
                            </Box>
                            <Box textAlign="left">
                              <VStack spacing={2} mt={1} align="start" ml={4}>
                                <Text fontSize={'xl'} textTransform={'capitalize'} fontWeight={'bold'}>{candidate?.job_id.companyName}</Text>
                                <Text color="blue.500" fontWeight={'semibold'}>
                                  {candidate?.job_id.jobTitle || 'Role'}
                                </Text>
                                <Text fontSize={'xs'} textTransform={'capitalize'} color="gray.500" fontWeight={'semibold'} p={0} m={0} className={'truncate'}>
                                  {candidate?.job_id.companyName} - License #{candidate.license}
                                </Text>
                              </VStack>
                            </Box>
                          </Flex>
                        </Flex>
                        <Box w={'33%'}>
                          <HStack spacing={2} mb={2} fontSize="sm" color="gray.600">
                            <Icon fontSize={'18px'} as={MdLocationOn} />
                            <Text fontSize={'md'}>Location: {candidate?.address + ', ' + candidate?.city}</Text>
                          </HStack>
                          <HStack spacing={2} mb={2} fontSize="md" color="gray.600">
                            <Icon fontSize={'18px'} as={MdAccessTime} />
                            <Text fontSize={'md'}>Timings:  {candidate?.interview_timings}</Text>

                          </HStack>
                          <HStack spacing={2} mb={2} fontSize="sm" color="gray.600">
                            {candidate.benefits != '' &&
                              <Badge colorScheme="blackAlpha" borderRadius="full" px={3} py={1} mt={2}>
                                {candidate.benefits}
                              </Badge>
                            }
                            {candidate.interview_type != '' &&
                              <Badge colorScheme="orange" borderRadius="full" px={3} py={1} mt={2}>
                                {candidate.interview_type} Interview
                              </Badge>
                            }
                          </HStack>
                          {candidate?.must_have?.length > 0 && (
                            <Box mt={2}>
                              <Text fontSize="md" fontWeight="semibold" mb={1}>
                                Requirements
                              </Text>
                              <Wrap>
                                {candidate.must_have.map((item, i) => (
                                  <Badge
                                    key={i}
                                    colorScheme="blackAlpha"
                                    px={2}
                                    py={0.5}
                                    borderRadius="full"
                                  >
                                    {item}
                                  </Badge>
                                ))}
                              </Wrap>
                            </Box>
                          )}
                        </Box>
                        <Box w={'33%'}>
                          <HStack justify="flex-start" mb={2}>
                            <Icon as={SlCalender} color="gray.600" />
                            <Text fontSize="sm" color="gray.700">
                              {candidate?.createdAt ? new Date(candidate?.createdAt).toLocaleDateString() : 'N/A'}
                            </Text>
                          </HStack>
                          {candidate.requirements.length > 0 &&
                            candidate.requirements.map((req, i) => {
                              return (
                                <Text key={i} fontSize="sm" color="gray.600" mb={1}>
                                  <Icon as={BiGroup} color="gray.600" fontSize={'20px'} mr={2} />
                                  {req}
                                </Text>

                              )
                            })
                          }
                        </Box>
                      </Flex>
                      <Box w={'100%'} display="flex" justifyContent="flex-end">
                        <Box mt={4} w={{ base: '100%', md: '60%' }} display="flex" justifyContent="flex-end" >
                          <HStack spacing={3} w={'full'}>
                            {candidate?.map_link && (
                              <StyledButton
                                as={Link}
                                href={candidate.map_link}
                                target="_blank"
                                title="Map"
                                icon={<Icon mr={2} fontSize="20px" as={MdLocationOn} />}
                              />
                            )}

                            {candidate?.contact && (
                              <StyledButton
                                title="Contact"
                                icon={<Icon mr={2} fontSize="20px" as={MdOutlinePhone} />}
                                as={Link}
                                href={`https://wa.me/${candidate.contact}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            )}

                            {candidate?.form && (
                              <StyledButton
                                title="Form"
                                icon={<Icon mr={2} fontSize="20px" as={MdOutlineFileDownload} />}
                                as={Link}
                                href={candidate.form}
                                target="_blank"
                              />
                            )}

                            {candidate?.notice && (
                              <StyledButton
                                title="Notice"
                                icon={<Icon mr={2} fontSize="20px" as={MdOutlineBrokenImage} />}
                                as={Link}
                                href={candidate.notice}
                                target="_blank"
                              />
                            )}

                            {candidate?.detail && (
                              <StyledButton
                                title="Details"
                                icon={<Icon mr={2} fontSize="20px" as={MdOutlineRemoveRedEye} />}
                                as={Link}
                                href={candidate.detail}
                                target="_blank"
                              />
                            )}
                          </HStack>
                        </Box>
                      </Box>
                    </Card>
                  );
                })
              )}
            </VStack>
          )}

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