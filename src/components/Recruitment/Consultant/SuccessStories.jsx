import React from 'react';
import { VStack, Text, Box, Flex, Tag } from '@chakra-ui/react';
import Image from 'next/image';

const SuccessStories = ({ consultant }) => {
    return (
        <VStack align="flex-start" spacing={6} >
            <Flex justify="space-between" align="center" w="full">
                <Text fontWeight="bold" fontSize="lg">Success Stories</Text>
            </Flex>
            {consultant.successStories.length ?
                consultant.successStories.map((item, i) => {
                    return (

                        <Box className="p-4 rounded-lg border-l-[4px] border-black" border={'1px solid'} borderColor={'gray.400'} bg={'gray.50'} w="full">
                            <Flex>
                                <Box>
                                    <Image src={item.clientProfileImage || "/Images/placeholder.png"} alt='' width={70} height={70} className='!rounded-xl !border-2 !border-gray !mr-4' />
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">{item.clientTitle}</Text>
                                    <Text fontSize="sm" color="gray.600">Client: {item.clientName}</Text>
                                    <Text fontSize="sm" color="gray.600">{item.serviceTaken}</Text>
                                    <Text fontSize="sm" color="gray.600" mt={2}>"{item.comment}"</Text>
                                    {/* <Tag size="sm" colorScheme="green" mt={2} fontWeight="medium">👍 45</Tag>
                                    <Tag size="sm" colorScheme="red" mt={2} ml={2} fontWeight="medium">👎 2</Tag> */}
                                </Box>
                            </Flex>
                        </Box>
                    )
                })
                : <Text>No Data Available</Text>}
            {/* <Box className="p-4 rounded-lg border-l-[4px] border-black" border={'1px solid'} borderColor={'gray.400'} bg={'gray.50'} w="full">
                <Flex>
                    <Box>
                        <Image src="/Images/placeholder.png" alt='' width={70} height={70} className='!rounded-xl !border-2 !border-gray !mr-4' />
                    </Box>
                    <Box>
                        <Text fontWeight="bold">Zeeshan Kazmi</Text>
                        <Text fontSize="sm" color="gray.600">Client: Zeeshan Kazmi</Text>
                        <Text fontSize="sm" color="gray.600">Student Visa Processing</Text>
                        <Text fontSize="sm" color="gray.600" mt={2}>"Got my student visa approved quickly with their expert assistance."</Text>
                        <Tag size="sm" colorScheme="green" mt={2} fontWeight="medium">👍 38</Tag>
                        <Tag size="sm" colorScheme="red" mt={2} ml={2} fontWeight="medium">👎 1</Tag>
                    </Box>
                </Flex>
            </Box> */}
        </VStack>
    );
};

export default SuccessStories;