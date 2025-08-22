'use client'
import { Box, Heading, Text, Button, SimpleGrid, Icon, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaShieldAlt, FaCheck, FaFileContract, FaUserFriends, FaLock, FaMedkit } from "react-icons/fa";
import { FiCreditCard, FiDollarSign, FiEye, FiFileText } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { LuUserCheck } from "react-icons/lu";

const tips = [
    {
        icon: LuUserCheck,
        bg_color: 'green.100',
        heading: "Verify Credentials",
        description: 'Always check the license and registration of recruitment agencies with the Ministry of Overseas Pakistanis.'
    },
    {
        icon: FiDollarSign,
        bg_color: 'yellow.100',
        heading: "Avoid Upfront Payments",
        description: `Legetimate employers don't ask for money for job offers. Be wary of any requests for payment.`
    },
    {
        icon: FiFileText,
        bg_color: 'gray.100',
        heading: "Check Visa Authenticity",
        description: 'Verify your visa through the official portal of the destination country before making any payments.'
    },
    {
        icon: IoCallOutline,
        bg_color: 'green.100',
        heading: "Direct Communication",
        description: 'Insist on speaking directly with the overseas employer to confirm job details.'
    },
    {
        icon: FiFileText,
        bg_color: 'yellow.100',
        heading: "Read Contracts Carefully",
        description: `Never sign blank contracts or documents you don't fully understand.`
    },
    {
        icon: FiEye,
        bg_color: 'gray.100',
        heading: "Check References",
        description: 'Ask for and contact previous candidates who were placed by the agency.'
    },
    {
        icon: FiCreditCard,
        bg_color: 'green.100',
        heading: "Payment Safety",
        description: 'Use Secure payment methods and never share financial details over unsecured channels.'
    },
    {
        icon: AiOutlineExclamationCircle,
        bg_color: 'yellow.100',
        heading: "Medical Expirey Alert",
        description: 'Ensure agent take responsibility for timely medical processing to avoid expiry issues.'
    },
];

const FraudAlert = () => {
    return (
        <Box
            py={{ base: 4, md: 10 }}
            px={{ base: 2, md: 4 }}
            textAlign="center"
            position="relative"
            overflow="hidden"
        >
            {/* Hero Area */}
            <Box
                maxW="1440px"
                mx={'auto'}
            >
                <Flex
                    flexDirection={{ base: 'column-reverse', md: 'row' }}
                    mb={{ base: 10, md: 20 }}
                    justify={{ base: 'center', md: 'space-between' }}
                >
                    <Box textAlign={{ base: 'center', md: 'left' }}>
                        <Text
                            color="#ff7b00"
                            fontWeight="bold"
                            mb={{ base: 2, md: 2 }}
                            fontSize={{ base: 'sm', md: 'inherit' }}
                        >
                            FRAUD ALERT
                        </Text>
                        <Heading
                            as="h1"
                            size={{ base: 'lg', md: '2xl' }}
                            color="gray.800"
                            mb={{ base: 3, md: 4 }}
                        >
                            Stay Safe From <span className="text-[#ff7b00]">Fraud</span>
                        </Heading>
                        <Text
                            color="gray.600"
                            maxW={{ base: '100%', md: '600px' }}
                            mx="auto"
                            mb={{ base: 4, md: 6 }}
                            fontSize={{ base: 'sm', md: 'inherit' }}
                        >
                            Protect yourself from job scams, visa fraud, payment fraud, and more. Learn essential safety measures and get help when you need it most.
                        </Text>
                        <Flex
                            direction={{ base: 'column', md: 'row' }}
                            gap={{ base: 2, md: 4 }}
                            mb={{ base: 6, md: 0 }}
                        >
                            <Button colorScheme="blue" size={{ base: 'md', md: 'lg' }} mb={{ base: 2, md: 0 }}>
                                Learn Safety Tips
                            </Button>
                            <Button variant="outline" colorScheme="blue" size={{ base: 'md', md: 'lg' }}>
                                Verify Credentials
                            </Button>
                        </Flex>
                        {/* Stats */}
                        <Box
                            my={{ base: 6, md: 10 }}
                            display="flex"
                            gap={{ base: 4, md: 8 }}
                            flexDirection={{ base: 'column', md: 'row' }}
                            alignItems={{ base: 'center', md: 'flex-start' }}
                        >
                            <Box>
                                <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color="blue.500">
                                    50K+
                                </Text>
                                <Text>People Protected</Text>
                            </Box>
                            <Box>
                                <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color="green.500">
                                    24/7
                                </Text>
                                <Text>Help Available</Text>
                            </Box>
                            <Box>
                                <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color="#ff7b00">
                                    1000+
                                </Text>
                                <Text>Frauds Prevented</Text>
                            </Box>
                        </Box>
                    </Box>
                    <Box mt={{ base: 6, md: 0 }}>
                        <Image
                            src={'/Images/protection.jpg'}
                            alt="security-banner"
                            width={600}
                            height={450}
                            className="rounded-xl"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    </Box>
                </Flex>

                {/* Safety Tips */}
                <Box maxW="1440px" mx="auto">
                    <Heading
                        as="h2"
                        size={{ base: 'md', md: 'lg' }}
                        color="gray.800"
                        mb={{ base: 4, md: 6 }}
                    >
                        Essential Safety Tips & Precautions
                    </Heading>
                    <Text
                        color="gray.600"
                        mb={{ base: 4, md: 6 }}
                        fontSize={{ base: 'sm', md: 'inherit' }}
                    >
                        Protect yourself from various types of fraud with these proven safety measures. Knowledge is your best defense against fraudulent activities.
                    </Text>
                    <SimpleGrid
                        columns={{ base: 1, md: 3, lg: 4 }}
                        spacing={{ base: 4, md: 6 }}
                    >
                        {tips.map((tip, index) => (
                            <Box
                                key={index}
                                p={{ base: 2, md: 4 }}
                                borderWidth="1px"
                                borderRadius="xl"
                                bg="white"
                                textAlign={{ base: 'center', md: 'left' }}
                                h={{ base: '150px', md: '200px' }}
                                display="flex"
                                flexDirection="column"
                                alignItems={{ base: 'center', md: 'flex-start' }}
                                justifyContent={{ base: 'center', md: 'flex-start' }}
                                boxShadow="md"
                                _hover={{ boxShadow: "lg" }}
                            >
                                <Box
                                    p={{ base: 2, md: 3 }}
                                    borderRadius="lg"
                                    bg={tip.bg_color}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    mb={{ base: 2, md: 3 }}
                                >
                                    <Icon as={tip.icon} boxSize={{ base: 4, md: 5 }} />
                                </Box>
                                <Text
                                    fontWeight="bold"
                                    mb={{ base: 1, md: 1 }}
                                    fontSize={{ base: 'sm', md: 'inherit' }}
                                >
                                    {tip.heading}
                                </Text>
                                <Text
                                    fontSize={{ base: 'xs', md: 'sm' }}
                                    textAlign={{ base: 'center', md: 'left' }}
                                >
                                    {tip.description}
                                </Text>
                            </Box>
                        ))}
                    </SimpleGrid>
                </Box>
            </Box>
        </Box>
    );
};

export default FraudAlert;