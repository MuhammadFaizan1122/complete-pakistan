'use client';

import {
    Box, Button, Input, Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    useDisclosure, useToast, VStack, Table, Thead, Tbody,
    Tr, Th, Td, TableContainer, FormLabel,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { handleCreateMember, handleGetMembers } from '../../handlers/members/members';
import { useSession } from 'next-auth/react';

// Sample data for initial display
const sampleMembers = [
    {
        _id: '1',
        name: 'John Doe',
        fatherName: 'James Doe',
        phoneNumber: '123-456-7890',
        employeeId: 'EMP001',
        joiningDate: '2024-01-15',
    },
    {
        _id: '2',
        name: 'Jane Smith',
        fatherName: 'Robert Smith',
        phoneNumber: '987-654-3210',
        employeeId: 'EMP002',
        joiningDate: '2024-03-22',
    },
    {
        _id: '3',
        name: 'Alice Johnson',
        fatherName: 'Michael Johnson',
        phoneNumber: '555-555-5555',
        employeeId: 'EMP003',
        joiningDate: '2024-06-10',
    },
];

export default function MemberPage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: session } = useSession();
    const toast = useToast();

    const [members, setMembers] = useState(sampleMembers);
    const [form, setForm] = useState({
        name: '',
        fatherName: '',
        joiningDate: '',
        phoneNumber: '',
        employeeId: '',
    });

    const fetchMembers = async () => {
        if (!session?.user?.id) return;
        const res = await handleGetMembers(session.user.id);
        setMembers(res || sampleMembers);
    };

    useEffect(() => {
        fetchMembers();
    }, [session]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const payload = {
            ...form,
            userId: session?.user?.id,
        };

        const res = await handleCreateMember(payload);

        if (res?.error) {
            toast({
                title: 'Error',
                description: res.error,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        toast({
            title: 'Member Added',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });

        onClose();
        fetchMembers();
        setForm({
            name: '',
            fatherName: '',
            joiningDate: '',
            phoneNumber: '',
            employeeId: '',
        });
    };

    const inputStyle = {
        rounded: '12px',
        bg: 'white',
        borderColor: 'gray.300',
        focusBorderColor: '#309689',
        _hover: { borderColor: '#309689' },
    };

    return (
        <Box p={6} bg="gray.50" minH="100vh">
            <Button
                onClick={onOpen}
                bg="#309689"
                color="white"
                _hover={{ bg: '#247a70' }}
                rounded="12px"
                px={8}
                py={6}
                fontWeight="semibold"
                mb={8}
                size="lg"
            >
                + Add New Member
            </Button>

            {/* Modal Form */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
                <ModalContent rounded="16px" p={4}>
                    <ModalHeader color="#309689" fontSize="2xl" fontWeight="bold">
                        Add New Member
                    </ModalHeader>
                    <ModalCloseButton size="lg" />
                    <ModalBody>
                        <VStack spacing={5}>
                            {[
                                { name: 'name', label: 'Name' },
                                { name: 'fatherName', label: 'Father Name' },
                                { name: 'joiningDate', label: 'Joining Date', type: 'date' },
                                { name: 'phoneNumber', label: 'Phone Number' },
                                { name: 'employeeId', label: 'Employee ID' },
                            ].map(({ name, label, type = 'text' }) => (
                                <Box w="100%" key={name}>
                                    <FormLabel fontWeight="medium" color="gray.700">
                                        {label}
                                    </FormLabel>
                                    <Input
                                        type={type}
                                        name={name}
                                        value={form[name]}
                                        onChange={handleChange}
                                        {...inputStyle}
                                        size="lg"
                                    />
                                </Box>
                            ))}
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={handleSave}
                            bg="#309689"
                            color="white"
                            _hover={{ bg: '#247a70' }}
                            rounded="12px"
                            px={8}
                            size="lg"
                            mr={3}
                        >
                            Save Member
                        </Button>
                        <Button
                            onClick={onClose}
                            variant="outline"
                            rounded="12px"
                            size="lg"
                            borderColor="gray.300"
                            _hover={{ bg: 'gray.100' }}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Member Table */}
            <TableContainer
                bg="white"
                rounded="12px"
                shadow="md"
                borderWidth="1px"
                borderColor="gray.200"
            >
                <Table variant="simple">
                    <Thead bg="gray.100">
                        <Tr>
                            <Th color="#309689" fontSize="md" py={4}>Name</Th>
                            <Th color="#309689" fontSize="md" py={4}>Father Name</Th>
                            <Th color="#309689" fontSize="md" py={4}>Phone</Th>
                            <Th color="#309689" fontSize="md" py={4}>Employee ID</Th>
                            <Th color="#309689" fontSize="md" py={4}>Joining Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {members.length === 0 ? (
                            <Tr>
                                <Td colSpan={5} textAlign="center" py={8} color="gray.500">
                                    No members added yet.
                                </Td>
                            </Tr>
                        ) : (
                            members.map((m) => (
                                <Tr key={m._id} _hover={{ bg: 'gray.50' }}>
                                    <Td fontWeight="medium" color="#309689">{m.name}</Td>
                                    <Td color="gray.600">{m.fatherName}</Td>
                                    <Td color="gray.600">{m.phoneNumber}</Td>
                                    <Td color="gray.600">{m.employeeId}</Td>
                                    <Td color="gray.600">
                                        {new Date(m.joiningDate).toLocaleDateString()}
                                    </Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
}