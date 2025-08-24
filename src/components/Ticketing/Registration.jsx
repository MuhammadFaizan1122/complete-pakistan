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
  Spinner,
  Select,
  Input
} from "@chakra-ui/react";
import StyledInput from '../CV/StyledInput';
import StyledSelect from '../CV/CvDirectory/StyledSelect';
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
  FaYoutube
} from "react-icons/fa";

export default function TravelAgentRegistration() {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessType: '',
    businessName: '',
    proprietorName: '',
    businessClassification: '',
    yearEstablished: '',
    iataAccreditation: '',
    serviceSpecialization: '',
    dealTypes: '',
    primaryMobile: '',
    whatsappBusiness: '',
    officeDirectLine: '',
    businessEmail: '',
    websiteUrl: '',
    officeAddress: '',
    officeTimings: '',
    workingDays: '',
    googleMapLink: '',
    corporateLogo: null,
    businessLicense: null
  });

  const [branches, setBranches] = useState([
    { name: '', address: '', phone: '', whatsapp: '' }
  ]);

  const [staff, setStaff] = useState([
    { name: '', designation: '', contact: '', whatsapp: '', ptcl: '' }
  ]);

  const [services, setServices] = useState(['']);
  const [airlines, setAirlines] = useState(['']);
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: ''
  });

  const addBranch = () => {
    setBranches([...branches, { name: '', address: '', phone: '', whatsapp: '' }]);
  };

  const removeBranch = (index) => {
    setBranches(branches.filter((_, i) => i !== index));
  };

  const addStaff = () => {
    setStaff([...staff, { name: '', designation: '', contact: '', whatsapp: '', ptcl: '' }]);
  };

  const removeStaff = (index) => {
    setStaff(staff.filter((_, i) => i !== index));
  };

  const addService = () => {
    if (services.length < 6) {
      setServices([...services, '']);
    } else {
      toast({
        title: "Maximum 6 services allowed",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const removeService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const addAirline = () => {
    if (airlines.length < 10) {
      setAirlines([...airlines, '']);
    } else {
      toast({
        title: "Maximum 10 airlines allowed",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const removeAirline = (index) => {
    setAirlines(airlines.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Validate required fields
      const requiredFields = [
        { field: 'businessType', label: 'Business Type' },
        { field: 'businessName', label: 'Business Name' },
        { field: 'proprietorName', label: 'Proprietor Name' },
        { field: 'businessClassification', label: 'Business Classification' },
        { field: 'yearEstablished', label: 'Year of Establishment' },
        { field: 'iataAccreditation', label: 'IATA Accreditation' },
        { field: 'serviceSpecialization', label: 'Service Specialization' },
        { field: 'dealTypes', label: 'Service Deals' },
        { field: 'primaryMobile', label: 'Primary Mobile' },
        { field: 'whatsappBusiness', label: 'WhatsApp Business' },
        { field: 'officeDirectLine', label: 'Office Direct Line' },
        { field: 'businessEmail', label: 'Business Email' },
        { field: 'officeAddress', label: 'Office Address' },
        { field: 'officeTimings', label: 'Office Timings' },
        { field: 'workingDays', label: 'Working Days' }
      ];

      const missingFields = requiredFields.filter(({ field }) => !formData[field]);

      if (missingFields.length > 0) {
        toast({
          title: "Missing Required Fields",
          description: `Please fill in: ${missingFields.map(f => f.label).join(', ')}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setIsSubmitting(false);
        return;
      }

      // Filter out empty services and airlines
      const filteredServices = services.filter(service => service.trim() !== '');
      const filteredAirlines = airlines.filter(airline => airline.trim() !== '');

      if (filteredServices.length === 0) {
        toast({
          title: "Services Required",
          description: "Please add at least one service",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsSubmitting(false);
        return;
      }

      if (filteredAirlines.length === 0) {
        toast({
          title: "Airlines Required",
          description: "Please add at least one partner airline",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsSubmitting(false);
        return;
      }

      // Prepare submission data
      const submissionData = {
        ...formData,
        services: filteredServices,
        airlines: filteredAirlines,
        branches: branches.filter(branch => branch.name && branch.address && branch.phone),
        staff: staff.filter(member => member.name && member.designation && member.contact),
        socialLinks
      };

      // Submit to API
      const response = await fetch('/api/ticketing-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Registration Successful!",
          description: "Your premium travel registration has been submitted for review. You will be notified once it's processed.",
          status: "success",
          duration: 7000,
          isClosable: true,
        });

        // Reset form
        setFormData({
          businessType: '',
          businessName: '',
          proprietorName: '',
          businessClassification: '',
          yearEstablished: '',
          iataAccreditation: '',
          serviceSpecialization: '',
          dealTypes: '',
          primaryMobile: '',
          whatsappBusiness: '',
          officeDirectLine: '',
          businessEmail: '',
          websiteUrl: '',
          officeAddress: '',
          officeTimings: '',
          workingDays: '',
          googleMapLink: '',
          corporateLogo: null,
          businessLicense: null
        });
        setServices(['']);
        setAirlines(['']);
        setBranches([{ name: '', address: '', phone: '', whatsapp: '' }]);
        setStaff([{ name: '', designation: '', contact: '', whatsapp: '', ptcl: '' }]);
        setSocialLinks({
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: '',
          youtube: ''
        });

      } else {
        // Handle API errors
        if (result.validationErrors) {
          const errorMessages = result.validationErrors.map(err => err.message).join(', ');
          toast({
            title: "Validation Error",
            description: errorMessages,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Submission Failed",
            description: result.error || "Something went wrong. Please try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
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
    <Box bg="gray.50" minH="100vh">
      {/* Header */}
      <Box bg="green.700" py={8}>
        <Box maxW="1440px" mx="auto" px={4}>
          <VStack spacing={4}>
            <HStack spacing={2}>
              <Icon as={FaStar} color="white" boxSize={6} />
              <Text fontSize="2xl" fontWeight="bold" color="white">
                Premium Travel Registration
              </Text>
              <Icon as={FaStar} color="white" boxSize={6} />
            </HStack>
            <Text color="gray.100" textAlign="center">
              Exclusive registration for elite travel agencies
            </Text>
            <Badge bg="white" color="green.700" px={4} py={1} rounded="full">
              Pakistan's Premier Network
            </Badge>
          </VStack>
        </Box>
      </Box>

      {/* Main Form */}
      <Box maxW="1440px" mx="auto" p={6}>
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
          {/* Left Column */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Business Details */}
              <Box bg="white" borderRadius="lg" p={6} shadow="sm">
                <Flex align="center" gap={2} mb={6}>
                  <Icon as={FaBuilding} color="gray.600" />
                  <Text fontSize="lg" fontWeight="semibold">Premium Business Details</Text>
                </Flex>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">Business Classification</FormLabel>
                    <Select placeholder="Select classification" value={formData.businessClassification} onChange={(e) => setFormData({ ...formData, businessClassification: e.target.value })}>
                      <option value="corporate">Corporate Entity</option>
                      <option value="individual">Individual Practitioner</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Company / Individual</FormLabel>
                    <Select placeholder="Select type" value={formData.businessType} onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}>
                      <option value="company">Company</option>
                      <option value="individual">Individual</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Business Name</FormLabel>
                    <Input placeholder="Business name" value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">Proprietor Name</FormLabel>
                    <Input placeholder="Full legal name" value={formData.proprietorName} onChange={(e) => setFormData({ ...formData, proprietorName: e.target.value })} />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Year of Establishment</FormLabel>
                    <Input placeholder="YYYY" value={formData.yearEstablished} onChange={(e) => setFormData({ ...formData, yearEstablished: e.target.value })} />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">IATA Accreditation</FormLabel>
                    <Select placeholder="Accreditation status" value={formData.iataAccreditation} onChange={(e) => setFormData({ ...formData, iataAccreditation: e.target.value })}>
                      <option value="full">Full IATA Member</option>
                      <option value="associate">Associate Member</option>
                      <option value="non-iata">Non-IATA</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Service Deals</FormLabel>
                    <Select placeholder="Select service type" value={formData.dealTypes} onChange={(e) => setFormData({ ...formData, dealTypes: e.target.value })}>
                      <option value="both">International & Domestic</option>
                      <option value="international">International Only</option>
                      <option value="domestic">Domestic Only</option>
                    </Select>
                  </FormControl>
                </Grid>
              </Box>

              {/* Service Portfolio */}
              <Box bg="white" borderRadius="lg" p={6} shadow="sm">
                <Flex align="center" gap={2} mb={6}>
                  <Icon as={FaGlobe} color="gray.600" />
                  <Text fontSize="lg" fontWeight="semibold">Service Portfolio</Text>
                </Flex>

                <FormControl mb={4}>
                  <FormLabel fontSize="sm">Service Specialization</FormLabel>
                  <Select placeholder="Specialization" value={formData.serviceSpecialization} onChange={(e) => setFormData({ ...formData, serviceSpecialization: e.target.value })}>
                    <option value="full-service">Full Service - International & Domestic</option>
                    <option value="domestic">Domestic Travel</option>
                    <option value="corporate">Corporate Travel Management</option>
                    <option value="leisure">Leisure Travel Expert</option>
                  </Select>
                </FormControl>

                <FormLabel fontSize="sm" mb={2}>Services Offered (Maximum 6)</FormLabel>
                <VStack spacing={2} align="stretch" mb={4}>
                  {services.map((service, index) => (
                    <HStack key={index}>
                      <Input
                        placeholder={`Service ${index + 1}`}
                        value={service}
                        onChange={(e) => {
                          const newServices = [...services];
                          newServices[index] = e.target.value;
                          setServices(newServices);
                        }}
                      />
                      <IconButton
                        icon={<FaTrash />}
                        colorScheme="red"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeService(index)}
                        isDisabled={services.length === 1}
                        aria-label="Remove service"
                      />
                    </HStack>
                  ))}
                  {services.length < 6 && (
                    <Button leftIcon={<FaPlus />} onClick={addService} size="sm" variant="outline">
                      Add Service
                    </Button>
                  )}
                </VStack>

                <FormLabel fontSize="sm" mb={2}>Partner Airlines (Maximum 10)</FormLabel>
                <VStack spacing={2} align="stretch">
                  {airlines.map((airline, index) => (
                    <HStack key={index}>
                      <Input
                        placeholder={`Airline ${index + 1}`}
                        value={airline}
                        onChange={(e) => {
                          const newAirlines = [...airlines];
                          newAirlines[index] = e.target.value;
                          setAirlines(newAirlines);
                        }}
                      />
                      <IconButton
                        icon={<FaTrash />}
                        colorScheme="red"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAirline(index)}
                        isDisabled={airlines.length === 1}
                        aria-label="Remove airline"
                      />
                    </HStack>
                  ))}
                  {airlines.length < 10 && (
                    <Button leftIcon={<FaPlus />} onClick={addAirline} size="sm" variant="outline">
                      Add Airline
                    </Button>
                  )}
                </VStack>
              </Box>

              {/* Branch Offices */}
              <Box bg="white" borderRadius="lg" p={6} shadow="sm">
                <Flex align="center" justify="space-between" mb={6}>
                  <Flex align="center" gap={2}>
                    <Icon as={FaMapMarkerAlt} color="gray.600" />
                    <Text fontSize="lg" fontWeight="semibold">Branch Offices</Text>
                  </Flex>
                  <Button leftIcon={<FaPlus />} onClick={addBranch} size="sm" colorScheme="green">
                    Add Branch
                  </Button>
                </Flex>

                <VStack spacing={4} align="stretch">
                  {branches.map((branch, index) => (
                    <Box key={index} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                      <HStack justify="space-between" mb={3}>
                        <Text fontSize="sm" fontWeight="semibold">Branch {index + 1}</Text>
                        <IconButton
                          icon={<FaTrash />}
                          colorScheme="red"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBranch(index)}
                          isDisabled={branches.length === 1}
                          aria-label="Remove branch"
                        />
                      </HStack>
                      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={3}>
                        <Input
                          placeholder="Branch Name"
                          value={branch.name}
                          onChange={(e) => {
                            const newBranches = [...branches];
                            newBranches[index].name = e.target.value;
                            setBranches(newBranches);
                          }}
                        />
                        <Input
                          placeholder="Phone Number"
                          value={branch.phone}
                          onChange={(e) => {
                            const newBranches = [...branches];
                            newBranches[index].phone = e.target.value;
                            setBranches(newBranches);
                          }}
                        />
                        <Input
                          placeholder="WhatsApp Number"
                          value={branch.whatsapp}
                          onChange={(e) => {
                            const newBranches = [...branches];
                            newBranches[index].whatsapp = e.target.value;
                            setBranches(newBranches);
                          }}
                        />
                      </Grid>
                      <Textarea
                        mt={3}
                        placeholder="Branch Address"
                        value={branch.address}
                        onChange={(e) => {
                          const newBranches = [...branches];
                          newBranches[index].address = e.target.value;
                          setBranches(newBranches);
                        }}
                      />
                    </Box>
                  ))}
                </VStack>
              </Box>

              {/* Staff Details */}
              <Box bg="white" borderRadius="lg" p={6} shadow="sm">
                <Flex align="center" justify="space-between" mb={6}>
                  <Flex align="center" gap={2}>
                    <Icon as={FaUsers} color="gray.600" />
                    <Text fontSize="lg" fontWeight="semibold">Staff Details</Text>
                  </Flex>
                  <Button leftIcon={<FaPlus />} onClick={addStaff} size="sm" colorScheme="green">
                    Add Staff
                  </Button>
                </Flex>

                <VStack spacing={4} align="stretch">
                  {staff.map((member, index) => (
                    <Box key={index} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                      <HStack justify="space-between" mb={3}>
                        <Text fontSize="sm" fontWeight="semibold">Staff Member {index + 1}</Text>
                        <IconButton
                          icon={<FaTrash />}
                          colorScheme="red"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStaff(index)}
                          isDisabled={staff.length === 1}
                          aria-label="Remove staff"
                        />
                      </HStack>
                      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={3}>
                        <Input
                          placeholder="Name"
                          value={member.name}
                          onChange={(e) => {
                            const newStaff = [...staff];
                            newStaff[index].name = e.target.value;
                            setStaff(newStaff);
                          }}
                        />
                        <Input
                          placeholder="Designation"
                          value={member.designation}
                          onChange={(e) => {
                            const newStaff = [...staff];
                            newStaff[index].designation = e.target.value;
                            setStaff(newStaff);
                          }}
                        />
                        <Input
                          placeholder="Contact Number"
                          value={member.contact}
                          onChange={(e) => {
                            const newStaff = [...staff];
                            newStaff[index].contact = e.target.value;
                            setStaff(newStaff);
                          }}
                        />
                        <Input
                          placeholder="WhatsApp Number"
                          value={member.whatsapp}
                          onChange={(e) => {
                            const newStaff = [...staff];
                            newStaff[index].whatsapp = e.target.value;
                            setStaff(newStaff);
                          }}
                        />
                        <Input
                          placeholder="PTCL Number"
                          value={member.ptcl}
                          onChange={(e) => {
                            const newStaff = [...staff];
                            newStaff[index].ptcl = e.target.value;
                            setStaff(newStaff);
                          }}
                        />
                      </Grid>
                    </Box>
                  ))}
                </VStack>
              </Box>

              {/* Corporate Address */}
              <Box bg="white" borderRadius="lg" p={6} shadow="sm">
                <FormControl>
                  <FormLabel fontSize="sm">Corporate Headquarters Address</FormLabel>
                  <Textarea
                    placeholder="Complete corporate address including building, street, area, city, and postal code"
                    rows={4}
                    value={formData.officeAddress}
                    onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
                  />
                </FormControl>

                <HStack mt={4} spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">Office Timings</FormLabel>
                    <Input
                      placeholder="e.g., 9:00 AM - 8:00 PM"
                      value={formData.officeTimings}
                      onChange={(e) => setFormData({ ...formData, officeTimings: e.target.value })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">Working Days</FormLabel>
                    <Input
                      placeholder="e.g., Monday - Saturday"
                      value={formData.workingDays}
                      onChange={(e) => setFormData({ ...formData, workingDays: e.target.value })}
                    />
                  </FormControl>
                </HStack>

                <FormControl mt={4}>
                  <FormLabel fontSize="sm">Google Map Link</FormLabel>
                  <Input
                    placeholder="https://maps.google.com/..."
                    value={formData.googleMapLink}
                    onChange={(e) => setFormData({ ...formData, googleMapLink: e.target.value })}
                  />
                </FormControl>
              </Box>
            </VStack>
          </GridItem>

          {/* Right Column */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Contact Details */}
              <Box bg="white" borderRadius="lg" p={6} shadow="sm">
                <Flex align="center" gap={2} mb={6}>
                  <Icon as={FaPhone} color="green.600" />
                  <Text fontSize="lg" fontWeight="semibold">Contact Details</Text>
                </Flex>

                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel fontSize="sm">Primary Mobile</FormLabel>
                    <Input
                      placeholder="+92 300 1234567"
                      value={formData.primaryMobile}
                      onChange={(e) => setFormData({ ...formData, primaryMobile: e.target.value })}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">WhatsApp Business</FormLabel>
                    <Input
                      placeholder="+92 300 1234567"
                      value={formData.whatsappBusiness}
                      onChange={(e) => setFormData({ ...formData, whatsappBusiness: e.target.value })}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Office Direct Line</FormLabel>
                    <Input
                      placeholder="+92 21 1234567"
                      value={formData.officeDirectLine}
                      onChange={(e) => setFormData({ ...formData, officeDirectLine: e.target.value })}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Business Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="info@premiumtravel.com"
                      value={formData.businessEmail}
                      onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Website URL</FormLabel>
                    <Input
                      placeholder="https://www.yourwebsite.com"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    />
                  </FormControl>
                </VStack>
              </Box>

              {/* Social Links */}
              <Box bg="white" borderRadius="lg" p={6} shadow="sm">
                <Text fontSize="lg" fontWeight="semibold" mb={4}>Social Media Links</Text>
                <VStack spacing={3} align="stretch">
                  <HStack>
                    <Icon as={FaFacebook} color="blue.600" />
                    <Input
                      placeholder="Facebook URL"
                      value={socialLinks.facebook}
                      onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                    />
                  </HStack>
                  <HStack>
                    <Icon as={FaTwitter} color="blue.400" />
                    <Input
                      placeholder="Twitter URL"
                      value={socialLinks.twitter}
                      onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                    />
                  </HStack>
                  <HStack>
                    <Icon as={FaInstagram} color="pink.600" />
                    <Input
                      placeholder="Instagram URL"
                      value={socialLinks.instagram}
                      onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                    />
                  </HStack>
                  <HStack>
                    <Icon as={FaLinkedin} color="blue.700" />
                    <Input
                      placeholder="LinkedIn URL"
                      value={socialLinks.linkedin}
                      onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                    />
                  </HStack>
                  <HStack>
                    <Icon as={FaYoutube} color="red.600" />
                    <Input
                      placeholder="YouTube URL"
                      value={socialLinks.youtube}
                      onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                    />
                  </HStack>
                </VStack>
              </Box>

              {/* File Uploads */}
              <Box bg="white" borderRadius="lg" p={6} shadow="sm">
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel fontSize="sm">Corporate Logo</FormLabel>
                    <Input type="file" accept="image/*" p={1} />
                    <Text fontSize="xs" color="gray.500" mt={1}>
                      Upload company logo or individual picture
                    </Text>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Business License</FormLabel>
                    <Input type="file" accept=".pdf,.jpg,.png" p={1} />
                    <Text fontSize="xs" color="gray.500" mt={1}>
                      Upload business license or registration documents
                    </Text>
                  </FormControl>
                </VStack>
              </Box>

              {/* Submit Button */}
              <Button
                bg="green.700"
                color="white"
                size="lg"
                py={6}
                fontSize="md"
                fontWeight="bold"
                _hover={{ bg: "green.800" }}
                _active={{ bg: "green.900" }}
                onClick={handleSubmit}
              >
                Submit Premium Application
              </Button>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}