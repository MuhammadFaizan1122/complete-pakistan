'use client'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    Select,
    Stack,
    Textarea,
    useToast,
    Checkbox,
    CheckboxGroup,
    Tag,
    TagLabel,
    Wrap,
    Heading,
    HStack,
    Image,
    FormErrorMessage,
} from '@chakra-ui/react';
import { Country, State } from 'country-state-city';
import { useState, useRef } from 'react';

const jobTypes = ['Full-time', 'Part-time', 'Hourly', 'Freelance', 'Internship'];
const tags = ['Full-time', 'Remote', 'New York', 'Corporate', 'LeadGen'];
const skillsList = [
    'Communication',
    'Team Work',
    'Critical Thinking',
    'Sales',
    'Negotiation',
    'Presentation',
];

export default function JobCreationPage() {
    const toast = useToast();
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [countries, setCountries] = useState(Country.getAllCountries());
    const [states, setStates] = useState([]);
    const [userIndustry, setUserIndustry] = useState();
    const [userCategory, setUserCategory] = useState();
    const [keyResponsibilities, setKeyResponsibilities] = useState(['']);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        jobTitle: '',
        companyName: '',
        jobType: '',
        country: '',
        state: '',
        salaryMin: '',
        salaryMax: '',
        industry: '',
        category: '',
        jobDescription: '',
    });

    const [errors, setErrors] = useState({});

    const [industryList] = useState([
        {
            id: 1,
            name: 'Technical',
            categories: [
                {
                    id: 2,
                    name: 'IT',
                    subcategories: [
                        {
                            id: 3,
                            name: 'Software Engineer'
                        }
                    ]
                }
            ]
        }
    ]);
    const [categoryList, setCategoryList] = useState([]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.jobTitle) newErrors.jobTitle = 'Job Title is required';
        if (!formData.companyName) newErrors.companyName = 'Company Name is required';
        if (!formData.jobType) newErrors.jobType = 'Job Type is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.jobDescription) newErrors.jobDescription = 'Job Description is required';
        if (!formData.industry) newErrors.industry = 'Industry is required';
        if (keyResponsibilities.some(resp => !resp)) newErrors.keyResponsibilities = 'All responsibilities must be filled';
        if (formData.salaryMin && formData.salaryMax && Number(formData.salaryMin) > Number(formData.salaryMax)) {
            newErrors.salaryMin = 'Min salary must be less than or equal to Max salary';
        }
        if (image) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(image.type)) {
                newErrors.image = 'Only JPG, JPEG, PNG, or WEBP files are allowed';
            } else if (image.size > 10 * 1024 * 1024) {
                newErrors.image = 'Image size must not exceed 10MB';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleIndustryChange = (e) => {
        const industryName = e.target.value;
        const selectedIndustry = industryList.find(c => c.name === industryName);
        setUserIndustry(selectedIndustry);
        setCategoryList(selectedIndustry ? selectedIndustry.categories : []);
        setFormData({ ...formData, industry: industryName, category: '' });
    };

    const handleCategoryChange = (e) => {
        const categoryName = e.target.value;
        setUserCategory(categoryList.find(c => c.name === categoryName));
        setFormData({ ...formData, category: categoryName });
    };

    const handleCountryChange = (e) => {
        const countryName = e.target.value;
        const selectedCountry = countries.find((c) => c.name === countryName);
        const stateList = State.getStatesOfCountry(selectedCountry?.isoCode);
        setStates(stateList);
        setFormData({ ...formData, country: countryName, state: '' });
    };

    const handleStateChange = (e) => {
        const stateName = e.target.value;
        setFormData({ ...formData, state: stateName });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImage(null);
            setImagePreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const Jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        const newId = Jobs.length > 0 ? Jobs[Jobs.length - 1].id + 1 : 1;

        if (!validateForm()) {
            toast({
                title: 'Validation Error',
                description: 'Please fix the errors in the form.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const jobData = {
            id: newId,
            ...formData,
            keyResponsibilities,
            selectedSkills,
            selectedTags,
            image: image ? image.name : null,
            createdAt: new Date().toISOString(),
        };
        console.log('jobData', jobData)
        const existingJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        localStorage.setItem('jobs', JSON.stringify([...existingJobs, jobData]));

        toast({
            title: 'Job Created!',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });

        setFormData({
            jobTitle: '',
            companyName: '',
            jobType: '',
            country: '',
            state: '',
            salaryMin: '',
            salaryMax: '',
            industry: '',
            category: '',
            jobDescription: '',
        });
        setKeyResponsibilities(['']);
        setSelectedSkills([]);
        setSelectedTags([]);
        setImage(null);
        setImagePreview(null);
        setStates([]);
        setCategoryList([]);
        fileInputRef.current.value = '';
    };

    return (
        <Box maxW="6xl" mx="auto" py={8} px={{ base: 4, md: 6 }}>
            <Heading size="lg" mb={6}>
                Create New Job
            </Heading>
            <Box as="form" onSubmit={handleSubmit}>
                <Grid templateColumns={{ base: '1fr' }} gap={8}>
                    <GridItem>
                        <Stack spacing={4}>
                            <FormControl isRequired isInvalid={errors.jobTitle}>
                                <FormLabel>Job Title</FormLabel>
                                <Input
                                    py={6}
                                    background="white"
                                    border="1px solid"
                                    borderColor="gray.300"
                                    borderRadius="12px"
                                    _focus={{
                                        ring: 2,
                                        ringColor: "#309689",
                                        borderColor: "transparent",
                                        outline: "none"
                                    }}
                                    placeholder="e.g., Corporate Solutions Executive"
                                    value={formData.jobTitle}
                                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                />
                                <FormErrorMessage>{errors.jobTitle}</FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={errors.companyName}>
                                <FormLabel>Company Name</FormLabel>
                                <Input
                                    py={6}
                                    background="white"
                                    border="1px solid"
                                    borderColor="gray.300"
                                    borderRadius="12px"
                                    _focus={{
                                        ring: 2,
                                        ringColor: "#309689",
                                        borderColor: "transparent",
                                        outline: "none"
                                    }}
                                    placeholder="e.g., Lather and Sons"
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                />
                                <FormErrorMessage>{errors.companyName}</FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={errors.jobType}>
                                <FormLabel>Job Type</FormLabel>
                                <Select
                                    placeholder="Select type"
                                    rounded={'12px'}
                                    h="50px"
                                    border="1px solid"
                                    borderColor="gray.300"
                                    bg="white"
                                    outline="1px solid"
                                    outlineColor="gray.300"
                                    _focus={{
                                        ring: 2,
                                        ringColor: "#309689",
                                        borderColor: "transparent",
                                        outline: "none"
                                    }}
                                    value={formData.jobType}
                                    onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                                >
                                    {jobTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </Select>
                                <FormErrorMessage>{errors.jobType}</FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={errors.country}>
                                <FormLabel>Location</FormLabel>
                                <HStack>
                                    <Select
                                        placeholder="Country"
                                        rounded={'15px'}
                                        h="50px"
                                        border="1px solid"
                                        borderColor="gray.300"
                                        bg="white"
                                        outline="1px solid"
                                        outlineColor="gray.300"
                                        _focus={{
                                            ring: 2,
                                            ringColor: '#309689',
                                            borderColor: 'transparent',
                                            outline: 'none',
                                        }}
                                        _active={{
                                            outline: 'none',
                                        }}
                                        transition="all 0.2s"
                                        value={formData.country}
                                        onChange={handleCountryChange}
                                    >
                                        {countries.map((c) => (
                                            <option key={c.isoCode} value={c.name}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </Select>
                                    <Select
                                        placeholder="State"
                                        rounded={'15px'}
                                        h="50px"
                                        border="1px solid"
                                        borderColor="gray.300"
                                        bg="white"
                                        outline="1px solid"
                                        outlineColor="gray.300"
                                        _focus={{
                                            ring: 2,
                                            ringColor: '#309689',
                                            borderColor: 'transparent',
                                            outline: 'none',
                                        }}
                                        _active={{
                                            outline: 'none',
                                        }}
                                        transition="all 0.2s"
                                        value={formData.state}
                                        onChange={handleStateChange}
                                    >
                                        {states.map((s) => (
                                            <option key={s.isoCode} value={s.name}>
                                                {s.name}
                                            </option>
                                        ))}
                                    </Select>
                                </HStack>
                                <FormErrorMessage>{errors.country}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.salaryMin}>
                                <FormLabel>Salary Range (USD)</FormLabel>
                                <Flex gap={2}>
                                    <Input
                                        py={6}
                                        background="white"
                                        border="1px solid"
                                        borderColor="gray.300"
                                        borderRadius="12px"
                                        _focus={{
                                            ring: 2,
                                            ringColor: "#309689",
                                            borderColor: "transparent",
                                            outline: "none"
                                        }}
                                        placeholder="Min"
                                        type="number"
                                        value={formData.salaryMin}
                                        onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                                    />
                                    <Input
                                        py={6}
                                        background="white"
                                        border="1px solid"
                                        borderColor="gray.300"
                                        borderRadius="12px"
                                        _focus={{
                                            ring: 2,
                                            ringColor: "#309689",
                                            borderColor: "transparent",
                                            outline: "none"
                                        }}
                                        placeholder="Max"
                                        type="number"
                                        value={formData.salaryMax}
                                        onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                                    />
                                </Flex>
                                <FormErrorMessage>{errors.salaryMin}</FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={errors.industry}>
                                <FormLabel>Industry</FormLabel>
                                <HStack>
                                    <Select
                                        placeholder="Industry"
                                        value={formData.industry}
                                        onChange={handleIndustryChange}
                                        w="full"
                                        h="50px"
                                        border="1px solid"
                                        borderColor="gray.300"
                                        borderRadius="12px"
                                        bg="white"
                                        outline="1px solid"
                                        outlineColor="gray.300"
                                        _focus={{
                                            ring: 2,
                                            ringColor: "#309689",
                                            borderColor: "transparent",
                                            outline: "none"
                                        }}
                                        _active={{
                                            outline: "none"
                                        }}
                                        transition="all 0.2s"
                                    >
                                        {industryList.map((item) => (
                                            <option key={item.id} value={item.name}>{item.name}</option>
                                        ))}
                                    </Select>
                                    <Select
                                        placeholder="Category"
                                        value={formData.category}
                                        onChange={handleCategoryChange}
                                        w="full"
                                        border="1px solid"
                                        borderColor="gray.300"
                                        borderRadius="12px"
                                        h="50px"
                                        bg="white"
                                        outline="1px solid"
                                        outlineColor="gray.300"
                                        _focus={{
                                            ring: 2,
                                            ringColor: "#309689",
                                            borderColor: "transparent",
                                            outline: "none"
                                        }}
                                        _active={{
                                            outline: "none"
                                        }}
                                        transition="all 0.2s"
                                    >
                                        {categoryList.map((item) => (
                                            <option key={item.id} value={item.name}>{item.name}</option>
                                        ))}
                                    </Select>
                                </HStack>
                                <FormErrorMessage>{errors.industry}</FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={errors.jobDescription}>
                                <FormLabel>Job Description</FormLabel>
                                <Textarea
                                    border="1px solid"
                                    borderColor="gray.300"
                                    bg="white"
                                    outline="1px solid"
                                    outlineColor="gray.300"
                                    borderRadius="12px"
                                    _focus={{
                                        ring: 2,
                                        ringColor: "#309689",
                                        borderColor: "transparent",
                                        outline: "none"
                                    }}
                                    placeholder="Enter full job description..."
                                    rows={5}
                                    value={formData.jobDescription}
                                    onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                                />
                                <FormErrorMessage>{errors.jobDescription}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.keyResponsibilities}>
                                <FormLabel>Key Responsibilities</FormLabel>
                                <Stack spacing={2}>
                                    {keyResponsibilities.map((item, idx) => (
                                        <Flex key={idx} gap={2} align="center">
                                            <Input
                                                placeholder={`Responsibility ${idx + 1}`}
                                                value={item}
                                                bg="white"
                                                py={6}
                                                outline="1px solid"
                                                outlineColor="gray.300"
                                                borderRadius="12px"
                                                _focus={{
                                                    ring: 2,
                                                    ringColor: "#309689",
                                                    borderColor: "transparent",
                                                    outline: "none"
                                                }}
                                                onChange={(e) => {
                                                    const updated = [...keyResponsibilities];
                                                    updated[idx] = e.target.value;
                                                    setKeyResponsibilities(updated);
                                                }}
                                            />
                                            <Button
                                                size="sm"
                                                colorScheme="red"
                                                variant="ghost"
                                                onClick={() => {
                                                    setKeyResponsibilities((prev) => prev.filter((_, i) => i !== idx));
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </Flex>
                                    ))}
                                    <Button
                                        size="sm"
                                        colorScheme="teal"
                                        variant="outline"
                                        onClick={() => setKeyResponsibilities((prev) => [...prev, ''])}
                                        alignSelf="flex-start"
                                    >
                                        + Add Responsibility
                                    </Button>
                                </Stack>
                                <FormErrorMessage>{errors.keyResponsibilities}</FormErrorMessage>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Professional Skills</FormLabel>
                                <CheckboxGroup value={selectedSkills} onChange={(val) => setSelectedSkills(val)}>
                                    <Wrap spacing={3}>
                                        {skillsList.map((skill) => (
                                            <Checkbox key={skill} value={skill}>
                                                {skill}
                                            </Checkbox>
                                        ))}
                                    </Wrap>
                                </CheckboxGroup>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Tags</FormLabel>
                                <Wrap spacing={2}>
                                    {tags.map((tag) => (
                                        <Tag
                                            key={tag}
                                            size="md"
                                            variant={selectedTags.includes(tag) ? 'solid' : 'outline'}
                                            bg={'#309689'}
                                            color="#fff"
                                            cursor="pointer"
                                            onClick={() =>
                                                setSelectedTags((prev) =>
                                                    prev.includes(tag)
                                                        ? prev.filter((t) => t !== tag)
                                                        : [...prev, tag]
                                                )
                                            }
                                        >
                                            <TagLabel>{tag}</TagLabel>
                                        </Tag>
                                    ))}
                                </Wrap>
                            </FormControl>

                            <FormControl isInvalid={errors.image}>
                                <FormLabel>Job Banner Image</FormLabel>
                                <Input
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    py={2}
                                    border="none"
                                />
                                {imagePreview && (
                                    <Box mt={4}>
                                        <Image src={imagePreview} alt="Banner Preview" maxH="200px" objectFit="cover" />
                                    </Box>
                                )}
                                <FormErrorMessage>{errors.image}</FormErrorMessage>
                            </FormControl>

                            <Button bg={'#309689'} w={'full'} color="#fff" type="submit" mt={4} rounded={'12px'} py={6}>
                                Create Job
                            </Button>
                        </Stack>
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    );
}