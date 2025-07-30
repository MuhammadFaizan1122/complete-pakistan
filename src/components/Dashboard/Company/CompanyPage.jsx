'use client';
import {
    Box, Button, Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalBody, ModalCloseButton,
    useDisclosure, useToast, Table, Thead, Tbody,
    Tr, Th, Td, TableContainer, IconButton, Text, SimpleGrid
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { HiOutlineDuplicate  } from 'react-icons/hi';
import { FaRegEye, FaEdit, FaTrash } from 'react-icons/fa';
import { CompanyForm } from './CompanyForm';
import { ViewCompanyModal } from './ViewCompanyModal';
import { handleCreateCompany, handleGetCompanies, handleUpdateCompany, handleDeleteCompany } from '../../../handlers/companies/companies';
import { handleUpload } from '../../../handlers/contentUploading/contentUploading';

// Main Company Page Component
export default function CompanyPage() {
    const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
    const { data: session } = useSession();
    const toast = useToast();

    const [companies, setCompanies] = useState([]);
    const [form, setForm] = useState({
        name: '',
        city: '',
        country: '',
        permission_number: '',
        idNumber: '',
        visaNumber: '',
        visaAuthorizedTrade: [{
            salary: '',
            currency: 'USD',
            authorized_trade: '',
            required_trade: '',
            quantity: 1,
            dutyTimings: '8 hours/day',
            overtime: 'yes',
            benefits: ['Medical Insurance'],
            contractPeriod: '2 years',
            NAVTAC: '',
        }],
    });
    // console.log('form', form)
    const [errors, setErrors] = useState({});
    const [selectedCompany, setSelectedCompany] = useState(null);

    const fetchCompanies = async () => {
        if (!session?.user?.id) return;
        const res = await handleGetCompanies(session.user.id);
        setCompanies(res || companies);
    };

    useEffect(() => {
        fetchCompanies();
    }, [session]);

    const validateForm = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = 'Name is required';
        if (!form.city) newErrors.city = 'City is required';
        if (!form.country) newErrors.country = 'Country is required';
        if (!form.permission_number) newErrors.permission_number = 'Permission Number is required';
        if (!form.idNumber) newErrors.idNumber = 'ID Number is required';

        form.visaAuthorizedTrade.forEach((trade, index) => {
            if (!trade.salary) newErrors[`visaAuthorizedTrade_${index}_salary`] = 'Salary is required';
            if (!trade.authorized_trade) newErrors[`visaAuthorizedTrade_${index}_authorized_trade`] = 'Authorized Trade is required';
            if (!trade.required_trade) newErrors[`visaAuthorizedTrade_${index}_required_trade`] = 'Required Trade is required';
            if (!trade.quantity || trade.quantity < 1) newErrors[`visaAuthorizedTrade_${index}_quantity`] = 'Quantity must be at least 1';
            if (!trade.NAVTAC) newErrors[`visaAuthorizedTrade_${index}_NAVTAC`] = 'NAVTAC is required';
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e, index = 0, field = null) => {
        if (field) {
            setForm({
                ...form,
                visaAuthorizedTrade: form.visaAuthorizedTrade.map((trade, i) =>
                    i === index ? { ...trade, [field]: field === 'quantity' ? parseInt(e.target.value) || '' : e.target.value } : trade
                ),
            });
        } else {
            setForm({ ...form, [e.target.name]: e.target.name === 'permission_number' ? parseInt(e.target.value) || '' : e.target.value });
        }
    };

    const handleBenefitsChange = (values, index) => {
        setForm({
            ...form,
            visaAuthorizedTrade: form.visaAuthorizedTrade.map((trade, i) =>
                i === index ? { ...trade, benefits: values } : trade
            ),
        });
    };

    const handleCreate = async () => {
        if (!validateForm()) {
            toast({
                title: 'Validation Error',
                description: 'Please fill all required fields',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        let uploadedLogoUrl = '';
        if (form.logo && typeof form.logo === 'object') {
            const uploadRes = await handleUpload(form.logo);
            console.log('payload', uploadRes)
            uploadedLogoUrl = uploadRes?.data?.url || '';
        }

        const payload = {
            ...form,
            userId: session?.user?.id,
            logo: uploadedLogoUrl,
        };
        console.log('payload', payload)
        const res = await handleCreateCompany(payload);

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
            title: 'Company Added',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });

        onCreateClose();
        fetchCompanies();
        resetForm();
    };

    const handleEdit = (company) => {
        setSelectedCompany(company);
        setForm({
            ...company,
            visaAuthorizedTrade: company.visaAuthorizedTrade.length > 0 ? company.visaAuthorizedTrade.map(trade => ({
                ...trade,
                authorized_trade: trade.authorized_trade || '',
                required_trade: trade.required_trade || '',
                quantity: trade.quantity || 1,
            })) : [{
                salary: '',
                currency: 'USD',
                authorized_trade: '',
                required_trade: '',
                quantity: 1,
                dutyTimings: '8 hours/day',
                overtime: 'yes',
                benefits: ['Medical Insurance'],
                contractPeriod: '2 years',
                NAVTAC: '',
            }],
        });
        onEditOpen();
    };

    const handleUpdate = async () => {
        if (!validateForm()) {
            toast({
                title: 'Validation Error',
                description: 'Please fill all required fields',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const payload = {
            ...form,
            userId: session?.user?.id,
            _id: selectedCompany._id,
        };

        const res = await handleUpdateCompany(payload);

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
            title: 'Company Updated',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });

        onEditClose();
        fetchCompanies();
        resetForm();
    };

    const handleDelete = async (id) => {
        const res = await handleDeleteCompany(id);

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
            title: 'Company Deleted',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });

        fetchCompanies();
    };

    const handleView = (company) => {
        setSelectedCompany(company);
        onViewOpen();
    };

    const resetForm = () => {
        setForm({
            name: '',
            city: '',
            country: '',
            permission_number: '',
            idNumber: '',
            visaAuthorizedTrade: [{
                salary: '',
                currency: 'USD',
                authorized_trade: '',
                required_trade: '',
                quantity: 1,
                dutyTimings: '8 hours/day',
                overtime: 'yes',
                benefits: ['Medical Insurance'],
                contractPeriod: '2 years',
                NAVTAC: '',
            }],
        });
        setErrors({});
        setSelectedCompany(null);
    };

    const handleOpenCreateModal = () => {
        resetForm();
        onCreateOpen();
    };

    return (
        <Box p={{ base: 4, md: 6 }} bg="gray.50" minH="100vh">
            <Button
                onClick={handleOpenCreateModal}
                bg="#309689"
                color="white"
                _hover={{ bg: '#247a70' }}
                rounded="12px"
                px={{ base: 6, md: 8 }}
                py={{ base: 4, md: 6 }}
                fontWeight="semibold"
                mb={8}
                size="lg"
            >
                + Add New Company
            </Button>

            {/* Create Company Modal */}
            <Modal isOpen={isCreateOpen} onClose={onCreateClose} isCentered size={{ base: 'full', md: '3xl' }}>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
                <ModalContent rounded="16px" p={{ base: 2, md: 4 }}>
                    <ModalHeader color="#309689" fontSize="2xl" fontWeight="bold">
                        Add New Company
                    </ModalHeader>
                    <ModalCloseButton size="lg" />
                    <ModalBody maxH={'700px'} overflowY={'scroll'}>
                        <CompanyForm
                            form={form}
                            setForm={setForm}
                            errors={errors}
                            handleChange={handleChange}
                            handleBenefitsChange={handleBenefitsChange}
                            onSave={handleCreate}
                            onCancel={onCreateClose}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* Edit Company Modal */}
            <Modal isOpen={isEditOpen} onClose={onEditClose} isCentered size={{ base: 'full', md: '3xl' }}>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
                <ModalContent rounded="16px" p={{ base: 2, md: 4 }}>
                    <ModalHeader color="#309689" fontSize="2xl" fontWeight="bold">
                        Edit Company
                    </ModalHeader>
                    <ModalCloseButton size="lg" />
                    <ModalBody maxH={'700px'} overflowY={'scroll'}>
                        <CompanyForm
                            form={form}
                            setForm={setForm}
                            errors={errors}
                            handleChange={handleChange}
                            handleBenefitsChange={handleBenefitsChange}
                            isEdit={true}
                            onSave={handleUpdate}
                            onCancel={onEditClose}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* View Company Modal */}
            <ViewCompanyModal
                isOpen={isViewOpen}
                onClose={onViewClose}
                company={selectedCompany}
            />

            {/* Company Table */}
            <TableContainer
                bg="white"
                rounded="12px"
                shadow="md"
                borderWidth="1px"
                borderColor="gray.200"
                overflowX="auto"
            >
                <Table variant="simple" size={{ base: 'sm', md: 'md' }}>
                    <Thead bg="gray.100">
                        <Tr>
                            <Th color="#309689" fontSize={{ base: 'sm', md: 'md' }} py={4}>Name</Th>
                            <Th color="#309689" fontSize={{ base: 'sm', md: 'md' }} py={4}>City</Th>
                            <Th color="#309689" fontSize={{ base: 'sm', md: 'md' }} py={4}>Country</Th>
                            <Th color="#309689" fontSize={{ base: 'sm', md: 'md' }} py={4}>Permission Number</Th>
                            <Th color="#309689" fontSize={{ base: 'sm', md: 'md' }} py={4}>ID Number</Th>
                            <Th color="#309689" fontSize={{ base: 'sm', md: 'md' }} py={4}>Trades</Th>
                            <Th color="#309689" fontSize={{ base: 'sm', md: 'md' }} py={4}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {companies.length === 0 ? (
                            <Tr>
                                <Td colSpan={7} textAlign="center" py={8} color="gray.500">
                                    No companies added yet.
                                </Td>
                            </Tr>
                        ) : (
                            companies.map((c) => (
                                <Tr key={c._id} _hover={{ bg: 'gray.50' }}>
                                    <Td fontWeight="bold" color="#309689" fontSize={{ base: 'sm', md: 'md' }}>{c.name}</Td>
                                    <Td color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>{c.city}</Td>
                                    <Td color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>{c.country}</Td>
                                    <Td color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>{c.permission_number}</Td>
                                    <Td color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>{c.idNumber}</Td>
                                    <Td color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
                                        {c.visaAuthorizedTrade.map((trade, index) => (
                                            <Box key={index} mb={2}>
                                                {trade.authorized_trade} ({trade.salary} {trade.currency}, Qty: {trade.quantity})
                                            </Box>
                                        ))}
                                    </Td>
                                    <Td>
                                        <IconButton
                                            icon={<FaEdit />}
                                            aria-label="Edit Company"
                                            onClick={() => handleEdit(c)}
                                            colorScheme="teal"
                                            variant="outline"
                                            size="sm"
                                            mr={2}
                                        />
                                        <IconButton
                                            icon={<FaRegEye />}
                                            aria-label="View Company"
                                            onClick={() => handleView(c)}
                                            colorScheme="blue"
                                            variant="outline"
                                            size="sm"
                                            mr={2}
                                        />
                                        <IconButton
                                            icon={<HiOutlineDuplicate />}
                                            aria-label="Delete Company"
                                            // onClick={() => handleDelete(c._id)}
                                            colorScheme="yellow"
                                            variant="outline"
                                            size="sm"
                                        />
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