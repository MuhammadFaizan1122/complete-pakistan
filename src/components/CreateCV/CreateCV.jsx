"use client";
import React, { useEffect, useState } from "react";
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

export default function CreateCVPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);
  const {
    isOpen: isEmploymentOpen,
    onOpen: onEmploymentOpen,
    onClose: onEmploymentClose,
  } = useDisclosure();
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

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
  const toast = useToast();
    const [formData, setFormData] = useState({
      name: "Muhammad Faizan",
      dob: "06-08-2000",
      portfolio: "www.imfaizan.com",
      email: "muh.faizaan@gmail.com",
      phone: "0300-2493788",
      country: '',
      city: '',
      state: '',
      address: '',
      job: "Software Engineer",
      industry: '',
      category: '',
      subcategory: '',
      jobDetail: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quos exercitationem voluptatem cupiditate facilis a ex sequi expedita modi labore. Perferendis nemo voluptas et explicabo ipsam ipsum. Odio voluptates aliquid consequatur molestiae explicabo recusandae deleniti quod, vero in nesciunt, atque nam ipsum tempora, quam voluptas quo debitis officiis? Eaque, doloremque!",
      education: [],
      experience: [],
      skills: []
    });
  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    const selectedCountry = countries.find(c => c.name === countryCode);
    const stateList = State.getStatesOfCountry(selectedCountry.isoCode);
    setStates(stateList);
    setCities([]);
  };
  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    const selectedState = states.find(s => s.name === stateCode);
    const cityList = City.getCitiesOfState(selectedState.countryCode, selectedState.isoCode);
    setCities(cityList);
  };
  const [educationInput, setEducationInput] = useState("");
  const [experienceInput, setExperienceInput] = useState("");
  const [skillsInput, setSkillsInput] = useState("");

  const handleTagAdd = (key, value) => {
    if (!value.trim()) return;
    setFormData(prev => ({ ...prev, [key]: [...prev[key], value.trim()] }));
    if (key === "education") setEducationInput("");
    if (key === "experience") setExperienceInput("");
    if (key === "skills") setSkillsInput("");
  };
  const handleTagRemove = (key, index) => {
    const updated = [...formData[key]];
    updated.splice(index, 1);
    setFormData(prev => ({ ...prev, [key]: updated }));
  };

  return (
    <Flex direction={{ base: "column", md: "row" }} p={8} bg="#D3EFEC">
      <Flex maxW={'1440px'} mx={'auto'} w={'full'} gap={4}>
        <Box w={{ base: "100%", md: "40%" }}>
          <VStack spacing={2} align="stretch" px={2} maxH={'120vh'} overflowY={'scroll'}
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
            <>
              <label className="text-[#2D3748] pl-1 mt-2">Photo</label>
              <Box
                bg="white"
                borderRadius="2xl"
                boxShadow="md"
                textAlign="center"
                p={2}
                w={{ base: 'full', md: '200px' }}
              >
                <Flex direction="column" align="center" gap={2} my={2}>
                  <Image src={'/Images/Icons/camera.png'} alt="icon" width={24} height={24} className="!h-[24px]" />
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
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                  </Button>
                </Flex>
              </Box>
            </>
            <label className="text-[#2D3748] pl-1 mt-2">Name</label>
            <Input
              value={formData.name}
              placeholder="Enter your name"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              w="full"
              px={4}
              py={6}
              border="1px solid"
              borderColor="gray.300"
              borderRadius="15px"
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
              resize="none"
            />
            <label className="text-[#2D3748] pl-1 mt-2">Date of Birth</label>
            <Input
              value={formData.dob}
              placeholder="Enter your name"
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              w="full"
              type="date"
              px={4}
              py={6}
              border="1px solid"
              borderColor="gray.300"
              borderRadius="15px"
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
              resize="none"
            />
            <label className="text-[#2D3748] pl-1 mt-2">Email</label>
            <Input
              value={formData.email}
              placeholder="Enter your email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              w="full"
              type="email"
              px={4}
              py={6}
              border="1px solid"
              borderColor="gray.300"
              borderRadius="15px"
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
              resize="none"
            />
            <label className="text-[#2D3748] pl-1 mt-2">Phone Number</label>
            <Input
              value={formData.phone}
              placeholder="Enter your phone"
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              w="full"
              type="number"
              px={4}
              py={6}
              border="1px solid"
              borderColor="gray.300"
              borderRadius="15px"
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
              resize="none"
            />

            <label className="text-[#2D3748] pl-1 mt-2">Address</label>
            <HStack>
              <Select
                placeholder="Country"
                value={formData.country}
                onChange={e => { setFormData({ ...formData, country: e.target.value }), handleCountryChange(e) }}
                w="full"
                h="50px"
                border="1px solid"
                borderColor="gray.300"
                borderRadius="15px"
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
                {countries.map(c => (
                  <option key={c.isoCode} value={c.name}>{c.name}</option>
                ))}
              </Select>
              <Select
                placeholder="State"
                value={formData.state}
                onChange={e => { setFormData({ ...formData, state: e.target.value }), handleStateChange(e) }}
                w="full"
                h="50px"
                border="1px solid"
                borderColor="gray.300"
                borderRadius="15px"
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
                {states.map(c => (
                  <option key={c.isoCode} value={c.name}>{c.name}</option>
                ))}
              </Select>
            </HStack>
            <HStack>
              <Select
                placeholder="City"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                w="full"
                h="50px"
                border="1px solid"
                borderColor="gray.300"
                borderRadius="15px"
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
                {cities.map(c => (
                  <option key={c.isoCode} value={c.name}>{c.name}</option>
                ))}
              </Select>
              <Input
                placeholder="Address"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                w="full"
                px={4}
                py={6}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="15px"
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
              />
            </HStack>
            <FileUpload />
            <JobDetails formData={formData} setFormData={setFormData} />


            <Box>
              <label className="text-[#2D3748] pl-1 my-2">Education</label>
              <HStack mt={2}
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
                  {formData.education.map((edu, idx) => (
                    <Tag key={idx} bg={'#309689'} color={'white'} m={1} rounded={'8px'} px={2}>
                      <TagLabel>{edu}</TagLabel>
                      <TagCloseButton onClick={() => handleTagRemove("education", idx)} />
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

            </Box>

            <Box>
              <label className="text-[#2D3748] pl-1 my-2">Work Experience</label>
              <HStack mt={2}
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
                  {formData.experience.map((exp, idx) => (
                    <Tag key={idx} bg={'#309689'} color={'white'} m={1} rounded={'8px'} px={2}>
                      <TagLabel>{exp?.company}</TagLabel>
                      <TagCloseButton onClick={() => handleTagRemove("experience", idx)} />
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
            </Box>

            <Box>
              <label className="text-[#2D3748] pl-1 my-2">Skill & Expertise</label>
              <HStack mt={2}
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
                  {formData.skills.map((skill, idx) => (
                    <Tag key={idx} bg={'#309689'} color={'white'} m={1} rounded={'8px'} px={2}>
                      <TagLabel>{skill}</TagLabel>
                      <TagCloseButton onClick={() => handleTagRemove("skills", idx)} />
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

            </Box>
          </VStack>
        </Box>
        <Box w={{ base: "100%", md: "60%" }} bg="white" rounded={"12px"} shadow="md">
          <Preview formData={formData} />
        </Box>
      </Flex>
      <EmploymentPopup isOpen={isEmploymentOpen} onClose={onEmploymentClose} formData={formData} setFormData={setFormData} />
      <EducationPopup isOpen={isEducationOpen} onClose={onEducationClose} />
      <SkillPopup isOpen={isSkillOpen} onClose={onSkillClose} />
    </Flex>
  );
}
