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
import { Country, State } from "country-state-city";

interface ExperienceFormProps {
  register: any;
  setValue: any;
  watch: any;
  errors: any;
  tabIndex: any;
  setTabIndex: any;
}

export default function ExperienceForm({ register, setValue, watch, errors, setTabIndex }: ExperienceFormProps) {
  const experience = watch("experience") || [];
  const [isAdding, setIsAdding] = useState(false);
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [employmentData, setEmploymentData] = useState({
    designation: "",
    company: "",
    country: "",
    state: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({
    designation: "",
    company: "",
    country: "",
    state: "",
    startDate: "",
    endDate: "",
  });

  const handleTagRemove = (index: number) => {
    const updated = [...experience];
    updated.splice(index, 1);
    setValue("experience", updated, { shouldValidate: true });
  };

  const goNext = () => setTabIndex((prev: number) => prev + 1);
  const goBack = () => setTabIndex((prev: number) => Math.max(prev - 1, 0));

  const handleInputChange = (field: string, value: string) => {
    setEmploymentData({ ...employmentData, [field]: value });
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

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      designation: "",
      company: "",
      country: "",
      state: "",
      startDate: "",
      endDate: "",
    };

    if (!employmentData.designation || employmentData.designation.trim() === "") {
      newErrors.designation = "Designation is required";
      isValid = false;
    }
    if (!employmentData.company || employmentData.company.trim() === "") {
      newErrors.company = "Company name is required";
      isValid = false;
    }
    if (!employmentData.country) {
      newErrors.country = "Country is required";
      isValid = false;
    }
    if (!employmentData.state) {
      newErrors.state = "State is required";
      isValid = false;
    }
    if (!employmentData.startDate) {
      newErrors.startDate = "Start date is required";
      isValid = false;
    }
    if (!employmentData.endDate) {
      newErrors.endDate = "End date is required";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleDone = () => {
    if (!validateForm()) return;
    setValue("experience", [...experience, employmentData], { shouldValidate: true });
    setEmploymentData({
      designation: "",
      company: "",
      country: "",
      state: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setStates([]);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEmploymentData({
      designation: "",
      company: "",
      country: "",
      state: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setFormErrors({
      designation: "",
      company: "",
      country: "",
      state: "",
      startDate: "",
      endDate: "",
    });
    setStates([]);
    setIsAdding(false);
  };

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="lg" color="#2D3748" fontWeight="bold">
        Work Experience
      </Text>
      <FormControl isInvalid={!!errors.experience}>
        <FormLabel className="text-[#2D3748] pl-1 my-2">Work Experience</FormLabel>
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
          {experience.map((exp: any, idx: number) => (
            <Tag
              key={idx}
              bg="#309689"
              color="white"
              m={1}
              rounded="8px"
              px={2}
            >
              <TagLabel>{exp?.company}</TagLabel>
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
        <FormErrorMessage>{errors.experience?.message}</FormErrorMessage>
      </FormControl>

      {isAdding && (
        <VStack spacing={6} align="stretch" mt={4}>
          <HStack spacing={4}>
            <FormControl isRequired isInvalid={!!formErrors.designation}>
              <FormLabel fontSize="16px" color="gray.700" fontWeight="normal" mb={2}>
                Designation
              </FormLabel>
              <Input
                placeholder="Enter your designation"
                value={employmentData.designation}
                onChange={(e) => handleInputChange("designation", e.target.value)}
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
              <FormErrorMessage>{formErrors.designation}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!formErrors.company}>
              <FormLabel fontSize="16px" color="gray.700" fontWeight="normal" mb={2}>
                Company Name
              </FormLabel>
              <Input
                placeholder="Enter company"
                value={employmentData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
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
              <FormErrorMessage>{formErrors.company}</FormErrorMessage>
            </FormControl>
          </HStack>

          <HStack spacing={4}>
            <FormControl isRequired isInvalid={!!formErrors.country}>
              <FormLabel fontSize="16px" color="gray.700" fontWeight="normal" mb={2}>
                Country
              </FormLabel>
              <Select
                placeholder="Country"
                value={employmentData.country}
                // onChange={handleCountryChange}
                onChange={(e) => {
                  handleCountryChange(e);
                  setEmploymentData({ ...employmentData, country: e.target.value });
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
                value={employmentData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
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

          <HStack spacing={4}>
            <FormControl isRequired isInvalid={!!formErrors.startDate}>
              <FormLabel fontSize="16px" color="gray.700" fontWeight="normal" mb={2}>
                Start
              </FormLabel>
              <InputGroup>
                <Input
                  placeholder="dd/mm/yyyy"
                  value={employmentData.startDate}
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
                  value={employmentData.endDate}
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
              Description
            </FormLabel>
            <Textarea
              placeholder="Enter description..."
              value={employmentData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
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