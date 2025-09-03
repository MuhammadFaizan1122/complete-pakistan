'use client'
import React from 'react';
import { Box, FormLabel, Input, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

const Documents = ({ photoFile, cvFiles, certificateFiles, handleFileChange, removeFile }) => {
    return (
        <Stack spacing={{ base: 6, md: 10 }}>
            <Box>
                <FormLabel fontSize="md" color="gray.700" mb={2}>
                    Photo
                </FormLabel>
                <Box
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="15px"
                    bg="white"
                    px={{ base: 3, md: 4 }}
                    py={{ base: 4, md: 6 }}
                    textAlign="center"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Stack spacing={2} align="center">
                        <Text fontSize="sm" color="gray.500">
                            Upload photo
                        </Text>
                        <Text fontSize="xs" color="gray.500" textAlign="center">
                            Upload a professional photo with white background recommended
                        </Text>
                        <Input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={handleFileChange}
                            mt={2}
                            width={{ base: "100%", md: "auto" }}
                            maxW="250px"
                            paddingY="1"
                            paddingX="3"
                            fontSize="sm"
                            background="white"
                            border="1px solid"
                            borderColor="gray.300"
                            borderRadius="md"
                            cursor="pointer"
                        />
                    </Stack>
                </Box>
            </Box>
            <Box>
                <FormLabel fontSize="md" color="gray.700" mb={2}>
                    Licenses & Certificates
                </FormLabel>
                <Box
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="15px"
                    bg="white"
                    px={{ base: 3, md: 4 }}
                    py={{ base: 6, md: 10 }}
                    textAlign="center"
                    position="relative"
                >
                    <Text fontSize="sm" color="gray.500">
                        Upload any licenses or certificates that may be relevant
                    </Text>
                    <Input
                        type="file"
                        name="certificates"
                        multiple
                        onChange={handleFileChange}
                        position="absolute"
                        top={0}
                        left={0}
                        w="100%"
                        h="100%"
                        opacity={0}
                        cursor="pointer"
                    />
                </Box>
                <Wrap mt={3}>
                    {certificateFiles.map((file, index) => (
                        <WrapItem key={index}>
                            <Box
                                display="flex"
                                alignItems="center"
                                bg="#0a7450"
                                color="white"
                                px={3}
                                py={1}
                                borderRadius="full"
                                fontSize="sm"
                                maxW="full"
                            >
                                <Text mr={2} isTruncated>
                                    {file.name}
                                </Text>
                                <Button
                                    onClick={() => removeFile("certificate", index)}
                                    variant="ghost"
                                    size="sm"
                                    color="white"
                                    _hover={{ bg: "transparent" }}
                                    px={1}
                                >
                                    ×
                                </Button>
                            </Box>
                        </WrapItem>
                    ))}
                </Wrap>
            </Box>
        </Stack>
    );
};

export default Documents;