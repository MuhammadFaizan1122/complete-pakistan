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

const Preview = ({ formData, imgPreview }) => {
    // console.log("formData", formData);
    return (
        <Flex h={'full'} rounded={"12px"} bg={'transparent'}>
            <VStack spacing={2} align="start" bg={'#f1f2f4'} w={'30%'} borderTopLeftRadius={'12px'} borderBottomLeftRadius={'12px'} h={'full'} p={4}>
                <Box mx={'auto'}>
                    {imgPreview ? (
                        <Avatar src={imgPreview} size="2xl" />
                    ) : (
                        <Avatar name={formData.name} size="2xl" />
                    )}
                </Box>
                <Text className="w-full max-w-[270px] text-ellipsis" fontSize="26px" color={'black'} fontWeight="bold">{formData.name || "Your Name"}</Text>
                <Text fontSize="18px" color={'black'}>{formData.job || "Your Title"}</Text>

                {/* <Flex
                    alignItems="center"
                    className="w-full max-w-[250px] text-ellipsis"
                >
                    <Image src={'/Images/Icons/earth.png'} alt="icon" width={16} height={14} className="!h-[16px]" />
                    <Text ml={3}>
                        {formData.portfolio}
                    </Text>
                </Flex> */}
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


//  <Flex h={'full'} rounded={"12px"} bg={'transparent'}>
//             <VStack spacing={2} align="start" bg={'#f1f2f4'} w={'30%'} borderTopLeftRadius={'12px'} borderBottomLeftRadius={'12px'} h={'full'} p={4}>
//                 <Box mx={'auto'}>
//                     {imgPreview ? (
//                         <Avatar src={imgPreview} size="2xl" />
//                     ) : (
//                         <Avatar name={formData.name} size="2xl" />
//                     )}
//                     {/* <Avatar name={formData.name} size="2xl" p={0} /> */}
//                 </Box>
//                 <Text className="w-full max-w-[270px] text-ellipsis" fontSize="26px" color={'black'} fontWeight="bold">{formData.name || "Your Name"}</Text>
//                 <Text fontSize="18px" color={'black'}>{formData.job || "Your Title"}</Text>

//                 <Flex
//                     alignItems="center"
//                     className="w-full max-w-[250px] text-ellipsis"
//                 >
//                     <Image src={'/Images/Icons/earth.png'} alt="icon" width={16} height={14} className="!h-[16px]" />
//                     <Text ml={3}>
//                         {formData.portfolio}
//                     </Text>
//                 </Flex>
//                 <Flex
//                     alignItems="center"
//                     className="w-full max-w-[250px] text-ellipsis"
//                 >
//                     <Image src={'/Images/Icons/mail.png'} alt="icon" width={16} height={14} className="!h-[16px]" />
//                     <Text ml={3} className="!truncate">
//                         {formData.email}
//                     </Text>
//                 </Flex>
//                 <Flex alignItems={'center'}
//                     className="w-full max-w-[250px] text-ellipsis"
//                 >
//                     <Image src={'/Images/Icons/phone.png'} alt="icon" width={16} height={14} className="!h-[16px]" />
//                     <Text ml={3}>
//                         {formData.phone}
//                     </Text>
//                 </Flex>
//                 <Flex alignItems={'center'}
//                     className="w-full max-w-[250px] text-ellipsis"
//                 >
//                     <Image src={'/Images/Icons/marker.png'} alt="icon" width={16} height={14} className="!h-[16px]" />
//                     <Text ml={3}>
//                         {formData.city}, {formData.country}
//                     </Text>
//                 </Flex>
//                 <Text my={4} fontSize="14px" color={'black'}>{formData.jobDetail}</Text>
//                 <Box>
//                     <Text fontSize={'24px'} fontWeight="bold" mb={4}>Skills</Text>
//                     <HStack wrap="wrap">
//                         {formData.skills.map((skill, idx) => (
//                             <Tag key={idx} bg="#309689" color={'#fff'} p={2} textTransform={'capitalize'}>{skill}</Tag>
//                         ))}
//                     </HStack>
//                 </Box>
//             </VStack>
//             <VStack spacing={3} align="start" w={'70%'} >
//                 <Container maxW="4xl" py={8} bg="white" minH="100vh" rounded={'12px'}>
//                     <VStack spacing={8} align="stretch">
//                         <Box>
//                             <Heading
//                                 size="lg"
//                                 color="blue.600"
//                                 mb={4}
//                                 fontWeight="bold"
//                                 fontSize="24px"
//                             >
//                                 Education
//                             </Heading>

//                             <VStack spacing={4} align="stretch">
//                                 <Box>
//                                     <HStack justify="space-between" align="flex-start" mb={1}>
//                                         <VStack align="start" spacing={0}>
//                                             <Text fontWeight="bold" fontSize="16px" color="gray.800">
//                                                 • Business Administration
//                                             </Text>
//                                             <Text fontSize="14px" color="gray.600" ml={3}>
//                                                 University of New York
//                                             </Text>
//                                         </VStack>
//                                         <Text fontSize="14px" color="gray.600" fontStyle="italic">
//                                             2006 - 2010, New York, NY
//                                         </Text>
//                                     </HStack>
//                                 </Box>
//                                 <Box>
//                                     <HStack justify="space-between" align="flex-start" mb={1}>
//                                         <VStack align="start" spacing={0}>
//                                             <Text fontWeight="bold" fontSize="16px" color="gray.800">
//                                                 • Business Administration
//                                             </Text>
//                                             <Text fontSize="14px" color="gray.600" ml={3}>
//                                                 University of New York
//                                             </Text>
//                                         </VStack>
//                                         <Text fontSize="14px" color="gray.600" fontStyle="italic">
//                                             2006 - 2010, New York, NY
//                                         </Text>
//                                     </HStack>
//                                 </Box>
//                             </VStack>
//                         </Box>
//                         <Box>
//                             <Heading
//                                 size="lg"
//                                 color="blue.600"
//                                 mb={4}
//                                 fontWeight="bold"
//                                 fontSize="24px"
//                             >
//                                 Experience
//                             </Heading>

//                             <VStack spacing={6} align="stretch">
//                                 <Box>
//                                     <HStack justify="space-between" align="flex-start" mb={2}>
//                                         <VStack align="start" spacing={0}>
//                                             <Text fontWeight="bold" fontSize="16px" color="gray.800">
//                                                 Social Media Manager
//                                             </Text>
//                                             <Text fontSize="14px" color="gray.600">
//                                                 Dufour, Dubai, U.A.E.
//                                             </Text>
//                                         </VStack>
//                                         <Text fontSize="14px" color="gray.600" fontStyle="italic">
//                                             2015 - Ongoing
//                                         </Text>
//                                     </HStack>
//                                     <UnorderedList spacing={1} ml={4} mt={2}>
//                                         <ListItem fontSize="14px" color="gray.700">
//                                             Weekly writing of ~3000 words articles for high profile industry leaders.
//                                         </ListItem>
//                                         <ListItem fontSize="14px" color="gray.700">
//                                             Worked with social media channels with ~30000 followers.
//                                         </ListItem>
//                                         <ListItem fontSize="14px" color="gray.700">
//                                             Overseeing the output of 17 team members including Community Managers, Analysts and Designers.
//                                         </ListItem>
//                                     </UnorderedList>
//                                 </Box>
//                                 <Box>
//                                     <HStack justify="space-between" align="flex-start" mb={2}>
//                                         <VStack align="start" spacing={0}>
//                                             <Text fontWeight="bold" fontSize="16px" color="gray.800">
//                                                 Social Media Manager
//                                             </Text>
//                                             <Text fontSize="14px" color="gray.600">
//                                                 Herman LLC, New York, NY
//                                             </Text>
//                                         </VStack>
//                                         <Text fontSize="14px" color="gray.600" fontStyle="italic">
//                                             2011 - 2015
//                                         </Text>
//                                     </HStack>

//                                     <UnorderedList spacing={1} ml={4} mt={2}>
//                                         <ListItem fontSize="14px" color="gray.700">
//                                             Apply to events to expose the brands of my clients (4 events per month).
//                                         </ListItem>
//                                         <ListItem fontSize="14px" color="gray.700">
//                                             Increased Social Media followers and engagement by ~250% on average per client in the first 3 months of collaboration.
//                                         </ListItem>
//                                     </UnorderedList>
//                                 </Box>
//                                 <Box>
//                                     <HStack justify="space-between" align="flex-start" mb={2}>
//                                         <VStack align="start" spacing={0}>
//                                             <Text fontWeight="bold" fontSize="16px" color="gray.800">
//                                                 Social Media Specialist
//                                             </Text>
//                                             <Text fontSize="14px" color="gray.600">
//                                                 Schmeier, New York, NY
//                                             </Text>
//                                         </VStack>
//                                         <Text fontSize="14px" color="gray.600" fontStyle="italic">
//                                             2010 - 2011
//                                         </Text>
//                                     </HStack>

//                                     <UnorderedList spacing={1} ml={4} mt={2}>
//                                         <ListItem fontSize="14px" color="gray.700">
//                                             Apply to events to expose the brands of my clients (4 events per month).
//                                         </ListItem>
//                                     </UnorderedList>
//                                 </Box>

//                                 <Box>
//                                     <HStack justify="space-between" align="flex-start" mb={2}>
//                                         <VStack align="start" spacing={0}>
//                                             <Text fontWeight="bold" fontSize="16px" color="gray.800">
//                                                 Social Media Specialist
//                                             </Text>
//                                             <Text fontSize="14px" color="gray.600">
//                                                 Schmeier, New York, NY
//                                             </Text>
//                                         </VStack>
//                                         <Text fontSize="14px" color="gray.600" fontStyle="italic">
//                                             2010 - 2011
//                                         </Text>
//                                     </HStack>

//                                     <UnorderedList spacing={1} ml={4} mt={2}>
//                                         <ListItem fontSize="14px" color="gray.700">
//                                             Apply to events to expose the brands of my clients (4 events per month).
//                                         </ListItem>
//                                     </UnorderedList>
//                                 </Box>
//                             </VStack>
//                         </Box>

//                         <Box>
//                             <Heading
//                                 size="lg"
//                                 color="blue.600"
//                                 mb={4}
//                                 fontWeight="bold"
//                                 fontSize="24px"
//                             >
//                                 Volunteer Experience
//                             </Heading>

//                             <VStack spacing={6} align="stretch">
//                                 <Box>
//                                     <HStack justify="space-between" align="flex-start" mb={2}>
//                                         <VStack align="start" spacing={0}>
//                                             <Text fontWeight="bold" fontSize="16px" color="gray.800">
//                                                 LC President, AIESEC
//                                             </Text>
//                                             <Text fontSize="14px" color="gray.600">
//                                                 University of Sevilla
//                                             </Text>
//                                         </VStack>
//                                         <Text fontSize="14px" color="gray.600" fontStyle="italic">
//                                             2002-2006, 4 years
//                                         </Text>
//                                     </HStack>

//                                     <Text fontSize="14px" color="gray.700" mt={2}>
//                                         AIESEC is an international youth-run, non-governmental and not-for-profit organization that provides young world leadership development, cross-cultural and international, and volunteer exchange program experiences.
//                                     </Text>
//                                 </Box>

//                                 <Box>
//                                     <HStack justify="space-between" align="flex-start" mb={2}>
//                                         <VStack align="start" spacing={0}>
//                                             <Text fontWeight="bold" fontSize="16px" color="gray.800">
//                                                 Football team member, Cadiz FC
//                                             </Text>
//                                             <Text fontSize="14px" color="gray.600">
//                                                 Cadiz Football Club
//                                             </Text>
//                                         </VStack>
//                                         <Text fontSize="14px" color="gray.600" fontStyle="italic">
//                                             2006-2008, 2 years
//                                         </Text>
//                                     </HStack>

//                                     <Text fontSize="14px" color="gray.700" mt={2}>
//                                         Cadiz Club de Futbol, S.A.D., known simply as Cadiz, is a professional football club based in Cadiz, Andalusia, Spain.
//                                     </Text>
//                                 </Box>
//                             </VStack>
//                         </Box>
//                     </VStack>
//                 </Container>
//             </VStack>
//         </Flex>