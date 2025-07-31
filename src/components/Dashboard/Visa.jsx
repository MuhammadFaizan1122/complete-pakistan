'use client'
import {
    Box,
    Button,
    Grid,
    GridItem,
    useToast,
    Heading,
} from '@chakra-ui/react';
import { Country, State } from 'country-state-city';
import { useState, useRef, useEffect } from 'react';
import { handleCreateJob } from "../../handlers/Jobs/jobs";
import { handleUpload } from '../../handlers/contentUploading/contentUploading';
import { useSession } from 'next-auth/react';
import JobBasicInfoForm from './JobBasicForm';
import JobDetailsForm from './JobDetailsForm';

const jobTypes = ['Full-time', 'Part-time', 'Hourly', 'Freelance', 'Internship'];
const tags = ['Full-time', 'Remote', 'Riyadh', 'Corporate'];
const skillsList = [
    'Communication',
    'Team Work',
    'Critical Thinking',
    'AutoCAD',
    'Electrical Design',
    'Project Management',
];

export default function JobCreationPage() {
    const toast = useToast();
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState(['AutoCAD', 'Electrical Design', 'Project Management']);
    const [countries, setCountries] = useState(Country.getAllCountries());
    const [states, setStates] = useState([]);
    const [userIndustry, setUserIndustry] = useState();
    const [userCategory, setUserCategory] = useState();
    const [keyResponsibilities, setKeyResponsibilities] = useState(['']);
    const { data: session, status } = useSession();

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
        license: '',
        dutyHours: '',
        overtime: '',
        duration: '',
        accommodation: '',
        medicalInsurance: '',
        transportation: '',
        returnTicket: '',
        firstDeparture: '',
        interviewDate: '',
        interviewVenue: '',
        interviewLocation: '',
        interviewAddress: '',
        visaNumber: '',
        navttc: '',
        visaCategory: '',
    });

    const [errors, setErrors] = useState({});

    const [industryList] = useState([
        {
            id: 1,
            name: 'Technical',
            categories: [
                {
                    id: 2,
                    name: 'Electrical Engineering',
                    subcategories: [
                        {
                            id: 3,
                            name: 'Senior Electrical Engineer'
                        }
                    ]
                }
            ]
        }
    ]);
    const [categoryList, setCategoryList] = useState([{ id: 2, name: 'Electrical Engineering' }]);

    useEffect(() => {
        const selectedIndustry = industryList.find(c => c.name === formData.industry);
        setUserIndustry(selectedIndustry);
        setCategoryList(selectedIndustry ? selectedIndustry.categories : []);
        const selectedCountry = countries.find(c => c.name === formData.country);
        const stateList = State.getStatesOfCountry(selectedCountry?.isoCode);
        setStates(stateList);
    }, [formData.country, formData.industry, countries, industryList]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

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

        try {
            const imageResp = image ? await handleUpload(image) : null;
            const imageUrl = imageResp?.data?.url || '';

            const jobData = {
                ...formData,
                keyResponsibilities,
                selectedSkills,
                selectedTags,
                image: imageUrl,
                userId: session?.user?.id || '',
            };

            const res = await handleCreateJob(jobData);

            if (res?.error) throw new Error(res.error);

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
                license: '',
                dutyHours: '',
                overtime: '',
                duration: '',
                accommodation: '',
                medicalInsurance: '',
                transportation: '',
                returnTicket: '',
                firstDeparture: '',
                interviewDate: '',
                interviewVenue: '',
                interviewLocation: '',
                interviewAddress: '',
                visaNumber: '',
                navttc: '',
                visaCategory: '',
            });
            setKeyResponsibilities(['']);
            setSelectedSkills([]);
            setSelectedTags([]);
            setImage(null);
            setImagePreview(null);
            setStates([]);
            setCategoryList([]);
            fileInputRef.current.value = '';
        } catch (error) {
            console.error('Job submission error:', error);
            toast({
                title: 'Error',
                description: error.message || 'Something went wrong.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box maxW="6xl" mx="auto" py={8} px={{ base: 4, md: 6 }}>
            <Heading size="lg" mb={6}>
                Create New Job
            </Heading>
            <Box as="form" onSubmit={handleSubmit}>
                    <GridItem>
                        <Heading size="md" mb={4}>Basic Information</Heading>
                        <JobBasicInfoForm
                            formData={formData}
                            setFormData={setFormData}
                            countries={countries}
                            states={states}
                            industryList={industryList}
                            categoryList={categoryList}
                            jobTypes={jobTypes}
                            errors={errors}
                            handleCountryChange={handleCountryChange}
                            handleStateChange={handleStateChange}
                            handleIndustryChange={handleIndustryChange}
                            handleCategoryChange={handleCategoryChange}
                        />
                    </GridItem>
                    
                    <GridItem>
                        <Heading size="md" mb={4}>Job Details & Requirements</Heading>
                        <JobDetailsForm
                            formData={formData}
                            setFormData={setFormData}
                            keyResponsibilities={keyResponsibilities}
                            setKeyResponsibilities={setKeyResponsibilities}
                            selectedSkills={selectedSkills}
                            setSelectedSkills={setSelectedSkills}
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                            skillsList={skillsList}
                            tags={tags}
                            image={image}
                            imagePreview={imagePreview}
                            fileInputRef={fileInputRef}
                            handleImageChange={handleImageChange}
                            errors={errors}
                        />
                    </GridItem>
                
                <Button 
                    bg={'#0a7450'} 
                    w={'full'} 
                    color="#fff" 
                    type="submit" 
                    mt={8} 
                    rounded={'12px'} 
                    py={6}
                >
                    Create Job
                </Button>
            </Box>
        </Box>
    );
}