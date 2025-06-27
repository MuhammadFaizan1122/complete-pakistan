'use client'
import { HeroSection } from './HeroSection'
import React, { memo, useEffect, useMemo } from 'react'
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
    Input,
    InputGroup,
    InputLeftElement,
    Checkbox,
    CheckboxGroup,
    Stack,
    Divider,
    Badge,
    SimpleGrid,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    FormControl,
    FormLabel,
    Tag,
    TagLabel,
    TagCloseButton,
    Wrap,
    WrapItem,
    useToast,
    Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import Image from 'next/image';
import JobCard from './JobCard';
import { IoSearch } from 'react-icons/io5';
import TopCompanies from './TopCompanies';
import Link from 'next/link';
import { handleGetJobs } from '../../handlers/Jobs/jobs';


const Jobs = () => {
    const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());
    const [viewMode, setViewMode] = useState('list');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedJobTypes, setSelectedJobTypes] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState([]);
    const [selectedDatePosted, setSelectedDatePosted] = useState([]);
    const [salaryRange, setSalaryRange] = useState([0, 100000]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    const categories = [
        { name: 'Design', count: 10 },
        { name: 'Telecommunications', count: 10 },
        { name: 'Hotels & Tourism', count: 10 },
        { name: 'Education', count: 10 },
        { name: 'Financial Services', count: 10 }
    ];

    const jobTypes = [
        { name: 'Full time', count: 10 },
        { name: 'Part Time', count: 10 },
        { name: 'Freelance', count: 10 },
        { name: 'Contract', count: 10 },
        { name: 'Fixed-Price', count: 10 }
    ];

    const experienceLevels = [
        { name: 'All', count: 10 },
        { name: 'No experience', count: 10 },
        { name: 'Fresher', count: 10 },
        { name: 'Intermediate', count: 10 },
        { name: 'Expert', count: 10 }
    ];

    const datePostedOptions = [
        { name: 'All', count: 10 },
        { name: 'Last Hour', count: 10 },
        { name: 'Last 24 Hours', count: 10 },
        { name: 'Last 7 Days', count: 10 },
        { name: 'Last 30 Days', count: 10 }
    ];

    const popularTags = [
        'engineering', 'design', 'office', 'creative', 'management', 'swift', 'consultant'
    ];

   

    

    const handleTagAdd = (tag) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleTagRemove = (tag) => {
        setSelectedTags(selectedTags.filter(t => t !== tag));
    };

    const clearAllFilters = () => {
        setSearchQuery('');
        setSelectedLocation('');
        setSelectedCategories([]);
        setSelectedJobTypes([]);
        setSelectedExperience([]);
        setSelectedDatePosted([]);
        setSalaryRange([0, 100000]);
        setSelectedTags([]);
    };

    const FilterSection = () => (
        <VStack spacing={6} align="stretch">
            <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={3}>
                    Search by Job Title
                </Text>
                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        <IoSearch className="text-[15px]" />
                    </InputLeftElement>
                    <Input
                        placeholder="Job title or company"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        bg="white"
                    />
                </InputGroup>
            </Box>
            <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={3}>
                    Location
                </Text>
                <Select
                    placeholder="Choose city"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    bg="white"
                >
                    <option value="new-york">New York, USA</option>
                    <option value="los-angeles">Los Angeles, USA</option>
                    <option value="texas">Texas, USA</option>
                    <option value="florida">Florida, USA</option>
                    <option value="boston">Boston, USA</option>
                </Select>
            </Box>
            <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={3}>
                    Category
                </Text>
                <CheckboxGroup value={selectedCategories} onChange={setSelectedCategories}>
                    <VStack align="stretch" spacing={2}>
                        {categories.map((category) => (
                            <Flex key={category.name} justify="space-between" align="center">
                                <Checkbox value={category.name} size="md">
                                    <Text fontSize="md">{category.name}</Text>
                                </Checkbox>
                                <Text fontSize="sm" color="gray.500">
                                    {category.count}
                                </Text>
                            </Flex>
                        ))}
                    </VStack>
                </CheckboxGroup>
            </Box>

            <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={3}>
                    Job Type
                </Text>
                <CheckboxGroup value={selectedJobTypes} onChange={setSelectedJobTypes}>
                    <VStack align="stretch" spacing={2}>
                        {jobTypes.map((type) => (
                            <Flex key={type.name} justify="space-between" align="center">
                                <Checkbox value={type.name} size="md">
                                    <Text fontSize="md">{type.name}</Text>
                                </Checkbox>
                                <Text fontSize="sm" color="gray.500">
                                    {type.count}
                                </Text>
                            </Flex>
                        ))}
                    </VStack>
                </CheckboxGroup>
            </Box>

            <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={3}>
                    Experience Level
                </Text>
                <CheckboxGroup value={selectedExperience} onChange={setSelectedExperience}>
                    <VStack align="stretch" spacing={2}>
                        {experienceLevels.map((level) => (
                            <Flex key={level.name} justify="space-between" align="center">
                                <Checkbox value={level.name} size="md">
                                    <Text fontSize="md">{level.name}</Text>
                                </Checkbox>
                                <Text fontSize="sm" color="gray.500">
                                    {level.count}
                                </Text>
                            </Flex>
                        ))}
                    </VStack>
                </CheckboxGroup>
            </Box>

            <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={3}>
                    Date Posted
                </Text>
                <CheckboxGroup value={selectedDatePosted} onChange={setSelectedDatePosted}>
                    <VStack align="stretch" spacing={2}>
                        {datePostedOptions.map((option) => (
                            <Flex key={option.name} justify="space-between" align="center">
                                <Checkbox value={option.name} size="md">
                                    <Text fontSize="md">{option.name}</Text>
                                </Checkbox>
                                <Text fontSize="sm" color="gray.500">
                                    {option.count}
                                </Text>
                            </Flex>
                        ))}
                    </VStack>
                </CheckboxGroup>
            </Box>

            <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={3}>
                    Salary
                </Text>
                <VStack spacing={4}>
                    <RangeSlider
                        value={salaryRange}
                        onChange={setSalaryRange}
                        min={0}
                        max={100000}
                        step={1000}
                    >
                        <RangeSliderTrack bg="gray.200">
                            <RangeSliderFilledTrack bg="#309689" />
                        </RangeSliderTrack>
                        <RangeSliderThumb boxSize={4} index={0} />
                        <RangeSliderThumb boxSize={4} index={1} />
                    </RangeSlider>
                    <Flex justify="space-between" w="full">
                        <Text fontSize="md" color="gray.600">
                            ${salaryRange[0].toLocaleString()}
                        </Text>
                        <Text fontSize="md" color="gray.600">
                            ${salaryRange[1].toLocaleString()}
                        </Text>
                    </Flex>
                    <Button bg={'#309689'} color={'white'} size="md" w="full" rounded={'8px'}>
                        Filter
                    </Button>
                </VStack>
            </Box>

            <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={3}>
                    Tags
                </Text>
                <Wrap spacing={2}>
                    {popularTags.map((tag) => (
                        <WrapItem key={tag}>
                            <Button
                                size="sm"
                                variant={selectedTags.includes(tag) ? "solid" : "outline"}
                                bg={'#309689'} color={'white'}
                                onClick={() => selectedTags.includes(tag) ? handleTagRemove(tag) : handleTagAdd(tag)}
                            >
                                {tag}
                            </Button>
                        </WrapItem>
                    ))}
                </Wrap>
                {selectedTags.length > 0 && (
                    <VStack mt={3} align="stretch">
                        <Text fontSize="md" color="gray.600">Selected Tags:</Text>
                        <Wrap spacing={1}>
                            {selectedTags.map((tag) => (
                                <WrapItem key={tag}>
                                    <Tag size="md" bg={'#309689'} color={'white'} variant="solid">
                                        <TagLabel>{tag}</TagLabel>
                                        <TagCloseButton onClick={() => handleTagRemove(tag)} />
                                    </Tag>
                                </WrapItem>
                            ))}
                        </Wrap>
                    </VStack>
                )}
            </Box>

            <Button variant="outline" colorScheme="red" size="sm" onClick={clearAllFilters}>
                Clear All Filters
            </Button>

            <Card bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" color="white" rounded="xl">
                <CardBody p={6} textAlign="center">
                    <VStack spacing={3}>
                        <Heading size="md">WE ARE HIRING</Heading>
                        <Text fontSize="sm">Apply Today!</Text>
                        <Button colorScheme="whiteAlpha" size="sm">
                            Learn More
                        </Button>
                    </VStack>
                </CardBody>
            </Card>
        </VStack>
    );

    const [isOpen, setIsOpen] = useState(false);

    const onOpen = useMemo(() => () => setIsOpen(true), []);
    const onClose = useMemo(() => () => setIsOpen(false), []);
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const res = await handleGetJobs();

                if (res?.status === 200) {
                    setJobs(res.data?.data || []);
                } else {
                    toast({
                        title: 'Failed to Load Jobs',
                        description: res?.data?.message || 'Something went wrong while fetching job listings.',
                        status: 'error',
                        duration: 4000,
                        isClosable: true,
                    });
                }
            } catch (err) {
                console.error('Fetch jobs error:', err);
                toast({
                    title: 'Server Error',
                    description: err?.message || 'Unable to connect to the server.',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);
    return (
        <Box>
            <HeroSection />
            <Box bg={'#3096891A'} minH="100vh">
                <Container
                    maxW={{ base: '100%', sm: 'container.sm', md: 'container.md', lg: '1440px' }}
                    py={{ base: 4, md: 8 }}
                >
                    <Flex gap={{ base: 4, md: 8 }} direction={{ base: 'column', lg: 'row' }}>
                        <Box
                            w={{ base: 'full', lg: '300px' }}
                            display={{ base: 'none', lg: 'block' }}
                            flexShrink={0}
                        >
                            <Box
                                bg="white"
                                p={{ base: 4, md: 6 }}
                                rounded="xl"
                                shadow="sm"
                            >
                                <FilterSection />
                            </Box>
                        </Box>

                        <Box display={{ base: 'block', lg: 'none' }} mb={4}>
                            <Button
                                onClick={onOpen}
                                bg={'#309689'}
                                color={'white'}
                                leftIcon={<Text fontSize={{ base: 'sm', md: 'md' }}>⚙️</Text>}
                                size={{ base: 'sm', md: 'md' }}
                                w={{ base: 'full', sm: 'auto' }}
                            >
                                Filters
                            </Button>
                        </Box>

                        <Box flex={1}>
                            <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                                <Flex
                                    justify="space-between"
                                    align="center"
                                    direction={{ base: 'column', md: 'row' }}
                                    gap={{ base: 2, md: 4 }}
                                >
                                    <Text
                                        color="gray.500"
                                        fontSize={{ base: 'xs', md: 'sm' }}
                                    >
                                        Showing 6-6 of 10 results
                                    </Text>
                                    <Select
                                        placeholder="Sort by latest"
                                        w={{ base: 'full', md: '180px', lg: '200px' }}
                                        size={{ base: 'xs', md: 'sm' }}
                                        bg="white"
                                        fontSize={{ base: 'xs', md: 'sm' }}
                                    >
                                        <option value="latest">Sort by latest</option>
                                        <option value="salary">Sort by salary</option>
                                        <option value="location">Sort by location</option>
                                    </Select>
                                </Flex>

                                <VStack spacing={{ base: 3, md: 4 }} align="stretch">

                                    {loading ? (
                                        <Spinner size="lg" color="#309689" mx={'auto'} />
                                    ) :
                                        jobs.length === 0 ? (
                                            <Text textAlign={'center'} my={10}>No jobs found.</Text>
                                        ) : jobs.map((job, index) => (
                                            <JobCard key={index} job={job} index={index} />
                                        ))}
                                </VStack>
                                {
                                    jobs.length > 10 && (
                                        <Flex justify="center" mt={{ base: 4, md: 8 }}>
                                            <HStack spacing={{ base: 1, md: 2 }}>
                                                <IconButton
                                                    icon={<Text fontSize={{ base: 'xs', md: 'sm' }}>←</Text>}
                                                    variant="ghost"
                                                    size={{ base: 'xs', md: 'sm' }}
                                                    aria-label="Previous page"
                                                />
                                                <Button
                                                    size={{ base: 'xs', md: 'sm' }}
                                                    bg={'#309689'}
                                                    color={'white'}
                                                    variant="solid"
                                                    fontSize={{ base: 'xs', md: 'sm' }}
                                                >
                                                    01
                                                </Button>
                                                <Button
                                                    size={{ base: 'xs', md: 'sm' }}
                                                    variant="ghost"
                                                    fontSize={{ base: 'xs', md: 'sm' }}
                                                >
                                                    02
                                                </Button>
                                                <Button
                                                    size={{ base: 'xs', md: 'sm' }}
                                                    variant="ghost"
                                                    fontSize={{ base: 'xs', md: 'sm' }}
                                                >
                                                    03
                                                </Button>
                                                <Button
                                                    size={{ base: 'xs', md: 'sm' }}
                                                    variant="ghost"
                                                    fontSize={{ base: 'xs', md: 'sm' }}
                                                >
                                                    04
                                                </Button>
                                                <Button
                                                    size={{ base: 'xs', md: 'sm' }}
                                                    variant="ghost"
                                                    fontSize={{ base: 'xs', md: 'sm' }}
                                                >
                                                    05
                                                </Button>
                                                <IconButton
                                                    icon={<Text fontSize={{ base: 'xs', md: 'sm' }}>→</Text>}
                                                    variant="ghost"
                                                    size={{ base: 'xs', md: 'sm' }}
                                                    aria-label="Next page"
                                                />
                                            </HStack>
                                        </Flex>)
                                }
                            </VStack>
                        </Box>
                    </Flex>

                    <Drawer
                        isOpen={isOpen}
                        placement="left"
                        onClose={onClose}
                        size={{ base: 'xs', sm: 'sm' }}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton size={{ base: 'sm', md: 'md' }} />
                            <DrawerHeader fontSize={{ base: 'md', md: 'lg' }}>
                                Filters
                            </DrawerHeader>
                            <DrawerBody>
                                <FilterSection />
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </Container>
            </Box>
            <TopCompanies />
        </Box>
    )
}

export default Jobs;