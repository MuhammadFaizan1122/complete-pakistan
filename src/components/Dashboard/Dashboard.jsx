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
    Divider,
    Image
} from '@chakra-ui/react'
import {
    FiBookOpen,
    FiMapPin,
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
            name: 'Miss. Esther',
            experience: '2 years',
            location: 'Karachi',
            rating: 4.5,
            skills: ['Cooking', 'Cleaning'],
            avatar: '/api/placeholder/40/40',
            status: 'Active'
        },
        {
            name: 'Dolores Robertson',
            experience: '3 years',
            location: 'Lahore',
            rating: 4.8,
            skills: ['Housekeeping', 'Childcare'],
            avatar: '/api/placeholder/40/40',
            status: 'Active'
        },
        {
            name: 'Robert Fox',
            experience: '4 years',
            location: 'Islamabad',
            rating: 4.2,
            skills: ['Driving', 'Maintenance'],
            avatar: '/api/placeholder/40/40',
            status: 'Verified'
        },
        {
            name: 'Bessie Cooper',
            experience: '1 year',
            location: 'Faisalabad',
            rating: 4.0,
            skills: ['Cooking', 'Cleaning'],
            avatar: '/api/placeholder/40/40',
            status: 'Active'
        },
        {
            name: 'Kathryn Murphy',
            experience: '2 years',
            location: 'Multan',
            rating: 4.6,
            skills: ['Childcare', 'Tutoring'],
            avatar: '/api/placeholder/40/40',
            status: 'Active'
        },
        {
            name: 'Jane Cooper',
            experience: '5 years',
            location: 'Rawalpindi',
            rating: 4.9,
            skills: ['Management', 'Training'],
            avatar: '/api/placeholder/40/40',
            status: 'Verified'
        }
    ]

    const trainingCenters = [
        {
            name: 'TEVTTA Karachi',
            type: 'Government Certified',
            location: 'Karachi',
            courses: '20+',
            rating: 4.5,
            status: 'Active'
        },
        {
            name: 'National Skills Center',
            type: 'Private Institution',
            location: 'Lahore',
            courses: '25+',
            rating: 4.7,
            status: 'Active'
        },
        {
            name: 'National Skills Center',
            type: 'Hybrid Programs',
            location: 'Islamabad',
            courses: '30+',
            rating: 4.8,
            status: 'Active'
        },
        {
            name: 'TEVTTA Karachi',
            type: 'Technical Training',
            location: 'Karachi',
            courses: '22+',
            rating: 4.4,
            status: 'Active'
        },
        {
            name: 'National Skills Center',
            type: 'Vocational Training',
            location: 'Lahore',
            courses: '28+',
            rating: 4.6,
            status: 'Active'
        },
        {
            name: 'National Skills Center',
            type: 'Professional Development',
            location: 'Islamabad',
            courses: '35+',
            rating: 4.9,
            status: 'Active'
        }
    ]

    return (
        <Flex h="100vh" bg="#EBF5F4">
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

            <Box flex={1} overflow="auto">
                {/* Header */}
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
                    <VStack align="start" spacing={2}>
                        <Text fontSize="3xl" fontWeight="bold">
                            Hazrat Karmanwala Trade Test & Training Center
                        </Text>
                        <Text fontSize="lg" opacity={0.9}>
                            Serving Talent to the World Since 2010
                        </Text>
                    </VStack>
                    <HStack position="absolute" top={4} right={4}>
                        <Button size="sm" variant="outline" colorScheme="whiteAlpha">
                            Upload a file
                        </Button>
                        <Button size="sm" bg="white" color="#309689">
                            Contact Support
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

                {/* <Grid templateColumns="1fr 1fr" gap={6} p={4}>
                    <Card>
                        <CardBody>
                            <Text fontSize="xl" fontWeight="bold" mb={4}>Top Candidates</Text>
                            <Text fontSize="sm" color="gray.600" mb={4}>
                                Select best talent who secured employment through Complete pakistan
                            </Text>

                            <VStack spacing={4} align="stretch">
                                {candidates.map((candidate, index) => (
                                    <Box key={index}>
                                        <HStack justify="space-between">
                                            <HStack>
                                                <Avatar size="sm" name={candidate.name} />
                                                <VStack align="start" spacing={0}>
                                                    <Text fontWeight="semibold" fontSize="sm">{candidate.name}</Text>
                                                    <Text fontSize="xs" color="gray.500">
                                                        Experience with {candidate.experience} • {candidate.location}
                                                    </Text>
                                                    <HStack spacing={1}>
                                                        <FiStar color="orange" size={12} />
                                                        <Text fontSize="xs">{candidate.rating}</Text>
                                                        <Text fontSize="xs" color="gray.500">
                                                            {candidate.skills.join(', ')}
                                                        </Text>
                                                    </HStack>
                                                </VStack>
                                            </HStack>
                                            <Badge
                                                colorScheme={candidate.status === 'Verified' ? 'green' : 'blue'}
                                                size="sm"
                                            >
                                                {candidate.status}
                                            </Badge>
                                        </HStack>
                                        {index < candidates.length - 1 && <Divider mt={4} />}
                                    </Box>
                                ))}
                            </VStack>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody>
                            <Text fontSize="xl" fontWeight="bold" mb={4}>Top Trade Test Centers</Text>
                            <Text fontSize="sm" color="gray.600" mb={4}>
                                Centers that provide quality training and certifications recognized in Gulf countries
                            </Text>

                            <VStack spacing={4} align="stretch">
                                {trainingCenters.map((center, index) => (
                                    <Box key={index}>
                                        <HStack justify="space-between">
                                            <VStack align="start" spacing={0}>
                                                <Text fontWeight="semibold" fontSize="sm">{center.name}</Text>
                                                <Text fontSize="xs" color="gray.500">{center.type}</Text>
                                                <HStack spacing={2}>
                                                    <HStack spacing={1}>
                                                        <FiMapPin size={12} />
                                                        <Text fontSize="xs">{center.location}</Text>
                                                    </HStack>
                                                    <HStack spacing={1}>
                                                        <FiBookOpen size={12} />
                                                        <Text fontSize="xs">{center.courses} Courses</Text>
                                                    </HStack>
                                                </HStack>
                                            </VStack>
                                            <VStack align="end" spacing={1}>
                                                <Badge
                                                    colorScheme={center.status === 'Active' ? 'green' : 'gray'}
                                                    size="sm"
                                                >
                                                    {center.status}
                                                </Badge>
                                                <HStack spacing={1}>
                                                    <FiStar color="orange" size={12} />
                                                    <Text fontSize="xs">{center.rating}</Text>
                                                </HStack>
                                            </VStack>
                                        </HStack>
                                        {index < trainingCenters.length - 1 && <Divider mt={4} />}
                                    </Box>
                                ))}
                            </VStack>
                        </CardBody>
                    </Card>
                </Grid> */}
            </Box>
        </Flex >
    )
}