import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  HStack,
  VStack,
  FormErrorMessage,
  Text,
  Tag,
  TagLabel,
  TagCloseButton,
  Input,
  Select,
  Textarea,
  InputGroup,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { Country, State, City } from "country-state-city";

interface EducationFormProps {
  register: any;
  setValue: any;
  watch: any;
  errors: any;
  tabIndex: any;
  setTabIndex: any;
}

export default function EducationForm({ register, setValue, watch, errors, setTabIndex }: EducationFormProps) {
  const education = watch("education") || [];
  const [isAdding, setIsAdding] = useState(false);
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [educationData, setEducationData] = useState({
    level: "",
    institute: "",
    country: "",
    state: "",
    city: "",
    startDate: "",
    endDate: "",
    details: "",
  });
  const [formErrors, setFormErrors] = useState({
    level: "",
    institute: "",
    country: "",
    state: "",
    city: "",
    startDate: "",
    endDate: "",
  });

  const handleTagRemove = (index: number) => {
    const updated = [...education];
    updated.splice(index, 1);
    setValue("education", updated, { shouldValidate: true });
  };

  const goNext = () => setTabIndex((prev: number) => prev + 1);
  const goBack = () => setTabIndex((prev: number) => Math.max(prev - 1, 0));

  const handleInputChange = (field: string, value: string) => {
    setEducationData({ ...educationData, [field]: value });
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };
  const handleInputChange2 = (field: string, value: string) => {
    setEducationData({ ...educationData, [field]: value });
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    const selectedCountry = countries.find((c) => c.name === countryCode);
    const stateList = State.getStatesOfCountry(selectedCountry?.isoCode || "");
    setStates(stateList);
    handleInputChange("country", countryCode);
    handleInputChange("state", "");
  };
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateCode = e.target.value;
    const selectedState = states.find((s) => s.name === stateCode);

    if (selectedState) {
      const cityList = City.getCitiesOfState(selectedState.countryCode, selectedState.isoCode);
      setCities(cityList);
      handleInputChange("state", stateCode);
      handleInputChange("city", "");
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      level: "",
      institute: "",
      country: "",
      state: "",
      city: "",
      startDate: "",
      endDate: "",
    };

    if (!educationData.level) {
      newErrors.level = "Level is required";
      isValid = false;
    }
    if (!educationData.institute || educationData.institute.trim() === "") {
      newErrors.institute = "Institute name is required";
      isValid = false;
    }
    if (!educationData.country) {
      newErrors.country = "Country is required";
      isValid = false;
    }
    if (!educationData.state) {
      newErrors.state = "State is required";
      isValid = false;
    }
    if (!educationData.city) {
      newErrors.city = "City is required";
      isValid = false;
    }
    if (!educationData.startDate) {
      newErrors.startDate = "Start date is required";
      isValid = false;
    }
    if (!educationData.endDate) {
      newErrors.endDate = "End date is required";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleDone = () => {
    if (!validateForm()) return;
    setValue("education", [...education, educationData], { shouldValidate: true });
    setEducationData({
      level: "",
      institute: "",
      country: "",
      state: "",
      city: "",
      startDate: "",
      endDate: "",
      details: "",
    });
    setStates([]);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEducationData({
      level: "",
      institute: "",
      country: "",
      state: "",
      city: "",
      startDate: "",
      endDate: "",
      details: "",
    });
    setFormErrors({
      level: "",
      institute: "",
      country: "",
      state: "",
      city: "",
      startDate: "",
      endDate: "",
    });
    setStates([]);
    setIsAdding(false);
  };

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="lg" color="#2D3748" fontWeight="bold">
        Education
      </Text>
      <FormControl isInvalid={!!errors.education}>
        <FormLabel className="text-[#2D3748] pl-1 my-2">Education</FormLabel>
        <HStack
          border="1px solid"
          borderColor="gray.300"
          rounded="15px"
          bg="white"
          outline="1px solid"
          outlineColor="gray.300"
          px={5}
          py={3}
          flexWrap="wrap"
        >
          {education.map((edu: any, idx: number) => (
            <Tag
              key={idx}
              bg="#309689"
              color="white"
              m={1}
              rounded="8px"
              px={2}
            >
              <TagLabel>{edu?.institute}</TagLabel>
              <TagCloseButton onClick={() => handleTagRemove(idx)} />
            </Tag>
          ))}
          <Button
            onClick={() => setIsAdding(true)}
            rounded="15px"
            border="1px dashed"
            borderColor="gray.400"
            bg="white"
            color="black"
            display="flex"
            alignItems="center"
            gap={2}
            isDisabled={isAdding}
          >
            <MdAdd size={24} />
            Add
          </Button>
        </HStack>
        <FormErrorMessage>{errors.education?.message}</FormErrorMessage>
      </FormControl>

      {isAdding && (
        <VStack spacing={6} align="stretch" mt={4}>
          <HStack spacing={4}>
            <FormControl isRequired isInvalid={!!formErrors.level}>
              <FormLabel fontSize="16px" color="gray.700" fontWeight="normal" mb={2}>
                Level
              </FormLabel>
              <Select
                placeholder="Level"
                value={educationData.level}
                onChange={(e) => handleInputChange("level", e.target.value)}
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
                  outline: "none",
                }}
                _active={{ outline: "none" }}
                transition="all 0.2s"
              >
                <option value="Middle">Middle</option>
                <option value="Bachelar">Bachelar</option>
                <option value="Diploma">Diploma</option>
                <option value="Course">Course</option>
              </Select>
              <FormErrorMessage>{formErrors.level}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!formErrors.institute}>
              <FormLabel fontSize="16px" color="gray.700" fontWeight="normal" mb={2}>
                Institute name
              </FormLabel>
              <Input
                placeholder="Enter institute name"
                value={educationData.institute}
                onChange={(e) => handleInputChange("institute", e.target.value)}
                bg="gray.50"
                border="1px solid"
                borderColor="gray.300"
                py={6}
                px={4}
                borderRadius="12px"
                fontSize="14px"
                _placeholder={{ color: "gray.400" }}
                outline="1px solid"
                outlineColor="gray.300"
                _focus={{
                  ring: 2,
                  ringColor: "#309689",
                  borderColor: "transparent",
                  outline: "none",
                }}
                _active={{ outline: "none" }}
              />
              <FormErrorMessage>{formErrors.institute}</FormErrorMessage>
            </FormControl>
          </HStack>

          <HStack spacing={4}>
            <FormControl isRequired isInvalid={!!formErrors.country}>
              <FormLabel fontSize="16px" color="gray.700" fontWeight="normal" mb={2}>
                Country
              </FormLabel>
              <Select
                placeholder="Country"
                value={educationData.country}
                onChange={(e) => {
                  handleCountryChange(e);
                  setEducationData({ ...educationData, country: e.target.value });
                }}
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
                  outline: "none",
                }}
                _active={{ outline: "none" }}
                transition="all 0.2s"
              >
                {countries.map((c) => (
                  <option key={c.isoCode} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{formErrors.country}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!formErrors.state}>
              <FormLabel fontSize="16px" color="gray.700" fontWeight="normal" mb={2}>
                State
              </FormLabel>
              <Select
                placeholder="State"
                value={educationData.state}
                onChange={(e) => {
                  handleStateChange(e);
                  setEducationData({ ...educationData, state: e.target.value });
                }}
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
                  outline: "none",
                }}
                _active={{ outline: "none" }}
                transition="all 0.2s"
              >
                {states.map((s) => (
                  <option key={s.isoCode} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{formErrors.state}</FormErrorMessage>
            </FormControl>
          </HStack>
          <FormControl isRequired isInvalid={!!formErrors.city}>
            <FormLabel fontSize="16px" color="gray.700" fontWeight="normal" mb={2}>
              City
            </FormLabel>
            <Select
              placeholder="City"
              value={educationData.city}
              onChange={(e) => handleInputChange2("city", e.target.value)}
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
                outline: "none",
              }}
              _active={{ outline: "none" }}
              transition="all 0.2s"
            >
              {cities.map((s) => (
                <option key={s.isoCode} value={s.name}>
                  {s.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{formErrors.state}</FormErrorMessage>
          </FormControl>
          <HStack spacing={4}>
            <FormControl isRequired isInvalid={!!formErrors.startDate}>
              <FormLabel fontSize="16px" color="gray.700" fontWeight="normal" mb={2}>
                Start
              </FormLabel>
              <InputGroup>
                <Input
                  placeholder="dd/mm/yyyy"
                  value={educationData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  bg="gray.50"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="12px"
                  type="date"
                  py={6}
                  px={4}
                  fontSize="14px"
                  _placeholder={{ color: "gray.400" }}
                  outline="1px solid"
                  outlineColor="gray.300"
                  max={new Date().toISOString().split("T")[0]}
                  _focus={{
                    ring: 2,
                    ringColor: "#309689",
                    borderColor: "transparent",
                    outline: "none",
                  }}
                  _active={{ outline: "none" }}
                />
              </InputGroup>
              <FormErrorMessage>{formErrors.startDate}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!formErrors.endDate}>
              <FormLabel fontSize="16px" color="gray.700" fontWeight="normal" mb={2}>
                End
              </FormLabel>
              <InputGroup>
                <Input
                  placeholder="dd/mm/yyyy"
                  value={educationData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  bg="gray.50"
                  type="date"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="12px"
                  max={new Date().toISOString().split("T")[0]}
                  py={6}
                  px={4}
                  fontSize="14px"
                  _placeholder={{ color: "gray.400" }}
                  outline="1px solid"
                  outlineColor="gray.300"
                  _focus={{
                    ring: 2,
                    ringColor: "#309689",
                    borderColor: "transparent",
                    outline: "none",
                  }}
                  _active={{ outline: "none" }}
                />
              </InputGroup>
              <FormErrorMessage>{formErrors.endDate}</FormErrorMessage>
            </FormControl>
          </HStack>

          <FormControl>
            <FormLabel fontSize="16px" color="gray.700" fontWeight="normal" mb={2}>
              Other Details
            </FormLabel>
            <Textarea
              placeholder="Enter details..."
              value={educationData.details}
              onChange={(e) => handleInputChange("details", e.target.value)}
              bg="gray.50"
              border="1px solid"
              borderColor="gray.300"
              borderRadius="12px"
              py={6}
              px={4}
              fontSize="14px"
              minH="120px"
              resize="vertical"
              _placeholder={{ color: "gray.400" }}
              outline="1px solid"
              outlineColor="gray.300"
              _focus={{
                ring: 2,
                ringColor: "#309689",
                borderColor: "transparent",
                outline: "none",
              }}
              _active={{ outline: "none" }}
            />
          </FormControl>

          <HStack spacing={4} mt={4}>
            <Button
              onClick={handleCancel}
              bg="#F1F2F4"
              color="gray.700"
              fontSize="16px"
              fontWeight="bold"
              py={6}
              px={8}
              borderRadius="12px"
              flex={1}
              _hover={{ bg: "gray.300" }}
              _active={{ bg: "gray.400" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDone}
              bg="#309689"
              color="white"
              fontSize="16px"
              fontWeight="bold"
              py={6}
              px={8}
              borderRadius="12px"
              flex={1}
              _hover={{ bg: "#28796f" }}
            >
              Done
            </Button>
          </HStack>
        </VStack>
      )}

      <HStack>
        <Button
          mt={4}
          w="full"
          bg="#309689"
          color="white"
          rounded="15px"
          px={6}
          py={6}
          _hover={{ bg: "#28796f" }}
          onClick={goBack}
        >
          Previous
        </Button>
        <Button
          mt={4}
          w="full"
          bg="#309689"
          color="white"
          rounded="15px"
          px={6}
          py={6}
          _hover={{ bg: "#28796f" }}
          onClick={goNext}
        >
          Next
        </Button>
      </HStack>
    </VStack>
  );
}