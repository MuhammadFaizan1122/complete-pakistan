'use client'
import {
    Box,
    VStack,
    Button,
    Image,
    IconButton
} from '@chakra-ui/react'
import {
    FiX
} from 'react-icons/fi'

const SideMenu = ({ toggleSidebar, setIsSidebarOpen, isSidebarOpen, setActiveTab, activeTab }) => {

    const sidebarItems = [
        { icon: '/Images/Icons/home.png', label: 'Dashboard' },
        { icon: '/Images/Icons/dashboard-icon-2.png', label: 'Companies' },
        { icon: '/Images/Icons/dashboard-icon-1.png', label: 'Visa' },
        { icon: '/Images/Icons/dashboard-icon-8.png', label: 'Applicants' },
        { icon: '/Images/Icons/dashboard-icon-5.png', label: 'Interview' },
        { icon: '/Images/Icons/dashboard-icon-3.png', label: 'Protector' },
        { icon: '/Images/Icons/dashboard-icon-4.png', label: 'CVs' },
        { icon: '/Images/Icons/dashboard-icon-6.png', label: 'Self Selection' },
        { icon: '/Images/Icons/dashboard-icon-7.png', label: 'Our Team' },
        { icon: '/Images/Icons/dashboard-icon-8.png', label: 'Accounts' },
        { icon: '/Images/Icons/dashboard-icon-9.png', label: 'Information' }
    ];

    return (
        <div>
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
                h={{ base: '100vh', md: '100%' }}
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
            <Box w="250px" bg="white" borderRight="1px" borderColor="gray.200" p={4} display={{ base: 'none', md: 'flex' }} minH="100%">
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
        </div>
    )
}

export default SideMenu