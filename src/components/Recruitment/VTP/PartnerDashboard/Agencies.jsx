import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Button, Spinner, Center } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { handleGetAgencies } from '../../../../handlers/auth/companyRegistration';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const Agencies = () => {
    const [agencies, setAgencies] = useState([]);
    const [likedStatus, setLikedStatus] = useState({});
    const { data: session } = useSession()
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(false)

    useEffect(() => {
        const fetchAgencies = async () => {
            setLoading(true)
            const res = await handleGetAgencies();
            if (res.status === 200) {
                const filteredAgencies = res.data.data.filter(
                    company => company.type === 'OEP' || company.type === 'TTC'
                );
                setAgencies(filteredAgencies);
                const initialLikedStatus = {};
                filteredAgencies.forEach(agency => {
                    initialLikedStatus[agency._id] = false;
                });
                setLikedStatus(initialLikedStatus);
                setLoading(false)
            }
        };
        fetchAgencies();
    }, []);
    const handleLike = async (companyId) => {
        try {
            setLoading2(true)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASEURL_2}/like`, {
                companyId,
                userId: session.user.id
            }, {
                headers: { 'user-id': session.user.id }
            });
            if (response.status === 201 || response.status === 200) {
                setLikedStatus(prev => ({
                    ...prev,
                    [companyId]: !prev[companyId]
                }));
                console.log(response.data.message);
            }
        } catch (error) {
            console.error('Error liking company:', error);
        } finally {
            setLoading2(false)
        }
    };

    if (loading) {
        return (
            <Center minH="40vh" bg="gray.50">
                <Spinner size="lg" color="#0a7450" thickness="2px" />
            </Center>
        );
    }
    return (
        <Box p={4} bg="white" borderRadius="md" boxShadow="md">
            <Flex justify="space-between" align="center" mb={4}>
                <Text fontWeight="bold">Favorite Agencies</Text>
            </Flex>
            <Flex wrap="wrap" gap={4}>
                {agencies.map((agency, index) => (
                    <Box
                        key={index}
                        p={6}
                        borderWidth="1px"
                        borderRadius="md"
                        w="49.4%"
                        bg="gray.50"
                        className="transition-transform hover:scale-101 "
                    >
                        <Flex justify="space-between" align="center">
                            <Box>
                                <Text fontWeight="semibold" fontSize={'lg'}>{agency.agencyName}</Text>
                                <Text fontSize="md" color="gray.600">{agency.headOffice}</Text>
                                <Text fontSize="md">
                                    {'★'.repeat(Math.floor(agency.rating || 0)) +
                                        '☆'.repeat(5 - Math.floor(agency.rating || 0))}
                                    {agency.rating || 0}
                                </Text>
                            </Box>
                            {loading2 ? <Spinner size={'sm'} colorScheme='gray' />
                                : likedStatus[agency._id] ? (
                                    <AiOutlineHeart
                                        color="gray"
                                        size={24}
                                        cursor={'pointer'}
                                        onClick={() => handleLike(agency._id)}
                                    />
                                ) :
                                    <AiFillHeart color="red" size={24} cursor={'pointer'} onClick={() => handleLike(agency._id)} />}
                        </Flex>
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

export default Agencies;