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

export default function TrainingDashboard() {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const sidebarItems = [
        { icon: '/Images/Icons/home.png', label: 'Dashboard' },
        { icon: '/Images/Icons/dashboard-icon-1.png', label: 'Visa' },
        { icon: '/Images/Icons/dashboard-icon-2.png', label: 'Companies' },
        { icon: '/Images/Icons/dashboard-icon-3.png', label: 'Protector' },
        { icon: '/Images/Icons/dashboard-icon-4.png', label: 'CVs' },
        { icon: '/Images/Icons/dashboard-icon-5.png', label: 'Interview' },
        { icon: '/Images/Icons/dashboard-icon-6.png', label: 'Self Selection' },
        { icon: '/Images/Icons/dashboard-icon-7.png', label: 'Our Team' },
        { icon: '/Images/Icons/dashboard-icon-8.png', label: 'Accounts' },
        { icon: '/Images/Icons/dashboard-icon-9.png', label: 'Information' }
    ];

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
    ];

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
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Dashboard':
                return (
                    <>
                        <Box
                            backgroundImage="linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/Images/dashboard-banner.jpg')"
                            backgroundSize="cover"
                            backgroundPosition="center"
                            backgroundRepeat="no-repeat"
                            color="white"
                            p={{ base: 2, md: 8 }}
                            m={4}
                            height={{ base: '200px', md: '300px' }}
                            borderRadius="xl"
                            position="relative"
                            overflow="hidden"
                        >
                            <VStack position="absolute" top={{ base: 4, md: 10 }} left={{ base: 4, md: 10 }} align="baseline" spacing={2}>
                                <Text fontSize={{ base: '24px', md: '36px' }} fontWeight="medium">
                                    Hazrat Karmanwala Trade Test & Training Center
                                </Text>
                                <Text fontSize={{ base: '16px', md: '20px' }} opacity={0.9} fontWeight="medium">
                                    Serving Talent to the World Since 2010
                                </Text>
                            </VStack>
                            <HStack position="absolute" bottom={{ base: 4, md: 10 }} right={{ base: 2, md: 10 }}>
                                <Button size={{ base: 'sm', md: 'md' }} variant="solid" bg={'white'} borderRadius={'12px'}>
                                    <Image src={'/Images/Icons/clarity_license-solid.png'} alt="icon" width={{ base: 15, md: 18 }} height={{ base: 15, md: 18 }} mr={2} />
                                    License #4568
                                </Button>
                                <Button size={{ base: 'sm', md: 'md' }} bg="#00956B" color="white" borderRadius={'12px'}>
                                    Verified Agency
                                    <Image src={'/Images/Icons/check.png'} alt="icon" width={{ base: 15, md: 18 }} height={{ base: 15, md: 18 }} ml={2} />
                                </Button>
                            </HStack>
                        </Box>

                        <Grid
                            templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
                            gap={4}
                            p={4}
                        >
                            <Card rounded={'15px'}>
                                <CardBody display='flex' justifyContent='space-between' alignItems='center'>
                                    <Box>
                                        <HStack>
                                            <Text fontSize="12px" color="#AFAFAF" fontWeight={'bold'}>This month</Text>
                                        </HStack>
                                        <VStack align="start" spacing={2}>
                                            <HStack>
                                                <Text fontWeight={'bold'} fontSize={{ base: 'xl', md: '24px' }} color="black">Visas Available</Text>
                                            </HStack>
                                            <Text fontWeight={'bold'} fontSize={{ base: '2xl', md: '36px' }} color="black">72</Text>
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
                                                <Text fontWeight={'bold'} fontSize={{ base: 'xl', md: '24px' }} color="black">Partner Companies</Text>
                                            </HStack>
                                            <Text fontWeight={'bold'} fontSize={{ base: '2xl', md: '36px' }} color="black">400</Text>
                                        </VStack>
                                    </Box>
                                    <Box>
                                        <Image src={'/Images/Icons/dashboard-icon-11.png'} alt="icon" width={55} height={55} />
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
                                                <Text fontWeight={'bold'} fontSize={{ base: 'xl', md: '24px' }} color="black">CVs in Database</Text>
                                            </HStack>
                                            <Text fontWeight={'bold'} fontSize={{ base: '2xl', md: '36px' }} color="black">150+</Text>
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
                                                <Text fontWeight={'bold'} fontSize={{ base: 'xl', md: '24px' }} color="black">Team Members</Text>
                                            </HStack>
                                            <Text fontWeight={'bold'} fontSize={{ base: '2xl', md: '36px' }} color="black">120</Text>
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
                                    <Text fontSize={{ base: '2xl', md: '32px' }} fontWeight="bold" color="black">
                                        Top Candidates
                                    </Text>
                                    <Text fontSize={{ base: 'lg', md: '20px' }} color="black">
                                        Skilled workers who secured employment through Complete Pakistan
                                    </Text>
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
                                                            <FiStar fill="currentColor" />
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
                    </>
                );
            case 'Visa':
                return (
                    <Box p={4}>
                        <Text fontSize={{ base: '2xl', md: '32px' }} fontWeight="bold" color="black" mb={4}>
                            Visa Management
                        </Text>
                        <Card rounded="lg">
                            <CardBody>
                                <VStack align="start" spacing={4}>
                                    <Text fontSize="lg">Manage visa applications and statuses.</Text>
                                    <Button bg="#309689" color="#fff" >View Visa Applications</Button>
                                </VStack>
                            </CardBody>
                        </Card>
                    </Box>
                );
            case 'Companies':
                return (
                    <Box p={4}>
                        <Text fontSize={{ base: '2xl', md: '32px' }} fontWeight="bold" color="black" mb={4}>
                            Partner Companies
                        </Text>
                        <Card rounded="lg">
                            <CardBody>
                                <VStack align="start" spacing={4}>
                                    <Text fontSize="lg">List of partner companies and collaboration details.</Text>
                                    <Button bg="#309689" color="#fff" >View Companies</Button>
                                </VStack>
                            </CardBody>
                        </Card>
                    </Box>
                );
            case 'Protector':
                return (
                    <Box p={4}>
                        <Text fontSize={{ base: '2xl', md: '32px' }} fontWeight="bold" color="black" mb={4}>
                            Protector Services
                        </Text>
                        <Card rounded="lg">
                            <CardBody>
                                <VStack align="start" spacing={4}>
                                    <Text fontSize="lg">Manage protector services for employees.</Text>
                                    <Button bg="#309689" color="#fff" >View Services</Button>
                                </VStack>
                            </CardBody>
                        </Card>
                    </Box>
                );
            case 'CVs':
                return (
                    <Box p={4}>
                        <Text fontSize={{ base: '2xl', md: '32px' }} fontWeight="bold" color="black" mb={4}>
                            CV Database
                        </Text>
                        <Card rounded="lg">
                            <CardBody>
                                <VStack align="start" spacing={4}>
                                    <Text fontSize="lg">Browse and manage candidate CVs.</Text>
                                    <Button bg="#309689" color="#fff" >View CVs</Button>
                                </VStack>
                            </CardBody>
                        </Card>
                    </Box>
                );
            case 'Interview':
                return (
                    <Box p={4}>
                        <Text fontSize={{ base: '2xl', md: '32px' }} fontWeight="bold" color="black" mb={4}>
                            Interview Scheduling
                        </Text>
                        <Card rounded="lg">
                            <CardBody>
                                <VStack align="start" spacing={4}>
                                    <Text fontSize="lg">Schedule and track candidate interviews.</Text>
                                    <Button bg="#309689" color="#fff" >View Interviews</Button>
                                </VStack>
                            </CardBody>
                        </Card>
                    </Box>
                );
            case 'Self Selection':
                return (
                    <Box p={4}>
                        <Text fontSize={{ base: '2xl', md: '32px' }} fontWeight="bold" color="black" mb={4}>
                            Self Selection
                        </Text>
                        <Card rounded="lg">
                            <CardBody>
                                <VStack align="start" spacing={4}>
                                    <Text fontSize="lg">Manage self-selection processes.</Text>
                                    <Button bg="#309689" color="#fff" >View Selection</Button>
                                </VStack>
                            </CardBody>
                        </Card>
                    </Box>
                );
            case 'Our Team':
                return (
                    <Box p={4}>
                        <Text fontSize={{ base: '2xl', md: '32px' }} fontWeight="bold" color="black" mb={4}>
                            Our Team
                        </Text>
                        <Card rounded="lg">
                            <CardBody>
                                <VStack align="start" spacing={4}>
                                    <Text fontSize="lg">View team members and roles.</Text>
                                    <Button bg="#309689" color="#fff" >View Team</Button>
                                </VStack>
                            </CardBody>
                        </Card>
                    </Box>
                );
            case 'Accounts':
                return (
                    <Box p={4}>
                        <Text fontSize={{ base: '2xl', md: '32px' }} fontWeight="bold" color="black" mb={4}>
                            Accounts
                        </Text>
                        <Card rounded="lg">
                            <CardBody>
                                <VStack align="start" spacing={4}>
                                    <Text fontSize="lg">Manage financial accounts and transactions.</Text>
                                    <Button bg="#309689" color="#fff" >View Accounts</Button>
                                </VStack>
                            </CardBody>
                        </Card>
                    </Box>
                );
            case 'Information':
                return (
                    <Box p={4}>
                        <Text fontSize={{ base: '2xl', md: '32px' }} fontWeight="bold" color="black" mb={4}>
                            Information
                        </Text>
                        <Card rounded="lg">
                            <CardBody>
                                <VStack align="start" spacing={4}>
                                    <Text fontSize="lg">Access general agency information and resources.</Text>
                                    <Button bg="#309689" color="#fff" >View Information</Button>
                                </VStack>
                            </CardBody>
                        </Card>
                    </Box>
                );
            default:
                return <Text>Content not available.</Text>;
        }
    };

    return (
        <Flex bg="#EBF5F4" minH="100vh">
            {/* Sidebar for Mobile */}
            <Box
                w={{ base: 'full', md: '250px' }}
                bg="white"
                borderRight={{ md: '1px' }}
                borderColor="gray.200"
                p={4}
                position={{ base: 'fixed', md: 'relative' }}
                top={0}
                left={0}
                zIndex={10}
                h={{ base: '100vh', md: 'auto' }}
                transform={{ base: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)', md: 'none' }}
                transition="transform 0.3s ease-in-out"
                display={{ base: isSidebarOpen ? 'block' : 'none', md: 'none' }}
            >
                <VStack align="stretch" spacing={2}>
                    <Box display={{ base: 'block', md: 'none' }} p={2}>
                        <IconButton
                            icon={<FiX />}
                            onClick={toggleSidebar}
                            variant="ghost"
                            aria-label="Close sidebar"
                            size="lg"
                        />
                    </Box>
                    {sidebarItems.map((item, index) => (
                        <Button
                            key={index}
                            leftIcon={
                                <Box
                                    w={10}
                                    h={10}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    rounded={'12px'}
                                    bg={item.label === activeTab ? 'white' : '#EBF5F4'}
                                >
                                    <Image
                                        src={item.icon}
                                        alt={item.label}
                                        width={15}
                                        height={15}
                                    />
                                </Box>
                            }
                            variant={item.label === activeTab ? 'solid' : 'ghost'}
                            bg={item.label === activeTab ? '#309689' : ''}
                            color={item.label === activeTab ? 'white' : 'gray.700'}
                            justifyContent="flex-start"
                            rounded="8px"
                            size="lg"
                            fontWeight="normal"
                            fontSize={{ base: 'md', md: 'lg' }}
                            onClick={() => {
                                setActiveTab(item.label);
                                setIsSidebarOpen(false);
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </VStack>
            </Box>

            {/* Sidebar for Desktop */}
            <Box w="250px" bg="white" borderRight="1px" borderColor="gray.200" p={4} display={{ base: 'none', md: 'block' }}>
                <VStack align="stretch" spacing={2}>
                    {sidebarItems.map((item, index) => (
                        <Button
                            key={index}
                            leftIcon={
                                <Box w={30} h={30} display="flex" alignItems="center" justifyContent="center" rounded={'12px'} bg={item.label === activeTab ? "white" : "#EBF5F4"}>
                                    <Image src={item.icon} alt={item.label} width={15} height={15} />
                                </Box>
                            }
                            variant={item.label === activeTab ? "solid" : "ghost"}
                            bg={item.label === activeTab ? "#309689" : ""}
                            color={item.label === activeTab ? "white" : "gray.700"}
                            justifyContent="flex-start"
                            rounded="8px"
                            size="lg"
                            fontWeight="normal"
                            onClick={() => setActiveTab(item.label)}
                        >
                            {item.label}
                        </Button>
                    ))}
                </VStack>
            </Box>

            {/* Main Content */}
            <Box flex={1}>
                <Box bg="white" p={4} borderBottom="1px" borderColor="gray.200">
                    <Flex justify="space-between" align="center">
                        <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold">{activeTab}</Text>
                        <HStack>
                            <IconButton
                                icon={<FiMenu />}
                                onClick={toggleSidebar}
                                variant="outline"
                                aria-label="Open sidebar"
                                size="lg"
                                display={{ base: 'flex', md: 'none' }}
                            />
                        </HStack>
                    </Flex>
                </Box>
                {renderContent()}
            </Box>
        </Flex>
    );
}