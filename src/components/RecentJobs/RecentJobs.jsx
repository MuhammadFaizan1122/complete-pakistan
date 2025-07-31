'use client'
import React from 'react'
import { HeroSection } from '../HomePage/HeroSection'
import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Card,
    CardBody,
    Button,
    Select,
    Flex,
    IconButton,
    SimpleGrid,
    Badge,
} from '@chakra-ui/react';
import { useState } from 'react';
import Image from 'next/image';

const RecentJobs = () => {
    const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
    const [sortBy, setSortBy] = useState('latest');

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
            colors: ['#00BCF2', '#FFB900', '#F25022', '#7FBA00'] // Microsoft colors
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
            colors: ['#007AFF', '#34C759', '#FF9500', '#FF3B30'] // Apple colors
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
            colors: ['#FF9900', '#232F3E', '#146EB4', '#FF6B6B'] // Amazon colors
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
            colors: ['#E50914', '#221F1F', '#F5F5F1', '#564D4D'] // Netflix colors
        }
    ];

    const toggleBookmark = (jobId) => {
        const newBookmarked = new Set(bookmarkedJobs);
        if (newBookmarked.has(jobId)) {
            newBookmarked.delete(jobId);
        } else {
            newBookmarked.add(jobId);
        }
        setBookmarkedJobs(newBookmarked);
    };

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

    const handleSortChange = (e) => {
        const value = e.target.value;
        if (value === 'grid-view' || value === 'list-view') {
            setViewMode(value === 'grid-view' ? 'grid' : 'list');
        } else {
            setSortBy(value);
        }
    };

    // Grid Card Component
    const GridJobCard = ({ job, index }) => (
        <Card
            key={index}
            bg={'#fff'}
            shadow="sm"
            border="1px"
            rounded={'20px'}
            borderColor="gray.200"
            _hover={{ shadow: 'md' }}
            transition="all 0.2s"
            h="fit-content"
        >
            <CardBody p={6}>
                <VStack spacing={4} align="stretch">
                    <Box bg={'#0a74501A'} px={3} py={1} borderRadius="md" w={'110px'} mx={'auto'} textAlign={'center'}>
                        <Text fontSize="16px" color="black">
                            {job.timeAgo}
                        </Text>
                    </Box>
                    {/* Header */}
                    <Flex justify="space-between" align="center">
                        <Flex spacing={3}>
                            <CompanyAvatar colors={job.colors} company={job.company} />
                            <Box spacing={1} textAlign="left" ml={4}>
                                <Heading size="16px" color="black" fontWeight="semibold">
                                    {job.title}
                                </Heading>
                                <HStack spacing={2} justify="left">
                                    <Image src={`/Images/Icons/location.png`} alt="icon" width={16} height={16} />
                                    <Text fontSize="14px" color="#767F8C">
                                        {job.location}
                                    </Text>
                                </HStack>
                            </Box>
                        </Flex>
                        <IconButton
                            icon={
                                <Image src={`/Images/Icons/bookmark.png`} alt="icon" width={20} height={20} />
                            }
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleBookmark(job.id)}
                            aria-label="Bookmark job"
                        />
                    </Flex>

                    {/* Job Type Badge */}
                    <Flex alignItems={'center'} gap={2}>
                        <Badge
                            bg={'#E7F6EA'}
                            variant="subtle"
                            px={3}
                            py={1}
                            borderRadius="md"
                            fontSize="12px"
                            color={'#0BA02C'}
                            textTransform={'uppercase'}
                        >
                            {job.jobType}
                        </Badge>
                        {/* Salary */}
                        <Text textAlign="center" color="#767F8C" fontWeight="medium" fontSize="14px">
                            Salary: {job.salary}
                        </Text>
                    </Flex>

                    {/* Job Details */}
                    <HStack spacing={2}>
                        <HStack spacing={2} justify="center">
                            <Image src={`/Images/Icons/briefcase.png`} alt="icon" width={21} height={21} />
                            <Text fontSize="14px" color="gray.600" fontWeight={'semibold'}>
                                {job.industry}
                            </Text>
                        </HStack>

                        <HStack spacing={2} justify="center">
                            <Image src={`/Images/Icons/clock.png`} alt="icon" width={21} height={21} />
                            <Text fontSize="14px" color="gray.600" fontWeight={'semibold'}>
                                {job.type}
                            </Text>
                        </HStack>

                        <HStack spacing={2} justify="center">
                            <Image src={`/Images/Icons/wallet.png`} alt="icon" width={21} height={21} />
                            <Text fontSize="14px" color="gray.600" fontWeight={'semibold'}>
                                {job.salary}
                            </Text>
                        </HStack>
                    </HStack>

                    {/* Job Details Button */}
                    <Button
                        bg={'#0a7450'}
                        color={'white'}
                        size="md"
                        w="120px"
                        mx={`auto`}
                        rounded={'8px'}
                        mt={2}
                    >
                        Job Details
                    </Button>
                </VStack>
            </CardBody>
        </Card>
    );

    // List Card Component
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
                        <Box bg={'#0a74501A'} px={3} py={1} borderRadius="md">
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
                            onClick={() => toggleBookmark(job.id)}
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
                            bg={'#0a7450'}
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

    return (
        <Box>
            <HeroSection />
            <Box bg={'#0a74501A'} minH="100vh" py={8}>
                <Container maxW="1440px">
                    <VStack spacing={6} align="stretch">
                        <Box>
                            <Text
                                fontSize="50px"
                                my={4}
                                color="black"
                                fontWeight="bold"
                            >
                                Recent Jobs Available
                            </Text>
                            <Text color="black" fontSize="16px">
                                Find the perfect candidate for your organization from our extensive database of qualified professionals.
                            </Text>
                        </Box>

                        <Flex
                            justify="space-between"
                            align="center"
                            direction={{ base: 'column', md: 'row' }}
                            gap={4}
                        >
                            <Text color="gray.500" fontSize="sm">
                                Showing 6-6 of 10 results
                            </Text>
                            <Select
                                value={viewMode === 'grid' ? 'grid-view' : viewMode === 'list' ? 'list-view' : sortBy}
                                onChange={handleSortChange}
                                w={{ base: 'full', md: '200px' }}
                                size="sm"
                            >
                                <option value="list-view">📋 List View</option>
                                <option value="grid-view">⊞ Grid View</option>
                                <option value="latest">Sort by Latest</option>
                                <option value="salary">Sort by Salary</option>
                                <option value="location">Sort by Location</option>
                            </Select>
                        </Flex>

                        {/* Conditional Rendering based on view mode */}
                        {viewMode === 'grid' ? (
                            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                                {jobsData.map((job, index) => (
                                    <GridJobCard key={job.id} job={job} index={index} />
                                ))}
                            </SimpleGrid>
                        ) : (
                            <VStack spacing={6} align="stretch">
                                {jobsData.map((job, index) => (
                                    <ListJobCard key={job.id} job={job} index={index} />
                                ))}
                            </VStack>
                        )}

                        {/* Pagination */}
                        <Flex justify="center" mt={8}>
                            <HStack spacing={2}>
                                <IconButton
                                    icon={<Text>←</Text>}
                                    variant="ghost"
                                    size="sm"
                                    aria-label="Previous page"
                                />
                                <Button size="sm" bg={'#0a7450'}
                                    color={'white'} variant="solid">01</Button>
                                <Button size="sm" variant="ghost">02</Button>
                                <Button size="sm" variant="ghost">03</Button>
                                <Button size="sm" variant="ghost">04</Button>
                                <Button size="sm" variant="ghost">05</Button>
                                <IconButton
                                    icon={<Text>→</Text>}
                                    variant="ghost"
                                    size="sm"
                                    aria-label="Next page"
                                />
                            </HStack>
                        </Flex>
                    </VStack>
                </Container>
            </Box>
        </Box>
    )
}

export default RecentJobs;