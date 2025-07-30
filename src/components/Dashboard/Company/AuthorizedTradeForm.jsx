'use client';
import {
    Box, Input, VStack, FormLabel, Select, IconButton, Text,
    Tag, TagLabel, TagCloseButton, HStack
} from '@chakra-ui/react';
import { MdOutlineDelete } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { handleGetNavtacs } from '../../../handlers/navtac/navtac';
import countryCurrencies from './country-currencies.json';

const inputStyle = {
    rounded: '12px',
    bg: 'white',
    borderColor: 'gray.300',
    focusBorderColor: '#309689',
    _hover: { borderColor: '#309689' },
};

const uniqueCurrencies = Array.from(
    new Map(
        countryCurrencies
            .filter(item => item.currency !== null)
            .map(item => [item.currency.code, item.currency])
    ).values()
).sort((a, b) => a.code.localeCompare(b.code));

export function AuthorizedTradeForm({
    trade,
    index,
    errors,
    handleChange,
    handleBenefitsChange,
    removeTrade,
    selectedCountry
}) {
    const [navtacs, setNavtacs] = useState([]);
    const [isLoadingNavtacs, setIsLoadingNavtacs] = useState(false);
    const [benefitInput, setBenefitInput] = useState('');

    useEffect(() => {
        const fetchNavtacs = async () => {
            setIsLoadingNavtacs(true);
            const data = await handleGetNavtacs();
            setNavtacs(data);
            setIsLoadingNavtacs(false);
        };
        fetchNavtacs();
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            const selectedCountryObj = countryCurrencies.find(c => c.name === selectedCountry);
            const currencyCode = selectedCountryObj?.currency?.code || 'USD';
            if (trade.currency !== currencyCode) {
                handleChange({ target: { value: currencyCode } }, index, 'currency');
            }
        }
    }, [selectedCountry, index, handleChange, trade.currency]);

    useEffect(() => {
        const selectedTrade = navtacs.find(n => n.name === trade.authorized_trade);
        const hasCode = selectedTrade?.code ? 'Yes' : 'No';
        if (trade.NAVTAC !== hasCode) {
            handleChange({ target: { value: hasCode } }, index, 'NAVTAC');
        }
    }, [trade.authorized_trade, navtacs, index, handleChange]);

    const handleBenefitKeyDown = (e) => {
        if (e.key === 'Enter' && benefitInput.trim()) {
            e.preventDefault();
            if (!trade.benefits.includes(benefitInput.trim())) {
                handleBenefitsChange([...trade.benefits, benefitInput.trim()], index);
                setBenefitInput('');
            }
        }
    };

    const removeBenefit = (benefitToRemove) => {
        handleBenefitsChange(trade.benefits.filter(b => b !== benefitToRemove), index);
    };

    return (
        <Box w="100%" p={4} borderWidth="1px" borderColor="gray.200" rounded="8px" bg="gray.50">
            <VStack spacing={4}>
                <Box w="100%" display="flex" justifyContent="space-between" alignItems="center">
                    <Text fontWeight="medium" color="gray.700">Trade #{index + 1}</Text>
                    {index > 0 && (
                        <IconButton
                            icon={<MdOutlineDelete />}
                            aria-label="Remove Trade"
                            onClick={() => removeTrade(index)}
                            colorScheme="red"
                            variant="outline"
                            size="sm"
                        />
                    )}
                </Box>

                {/* Authorized Trade */}
                <Box w="100%">
                    <FormLabel>Authorized Trade</FormLabel>
                    <Select
                        value={trade.authorized_trade}
                        onChange={(e) => handleChange(e, index, 'authorized_trade')}
                        {...inputStyle}
                        size="lg"
                        isInvalid={!!errors[`visaAuthorizedTrade_${index}_authorized_trade`]}
                        isDisabled={isLoadingNavtacs}
                        placeholder={isLoadingNavtacs ? 'Loading trades...' : 'Select trade'}
                    >
                        {navtacs.map((navtac) => (
                            <option key={navtac._id} value={navtac.name}>{navtac.name + ' - ' + navtac.code}</option>
                        ))}
                    </Select>
                </Box>

                {/* Required Trade */}
                <Box w="100%">
                    <FormLabel>Required Trade</FormLabel>
                    <Select
                        value={trade.required_trade}
                        onChange={(e) => handleChange(e, index, 'required_trade')}
                        {...inputStyle}
                        size="lg"
                        isDisabled={isLoadingNavtacs}
                        placeholder={isLoadingNavtacs ? 'Loading trades...' : 'Select trade'}
                    >
                        {navtacs.map((navtac) => (
                            <option key={navtac._id} value={navtac.name}>{navtac.name}</option>
                        ))}
                    </Select>
                </Box>

                {/* Quantity */}
                <Box w="100%">
                    <FormLabel>Quantity</FormLabel>
                    <Input
                        type="number"
                        value={trade.quantity}
                        onChange={(e) => handleChange(e, index, 'quantity')}
                        {...inputStyle}
                        size="lg"
                        min={1}
                    />
                </Box>

                {/* Salary */}
                <Box w="100%">
                    <FormLabel>Salary</FormLabel>
                    <Input
                        type="number"
                        value={trade.salary}
                        onChange={(e) => handleChange(e, index, 'salary')}
                        {...inputStyle}
                        size="lg"
                    />
                </Box>

                {/* Overtime */}
                <Box w="100%">
                    <FormLabel>Overtime</FormLabel>
                    <Select
                        value={trade.overtime}
                        onChange={(e) => handleChange(e, index, 'overtime')}
                        {...inputStyle}
                        size="lg"
                    >
                        <option value={'yes'}>
                            Yes
                        </option>
                        <option value={'no'}>
                            No
                        </option>
                    </Select>
                </Box>
                {/* contractPeriod */}
                <Box w="100%">
                    <FormLabel>Contract Period</FormLabel>
                    <Select
                        value={trade.contractPeriod}
                        onChange={(e) => handleChange(e, index, 'contractPeriod')}
                        {...inputStyle}
                        size="lg"
                    >
                        <option value={'3 months'}>
                            3 Months
                        </option>
                        <option value={'6 months'}>
                            6 Months
                        </option>
                        <option value={'9 months'}>
                            9 Months
                        </option>
                        <option value={'1 year'}>
                            1 Year
                        </option>
                        <option value={'1.5 year'}>
                            1.5 Year
                        </option>
                        <option value={'2 year'}>
                            2 Year
                        </option>
                    </Select>
                </Box>
                {/* Currency */}
                <Box w="100%">
                    <FormLabel>Currency</FormLabel>
                    <Select
                        value={trade.currency}
                        onChange={(e) => handleChange(e, index, 'currency')}
                        {...inputStyle}
                        size="lg"
                    >
                        {uniqueCurrencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                                {currency.code} - {currency.name}
                            </option>
                        ))}
                    </Select>
                </Box>

                {/* Benefits as tags */}
                <Box w="100%">
                    <FormLabel>Benefits</FormLabel>
                    <HStack wrap="wrap" spacing={2}>
                        {trade.benefits.map((benefit, i) => (
                            <Tag key={i} borderRadius="full" variant="solid" colorScheme="teal">
                                <TagLabel>{benefit}</TagLabel>
                                <TagCloseButton onClick={() => removeBenefit(benefit)} />
                            </Tag>
                        ))}
                    </HStack>
                    <Input
                        placeholder="Type benefit and press Enter"
                        value={benefitInput}
                        onChange={(e) => setBenefitInput(e.target.value)}
                        onKeyDown={handleBenefitKeyDown}
                        mt={2}
                        {...inputStyle}
                        size="lg"
                    />
                </Box>

                {/* NAVTAC Yes/No auto-filled */}
                <Box w="100%">
                    <FormLabel>NAVTAC</FormLabel>
                    <Select
                        value={trade.NAVTAC}
                        isDisabled
                        {...inputStyle}
                        size="lg"
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Select>
                </Box>

                {/* Working Hours */}
                <Box w="100%">
                    <FormLabel>Working Hours</FormLabel>
                    <Select
                        value={trade.working_hours}
                        onChange={(e) => handleChange(e, index, 'dutyTimings')}
                        {...inputStyle}
                        size="lg"
                        placeholder="Select working hours"
                    >
                        {[...Array(8)].map((_, i) => (
                            <option key={i + 8} value={`${i + 8}`}>{i + 8} hours</option>
                        ))}
                    </Select>
                </Box>
            </VStack>
        </Box>
    );
}
