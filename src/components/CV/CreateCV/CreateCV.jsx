"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  Input,
  Text,
  Select,
  Button,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
  VStack,
  HStack,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import Image from "next/image";
import EmploymentPopup from "./EmploymentPopup";
import EducationPopup from "./EducationPopup";
import SkillPopup from "./SkillPopup";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Country, State, City } from 'country-state-city';
import Preview from "./Preview";
import FileUpload from "./FileUploading";
import JobDetails from "./JobDetails";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const validationSchema = yup.object().shape({
  name: yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Name is required'),
  dob: yup.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .test('is-adult', 'You must be at least 18 years old', function (value) {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
      }
      return age >= 18;
    })
    .required('Date of birth is required'),
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  madicalDate: yup.string()
    .max(new Date(), 'Date of birth cannot be in the future')
    .required('Madical date is required'),
  passport: yup.string()
    .min(12, 'Passport must be at least 12 characters')
    .required('Passport is required'),
  phone: yup.string()
    .matches(
      /^(\+?\d{1,3}[-.\s]?)?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/,
      'Invalid phone number format'
    )
    .required('Phone number is required'),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  address: yup.string()
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address must be at most 100 characters')
    .required('Address is required'),
  portfolio: yup.string().url('Invalid URL format').optional(),
  job: yup.string().required('Job title is required'),
  industry: yup.string().optional(),
  category: yup.string().optional(),
  subcategory: yup.string().optional(),
  jobDetail: yup.string().max(500, 'Job details must be at most 500 characters').optional(),
  education: yup.array().optional(),
  // education: yup.array()
  //   .min(1, 'At least one education entry is required')
  //   .required('Education is required'),
  experience: yup.array().optional(),
  // experience: yup.array()
  //   .min(1, 'At least one experience entry is required')
  //   .required('Experience is required'),
  skills: yup.array().optional(),
  // skills: yup.array()
  //   .min(1, 'At least one skill is required')
  //   .required('Skills are required'),
  attachments: yup.array().optional(),
});


