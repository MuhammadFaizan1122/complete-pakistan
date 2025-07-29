'use client';
import {
    Box, Input, VStack, FormLabel, Select, Checkbox, CheckboxGroup,
    IconButton, Text
} from '@chakra-ui/react';
import { MdOutlineDelete } from 'react-icons/md';

const inputStyle = {
    rounded: '12px',
    bg: 'white',
    borderColor: 'gray.300',
    focusBorderColor: '#309689',
    _hover: { borderColor: '#309689' },
};

export function AuthorizedTradeForm({ trade, index, errors, handleChange, handleBenefitsChange, removeTrade }) {
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
                <Box w="100%">
                    <FormLabel>Visa Number</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter visa number"
                        value={trade.visaNumber}
                        onChange={(e) => handleChange(e, index, 'visaNumber')}
                        {...inputStyle}
                        size="lg"
                        isInvalid={!!errors[`visaAuthorizedTrade_${index}_visaNumber`]}
                    />
                    {errors[`visaAuthorizedTrade_${index}_visaNumber`] && (
                        <Box color="red.500" fontSize="sm">{errors[`visaAuthorizedTrade_${index}_visaNumber`]}</Box>
                    )}
                </Box>
                <Box w="100%">
                    <FormLabel>Salary</FormLabel>
                    <Input
                        type="number"
                        placeholder="Enter salary"
                        value={trade.salary}
                        onChange={(e) => handleChange(e, index, 'salary')}
                        {...inputStyle}
                        size="lg"
                        isInvalid={!!errors[`visaAuthorizedTrade_${index}_salary`]}
                    />
                    {errors[`visaAuthorizedTrade_${index}_salary`] && (
                        <Box color="red.500" fontSize="sm">{errors[`visaAuthorizedTrade_${index}_salary`]}</Box>
                    )}
                </Box>
                <Box w="100%">
                    <FormLabel>Currency</FormLabel>
                    <Select
                        value={trade.currency}
                        onChange={(e) => handleChange(e, index, 'currency')}
                        {...inputStyle}
                        size="lg"
                    >
                        <option value="USD">USD</option>
                        <option value="AED">AED</option>
                        <option value="EUR">EUR</option>
                    </Select>
                </Box>
                <Box w="100%">
                    <FormLabel>Trade Type</FormLabel>
                    <Select
                        value={trade.type}
                        onChange={(e) => handleChange(e, index, 'type')}
                        {...inputStyle}
                        size="lg"
                        isInvalid={!!errors[`visaAuthorizedTrade_${index}_type`]}
                    >
                        <option value="">Select Trade</option>
                        <option value="plumber">Plumber</option>
                        <option value="electrician">Electrician</option>
                    </Select>
                    {errors[`visaAuthorizedTrade_${index}_type`] && (
                        <Box color="red.500" fontSize="sm">{errors[`visaAuthorizedTrade_${index}_type`]}</Box>
                    )}
                </Box>
                <Box w="100%">
                    <FormLabel>Benefits</FormLabel>
                    <CheckboxGroup
                        value={trade.benefits}
                        onChange={(values) => handleBenefitsChange(values, index)}
                    >
                        <VStack align="start" spacing={2}>
                            <Checkbox value="Medical Insurance">Medical Insurance</Checkbox>
                            <Checkbox value="Transportation">Transportation</Checkbox>
                            <Checkbox value="Accommodation">Accommodation</Checkbox>
                        </VStack>
                    </CheckboxGroup>
                </Box>
                <Box w="100%">
                    <FormLabel>NAVTAC</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter NAVTAC"
                        value={trade.NAVTAC}
                        onChange={(e) => handleChange(e, index, 'NAVTAC')}
                        {...inputStyle}
                        size="lg"
                        isInvalid={!!errors[`visaAuthorizedTrade_${index}_NAVTAC`]}
                    />
                    {errors[`visaAuthorizedTrade_${index}_NAVTAC`] && (
                        <Box color="red.500" fontSize="sm">{errors[`visaAuthorizedTrade_${index}_NAVTAC`]}</Box>
                    )}
                </Box>
            </VStack>
        </Box>
    );
}
