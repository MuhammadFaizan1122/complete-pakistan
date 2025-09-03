'use client'
import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Flex, Spinner, Text } from '@chakra-ui/react';
import * as Yup from 'yup';
import PersonalDetails from './PersonalDetails';
import ProfessionalDetails from './ProfessionalDetails';
import Documents from './Documents';
import StepIndicator from './StepIndicator';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import PreviewProfile from './PreviewProfile'
import { handleUpload } from '../../handlers/contentUploading/contentUploading';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    fatherName: Yup.string().required('Father name is required'),
    cnicNumber: Yup.string().required('CNIC Number is required').matches(/^\d{5}-\d{7}-\d$/, 'Invalid CNIC format (e.g., 00000-0000000-0)'),
    email: Yup.string().required('Email is required').email('Invalid email format'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    passportNumber: Yup.string(),
    dateOfBirth: Yup.date(),
    passportExpiry: Yup.date(),
    city: Yup.string(),
    completeAddress: Yup.string(),
    education: Yup.string(),
    gulfExperience: Yup.string(),
    gulfLicense: Yup.string(),
    pakistaniLicense: Yup.string(),
    keySkills: Yup.string(),
});

export default function CreateProfessionalProfile() {
    const [currentStep, setCurrentStep] = useState(1);
    const { data: session, status } = useSession()
    const [dataAvailable, setDataAvailable] = useState(false);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        fatherName: '',
        cnicNumber: '',
        passportNumber: '',
        passportExpiry: '',
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
    });
    const [errors, setErrors] = useState({});
    const [photoFile, setPhotoFile] = useState(null);
    const [cvFiles, setCvFiles] = useState([]);
    const [certificateFiles, setCertificateFiles] = useState([]);
    const [cvImage, setCvImage] = useState(null);
    const [savedData, setSavedData] = useState(null);

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        try {
            await validationSchema.validateAt(name, { [name]: value });
            setErrors(prev => ({ ...prev, [name]: '' }));
        } catch (error) {
            setErrors(prev => ({ ...prev, [name]: error.message }));
        }
    };

    const validateStep1 = async () => {
        const requiredFields = ['name', 'cnicNumber', 'email', 'phoneNumber'];
        const validationErrors = {};
        for (let field of requiredFields) {
            try {
                await validationSchema.validateAt(field, { [field]: formData[field] });
            } catch (error) {
                validationErrors[field] = error.message;
            }
        }
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleNextStep = async () => {
        if (currentStep === 1) {
            const isValid = await validateStep1();
            if (!isValid) {
                alert('Please fix the errors in the required fields (Name, CNIC, Email, Phone Number)');
                return;
            }
            setCurrentStep(2);
        } else if (currentStep === 2) {
            setCurrentStep(3);
        } else {
            const isValid = await validationSchema.isValid(formData);
            if (isValid) {
                handleSubmit()
            } else {
                alert('Please fill all fields and upload required documents.');
            }
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
                    passportExpiry: '',
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
                setPhotoFile(null);
                setCvFiles([]);
                setCertificateFiles([]);
                setCvImage(null);
                setErrors({});
            }
        }
    };
    const handleFetch = async () => {
        if (!session?.user?.id) {
            console.error("No user id found in session");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(`/api/cv/create`, {
                params: { userId: session.user.id },
            });
            console.log('response', response)
            if (response.data?.data.length !== 0) {
                setSavedData(response.data.data[0]);
                setDataAvailable(true);
            }
        } catch (error) {
            console.error("Error fetching CV data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (status === 'authenticated') {
            handleFetch()
        }
    }, [status])

    const removeFile = (type, index) => {
        if (type === "cv") {
            setCvFiles((prev) => prev.filter((_, i) => i !== index));
        } else if (type === "certificate") {
            setCertificateFiles((prev) => prev.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async () => {
        // e.preventDefault();

        const cvResp = cvImage ? await handleUpload(cvImage) : null;
        const photoResp = photoFile ? await handleUpload(photoFile) : null;

        const payload = {
            userId: session?.user?.id,
            photo: photoResp?.url || "",
            name: formData.name,
            fatherName: formData.fatherName,
            cnic: formData.cnicNumber,
            passport: formData.passportNumber,
            dob: formData.dateOfBirth,
            passportExpiry: formData.passportExpiry,
            email: formData.email,
            phone: formData.phoneNumber,
            city: formData.city,
            localAddress: formData.completeAddress,
            jobTitle: formData.appliedPositions,
            industry: "General",
            education: [
                {
                    level: formData.education,
                    institute: "",
                    country: "Pakistan",
                    startDate: "",
                    endDate: "",
                    details: "",
                },
            ],
            experience: [
                {
                    designation: formData.appliedPositions,
                    company: "N/A",
                    country: "UAE",
                    description: formData.gulfExperience,
                },
            ],
            pakistaniDrivingLicense: formData.pakistaniLicense,
            gulfDrivingLicense: formData.gulfLicense,
            skills: formData.keySkills
                ? formData.keySkills.split(",").map((s) => s.trim())
                : [],
            attachments: [
                ...(cvResp ? [cvResp.url] : []),
            ],
            type: "summary",
        };

        try {
            const res = await fetch("/api/cv/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (res.ok) {
                console.log("CV created successfully:", data);
            } else {
                console.error("Error creating CV:", data.message);
            }
        } catch (err) {
            console.error("Submit error:", err);
        }
    };


    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === "photo") {
            setPhotoFile(files[0]);
        } else if (name === "cvDocuments") {
            setCvFiles((prev) => [...prev, ...Array.from(files)]);
        } else if (name === "certificates") {
            setCertificateFiles((prev) => [...prev, ...Array.from(files)]);
        } else if (name === "cvImage") {
            setCvImage(files[0]);
        }
    };
    if (loading) {
        return (
            <Center minH="100vh" bg="gray.50">
                <Spinner size="xl" color="#0a7450" thickness="4px" />
            </Center>
        );
    }
    return (
        <div className="min-h-screen bg-[#BADDD9] flex items-center justify-center p-4">
            {
                dataAvailable ?
                    <>
                        <PreviewProfile data={savedData} />
                    </>
                    :
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
                        <StepIndicator currentStep={currentStep} />
                        <div className="mb-8">
                            {currentStep === 1 && <PersonalDetails formData={formData} handleInputChange={handleInputChange} errors={errors} />}
                            {currentStep === 2 && <ProfessionalDetails formData={formData} handleInputChange={handleInputChange} errors={errors} />}
                            {currentStep === 3 && <Documents photoFile={photoFile} cvFiles={cvFiles} certificateFiles={certificateFiles} handleFileChange={handleFileChange} removeFile={removeFile} />}
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
                                bg="#0a7450"
                                _hover={{ bg: "#0a7450" }}
                                color="white"
                                borderRadius="12px"
                                fontWeight="medium"
                                order={{ base: 1, sm: 2 }}
                            >
                                {currentStep === 3 ? "Save" : "Next Step"}
                            </Button>
                        </Flex>
                    </div>
            }
        </div>
    );
}