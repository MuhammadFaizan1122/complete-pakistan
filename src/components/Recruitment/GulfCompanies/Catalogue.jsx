"use client";

import {
    Box,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Flex,
    Text,
    Badge,
    Avatar,
} from "@chakra-ui/react";

export default function CompanyCatalogue() {
    const tabs = [
        { label: "Ongoing Projects", companies: ongoingProjects },
        { label: "Finished Projects", companies: [] },
        { label: "Coming Soon Projects", companies: [] },
        { label: "Today Project", companies: [] },
    ];

    return (
        <Box
            bg="white"
            my={6}
            shadow="sm"
            rounded="xl"
            border="1px solid"
            borderColor="#0a7450"
            className="w-full mx-auto"
        >
            <Text fontSize="lg" color={'#0a7450'} fontWeight="bold" p={4} borderBottom="1px solid #ccc">
                Company Logo Catalogue
            </Text>
            <Tabs variant="enclosed-colored" isLazy rounded={'md'} w="100%">
                <TabList overflowX="auto" className="px-4 w-[100%]" bg={'gray.50'}>
                    {tabs.map((t, i) => (
                        <Tab key={i} whiteSpace="nowrap" _selected={{ bg: "#0a7450", color: "white" }} flex="1" bg="gray.50" border={'none'} rounded={'lg'} m={2}>
                            {t.label}
                        </Tab>
                    ))}
                </TabList>

                <TabPanels>
                    {tabs.map((t, i) => (
                        <TabPanel key={i} px={0}>
                            <Flex
                                gap={6}
                                overflowX="auto"
                                py={6}
                                px={4}
                                className="scrollbar-hide"
                            >
                                {t.companies.length > 0 ? (
                                    t.companies.map((c, idx) => <CompanyCard key={idx} {...c} />)
                                ) : (
                                    <Flex gap={4}>
                                        {Array(4)
                                            .fill(0)
                                            .map((_, idx) => (
                                                <EmptyCard key={idx} />
                                            ))}
                                    </Flex>
                                )}
                            </Flex>
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </Box>
    );
}

/* ------------------------------
   Company Card
------------------------------- */
function CompanyCard({ name, location, status }) {
    return (
        <Box
            minW="150px"
            maxW="150px"
            p={4}
            shadow="sm"
            rounded="xl"
            border="1px solid"
            borderColor="gray.200"
            textAlign="center"
            _hover={{ shadow: "md", transform: "scale(1.03)" }}
            transition="0.2s"
        >
            <Avatar size="lg" name={name} mb={3}   borderRadius="10px" 
/>
            <Text fontWeight="semibold" fontSize="sm">
                {name}
            </Text>
            <Text fontSize="xs" color="gray.600">
                {location}
            </Text>
            <Badge mt={2} colorScheme="green" variant="subtle">
                {status}
            </Badge>
        </Box>
    );
}

/* ------------------------------
   Empty Placeholder Card
------------------------------- */
function EmptyCard() {
    return (
        <Box
            minW="100px"
            h="120px"
            rounded="xl"
            border="2px dashed"
            borderColor="gray.300"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="gray.400"
            fontSize="sm"
        >
            Empty
        </Box>
    );
}

/* ------------------------------
   Sample Data
------------------------------- */
const ongoingProjects = [
    {
        name: "Al-Rajhi Construction Co.",
        location: "Riyadh, Saudi Arabia",
        status: "Active",
    },
    {
        name: "Emirates Steel Industries",
        location: "Abu Dhabi, UAE",
        status: "Active",
    },
    {
        name: "Dubai Ports World",
        location: "Dubai, UAE",
        status: "Active",
    },
];
