'use client'
import React, { useState } from 'react';
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
  InputGroup,
  InputRightAddon,
  Tag,
  TagLabel,
  TagCloseButton
} from "@chakra-ui/react";
import {
  FaStar,
  FaUser,
  FaGlobe,
  FaEnvelope,
  FaPlus,
  FaTrash,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLanguage,
  FaBriefcase,
  FaGraduationCap,
  FaSuitcase,
  FaCheckCircle
} from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { handleUpload } from '../../../../handlers/contentUploading/contentUploading';

// Yup validation schema
const validationSchema = Yup.object({
  fullName: Yup.string().trim().required('Full Name is required'),
  title: Yup.string().trim().required('Professional Title is required'),
  locationCity: Yup.string().trim().required('City is required'),
  locationCountry: Yup.string().trim().required('Country is required'),
  experienceYears: Yup.number().min(0, 'Years of Experience must be 0 or more').required('Years of Experience is required'),
  phone: Yup.string().matches(/^\+92[0-9]{10}$/, 'Phone Number must be valid (e.g., +923001234567)').required('Phone Number is required'),
  email: Yup.string().email('Valid Email is required').required('Email is required'),
  officeAddress: Yup.string().trim().required('Office Address is required'),
  successRate: Yup.number().min(1, 'Success Rate must be between 1 and 100').max(100, 'Success Rate must be between 1 and 100').required('Success Rate is required'),
  clientsHelped: Yup.number().min(0, 'Clients Helped must be 0 or more').required('Clients Helped is required'),
  about: Yup.string().trim().required('About Description is required'),
  portfolioPdf: Yup.mixed().required('Portfolio PDF is required'),
  profilePhoto: Yup.mixed().required('Profile Photo is required'),
  specializations: Yup.array().min(1, 'At least one Specialization is required').of(Yup.string().trim().required()),
  languages: Yup.array().min(1, 'At least one Language is required').of(Yup.string().trim().required()),
  services: Yup.array().min(1, 'At least one Service is required').of(Yup.string().trim().required()),
  portfolioItems: Yup.array().min(1, 'At least one Portfolio item with valid description and success rate is required').of(
    Yup.object({
      title: Yup.string().trim().required('Title is required'),
      description: Yup.string().trim().required('Description is required'),
      successRate: Yup.number().min(1, 'Success Rate must be between 1 and 100').max(100, 'Success Rate must be between 1 and 100').required('Success Rate is required'),
      year: Yup.string().trim().required('Year is required')
    })
  ),
  socialLinks: Yup.object({
    twitter: Yup.string().url('Valid Twitter URL is required').optional(),
    instagram: Yup.string().url('Valid Instagram URL is required').optional(),
    youtube: Yup.string().url('Valid YouTube URL is required').optional()
  }),
  videoLinks: Yup.array().of(Yup.string().url('Valid Video URL is required').optional())
});

