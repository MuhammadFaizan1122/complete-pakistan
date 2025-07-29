'use client';
import {
    Box, Button, Input, ModalFooter, VStack, FormLabel, Checkbox, CheckboxGroup
} from '@chakra-ui/react';

import { AuthorizedTradeForm } from './AuthorizedTradeForm';

const inputStyle = {
    rounded: '12px',
    bg: 'white',
    borderColor: 'gray.300',
    focusBorderColor: '#309689',
    _hover: { borderColor: '#309689' },
};

export function CompanyForm({ form, setForm, errors, handleChange, handleBenefitsChange, handleRequiredTradeChange, isEdit = false, onSave, onCancel }) {
    const addTrade = () => {
        setForm({
            ...form,
            visaAuthorizedTrade: [
                ...form.visaAuthorizedTrade,
                {
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
                },
            ],
        });
    };

    const removeTrade = (index) => {
        setForm({
            ...form,
            visaAuthorizedTrade: form.visaAuthorizedTrade.filter((_, i) => i !== index),
        });
    };

    return (
        <VStack spacing={5}>
            {[
                { name: 'name', label: 'Company Name', error: errors.name },
                { name: 'city', label: 'City', error: errors.city },
                { name: 'country', label: 'Country', error: errors.country },
                { name: 'visaNumber', label: 'Visa Number', error: errors.visaNumber },
                { name: 'idNumber', label: 'ID Number', error: errors.idNumber },
            ].map(({ name, label, error }) => (
                <Box w="100%" key={name}>
                    <FormLabel fontWeight="medium" color="gray.700">{label}</FormLabel>
                    <Input
                        type="text"
                        placeholder={`Enter ${label.toLowerCase()}`}
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        {...inputStyle}
                        size="lg"
                        isInvalid={!!error}
                    />
                    {error && <Box color="red.500" fontSize="sm">{error}</Box>}
                </Box>
            ))}
            <Box w="100%">
                <FormLabel fontWeight="medium" color="gray.700">Visa Authorized Trades</FormLabel>
                <VStack spacing={4}>
                    {form.visaAuthorizedTrade.map((trade, index) => (
                        <AuthorizedTradeForm
                            key={index}
                            trade={trade}
                            index={index}
                            errors={errors}
                            handleChange={handleChange}
                            handleBenefitsChange={handleBenefitsChange}
                            removeTrade={removeTrade}
                        />
                    ))}
                    <Button
                        onClick={addTrade}
                        colorScheme="teal"
                        variant="outline"
                        size="md"
                        w="100%"
                        mt={2}
                    >
                        + Add Another Trade
                    </Button>
                </VStack>
            </Box>
            <Box w="100%">
                <FormLabel fontWeight="medium" color="gray.700">Required Trades</FormLabel>
                <CheckboxGroup
                    value={form.requiredTrade}
                    onChange={handleRequiredTradeChange}
                >
                    <VStack align="start" spacing={2}>
                        <Checkbox value="plumber">Plumber</Checkbox>
                        <Checkbox value="electrician">Electrician</Checkbox>
                    </VStack>
                </CheckboxGroup>
                {errors.requiredTrade && <Box color="red.500" fontSize="sm">{errors.requiredTrade}</Box>}
            </Box>
            <ModalFooter>
                <Button
                    onClick={onSave}
                    bg="#309689"
                    color="white"
                    _hover={{ bg: '#247a70' }}
                    rounded="12px"
                    px={8}
                    size="lg"
                    mr={3}
                >
                    {isEdit ? 'Update Company' : 'Save Company'}
                </Button>
                <Button
                    onClick={onCancel}
                    variant="outline"
                    rounded="12px"
                    size="lg"
                    borderColor="gray.300"
                    _hover={{ bg: 'gray.100' }}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </VStack>
    );
}