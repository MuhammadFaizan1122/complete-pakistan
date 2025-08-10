"use client"
import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const LikedCompaniesDisplay = () => {
    const [data, setData] = useState({ companies: { oep: [], ttc: [] } });
    const { data: session } = useSession()

    useEffect(() => {
        const fetchLikedCompanies = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASEURL_2}/like`,
                    { headers: { 'user-id': session.user.id } }
                );
                setData(response.data.data || { companies: { oep: [], ttc: [] } });
            } catch (error) {
                console.error('Error fetching liked companies:', error);
            }
        };
        fetchLikedCompanies();
    }, [session]);

    const currentCompany = data.companies.oep.length > 0 ? data.companies.oep[0] : data.companies.ttc[0] || null;
    const manpowerRequirements = [
        { job: 'Plumber', salary: '1500-2500 SAR', count: 20 },
        { job: 'Electrician', salary: '1500-2500 SAR', count: 30 },
        { job: 'Tile Fixer', salary: '1500-2500 SAR', count: 20 },
        { job: 'Construction Labour', salary: '1500-2500 SAR', count: 20 },
        { job: 'Cleaner Labour', salary: '1500-2500 SAR', count: 30 },
        { job: 'Helper Labour', salary: '1500-2500 SAR', count: 20 },
    ];

    return (
        <Flex gap={4}>
            <Box flex="1" p="4" borderWidth="1px" borderRadius="md" w={{ base: '100%', md: '30%' }}>
                <Tabs variant="soft-rounded" colorScheme="green">
                    <TabList>
                        <Tab>OEP</Tab>
                        <Tab>TTC</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {data.companies.oep.map((company, index) => (
                                <Box borderBottom={'1px solid gray'} key={index} py={2}>
                                    <Text>Working with: {company.agencyName}</Text>
                                    <Text>Since: {new Date(company.createdAt).toLocaleDateString()}</Text>
                                    <Text>Last login: {new Date(company.updatedAt).toLocaleDateString()}</Text>
                                </Box>
                            ))}
                        </TabPanel>
                        <TabPanel>
                            {data.companies.ttc.map((company, index) => (
                                <Box borderBottom={'1px solid gray'} key={index} py={2}>
                                    <Text>Working with: {company.agencyName}</Text>
                                    <Text>Since: {new Date(company.createdAt).toLocaleDateString()}</Text>
                                    <Text>Last login: {new Date(company.updatedAt).toLocaleDateString()}</Text>
                                </Box>
                            ))}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
            <Box flex="1" p="4" borderWidth="1px" borderRadius="md" w={{ base: '100%', md: '70%' }}>
                <Text className="text-purple-900 font-bold">Current</Text>
                <Text>#: {currentCompany ? `PAK-${new Date(currentCompany.createdAt).getFullYear()}-${Math.floor(Math.random() * 10000)} Embassy, Islamabad` : 'N/A'}</Text>
                <Text>{currentCompany ? `${currentCompany.contactPersonName} - ${currentCompany.headOffice}` : 'N/A'}</Text>
                <Text className="text-purple-900 font-bold mt-2">Manpower Requirements</Text>
                <Flex justify="space-between" wrap="wrap" gap={2}>
                    {manpowerRequirements.map((req, index) => (
                        <Flex key={index} w={{ base: '100%', md: '30%' }} justify="space-between">
                            <Text>{req.job}</Text>
                            <Text>{req.salary}</Text>
                            <Text>{req.count}</Text>
                        </Flex>
                    ))}
                </Flex>
            </Box>
        </Flex>
    );
};

export default LikedCompaniesDisplay;