export default function ConsultantRegistration() {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newSpecialization, setNewSpecialization] = useState('');
  const [newService, setNewService] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    locationCity: '',
    locationCountry: '',
    experienceYears: '',
    phone: '',
    email: '',
    officeAddress: '',
    successRate: '',
    clientsHelped: '',
    about: '',
    portfolioPdf: null,
    profilePhoto: null
  });
  const [errors, setErrors] = useState({});
  const [specializations, setSpecializations] = useState(['Work Permits', 'Student Visas', 'Job Placement', 'Business Immigration']);
  const [languages, setLanguages] = useState([]);
  const [socialLinks, setSocialLinks] = useState({ twitter: '', instagram: '', youtube: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [profilePdf, setPortfolioPdf] = useState(null);
  const [portfolioItems, setPortfolioItems] = useState([
    { title: 'Successful Work Permit Applications', description: '', successRate: '', year: '2023-2024' },
    { title: 'Guided Student Visa Approvals', description: '', successRate: '', year: '2023-2024' }
  ]);
  const [services, setServices] = useState([
    'Client Consultation & Guidance',
    'Documentation Assistance',
    'Visa/Work Permit Processing',
    'Student Visa & Admission Services'
  ]);
  const [videoLinks, setVideoLinks] = useState(['']);

  // Validate individual field on change
  const validateField = async (name, value) => {
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: '' }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };

  // Validate portfolio items on change
  const validatePortfolioItem = async (index, field, value) => {
    const updatedPortfolio = [...portfolioItems];
    updatedPortfolio[index][field] = value;
    try {
      await validationSchema.validateAt('portfolioItems', { portfolioItems: updatedPortfolio });
      setErrors((prev) => ({ ...prev, portfolioItems: '' }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [`portfolioItems[${index}].${field}`]: error.message }));
    }
  };

  // Handlers for dynamic fields
  const addLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      const updatedLanguages = [...languages, newLanguage.trim()];
      setLanguages(updatedLanguages);
      setNewLanguage('');
      validateField('languages', updatedLanguages);
    } else if (!newLanguage.trim()) {
      setErrors((prev) => ({ ...prev, newLanguage: 'Language cannot be empty' }));
    }
  };

  const removeLanguage = (lang) => {
    const updatedLanguages = languages.filter((l) => l !== lang);
    setLanguages(updatedLanguages);
    validateField('languages', updatedLanguages);
  };

  const addVideoLink = () => {
    if (videoLinks.length < 5) {
      const updatedVideoLinks = [...videoLinks, ''];
      setVideoLinks(updatedVideoLinks);
      validateField('videoLinks', updatedVideoLinks);
    } else {
      toast({
        title: "Maximum 5 video links allowed",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const removeVideoLink = (index) => {
    const updatedVideoLinks = videoLinks.filter((_, i) => i !== index);
    setVideoLinks(updatedVideoLinks);
    validateField('videoLinks', updatedVideoLinks);
  };

  const handlePortfolioChange = (index, field, value) => {
    const newPortfolio = [...portfolioItems];
    newPortfolio[index][field] = value;
    setPortfolioItems(newPortfolio);
    validatePortfolioItem(index, field, value);
  };

  const handlePDFChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["application/pdf"];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Only PDF files are allowed.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setPortfolioPdf(file);
    setFormData((prev) => ({ ...prev, portfolioPdf: file }));
    validateField("portfolioPdf", file);
  };


  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
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
    setProfileImage(file);
    setFormData((prev) => ({ ...prev, profilePhoto: file }));
    validateField('profilePhoto', file);
  };


  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await validationSchema.validate(
        {
          ...formData,
          specializations,
          languages,
          services,
          portfolioItems,
          socialLinks,
          videoLinks
        },
        { abortEarly: false }
      );
      setErrors({});

      const profPdf = profileImage ? await handleUpload(profileImage) : null;
      const pdfUrl = profPdf?.data?.url || "";
      const profImg = profileImage ? await handleUpload(profileImage) : null;
      const ImageUrl = profImg?.data?.url || "";

      const submissionData = {
        ...formData,
        experienceYears: Number(formData.experienceYears),
        successRate: Number(formData.successRate),
        clientsHelped: Number(formData.clientsHelped),
        specializations: specializations.filter((spec) => spec.trim() !== ''),
        languages: languages.filter((lang) => lang.trim() !== ''),
        socialLinks,
        portfolioItems: portfolioItems.filter((item) => item.description && item.successRate),
        services: services.filter((service) => service.trim() !== ''),
        videoLinks: videoLinks.filter((link) => link.trim() !== ''),
        profilePhoto: ImageUrl,
        profilePdf: pdfUrl,
      };

      const response = await fetch('/api/consultant', {
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
          description: "Your immigration consultant registration has been submitted for review. You will be notified once it's processed.",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
        router.push('/recruitment/consultancies');
        // Reset form
        setFormData({
          fullName: '',
          title: '',
          locationCity: '',
          locationCountry: '',
          experienceYears: '',
          phone: '',
          email: '',
          officeAddress: '',
          successRate: '',
          clientsHelped: '',
          about: '',
          portfolioPdf: null,
          profilePhoto: null
        });
        setSpecializations(['Work Permits', 'Student Visas', 'Job Placement', 'Business Immigration']);
        setLanguages([]);
        setSocialLinks({ twitter: '', instagram: '', youtube: '' });
        setPortfolioItems([
          { title: 'Successful Work Permit Applications', description: '', successRate: '', year: '2023-2024' },
          { title: 'Guided Student Visa Approvals', description: '', successRate: '', year: '2023-2024' }
        ]);
        setServices(['Client Consultation & Guidance', 'Documentation Assistance', 'Visa/Work Permit Processing', 'Student Visa & Admission Services']);
        setVideoLinks(['']);
        setProfileImage(null);
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
          <VStack spacing={4}>
            <HStack spacing={2}>
              <Icon as={FaStar} color="white" boxSize={6} />
              <Text fontSize="2xl" fontWeight="bold" color="white">
                Premium Consultant Registration
              </Text>
              <Icon as={FaStar} color="white" boxSize={6} />
            </HStack>
            <Text color="gray.100" textAlign="center">
              Exclusive registration for elite consultancies
            </Text>
            <Badge bg="white" color="green.700" px={4} py={1} rounded="full">
              Pakistan's Premier Network
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
              {/* Professional Details */}
              <Box bg="white" borderRadius="md" p={6} shadow="md">
                <Flex align="center" gap={2} mb={6}>
                  <Icon as={FaUser} color="gray.600" boxSize={5} />
                  <Text fontSize="lg" fontWeight="semibold">Professional Details</Text>
                </Flex>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                  <FormControl isInvalid={!!errors.fullName}>
                    <FormLabel fontSize="md" color="gray.600">Full Name</FormLabel>
                    <Input
                      value={formData.fullName}
                      placeholder="Full Name"
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        validateField('fullName', e.target.value);
                      }}
                    />
                    <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.title}>
                    <FormLabel fontSize="md" color="gray.600">Professional Title</FormLabel>
                    <Input
                      placeholder="e.g., Senior Immigration Consultant"
                      value={formData.title}
                      onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value });
                        validateField('title', e.target.value);
                      }}
                    />
                    <FormErrorMessage>{errors.title}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.locationCity}>
                    <FormLabel fontSize="md" color="gray.600">City</FormLabel>
                    <Input
                      value={formData.locationCity}
                      placeholder="City"
                      onChange={(e) => {
                        setFormData({ ...formData, locationCity: e.target.value });
                        validateField('locationCity', e.target.value);
                      }}
                    />
                    <FormErrorMessage>{errors.locationCity}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.locationCountry}>
                    <FormLabel fontSize="md" color="gray.600">Country</FormLabel>
                    <Input
                      value={formData.locationCountry}
                      placeholder="Country"
                      onChange={(e) => {
                        setFormData({ ...formData, locationCountry: e.target.value });
                        validateField('locationCountry', e.target.value);
                      }}
                    />
                    <FormErrorMessage>{errors.locationCountry}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.experienceYears}>
                    <FormLabel fontSize="md" color="gray.600">Years of Experience</FormLabel>
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      value={formData.experienceYears}
                      placeholder="Years of Experience"
                      onChange={(e) => {
                        setFormData({ ...formData, experienceYears: e.target.value });
                        validateField('experienceYears', e.target.value);
                      }}
                    />
                    <FormErrorMessage>{errors.experienceYears}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.successRate}>
                    <FormLabel fontSize="md" color="gray.600">Success Rate (%)</FormLabel>
                    <InputGroup>
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        step="1"
                        value={formData.successRate}
                        placeholder="Success Rate"
                        onChange={(e) => {
                          setFormData({ ...formData, successRate: e.target.value });
                          validateField('successRate', e.target.value);
                        }}
                      />
                      <InputRightAddon>%</InputRightAddon>
                    </InputGroup>
                    <FormErrorMessage>{errors.successRate}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.clientsHelped}>
                    <FormLabel fontSize="md" color="gray.600">Clients Helped</FormLabel>
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      value={formData.clientsHelped}
                      placeholder="Clients Helped"
                      onChange={(e) => {
                        setFormData({ ...formData, clientsHelped: e.target.value });
                        validateField('clientsHelped', e.target.value);
                      }}
                    />
                    <FormErrorMessage>{errors.clientsHelped}</FormErrorMessage>
                  </FormControl>
                </Grid>
              </Box>

              {/* Specializations */}
              <Box bg="white" borderRadius="md" p={6} shadow="md">
                <Flex align="center" gap={2} mb={6}>
                  <Icon as={FaBriefcase} color="gray.600" boxSize={5} />
                  <Text fontSize="lg" fontWeight="semibold">Specializations</Text>
                </Flex>
                <FormControl isInvalid={!!errors.specializations}>
                  <VStack align="start" spacing={2} mb={2}>
                    {specializations.map((spec, index) => (
                      <HStack key={index} spacing={2}>
                        <Text>{spec}</Text>
                        <IconButton
                          icon={<FaTrash />}
                          colorScheme="red"
                          variant="ghost"
                          size="xs"
                          onClick={() => {
                            const updatedSpecializations = specializations.filter((_, i) => i !== index);
                            setSpecializations(updatedSpecializations);
                            validateField('specializations', updatedSpecializations);
                          }}
                          aria-label="Remove specialization"
                        />
                      </HStack>
                    ))}
                  </VStack>
                  <HStack>
                    <FormControl isInvalid={!!errors.newSpecialization}>
                      <Input
                        placeholder="Add specialization (e.g., Work Permits)"
                        value={newSpecialization}
                        onChange={(e) => setNewSpecialization(e.target.value)}
                      />
                      <FormErrorMessage>{errors.newSpecialization}</FormErrorMessage>
                    </FormControl>
                    <Button
                      onClick={() => {
                        if (newSpecialization.trim() && !specializations.includes(newSpecialization.trim())) {
                          const updatedSpecializations = [...specializations, newSpecialization.trim()];
                          setSpecializations(updatedSpecializations);
                          setNewSpecialization('');
                          validateField('specializations', updatedSpecializations);
                        } else if (!newSpecialization.trim()) {
                          setErrors((prev) => ({ ...prev, newSpecialization: 'Specialization cannot be empty' }));
                        }
                      }}
                      colorScheme="green"
                      size="md"
                    >
                      Add
                    </Button>
                  </HStack>
                  <FormErrorMessage>{errors.specializations}</FormErrorMessage>
                  <Text fontSize="xs" color="gray.500" mt={2}>
                    Add or edit your specializations.
                  </Text>
                </FormControl>
              </Box>

              {/* Portfolio */}
              <Box bg="white" borderRadius="md" p={6} shadow="md">
                <Flex align="center" gap={2} mb={6}>
                  <Icon as={FaSuitcase} color="gray.600" boxSize={5} />
                  <Text fontSize="lg" fontWeight="semibold">Portfolio</Text>
                </Flex>
                <FormControl isInvalid={!!errors.portfolioItems}>
                  <VStack spacing={4} align="stretch">
                    {portfolioItems.map((item, index) => (
                      <Box key={index}>
                        <Text fontWeight="medium" mb={2}>{item.title}</Text>
                        <FormControl isInvalid={!!errors[`portfolioItems[${index}].description`]}>
                          <Input
                            placeholder="Description (e.g., Helped 150+ professionals secure work permits in Canada, USA, and Australia)"
                            value={item.description}
                            onChange={(e) => handlePortfolioChange(index, 'description', e.target.value)}
                            mb={2}
                          />
                          <FormErrorMessage>{errors[`portfolioItems[${index}].description`]}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors[`portfolioItems[${index}].successRate`]}>
                          <InputGroup>
                            <Input
                              type="number"
                              placeholder="Success Rate (e.g., 95)"
                              value={item.successRate}
                              onChange={(e) => handlePortfolioChange(index, 'successRate', e.target.value)}
                              min="1"
                              max="100"
                              step="1"
                              mb={2}
                            />
                            <InputRightAddon>%</InputRightAddon>
                          </InputGroup>
                          <FormErrorMessage>{errors[`portfolioItems[${index}].successRate`]}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors[`portfolioItems[${index}].year`]}>
                          <Input
                            placeholder="Year (e.g., 2023-2024)"
                            value={item.year}
                            onChange={(e) => handlePortfolioChange(index, 'year', e.target.value)}
                          />
                          <FormErrorMessage>{errors[`portfolioItems[${index}].year`]}</FormErrorMessage>
                        </FormControl>
                      </Box>
                    ))}
                  </VStack>
                  <FormErrorMessage>{errors.portfolioItems}</FormErrorMessage>
                </FormControl>
              </Box>

              {/* About */}
              <Box bg="white" borderRadius="md" p={6} shadow="md">
                <Flex align="center" gap={2} mb={6}>
                  <Icon as={FaUser} color="gray.600" boxSize={5} />
                  <Text fontSize="lg" fontWeight="semibold">About You</Text>
                </Flex>
                <FormControl isInvalid={!!errors.about}>
                  <Textarea
                    placeholder="Describe your experience, specializations, and track record (e.g., Ahmed Hassan is a highly experienced immigration consultant with over 12 years...)"
                    value={formData.about}
                    onChange={(e) => {
                      setFormData({ ...formData, about: e.target.value });
                      validateField('about', e.target.value);
                    }}
                    rows={6}
                  />
                  <FormErrorMessage>{errors.about}</FormErrorMessage>
                </FormControl>
              </Box>

              {/* Services */}
              <Box bg="white" borderRadius="md" p={6} shadow="md">
                <Flex align="center" gap={2} mb={6}>
                  <Icon as={FaCheckCircle} color="gray.600" boxSize={5} />
                  <Text fontSize="lg" fontWeight="semibold">Our Services</Text>
                </Flex>
                <FormControl isInvalid={!!errors.services}>
                  <VStack align="start" spacing={2} mb={2}>
                    {services.map((service, index) => (
                      <HStack key={index} spacing={2}>
                        <Icon as={FaCheckCircle} color="green.500" />
                        <Text>{service}</Text>
                        <IconButton
                          icon={<FaTrash />}
                          colorScheme="red"
                          variant="ghost"
                          size="xs"
                          onClick={() => {
                            const updatedServices = services.filter((_, i) => i !== index);
                            setServices(updatedServices);
                            validateField('services', updatedServices);
                          }}
                          aria-label="Remove service"
                        />
                      </HStack>
                    ))}
                  </VStack>
                  <HStack>
                    <FormControl isInvalid={!!errors.newService}>
                      <Input
                        placeholder="Add service (e.g., Client Consultation)"
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                      />
                      <FormErrorMessage>{errors.newService}</FormErrorMessage>
                    </FormControl>
                    <Button
                      onClick={() => {
                        if (newService.trim() && !services.includes(newService.trim())) {
                          const updatedServices = [...services, newService.trim()];
                          setServices(updatedServices);
                          setNewService('');
                          validateField('services', updatedServices);
                        } else if (!newService.trim()) {
                          setErrors((prev) => ({ ...prev, newService: 'Service cannot be empty' }));
                        }
                      }}
                      colorScheme="green"
                      size="md"
                    >
                      Add
                    </Button>
                  </HStack>
                  <FormErrorMessage>{errors.services}</FormErrorMessage>
                  <Text fontSize="xs" color="gray.500" mt={2}>
                    Add or edit your services.
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
                      <Tag key={lang} size="md" variant="solid" colorScheme="gray">
                        <TagLabel>{lang}</TagLabel>
                        <TagCloseButton onClick={() => removeLanguage(lang)} />
                      </Tag>
                    ))}
                  </HStack>
                  <HStack>
                    <FormControl isInvalid={!!errors.newLanguage}>
                      <Input
                        placeholder="Add language (e.g., English)"
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                      />
                      <FormErrorMessage>{errors.newLanguage}</FormErrorMessage>
                    </FormControl>
                    <Button onClick={addLanguage} colorScheme="green" size="md">
                      Add
                    </Button>
                  </HStack>
                  <FormErrorMessage>{errors.languages}</FormErrorMessage>
                </FormControl>
              </Box>

              {/* YouTube Videos */}
              <Box bg="white" borderRadius="md" p={6} shadow="md">
                <Flex align="center" gap={2} mb={6}>
                  <Icon as={FaYoutube} color="red.600" boxSize={5} />
                  <Text fontSize="lg" fontWeight="semibold">YouTube Videos (Optional)</Text>
                </Flex>
                <VStack spacing={2} align="stretch">
                  {videoLinks.map((link, index) => (
                    <HStack key={index}>
                      <FormControl isInvalid={!!errors[`videoLinks[${index}]`]}>
                        <Input
                          placeholder="Video URL (e.g., https://youtube.com/...)"
                          value={link}
                          onChange={(e) => {
                            const newLinks = [...videoLinks];
                            newLinks[index] = e.target.value;
                            setVideoLinks(newLinks);
                            validateField(`videoLinks[${index}]`, e.target.value);
                          }}
                        />
                        <FormErrorMessage>{errors[`videoLinks[${index}]`]}</FormErrorMessage>
                      </FormControl>
                      <IconButton
                        icon={<FaTrash />}
                        colorScheme="red"
                        variant="ghost"
                        size="md"
                        onClick={() => removeVideoLink(index)}
                        isDisabled={videoLinks.length === 1}
                        aria-label="Remove video link"
                      />
                    </HStack>
                  ))}
                  {videoLinks.length < 5 && (
                    <Button leftIcon={<FaPlus />} onClick={addVideoLink} size="md" variant="outline">
                      Add Video Link
                    </Button>
                  )}
                </VStack>
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
                    <Input
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
                    <Input
                      type="email"
                      value={formData.email}
                      placeholder="email"
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        validateField('email', e.target.value);
                      }}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.officeAddress}>
                    <FormLabel fontSize="md" color="gray.600">Office Address</FormLabel>
                    <Textarea
                      value={formData.officeAddress}
                      placeholder="Office address"
                      onChange={(e) => {
                        setFormData({ ...formData, officeAddress: e.target.value });
                        validateField('officeAddress', e.target.value);
                      }}
                      rows={3}
                    />
                    <FormErrorMessage>{errors.officeAddress}</FormErrorMessage>
                  </FormControl>
                </VStack>
              </Box>

              {/* Social Links */}
              <Box bg="white" borderRadius="md" p={6} shadow="md">
                <Flex align="center" gap={2} mb={6}>
                  <Icon as={FaGlobe} color="gray.600" boxSize={5} />
                  <Text fontSize="lg" fontWeight="semibold">Social Links</Text>
                </Flex>
                <VStack spacing={3} align="stretch">
                  <HStack spacing={2}>
                    <Icon as={FaTwitter} color="green.400" boxSize={5} />
                    <FormControl isInvalid={!!errors['socialLinks.twitter']}>
                      <Input
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
                      <Input
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
                      <Input
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

              {/* Uploads */}
              <Box bg="white" borderRadius="md" p={6} shadow="md">
                <Flex align="center" gap={2} mb={6}>
                  <Icon as={FaGraduationCap} color="gray.600" boxSize={5} />
                  <Text fontSize="lg" fontWeight="semibold">Uploads</Text>
                </Flex>
                <VStack spacing={4} align="stretch">
                  <FormControl isInvalid={!!errors.profilePhoto}>
                    <FormLabel fontSize="md" color="gray.600">Profile Photo</FormLabel>
                    <Input type="file" accept="image/*" p={1} onChange={handleImageChange} />
                    <FormErrorMessage>{errors.profilePhoto}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.portfolioPdf}>
                    <FormLabel fontSize="md" color="gray.600">Portfolio PDF</FormLabel>
                    <Input type="file" accept=".pdf" p={1} onChange={handlePDFChange} />
                    <FormErrorMessage>{errors.portfolioPdf}</FormErrorMessage>
                  </FormControl>

                </VStack>
              </Box>

              {/* Submit */}
              <Button
                colorScheme="green"
                size="lg"
                isLoading={isSubmitting}
                onClick={handleSubmit}
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