import { Box, VStack, Text, SimpleGrid, Flex, Image, Button, Heading } from "@chakra-ui/react";
import Link from "next/link";

const aboutData = {
    mission: {
        title: "Our Mission",
        description:
            "Complete Pakistan is dedicated to revolutionizing the overseas employment process by connecting candidates, agencies, and employers seamlessly. We empower stakeholders with comprehensive solutions, ensuring transparency, efficiency, and opportunities for all.",
    },
    values: [
        {
            icon: '/Images/Icons/core-feature-1.png',
            title: "Transparency",
            description: "We prioritize open communication and clear processes to build trust among all parties.",
        },
        {
            icon: '/Images/Icons/core-feature-2.png',
            title: "Efficiency",
            description: "Our platform streamlines job searches and applications to save time and effort.",
        },
        {
            icon: '/Images/Icons/core-feature-3.png',
            title: "Opportunity",
            description: "We create pathways for candidates to access global job markets and achieve their dreams.",
        },
        {
            icon: '/Images/Icons/core-feature-4.png',
            title: "Community",
            description: "We foster a supportive network for all stakeholders in the employment ecosystem.",
        },
    ],
    team: [
        {
            name: "Ali Khan",
            role: "Founder & CEO",
            image: "/Images/COO.webp",
            bio: "With over 15 years in HR and recruitment, Ali leads Complete Pakistan with a vision for global employment solutions.",
        },
        {
            name: "Sana Malik",
            role: "Chief Operations Officer",
            image: "/Images/CEO.jpg",
            bio: "Sana ensures seamless operations, driving efficiency across our platform's services.",
        },
        {
            name: "Ahmed Raza",
            role: "Head of Technology",
            image: "/Images/HOD.jpg",
            bio: "Ahmed spearheads our tech innovations, building a robust platform for users worldwide.",
        },
    ],
    impact: {
        stats: [
            { value: "10,000+", label: "Candidates Connected" },
            { value: "500+", label: "Agencies Partnered" },
            { value: "50+", label: "Countries Served" },
            { value: "1M+", label: "Jobs Posted" },
        ],
    },
};

