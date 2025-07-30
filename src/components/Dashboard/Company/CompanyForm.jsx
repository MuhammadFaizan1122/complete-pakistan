'use client';
import {
    Box, Button, Input, ModalFooter, VStack, FormLabel, Select, Flex
} from '@chakra-ui/react';
import { Country, State, City } from 'country-state-city';
import { useState, useEffect } from 'react';
import { AuthorizedTradeForm } from './AuthorizedTradeForm';

const inputStyle = {
    rounded: '12px',
    bg: 'white',
    borderColor: 'gray.300',
    focusBorderColor: '#309689',
    _hover: { borderColor: '#309689' },
};

const countryCurrencyMap = {
    'United States': 'USD',
    'United Arab Emirates': 'AED',
    'Germany': 'EUR',
    'France': 'EUR',
    'Pakistan': 'PKR',
    'default': 'USD'
};

export function CompanyForm({ form, setForm, errors, handleChange, handleBenefitsChange, isEdit = false, onSave, onCancel }) {
    const [countries, setCountries] = useState(Country.getAllCountries());
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [previewLogo, setPreviewLogo] = useState(null);
    useEffect(() => {
        if (form.country) {
            const selectedCountry = countries.find((c) => c.name === form.country);
            if (selectedCountry) {
                const stateList = State.getStatesOfCountry(selectedCountry.isoCode);
                setStates(stateList);
                if (form.state) {
                    const selectedState = stateList.find((s) => s.name === form.state);
                    if (selectedState) {
                        const cityList = City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode);
                        setCities(cityList);
                    }
                }
            }
        }
    }, [form.country, form.state]);

    const addTrade = () => {
        setForm({
            ...form,
            visaAuthorizedTrade: [
                ...form.visaAuthorizedTrade,
                {
                    salary: '',
                    currency: countryCurrencyMap[form.country] || countryCurrencyMap['default'],
                    authorized_trade: '',
                    required_trade: '',
                    quantity: 1,
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

    const handleCountryChange = (e) => {
        const countryName = e.target.value;
        const selectedCountry = countries.find((c) => c.name === countryName);
        const stateList = selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : [];
        const newCurrency = countryCurrencyMap[countryName] || countryCurrencyMap['default'];

        setForm({
            ...form,
            country: countryName,
            state: '',
            city: '',
            visaAuthorizedTrade: form.visaAuthorizedTrade.map(trade => ({
                ...trade,
                currency: newCurrency
            })),
        });
        setStates(stateList);
        setCities([]);
    };

    const handleStateChange = (e) => {
        const stateName = e.target.value;
        const selectedCountry = countries.find((c) => c.name === form.country);
        const selectedState = states.find((s) => s.name === stateName);
        const cityList = selectedCountry && selectedState
            ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
            : [];

        setForm({
            ...form,
            state: stateName,
            city: '',
        });
        setCities(cityList);
    };

    const handleCityChange = (e) => {
        setForm({
            ...form,
            city: e.target.value,
        });
    };

    return (
        <VStack spacing={5}>
            <Box w="100%">
                <FormLabel fontWeight="medium" color="gray.700">Company Logo</FormLabel>
                <Input
                    type="file"
                    accept="image/*"
                    size="lg"
                    {...inputStyle}
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setPreviewLogo(reader.result); 
                            };
                            reader.readAsDataURL(file);
                            setForm(prev => ({ ...prev, logo: file }));
                        }
                    }}
                />
                {previewLogo && (
                    <Box mt={2}>
                        <img
                            src={previewLogo}
                            alt="Company Logo"
                            style={{
                                width: '120px',
                                height: 'auto',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </Box>
                )}
            </Box>

            {[
                { name: 'permission_number', label: 'Permission Number', error: errors.permission_number, type: 'number' },
                { name: 'name', label: 'Company Name', error: errors.name },
                { name: 'visaNumber', label: 'Visa Number', error: errors.visaNumber },
                { name: 'idNumber', label: 'ID Number', error: errors.idNumber },
            ].map(({ name, label, error, type = 'text' }) => (
                <Box w="100%" key={name}>
                    <FormLabel fontWeight="medium" color="gray.700">{label}</FormLabel>
                    <Input
                        type={type}
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
                <FormLabel fontWeight="medium" color="gray.700">Location</FormLabel>
                <Flex align="center" gap={2} flexDirection={{ base: 'column', md: 'row' }}>
                    <Box w={{ base: '100%', md: '33%' }}>
                        <Select
                            placeholder="Select country"
                            value={form.country}
                            onChange={handleCountryChange}
                            {...inputStyle}
                            size="lg"
                            isInvalid={!!errors.country}
                        >
                            {countries.map((c) => (
                                <option key={c.isoCode} value={c.name}>{c.name}</option>
                            ))}
                        </Select>
                        {errors.country && <Box color="red.500" fontSize="sm">{errors.country}</Box>}
                    </Box>
                    <Box w={{ base: '100%', md: '33%' }}>
                        <Select
                            placeholder="Select state"
                            value={form.state}
                            onChange={handleStateChange}
                            {...inputStyle}
                            size="lg"
                            isInvalid={!!errors.state}
                            isDisabled={!form.country}
                        >
                            {states.map((s) => (
                                <option key={s.isoCode} value={s.name}>{s.name}</option>
                            ))}
                        </Select>
                        {errors.state && <Box color="red.500" fontSize="sm">{errors.state}</Box>}
                    </Box>
                    <Box w={{ base: '100%', md: '33%' }}>
                        <Select
                            placeholder="Select city"
                            value={form.city}
                            onChange={handleCityChange}
                            {...inputStyle}
                            size="lg"
                            isInvalid={!!errors.city}
                            isDisabled={!form.state}
                        >
                            {cities.map((c) => (
                                <option key={c.name} value={c.name}>{c.name}</option>
                            ))}
                        </Select>
                        {errors.city && <Box color="red.500" fontSize="sm">{errors.city}</Box>}
                    </Box>
                </Flex>
            </Box>
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
                            selectedCountry={form.country}
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