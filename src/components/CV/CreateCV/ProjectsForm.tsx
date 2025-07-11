import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  HStack,
  VStack,
  FormErrorMessage,
  Textarea,
  Text,
} from "@chakra-ui/react";

interface ProjectsFormProps {
  register: any;
  setValue: any;
  watch: any;
  errors: any;
}

export default function ProjectsForm({ register, setValue, watch, errors }: ProjectsFormProps) {
  const projects = watch("projects");

  const addProject = () => {
    setValue("projects", [
      ...projects,
      {
        name: "",
        country: "",
        city: "",
        duration: "",
        designation: "",
        year: "",
        teamMembers: "",
      },
    ]);
  };

  const removeProject = (index: number) => {
    if (projects.length > 1) {
      setValue(
        "projects",
        projects.filter((_: any, i: number) => i !== index)
      );
    }
  };

  return (
    <VStack spacing={4} align="stretch" display={watch("tab") === 5 ? "block" : "none"}>
      <Text fontSize="lg" color="#0066cc" fontWeight="bold">Projects</Text>
      {projects.map((proj: any, index: number) => (
        <Box key={index} borderBottom="1px solid" borderColor="#eee" pb={4} mb={4}>
          <HStack spacing={4} flexWrap="wrap">
            <FormControl isInvalid={!!errors.projects?.[index]?.name} flex="1" minW="120px">
              <FormLabel fontSize="sm">Project Name</FormLabel>
              <Input
                {...register(`projects.${index}.name`)}
                placeholder="Project name"
                rounded="md"
                borderColor="gray.300"
                textTransform="capitalize"
                _focus={{ borderColor: "#0066cc", boxShadow: "0 0 0 1px #0066cc" }}
              />
              <FormErrorMessage>{errors.projects?.[index]?.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.projects?.[index]?.country} flex="1" minW="120px">
              <FormLabel fontSize="sm">Country</FormLabel>
              <Select
                {...register(`projects.${index}.country`)}
                placeholder="Select Country"
                rounded="md"
                borderColor="gray.300"
                _focus={{ borderColor: "#0066cc", boxShadow: "0 0 0 1px #0066cc" }}
              >
                {["Pakistan", "Saudi Arabia", "UAE", "Qatar", "Oman", "Kuwait", "Bahrain", "Other"].map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </Select>
              <FormErrorMessage>{errors.projects?.[index]?.country?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.projects?.[index]?.city} flex="1" minW="120px">
              <FormLabel fontSize="sm">City</FormLabel>
              <Input
                {...register(`projects.${index}.city`)}
                placeholder="City"
                rounded="md"
                borderColor="gray.300"
                textTransform="capitalize"
                _focus={{ borderColor: "#0066cc", boxShadow: "0 0 0 1px #0066cc" }}
              />
              <FormErrorMessage>{errors.projects?.[index]?.city?.message}</FormErrorMessage>
            </FormControl>
          </HStack>
          <HStack spacing={4} flexWrap="wrap" mt={2}>
            <FormControl isInvalid={!!errors.projects?.[index]?.duration} flex="1" minW="120px">
              <FormLabel fontSize="sm">Project Duration</FormLabel>
              <Input
                {...register(`projects.${index}.duration`)}
                placeholder="Duration"
                rounded="md"
                borderColor="gray.300"
                _focus={{ borderColor: "#0066cc", boxShadow: "0 0 0 1px #0066cc" }}
              />
              <FormErrorMessage>{errors.projects?.[index]?.duration?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.projects?.[index]?.designation} flex="1" minW="120px">
              <FormLabel fontSize="sm">Designation</FormLabel>
              <Input
                {...register(`projects.${index}.designation`)}
                placeholder="Your role"
                rounded="md"
                borderColor="gray.300"
                textTransform="capitalize"
                _focus={{ borderColor: "#0066cc", boxShadow: "0 0 0 1px #0066cc" }}
              />
              <FormErrorMessage>{errors.projects?.[index]?.designation?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.projects?.[index]?.year} flex="1" minW="120px">
              <FormLabel fontSize="sm">Year</FormLabel>
              <Input
                {...register(`projects.${index}.year`)}
                placeholder="Year"
                rounded="md"
                borderColor="gray.300"
                _focus={{ borderColor: "#0066cc", boxShadow: "0 0 0 1px #0066cc" }}
              />
              <FormErrorMessage>{errors.projects?.[index]?.year?.message}</FormErrorMessage>
            </FormControl>
          </HStack>
          <FormControl isInvalid={!!errors.projects?.[index]?.teamMembers} mt={2}>
            <FormLabel fontSize="sm">Team Members & Contacts</FormLabel>
            <Textarea
              {...register(`projects.${index}.teamMembers`)}
              placeholder="Name, contact of team members"
              rounded="md"
              borderColor="gray.300"
              textTransform="capitalize"
              minH="60px"
              resize="vertical"
              _focus={{ borderColor: "#0066cc", boxShadow: "0 0 0 1px #0066cc" }}
            />
            <FormErrorMessage>{errors.projects?.[index]?.teamMembers?.message}</FormErrorMessage>
          </FormControl>
          {projects.length > 1 && (
            <Button
              bg="#cc0000"
              color="white"
              rounded="md"
              size="sm"
              mt={2}
              onClick={() => removeProject(index)}
            >
              Remove This Project
            </Button>
          )}
        </Box>
      ))}
      <Button
        bg="#0066cc"
        color="white"
        rounded="md"
        size="sm"
        onClick={addProject}
      >
        Add Another Project
      </Button>
    </VStack>
  );
}
