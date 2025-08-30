'use client'
import React, { useState } from 'react';
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
  Icon,
  Badge,
  Flex,
  IconButton,
  useToast,
  Input,
  Tag,
  TagLabel,
  TagCloseButton
} from "@chakra-ui/react";
import {
  FaStar,
  FaBuilding,
  FaUser,
  FaGlobe,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaPlus,
  FaTrash,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaLanguage,
  FaBriefcase,
  FaGraduationCap,
  FaSuitcase,
  FaCheckCircle
} from "react-icons/fa";
import { useRouter } from 'next/navigation';

export default function ConsultantRegistration() {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newSpecialization, setNewSpecialization] = useState('');
  const [newService, setNewService] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const router = useRouter()
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

  const [specializations, setSpecializations] = useState(['Work Permits', 'Student Visas', 'Job Placement', 'Business Immigration']);
  const [languages, setLanguages] = useState([]);
  const [socialLinks, setSocialLinks] = useState({ twitter: '', instagram: '', youtube: '' });
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

  // Handlers for dynamic fields
  const addLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (lang) => {
    setLanguages(languages.filter(l => l !== lang));
  };

  const addVideoLink = () => {
    if (videoLinks.length < 5) {
      setVideoLinks([...videoLinks, '']);
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
    setVideoLinks(videoLinks.filter((_, i) => i !== index));
  };

  const handlePortfolioChange = (index, field, value) => {
    const newPortfolio = [...portfolioItems];
    newPortfolio[index][field] = value;
    setPortfolioItems(newPortfolio);
  };

  // Client-side validation
  const validateForm = () => {
    const errors = [];
    const phoneRegex = /^\+92[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) errors.push('Full Name is required');
    if (!formData.title.trim()) errors.push('Professional Title is required');
    if (!formData.locationCity.trim()) errors.push('City is required');
    if (!formData.locationCountry.trim()) errors.push('Country is required');
    if (!formData.experienceYears || formData.experienceYears < 0) errors.push('Valid Years of Experience is required');
    if (!formData.phone || !phoneRegex.test(formData.phone)) errors.push('Valid Phone Number (e.g., +923001234567) is required');
    if (!formData.email || !emailRegex.test(formData.email)) errors.push('Valid Email is required');
    if (!formData.officeAddress.trim()) errors.push('Office Address is required');
    if (!formData.successRate || formData.successRate < 0 || formData.successRate > 100) errors.push('Success Rate must be between 0 and 100');
    if (!formData.clientsHelped || formData.clientsHelped < 0) errors.push('Valid Clients Helped is required');
    if (!formData.about.trim()) errors.push('About Description is required');
    if (languages.length === 0) errors.push('At least one Language is required');
    if (specializations.length === 0) errors.push('At least one Specialization is required');
    if (services.length === 0) errors.push('At least one Service is required');
    if (portfolioItems.filter(item => item.description && item.successRate).length === 0) errors.push('At least one Portfolio item with description and success rate is required');

    return errors;
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const errors = validateForm();

    if (errors.length > 0) {
      toast({
        title: "Validation Errors",
        description: errors.join(', '),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }

    const submissionData = {
      ...formData,
      experienceYears: Number(formData.experienceYears),
      successRate: Number(formData.successRate),
      clientsHelped: Number(formData.clientsHelped),
      specializations: specializations.filter(spec => spec.trim() !== ''),
      languages: languages.filter(lang => lang.trim() !== ''),
      socialLinks: socialLinks,
      portfolioItems: portfolioItems.filter(item => item.description && item.successRate),
      services: services.filter(service => service.trim() !== ''),
      videoLinks: videoLinks.filter(link => link.trim() !== ''),
    };

    try {
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
        router.push('/recruitment/consultancies')
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
      console.error('Submission error:', error);
      toast({
        title: "Network Error",
        description: "Unable to submit registration. Please check your connection and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
                  <FormControl>
                    <FormLabel fontSize="md" color="gray.600">Full Name</FormLabel>
                    <Input value={formData.fullName} placeholder="Full Name" onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="md" color="gray.600">Professional Title</FormLabel>
                    <Input placeholder="e.g., Senior Immigration Consultant" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="md" color="gray.600">City</FormLabel>
                    <Input value={formData.locationCity} placeholder="City" onChange={(e) => setFormData({ ...formData, locationCity: e.target.value })} />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="md" color="gray.600">Country</FormLabel>
                    <Input value={formData.locationCountry} placeholder="Country" onChange={(e) => setFormData({ ...formData, locationCountry: e.target.value })} />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="md" color="gray.600">Years of Experience</FormLabel>
                    <Input type="number" value={formData.experienceYears} placeholder="Years of Experience" onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })} />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="md" color="gray.600">Success Rate (%)</FormLabel>
                    <Input type="number" max={100} value={formData.successRate} placeholder="Success Rate" onChange={(e) => setFormData({ ...formData, successRate: e.target.value })} />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="md" color="gray.600">Clients Helped</FormLabel>
                    <Input type="number" value={formData.clientsHelped} placeholder="Clients Helped" onChange={(e) => setFormData({ ...formData, clientsHelped: e.target.value })} />
                  </FormControl>
                </Grid>
              </Box>

              <Box bg="white" borderRadius="md" p={6} shadow="md">
                <Flex align="center" gap={2} mb={6}>
                  <Icon as={FaBriefcase} color="gray.600" boxSize={5} />
                  <Text fontSize="lg" fontWeight="semibold">Specializations</Text>
                </Flex>
                <VStack align="start" spacing={2} mb={2}>
                  {specializations.map((spec, index) => (
                    <HStack key={index} spacing={2}>
                      <Text>{spec}</Text>
                      <IconButton
                        icon={<FaTrash />}
                        colorScheme="red"
                        variant="ghost"
                        size="xs"
                        onClick={() => setSpecializations(specializations.filter((_, i) => i !== index))}
                        aria-label="Remove specialization"
                      />
                    </HStack>
                  ))}
                </VStack>
                <HStack>
                  <Input
                    placeholder="Add specialization (e.g., Work Permits)"
                    value={newSpecialization}
                    onChange={(e) => setNewSpecialization(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      if (newSpecialization.trim() && !specializations.includes(newSpecialization.trim())) {
                        setSpecializations([...specializations, newSpecialization.trim()]);
                        setNewSpecialization('');
                      }
                    }}
                    colorScheme="green"
                    size="md"
                  >
                    Add
                  </Button>
                </HStack>
                <Text fontSize="xs" color="gray.500" mt={2}>
                  Add or edit your specializations.
                </Text>
              </Box>

              {/* Portfolio */}
              <Box bg="white" borderRadius="md" p={6} shadow="md">
                <Flex align="center" gap={2} mb={6}>
                  <Icon as={FaSuitcase} color="gray.600" boxSize={5} />
                  <Text fontSize="lg" fontWeight="semibold">Portfolio</Text>
                </Flex>
                <VStack spacing={4} align="stretch">
                  {portfolioItems.map((item, index) => (
                    <Box key={index}>
                      <Text fontWeight="medium" mb={2}>{item.title}</Text>
                      <Input
                        placeholder="Description (e.g., Helped 150+ professionals secure work permits in Canada, USA, and Australia)"
                        value={item.description}
                        onChange={(e) => handlePortfolioChange(index, 'description', e.target.value)}
                        mb={2}
                      />
                      <Input
                        placeholder="Success Rate (e.g., 95%)"
                        value={item.successRate}
                        onChange={(e) => handlePortfolioChange(index, 'successRate', e.target.value)}
                        mb={2}
                      />
                      <Input
                        placeholder="Year (e.g., 2023-2024)"
                        value={item.year}
                        onChange={(e) => handlePortfolioChange(index, 'year', e.target.value)}
                      />
                    </Box>
                  ))}
                </VStack>
              </Box>

              {/* About */}
              <Box bg="white" borderRadius="md" p={6} shadow="md">
                <Flex align="center" gap={2} mb={6}>
                  <Icon as={FaUser} color="gray.600" boxSize={5} />
                  <Text fontSize="lg" fontWeight="semibold">About You</Text>
                </Flex>
                <Textarea
                  placeholder="Describe your experience, specializations, and track record (e.g., Ahmed Hassan is a highly experienced immigration consultant with over 12 years...)"
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  rows={6}
                />
              </Box>

              {/* Services */}
              <Box bg="white" borderRadius="md" p={6} shadow="md">
                <Flex align="center" gap={2} mb={6}>
                  <Icon as={FaCheckCircle} color="gray.600" boxSize={5} />
                  <Text fontSize="lg" fontWeight="semibold">Our Services</Text>
                </Flex>
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
                        onClick={() => setServices(services.filter((_, i) => i !== index))}
                        aria-label="Remove service"
                      />
                    </HStack>
                  ))}
                </VStack>
                <HStack>
                  <Input
                    placeholder="Add service (e.g., Client Consultation)"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      if (newService.trim() && !services.includes(newService.trim())) {
                        setServices([...services, newService.trim()]);
                        setNewService('');
                      }
                    }}
                    colorScheme="green"
                    size="md"
                  >
                    Add
                  </Button>
                </HStack>
                <Text fontSize="xs" color="gray.500" mt={2}>
                  Add or edit your services.
                </Text>
              </Box>

              {/* Languages */}
              <Box bg="white" borderRadius="md" p={6} shadow="md">
                <Flex align="center" gap={2} mb={6}>
                  <Icon as={FaLanguage} color="gray.600" boxSize={5} />
                  <Text fontSize="lg" fontWeight="semibold">Languages Spoken</Text>
                </Flex>
                <HStack spacing={2} wrap="wrap" mb={3}>
                  {languages.map((lang) => (
                    <Tag key={lang} size="md" variant="solid" colorScheme="gray">
                      <TagLabel>{lang}</TagLabel>
                      <TagCloseButton onClick={() => removeLanguage(lang)} />
                    </Tag>
                  ))}
                </HStack>
                <HStack>
                  <Input
                    placeholder="Add language (e.g., English)"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                  />
                  <Button onClick={addLanguage} colorScheme="green" size="md">
                    Add
                  </Button>
                </HStack>
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
                      <Input
                        placeholder="Video URL (e.g., https://youtube.com/...)"
                        value={link}
                        onChange={(e) => {
                          const newLinks = [...videoLinks];
                          newLinks[index] = e.target.value;
                          setVideoLinks(newLinks);
                        }}
                      />
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
                  <FormControl>
                    <FormLabel fontSize="md" color="gray.600">Phone Number</FormLabel>
                    <Input type="tel" value={formData.phone} placeholder="Phone number" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="md" color="gray.600">Email Address</FormLabel>
                    <Input type="email" value={formData.email} placeholder="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="md" color="gray.600">Office Address</FormLabel>
                    <Textarea value={formData.officeAddress} placeholder="office address" onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })} rows={3} />
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
                    <Input
                      placeholder="Twitter URL"
                      value={socialLinks.twitter}
                      onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                    />
                  </HStack>
                  <HStack spacing={2}>
                    <Icon as={FaInstagram} color="pink.600" boxSize={5} />
                    <Input
                      placeholder="Instagram URL"
                      value={socialLinks.instagram}
                      onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                    />
                  </HStack>
                  <HStack spacing={2}>
                    <Icon as={FaYoutube} color="red.600" boxSize={5} />
                    <Input
                      placeholder="YouTube Channel URL"
                      value={socialLinks.youtube}
                      onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                    />
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
                  <FormControl>
                    <FormLabel fontSize="md" color="gray.600">Profile Photo</FormLabel>
                    <Input type="file" accept="image/*" p={1} onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.files[0] })} />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="md" color="gray.600">Portfolio PDF</FormLabel>
                    <Input type="file" accept=".pdf" p={1} onChange={(e) => setFormData({ ...formData, portfolioPdf: e.target.files[0] })} />
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