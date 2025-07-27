"use client";
import React from "react";
import {
    Box,
    Flex,
    Text,
    Tag,
    VStack,
    HStack,
    Avatar,
    UnorderedList,
    ListItem,
    Container,
    Heading,
} from "@chakra-ui/react";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import { BsPassport } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";

const Preview = ({ formData, imgPreview, watch }) => {
    return (
        <Flex h={'full'} rounded={"12px"} bg={'transparent'}>
            <VStack spacing={2} align="start" bg={'#D3EFEC'} w={'30%'} borderTopLeftRadius={'12px'} borderBottomLeftRadius={'12px'} h={'full'} p={4}>
                <Box mx={'auto'}>
                    {imgPreview ? (
                        <Avatar src={imgPreview} size="2xl" />
                    ) : (
                        <Avatar name={formData.name} size="2xl" />
                    )}
                </Box>
                <Text className="w-full max-w-[270px] text-ellipsis" fontSize="26px" color={'black'} fontWeight="bold" textTransform={'capitalize'}>{formData.name || "Your Name"}</Text>
                <Text fontSize="18px" color="blue.600" fontWeight={'bold'} textTransform={'capitalize'}>{formData.jobTitle || "Your Title"}</Text>
                <Text fontSize="16px" color="black.600" textTransform={'capitalize'}>{`S/O:  ${formData.fatherName}`}</Text>
                <Flex
                    alignItems="center"
                    className="w-full max-w-[250px] text-ellipsis"
                >
                    <Image src={'/Images/Icons/mail.png'} alt="icon" width={16} height={14} className="!h-[16px]" />
                    <Text ml={3} className="!truncate">
                        {formData.email}
                    </Text>
                </Flex>
                <Flex alignItems={'center'}
                    className="w-full max-w-[250px] text-ellipsis"
                >
                    <Image src={'/Images/Icons/phone.png'} alt="icon" width={16} height={14} className="!h-[16px]" />
                    <Text ml={3}>
                        {formData.phone}
                    </Text>
                </Flex>
                <Flex alignItems={'center'}
                    className="w-full max-w-[250px] text-ellipsis"
                >
                    <Image src={'/Images/Icons/marker.png'} alt="icon" width={16} height={14} className="!h-[16px]" />
                    <Text ml={3}>
                        {formData.localAddress},{formData.city}, {formData.country}
                    </Text>
                </Flex>


                <Flex alignItems={'center'}
                    className="w-full max-w-[250px] text-ellipsis"
                >
                    {
                        formData.gender &&
                        <>
                            <FaUserAlt className="w-[16px] h-[16px]" />
                            <Text ml={2}>
                                <Text textTransform={'capitalize'}>Gender: {formData.gender}</Text>
                            </Text>
                        </>
                    }
                </Flex>
                <Text fontSize="16px" color="black.600" textTransform={'capitalize'}>
                    {`Languages: ${formData.languages?.join(', ')}`}
                </Text>
                <Text fontSize="16px" color="black.600" textTransform={'capitalize'}>
                    {`Visited Countries: ${formData?.countriesVisited?.join(', ')}`}
                </Text>
                <Flex alignItems={'center'}
                    className="w-full max-w-[250px] text-ellipsis"
                >
                    {
                        formData.passport &&
                        <>
                            <BsPassport className="w-[16px] h-[16px]" />
                            <Text ml={2} textTransform={'uppercase'}>
                                <Text>Passport: {formData.passport}</Text>
                            </Text>
                        </>
                    }
                </Flex>
                <Flex alignItems={'center'}
                    className="w-full max-w-[250px] text-ellipsis"
                >
                    {
                        formData.passportExpiry &&
                        <>
                            <BsPassport className="w-[16px] h-[16px]" />
                            <Text ml={2}>
                                <Text>Passport Expiry: {formData.passportExpiry}</Text>
                            </Text>
                        </>
                    }
                </Flex>
                <Flex alignItems={'center'}
                    className="w-full max-w-[250px] text-ellipsis"
                >
                    {
                        formData.cnic &&
                        <>
                            <BsPassport className="w-[16px] h-[16px]" />
                            <Text ml={2}>
                                <Text>CNIC: {formData.cnic}</Text>
                            </Text>
                        </>
                    }
                </Flex>
                <Text fontSize="16px" color="black.600">{`Years of experience:  ${formData.yearsOfExperience}`}</Text>
                <Flex alignItems={'center'}
                    className="w-full max-w-[250px] text-ellipsis"
                >
                    {
                        formData.dob &&
                        <>
                            <SlCalender className="w-[15px] h-[15px]" />
                            <Text ml={2}>
                                <Text>DOB:
                                    {/* {new Date(watch('dob')).toDateString()} */}
                                    {formData.dob ? new Date(formData.dob).toLocaleDateString() : 'N/A'}
                                </Text>
                            </Text>
                        </>
                    }
                </Flex>
                <Flex alignItems={'center'}
                    className="w-full max-w-[250px] text-ellipsis"
                >
                    {
                        formData.madicalDate &&
                        <>
                            <SlCalender className="w-[15px] h-[15px]" />
                            <Text ml={2}>Medical:
                                {/* {new Date(watch('madicalDate')).toDateString()} */}
                                {formData.madicalDate ? new Date(formData.madicalDate).toLocaleDateString() : 'N/A'}
                            </Text>
                        </>
                    }
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
            <VStack spacing={3} align="start" w={'70%'} >
                <Container maxW="4xl" py={8} bg="white" minH="100vh" rounded={'12px'}>
                    <VStack spacing={8} align="stretch">
                        <Box>
                            <Heading
                                size="lg"
                                color="blue.600"
                                mb={4}
                                fontWeight="bold"
                                fontSize="24px"
                            >
                                Objective
                            </Heading>

                            <VStack spacing={4} align="stretch">
                                <Text fontSize="14px" color="gray.600">
                                    {formData.objective}
                                </Text>
                            </VStack>
                        </Box>
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
                                {
                                    formData.education.map((edu, idx) => (
                                        <Box key={idx}>
                                            <HStack justify="space-between" align="flex-start" mb={1}>
                                                <VStack align="start" spacing={0}>
                                                    <Text fontWeight="bold" fontSize="16px" color="gray.800">
                                                        • {edu.details}
                                                    </Text>
                                                    <Text fontSize="14px" color="gray.600" ml={3}>
                                                        {edu.institute}
                                                    </Text>
                                                </VStack>
                                                <Text fontSize="14px" color="gray.600" fontStyle="italic">
                                                    {edu.startDate.split("-")[0] + " - " + edu.endDate.split("-")[0]}, {edu.country + " - " + edu.state}
                                                </Text>
                                            </HStack>
                                        </Box>
                                    ))
                                }
                            </VStack>
                        </Box>
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
                                {formData.experience.map((exp, idx) => (
                                    <Box key={idx}>
                                        <HStack justify="space-between" align="flex-start" mb={2}>
                                            <VStack align="start" spacing={0}>
                                                <Text fontWeight="bold" fontSize="16px" color="gray.800">
                                                    {exp.designation}
                                                </Text>
                                                <Text fontSize="14px" color="gray.600">
                                                    {exp.company}, {exp.country}, {exp.state}
                                                </Text>
                                            </VStack>
                                            <Text fontSize="14px" color="gray.600" fontStyle="italic">
                                                {exp.startDate.split("-")[0]} - {exp.endDate.split("-")[0]}
                                            </Text>
                                        </HStack>
                                        <UnorderedList spacing={1} ml={4} mt={2}>
                                            <ListItem fontSize="14px" color="gray.700">
                                                {exp.description}
                                            </ListItem>
                                        </UnorderedList>
                                    </Box>
                                ))}
                            </VStack>
                        </Box>
                    </VStack>
                </Container>
            </VStack>
        </Flex>
    )
}
export default Preview