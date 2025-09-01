'use client'
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import {
    Box,
    Grid,
    GridItem,
    Text,
    Button,
    VStack,
    HStack,
    Textarea,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Icon,
    Badge,
    Flex,
    IconButton,
    useToast,
    Input,
    Tag,
    TagLabel,
    TagCloseButton,
    Select
} from "@chakra-ui/react";
import {
    FaStar,
    FaPlane,
    FaGlobe,
    FaEnvelope,
    FaTrash,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaFacebook,
    FaLanguage,
    FaBriefcase,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaPhone,
    FaBuilding,
    FaCheckCircle
} from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { Country, State, City } from 'country-state-city';
import { handleUpload } from '../../../handlers/contentUploading/contentUploading';
import StyledSelect from '../../CV/CvDirectory/StyledSelect';
import StyledInput from '../../CV/StyledInput';

// Yup validation schema
const validationSchema = Yup.object({
    agencyName: Yup.string().trim().required('Agency Name is required'),
    country: Yup.string().trim().required('Country is required'),
    state: Yup.string().trim().required('State is required'),
    city: Yup.string().trim().required('City is required'),
    establishmentYear: Yup.number().min(1990, 'Establishment year must be from 1990 onwards').max(new Date().getFullYear(), 'Establishment year cannot be in the future').required('Establishment Year is required'),
    phone: Yup.string().matches(/^\+92[0-9]{10}$/, 'Phone Number must be valid (e.g., +923001234567)').required('Phone Number is required'),
    email: Yup.string().email('Valid Email is required').required('Email is required'),
    address: Yup.string().trim().required('Address is required'),
    website: Yup.string().url('Valid Website URL is required').optional().nullable(),
    logo: Yup.mixed().required('Agency Logo is required'),
    services: Yup.array().min(1, 'At least one Service is required').of(Yup.string().trim().required()),
    languages: Yup.array().min(1, 'At least one Language is required').of(Yup.string().trim().required()),
    socialLinks: Yup.object({
        facebook: Yup.string().url('Valid Facebook URL is required').optional().nullable(),
        twitter: Yup.string().url('Valid Twitter URL is required').optional().nullable(),
        instagram: Yup.string().url('Valid Instagram URL is required').optional().nullable(),
        youtube: Yup.string().url('Valid YouTube URL is required').optional().nullable()
    })
});

