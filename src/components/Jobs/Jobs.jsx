'use client'
import { HeroSection } from './HeroSection'
import React, { memo, useMemo } from 'react'
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
} from '@chakra-ui/react';
import { useState } from 'react';
import Image from 'next/image';
import { IoSearch } from 'react-icons/io5';
import TopCompanies from './TopCompanies';
import Link from 'next/link';

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
    // const { isOpen, onOpen, onClose } = useDisclosure();

    const jobsData = [
        {
            id: 1,
            title: 'Forward Security Director',
            company: 'Bauch, Scheppe and Schuilst Co',
            timeAgo: '10 min ago',
            industry: 'Hotels & Tourism',
            type: 'Full time',
            salary: '$40000-$42000',
            location: 'New York, USA',
            colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
        },
        {
            id: 2,
            title: 'Regional Creative Facilitator',
            company: 'Wisozk - Becker Co',
            timeAgo: '12 min ago',
            industry: 'Media',
            type: 'Part time',
            salary: '$28000-$32000',
            location: 'Los Angeles, USA',
            colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
        },
        {
            id: 3,
            title: 'Internal Integration Planner',
            company: 'Mraz, Quigley and Feest Inc.',
            timeAgo: '15 min ago',
            industry: 'Construction',
            type: 'Full time',
            salary: '$48000-$50000',
            location: 'Texas, USA',
            colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
        },
        {
            id: 4,
            title: 'District Intranet Director',
            company: 'VonRueden - Weber Co',
            timeAgo: '24 min ago',
            industry: 'Commerce',
            type: 'Full time',
            salary: '$42000-$46000',
            location: 'Florida, USA',
            colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
        },
        {
            id: 5,
            title: 'Corporate Tactics Facilitator',
            company: 'Cormier, Turner and Flatley Inc',
            timeAgo: '25 min ago',
            industry: 'Commerce',
            type: 'Full time',
            salary: '$38000-$40000',
            location: 'Boston, USA',
            colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
        },
        {
            id: 6,
            title: 'Forward Accounts Consultant',
            company: 'Pfeffer Group',
            timeAgo: '30 min ago',
            industry: 'Financial Services',
            type: 'Full time',
            salary: '$45000-$48000',
            location: 'Boston, USA',
            colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
        }
    ];

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

    const JobCard = memo(({ job }) => (
        <Card
            bg={'#fff'}
            shadow="sm"
            border="1px"
            rounded={'20px'}
            borderColor="gray.200"
            _hover={{ shadow: 'md' }}
            transition="all 0.2s"
        >
            <CardBody p={{ base: 4, md: 6 }}>
                <Flex direction="column" gap={{ base: 3, md: 4 }}>
                    <Flex justify="space-between" align="center">
                        <Box bg={'#3096891A'} px={{ base: 3, md: 4 }} py={2} borderRadius="md">
                            <Text fontSize={{ base: '14px', md: '16px' }} color="gray.500">
                                {job.timeAgo}
                            </Text>
                        </Box>
                        <IconButton
                            icon={
                                <Image
                                    src={`/Images/Icons/bookmark.png`}
                                    alt="icon"
                                    width={24}
                                    height={24}
                                />
                            }
                            variant="ghost"
                            size={{ base: 'sm', md: 'md' }}
                            onClick={() => toggleBookmark(job.id)}
                            aria-label="Bookmark job"
                        />
                    </Flex>

                    <Flex gap={{ base: 2, md: 3 }} align="flex-start">
                        <CompanyAvatar colors={job.colors} company={job.company} />
                        <VStack align="flex-start" spacing={1} flex={1}>
                            <Heading
                                size={{ base: 'sm', md: 'md' }}
                                color="gray.800"
                                fontWeight="semibold"
                            >
                                {job.title}
                            </Heading>
                            <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
                                {job.company}
                            </Text>
                        </VStack>
                    </Flex>

                    <Flex
                        justify="space-between"
                        align="center"
                        direction={{ base: 'column', lg: 'row' }}
                        gap={{ base: 3, md: 4 }}
                    >
                        <HStack
                            spacing={{ base: 4, md: 6 }}
                            wrap="wrap"
                            align="center"
                            justify="flex-start"
                        >
                            <HStack spacing={2}>
                                <Image
                                    src={`/Images/Icons/briefcase.png`}
                                    alt="icon"
                                    width={24}
                                    height={24}
                                />
                                <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
                                    {job.industry}
                                </Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Image
                                    src={`/Images/Icons/clock.png`}
                                    alt="icon"
                                    width={24}
                                    height={24}
                                />
                                <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
                                    {job.type}
                                </Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Image
                                    src={`/Images/Icons/wallet.png`}
                                    alt="icon"
                                    width={24}
                                    height={24}
                                />
                                <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
                                    {job.salary}
                                </Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Image
                                    src={`/Images/Icons/location.png`}
                                    alt="icon"
                                    width={24}
                                    height={24}
                                />
                                <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
                                    {job.location}
                                </Text>
                            </HStack>
                        </HStack>

                        <Button
                            as={Link}
                            href={`/job-details/${job.id}`}
                            bg={'#309689'}
                            size={{ base: 'sm', md: 'md' }}
                            rounded={'8px'}
                            px={{ base: 4, md: 6 }}
                            flexShrink={0}
                            color={'white'}
                            _hover={{ bg: '#309689' }}
                        >
                            Job Details
                        </Button>
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    ));
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = useMemo(() => () => setIsOpen(true), []);
    const onClose = useMemo(() => () => setIsOpen(false), []);
    const memoizedJobs = useMemo(() => jobsData, []);

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
                                    {memoizedJobs.map((job, index) => (
                                        <JobCard key={job.id} job={job} index={index} />
                                    ))}
                                </VStack>

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
                                </Flex>
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