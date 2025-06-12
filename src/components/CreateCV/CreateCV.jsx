// CreateCVPage.tsx
"use client";

import React, { useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Input,
  Text,
  Select,
  Textarea,
  Button,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
  IconButton,
  VStack,
  HStack,
  Avatar
} from "@chakra-ui/react";
import { MdAdd  } from "react-icons/md";

export default function CreateCVPage() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    job: "",
    category: "",
    subcategory: "",
    education: [],
    experience: [],
    skills: []
  });

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
    <Flex direction={{ base: "column", md: "row" }} gap={8} p={8} bg="#D3EFEC">
      <Box w={{ base: "100%", md: "50%" }}>
        <VStack spacing={4} align="stretch">
          <Input placeholder="Enter your name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          <Input placeholder="Date of birth" type="date" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} />
          <Input placeholder="Enter email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          <Input placeholder="Phone number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />

          <HStack>
            <Select placeholder="Country" value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })}>
              <option value="Pakistan">Pakistan</option>
              <option value="India">India</option>
              <option value="UAE">UAE</option>
            </Select>
            <Input placeholder="City" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
          </HStack>

          <Input placeholder="Job applied for" value={formData.job} onChange={e => setFormData({ ...formData, job: e.target.value })} />
          <HStack>
            <Select placeholder="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
              <option value="Engineering">Engineering</option>
              <option value="IT">IT</option>
            </Select>
            <Select placeholder="Subcategory" value={formData.subcategory} onChange={e => setFormData({ ...formData, subcategory: e.target.value })}>
              <option value="Software">Software</option>
              <option value="Hardware">Hardware</option>
            </Select>
          </HStack>

          <Box>
            <HStack>
              <Input placeholder="Add Education" value={educationInput} onChange={e => setEducationInput(e.target.value)} />
              <IconButton aria-label="Add" icon={<MdAdd  />} onClick={() => handleTagAdd("education", educationInput)} />
            </HStack>
            <HStack wrap="wrap">
              {formData.education.map((edu, idx) => (
                <Tag key={idx} colorScheme="teal" m={1}>
                  <TagLabel>{edu}</TagLabel>
                  <TagCloseButton onClick={() => handleTagRemove("education", idx)} />
                </Tag>
              ))}
            </HStack>
          </Box>

          <Box>
            <HStack>
              <Input placeholder="Add Experience" value={experienceInput} onChange={e => setExperienceInput(e.target.value)} />
              <IconButton aria-label="Add" icon={<MdAdd  />} onClick={() => handleTagAdd("experience", experienceInput)} />
            </HStack>
            <HStack wrap="wrap">
              {formData.experience.map((exp, idx) => (
                <Tag key={idx} colorScheme="purple" m={1}>
                  <TagLabel>{exp}</TagLabel>
                  <TagCloseButton onClick={() => handleTagRemove("experience", idx)} />
                </Tag>
              ))}
            </HStack>
          </Box>
          <Box>
            <HStack>
              <Input placeholder="Add Skill" value={skillsInput} onChange={e => setSkillsInput(e.target.value)} />
              <IconButton aria-label="Add" icon={<MdAdd  />} onClick={() => handleTagAdd("skills", skillsInput)} />
            </HStack>
            <HStack wrap="wrap">
              {formData.skills.map((skill, idx) => (
                <Tag key={idx} colorScheme="green" m={1}>
                  <TagLabel>{skill}</TagLabel>
                  <TagCloseButton onClick={() => handleTagRemove("skills", idx)} />
                </Tag>
              ))}
            </HStack>
          </Box>
        </VStack>
      </Box>

      <Box w={{ base: "100%", md: "50%" }} bg="white" p={6} rounded="lg" shadow="md">
        <VStack spacing={3} align="start">
          <Avatar name={formData.name} size="xl" />
          <Text fontSize="2xl" fontWeight="bold">{formData.name || "Your Name"}</Text>
          <Text>{formData.job || "Your Title"}</Text>
          <Text>{formData.email}</Text>
          <Text>{formData.phone}</Text>
          <Text>{formData.city}, {formData.country}</Text>

          <Box>
            <Text fontWeight="bold" mt={4}>Education</Text>
            <VStack align="start">
              {formData.education.map((edu, idx) => (
                <Text key={idx}>• {edu}</Text>
              ))}
            </VStack>
          </Box>

          <Box>
            <Text fontWeight="bold" mt={4}>Experience</Text>
            <VStack align="start">
              {formData.experience.map((exp, idx) => (
                <Text key={idx}>• {exp}</Text>
              ))}
            </VStack>
          </Box>

          <Box>
            <Text fontWeight="bold" mt={4}>Skills</Text>
            <HStack wrap="wrap">
              {formData.skills.map((skill, idx) => (
                <Tag key={idx} colorScheme="teal">{skill}</Tag>
              ))}
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
}