export default function TravelAgentRegistration() {
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newService, setNewService] = useState('');
    const [newLanguage, setNewLanguage] = useState('');
    const router = useRouter();

    // Location data
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    // Form data
    const [formData, setFormData] = useState({
        agencyName: '',
        country: '',
        state: '',
        city: '',
        establishmentYear: '',
        phone: '',
        email: '',
        address: '',
        website: '',
        logo: null
    });

    const [errors, setErrors] = useState({});
    const [services, setServices] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [socialLinks, setSocialLinks] = useState({
        facebook: '',
        twitter: '',
        instagram: '',
        youtube: ''
    });
    const [logoFile, setLogoFile] = useState(null);

    // Initialize countries on component mount
    useEffect(() => {
        const countryList = Country.getAllCountries();
        setCountries(countryList);
    }, []);

    // Validate individual field on change
    const validateField = async (name, value) => {
        try {
            await validationSchema.validateAt(name, { [name]: value });
            setErrors((prev) => ({ ...prev, [name]: '' }));
        } catch (error) {
            setErrors((prev) => ({ ...prev, [name]: error.message }));
        }
    };

    // Location handlers
    const handleCountryChange = (e) => {
        const countryName = e.target.value;
        const selectedCountry = countries.find((c) => c.name === countryName);
        const stateList = selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : [];

        setFormData({
            ...formData,
            country: countryName,
            state: '',
            city: '',
        });
        setStates(stateList);
        setCities([]);
        validateField('country', countryName);
    };

    const handleStateChange = (e) => {
        const stateName = e.target.value;
        const selectedCountry = countries.find((c) => c.name === formData.country);
        const selectedState = states.find((s) => s.name === stateName);
        const cityList = selectedCountry && selectedState
            ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
            : [];

        setFormData({
            ...formData,
            state: stateName,
            city: '',
        });
        setCities(cityList);
        validateField('state', stateName);
    };

    const handleCityChange = (e) => {
        setFormData({
            ...formData,
            city: e.target.value,
        });
        validateField('city', e.target.value);
    };

    // Services handlers
    const addService = (e) => {
        if (e.key === 'Enter' && newService.trim() && !services.includes(newService.trim())) {
            e.preventDefault();
            const updatedServices = [...services, newService.trim()];
            setServices(updatedServices);
            setNewService('');
            validateField('services', updatedServices);
        } else if (e.key === 'Enter' && !newService.trim()) {
            e.preventDefault();
            setErrors((prev) => ({ ...prev, newService: 'Service cannot be empty' }));
        }
    };

    const removeService = (service) => {
        const updatedServices = services.filter((s) => s !== service);
        setServices(updatedServices);
        validateField('services', updatedServices);
    };

    // Language handlers
    const addLanguage = (e) => {
        if (e.key === 'Enter' && newLanguage.trim() && !languages.includes(newLanguage.trim())) {
            e.preventDefault();
            const updatedLanguages = [...languages, newLanguage.trim()];
            setLanguages(updatedLanguages);
            setNewLanguage('');
            validateField('languages', updatedLanguages);
        } else if (e.key === 'Enter' && !newLanguage.trim()) {
            e.preventDefault();
            setErrors((prev) => ({ ...prev, newLanguage: 'Language cannot be empty' }));
        }
    };

    const removeLanguage = (lang) => {
        const updatedLanguages = languages.filter((l) => l !== lang);
        setLanguages(updatedLanguages);
        validateField('languages', updatedLanguages);
    };

    // File upload handler
    const handleLogoChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            toast({
                title: "Invalid file type",
                description: "Only JPG, PNG, and WEBP files are allowed.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        if (file.size > maxSize) {
            toast({
                title: "File too large",
                description: "Logo must be under 5MB.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        setLogoFile(file);
        setFormData((prev) => ({ ...prev, logo: file }));
        validateField('logo', file);
    };

    // Generate year options
    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = currentYear; year >= 1990; year--) {
            years.push(year);
        }
        return years;
    };

    // Handle form submission
    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await validationSchema.validate(
                {
                    ...formData,
                    services,
                    languages,
                    socialLinks
                },
                { abortEarly: false }
            );
            setErrors({});

            // Upload logo
            const logoUpload = logoFile ? await handleUpload(logoFile) : null;
            const logoUrl = logoUpload?.data?.url || "";

            const submissionData = {
                ...formData,
                establishmentYear: Number(formData.establishmentYear),
                services: services.filter((service) => service.trim() !== ''),
                languages: languages.filter((lang) => lang.trim() !== ''),
                socialLinks: {
                    facebook: socialLinks.facebook || null,
                    twitter: socialLinks.twitter || null,
                    instagram: socialLinks.instagram || null,
                    youtube: socialLinks.youtube || null,
                },
                logo: logoUrl,
            };

            const response = await fetch('/api/travel-agent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            const result = await response.json();

            if (result.success) {
                toast({
                    title: "Registration Successful!",
                    description: "Your travel agency registration has been submitted for review. You will be notified once it's processed.",
                    status: "success",
                    duration: 7000,
                    isClosable: true,
                });
                router.push('/hajj-and-umrah');

                // Reset form
                setFormData({
                    agencyName: '',
                    country: '',
                    state: '',
                    city: '',
                    establishmentYear: '',
                    phone: '',
                    email: '',
                    address: '',
                    website: '',
                    logo: null
                });
                setServices([]);
                setLanguages([]);
                setSocialLinks({ facebook: '', twitter: '', instagram: '', youtube: '' });
                setLogoFile(null);
                setErrors({});
            } else {
                toast({
                    title: "Submission Failed",
                    description: result.error || "Something went wrong. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
                const newErrors = {};
                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
                setErrors(newErrors);
                toast({
                    title: "Validation Errors",
                    description: "Please correct the errors in the form.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                console.error('Submission error:', error);
                toast({
                    title: "Network Error",
                    description: "Unable to submit registration. Please check your connection and try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
        setIsSubmitting(false);
    };

    return (
        <Box bg="white" minH="100vh" fontFamily="sans-serif">
            {/* Header */}
            <Box bg="green.700" py={8}>
                <Box maxW="1440px" mx="auto" px={4}>
                    <VStack spacing={4} my={4}>
                        <HStack spacing={2}>
                            {/* <Icon as={FaPlane} color="white" boxSize={6} /> */}
                            <Text fontSize="2xl" fontWeight="bold" color="white" textTransform={'capitalize'}>
                                HAJJ & UMRAH AGENCY ONLINE SPACE REGISTRATION REQUEST FORM
                            </Text>
                            {/* <Icon as={FaPlane} color="white" boxSize={6} /> */}
                        </HStack>
                        <Text color="gray.100" textAlign="center" fontSize={'md'}>
                            Join Pakistan's premier hajj and umrah online network
                        </Text>
                        <Badge bg="white" color="green.700" px={4} py={1} rounded="full" size={'md'}>
                            Trusted Partners Online Network
                        </Badge>
                    </VStack>
                </Box>
            </Box>

            {/* Main Form */}
            <Box maxW="1440px" mx="auto" p={{ base: 4, md: 6 }}>
                <Grid templateColumns={{ base: "1fr", lg: "3fr 1fr" }} gap={6}>
                    {/* Left Column - Main Content */}
                    <GridItem>
                        <VStack spacing={6} align="stretch">
                            {/* Agency Details */}
                            <Box bg="white" borderRadius="md" p={6} shadow="md">
                                <Flex align="center" gap={2} mb={6}>
                                    <Icon as={FaBuilding} color="gray.600" boxSize={5} />
                                    <Text fontSize="lg" fontWeight="semibold">Agency Details</Text>
                                </Flex>
                                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                                    <FormControl isInvalid={!!errors.agencyName}>
                                        <FormLabel fontSize="md" color="gray.600">Agency Name</FormLabel>
                                        <StyledInput
                                            value={formData.agencyName}
                                            placeholder="Agency Name"
                                            onChange={(e) => {
                                                setFormData({ ...formData, agencyName: e.target.value });
                                                validateField('agencyName', e.target.value);
                                            }}
                                        />
                                        <FormErrorMessage>{errors.agencyName}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={!!errors.establishmentYear}>
                                        <FormLabel fontSize="md" color="gray.600">Establishment Year</FormLabel>
                                        <StyledSelect
                                            placeholder="Select Year"
                                            value={formData.establishmentYear}
                                            onChange={(e) => {
                                                setFormData({ ...formData, establishmentYear: e.target.value });
                                                validateField('establishmentYear', e.target.value);
                                            }}
                                        >
                                            {generateYearOptions().map((year) => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </StyledSelect>
                                        <FormErrorMessage>{errors.establishmentYear}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={!!errors.website} gridColumn={{ base: "1", md: "span 2" }}>
                                        <FormLabel fontSize="md" color="gray.600">Website (Optional)</FormLabel>
                                        <StyledInput
                                            value={formData.website}
                                            placeholder="https://www.youragency.com"
                                            onChange={(e) => {
                                                setFormData({ ...formData, website: e.target.value });
                                                validateField('website', e.target.value);
                                            }}
                                        />
                                        <FormErrorMessage>{errors.website}</FormErrorMessage>
                                    </FormControl>
                                </Grid>
                            </Box>

                            {/* Location */}
                            <Box bg="white" borderRadius="md" p={6} shadow="md">
                                <Flex align="center" gap={2} mb={6}>
                                    <Icon as={FaMapMarkerAlt} color="gray.600" boxSize={5} />
                                    <Text fontSize="lg" fontWeight="semibold">Location</Text>
                                </Flex>
                                <Flex align="center" gap={2} flexDirection={{ base: 'column', md: 'row' }}>
                                    <Box w={{ base: '100%', md: '33%' }}>
                                        <FormControl isInvalid={!!errors.country}>
                                            <StyledSelect
                                                placeholder="Select country"
                                                value={formData.country}
                                                onChange={handleCountryChange}
                                                size="lg"
                                            >
                                                {countries.map((c) => (
                                                    <option key={c.isoCode} value={c.name}>{c.name}</option>
                                                ))}
                                            </StyledSelect>
                                            <FormErrorMessage>{errors.country}</FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                    <Box w={{ base: '100%', md: '33%' }}>
                                        <FormControl isInvalid={!!errors.state}>
                                            <StyledSelect
                                                placeholder="Select state"
                                                value={formData.state}
                                                onChange={handleStateChange}
                                                size="lg"
                                                isDisabled={!formData.country}
                                            >
                                                {states.map((s) => (
                                                    <option key={s.isoCode} value={s.name}>{s.name}</option>
                                                ))}
                                            </StyledSelect>
                                            <FormErrorMessage>{errors.state}</FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                    <Box w={{ base: '100%', md: '33%' }}>
                                        <FormControl isInvalid={!!errors.city}>
                                            <StyledSelect
                                                placeholder="Select city"
                                                value={formData.city}
                                                onChange={handleCityChange}
                                                size="lg"
                                                isDisabled={!formData.state}
                                            >
                                                {cities.map((c) => (
                                                    <option key={c.name} value={c.name}>{c.name}</option>
                                                ))}
                                            </StyledSelect>
                                            <FormErrorMessage>{errors.city}</FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                </Flex>
                            </Box>

                            {/* Services */}
                            <Box bg="white" borderRadius="md" p={6} shadow="md">
                                <Flex align="center" gap={2} mb={6}>
                                    <Icon as={FaBriefcase} color="gray.600" boxSize={5} />
                                    <Text fontSize="lg" fontWeight="semibold">Services Offered</Text>
                                </Flex>
                                <FormControl isInvalid={!!errors.services}>
                                    <HStack spacing={2} wrap="wrap" mb={3}>
                                        {services.map((service) => (
                                            <Tag key={service} size="md" variant="solid" colorScheme="green">
                                                <TagLabel>{service}</TagLabel>
                                                <TagCloseButton onClick={() => removeService(service)} />
                                            </Tag>
                                        ))}
                                    </HStack>
                                    <FormControl isInvalid={!!errors.newService}>
                                        <StyledInput
                                            placeholder="Type service and press Enter (e.g., Flight Booking, Hotel Reservations)"
                                            value={newService}
                                            onChange={(e) => setNewService(e.target.value)}
                                            onKeyDown={addService}
                                        />
                                        <FormErrorMessage>{errors.newService}</FormErrorMessage>
                                    </FormControl>
                                    <FormErrorMessage>{errors.services}</FormErrorMessage>
                                    <Text fontSize="xs" color="gray.500" mt={2}>
                                        Type a service and press Enter to add it.
                                    </Text>
                                </FormControl>
                            </Box>

                            {/* Languages */}
                            <Box bg="white" borderRadius="md" p={6} shadow="md">
                                <Flex align="center" gap={2} mb={6}>
                                    <Icon as={FaLanguage} color="gray.600" boxSize={5} />
                                    <Text fontSize="lg" fontWeight="semibold">Languages Spoken</Text>
                                </Flex>
                                <FormControl isInvalid={!!errors.languages}>
                                    <HStack spacing={2} wrap="wrap" mb={3}>
                                        {languages.map((lang) => (
                                            <Tag key={lang} size="md" variant="solid" colorScheme="green">
                                                <TagLabel>{lang}</TagLabel>
                                                <TagCloseButton onClick={() => removeLanguage(lang)} />
                                            </Tag>
                                        ))}
                                    </HStack>
                                    <FormControl isInvalid={!!errors.newLanguage}>
                                        <StyledInput
                                            placeholder="Type language and press Enter (e.g., English, Urdu)"
                                            value={newLanguage}
                                            onChange={(e) => setNewLanguage(e.target.value)}
                                            onKeyDown={addLanguage}
                                        />
                                        <FormErrorMessage>{errors.newLanguage}</FormErrorMessage>
                                    </FormControl>
                                    <FormErrorMessage>{errors.languages}</FormErrorMessage>
                                    <Text fontSize="xs" color="gray.500" mt={2}>
                                        Type a language and press Enter to add it.
                                    </Text>
                                </FormControl>
                            </Box>
                        </VStack>
                    </GridItem>

                    {/* Right Column - Sidebar */}
                    <GridItem>
                        <VStack spacing={6} align="stretch" position="sticky" top="20px">
                            {/* Contact Information */}
                            <Box bg="white" borderRadius="md" p={6} shadow="md">
                                <Flex align="center" gap={2} mb={6}>
                                    <Icon as={FaEnvelope} color="gray.600" boxSize={5} />
                                    <Text fontSize="lg" fontWeight="semibold">Contact Information</Text>
                                </Flex>
                                <VStack spacing={4} align="stretch">
                                    <FormControl isInvalid={!!errors.phone}>
                                        <FormLabel fontSize="md" color="gray.600">Phone Number</FormLabel>
                                        <StyledInput
                                            type="tel"
                                            value={formData.phone}
                                            placeholder="Phone number (e.g., +923001234567)"
                                            onChange={(e) => {
                                                setFormData({ ...formData, phone: e.target.value });
                                                validateField('phone', e.target.value);
                                            }}
                                        />
                                        <FormErrorMessage>{errors.phone}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={!!errors.email}>
                                        <FormLabel fontSize="md" color="gray.600">Email Address</FormLabel>
                                        <StyledInput
                                            type="email"
                                            value={formData.email}
                                            placeholder="Email address"
                                            onChange={(e) => {
                                                setFormData({ ...formData, email: e.target.value });
                                                validateField('email', e.target.value);
                                            }}
                                        />
                                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={!!errors.address}>
                                        <FormLabel fontSize="md" color="gray.600">Office Address</FormLabel>
                                        <Textarea
                                            value={formData.address}
                                            placeholder="Complete office address"
                                            onChange={(e) => {
                                                setFormData({ ...formData, address: e.target.value });
                                                validateField('address', e.target.value);
                                            }}
                                            rows={3}
                                        />
                                        <FormErrorMessage>{errors.address}</FormErrorMessage>
                                    </FormControl>
                                </VStack>
                            </Box>

                            {/* Social Links */}
                            <Box bg="white" borderRadius="md" p={6} shadow="md">
                                <Flex align="center" gap={2} mb={6}>
                                    <Icon as={FaGlobe} color="gray.600" boxSize={5} />
                                    <Text fontSize="lg" fontWeight="semibold">Social Media (Optional)</Text>
                                </Flex>
                                <VStack spacing={3} align="stretch">
                                    <HStack spacing={2}>
                                        <Icon as={FaFacebook} color="blue.600" boxSize={5} />
                                        <FormControl isInvalid={!!errors['socialLinks.facebook']}>
                                            <StyledInput
                                                placeholder="Facebook Page URL"
                                                value={socialLinks.facebook}
                                                onChange={(e) => {
                                                    setSocialLinks({ ...socialLinks, facebook: e.target.value });
                                                    validateField('socialLinks.facebook', e.target.value);
                                                }}
                                            />
                                            <FormErrorMessage>{errors['socialLinks.facebook']}</FormErrorMessage>
                                        </FormControl>
                                    </HStack>

                                    <HStack spacing={2}>
                                        <Icon as={FaTwitter} color="blue.400" boxSize={5} />
                                        <FormControl isInvalid={!!errors['socialLinks.twitter']}>
                                            <StyledInput
                                                placeholder="Twitter URL"
                                                value={socialLinks.twitter}
                                                onChange={(e) => {
                                                    setSocialLinks({ ...socialLinks, twitter: e.target.value });
                                                    validateField('socialLinks.twitter', e.target.value);
                                                }}
                                            />
                                            <FormErrorMessage>{errors['socialLinks.twitter']}</FormErrorMessage>
                                        </FormControl>
                                    </HStack>

                                    <HStack spacing={2}>
                                        <Icon as={FaInstagram} color="pink.600" boxSize={5} />
                                        <FormControl isInvalid={!!errors['socialLinks.instagram']}>
                                            <StyledInput
                                                placeholder="Instagram URL"
                                                value={socialLinks.instagram}
                                                onChange={(e) => {
                                                    setSocialLinks({ ...socialLinks, instagram: e.target.value });
                                                    validateField('socialLinks.instagram', e.target.value);
                                                }}
                                            />
                                            <FormErrorMessage>{errors['socialLinks.instagram']}</FormErrorMessage>
                                        </FormControl>
                                    </HStack>

                                    <HStack spacing={2}>
                                        <Icon as={FaYoutube} color="red.600" boxSize={5} />
                                        <FormControl isInvalid={!!errors['socialLinks.youtube']}>
                                            <StyledInput
                                                placeholder="YouTube Channel URL"
                                                value={socialLinks.youtube}
                                                onChange={(e) => {
                                                    setSocialLinks({ ...socialLinks, youtube: e.target.value });
                                                    validateField('socialLinks.youtube', e.target.value);
                                                }}
                                            />
                                            <FormErrorMessage>{errors['socialLinks.youtube']}</FormErrorMessage>
                                        </FormControl>
                                    </HStack>
                                </VStack>
                            </Box>

                            {/* Logo Upload */}
                            <Box bg="white" borderRadius="md" p={6} shadow="md">
                                <Flex align="center" gap={2} mb={6}>
                                    <Icon as={FaStar} color="gray.600" boxSize={5} />
                                    <Text fontSize="lg" fontWeight="semibold">Agency Logo</Text>
                                </Flex>
                                <FormControl isInvalid={!!errors.logo}>
                                    <FormLabel fontSize="md" color="gray.600">Upload Logo (Max 5MB)</FormLabel>
                                    <StyledInput
                                        type="file"
                                        accept="image/*"
                                        p={1}
                                        onChange={handleLogoChange}
                                    />
                                    <FormErrorMessage>{errors.logo}</FormErrorMessage>
                                    <Text fontSize="xs" color="gray.500" mt={2}>
                                        JPG, PNG, or WEBP format. Maximum 5MB.
                                    </Text>
                                    {logoFile && (
                                        <Text fontSize="sm" color="green.600" mt={2}>
                                            ✓ {logoFile.name} selected
                                        </Text>
                                    )}
                                </FormControl>
                            </Box>

                            {/* Submit */}
                            <Button
                                colorScheme="green"
                                size="lg"
                                isLoading={isSubmitting}
                                onClick={handleSubmit}
                                loadingText="Submitting..."
                            >
                                Submit Registration
                            </Button>
                        </VStack>
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    );
}