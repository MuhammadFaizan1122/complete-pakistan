'use client'
import { HeroSection } from './HeroSection'

import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Grid,
    GridItem,
    Text,
    Heading,
    Button,
    VStack,
    HStack,
    Icon,
    IconButton,
    Flex,
    Circle,
    useColorModeValue,
    Card,
    CardBody, InputGroup,
    InputLeftElement,
    Input,
    Textarea,
} from '@chakra-ui/react';
import { MdWorkOutline, MdLocationOn, MdAccessTime } from 'react-icons/md';
import { BiTime, BiMoney } from 'react-icons/bi';
import Image from 'next/image';
import {
    FiUser,
    FiMail,
    FiPhone,
    FiMessageSquare
} from 'react-icons/fi'
import { useParams } from 'next/navigation';
import { getTimeAgo } from '../Jobs/Jobs';

const Jobs = () => {
    const params = useParams()
    const cardBg = useColorModeValue('white', 'gray.800');
    const jobsData = [
        {
            id: 1,
            title: 'Corporate Tactics Facilitator',
            company: 'Google',
            timeAgo: '26 min ago',
            industry: 'Commerce',
            type: 'Full time',
            salary: '$38000-$40000',
            location: 'Dhaka, Bangladesh',
            jobType: 'PART-TIME',
            colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'] // Google colors
        },
        {
            id: 2,
            title: 'Interaction Designer',
            company: 'Meta',
            timeAgo: '26 min ago',
            industry: 'Commerce',
            type: 'Full time',
            salary: '$38000-$40000',
            location: 'Dhaka, Bangladesh',
            jobType: 'PART-TIME',
            colors: ['#1877F2', '#42B883', '#FF6B6B', '#4ECDC4'] // Meta colors
        },
        {
            id: 3,
            title: 'Corporate Tactics Facilitator',
            company: 'Microsoft',
            timeAgo: '26 min ago',
            industry: 'Commerce',
            type: 'Full time',
            salary: '$38000-$40000',
            location: 'Dhaka, Bangladesh',
            jobType: 'PART-TIME',
            colors: ['#00BCF2', '#FFB900', '#F25022', '#7FBA00']
        },
        {
            id: 4,
            title: 'Corporate Tactics Facilitator',
            company: 'Apple',
            timeAgo: '26 min ago',
            industry: 'Commerce',
            type: 'Full time',
            salary: '$38000-$40000',
            location: 'Dhaka, Bangladesh',
            jobType: 'PART-TIME',
            colors: ['#007AFF', '#34C759', '#FF9500', '#FF3B30']
        },
        {
            id: 5,
            title: 'Interaction Designer',
            company: 'Amazon',
            timeAgo: '26 min ago',
            industry: 'Commerce',
            type: 'Full time',
            salary: '$38000-$40000',
            location: 'Dhaka, Bangladesh',
            jobType: 'PART-TIME',
            colors: ['#FF9900', '#232F3E', '#146EB4', '#FF6B6B']
        },
        {
            id: 6,
            title: 'Corporate Tactics Facilitator',
            company: 'Netflix',
            timeAgo: '26 min ago',
            industry: 'Commerce',
            type: 'Full time',
            salary: '$38000-$40000',
            location: 'Dhaka, Bangladesh',
            jobType: 'PART-TIME',
            colors: ['#E50914', '#221F1F', '#F5F5F1', '#564D4D']
        }
    ];
    const CompanyAvatar = ({ colors, company }) => (
        <Box position="relative" w="40px" h="40px">
            <Box
                w="40px"
                h="40px"
                borderRadius="full"
                position="relative"
                overflow="hidden"
            >
                {colors.map((color, index) => (
                    <Box
                        key={index}
                        position="absolute"
                        w="20px"
                        h="20px"
                        bg={color}
                        top={index < 2 ? 0 : '20px'}
                        left={index % 2 === 0 ? 0 : '20px'}
                    />
                ))}
            </Box>
        </Box>
    );
    const ListJobCard = ({ job, index }) => (
        <Card
            key={index}
            bg={'#fff'}
            shadow="sm"
            rounded={'20px'}
            _hover={{ shadow: 'md' }}
            transition="all 0.2s"
        >
            <CardBody p={6}>
                <Flex direction="column" gap={4}>
                    <Flex justify="space-between" align="center">
                        <Box bg={'#3096891A'} px={3} py={1} borderRadius="md">
                            <Text fontSize="16px" color="gray.500">
                                {job.timeAgo}
                            </Text>
                        </Box>
                        <IconButton
                            icon={
                                <Image src={`/Images/Icons/bookmark.png`} alt="icon" width={24} height={24} />
                            }
                            variant="ghost"
                            size="16px"
                            // onClick={() => toggleBookmark(job.id)}
                            aria-label="Bookmark job"
                        />
                    </Flex>

                    <Flex gap={3} align="flex-start">
                        <CompanyAvatar colors={job.colors} company={job.company} />
                        <VStack align="flex-start" spacing={1} flex={1}>
                            <Heading size="md" color="gray.800" fontWeight="semibold">
                                {job.title}
                            </Heading>
                            <Text color="gray.600" fontSize="sm">
                                {job.company}
                            </Text>
                        </VStack>
                    </Flex>

                    <Flex
                        justify="space-between"
                        align="center"
                        direction={{ base: 'column', lg: 'row' }}
                        gap={4}
                    >
                        <HStack
                            spacing={6}
                            wrap="wrap"
                            align="center"
                        >
                            <HStack spacing={2}>
                                <Image src={`/Images/Icons/briefcase.png`} alt="icon" width={24} height={24} />
                                <Text fontSize="sm" color="gray.600">
                                    {job.industry}
                                </Text>
                            </HStack>

                            <HStack spacing={2}>
                                <Image src={`/Images/Icons/clock.png`} alt="icon" width={24} height={24} />
                                <Text fontSize="sm" color="gray.600">
                                    {job.type}
                                </Text>
                            </HStack>

                            <HStack spacing={2}>
                                <Image src={`/Images/Icons/wallet.png`} alt="icon" width={24} height={24} />
                                <Text fontSize="sm" color="gray.600">
                                    {job.salary}
                                </Text>
                            </HStack>

                            <HStack spacing={2}>
                                <Image src={`/Images/Icons/location.png`} alt="icon" width={24} height={24} />
                                <Text fontSize="sm" color="gray.600">
                                    {job.location}
                                </Text>
                            </HStack>
                        </HStack>

                        <Button
                            bg={'#309689'}
                            color={'white'}
                            size="md"
                            px={6}
                            rounded={'8px'}
                            flexShrink={0}
                        >
                            Job Details
                        </Button>
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    );
    const [job, setJob] = useState([])
    useEffect(() => {
        const storedJobs = JSON.parse(localStorage.getItem('jobs') || '[]');

        if (!params?.id) {
            console.warn('Missing job ID in params');
            return;
        }

        const matchedJob = storedJobs.find((e) => e.id == params.id);

        if (matchedJob) {
            setJob(matchedJob);
        } else {
            console.warn('Job not found with ID:', params.id);
        }

        // Debug logs
        console.log('Matched Job:', matchedJob);
        console.log('All Jobs:', storedJobs);
        console.log('Params:', params);
    }, [params?.id]);

    return (
        <Box >
            <HeroSection />
            <Box bg={'#3096891A'} minH="100vh">
                <Container maxW={{ base: '100%', sm: 'container.sm', md: 'container.md', lg: '1440px' }} py={{ base: 10, md: 20 }}>
                    <Box bg={'transparent'} mb={6}>
                        <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
                            <Text
                                fontSize={{ base: 'sm', md: 'md' }}
                                bg={'#3096891A'}
                                color="#309689"
                                rounded={'12px'}
                                px={{ base: '8px', md: '10px' }}
                                py={'2px'}
                            >
                                {getTimeAgo(job.createdAt)}
                            </Text>
                            <Image
                                src={`/Images/Icons/bookmark.png`}
                                alt="icon"
                                width={24}
                                height={24}
                            />
                        </Flex>

                        <HStack spacing={{ base: 3, md: 4 }} mb={{ base: 6, md: 8 }} align="start">
                            <Circle
                                size={{ base: '48px', md: '64px' }}
                                bg="linear-gradient(135deg, #4ADE80, #3B82F6, #8B5CF6)"
                                flexShrink={0}
                            >
                                <Circle size={{ base: '36px', md: '48px' }} bg="white">
                                    <Circle size={{ base: '24px', md: '32px' }} bg="linear-gradient(135deg, #4ADE80, #3B82F6, #8B5CF6)" />
                                </Circle>
                            </Circle>
                            <VStack align="start" spacing={2} flex={1}>
                                <Text
                                    fontSize={{ base: '24px', sm: '32px', md: '40px' }}
                                    color="black"
                                    lineHeight="shorter"
                                    fontWeight="bold"
                                >
                                    {job.jobTitle}
                                </Text>
                                <Text fontSize={{ base: '14px', md: '16px' }} color="black" fontWeight={'semibold'}>
                                    {job.companyName}
                                </Text>
                            </VStack>
                        </HStack>
                        <Flex
                            justify="space-between"
                            alignItems={{ base: 'stretch', md: 'end' }}
                            mb={{ base: 8, md: 16 }}
                            flexWrap="wrap"
                            gap={4}
                        >
                            <Flex wrap="wrap" gap={{ base: 4, md: 6 }} direction={{ base: 'column', sm: 'row' }}>
                                <HStack spacing={2} color="gray.600">
                                    <Image
                                        src={`/Images/Icons/briefcase.png`}
                                        alt="icon"
                                        width={24}
                                        height={24}
                                    />
                                    <Text fontSize={{ base: '14px', md: '16px' }} color={'gray.600'}>
                                        {job.industry}
                                    </Text>
                                </HStack>
                                <HStack spacing={2} color="gray.600">
                                    <Image
                                        src={`/Images/Icons/clock.png`}
                                        alt="icon"
                                        width={24}
                                        height={24}
                                    />
                                    <Text fontSize={{ base: '14px', md: '16px' }} color={'gray.600'}>
                                        {job.jobType}
                                    </Text>
                                </HStack>
                                <HStack spacing={2} color="gray.600">
                                    <Image
                                        src={`/Images/Icons/wallet.png`}
                                        alt="icon"
                                        width={24}
                                        height={24}
                                    />
                                    <Text fontSize={{ base: '14px', md: '16px' }} color={'gray.600'}>
                                        {"$" + job.salaryMin + " - $" + job.salaryMax}
                                    </Text>
                                </HStack>
                                <HStack spacing={2} color="gray.600">
                                    <Image
                                        src={`/Images/Icons/location.png`}
                                        alt="icon"
                                        width={24}
                                        height={24}
                                    />
                                    <Text fontSize={{ base: '14px', md: '16px' }} color={'gray.600'}>
                                        {job.state + ", " + job.country}
                                    </Text>
                                </HStack>
                            </Flex>
                            <Button
                                bg="#309689"
                                color="white"
                                _hover={{ bg: '#309689' }}
                                px={{ base: 6, md: 8 }}
                                py={{ base: 4, md: 6 }}
                                borderRadius="xl"
                                fontWeight="medium"
                                size="lg"
                                w={{ base: 'full', sm: '250px', md: '300px' }}
                            >
                                Apply Job
                            </Button>
                        </Flex>
                    </Box>
                    <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr' }} gap={{ base: 6, md: 8 }}>
                        <GridItem>
                            <Box mb={6}>
                                <Heading as="h2" size={{ base: 'md', md: 'lg' }} color="gray.900" mb={6}>
                                    Job Description
                                </Heading>
                                <VStack spacing={4} align="start" color="gray.600" lineHeight="relaxed">
                                    <Text fontSize={{ base: '14px', md: '16px' }}>
                                        {job.jobDescription}
                                    </Text>
                                </VStack>
                            </Box>
                            <Box mb={6}>
                                <Heading as="h2" size={{ base: 'md', md: 'lg' }} color="gray.900" mb={6}>
                                    Key Responsibilities
                                </Heading>
                                <VStack spacing={4} align="start">
                                    {job.keyResponsibilities?.map((responsibility, index) => (
                                        <HStack key={index} spacing={3} align="start">
                                            <Icon as={FaCheck} w={{ base: 3, md: 4 }} h={{ base: 3, md: 4 }} color="#309689" mt={1} flexShrink={0} />
                                            <Text fontSize={{ base: '14px', md: '16px' }} color="gray.600">{responsibility}</Text>
                                        </HStack>
                                    ))}
                                </VStack>
                            </Box>
                            <Box mb={6}>
                                <Heading as="h2" size={{ base: 'md', md: 'lg' }} color="gray.900" mb={6}>
                                    Professional Skills
                                </Heading>
                                <VStack spacing={4} align="start">
                                    {[
                                        "Et nunc ut tempus duis nisl sed massa. Ornare varius faucibus nisl vitae vitae cras ornare.",
                                        "Ornare varius faucibus nisl vitae vitae cras ornare",
                                        "Tortor amet porta proin in. Orci imperdiet nisl dignissim pellentesque morbi vitae",
                                        "Tortor amet porta proin in. Orci imperdiet nisl dignissim pellentesque morbi vitae"
                                    ].map((skill, index) => (
                                        <HStack key={index} spacing={3} align="start">
                                            <Icon as={FaCheck} w={{ base: 3, md: 4 }} h={{ base: 3, md: 4 }} color="#309689" mt={1} flexShrink={0} />
                                            <Text fontSize={{ base: '14px', md: '16px' }} color="gray.600">{skill}</Text>
                                        </HStack>
                                    ))}
                                </VStack>
                            </Box>
                            <Box mb={6}>
                                <Heading as="h2" size={{ base: 'md', md: 'lg' }} color="gray.900" mb={6}>
                                    Tags
                                </Heading>
                                <VStack spacing={4} align="start">
                                    <Flex justifyContent="start" gap={2} alignItems="center" flexWrap="wrap">
                                        {["Fulltime", "New York", "Ecommerce", "corporate", "Location"].map((tag, index) => (
                                            <Text
                                                key={index}
                                                fontSize={{ base: 'sm', md: 'md' }}
                                                bg={'#3096891A'}
                                                color="#309689"
                                                rounded={'12px'}
                                                px={{ base: '8px', md: '10px' }}
                                                py={'2px'}
                                            >
                                                {tag}
                                            </Text>
                                        ))}
                                    </Flex>
                                </VStack>
                            </Box>
                            <Box display="flex" alignItems="center" mt={6}>
                                <Heading as="h2" size={{ base: 'md', md: 'lg' }} color="gray.900">
                                    Share Job:
                                </Heading>
                                <HStack spacing={4} align="start" ml={4}>
                                    <Flex justifyContent="start" gap={{ base: 4, md: 6 }} alignItems="center">
                                        <Image
                                            src={`/Images/Icons/fb.png`}
                                            alt="icon"
                                            width={24}
                                            height={24}
                                        />
                                        <Image
                                            src={`/Images/Icons/x.png`}
                                            alt="icon"
                                            width={24}
                                            height={24}
                                        />
                                        <Image
                                            src={`/Images/Icons/linkedin.png`}
                                            alt="icon"
                                            width={24}
                                            height={24}
                                        />
                                    </Flex>
                                </HStack>
                            </Box>
                            <Box>
                                <Text
                                    fontSize={{ base: '32px', sm: '40px', md: '50px' }}
                                    my={4}
                                    color="black"
                                    fontWeight="bold"
                                >
                                    Related Jobs
                                </Text>
                                <Text fontSize={{ base: '14px', md: '16px' }} color="black">
                                    At eu lobortis pretium tincidunt amet lacus ut aenean aliquet
                                </Text>
                            </Box>
                            <VStack spacing={{ base: 4, md: 6 }} align="stretch" mt={6}>
                                {jobsData.map((job, index) => (
                                    <ListJobCard key={job.id} job={job} index={index} />
                                ))}
                            </VStack>
                        </GridItem>
                        <GridItem>
                            <Box
                                bg={'white'}
                                borderRadius="2xl"
                                shadow="sm"
                                border="1px"
                                borderColor="gray.100"
                                p={{ base: 4, md: 6 }}
                                mb={6}
                            >
                                <Heading as="h3" size={{ base: 'sm', md: 'md' }} color="gray.900" mb={6}>
                                    Job Overview
                                </Heading>
                                <VStack spacing={5} align="start">
                                    {[
                                        { icon: '/Images/Icons/user.png', label: "Job Title", value: "Corporate Solutions Executive" },
                                        { icon: '/Images/Icons/clock.png', label: "Job Type", value: "Full Time" },
                                        { icon: '/Images/Icons/briefcase.png', label: "Category", value: "Commerce" },
                                        { icon: '/Images/Icons/expertise.png', label: "Experience", value: "5 Years" },
                                        { icon: '/Images/Icons/cap.png', label: "Degree", value: "Master" },
                                        { icon: '/Images/Icons/wallet.png', label: "Offered Salary", value: "$40000-$42000" },
                                        { icon: '/Images/Icons/location.png', label: "Location", value: "New-York, USA" }
                                    ].map((item, index) => (
                                        <HStack key={index} spacing={3} align="start">
                                            <Box borderRadius="lg" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                                                <Image
                                                    src={item.icon}
                                                    alt="icon"
                                                    width={24}
                                                    height={24}
                                                />
                                            </Box>
                                            <VStack align="start" spacing={1}>
                                                <Text fontSize={{ base: '14px', md: '16px' }} fontWeight={'semibold'} color="black">
                                                    {item.label}
                                                </Text>
                                                <Text fontSize={{ base: '14px', md: '16px' }} color="gray.600">
                                                    {item.value}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    ))}
                                </VStack>
                                <Box
                                    w="full"
                                    h={{ base: '48', md: '64' }}
                                    mt={8}
                                    bg="gray.100"
                                    borderRadius="xl"
                                    position="relative"
                                    overflow="hidden"
                                    bgGradient="linear(to-br, green.50, blue.50, gray.100)"
                                >
                                    <Circle
                                        size={{ base: '24px', md: '32px' }}
                                        bg="#309689"
                                        color="white"
                                        position="absolute"
                                        top="50%"
                                        left="50%"
                                        transform="translate(-50%, -50%)"
                                        shadow="lg"
                                    >
                                        <Icon as={MdLocationOn} w={{ base: 4, md: 5 }} h={{ base: 4, md: 5 }} />
                                    </Circle>
                                    <VStack position="absolute" top={4} left={4} align="start" spacing={1}>
                                        <Text fontSize={{ base: '2xs', md: 'xs' }} color="gray.500" fontWeight="medium">CRYSTAL</Text>
                                        <Text fontSize={{ base: '2xs', md: 'xs' }} color="gray.500" fontWeight="medium">BROOKLYN</Text>
                                    </VStack>
                                    <VStack position="absolute" top={4} right={4} align="end" spacing={1}>
                                        <Text fontSize={{ base: '2xs', md: 'xs' }} color="gray.500" fontWeight="medium">MANHATTAN PLAZA</Text>
                                        <Text fontSize={{ base: '2xs', md: 'xs' }} color="gray.500" fontWeight="medium">BUSINESS PARK</Text>
                                    </VStack>
                                    <VStack position="absolute" bottom={4} left={4} align="start" spacing={1}>
                                        <Text fontSize={{ base: '2xs', md: 'xs' }} color="gray.500" fontWeight="medium">NEW TOWN</Text>
                                        <Text fontSize={{ base: '2xs', md: 'xs' }} color="gray.500" fontWeight="medium">PARK PLAZA</Text>
                                    </VStack>
                                    <VStack position="absolute" bottom={4} right={4} align="end" spacing={1}>
                                        <Text fontSize={{ base: '2xs', md: 'xs' }} color="gray.500" fontWeight="medium">DOWNTOWN</Text>
                                        <Text fontSize={{ base: '2xs', md: 'xs' }} color="gray.500" fontWeight="medium">FINANCIAL DISTRICT</Text>
                                    </VStack>
                                    <Box position="absolute" inset={0} opacity={0.2}>
                                        <Grid templateColumns="repeat(8, 1fr)" templateRows="repeat(6, 1fr)" h="full" w="full">
                                            {Array.from({ length: 48 }).map((_, i) => (
                                                <GridItem key={i} border="1px" borderColor="gray.300" />
                                            ))}
                                        </Grid>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                maxW="md"
                                mx="auto"
                                p={{ base: 4, md: 8 }}
                                borderRadius="xl"
                                boxShadow="sm"
                            >
                                <Text
                                    fontSize={{ base: 'xl', md: '2xl' }}
                                    fontWeight="bold"
                                    mb={6}
                                    color="gray.800"
                                >
                                    Send Us Message
                                </Text>
                                <VStack spacing={4} align="stretch">
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none">
                                            <FiUser color="gray.400" />
                                        </InputLeftElement>
                                        <Input
                                            placeholder="Full name"
                                            bg="white"
                                            border="none"
                                            borderRadius="lg"
                                            _placeholder={{ color: 'gray.400', fontSize: { base: 'sm', md: 'md' } }}
                                            _focus={{
                                                boxShadow: '0 0 0 1px #3182ce',
                                                borderColor: 'blue.500'
                                            }}
                                            fontSize={{ base: 'sm', md: 'md' }}
                                        />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none">
                                            <FiMail color="gray.400" />
                                        </InputLeftElement>
                                        <Input
                                            type="email"
                                            placeholder="Email Address"
                                            bg="white"
                                            border="none"
                                            borderRadius="lg"
                                            _placeholder={{ color: 'gray.400', fontSize: { base: 'sm', md: 'md' } }}
                                            _focus={{
                                                boxShadow: '0 0 0 1px #3182ce',
                                                borderColor: 'blue.500'
                                            }}
                                            fontSize={{ base: 'sm', md: 'md' }}
                                        />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none">
                                            <FiPhone color="gray.400" />
                                        </InputLeftElement>
                                        <Input
                                            type="tel"
                                            placeholder="Phone Number"
                                            bg="white"
                                            border="none"
                                            borderRadius="lg"
                                            _placeholder={{ color: 'gray.400', fontSize: { base: 'sm', md: 'md' } }}
                                            _focus={{
                                                boxShadow: '0 0 0 1px #3182ce',
                                                borderColor: 'blue.500'
                                            }}
                                            fontSize={{ base: 'sm', md: 'md' }}
                                        />
                                    </InputGroup>
                                    <Box position="relative">
                                        <Box
                                            position="absolute"
                                            left={3}
                                            top={3}
                                            zIndex={1}
                                        >
                                            <FiMessageSquare color="gray.400" />
                                        </Box>
                                        <Textarea
                                            placeholder="Your Message"
                                            bg="white"
                                            border="none"
                                            borderRadius="lg"
                                            pl={10}
                                            minH={{ base: '100px', md: '120px' }}
                                            resize="vertical"
                                            _placeholder={{ color: 'gray.400', fontSize: { base: 'sm', md: 'md' } }}
                                            _focus={{
                                                boxShadow: '0 0 0 1px #3182ce',
                                                borderColor: 'blue.500'
                                            }}
                                            fontSize={{ base: 'sm', md: 'md' }}
                                        />
                                    </Box>
                                    <Button
                                        bg="#309689"
                                        color="white"
                                        size="lg"
                                        borderRadius="lg"
                                        _hover={{ bg: '#309689' }}
                                        _active={{ bg: '#309689' }}
                                        mt={2}
                                        fontSize={{ base: 'sm', md: 'md' }}
                                    >
                                        Send Message
                                    </Button>
                                </VStack>
                            </Box>
                        </GridItem>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}

export default Jobs;