export default function AboutUs() {
    return (
        <Box bg="#eaf7f7" px={{ base: 2, sm: 4, md: 4 }} py={{ base: 8, md: 16 }}>
            <Box maxW="1440px" mx="auto">
                {/* Hero Section */}
                <VStack spacing={{ base: 2, md: 3 }} textAlign="center" mb={{ base: 8, md: 12 }}>
                    <Heading
                        fontSize={{ base: "xl", sm: "2xl", md: "50px" }}
                        fontWeight="bold"
                        color="black"
                    >
                        About Complete Pakistan
                    </Heading>
                    <Text
                        maxW={{ base: "90%", md: "600px" }}
                        fontSize={{ base: "sm", sm: "md", md: "16px" }}
                        color="black"
                        px={{ base: 2, md: 0 }}
                    >
                        Complete Pakistan is your trusted platform for overseas employment, connecting candidates, agencies, and employers to create opportunities that transform lives.
                    </Text>
                </VStack>

                {/* Mission Section */}
                <Box bg="white" rounded="20px" shadow="md" p={{ base: 4, md: 6 }} mb={{ base: 12, md: 20 }} >
                    <VStack spacing={{ base: 2, md: 3 }} textAlign="center">
                        <Text
                            fontSize={{ base: "lg", sm: "xl", md: "32px" }}
                            fontWeight="bold"
                            color="black"
                        >
                            {aboutData.mission.title}
                        </Text>
                        <Text
                            maxW={{ base: "90%", md: "800px" }}
                            fontSize={{ base: "sm", sm: "md", md: "16px" }}
                            color="black"
                        >
                            {aboutData.mission.description}
                        </Text>
                    </VStack>
                </Box>

                {/* Values Section */}
                <VStack spacing={{ base: 2, md: 3 }} textAlign="center" mb={{ base: 12, md: 20 }} align="stretch" >
                    <Text
                        fontSize={{ base: "lg", sm: "xl", md: "32px" }}
                        fontWeight="bold"
                        color="black"
                    >
                        Our Values
                    </Text>
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={{ base: 4, sm: 5, md: 6 }}>
                        {aboutData.values.map((value, idx) => (
                            <Box
                                key={idx}
                                bg="#0a745026"
                                p={{ base: 4, md: 6 }}
                                h={{ base: "auto", sm: "320px", md: "360px" }}
                                w={{ base: "100%", sm: "90%", md: "306px" }}
                                rounded="xl"
                                shadow="md"
                                textAlign="center"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                flexDirection="column"
                            >
                                <Box
                                    rounded="md"
                                    mx="auto"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    mb={{ base: 3, md: 4 }}
                                    w={{ base: "48px", sm: "54px", md: "60px" }}
                                    h={{ base: "48px", sm: "54px", md: "60px" }}
                                >
                                    <Image
                                        src={value.icon}
                                        alt="value icon"
                                        width={60}
                                        height={60}
                                        style={{ objectFit: "contain" }}
                                        sizes="(max-width: 640px) 48px, (max-width: 768px) 54px, 60px"
                                    />
                                </Box>
                                <Text
                                    fontWeight="bold"
                                    fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                                    mb={{ base: 1, md: 2 }}
                                    color="black"
                                >
                                    {value.title}
                                </Text>
                                <Text
                                    fontSize={{ base: "sm", sm: "md", md: "16px" }}
                                    color="black"
                                >
                                    {value.description}
                                </Text>
                            </Box>
                        ))}
                    </SimpleGrid>
                </VStack>

                {/* Team Section */}
                <VStack spacing={{ base: 2, md: 3 }} textAlign="center" mb={{ base: 12, md: 20 }}>
                    <Text
                        fontSize={{ base: "lg", sm: "xl", md: "32px" }}
                        fontWeight="bold"
                        color="black"
                    >
                        Meet Our Team
                    </Text>
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 4, sm: 5, md: 6 }}>
                        {aboutData.team.map((member, idx) => (
                            <Box
                                key={idx}
                                bg="white"
                                p={{ base: 4, md: 6 }}
                                rounded="20px"
                                shadow="md"
                                textAlign="center"
                                w={{ base: "100%", sm: "90%", md: "340px" }}
                                h={{ base: "auto", md: "400px" }}
                            >
                                <Flex
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="space-evenly"
                                    w="full"
                                    h="full"
                                >
                                    <Box
                                        w={{ base: "80px", sm: "100px", md: "120px" }}
                                        h={{ base: "80px", sm: "100px", md: "120px" }}
                                        mb={{ base: 3, md: 4 }}
                                    >
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            width={120}
                                            height={120}
                                            style={{ objectFit: "cover", borderRadius: "50%" }}
                                            sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, 120px"
                                        />
                                    </Box>
                                    <Text
                                        fontWeight="bold"
                                        fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                                        color="black"
                                    >
                                        {member.name}
                                    </Text>
                                    <Text
                                        fontSize={{ base: "sm", sm: "md", md: "16px" }}
                                        color="#0a7450"
                                        mb={{ base: 1, md: 2 }}
                                    >
                                        {member.role}
                                    </Text>
                                    <Text
                                        fontSize={{ base: "xs", sm: "sm", md: "14px" }}
                                        color="black"
                                    >
                                        {member.bio}
                                    </Text>
                                </Flex>
                            </Box>
                        ))}
                    </SimpleGrid>
                </VStack>

                {/* Impact Section */}
                <VStack spacing={{ base: 2, md: 3 }} textAlign="center" mb={{ base: 12, md: 20 }} align="stretch">
                    <Text
                        fontSize={{ base: "lg", sm: "xl", md: "32px" }}
                        fontWeight="bold"
                        color="black"
                    >
                        Our Impact
                    </Text>
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={{ base: 4, sm: 5, md: 6 }}>
                        {aboutData.impact.stats.map((stat, idx) => (
                            <Box
                                key={idx}
                                bg="#0a7450"
                                p={{ base: 4, md: 6 }}
                                rounded="xl"
                                shadow="md"
                                textAlign="center"
                                w={{ base: "100%", sm: "90%", md: "100%" }}
                                h={{ base: "auto", md: "200px" }}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                flexDirection="column"
                            >
                                <Text
                                    fontWeight="bold"
                                    fontSize={{ base: "20px", sm: "22px", md: "28px" }}
                                    color="white"
                                    mb={{ base: 1, md: 2 }}
                                >
                                    {stat.value}
                                </Text>
                                <Text
                                    fontSize={{ base: "sm", sm: "md", md: "16px" }}
                                    color="white"
                                >
                                    {stat.label}
                                </Text>
                            </Box>
                        ))}
                    </SimpleGrid>
                </VStack>

                {/* CTA Section */}
                <Box bg="white" rounded="20px" shadow="md" p={{ base: 4, md: 6 }} textAlign="center">
                    <VStack spacing={{ base: 2, md: 3 }}>
                        <Text
                            fontSize={{ base: "lg", sm: "xl", md: "32px" }}
                            fontWeight="bold"
                            color="black"
                        >
                            Join Complete Pakistan Today
                        </Text>
                        <Text
                            maxW={{ base: "90%", md: "600px" }}
                            fontSize={{ base: "sm", sm: "md", md: "16px" }}
                            color="black"
                            mx="auto"
                        >
                            Be part of a community that connects talent with opportunity. Sign up now to explore jobs, connect with agencies, or list your openings.
                        </Text>
                        <Button
                            as={Link}
                            href={'/'}
                            bg="#0a7450"
                            color="white"
                            rounded="xl"
                            px={{ base: 6, md: 8 }}
                            py={{ base: 3, md: 4 }}
                            fontSize={{ base: "sm", md: "md" }}
                            _hover={{ bg: "#287a6f" }}
                        >
                            Get Started
                        </Button>
                    </VStack>
                </Box>
            </Box>
        </Box>
    );
}