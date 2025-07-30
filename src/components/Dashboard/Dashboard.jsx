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
import { useEffect, useState } from 'react'
import {
    FiMenu,
    FiStar,
    FiX
} from 'react-icons/fi'
import JobCreationPage from './Visa';
import SideMenu from './SideMenu';
import Team from './Team';
import CompanyPage from './Company/CompanyPage';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getUserDashboardData } from '../../handlers/user-dashboard/userDashboard';
import DashboardContent from './DashboardContent'
import ApplicantList from './Applicants/ApplicantList';

export default function TrainingDashboard() {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter()
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
        }
    }, [status])
    useEffect(() => {
        const fetchDashboard = async () => {
            if (!session?.user?.id) return;
            const data = await getUserDashboardData(session.user.id);
            setDashboardData(data);
        };

        fetchDashboard();
    }, [session]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Dashboard':
                return (
                    <Box>
                        <DashboardContent />
                    </Box>
                );
            case 'Visa':
                return (
                    <Box p={4}>
                        <JobCreationPage />
                    </Box>
                );
            case 'Applicants':
                return (
                    <Box p={4}>
                        <ApplicantList />
                    </Box>
                );
            case 'Companies':
                return (
                    <Box p={4}>
                        <CompanyPage />
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
                    <Team />
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
            <SideMenu toggleSidebar={toggleSidebar} setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} setActiveTab={setActiveTab} activeTab={activeTab} />

            {/* Main Content */}
            <Box flex={1}>
                <Box bg="white" py={{ base: 2, sm: 0 }} px={{ base: 4 }} borderBottom="1px" borderColor="gray.200">
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