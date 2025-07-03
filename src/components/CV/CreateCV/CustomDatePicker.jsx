'use client';
import {
  Box, Button, FormControl, FormLabel, FormErrorMessage,
  VStack, HStack, Text,
  Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, PopoverCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

export const StepwiseDatePicker = ({ name, label, errors, watch, setValue }) => {
  const [step, setStep] = useState('day');
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setStep('month');
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setStep('year');
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);

    if (selectedDay != null && selectedMonth != null) {
      const date = new Date(year, selectedMonth, selectedDay);
      setValue(name, date);
      onClose();

      // Reset for next use
      setStep('day');
      setSelectedDay(null);
      setSelectedMonth(null);
      setSelectedYear(null);
    }
  };

  const formattedDate = watch(name) ? new Date(watch(name)).toLocaleDateString() : '';

  return (
    <FormControl isInvalid={!!errors[name]}>
      <FormLabel>{label}</FormLabel>

      <Popover
        placement="bottom-start"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={() => {
          onClose();
          setStep('day');
          setSelectedDay(null);
          setSelectedMonth(null);
          setSelectedYear(null);
        }}
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <Box
            border="1px solid"
            borderColor="gray.300"
            rounded="15px"
            p={4}
            py={'13px'}
            cursor="pointer"
            bg="white"
          >
            {formattedDate || `Select ${label}`}
          </Box>
        </PopoverTrigger>

        <PopoverContent zIndex={9999}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            {step === 'day' && (
              <VStack align="start">
                <Text fontWeight="bold">Select Day</Text>
                <HStack wrap="wrap" spacing={1}>
                  {days.map(day => (
                    <Button key={day} size="sm" onClick={() => handleDaySelect(day)}>
                      {day}
                    </Button>
                  ))}
                </HStack>
              </VStack>
            )}

            {step === 'month' && (
              <VStack align="start">
                <Text fontWeight="bold">Select Month</Text>
                <HStack wrap="wrap" spacing={1}>
                  {months.map((month, index) => (
                    <Button key={month} size="sm" onClick={() => handleMonthSelect(index)}>
                      {month}
                    </Button>
                  ))}
                </HStack>
              </VStack>
            )}

            {step === 'year' && (
              <VStack align="start">
                <Text fontWeight="bold">Select Year</Text>
                <HStack wrap="wrap" spacing={1}>
                  {years.map(year => (
                    <Button key={year} size="sm" onClick={() => handleYearSelect(year)}>
                      {year}
                    </Button>
                  ))}
                </HStack>
              </VStack>
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};