export default function CreateCVPage() {
  const router = useRouter();
  const { status } = useSession();
  const toast = useToast();
  const previewRef = useRef(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  const {
    isOpen: isEmploymentOpen,
    onOpen: onEmploymentOpen,
    onClose: onEmploymentClose,
  } = useDisclosure();
  const {
    isOpen: isEducationOpen,
    onOpen: onEducationOpen,
    onClose: onEducationClose,
  } = useDisclosure();
  const {
    isOpen: isSkillOpen,
    onOpen: onSkillOpen,
    onClose: onSkillClose,
  } = useDisclosure();

  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [userIndustry, setUserIndustry] = useState();
  const [userCategory, setUserCategory] = useState();
  const [userSubCategory, setUserSubCategory] = useState();
  const [cities, setCities] = useState([]);
  const [imgPreview, setImgPreview] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      dob: '',
      portfolio: '',
      email: '',
      phone: '',
      passport: '',
      madicalDate: '',
      country: '',
      city: '',
      state: '',
      address: '',
      job: 'Software Engineer',
      industry: '',
      category: '',
      subcategory: '',
      jobDetail: '',
      education: [],
      experience: [],
      skills: [],
      attachments: [],
    },
  });

  const formValues = watch();

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    const selectedCountry = countries.find((c) => c.name === countryCode);
    const stateList = State.getStatesOfCountry(selectedCountry?.isoCode);
    setStates(stateList);
    setCities([]);
    setValue('state', '');
    setValue('city', '');
  };
  console.log('formValues', formValues)
  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    const selectedState = states.find((s) => s.name === stateCode);
    const cityList = City.getCitiesOfState(selectedState?.countryCode, selectedState?.isoCode);
    setCities(cityList);
    setValue('city', '');
  };

  const handleTagAdd = (key, value) => {
    if (!value.trim()) return;
    setValue(key, [...formValues[key], value.trim()], { shouldValidate: true });
  };

  const handleTagRemove = (key, index) => {
    const updated = [...formValues[key]];
    updated.splice(index, 1);
    setValue(key, updated, { shouldValidate: true });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Only JPG, PNG, and WEBP files are allowed.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    console.log('userIndustry:', userIndustry);
    console.log('userCategory:', userCategory);
    console.log('userSubCategory:', userSubCategory);

    const payload = {
      cv_profile: {
        title: "Mr",
        full_name: data.name,
        email: data.email,
        phone: data.phone,
        dob: data.dob.slice(0, 10),
        nationality: data.country,
        gender: "male",
        address: data.address,
        about: data.jobDetail,
        father_name: "James Doe",
        birth_year: data.dob.slice(0, 4),
        country: data.country,
        city: data.city,
        area: data.state,
        industry_id: 1,
        job_applied_for: data.jobDetail,
        category_id: 1,
        sub_category_id: 2,
        is_public: true
      },
      cv_educations: [
        {
          degree: "BSc Computer Science",
          institution: "Example University",
          level: "Bachelor",
          details: "Graduated with honors",
          duration: "4 years",
          start_date: "2015-09-01",
          end_date: "2019-06-30"
        }
      ],
      cv_experiences: [
        {
          job_title: "Software Engineer",
          company: "Tech Corp",
          location: "New York",
          city: "New York",
          country: "USA",
          from_year: 2020,
          to_year: 2022,
          designation: "Developer",
          start_date: "2020-01-01",
          end_date: "2022-12-31",
          description: "Developed web applications."
        }
      ],
      cv_skills: [
        {
          skill: "PHP",
          level: "Expert"
        },
        {
          skill: "Laravel",
          level: "Advanced"
        }
      ]
      //   cv_attachments: [
      //     {
      //       title: "PHP",
      //       file: "Expert.pdf"
      //     },
      //     {
      //       title: "Laravel",
      //       file: "Advanced.pdf"
      //     }
      //   ]
    }
    toast({
      title: 'Form submitted',
      description: 'Your CV data has been submitted successfully.',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    // Handle form submission (e.g., API call)
  };

  const downloadPDF = async () => {
    const element = previewRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;

      pdf.addImage(imgData, "PNG", 0, 0, scaledWidth, scaledHeight);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction={{ base: 'column', md: 'row' }} p={8} bg="#D3EFEC">
        <Flex maxW={'1440px'} mx={'auto'} w={'full'} gap={4}>
          <Box w={{ base: '100%', md: '40%' }}>
            <VStack
              spacing={2}
              align="stretch"
              px={2}
              maxH={'120vh'}
              overflowY={'scroll'}
              sx={{
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#EEEEEE4D',
                  borderRadius: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#fff',
                  borderRadius: '8px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  borderRadius: '8px',
                  background: '#2C7A7B',
                },
                scrollbarWidth: 'thin',
                scrollbarColor: '#fff #F1F1F1',
                borderRadius: '8px',
              }}
            >
              <FormControl>
                <FormLabel className="text-[#2D3748] pl-1 mt-2">Photo</FormLabel>
                <Box
                  bg="white"
                  borderRadius="2xl"
                  boxShadow="md"
                  textAlign="center"
                  p={2}
                  w={{ base: 'full', md: '200px' }}
                >
                  <Flex direction="column" align="center" gap={2} my={2}>
                    <Image
                      src={'/Images/Icons/camera.png'}
                      alt="icon"
                      width={24}
                      height={24}
                      className="!h-[24px]"
                    />
                    <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" fontWeight="medium">
                      Upload photo
                    </Text>
                    <Button
                      as="label"
                      htmlFor="photo-upload"
                      border={'1px'}
                      borderStyle={'dashed'}
                      bg={'transparent'}
                      color="gray.600"
                      borderRadius="full"
                      px={{ base: 4, md: 4 }}
                      py={{ base: 2, md: 3 }}
                      cursor="pointer"
                    >
                      Choose file
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                      />
                    </Button>
                  </Flex>
                </Box>
              </FormControl>

              <FormControl isInvalid={!!errors.name}>
                <FormLabel className="text-[#2D3748] pl-1 mt-2">Name</FormLabel>
                <Input
                  placeholder="Enter your name"
                  rounded={'15px'}
                  p={4}
                  py={6}
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
                  resize="none"
                  {...register('name')}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.dob}>
                <FormLabel className="text-[#2D3748] pl-1 mt-2">Date of Birth</FormLabel>
                <Input
                  type="date"
                  rounded={'15px'}
                  p={4}
                  py={6}
                  border="1px solid"
                  borderColor="gray.300"
                  max={new Date().toISOString().split("T")[0]}
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
                  resize="none"
                  {...register('dob')}
                />
                <FormErrorMessage>{errors.dob?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel className="text-[#2D3748] pl-1 mt-2">Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  rounded={'15px'}
                  p={4}
                  py={6}
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
                  resize="none"
                  {...register('email')}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.madicalDate}>
                <FormLabel className="text-[#2D3748] pl-1 mt-2">Madical Date</FormLabel>
                <Input
                  type="date"
                  placeholder="Enter your madicald ate"
                  rounded={'15px'}
                  p={4}
                  py={6}
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
                  resize="none"
                  {...register('madicalDate')}
                />
                <FormErrorMessage>{errors.madicalDate?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.passport}>
                <FormLabel className="text-[#2D3748] pl-1 mt-2">Passport</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter your passport"
                  rounded={'15px'}
                  p={4}
                  py={6}
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
                  resize="none"
                  {...register('passport')}
                />
                <FormErrorMessage>{errors.passport?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.phone}>
                <FormLabel className="text-[#2D3748] pl-1 mt-2">Phone Number</FormLabel>
                <Input
                  type="tel"
                  placeholder="Enter your phone"
                  rounded={'15px'}
                  p={4}
                  py={6}
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
                  resize="none"
                  {...register('phone')}
                />
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.country || !!errors.state}>
                <FormLabel className="text-[#2D3748] pl-1 mt-2">Address</FormLabel>
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
                    {...register('country')}
                    onChange={(e) => {
                      register('country').onChange(e);
                      handleCountryChange(e);
                    }}
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
                    {...register('state')}
                    onChange={(e) => {
                      register('state').onChange(e);
                      handleStateChange(e);
                    }}
                  >
                    {states.map((c) => (
                      <option key={c.isoCode} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </Select>
                </HStack>
                <FormErrorMessage>{errors.country?.message || errors.state?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.city || !!errors.address}>
                <HStack>
                  <Select
                    placeholder="City"
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
                    {...register('city')}
                  >
                    {cities.map((c) => (
                      <option key={c.isoCode} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </Select>
                  <Input
                    placeholder="Address"
                    rounded={'15px'}
                    p={4}
                    py={6}
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
                    {...register('address')}
                  />
                </HStack>
                <FormErrorMessage>{errors.city?.message || errors.address?.message}</FormErrorMessage>
              </FormControl>

              <FileUpload setFormData={setValue} formData={formValues} />
              <JobDetails setFormData={setValue} formData={formValues} setUserIndustry={setUserIndustry} setUserCategory={setUserCategory} setUserSubCategory={setUserSubCategory} />

              <FormControl isInvalid={!!errors.education}>
                <FormLabel className="text-[#2D3748] pl-1 my-2">Education</FormLabel>
                <HStack
                  mt={2}
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="15px"
                  bg="white"
                  outline="1px solid"
                  outlineColor="gray.300"
                  px={5}
                  py={3}
                >
                  <HStack wrap="wrap">
                    {formValues.education.map((edu, idx) => (
                      <Tag
                        key={idx}
                        bg={'#309689'}
                        color={'white'}
                        m={1}
                        rounded={'8px'}
                        px={2}
                      >
                        <TagLabel>{edu?.institute}</TagLabel>
                        <TagCloseButton
                          onClick={() => handleTagRemove('education', idx)}
                        />
                      </Tag>
                    ))}
                  </HStack>
                  <Button
                    onClick={onEducationOpen}
                    borderRadius="15px"
                    border="1px dashed"
                    borderColor="gray.400"
                    bg="#fff"
                    color="black"
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <MdAdd size={24} />
                    Add
                  </Button>
                </HStack>
                <FormErrorMessage>{errors.education?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.experience}>
                <FormLabel className="text-[#2D3748] pl-1 my-2">Work Experience</FormLabel>
                <HStack
                  mt={2}
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="15px"
                  bg="white"
                  outline="1px solid"
                  outlineColor="gray.300"
                  px={5}
                  py={3}
                >
                  <HStack wrap="wrap">
                    {formValues.experience.map((exp, idx) => (
                      <Tag
                        key={idx}
                        bg={'#309689'}
                        color={'white'}
                        m={1}
                        rounded={'8px'}
                        px={2}
                      >
                        <TagLabel>{exp?.company}</TagLabel>
                        <TagCloseButton
                          onClick={() => handleTagRemove('experience', idx)}
                        />
                      </Tag>
                    ))}
                  </HStack>
                  <Button
                    onClick={onEmploymentOpen}
                    borderRadius="15px"
                    border="1px dashed"
                    borderColor="gray.400"
                    bg="#fff"
                    color="black"
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <MdAdd size={24} />
                    Add
                  </Button>
                </HStack>
                <FormErrorMessage>{errors.experience?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.skills}>
                <FormLabel className="text-[#2D3748] pl-1 my-2">Skill & Expertise</FormLabel>
                <HStack
                  mt={2}
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="15px"
                  bg="white"
                  outline="1px solid"
                  outlineColor="gray.300"
                  px={5}
                  py={3}
                >
                  <HStack wrap="wrap">
                    {formValues.skills.map((skill, idx) => (
                      <Tag
                        key={idx}
                        bg={'#309689'}
                        color={'white'}
                        m={1}
                        rounded={'8px'}
                        px={2}
                      >
                        <TagLabel>{skill}</TagLabel>
                        <TagCloseButton
                          onClick={() => handleTagRemove('skills', idx)}
                        />
                      </Tag>
                    ))}
                  </HStack>
                  <Button
                    onClick={onSkillOpen}
                    borderRadius="15px"
                    border="1px dashed"
                    borderColor="gray.400"
                    bg="#fff"
                    color="black"
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <MdAdd size={24} />
                    Add
                  </Button>
                </HStack>
                <FormErrorMessage>{errors.skills?.message}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                mt={4}
                bg="#309689"
                color="white"
                borderRadius="15px"
                px={6}
                py={6}
                _hover={{ bg: '#28796f' }}
              >
                Submit CV
              </Button>
              <Button
                onClick={downloadPDF}
                mt={4}
                bg="#309689"
                color="white"
                borderRadius="15px"
                px={6}
                py={6}
                _hover={{ bg: '#28796f' }}
              >
                Download CV
              </Button>
            </VStack>
          </Box>
          <Box w={{ base: '100%', md: '60%' }} bg="white" rounded={'12px'} shadow="md" ref={previewRef}>
            <Preview formData={formValues} imgPreview={imgPreview} />
          </Box>
        </Flex>
        <EmploymentPopup
          isOpen={isEmploymentOpen}
          onClose={onEmploymentClose}
          formData={formValues}
          setFormData={setValue}
        />
        <EducationPopup
          isOpen={isEducationOpen}
          onClose={onEducationClose}
          formData={formValues}
          setFormData={setValue}
        />
        <SkillPopup
          isOpen={isSkillOpen}
          onClose={onSkillClose}
          formData={formValues}
          setFormData={setValue}
          handleTagAdd={(value) => handleTagAdd('skills', value)}
        />
      </Flex>
    </form>
  )
}