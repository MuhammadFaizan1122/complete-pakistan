'use client'
import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Box, Button, Flex, FormControl, FormLabel, Grid, Input, Select, Stack, Text, Textarea, Wrap, WrapItem } from '@chakra-ui/react';

export default function CreateProfessionalProfile() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        cnicNumber: '',
        passportNumber: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
        city: '',
        completeAddress: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateStep1 = () => {
        const requiredFields = ['name', 'cnicNumber', 'email', 'phoneNumber'];
        return requiredFields.every(field => formData[field].trim() !== '');
    };

    const handleNextStep = () => {
        if (currentStep === 1) {
            // if (!validateStep1()) {
            //     alert('Please fill in all required fields (Name, CNIC, Email, Phone Number)');
            //     return;
            // }
            setCurrentStep(2);
        } else if (currentStep === 2) {
            setCurrentStep(3);
        } else {
            alert('Form completed! Data saved.');
            console.log('Final Form Data:', formData);
        }
    };

    const handleCancel = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            if (confirm('Are you sure you want to cancel? All data will be lost.')) {
                setFormData({
                    name: '',
                    cnicNumber: '',
                    passportNumber: '',
                    dateOfBirth: '',
                    email: '',
                    phoneNumber: '',
                    city: '',
                    completeAddress: '',
                    appliedPositions: 'Electronic Technician',
                    education: '',
                    gulfExperience: '',
                    gulfLicense: '',
                    pakistaniLicense: '',
                    keySkills: '',
                    description: ''
                });
            }
        }
    };
    const [photoFile, setPhotoFile] = useState(null);
    const [cvFiles, setCvFiles] = useState([]);
    const [certificateFiles, setCertificateFiles] = useState([]);
    const removeFile = (type, index) => {
        if (type === "cv") {
            setCvFiles((prev) => prev.filter((_, i) => i !== index));
        } else if (type === "certificate") {
            setCertificateFiles((prev) => prev.filter((_, i) => i !== index));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("photo", photoFile);
        cvFiles.forEach((file, index) => formData.append(`cv[${index}]`, file));
        certificateFiles.forEach((file, index) => formData.append(`certificates[${index}]`, file));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;

        if (name === "photo") {
            setPhotoFile(files[0]);
        } else if (name === "cvDocuments") {
            setCvFiles((prev) => [...prev, ...Array.from(files)]);
        } else if (name === "certificates") {
            setCertificateFiles((prev) => [...prev, ...Array.from(files)]);
        }
    };

    return (
        <div className="min-h-screen bg-[#BADDD9] flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] shadow-xl max-w-[1440px] p-6 md:p-20 w-[1274px] h-auto sm:h-[1076px] my-10">
                <div className="mb-8">
                    <p className="text-2xl md:text-[32px] font-semibold text-black mb-3">
                        Create Your Professional Profile
                    </p>
                    <p className="text-black text-[18px] md:text-base leading-relaxed">
                        Build a comprehensive profile to connect with agencies, agents, and Trade Test Centers
                        for international job opportunities.
                    </p>
                </div>

                <div className="flex  items-center justify-center md:justify-start mb-8 gap-4 sm:space-x-4 md:space-x-8">
                    <div className="flex items-center space-x-2">
                        <div className={`w-10 h-10 ${currentStep >= 1 ? 'bg-[#00956B] text-white' : 'bg-gray-200 text-gray-600'} rounded-full flex items-center justify-center text-[16px] font-semibold`}>
                            1
                        </div>
                        <span className={`text-[16px] font-medium ${currentStep >= 1 ? 'text-[#00956B]' : 'text-gray-500'} hidden sm:block`}>Personal Details</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className={`w-10 h-10 ${currentStep >= 2 ? 'bg-[#00956B] text-white' : 'bg-gray-200 text-gray-600'} rounded-full flex items-center justify-center text-[16px] font-semibold`}>
                            2
                        </div>
                        <span className={`text-[16px] font-medium ${currentStep >= 2 ? 'text-[#00956B]' : 'text-gray-500'} hidden sm:block`}>Professional Info</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className={`w-10 h-10 ${currentStep >= 3 ? 'bg-[#00956B] text-white' : 'bg-gray-200 text-gray-600'} rounded-full flex items-center justify-center text-[16px] font-semibold`}>
                            3
                        </div>
                        <span className={`text-[16px] font-medium ${currentStep >= 3 ? 'text-[#00956B]' : 'text-gray-500'} hidden sm:block`}>Documents</span>
                    </div>
                </div>


                <div className="mb-8">
                    {currentStep === 1 && (
                        <>
                            <Box>
                                <Text fontSize={{ base: 'xl', md: '26px' }} fontWeight="semibold" mb={{ base: 8, md: 10 }}>
                                    Personal Details
                                </Text>

                                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                                    {/* Name */}
                                    <FormControl isRequired>
                                        <FormLabel fontSize="md">Name</FormLabel>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your name"
                                            borderRadius="15px"
                                            focusBorderColor="#309689"
                                            px={4}
                                            py={6}
                                        />
                                    </FormControl>

                                    {/* CNIC */}
                                    <FormControl isRequired>
                                        <FormLabel fontSize="md">CNIC Number</FormLabel>
                                        <Input
                                            name="cnicNumber"
                                            value={formData.cnicNumber}
                                            onChange={handleInputChange}
                                            placeholder="00000-0000000-0"
                                            borderRadius="15px"
                                            focusBorderColor="#309689"
                                            px={4}
                                            py={6}
                                        />
                                    </FormControl>

                                    {/* Passport */}
                                    <FormControl>
                                        <FormLabel fontSize="md">Passport Number</FormLabel>
                                        <Input
                                            name="passportNumber"
                                            value={formData.passportNumber}
                                            onChange={handleInputChange}
                                            placeholder="Enter passport number"
                                            borderRadius="15px"
                                            focusBorderColor="#309689"
                                            px={4}
                                            py={6}
                                        />
                                    </FormControl>

                                    {/* DOB */}
                                    <FormControl>
                                        <FormLabel fontSize="md">Date of Birth</FormLabel>
                                        <Input
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange}
                                            placeholder="dd/mm/yyyy"
                                            borderRadius="15px"
                                            type='date'
                                            focusBorderColor="#309689"
                                            px={4}
                                            py={6}
                                            pr="2.5rem"
                                        />
                                    </FormControl>

                                    {/* Email */}
                                    <FormControl isRequired>
                                        <FormLabel fontSize="md">Email Address</FormLabel>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your email address"
                                            borderRadius="15px"
                                            focusBorderColor="#309689"
                                            px={4}
                                            py={6}
                                        />
                                    </FormControl>

                                    {/* Phone Number */}
                                    <FormControl isRequired>
                                        <FormLabel fontSize="md">Phone Number</FormLabel>
                                        <Flex>
                                            <Flex
                                                align="center"
                                                px={3}
                                                py={3}
                                                border="1px solid"
                                                borderRight="none"
                                                borderColor="gray.300"
                                                borderRadius="15px"
                                                borderRightRadius="none"
                                                bg="gray.50"
                                            >
                                                <Box w="5" h="4" bgGradient="linear(to-b, black, red.500, yellow.400)" rounded="sm" mr={2}></Box>
                                                <Text fontSize="sm" color="gray.600">+370</Text>
                                            </Flex>
                                            <Input
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                placeholder="Phone number"
                                                borderRadius="15px"
                                                borderLeftRadius="1px"
                                                borderColor="gray.300"
                                                px={4}
                                                py={6}
                                                focusBorderColor="#309689"
                                            />
                                        </Flex>
                                    </FormControl>

                                    {/* City */}
                                    <FormControl>
                                        <FormLabel fontSize="md">City</FormLabel>
                                        <Input
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="Enter your city"
                                            borderRadius="15px"
                                            focusBorderColor="#309689"
                                            px={4}
                                            py={6}
                                        />
                                    </FormControl>

                                    {/* Complete Address */}
                                    <FormControl>
                                        <FormLabel fontSize="md">Complete Address</FormLabel>
                                        <Input
                                            name="completeAddress"
                                            value={formData.completeAddress}
                                            onChange={handleInputChange}
                                            placeholder="Enter complete address"
                                            borderRadius="15px"
                                            focusBorderColor="#309689"
                                            px={4}
                                            py={6}
                                        />
                                    </FormControl>
                                </Grid>
                            </Box>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            <Box>
                                <Text fontSize={{ base: 'xl', md: '26px' }} fontWeight="semibold" mb={{ base: 8, md: 10 }}>
                                    Professional Details
                                </Text>

                                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} mt={8}>
                                    <FormControl>
                                        <FormLabel fontSize="md">Applied Position</FormLabel>
                                        <Box
                                            bg="#E8F4F3"
                                            px={4}
                                            py={3}
                                            borderRadius="15px"
                                            border="1px solid"
                                            borderColor="gray.300"
                                        >
                                            <Text color="gray.700">Electronic Technician</Text>
                                        </Box>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontSize="md">Education</FormLabel>
                                        <Select
                                            name="education"
                                            value={formData.education}
                                            onChange={handleInputChange}
                                            placeholder="Select"
                                            borderRadius="15px"
                                            h="50px"

                                            focusBorderColor="#309689"
                                            icon={
                                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                            }
                                        >
                                            <option value="High School">High School</option>
                                            <option value="Bachelor's Degree">Bachelor's Degree</option>
                                            <option value="Master's Degree">Master's Degree</option>
                                            <option value="Diploma">Diploma</option>
                                            <option value="Certificate">Certificate</option>
                                        </Select>
                                    </FormControl>

                                    {/* Gulf Experience */}
                                    <FormControl>
                                        <FormLabel fontSize="md">Gulf Experience</FormLabel>
                                        <Select
                                            name="gulfExperience"
                                            value={formData.gulfExperience}
                                            onChange={handleInputChange}
                                            placeholder="Select"
                                            borderRadius="15px"
                                            h="50px"

                                            focusBorderColor="#309689"
                                            icon={
                                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                            }
                                        >
                                            <option value="No Experience">No Experience</option>
                                            <option value="1-2 Years">1-2 Years</option>
                                            <option value="3-5 Years">3-5 Years</option>
                                            <option value="5+ Years">5+ Years</option>
                                        </Select>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel fontSize="md">Gulf License</FormLabel>
                                        <Select
                                            name="gulfLicense"
                                            value={formData.gulfLicense}
                                            onChange={handleInputChange}
                                            placeholder="Select"
                                            borderRadius="15px"
                                            h="50px"
                                            focusBorderColor="#309689"
                                            icon={
                                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                            }
                                        >
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </Select>
                                    </FormControl>

                                    {/* Pakistani License */}
                                    <FormControl>
                                        <FormLabel fontSize="md">Pakistani License</FormLabel>
                                        <Select
                                            name="pakistaniLicense"
                                            value={formData.pakistaniLicense}
                                            onChange={handleInputChange}
                                            placeholder="Select"
                                            borderRadius="15px"
                                            h="50px"
                                            focusBorderColor="#309689"
                                            icon={
                                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                            }
                                        >
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </Select>
                                    </FormControl>

                                    {/* Key Skills */}
                                    <FormControl>
                                        <FormLabel fontSize="md">Key Skills</FormLabel>
                                        <Input
                                            name="keySkills"
                                            value={formData.keySkills}
                                            onChange={handleInputChange}
                                            placeholder="Enter key skills"
                                            borderRadius="15px"
                                            px={4}
                                            py={6}
                                            focusBorderColor="#309689"
                                        />
                                    </FormControl>
                                </Grid>

                                {/* Description */}
                                <Box mt={6}>
                                    <FormControl>
                                        <FormLabel fontSize="md">Description</FormLabel>
                                        <Textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={6}
                                            resize="none"
                                            borderRadius="15px"
                                            px={4}
                                            py={3}
                                            focusBorderColor="#309689"
                                            placeholder="Write a brief description"
                                        />
                                    </FormControl>
                                </Box>
                            </Box>
                        </>
                    )}
                    {currentStep === 3 && (
                        <>
                            <Text fontSize="2xl" fontWeight="semibold" color="black" mb={10}>
                                Documents
                            </Text>

                            <Stack spacing={{ base: 6, md: 10 }}>
                                {/* Photo */}
                                <Box>
                                    <FormLabel fontSize="md" color="gray.700" mb={2}>
                                        Photo
                                    </FormLabel>
                                    <Box
                                        border="1px solid"
                                        borderColor="gray.300"
                                        borderRadius="15px"
                                        bg="white"
                                        px={{ base: 3, md: 4 }}
                                        py={{ base: 4, md: 6 }}
                                        textAlign="center"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Stack spacing={2} align="center">
                                            <Text fontSize="sm" color="gray.500">
                                                Upload photo
                                            </Text>
                                            <Text fontSize="xs" color="gray.500" textAlign="center">
                                                Upload a professional photo with white background recommended
                                            </Text>
                                            <Input
                                                type="file"
                                                name="photo"
                                                accept="image/*"
                                                mt={2}
                                                width={{ base: "100%", md: "auto" }}
                                                maxW="250px"
                                                paddingY="1"
                                                paddingX="3"
                                                fontSize="sm"
                                                background="white"
                                                border="1px solid"
                                                borderColor="gray.300"
                                                borderRadius="md"
                                                cursor="pointer"
                                            />

                                        </Stack>
                                    </Box>
                                </Box>

                                {/* CV Documents */}
                                <Box>
                                    <FormLabel fontSize="md" color="gray.700" mb={2}>
                                        CV Documents
                                    </FormLabel>
                                    <Box
                                        border="1px solid"
                                        borderColor="gray.300"
                                        borderRadius="15px"
                                        bg="white"
                                        px={{ base: 3, md: 4 }}
                                        py={{ base: 6, md: 10 }}
                                        textAlign="center"
                                        position="relative"
                                    >
                                        <Text fontSize="sm" color="gray.500">
                                            Drag and drop files here
                                        </Text>
                                        <Input
                                            type="file"
                                            name="cvDocuments"
                                            accept=".pdf,.doc,.docx,image/*"
                                            multiple
                                            position="absolute"
                                            top={0}
                                            left={0}
                                            w="100%"
                                            h="100%"
                                            opacity={0}
                                            cursor="pointer"
                                        />
                                    </Box>

                                    <Wrap mt={3}>
                                        {cvFiles.map((file, index) => (
                                            <WrapItem key={index}>
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                    bg="#309689"
                                                    color="white"
                                                    px={3}
                                                    py={1}
                                                    borderRadius="full"
                                                    fontSize="sm"
                                                    maxW="full"
                                                >
                                                    <Text mr={2} isTruncated>
                                                        {file.name}
                                                    </Text>
                                                    <Button
                                                        onClick={() => removeFile("cv", index)}
                                                        variant="ghost"
                                                        size="sm"
                                                        color="white"
                                                        _hover={{ bg: "transparent" }}
                                                        px={1}
                                                    >
                                                        ×
                                                    </Button>
                                                </Box>
                                            </WrapItem>
                                        ))}
                                    </Wrap>
                                </Box>

                                {/* Licenses & Certificates */}
                                <Box>
                                    <FormLabel fontSize="md" color="gray.700" mb={2}>
                                        Licenses & Certificates
                                    </FormLabel>
                                    <Box
                                        border="1px solid"
                                        borderColor="gray.300"
                                        borderRadius="15px"
                                        bg="white"
                                        px={{ base: 3, md: 4 }}
                                        py={{ base: 6, md: 10 }}
                                        textAlign="center"
                                        position="relative"
                                    >
                                        <Text fontSize="sm" color="gray.500">
                                            Upload any licenses or certificates that may be relevant
                                        </Text>
                                        <Input
                                            type="file"
                                            name="certificates"
                                            multiple
                                            position="absolute"
                                            top={0}
                                            left={0}
                                            w="100%"
                                            h="100%"
                                            opacity={0}
                                            cursor="pointer"
                                        />
                                    </Box>

                                    <Wrap mt={3}>
                                        {certificateFiles.map((file, index) => (
                                            <WrapItem key={index}>
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                    bg="#309689"
                                                    color="white"
                                                    px={3}
                                                    py={1}
                                                    borderRadius="full"
                                                    fontSize="sm"
                                                    maxW="full"
                                                >
                                                    <Text mr={2} isTruncated>
                                                        {file.name}
                                                    </Text>
                                                    <Button
                                                        onClick={() => removeFile("certificate", index)}
                                                        variant="ghost"
                                                        size="sm"
                                                        color="white"
                                                        _hover={{ bg: "transparent" }}
                                                        px={1}
                                                    >
                                                        ×
                                                    </Button>
                                                </Box>
                                            </WrapItem>
                                        ))}
                                    </Wrap>
                                </Box>
                            </Stack>

                        </>
                    )}
                </div>
                <Flex
                    direction={{ base: "column", sm: "row" }}
                    justify="flex-end"
                    gap={{ base: 3, sm: 4 }}
                >
                    <Button
                        onClick={handleCancel}
                        w={{ base: 'full', sm: '255px' }}
                        h="50px"
                        px={6}
                        py={3}
                        bg="#F1F2F4"
                        _hover={{ bg: "gray.300" }}
                        color="gray.700"
                        borderRadius="12px"
                        fontWeight="medium"
                        order={{ base: 2, sm: 1 }}
                    >
                        {currentStep > 1 ? "Previous Step" : "Cancel"}
                    </Button>

                    <Button
                        onClick={handleNextStep}
                        w={{ base: 'full', sm: '255px' }}
                        h="50px"
                        px={8}
                        py={3}
                        bg="#309689"
                        _hover={{ bg: "#309689" }}
                        color="white"
                        borderRadius="12px"
                        fontWeight="medium"
                        order={{ base: 1, sm: 2 }}
                    >
                        {currentStep === 3 ? "Save" : "Next Step"}
                    </Button>
                </Flex>

            </div>
        </div>
    );
}