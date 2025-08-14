import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Button, Spinner, Center } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const Agencies = ({ setOepData, setTtcData }) => {
    const [agencies, setAgencies] = useState([]);
    const { data: session } = useSession()
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(false)

    useEffect(() => {
        const fetchAgencies = async () => {
            setLoading(true)
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASEURL_2}/like?userId=${session.user.id}`, {
                headers: { 'user-id': session.user.id }
            });
            if (response.status === 200) {
                const oepAgencies = response.data.data.filter(
                    company => company.liked === true && company.type === 'OEP'
                );
                const ttcAgencies = response.data.data.filter(
                    company => company.liked === true && company.type === 'TTC'
                );
                setOepData(oepAgencies)
                setTtcData(ttcAgencies)
                setAgencies(response.data.data);
                setLoading(false)
            }
        };
        fetchAgencies();
    }, [session]);
    const handleLike = async (companyId) => {
        try {
            setLoading2(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASEURL_2}/like`, {
                companyId,
                userId: session.user.id
            }, {
                headers: { 'user-id': session.user.id }
            });

            if (response.status === 201 || response.status === 200) {
                setAgencies(prev =>
                    prev.map(agency =>
                        agency._id === companyId
                            ? { ...agency, liked: !agency.liked }
                            : agency
                    )
                );
            }
        } catch (error) {
            console.error('Error liking company:', error);
        } finally {
            setLoading2(false);
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
        <Box p={4} bg="white" borderRadius="md" boxShadow="md" minH="60vh">
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
                                : agency.liked ? (
                                    <AiFillHeart color="red" size={24} cursor={'pointer'} onClick={() => handleLike(agency._id)} />
                                ) :
                                    <AiOutlineHeart
                                        color="gray"
                                        size={24}
                                        cursor={'pointer'}
                                        onClick={() => handleLike(agency._id)}
                                    />}
                        </Flex>
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

export default Agencies;