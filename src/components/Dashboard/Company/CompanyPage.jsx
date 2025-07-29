'use client';
import {
    Box, Button, Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalBody, ModalCloseButton,
    useDisclosure, useToast, Table, Thead, Tbody,
    Tr, Th, Td, TableContainer,
    IconButton
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { handleCreateCompany, handleGetCompanies, handleUpdateCompany } from '../../../handlers/companies/companies';
import { FaRegEye, FaEdit } from 'react-icons/fa';
import { CompanyForm } from './CompanyForm';
import { ViewCompanyModal } from './ViewCompanyModal';



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
        visaNumber: '',
        idNumber: '',
        visaAuthorizedTrade: [{
            permission_status: 'pending',
            visaNumber: '',
            salary: '',
            currency: 'USD',
            type: '',
            dutyTimings: '8 hours/day',
            overtime: 'yes',
            benefits: ['Medical Insurance'],
            contractPeriod: '2 years',
            NAVTAC: '',
        }],
        requiredTrade: [],
    });
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
        if (!form.visaNumber) newErrors.visaNumber = 'Visa Number is required';
        if (!form.idNumber) newErrors.idNumber = 'ID Number is required';
        if (form.requiredTrade.length === 0) newErrors.requiredTrade = 'At least one required trade is needed';

        form.visaAuthorizedTrade.forEach((trade, index) => {
            if (!trade.visaNumber) newErrors[`visaAuthorizedTrade_${index}_visaNumber`] = 'Visa Number is required';
            if (!trade.salary) newErrors[`visaAuthorizedTrade_${index}_salary`] = 'Salary is required';
            if (!trade.type) newErrors[`visaAuthorizedTrade_${index}_type`] = 'Trade Type is required';
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
                    i === index ? { ...trade, [field]: e.target.value } : trade
                ),
            });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
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

    const handleRequiredTradeChange = (values) => {
        setForm({ ...form, requiredTrade: values });
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

        const payload = {
            ...form,
            userId: session?.user?.id,
        };

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
            visaAuthorizedTrade: company.visaAuthorizedTrade.length > 0 ? company.visaAuthorizedTrade : [{
                permission_status: 'pending',
                visaNumber: '',
                salary: '',
                currency: 'USD',
                type: '',
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

    const handleView = (company) => {
        setSelectedCompany(company);
        onViewOpen();
    };

    const resetForm = () => {
        setForm({
            name: '',
            city: '',
            country: '',
            visaNumber: '',
            idNumber: '',
            visaAuthorizedTrade: [{
                permission_status: 'pending',
                visaNumber: '',
                salary: '',
                currency: 'USD',
                type: '',
                dutyTimings: '8 hours/day',
                overtime: 'yes',
                benefits: ['Medical Insurance'],
                contractPeriod: '2 years',
                NAVTAC: '',
            }],
            requiredTrade: [],
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
                            handleRequiredTradeChange={handleRequiredTradeChange}
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
                            handleRequiredTradeChange={handleRequiredTradeChange}
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
                            <Th color="#309689" fontSize={{ base: 'sm', md: 'md' }} py={4}>Visa Number</Th>
                            <Th color="#309689" fontSize={{ base: 'sm', md: 'md' }} py={4}>ID Number</Th>
                            <Th color="#309689" fontSize={{ base: 'sm', md: 'md' }} py={4}>Trades</Th>
                            <Th color="#309689" fontSize={{ base: 'sm', md: 'md' }} py={4}>Required Trades</Th>
                            <Th color="#309689" fontSize={{ base: 'sm', md: 'md' }} py={4}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {companies.length === 0 ? (
                            <Tr>
                                <Td colSpan={8} textAlign="center" py={8} color="gray.500">
                                    No companies added yet.
                                </Td>
                            </Tr>
                        ) : (
                            companies.map((c) => (
                                <Tr key={c._id} _hover={{ bg: 'gray.50' }}>
                                    <Td fontWeight="bold" color="#309689" fontSize={{ base: 'sm', md: 'md' }}>{c.name}</Td>
                                    <Td color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>{c.city}</Td>
                                    <Td color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>{c.country}</Td>
                                    <Td color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>{c.visaNumber}</Td>
                                    <Td color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>{c.idNumber}</Td>
                                    <Td color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
                                        {c.visaAuthorizedTrade.map((trade, index) => (
                                            <Box key={index} mb={2}>
                                                {trade.type} ({trade.salary} {trade.currency})
                                            </Box>
                                        ))}
                                    </Td>
                                    <Td color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>{c.requiredTrade.join(', ')}</Td>
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