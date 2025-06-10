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
    Image
} from '@chakra-ui/react'
import {
    FiStar
} from 'react-icons/fi'

export default function TrainingDashboard() {
    const sidebarItems = [
        { icon: '/Images/Icons/home.png', label: 'Dashboard', active: true },
        { icon: '/Images/Icons/dashboard-icon-1.png', label: 'Visa' },
        { icon: '/Images/Icons/dashboard-icon-2.png', label: 'Companies' },
        { icon: '/Images/Icons/dashboard-icon-3.png', label: 'Protector' },
        { icon: '/Images/Icons/dashboard-icon-4.png', label: 'CVs' },
        { icon: '/Images/Icons/dashboard-icon-5.png', label: 'Interview' },
        { icon: '/Images/Icons/dashboard-icon-6.png', label: 'Self Selection' },
        { icon: '/Images/Icons/dashboard-icon-7.png', label: 'Our Team' },
        { icon: '/Images/Icons/dashboard-icon-8.png', label: 'Accounts' },
        { icon: '/Images/Icons/dashboard-icon-9.png', label: 'Information' }
    ]
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
        <Flex bg="#EBF5F4">
            <Box w="250px" bg="white" borderRight="1px" borderColor="gray.200" p={4}>
                <VStack align="stretch" spacing={2}>
                    {sidebarItems.map((item, index) => (
                        <Button
                            key={index}
                            leftIcon={
                                <Box w={30} h={30} display="flex" alignItems="center" justifyContent="center" rounded={'12px'} bg={item.active ? "white " : "#EBF5F4"}>
                                    <Image src={item.icon} alt="icon" width={15} height={15} />
                                </Box>
                            }
                            variant={item.active ? "solid" : "ghost"}
                            bg={item.active ? "#309689" : ""}
                            color={item.active ? "white" : "gray.700"}
                            justifyContent="flex-start"
                            rounded="8px"
                            size="lg"
                            fontWeight="normal"
                        >
                            {item.label}
                        </Button>
                    ))}
                </VStack>
            </Box>

            <Box flex={1} >
                <Box bg="white" p={4} borderBottom="1px" borderColor="gray.200">
                    <Flex justify="space-between" align="center">
                        <Text fontSize="2xl" fontWeight="bold">Dashboard</Text>
                        <HStack>
                        </HStack>
                    </Flex>
                </Box>
                <Box
                    backgroundImage="linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/Images/dashboard-banner.jpg')"
                    backgroundSize="cover"
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                    color="white"
                    p={8}
                    m={4}
                    height={'300px'}
                    borderRadius="xl"
                    position="relative"
                    overflow="hidden"
                >
                    <VStack position="absolute" bottom={10} left={10} align="baseline" spacing={2} >
                        <Text fontSize="36px" fontWeight="medium">
                            Hazrat Karmanwala Trade Test & Training Center
                        </Text>
                        <Text fontSize="20px" opacity={0.9} fontWeight="medium">
                            Serving Talent to the World Since 2010
                        </Text>
                    </VStack>
                    <HStack position="absolute" bottom={10} right={10}>
                        <Button size="md" variant="solid" bg={'white'} borderRadius={'12px'}>
                            <Image src={'/Images/Icons/clarity_license-solid.png'} alt="icon" width={18} height={18} mr={2} />
                            License #4568
                        </Button>
                        <Button size="md" bg="#00956B" color="white" borderRadius={'12px'}>
                            Verified Agency
                            <Image src={'/Images/Icons/check.png'} alt="icon" width={18} height={18} ml={2} />
                        </Button>
                    </HStack>
                </Box>

                <Grid templateColumns="repeat(4, 1fr)" gap={4} p={4}>
                    <Card rounded={'15px'}>
                        <CardBody display='flex' justifyContent='space-between' alignItems='center'>
                            <Box>
                                <HStack>
                                    <Text fontSize="12px" color="#AFAFAF" fontWeight={'bold'}>This month</Text>
                                </HStack>
                                <VStack align="start" spacing={2}>
                                    <HStack>
                                        <Text fontWeight={'bold'} fontSize="24px" color="black">Visas Available</Text>
                                    </HStack>
                                    <Text fontWeight={'bold'} fontSize="36px" color="black">72</Text>
                                </VStack>
                            </Box>
                            <Box>
                                <Image src={'/Images/Icons/dashboard-icon-10.png'} alt="icon" width={55} height={55} />
                            </Box>
                        </CardBody>
                    </Card>

                    <Card rounded={'15px'}>
                        <CardBody display='flex' justifyContent='space-between' alignItems='center'>
                            <Box>
                                <HStack>
                                    <Text fontSize="12px" color="#AFAFAF" fontWeight={'bold'}>This month</Text>
                                </HStack>
                                <VStack align="start" spacing={2}>
                                    <HStack>
                                        <Text fontWeight={'bold'} fontSize="24px" color="black">Partner Companies</Text>
                                    </HStack>
                                    <Text fontWeight={'bold'} fontSize="36px" color="black">400</Text>
                                </VStack>
                            </Box>
                            <Box>
                                <Image src={'/Images/Icons/dashboard-icon-11.png'} alt="icon" width={55} height={55} />
                            </Box>
                        </CardBody>
                    </Card>

                    <Card rounded={'15px'}>
                        <CardBody display='flex' justifyContent='space-between' alignItems='center'>
                            <Box>                            <HStack>
                                <Text fontSize="12px" color="#AFAFAF" fontWeight={'bold'}>This month</Text>
                            </HStack>
                                <VStack align="start" spacing={2}>
                                    <HStack>
                                        <Text fontWeight={'bold'} fontSize="24px" color="black">CVs in Database</Text>
                                    </HStack>
                                    <Text fontWeight={'bold'} fontSize="36px" color="black">150+</Text>
                                </VStack>
                            </Box>
                            <Box>
                                <Image src={'/Images/Icons/dashboard-icon-12.png'} alt="icon" width={55} height={55} />
                            </Box>
                        </CardBody>
                    </Card>

                    <Card rounded={'15px'}>
                        <CardBody display='flex' justifyContent='space-between' alignItems='center'>
                            <Box>
                                <HStack>
                                    <Text fontSize="12px" color="#AFAFAF" fontWeight={'bold'}>This month</Text>
                                </HStack>
                                <VStack align="start" spacing={2}>
                                    <HStack>
                                        <Text fontWeight={'bold'} fontSize="24px" color="black">Team Members</Text>
                                    </HStack>
                                    <Text fontWeight={'bold'} fontSize="36px" color="black">120</Text>
                                </VStack>
                            </Box>
                            <Box>
                                <Image src={'/Images/Icons/dashboard-icon-13.png'} alt="icon" width={55} height={55} />
                            </Box>
                        </CardBody>
                    </Card>
                </Grid>

                <Grid templateColumns="2fr" gap={6} p={4}>
                    <VStack align="stretch" spacing={6} mb={12}>
                        <VStack align="start" spacing={2}>
                            <Text fontSize="32px" fontWeight="bold" color="black">
                                Top Candidates
                            </Text>
                            <Text fontSize="20px" color="black">
                                Skilled workers who secured employment through Complete pakistan
                            </Text>
                        </VStack>

                        <Grid templateColumns="repeat(3, 1fr)" gap={10}>
                            {candidates.map((candidate, index) => (
                                <Card key={index} bg="white" borderRadius="20px" overflow="hidden" h={'160px'}>
                                    <CardBody p={4} my={2}>
                                        <HStack spacing={4} align="center" justify="space-evenly">
                                            <Avatar
                                                size="lg"
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

                                                <HStack spacing={1} color="#00956B" alignItems="start" w={'full'}>
                                                    <Text fontWeight="bold" fontSize="16px">
                                                        {candidate.matches}
                                                    </Text>
                                                    <FiStar fill="currentColor" className='mt-[3px]' />
                                                    <Text fontSize="16px" fontWeight="medium" color={'#00956B'}>
                                                        Matches
                                                    </Text>
                                                </HStack>
                                            </VStack>
                                            <VStack spacing={3}>
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
                            <Text fontSize="32px" fontWeight="bold" color="black">
                                Top Trade Test Centers
                            </Text>
                            <Text fontSize="20px" color="black">
                                Centers that provide quality training and certifications recognized in Gulf countries
                            </Text>
                        </VStack>
                        <Grid templateColumns="repeat(3, 1fr)" gap={10}>
                            {tradeCenters.map((center, index) => (
                                <Card key={index} bg="white" borderRadius="20px" overflow="hidden" h={'160px'}>
                                    <CardBody p={6}>
                                        <VStack align="start" spacing={4} h="full">
                                            <HStack justify="space-between" w="full">
                                                <Text fontWeight="bold" fontSize="24px" color="black">
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
        </Flex >
    )
}