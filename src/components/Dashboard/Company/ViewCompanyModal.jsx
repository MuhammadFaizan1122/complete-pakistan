'use client';
import {
    Box, Button, Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalBody, ModalFooter, ModalCloseButton,
    Text, SimpleGrid,
    Center,
    Image
} from '@chakra-ui/react';

export function ViewCompanyModal({ isOpen, onClose, company }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'full', md: '3xl' }}>
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
            <ModalContent rounded="16px" p={{ base: 2, md: 4 }}>
                <ModalHeader color="#309689" fontSize="2xl" fontWeight="bold">
                    Company Details
                </ModalHeader>
                <ModalCloseButton size="lg" />
                <ModalBody maxH={'700px'} overflowY={'scroll'}>
                    {company?.logo && (
                        <Center mb={5}>
                            <Image
                                src={company.logo}
                                alt="Company Logo"
                                boxSize="120px"
                                objectFit="contain"
                                borderRadius="md"
                                border="1px solid #ccc"
                            />
                        </Center>
                    )}
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                        <Box>
                            <Text fontWeight="medium" color="gray.700">Company Name</Text>
                            <Text color="gray.600">{company?.name}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="medium" color="gray.700">City</Text>
                            <Text color="gray.600">{company?.city}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="medium" color="gray.700">Country</Text>
                            <Text color="gray.600">{company?.country}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="medium" color="gray.700">Permission Number</Text>
                            <Text color="gray.600">{company?.permission_number}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="medium" color="gray.700">ID Number</Text>
                            <Text color="gray.600">{company?.idNumber}</Text>
                        </Box>
                    </SimpleGrid>
                    <Box mt={5}>
                        <Text fontWeight="medium" color="gray.700" mb={2}>Visa Authorized Trades</Text>
                        {company?.visaAuthorizedTrade?.map((trade, index) => (
                            <Box key={index} p={3} bg="gray.50" rounded="8px" mb={3}>
                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                                    <Box>
                                        <Text fontWeight="medium" color="gray.700">Authorized Trade</Text>
                                        <Text color="gray.600">{trade.authorized_trade}</Text>
                                    </Box>
                                    <Box>
                                        <Text fontWeight="medium" color="gray.700">Required Trade</Text>
                                        <Text color="gray.600">{trade.required_trade}</Text>
                                    </Box>
                                    <Box>
                                        <Text fontWeight="medium" color="gray.700">Quantity</Text>
                                        <Text color="gray.600">{trade.quantity}</Text>
                                    </Box>
                                    <Box>
                                        <Text fontWeight="medium" color="gray.700">Salary</Text>
                                        <Text color="gray.600">{trade.salary} {trade.currency}</Text>
                                    </Box>
                                    <Box>
                                        <Text fontWeight="medium" color="gray.700">Duty Timings</Text>
                                        <Text color="gray.600">{trade.dutyTimings}</Text>
                                    </Box>
                                    <Box>
                                        <Text fontWeight="medium" color="gray.700">Overtime</Text>
                                        <Text color="gray.600">{trade.overtime}</Text>
                                    </Box>
                                    <Box>
                                        <Text fontWeight="medium" color="gray.700">Benefits</Text>
                                        <Text color="gray.600">{trade.benefits.join(', ')}</Text>
                                    </Box>
                                    <Box>
                                        <Text fontWeight="medium" color="gray.700">Contract Period</Text>
                                        <Text color="gray.600">{trade.contractPeriod}</Text>
                                    </Box>
                                    <Box>
                                        <Text fontWeight="medium" color="gray.700">NAVTAC</Text>
                                        <Text color="gray.600">{trade.NAVTAC}</Text>
                                    </Box>
                                </SimpleGrid>
                            </Box>
                        ))}
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={onClose}
                        variant="outline"
                        rounded="12px"
                        size="lg"
                        borderColor="gray.300"
                        _hover={{ bg: 'gray.100' }}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}