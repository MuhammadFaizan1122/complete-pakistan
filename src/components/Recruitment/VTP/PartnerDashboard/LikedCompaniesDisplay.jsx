"use client";
import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const LikedCompaniesDisplay = ({ oepData, ttcData }) => {
    const [data, setData] = useState({ companies: { oep: [], ttc: [] } });
    const { data: session } = useSession();
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(false);
    useEffect(() => {
        setData({ companies: { oep: oepData, ttc: ttcData } });
    }, [oepData, ttcData]);

    useEffect(() => {
        if (data.companies.oep.length > 0) {
            selectCompany(data.companies.oep[0]);
        } else if (data.companies.ttc.length > 0) {
            selectCompany(data.companies.ttc[0]);
        }
    }, [data]);

    const selectCompany = async (company) => {
        setSelectedCompany(company);
        setLoadingJobs(true);
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASEURL_2}/companies?userId=${company._id}`,
                { headers: { 'user-id': session?.user?.id } }
            );
            if (res.status === 200) {
                setJobs(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoadingJobs(false);
        }
    };

    return (
        <Flex gap={4} w={'100%'}  >
            {/* Left Panel: Companies */}
            <Box flex="1" p="4" borderWidth="1px" borderRadius="md" w={{ base: '100%', md: '30%' }} maxW={'400px'} >
                <Tabs variant="soft-rounded" colorScheme="green">
                    <TabList>
                        <Tab>OEP</Tab>
                        <Tab>TTC</Tab>
                    </TabList>
                    <TabPanels>
                        {/* OEP Companies */}
                        <TabPanel>
                            {data.companies.oep.map((company, index) => (
                                <Box
                                    key={index}
                                    py={2}
                                    px={2}
                                    cursor="pointer"
                                    onClick={() => selectCompany(company)}
                                    bg={selectedCompany?._id === company._id ? 'green.50' : 'transparent'}
                                    _hover={{ bg: 'gray.100' }}
                                    transition="all 0.2s ease-in-out"
                                    borderBottom={'1px solid gray'}
                                >
                                    <Flex justify={'space-between'} >
                                        <Text>Working with: </Text>
                                        <Text fontWeight={'semibold'} color={'black'} fontSize={'lg'}>{company.agencyName} </Text>
                                    </Flex>
                                    <Flex justify={'space-between'} >
                                        <Text>Since: </Text>
                                        <Text fontWeight={'semibold'} color={'black'} fontSize={'md'}>{new Date(company.createdAt).toLocaleDateString()}</Text>
                                    </Flex>
                                    <Flex justify={'space-between'} >
                                        <Text>Last login: </Text>
                                        <Text fontWeight={'semibold'} color={'black'} fontSize={'md'}>{new Date(company.updatedAt).toLocaleDateString()}</Text>
                                    </Flex>
                                </Box>
                            ))}
                        </TabPanel>

                        {/* TTC Companies */}
                        <TabPanel>
                            {data.companies.ttc.map((company, index) => (
                                <Box
                                    key={index}
                                    py={2}
                                    px={2}
                                    cursor="pointer"
                                    onClick={() => selectCompany(company)}
                                    bg={selectedCompany?._id === company._id ? 'green.50' : 'transparent'}
                                    _hover={{ bg: 'gray.100' }}
                                    transition="all 0.2s ease-in-out"
                                    rounded={'lg'}
                                    borderBottom={'1px solid gray'}
                                >
                                    <Flex justify={'space-between'} >
                                        <Text>Working with: </Text>
                                        <Text fontWeight={'semibold'} color={'black'} fontSize={'lg'}>{company.agencyName} </Text>
                                    </Flex>
                                    <Flex justify={'space-between'} >
                                        <Text>Since: </Text>
                                        <Text fontWeight={'semibold'} color={'black'} fontSize={'md'}>{new Date(company.createdAt).toLocaleDateString()}</Text>
                                    </Flex>
                                    <Flex justify={'space-between'} >
                                        <Text>Last login: </Text>
                                        <Text fontWeight={'semibold'} color={'black'} fontSize={'md'}>{new Date(company.updatedAt).toLocaleDateString()}</Text>
                                    </Flex>
                                </Box>
                            ))}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>

            <Box flex="1" p="4" borderWidth="1px" borderRadius="md" w={{ base: '100%', md: '70%' }} maxH={'600px'} overflowY={'scroll'}>
                <Text className="text-purple-900 font-bold">Current</Text>
                {loadingJobs ? (
                    <Spinner size="lg" mt={4} />
                ) : jobs.length > 0 ? (
                    jobs.map((job, idx) => (
                        <Box key={idx} p={3}>
                            {/* <Text>#: {job ? `PAK-${new Date(job.createdAt).getFullYear()}-${Math.floor(Math.random() * 10000)} Embassy, Islamabad` : 'N/A'}</Text> */}
                            <Text fontSize={'20px'} fontWeight="bold" textTransform={'capitalize'} mb={2}>{job.name}</Text>
                            <Flex w={'100%'}>
                                <Text w={'50%'} fontWeight={'semibold'}>Visa Category</Text>
                                <Text w={'50%'} fontWeight={'semibold'}>Manpower Requirement</Text>
                            </Flex>
                            <Flex w={'100%'}>
                                <Box w={'50%'}>
                                    {
                                        job?.visaAuthorizedTrade?.map((item, i) => {
                                            return (
                                                <Box
                                                    key={i}
                                                    p={2}
                                                    py={4}
                                                    bg={'gray.50'}
                                                    mr={2}
                                                    _hover={{ bg: 'gray.100' }}
                                                    transition="all 0.2s ease-in-out"
                                                    rounded={'lg'}
                                                >
                                                    <Flex justify={'space-between'}>
                                                        <Box>
                                                            <Text fontWeight={'semibold'}>{item.authorized_trade}</Text>
                                                            <Text>NAVTAC: {item.NAVTAC}</Text>
                                                        </Box>
                                                        <Box>
                                                            <Flex align="center" gap={2}>
                                                                <Box
                                                                    bg="purple.100"
                                                                    color="purple.800"
                                                                    px={3}
                                                                    py={1}
                                                                    borderRadius="full"
                                                                    fontSize="sm"
                                                                    fontWeight="semibold"
                                                                >
                                                                    {item.salary} - {item.currency}
                                                                </Box>
                                                                <Box
                                                                    bg="black"
                                                                    color="white"
                                                                    px={3}
                                                                    py={1}
                                                                    borderRadius="full"
                                                                    fontSize="sm"
                                                                    fontWeight="semibold"
                                                                >
                                                                    {item.quantity}
                                                                </Box>
                                                            </Flex>
                                                        </Box>
                                                    </Flex>
                                                </Box>
                                            )
                                        })
                                    }
                                </Box>
                                <Box w={'50%'}>
                                    {
                                        job?.visaAuthorizedTrade?.map((item, i) => {
                                            return (
                                                <Box
                                                    key={i}
                                                    p={2}
                                                    py={4}
                                                    bg={'gray.50'}
                                                    mr={2}
                                                    _hover={{ bg: 'gray.100' }}
                                                    transition="all 0.2s ease-in-out"
                                                    rounded={'lg'}
                                                >
                                                    <Flex justify={'space-between'}>
                                                        <Box>
                                                            <Text fontWeight={'semibold'}>{item.required_trade}</Text>
                                                        </Box>
                                                        <Box>
                                                            <Flex align="center" gap={2}>
                                                                <Box
                                                                    bg="purple.100"
                                                                    color="purple.800"
                                                                    px={3}
                                                                    py={1}
                                                                    borderRadius="full"
                                                                    fontSize="sm"
                                                                    fontWeight="semibold"
                                                                >
                                                                    {item.salary} - {item.currency}
                                                                </Box>
                                                                <Box
                                                                    bg="black"
                                                                    color="white"
                                                                    px={3}
                                                                    py={1}
                                                                    borderRadius="full"
                                                                    fontSize="sm"
                                                                    fontWeight="semibold"
                                                                >
                                                                    {item.quantity}
                                                                </Box>
                                                            </Flex>
                                                        </Box>
                                                    </Flex>
                                                </Box>
                                            )
                                        })
                                    }
                                </Box>
                            </Flex>
                        </Box>
                    ))
                ) : (
                    <Text mt={4} color="gray.500">No jobs found.</Text>
                )}
            </Box>
        </Flex>
    );
};

export default LikedCompaniesDisplay;
