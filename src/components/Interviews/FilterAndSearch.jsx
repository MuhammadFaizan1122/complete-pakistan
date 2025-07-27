import { Flex, Button, Input, Select, Icon, Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FaUsers, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import StyledSelect from "../../components/CV/CvDirectory/StyledSelect";
import StyledInput from '../CV/StyledInput';
import StyledButton from '../../utils/StyledButton';

const FilterAndSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('By Location');
    const [timeRange, setTimeRange] = useState('Today');
    const [city, setCity] = useState('');
    const [trade, setTrade] = useState('');
    const [salaryRange, setSalaryRange] = useState('');

    const handleSearch = () => {
        // Handle search logic here
        console.log('Search:', { searchQuery, filterType, timeRange, city, trade, salaryRange });
    };

    return (
        <Box
            align="center"
            gap={4}
            spacing={4}
            p={4}
            bg="white"
            borderRadius="xl"
            boxShadow="md"
            flexDirection={{ base: 'column', md: 'row' }}
            wrap="wrap"
        >
            {/* Search Bar */}
            <Flex gap={2} mb={4}>
                <StyledInput
                    placeholder="Search by agency, company, or trade..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <StyledButton
                    onClick={handleSearch}
                    title="Search"
                    w={{ base: 'full', md: '150px' }}
                />
            </Flex>

            {/* Filter Type Buttons */}
            <Flex gap={2} mt={{ base: 2, md: 0 }} mb={4}>
                <StyledButton
                    variant={filterType === 'All Interviews' ? 'solid' : 'outline'}
                    onClick={() => setFilterType('All Interviews')}
                    leftIcon={<Icon as={FaUsers} />}
                    title="All Interviews"
                />

                <StyledButton
                    variant={filterType === 'By Agency/TTQ' ? 'solid' : 'outline'}
                    onClick={() => setFilterType('By Agency/TTQ')}
                    leftIcon={<Icon as={FaUsers} />}
                    title="By Agency/TTQ"
                />

                <StyledButton
                    variant={filterType === 'By Company' ? 'solid' : 'outline'}
                    onClick={() => setFilterType('By Company')}
                    leftIcon={<Icon as={FaBuilding} />}
                    title="By Company"
                />
                <StyledButton
                    variant={filterType === 'By Location' ? 'solid' : 'outline'}
                    onClick={() => setFilterType('By Location')}
                    leftIcon={<Icon as={FaMapMarkerAlt} />}
                    title="By Company"
                />
            </Flex>

            {/* Time Range Buttons */}
            <Flex gap={2} mt={{ base: 2, md: 0 }} mb={4}>
                <Button
                    variant={timeRange === 'Today' ? 'solid' : 'outline'}
                    onClick={() => setTimeRange('Today')}
                    colorScheme="teal"
                    size="sm"
                >
                    Today
                </Button>
                <Button
                    variant={timeRange === 'This Week' ? 'solid' : 'outline'}
                    onClick={() => setTimeRange('This Week')}
                    colorScheme="teal"
                    size="sm"
                >
                    This Week
                </Button>
                <Button
                    variant={timeRange === 'This Month' ? 'solid' : 'outline'}
                    onClick={() => setTimeRange('This Month')}
                    colorScheme="teal"
                    size="sm"
                >
                    This Month
                </Button>
            </Flex>

            {/* Filter Inputs */}
            <Flex gap={4} mt={{ base: 2, md: 0 }} flex="1" align="center">
                <Box w={'full'}>
                    <Text textAlign="left" mb={1} fontWeight="semibold"  >
                        City/Location
                    </Text>
                    <StyledSelect
                        placeholder="City/Location"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    >
                        <option value="Riyadh">Riyadh</option>
                        <option value="Jeddah">Jeddah</option>
                        <option value="Dammam">Dammam</option>
                    </StyledSelect>
                </Box>
                <Box w={'full'}>
                    <Text textAlign="left" mb={1} fontWeight="semibold"  >
                        Trade/Profession
                    </Text>
                    <StyledInput
                        placeholder="Trade/Profession"
                        value={trade}
                        onChange={(e) => setTrade(e.target.value)}
                        w={{ md: 'full' }}

                        borderColor="gray.200"
                        _placeholder={{ color: 'gray.400' }}
                    />
                </Box>
                <Box w="full">
                    <Text textAlign="left" mb={1} fontWeight="semibold"  >
                        Salary Range
                    </Text>
                    <StyledInput
                        placeholder="Salary Range"
                        value={salaryRange}
                        onChange={(e) => setSalaryRange(e.target.value)}
                        w={{ md: 'full' }}
                        borderColor="gray.200"
                        _placeholder={{ color: 'gray.400' }}
                    />
                </Box>
            </Flex>
        </Box>
    );
};

export default FilterAndSearch;