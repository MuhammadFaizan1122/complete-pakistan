'use client'
import {
    Box,
    Flex,
    Text,
    VStack,
    HStack,
    Grid,
    Avatar,
    Button,
    Badge,
    Card,
    CardBody,
    Image,
    IconButton
} from '@chakra-ui/react'
import { useState } from 'react'
import {
    FiMenu,
    FiStar,
    FiX
} from 'react-icons/fi'

const CvDirectory = () => {
    const candidates = [
        {
            name: 'Miles, Esther',
            role: 'Electrician with 5 year of experience in UAE',
            matches: 2,
            avatar: '/Images/candidate-1.png',
            verified: true
        },
        {
            name: 'Darlene Robertson',
            role: 'Electrician with 5 year of experience in UAE',
            matches: 2,
            avatar: '/Images/candidate-2.png',
            verified: true
        },
        {
            name: 'Robert Fox',
            role: 'Electrician with 5 year of experience in UAE',
            matches: 2,
            avatar: '/Images/candidate-3.png',
            verified: true
        },
        {
            name: 'Bessie Cooper',
            role: 'Electrician with 5 year of experience in UAE',
            matches: 2,
            avatar: '/Images/candidate-4.png',
            verified: true
        },
        {
            name: 'Kathryn Murphy',
            role: 'Electrician with 5 year of experience in UAE',
            matches: 2,
            avatar: '/Images/candidate-5.png',
            verified: true
        },
        {
            name: 'Jane Cooper',
            role: 'Electrician with 5 year of experience in UAE',
            matches: 2,
            avatar: '/Images/candidate-1.png',
            verified: true
        }
    ]
    const tradeCenters = [
        {
            name: 'TEVTTA Karachi',
            description: 'Electrician with 5 year of experience in UAE',
            matches: 20,
            verified: true
        },
        {
            name: 'National Skills Cent...',
            description: 'Government approved training facility for constructions trades',
            matches: 20,
            verified: true
        },
        {
            name: 'National Skills Cent...',
            description: 'Electrician with 5 year of experience in UAE',
            matches: 20,
            verified: true
        },
        {
            name: 'TEVTTA Karachi',
            description: 'Electrician with 5 year of experience in UAE',
            matches: 20,
            verified: true
        },
        {
            name: 'National Skills Cent...',
            description: 'Government approved training facility for constructions trades',
            matches: 20,
            verified: true
        },
        {
            name: 'National Skills Cent...',
            description: 'Electrician with 5 year of experience in UAE',
            matches: 20,
            verified: true
        }
    ]
    return (
        <Box flex={1} maxW={'1440px'} mx={'auto'}>
            <Grid templateColumns="2fr" gap={6} p={4}>
                <VStack align="stretch" spacing={6} mb={12}>
                    <VStack align="start" spacing={2}>
                        <Text fontSize={{ base: '2xl', md: '32px' }} fontWeight="bold" color="black">
                            My CVs
                        </Text>
                        {/* <Text fontSize={{ base: 'lg', md: '20px' }} color="black">
                            Skilled workers who secured employment through Complete pakistan
                        </Text> */}
                    </VStack>

                    <Grid
                        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
                        gap={10}>
                        {candidates.map((candidate, index) => (
                            <Card key={index} bg="white" borderRadius="20px" overflow="hidden" h={'160px'}>
                                <CardBody p={{ base: 2, sm: 4 }} my={2}>
                                    <HStack spacing={4} align="center" justify={{ base: 'flex-start', sm: 'space-evenly' }}>
                                        <Avatar
                                            size={{ base: 'md', sm: 'lg' }}
                                            name={candidate.name}
                                            src={candidate.avatar}
                                        />
                                        <VStack spacing={3}>
                                            <VStack spacing={1} textAlign="left" align="start" maxW={'181px'}>
                                                <HStack>
                                                    <Text fontWeight="semibold" fontSize="20px">
                                                        {candidate.name}
                                                    </Text>

                                                </HStack>

                                                <Text fontSize="16" color="black" lineHeight="short">
                                                    {candidate.role}
                                                </Text>
                                            </VStack>

                                            <HStack spacing={1} color="#00956B" alignItems="center" w={'full'}>
                                                <Text fontWeight="bold" fontSize="16px">
                                                    {candidate.matches}
                                                </Text>
                                                <FiStar fill="currentColor" className='' />
                                                <Text fontSize="16px" fontWeight="medium" color={'#00956B'}>
                                                    Matches
                                                </Text>
                                                <VStack spacing={3} display={{ base: 'block', sm: 'none' }} ml={2}>
                                                    {candidate.verified && (
                                                        <Badge
                                                            borderRadius={'13px'}
                                                            px={'8px'}
                                                            py={'6px'}
                                                            bg={'#EBF5F4'}
                                                            color={'#00956B'}
                                                            fontSize={'12px'}
                                                            display="flex"
                                                            alignItems="center"
                                                            gap={1}
                                                        >
                                                            <Image src={'/Images/Icons/carbon_badge.png'} alt="icon" width={18} height={18} />
                                                            Verified
                                                        </Badge>
                                                    )}
                                                </VStack>
                                            </HStack>
                                        </VStack>
                                        <VStack spacing={3} display={{ base: 'none', sm: 'block' }}>
                                            {candidate.verified && (
                                                <Badge
                                                    borderRadius={'13px'}
                                                    px={'8px'}
                                                    py={'6px'}
                                                    bg={'#EBF5F4'}
                                                    color={'#00956B'}
                                                    fontSize={'12px'}
                                                    display="flex"
                                                    alignItems="center"
                                                    gap={1}
                                                >
                                                    <Image src={'/Images/Icons/carbon_badge.png'} alt="icon" width={18} height={18} />
                                                    Verified
                                                </Badge>
                                            )}
                                        </VStack>
                                    </HStack>
                                </CardBody>
                            </Card>
                        ))}
                    </Grid>
                </VStack>
                <VStack align="stretch" spacing={6}>
                    <VStack align="start" spacing={2}>
                        <Text fontSize={{ base: '2xl', md: '32px' }} fontWeight="bold" color="black">
                            Top Trade Test Centers
                        </Text>
                        <Text fontSize={{ base: 'lg', md: '20px' }} color="black">
                            Centers that provide quality training and certifications recognized in Gulf countries
                        </Text>
                    </VStack>
                    <Grid
                        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
                        gap={10}
                    >
                        {tradeCenters.map((center, index) => (
                            <Card key={index} bg="white" borderRadius="20px" overflow="hidden" h={'160px'}>
                                <CardBody p={{ base: 3, sm: 6 }}>
                                    <VStack align="start" spacing={4} h="full">
                                        <HStack justify="space-between" w="full">
                                            <Text fontWeight="bold" fontSize={{ base: '20px', sm: '24px' }} color="black">
                                                {center.name}
                                            </Text>

                                            {center.verified && (
                                                <Badge
                                                    borderRadius={'13px'}
                                                    px={'8px'}
                                                    py={'6px'}
                                                    bg={'#EBF5F4'}
                                                    color={'#00956B'}
                                                    fontSize={'12px'}
                                                    display="flex"
                                                    alignItems="center"
                                                    gap={1}
                                                >
                                                    <Image src={'/Images/Icons/carbon_badge.png'} alt="icon" width={18} height={18} />
                                                    Verified
                                                </Badge>
                                            )}
                                        </HStack>

                                        <Text fontSize="16px" color="black" lineHeight="relaxed" flex={1}>
                                            {center.description}
                                        </Text>

                                        <HStack spacing={1} color="#00956B" alignItems="start" w={'full'}>
                                            <Text fontWeight="bold" fontSize="16px">
                                                {center.matches}
                                            </Text>
                                            <FiStar fill="currentColor" className='mt-[3px]' />
                                            <Text fontSize="16px" fontWeight="medium" color={'#00956B'}>
                                                Matches
                                            </Text>
                                        </HStack>
                                    </VStack>
                                </CardBody>
                            </Card>
                        ))}
                    </Grid>
                </VStack>
            </Grid>
        </Box>

    )
}

export default CvDirectory