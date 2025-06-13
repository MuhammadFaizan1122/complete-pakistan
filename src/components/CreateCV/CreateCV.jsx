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
  Avatar,
  UnorderedList,
  ListItem,
  Container,
  Heading
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import Image from "next/image";

export default function CreateCVPage() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "Muhammad Faizan",
    dob: "06-08-2000",
    portfolio: "www.imfaizan.com",
    email: "muh.faizaan@gmail.com",
    phone: "0300-2493788",
    country: "Pakistan",
    city: "Karachi",
    job: "Software Engineer",
    category: "Software",
    subcategory: "IT",
    jobDetail: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quos exercitationem voluptatem cupiditate facilis a ex sequi expedita modi labore. Perferendis nemo voluptas et explicabo ipsam ipsum. Odio voluptates aliquid consequatur molestiae explicabo recusandae deleniti quod, vero in nesciunt, atque nam ipsum tempora, quam voluptas quo debitis officiis? Eaque, doloremque!",
    education: ['Matric', 'Intermidiate', 'Diploma', 'Cloud Native'],
    experience: ['TechnoSol', 'DuneSoft', 'Mobitising', 'NextChainX'],
    skills: ['figma', 'Html', 'Adobe Photoshop', 'CSS', 'Adobe Illistrator', 'C++', 'Sketch', 'MATLab']
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
    <Flex direction={{ base: "column", md: "row" }} p={8} bg="#D3EFEC">
      <Flex maxW={'1440px'} mx={'auto'} w={'full'} gap={8}>
        <Box w={{ base: "100%", md: "40%" }}>
          <VStack spacing={2} align="stretch">
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
                ringColor: "teal.500",
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
                ringColor: "teal.500",
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
                ringColor: "teal.500",
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
                ringColor: "teal.500",
                borderColor: "transparent",
                outline: "none"
              }}
              _active={{
                outline: "none"
              }}
              transition="all 0.2s"
              resize="none"
            />
            {/* <Input placeholder="Date of birth" type="date" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} />
          <Input placeholder="Enter email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          <Input placeholder="Phone number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} /> */}

            <label className="text-[#2D3748] pl-1 mt-2">Country</label>
            <HStack>
              <Select
                placeholder="Country"
                value={formData.country}
                onChange={e => setFormData({ ...formData, country: e.target.value })}
                w="full"
                // px={4}
                // py={3}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="15px"
                bg="white"
                outline="1px solid"
                outlineColor="gray.300"
                _focus={{
                  ring: 2,
                  ringColor: "teal.500",
                  borderColor: "transparent",
                  outline: "none"
                }}
                _active={{
                  outline: "none"
                }}
                transition="all 0.2s"
              >
                <option value="Pakistan">Pakistan</option>
                <option value="India">India</option>
                <option value="UAE">UAE</option>
              </Select>
              <Input
                placeholder="City"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                w="full"
                px={4}
                py={3}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="15px"
                bg="white"
                outline="1px solid"
                outlineColor="gray.300"
                _focus={{
                  ring: 2,
                  ringColor: "teal.500",
                  borderColor: "transparent",
                  outline: "none"
                }}
                _active={{
                  outline: "none"
                }}
                transition="all 0.2s"
              />
            </HStack>


            <label className="text-[#2D3748] pl-1 mt-2">Job Details</label>
            <Input
              placeholder="Job applied for"
              value={formData.job}
              onChange={e => setFormData({ ...formData, job: e.target.value })}
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
                ringColor: "teal.500",
                borderColor: "transparent",
                outline: "none"
              }}
              _active={{
                outline: "none"
              }}
              transition="all 0.2s"
            />
            <label className="text-[#2D3748] pl-1 mt-2">Category</label>
            <HStack>
              <Select
                placeholder="Category"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                w="full"
                border="1px solid"
                borderColor="gray.300"
                borderRadius="15px"
                bg="white"
                outline="1px solid"
                outlineColor="gray.300"
                _focus={{
                  ring: 2,
                  ringColor: "teal.500",
                  borderColor: "transparent",
                  outline: "none"
                }}
                _active={{
                  outline: "none"
                }}
                transition="all 0.2s"
              >
                <option value="Engineering">Engineering</option>
                <option value="IT">IT</option>
              </Select>
              <Select
                placeholder="Subcategory"
                value={formData.subcategory}
                onChange={e => setFormData({ ...formData, subcategory: e.target.value })}
                w="full"
                border="1px solid"
                borderColor="gray.300"
                borderRadius="15px"
                bg="white"
                outline="1px solid"
                outlineColor="gray.300"
                _focus={{
                  ring: 2,
                  ringColor: "teal.500",
                  borderColor: "transparent",
                  outline: "none"
                }}
                _active={{
                  outline: "none"
                }}
                transition="all 0.2s"
              >
                <option value="Software">Software</option>
                <option value="Hardware">Hardware</option>
              </Select>
            </HStack>

            <Box>
              <label className="text-[#2D3748] pl-1 my-2">Education</label>
              <HStack mt={2}>
                <Input
                  placeholder="Add Education"
                  value={educationInput}
                  onChange={e => setEducationInput(e.target.value)}
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
                    ringColor: "teal.500",
                    borderColor: "transparent",
                    outline: "none"
                  }}
                  _active={{
                    outline: "none"
                  }}
                  transition="all 0.2s"
                />
                <IconButton
                  aria-label="Add"
                  icon={<MdAdd />}
                  onClick={() => handleTagAdd("education", educationInput)}
                  borderRadius="15px"
                  colorScheme="teal"
                />
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
              <label className="text-[#2D3748] pl-1 my-2">Work Experience</label>
              <HStack mt={2}>
                <Input
                  placeholder="Add Experience"
                  value={experienceInput}
                  onChange={e => setExperienceInput(e.target.value)}
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
                    ringColor: "teal.500",
                    borderColor: "transparent",
                    outline: "none"
                  }}
                  _active={{
                    outline: "none"
                  }}
                  transition="all 0.2s"
                />
                <IconButton
                  aria-label="Add"
                  icon={<MdAdd />}
                  onClick={() => handleTagAdd("experience", experienceInput)}
                  borderRadius="15px"
                  colorScheme="teal"
                />
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
              <label className="text-[#2D3748] pl-1 my-2">Skill & Expertise</label>
              <HStack mt={2}>
                <Input
                  placeholder="Add Skill"
                  value={skillsInput}
                  onChange={e => setSkillsInput(e.target.value)}
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
                    ringColor: "teal.500",
                    borderColor: "transparent",
                    outline: "none"
                  }}
                  _active={{
                    outline: "none"
                  }}
                  transition="all 0.2s"
                />
                <IconButton
                  aria-label="Add"
                  icon={<MdAdd />}
                  onClick={() => handleTagAdd("skills", skillsInput)}
                  borderRadius="15px"
                  colorScheme="teal"
                />
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
        <Box w={{ base: "100%", md: "60%" }} bg="white" rounded="12px" shadow="md">
          <Flex h={'full'}>
            <VStack spacing={2} align="start" bg={'#f1f2f4'} w={'30%'} borderTopLeftRadius={'12px'} borderBottomLeftRadius={'12px'} h={'full'} p={4}>
              <Box mx={'auto'}>
                <Avatar name={formData.name} size="2xl" p={0} />
              </Box>
              <Text fontSize="26px" color={'black'} fontWeight="bold">{formData.name || "Your Name"}</Text>
              <Text fontSize="18px" color={'black'}>{formData.job || "Your Title"}</Text>

              <Flex alignItems={'center'}>
                <Image src={'/Images/Icons/earth.png'} alt="icon" width={16} height={14} className="!h-[16px]" />
                <Text ml={3}>
                  {formData.portfolio}
                </Text>
              </Flex>
              <Flex alignItems={'center'}>
                <Image src={'/Images/Icons/mail.png'} alt="icon" width={16} height={14} className="!h-[16px]" />
                <Text ml={3}>
                  {formData.email}
                </Text>
              </Flex>
              <Flex alignItems={'center'}>
                <Image src={'/Images/Icons/phone.png'} alt="icon" width={16} height={14} className="!h-[16px]" />
                <Text ml={3}>
                  {formData.phone}
                </Text>
              </Flex>
              <Flex alignItems={'center'}>
                <Image src={'/Images/Icons/marker.png'} alt="icon" width={16} height={14} className="!h-[16px]" />
                <Text ml={3}>
                  {formData.city}, {formData.country}
                </Text>
              </Flex>
              <Text my={4} fontSize="14px" color={'black'}>{formData.jobDetail}</Text>
              <Box>
                <Text fontSize={'24px'} fontWeight="bold" mb={4}>Skills</Text>
                <HStack wrap="wrap">
                  {formData.skills.map((skill, idx) => (
                    <Tag key={idx} bg="#309689" color={'#fff'} p={2} textTransform={'capitalize'}>{skill}</Tag>
                  ))}
                </HStack>
              </Box>
            </VStack>
            <VStack spacing={3} align="start" w={'70%'}>
              <Container maxW="4xl" py={8} bg="white" minH="100vh">
                <VStack spacing={8} align="stretch">

                  {/* Education Section */}
                  <Box>
                    <Heading
                      size="lg"
                      color="blue.600"
                      mb={4}
                      fontWeight="bold"
                      fontSize="24px"
                    >
                      Education
                    </Heading>

                    <VStack spacing={4} align="stretch">
                      {/* First Education Entry */}
                      <Box>
                        <HStack justify="space-between" align="flex-start" mb={1}>
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="bold" fontSize="16px" color="gray.800">
                              • Business Administration
                            </Text>
                            <Text fontSize="14px" color="gray.600" ml={3}>
                              University of New York
                            </Text>
                          </VStack>
                          <Text fontSize="14px" color="gray.600" fontStyle="italic">
                            2006 - 2010, New York, NY
                          </Text>
                        </HStack>
                      </Box>

                      {/* Second Education Entry */}
                      <Box>
                        <HStack justify="space-between" align="flex-start" mb={1}>
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="bold" fontSize="16px" color="gray.800">
                              • Business Administration
                            </Text>
                            <Text fontSize="14px" color="gray.600" ml={3}>
                              University of New York
                            </Text>
                          </VStack>
                          <Text fontSize="14px" color="gray.600" fontStyle="italic">
                            2006 - 2010, New York, NY
                          </Text>
                        </HStack>
                      </Box>
                    </VStack>
                  </Box>

                  {/* Experience Section */}
                  <Box>
                    <Heading
                      size="lg"
                      color="blue.600"
                      mb={4}
                      fontWeight="bold"
                      fontSize="24px"
                    >
                      Experience
                    </Heading>

                    <VStack spacing={6} align="stretch">
                      {/* Social Media Manager - Dufour */}
                      <Box>
                        <HStack justify="space-between" align="flex-start" mb={2}>
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="bold" fontSize="16px" color="gray.800">
                              Social Media Manager
                            </Text>
                            <Text fontSize="14px" color="gray.600">
                              Dufour, Dubai, U.A.E.
                            </Text>
                          </VStack>
                          <Text fontSize="14px" color="gray.600" fontStyle="italic">
                            2015 - Ongoing
                          </Text>
                        </HStack>

                        <UnorderedList spacing={1} ml={4} mt={2}>
                          <ListItem fontSize="14px" color="gray.700">
                            Weekly writing of ~3000 words articles for high profile industry leaders.
                          </ListItem>
                          <ListItem fontSize="14px" color="gray.700">
                            Worked with social media channels with ~30000 followers.
                          </ListItem>
                          <ListItem fontSize="14px" color="gray.700">
                            Overseeing the output of 17 team members including Community Managers, Analysts and Designers.
                          </ListItem>
                        </UnorderedList>
                      </Box>

                      {/* Social Media Manager - Herman LLC */}
                      <Box>
                        <HStack justify="space-between" align="flex-start" mb={2}>
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="bold" fontSize="16px" color="gray.800">
                              Social Media Manager
                            </Text>
                            <Text fontSize="14px" color="gray.600">
                              Herman LLC, New York, NY
                            </Text>
                          </VStack>
                          <Text fontSize="14px" color="gray.600" fontStyle="italic">
                            2011 - 2015
                          </Text>
                        </HStack>

                        <UnorderedList spacing={1} ml={4} mt={2}>
                          <ListItem fontSize="14px" color="gray.700">
                            Apply to events to expose the brands of my clients (4 events per month).
                          </ListItem>
                          <ListItem fontSize="14px" color="gray.700">
                            Increased Social Media followers and engagement by ~250% on average per client in the first 3 months of collaboration.
                          </ListItem>
                        </UnorderedList>
                      </Box>

                      {/* Social Media Specialist - First Entry */}
                      <Box>
                        <HStack justify="space-between" align="flex-start" mb={2}>
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="bold" fontSize="16px" color="gray.800">
                              Social Media Specialist
                            </Text>
                            <Text fontSize="14px" color="gray.600">
                              Schmeier, New York, NY
                            </Text>
                          </VStack>
                          <Text fontSize="14px" color="gray.600" fontStyle="italic">
                            2010 - 2011
                          </Text>
                        </HStack>

                        <UnorderedList spacing={1} ml={4} mt={2}>
                          <ListItem fontSize="14px" color="gray.700">
                            Apply to events to expose the brands of my clients (4 events per month).
                          </ListItem>
                        </UnorderedList>
                      </Box>

                      {/* Social Media Specialist - Second Entry */}
                      <Box>
                        <HStack justify="space-between" align="flex-start" mb={2}>
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="bold" fontSize="16px" color="gray.800">
                              Social Media Specialist
                            </Text>
                            <Text fontSize="14px" color="gray.600">
                              Schmeier, New York, NY
                            </Text>
                          </VStack>
                          <Text fontSize="14px" color="gray.600" fontStyle="italic">
                            2010 - 2011
                          </Text>
                        </HStack>

                        <UnorderedList spacing={1} ml={4} mt={2}>
                          <ListItem fontSize="14px" color="gray.700">
                            Apply to events to expose the brands of my clients (4 events per month).
                          </ListItem>
                        </UnorderedList>
                      </Box>
                    </VStack>
                  </Box>

                  {/* Volunteer Experience Section */}
                  <Box>
                    <Heading
                      size="lg"
                      color="blue.600"
                      mb={4}
                      fontWeight="bold"
                      fontSize="24px"
                    >
                      Volunteer Experience
                    </Heading>

                    <VStack spacing={6} align="stretch">
                      {/* LC President */}
                      <Box>
                        <HStack justify="space-between" align="flex-start" mb={2}>
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="bold" fontSize="16px" color="gray.800">
                              LC President, AIESEC
                            </Text>
                            <Text fontSize="14px" color="gray.600">
                              University of Sevilla
                            </Text>
                          </VStack>
                          <Text fontSize="14px" color="gray.600" fontStyle="italic">
                            2002-2006, 4 years
                          </Text>
                        </HStack>

                        <Text fontSize="14px" color="gray.700" mt={2}>
                          AIESEC is an international youth-run, non-governmental and not-for-profit organization that provides young world leadership development, cross-cultural and international, and volunteer exchange program experiences.
                        </Text>
                      </Box>

                      {/* Football team member */}
                      <Box>
                        <HStack justify="space-between" align="flex-start" mb={2}>
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="bold" fontSize="16px" color="gray.800">
                              Football team member, Cadiz FC
                            </Text>
                            <Text fontSize="14px" color="gray.600">
                              Cadiz Football Club
                            </Text>
                          </VStack>
                          <Text fontSize="14px" color="gray.600" fontStyle="italic">
                            2006-2008, 2 years
                          </Text>
                        </HStack>

                        <Text fontSize="14px" color="gray.700" mt={2}>
                          Cadiz Club de Futbol, S.A.D., known simply as Cadiz, is a professional football club based in Cadiz, Andalusia, Spain.
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                </VStack>
              </Container>
            </VStack>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
