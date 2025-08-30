"use client";
import { Box, Card, CardBody, Stack, Heading, Text, Button, Flex, Icon, SimpleGrid, Center, Spinner } from "@chakra-ui/react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useEffect, useState } from "react";
import { HeroSection } from "../../../../components/Gamca/MedicalCenters/HeroSection";
import { useRouter } from "next/navigation";

export default function ConsultantCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 16;
  const [consultants, setConsultants] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sliderImages, setSliderImages] = useState([]);
  const [news, setNews] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchConsultants = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/consultant?page=${currentPage}&limit=${cardsPerPage}`);
        const data = await response.json();
        if (data.success) {
          setConsultants(data.data || []);
          setTotalPages(data.pagination.totalPages || 1);
        } else {
          setError(data.error || "Failed to fetch consultants");
        }
      } catch (err) {
        setError("An error occurred while fetching consultants");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchSliderData = async () => {
      const response = await fetch(`/api/slider?page=HajjAndUmrah`);
      const sliderData = await response.json();
      setSliderImages(sliderData?.data?.sliderImgs || []);
      setNews(sliderData?.data?.news || []);
    };

    fetchConsultants();
    fetchSliderData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <Center minH="100vh" bg="gray.50">
        <Spinner size="xl" color="#0a7450" thickness="4px" />
      </Center>
    );
  }

  if (error) {
    return (
      <Box maxW="1440px" mx="auto" p={4} textAlign="center" color="red.500">
        <Text>{error}</Text>
        <Button mt={4} colorScheme="green" onClick={() => setCurrentPage(1)}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <>
      <HeroSection sliderImages={sliderImages} news={news} />
      <Box maxW="1440px" mx="auto" p={4}>
        <Flex justify="space-between" align="center" px={4} py={3}>
          <Box w={{ base: "120px", md: "200px" }} />
          <Heading
            fontSize={{ base: "2xl", md: "4xl" }}
            color="#1A3C34"
            textAlign="center"
            fontWeight="bold"
            bgGradient="linear(to-r, #0a7450, #0a7450)"
            bgClip="text"
          >
            Consultants
          </Heading>
          <Box w={{ base: "120px", md: "200px" }} textAlign="right">
            <Button
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="bold"
              px={{ base: 4, md: 8 }}
              py={{ base: 2, md: 3 }}
              borderRadius="full"
              bg="#0a7450"
              color="white"
              _hover={{ bg: "#065f46" }}
              _active={{ bg: "#054d3a" }}
              onClick={() => router.push("/recruitment/consultancies/registration")}
            >
              Become a Consultant
            </Button>
          </Box>
        </Flex>
        {
          !consultants || consultants.length === 0 ?
            <Box py={10} textAlign="center">
              <Text fontSize="lg" fontWeight="semibold" color="gray.500">
                No Consultant Available
              </Text>
            </Box>
            :
            <>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} justifyContent="center">
                {consultants.map((consultant, index) => (
                  <Card
                    key={index}
                    borderRadius="2xl"
                    overflow="hidden"
                    boxShadow="xl"
                    bg="white"
                    transition="all 0.3s ease"
                    _hover={{ transform: "translateY(-8px)", boxShadow: "2xl" }}
                  >
                    <CardBody p={0}>
                      <Box
                        bgGradient="linear(to-r, #0a7450, #0a7450)"
                        p={6}
                        color="white"
                        textAlign="left"
                      >
                        <Heading size="md" fontWeight="bold">
                          {consultant.fullName || "Unnamed Consultant"}
                        </Heading>
                        <Text fontSize="sm" mt={1} opacity={0.9}>
                          Since {consultant.createdAt ? new Date(consultant.createdAt).getFullYear() : "N/A"}
                        </Text>
                        <Flex align="center" justify="flex-start" mt={3} gap={1}>
                          <Text fontSize="lg" fontWeight="semibold">★</Text>
                          <Text fontSize="lg" fontWeight="semibold">
                            {consultant.rating || "0.0"}
                          </Text>
                        </Flex>
                      </Box>

                      {/* Body Section */}
                      <Stack spacing={4} p={5}>
                        <Flex align="center" color="gray.600">
                          <Icon as={MdLocationOn} color="green.600" boxSize={5} mr={2} />
                          <Text fontSize="sm" fontWeight="medium">
                            {consultant.locationCity}, {consultant.locationCountry}
                          </Text>
                        </Flex>

                        <Text fontSize="sm" color="gray.700">
                          🕒 {consultant.experienceYears} years experience
                        </Text>

                        <Flex align="center" color="gray.600">
                          <Icon as={MdLocationOn} color="green.600" boxSize={5} mr={2} />
                          <Text fontSize="sm" fontWeight="medium">
                            {consultant.title || "N/A"}
                          </Text>
                        </Flex>

                        {/* Specializations */}
                        <Flex wrap="wrap" gap={2}>
                          {consultant.specializations?.slice(0, 3).map((spec, i) => (
                            <Button
                              key={i}
                              size="xs"
                              px={3}
                              borderRadius="full"
                              colorScheme="green"
                              variant="ghost"
                              fontWeight="medium"
                            >
                              {spec}
                            </Button>
                          ))}
                        </Flex>

                        {/* Action Buttons */}
                        <Flex gap={2} pt={2} flexWrap="wrap">
                          <Button
                            size="sm"
                            flex="1"
                            leftIcon={<FaPhone />}
                            borderRadius="full"
                            variant="outline"
                            colorScheme="green"
                            onClick={() => window.location.href = `tel:${consultant.phone}`}
                          >
                            Call
                          </Button>
                          <Button
                            size="sm"
                            flex="1"
                            leftIcon={<FaWhatsapp />}
                            borderRadius="full"
                            variant="outline"
                            colorScheme="green"
                            onClick={() =>
                              window.location.href = `https://wa.me/${consultant.phone.replace("+", "")}`
                            }
                          >
                            WhatsApp
                          </Button>
                          <Button
                            size="sm"
                            flex="1"
                            borderRadius="full"
                            colorScheme="green"
                            fontWeight="bold"
                            onClick={() => router.push(`/recruitment/consultancies/${consultant._id}`)}
                          >
                            View Details
                          </Button>
                        </Flex>
                      </Stack>
                    </CardBody>
                  </Card>
                ))}

              </SimpleGrid>
              <Flex justifyContent="center" mt={4}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    colorScheme={currentPage === page ? "green" : "gray"}
                    variant={currentPage === page ? "solid" : "outline"}
                    mx={1}
                  >
                    {page}
                  </Button>
                ))}
              </Flex>
            </>
        }
      </Box>
    </>
  );
}