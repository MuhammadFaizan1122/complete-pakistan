'use client'
import { Box, Heading, Text, Card, CardBody, Input, Button, SimpleGrid, Icon } from "@chakra-ui/react";
import { FaSearch, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";

const VerificationTools = () => {
    return (
        <Box
            bg="blue.50"
            py={20}
            px={4}
            textAlign="center"
            position="relative"
        >
            <Heading as="h2" size="lg" color="gray.800" mb={4}>
                Verification Tools
            </Heading>
            <Text color="gray.600" maxW="1440px" mx="auto" mb={8}>
                Use these resources to verify the authenticity of offers, agencies, and employers. Always verify before you commit or make any payments.
            </Text>

            {/* Verification Tools Grid */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} maxW="1440px" mx="auto" mb={8}>
                <Card variant="outline" textAlign={'left'}>
                    <CardBody>
                        <Box
                            display="flex"
                            alignItems="center"
                            mb={2}
                        >
                            <Box
                                p={3}
                                borderRadius="xl"
                                bg={'gray.100'}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                mr={3}
                            >
                                <Icon as={FaSearch} boxSize={5} />
                            </Box>
                            <Box textAlign={'left'}>
                                <Text fontWeight="bold" >Agency Verification</Text>
                                <Text>Check if a recruitment agency is registered with the government</Text>
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            gap={2}
                        >
                            <Input placeholder="Enter agency name or license number" />
                            <Button px={8} colorScheme="blue">Verify Agency</Button>
                        </Box>
                    </CardBody>
                </Card>

                <Card variant="outline" textAlign={'left'}>
                    <CardBody>
                        <Box
                            display="flex"
                            alignItems="center"
                            mb={2}
                        >
                            <Box
                                p={3}
                                borderRadius="xl"
                                bg={'green.100'}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                mr={3}
                            >
                                <Icon as={FaCheck} boxSize={5} />
                            </Box>
                            <Box textAlign={'left'}>
                                <Text fontWeight="bold" >Visa Check</Text>
                                <Text>Verify the authenticity of your visa with official databases</Text>

                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            gap={2}
                        >
                            <Input placeholder="Enter visa reference number" />
                            <Button px={8} colorScheme="blue">Check Visa</Button>
                        </Box>
                    </CardBody>
                </Card>

                <Card variant="outline" textAlign={'left'}>
                    <CardBody>
                        <Box
                            display="flex"
                            alignItems="center"
                            mb={2}
                        >
                            <Box
                                p={3}
                                borderRadius="xl"
                                bg={'purple.100'}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                mr={3}
                            >
                                <Icon as={FaSearch} boxSize={5} />
                            </Box>
                            <Box textAlign={'left'}>
                                <Text fontWeight="bold" >Company Lookup</Text>
                                <Text>Search for information about overseas employers</Text>
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            gap={2}
                        >
                            <Input placeholder="Enter company name" />
                            <Button px={8} colorScheme="blue">Search Company</Button>
                        </Box>
                    </CardBody>
                </Card>

                <Card variant="outline">
                    <CardBody>
                        <Box
                            display="flex"
                            alignItems="center"
                            mb={2}
                        >
                            <Box
                                p={3}
                                borderRadius="xl"
                                bg={'yellow.100'}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                mr={3}
                            >
                                <Icon as={FaExclamationTriangle} boxSize={5} />
                            </Box>
                            <Box textAlign={'left'}>
                                <Text fontWeight="bold" >Blacklist Check</Text>
                                <Text >See if an agency or company has been reported for fraud</Text>
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            gap={2}
                        >
                            <Input placeholder="Enter name to check blacklist" />
                            <Button px={8} colorScheme="blue">Check Blacklist</Button>
                        </Box>
                    </CardBody>
                </Card>
            </SimpleGrid>

            {/* Official Verification Call-to-Action */}
            <Card variant="outline" p={6} maxW="800px" mx="auto">
                <CardBody>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mb={4}
                    >
                        <Box
                            p={3}
                            borderRadius="full"
                            bg={'green.100'}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            mr={3}
                            w={'60px'}
                            h={'60px'}

                        >
                            <Icon as={FiFileText} color="green.500" size={'30px'} fontSize={'26px'} />
                        </Box>
                    </Box>
                    <Text fontWeight="bold" mb={2} fontSize={{ base: 'md', md: 'xl' }} >Need Official Verification?</Text>
                    <Text mb={4}>
                        For official government verification of agencies and documents, contact the Ministry of Overseas Pakistanis directly.
                    </Text>
                    <Button colorScheme="green">Contact Official Authorities</Button>
                </CardBody>
            </Card>
        </Box>
    );
};

export default VerificationTools;