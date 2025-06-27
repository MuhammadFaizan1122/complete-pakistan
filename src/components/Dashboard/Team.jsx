'use client';

import {
    Box, Button, Input, Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    useDisclosure, useToast, VStack, Text, HStack, FormLabel,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { handleCreateMember, handleGetMembers } from '../../handlers/members/members';
import { useSession } from 'next-auth/react';


export default function MemberPage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: session } = useSession();
    const toast = useToast();

    const [members, setMembers] = useState([]);
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
        setMembers(res);
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
    };

    return (
        <Box p={6}>
            <Button
                onClick={onOpen}
                bg="#309689"
                color="white"
                _hover={{ bg: '#247a70' }}
                rounded="10px"
                px={6}
                py={5}
                fontWeight="semibold"
                mb={6}
            >
                + Add Member
            </Button>

            {/* Modal Form */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
                <ModalOverlay />
                <ModalContent rounded="16px">
                    <ModalHeader color="#309689">Add New Member</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            {[
                                { name: 'name', label: 'Name' },
                                { name: 'fatherName', label: 'Father Name' },
                                { name: 'joiningDate', label: 'Joining Date', type: 'date' },
                                { name: 'phoneNumber', label: 'Phone Number' },
                                { name: 'employeeId', label: 'Employee ID' },
                            ].map(({ name, label, type = 'text' }) => (
                                <Box w="100%" key={name}>
                                    <FormLabel>{label}</FormLabel>
                                    <Input
                                        type={type}
                                        name={name}
                                        value={form[name]}
                                        onChange={handleChange}
                                        {...inputStyle}
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
                            rounded="10px"
                            px={6}
                            mr={3}
                        >
                            Save Member
                        </Button>
                        <Button onClick={onClose} variant="ghost" rounded="10px">
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Member List */}
            <VStack align="start" spacing={4} mt={6}>
                {members.length === 0 ? (
                    <Text color="gray.500">No members added yet.</Text>
                ) : (
                    members.map((m) => (
                        <Box
                            key={m._id}
                            borderWidth="1px"
                            borderColor="gray.200"
                            p={4}
                            rounded="12px"
                            w="100%"
                            bg="white"
                            shadow="sm"
                        >
                            <HStack spacing={6} flexWrap="wrap">
                                <Text fontWeight="semibold" color="#309689">
                                    {m.name}
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                    Father: {m.fatherName}
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                    Phone: {m.phoneNumber}
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                    Employee ID: {m.employeeId}
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                    Joined: {new Date(m.joiningDate).toLocaleDateString()}
                                </Text>
                            </HStack>
                        </Box>
                    ))
                )}
            </VStack>
        </Box>
    );
}
