'use client'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Center, Divider, Grid, GridItem, List, ListIcon, ListItem, Spinner, Tag, Icon, Box, Flex, Button, Input, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { HeroSection } from '../Gamca/MedicalCenters/HeroSection';
import { VStack, Text } from '@chakra-ui/react';
import { FaCamera, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheck, FaGlobe, FaFacebook, FaInstagram, FaYoutube, FaStar, FaTwitter } from 'react-icons/fa';
import { MdCall, MdStar } from 'react-icons/md';
import { IoMdMail } from 'react-icons/io';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const HajjAndUmrah = () => {
    const { id } = useParams();
    const [agent, setAgent] = useState(null);
    const [sliderImages, setSliderImages] = useState([]);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const candidatesPerPage = 3;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch(`/api/slider?page=HajjAndUmrah`);
            const sliderData = await response.json();
            setSliderImages(sliderData?.data?.sliderImgs || []);
            setNews(sliderData?.data?.news || []);
            const res = await fetch(`/api/travel-agent/${id}`);
            const data = await res.json();
            console.log('data', data)
            if (data.success) setAgent(data.data);
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
        <Box bg="gray.50">
            <Box maxW={'1440px'} mx="auto" bg="gray.50">
                <VStack align="flex-start" spacing={{ base: 4, md: 6 }} w="full">
                    <Flex align="center" w="full" justify="space-between" direction={{ base: 'column', md: 'row' }} gap={{ base: 4, md: 0 }} p={4}>
                        <Flex mt={{ base: 4, md: 10 }} align="center">
                            <Box mr={2}>
                                <Avatar name={agent.agencyName} src={agent.logo} size={{ base: 'md', md: 'lg' }} mr={{ base: 2, md: 4 }} />
                            </Box>
                            <Box>
                                <Text fontWeight="bold" fontSize={{ base: 'lg', md: 'xl' }}>{agent.agencyName}</Text>
                                <Text fontSize={{ base: 'xs', md: 'sm' }} color="#0a7450">Verified</Text>
                                <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">{agent.state}, {agent.country} Est. {agent.establishmentYear}</Text>
                                <Flex mt={1}>
                                    <Text fontSize={{ base: 'xs', md: 'sm' }} color="yellow.500">★ {agent.rating} </Text>
                                </Flex>
                                <Flex mt={1} flexWrap="wrap" gap={2}>
                                    {
                                        agent.services.map((item, i) => {
                                            return (
                                                <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">{item}</Text>
                                            )
                                        })
                                    }
                                </Flex>
                            </Box>
                        </Flex>
                        <Flex gap={2} w={{ base: 'full', md: 'auto' }} justify={{ base: 'center', md: 'flex-end' }}>
                            <Button as={Link}
                                href={`tel:${agent.phone}`} target="_blank"
                                bg="#0a7450" color={'white'} size={{ base: 'sm', md: 'md' }} w={{ base: '50%', md: 'auto' }}>Contact Now</Button>
                            {/* <Button variant="outline" size={{ base: 'sm', md: 'md' }} w={{ base: '50%', md: 'auto' }}>View Packages</Button> */}
                        </Flex>
                    </Flex>
                    <Flex w="full" direction={{ base: 'column', md: 'row' }} gap={{ base: 4, md: 0 }}>
                        <Box flex={{ base: 'none', md: 3 }} p={4} mr={{ base: 0, md: 4 }} w={{ base: 'full', md: 'auto' }}>
                            <Box p={4} bg="gray.100" borderRadius="md">
                                <Text fontWeight="bold" mb={2} fontSize={{ base: 'md', md: 'lg' }}>Gallery</Text>
                                <Flex align="center" justify="center" h={{ base: '200px', md: '300px' }} bg="gray.200" borderRadius="md">
                                    <Icon as={FaCamera} boxSize={{ base: 6, md: 10 }} color="gray.500" />
                                </Flex>
                            </Box>
                            <Box border={'1px solid'} borderColor={'gray.200'} p={4} rounded={'lg'} shadow={'md'} mt={4}>
                                <Flex w="full" justify="space-between" align="center" direction={{ base: 'column', md: 'row' }} gap={{ base: 4, md: 0 }}>
                                    <Box>
                                        <Text fontWeight="bold" fontSize={{ base: 'lg', md: 'xl' }}>Premium Umrah Package - 10 Days</Text>
                                        <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600" display={'flex'} alignItems={'center'} gap={2} flexWrap="wrap">
                                            <Icon as={FaCheck} color="#0a7450" boxSize={{ base: 3, md: 4 }} /> 10 days / 9 nights
                                            <Icon as={FaCheck} color="#0a7450" boxSize={{ base: 3, md: 4 }} /> 2-20 people
                                        </Text>
                                    </Box>
                                    <Box display={'flex'} flexDir={'column'} alignItems={'center'}>
                                        <Text color={'#0a7450'} fontSize={{ base: 'lg', md: 'xl' }} fontWeight={'bold'}>
                                            $2500
                                        </Text>
                                        <Text color={'gray'} fontSize={{ base: 'xs', md: 'sm' }}>
                                            per person
                                        </Text>
                                        <Tag colorScheme={'gray'} fontSize={{ base: 'xs', md: 'sm' }} rounded={'full'} textTransform={'uppercase'}>
                                            Umrah
                                        </Tag>
                                    </Box>
                                </Flex>
                                <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" my={6}>
                                    Luxury Umrah experience with 5-star accommodation, private transportation, and dedicated guide.
                                </Text>
                                <Text fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }}>Accommodation</Text>
                                <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600" fontWeight={'semibold'} mt={4}>
                                    Mecca: Fairmont Makkah Clock Royal Tower (5-star) <br />
                                    Medina: Pullman Zamzam Madina (5-star)
                                </Text>
                                <Box fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }} flex="1" textAlign="left" mt={6}>
                                    What's Included
                                </Box>
                                <List spacing={2} fontSize={{ base: 'xs', md: 'sm' }} my={4}>
                                    <Grid templateColumns={{ base: '1fr', md: '2fr 2fr' }} gap={2}>
                                        <ListItem>
                                            <ListIcon as={FaCheck} color="#0a7450" />
                                            Round-trip flights
                                        </ListItem>
                                        <ListItem>
                                            <ListIcon as={FaCheck} color="#0a7450" />
                                            All meals (breakfast, lunch, dinner)
                                        </ListItem>
                                        <ListItem>
                                            <ListIcon as={FaCheck} color="#0a7450" />
                                            Umrah visa processing
                                        </ListItem>
                                        <ListItem>
                                            <ListIcon as={FaCheck} color="#0a7450" />
                                            Zam Zam water
                                        </ListItem>
                                        <ListItem>
                                            <ListIcon as={FaCheck} color="#0a7450" />
                                            5-star hotel accommodation (4 nights Mecca, 3 nights Medina)
                                        </ListItem>
                                        <ListItem>
                                            <ListIcon as={FaCheck} color="#0a7450" />
                                            Private air-conditioned transportation
                                        </ListItem>
                                        <ListItem>
                                            <ListIcon as={FaCheck} color="#0a7450" />
                                            Dedicated multilingual guide
                                        </ListItem>
                                        <ListItem>
                                            <ListIcon as={FaCheck} color="#0a7450" />
                                            Prayer mat and Ihram
                                        </ListItem>
                                    </Grid>
                                </List>
                                <Flex w="full" gap={2} direction={{ base: 'column', md: 'row' }}>
                                    <Button bg="#0a7450" color="white" w={{ base: 'full', md: '85%' }} size={{ base: 'sm', md: 'md' }}>
                                        $ Book Now
                                    </Button>
                                    <Button variant="outline" w={{ base: 'full', md: '15%' }} size={{ base: 'sm', md: 'md' }}>
                                        View Details
                                    </Button>
                                </Flex>
                            </Box>
                            <Grid
                                templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "2fr 2fr" }}
                                gap={4}
                                mt={4}
                                shadow={'md'}
                            >
                                <GridItem
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    p={4}
                                    bg="white"
                                    shadow="sm"
                                >
                                    <Text fontWeight="bold" mb={2} fontSize={{ base: 'md', md: 'lg' }}>
                                        Location & Contact
                                    </Text>
                                    <Text fontSize={{ base: 'xs', md: 'sm' }}>
                                        <b>Address:</b> {agent.address}
                                    </Text>
                                    <Text fontSize={{ base: 'xs', md: 'sm' }} mt={2}>
                                        <b>Phone:</b> {agent.phone}
                                    </Text>
                                    <Text fontSize={{ base: 'xs', md: 'sm' }} mt={2}>
                                        <b>Email:</b> {agent.email}
                                    </Text>
                                    <Link
                                        href="https://alharamaintours.com"
                                        color="blue.500"
                                        fontSize={{ base: 'xs', md: 'sm' }}
                                        mt={2}
                                        display="block"
                                    >
                                        <b>Website:</b> {agent.website}
                                    </Link>
                                </GridItem>
                                <GridItem
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    p={4}
                                    bg="white"
                                    shadow="sm"
                                >
                                    <Text fontWeight="bold" mb={2} fontSize={{ base: 'md', md: 'lg' }}>
                                        Business Details
                                    </Text>
                                    <Text fontSize={{ base: 'xs', md: 'sm' }}>
                                        <b>Established:</b> {agent.establishmentYear}
                                    </Text>
                                    <Text fontSize={{ base: 'xs', md: 'sm' }} mt={2}>
                                        <b>Languages Spoken:</b>
                                    </Text>
                                    <Flex gap={2} mt={1} flexWrap="wrap">
                                        {
                                            agent?.languages?.map((item, i) => {
                                                return (
                                                    <Tag size={{ base: 'sm', md: 'md' }} key={i}>{item}</Tag>
                                                )
                                            })
                                        }
                                    </Flex>
                                    {/* <Text fontSize={{ base: 'xs', md: 'sm' }} mt={3}>
                                        <b>Total Reviews:</b> 1247 customer reviews
                                    </Text> */}
                                </GridItem>
                            </Grid>
                            <Box
                                borderWidth="1px"
                                borderRadius="lg"
                                p={4}
                                mt={4}
                                bg="white"
                                shadow="md"
                            >
                                <Text fontWeight="bold" mb={2} fontSize={{ base: 'md', md: 'lg' }}>
                                    Social Media
                                </Text>
                                <Flex gap={4} fontSize={{ base: 'lg', md: 'xl' }}>
                                    {agent.facebook && (
                                        <Link href={agent.facebook} target='_blank' aria-label="Facebook">
                                            <Icon as={FaFacebook} color="blue.600" boxSize={{ base: 5, md: 6 }} />
                                        </Link>
                                    )}
                                    {agent.twitter && (
                                        <Link href={agent.twitter} target='_blank' aria-label="Twitter">
                                            <Icon as={FaTwitter} color="blue.400" boxSize={{ base: 5, md: 6 }} />
                                        </Link>
                                    )}
                                    {agent.instagram && (
                                        <Link href={agent.instagram} target='_blank' aria-label="Instagram">
                                            <Icon as={FaInstagram} color="pink.500" boxSize={{ base: 5, md: 6 }} />
                                        </Link>
                                    )}
                                    {agent.youtube && (
                                        <Link href={agent.youtube} target='_blank' aria-label="YouTube">
                                            <Icon as={FaYoutube} color="red.500" boxSize={{ base: 5, md: 6 }} />
                                        </Link>
                                    )}
                                </Flex>
                                <Text>
                                    {
                                        !agent.twitter && !agent.facebook && !agent.instagram &&
                                        !agent.youtube && 'No data found'}
                                </Text>
                            </Box>
                        </Box>
                        <Box flex={{ base: 'none', md: 1 }} p={4} bg="gray.50" gap={4} w={{ base: 'full', md: 'auto' }}>
                            <Box borderRadius="md" border={"1px solid green"} p={4}>
                                <Text fontWeight="bold" mb={2} fontSize={{ base: 'md', md: 'lg' }}>Contact Information</Text>
                                <Flex align="center" mb={2}>
                                    <Icon as={FaPhone} color="#0a7450" boxSize={{ base: 4, md: 5 }} mr={2} />
                                    <Text fontSize={{ base: 'xs', md: 'sm' }}>{agent.phone}</Text>
                                </Flex>
                                <Flex align="center" mb={2}>
                                    <Icon as={FaEnvelope} color="#0a7450" boxSize={{ base: 4, md: 5 }} mr={2} />
                                    <Text fontSize={{ base: 'xs', md: 'sm' }}>{agent.email}</Text>
                                </Flex>
                                <Flex align="center" mb={2}>
                                    <Icon as={FaMapMarkerAlt} color="#0a7450" boxSize={{ base: 4, md: 5 }} mr={2} />
                                    <Text fontSize={{ base: 'xs', md: 'sm' }}>{agent.address}</Text>
                                </Flex>
                                <Button
                                    as={Link}
                                    href={`tel:${agent.phone}`} target="_blank"

                                    bg="#0a7450" color={'white'} leftIcon={<Icon as={MdCall} boxSize={{ base: 4, md: 5 }} />} mb={4} w="full" size={{ base: 'sm', md: 'md' }}>
                                    Call Now
                                </Button>
                            </Box>
                            <Box borderRadius="md" border={"1px solid green"} p={4} mt={4}>
                                <Box borderRadius="md" boxShadow="sm">
                                    <Text fontWeight="bold" mb={2} fontSize={{ base: 'md', md: 'lg' }}>Send Message</Text>
                                    <Input placeholder="Name *" mb={2} size={{ base: 'sm', md: 'md' }} />
                                    <Input placeholder="Email *" mb={2} size={{ base: 'sm', md: 'md' }} />
                                    <Input placeholder="Phone" mb={2} size={{ base: 'sm', md: 'md' }} />
                                    <Textarea placeholder="Message * Tell us about your requirements..." mb={2} size={{ base: 'sm', md: 'md' }} />
                                    <Button bg="#0a7450" color={'white'} leftIcon={<Icon as={IoMdMail} boxSize={{ base: 4, md: 5 }} />} w="full" size={{ base: 'sm', md: 'md' }}>
                                        Send
                                    </Button>
                                </Box>
                            </Box>
                            <Box mt={4}>
                                <Text fontWeight="bold" textAlign={'center'} fontSize={{ base: 'md', md: 'lg' }} mb={4}>
                                    Frequently Asked Questions
                                </Text>
                                <Accordion allowToggle>
                                    <AccordionItem bg="white" borderRadius="md" mb={2} py={2} shadow={'md'}>
                                        <h2>
                                            <AccordionButton>
                                                <Box flex="1" textAlign="left" fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'md' }}>
                                                    What documents do I need for Umrah?
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4} fontSize={{ base: 'xs', md: 'sm' }}>
                                            You typically need a valid passport, visa, vaccination certificate, and travel documents.
                                        </AccordionPanel>
                                    </AccordionItem>
                                    <AccordionItem bg="white" borderRadius="md" mb={2} py={2} shadow={'md'}>
                                        <h2>
                                            <AccordionButton>
                                                <Box flex="1" textAlign="left" fontWeight={'semibold'} fontSize={{ base: 'sm', md: 'md' }}>
                                                    Is accommodation included in packages?
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4} fontSize={{ base: 'xs', md: 'sm' }}>
                                            Yes, most packages include hotel accommodation. Details depend on the selected package.
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </Box>
                            <Box
                                borderWidth="1px"
                                borderRadius="lg"
                                p={4}
                                mt={4}
                                bg="white"
                                shadow="md"
                            >
                                <Flex justify="space-between" align="center" mb={4}>
                                    <Text fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }}>Customer Reviews</Text>
                                    <Flex align="center" gap={2}>
                                        <Icon as={FaStar} color="gold" boxSize={{ base: 4, md: 5 }} />
                                        <Text fontWeight="bold" fontSize={{ base: 'sm', md: 'md' }}>{agent.rating}</Text>
                                        {/* <Text fontSize={{ base: 'xs', md: 'sm' }}>({} reviews)</Text> */}
                                    </Flex>
                                </Flex>
                                {/* Review 1 */}
                                <Box mb={4}>
                                    <Flex align="center" gap={2}>
                                        <Avatar size={{ base: 'xs', md: 'sm' }} name="Ahmed Hassan" />
                                        <Text fontWeight="bold" fontSize={{ base: 'xs', md: 'sm' }}>
                                            Ahmed Hassan{' '}
                                            <Tag size={{ base: 'sm', md: 'md' }} colorScheme="green" ml={1}>
                                                Verified
                                            </Tag>
                                        </Text>
                                    </Flex>
                                    <Text fontSize={{ base: '2xs', md: 'xs' }} color="gray.500">
                                        2024-05-15
                                    </Text>
                                    <Text fontSize={{ base: 'xs', md: 'sm' }} mt={1}>
                                        ⭐⭐⭐⭐⭐ Excellent service! The team was very professional. Highly recommended!
                                    </Text>
                                </Box>
                                <Divider />
                                {/* Review 2 */}
                                <Box my={4}>
                                    <Flex align="center" gap={2}>
                                        <Avatar size={{ base: 'xs', md: 'sm' }} name="Fatima Al-Zahra" />
                                        <Text fontWeight="bold" fontSize={{ base: 'xs', md: 'sm' }}>
                                            Fatima Al-Zahra{' '}
                                            <Tag size={{ base: 'sm', md: 'md' }} colorScheme="green" ml={1}>
                                                Verified
                                            </Tag>
                                        </Text>
                                    </Flex>
                                    <Text fontSize={{ base: '2xs', md: 'xs' }} color="gray.500">
                                        2024-04-10
                                    </Text>
                                    <Text fontSize={{ base: 'xs', md: 'sm' }} mt={1}>
                                        ⭐⭐⭐⭐ Good experience overall. The accommodation was good. Would use again.
                                    </Text>
                                </Box>
                                <Divider />
                                {/* Review 3 */}
                                <Box mt={4}>
                                    <Flex align="center" gap={2}>
                                        <Avatar size={{ base: 'xs', md: 'sm' }} name="Mohammad Ali" />
                                        <Text fontWeight="bold" fontSize={{ base: 'xs', md: 'sm' }}>
                                            Mohammad Ali
                                        </Text>
                                    </Flex>
                                    <Text fontSize={{ base: '2xs', md: 'xs' }} color="gray.500">
                                        2024-04-05
                                    </Text>
                                    <Text fontSize={{ base: 'xs', md: 'sm' }} mt={1}>
                                        ⭐⭐⭐⭐⭐ Outstanding service from start to finish, helpful throughout the journey.
                                    </Text>
                                </Box>
                            </Box>
                        </Box>
                    </Flex>
                </VStack>
            </Box>
        </Box>
    );
};

export default HajjAndUmrah;