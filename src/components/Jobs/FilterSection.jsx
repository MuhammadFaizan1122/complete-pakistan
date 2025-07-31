import {
  Box,
  Text,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  CheckboxGroup,
  Checkbox,
  Flex,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Button,
  Wrap,
  WrapItem,
  Card,
  CardBody,
  Heading,
} from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';

const FilterSection = ({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  selectedCategories,
  setSelectedCategories,
  selectedJobTypes,
  setSelectedJobTypes,
  selectedExperience,
  setSelectedExperience,
  selectedDatePosted,
  setSelectedDatePosted,
  salaryRange,
  setSalaryRange,
  selectedTags,
  setSelectedTags,
  selectedLicense,
  setSelectedLicense,
  selectedOvertime,
  setSelectedOvertime,
  selectedAccommodation,
  setSelectedAccommodation,
  selectedMedicalInsurance,
  setSelectedMedicalInsurance,
  selectedTransportation,
  setSelectedTransportation,
  selectedNavttc,
  setSelectedNavttc,
  applyFilters,
  clearAllFilters,
}) => {
  const categories = [
    { name: 'Design', count: 10 },
    { name: 'Electrical Engineering', count: 5 },
    { name: 'Telecommunications', count: 10 },
    { name: 'Hotels & Tourism', count: 10 },
    { name: 'Education', count: 10 },
    { name: 'Financial Services', count: 10 },
  ];

  const jobTypes = [
    { name: 'Full time', count: 10 },
    { name: 'Part Time', count: 10 },
    { name: 'Freelance', count: 10 },
    { name: 'Contract', count: 10 },
    { name: 'Fixed-Price', count: 10 },
  ];

  const experienceLevels = [
    { name: 'All', count: 10 },
    { name: 'No experience', count: 10 },
    { name: 'Fresher', count: 10 },
    { name: 'Intermediate', count: 10 },
    { name: 'Expert', count: 10 },
  ];

  const datePostedOptions = [
    { name: 'All', count: 10 },
    { name: 'Last Hour', count: 10 },
    { name: 'Last 24 Hours', count: 10 },
    { name: 'Last 7 Days', count: 10 },
    { name: 'Last 30 Days', count: 10 },
  ];

  const popularTags = [
    'engineering', 'design', 'office', 'creative', 'management', 'swift', 'consultant', 'Riyadh', 'Corporate',
  ];

  const yesNoOptions = ['Yes', 'No'];

  const handleTagAdd = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tag) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold" mb={3}>
          Search by Job Title
        </Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <IoSearch className="text-[15px]" />
          </InputLeftElement>
          <Input
            placeholder="Job title or company"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="white"
            size={{ base: 'sm', md: 'md' }}
          />
        </InputGroup>
      </Box>
      <Box>
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold" mb={3}>
          Location
        </Text>
        <Select
          placeholder="Choose city"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          bg="white"
          size={{ base: 'sm', md: 'md' }}
        >
          <option value="new-york">New York, USA</option>
          <option value="los-angeles">Los Angeles, USA</option>
          <option value="texas">Texas, USA</option>
          <option value="florida">Florida, USA</option>
          <option value="boston">Boston, USA</option>
          <option value="riyadh">Riyadh, Saudi Arabia</option>
        </Select>
      </Box>
      <Box>
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold" mb={3}>
          Category
        </Text>
        <CheckboxGroup value={selectedCategories} onChange={setSelectedCategories}>
          <VStack align="stretch" spacing={2}>
            {categories.map((category) => (
              <Flex key={category.name} justify="space-between" align="center">
                <Checkbox value={category.name} size="md">
                  <Text fontSize={{ base: 'sm', md: 'md' }}>{category.name}</Text>
                </Checkbox>
                <Text fontSize="sm" color="gray.500">
                  {category.count}
                </Text>
              </Flex>
            ))}
          </VStack>
        </CheckboxGroup>
      </Box>
      <Box>
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold" mb={3}>
          Job Type
        </Text>
        <CheckboxGroup value={selectedJobTypes} onChange={setSelectedJobTypes}>
          <VStack align="stretch" spacing={2}>
            {jobTypes.map((type) => (
              <Flex key={type.name} justify="space-between" align="center">
                <Checkbox value={type.name} size="md">
                  <Text fontSize={{ base: 'sm', md: 'md' }}>{type.name}</Text>
                </Checkbox>
                <Text fontSize="sm" color="gray.500">
                  {type.count}
                </Text>
              </Flex>
            ))}
          </VStack>
        </CheckboxGroup>
      </Box>
      <Box>
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold" mb={3}>
          Experience Level
        </Text>
        <CheckboxGroup value={selectedExperience} onChange={setSelectedExperience}>
          <VStack align="stretch" spacing={2}>
            {experienceLevels.map((level) => (
              <Flex key={level.name} justify="space-between" align="center">
                <Checkbox value={level.name} size="md">
                  <Text fontSize={{ base: 'sm', md: 'md' }}>{level.name}</Text>
                </Checkbox>
                <Text fontSize="sm" color="gray.500">
                  {level.count}
                </Text>
              </Flex>
            ))}
          </VStack>
        </CheckboxGroup>
      </Box>
      <Box>
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold" mb={3}>
          Date Posted
        </Text>
        <CheckboxGroup value={selectedDatePosted} onChange={setSelectedDatePosted}>
          <VStack align="stretch" spacing={2}>
            {datePostedOptions.map((option) => (
              <Flex key={option.name} justify="space-between" align="center">
                <Checkbox value={option.name} size="md">
                  <Text fontSize={{ base: 'sm', md: 'md' }}>{option.name}</Text>
                </Checkbox>
                <Text fontSize="sm" color="gray.500">
                  {option.count}
                </Text>
              </Flex>
            ))}
          </VStack>
        </CheckboxGroup>
      </Box>
      <Box>
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold" mb={3}>
          Salary
        </Text>
        <VStack spacing={4}>
          <RangeSlider
            value={salaryRange}
            onChange={setSalaryRange}
            min={0}
            max={100000}
            step={1000}
            size={{ base: 'sm', md: 'md' }}
          >
            <RangeSliderTrack bg="gray.200">
              <RangeSliderFilledTrack bg="#0a7450" />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={4} index={0} />
            <RangeSliderThumb boxSize={4} index={1} />
          </RangeSlider>
          <Flex justify="space-between" w="full">
            <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600">
              ${salaryRange[0].toLocaleString()}
            </Text>
            <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600">
              ${salaryRange[1].toLocaleString()}
            </Text>
          </Flex>
          <Button
            bg={'#0a7450'}
            color={'white'}
            size={{ base: 'sm', md: 'md' }}
            w="full"
            rounded={'8px'}
            onClick={applyFilters}
          >
            Filter
          </Button>
        </VStack>
      </Box>
      <Box>
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold" mb={3}>
          License
        </Text>
        <Select
          value={selectedLicense}
          onChange={(e) => setSelectedLicense(e.target.value)}
          bg="white"
          size={{ base: 'sm', md: 'md' }}
          placeholder="Select License"
        >
          <option value="">All</option>
          {yesNoOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
      </Box>
      <Box>
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold" mb={3}>
          Overtime
        </Text>
        <Select
          value={selectedOvertime}
          onChange={(e) => setSelectedOvertime(e.target.value)}
          bg="white"
          size={{ base: 'sm', md: 'md' }}
          placeholder="Select Overtime"
        >
          <option value="">All</option>
          {yesNoOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
      </Box>
      <Box>
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold" mb={3}>
          Accommodation
        </Text>
        <Select
          value={selectedAccommodation}
          onChange={(e) => setSelectedAccommodation(e.target.value)}
          bg="white"
          size={{ base: 'sm', md: 'md' }}
          placeholder="Select Accommodation"
        >
          <option value="">All</option>
          <option value="Provided">Provided</option>
          <option value="Not Provided">Not Provided</option>
        </Select>
      </Box>
      <Box>
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold" mb={3}>
          Medical Insurance
        </Text>
        <Select
          value={selectedMedicalInsurance}
          onChange={(e) => setSelectedMedicalInsurance(e.target.value)}
          bg="white"
          size={{ base: 'sm', md: 'md' }}
          placeholder="Select Medical Insurance"
        >
          <option value="">All</option>
          {yesNoOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
      </Box>
      <Box>
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold" mb={3}>
          Transportation
        </Text>
        <Select
          value={selectedTransportation}
          onChange={(e) => setSelectedTransportation(e.target.value)}
          bg="white"
          size={{ base: 'sm', md: 'md' }}
          placeholder="Select Transportation"
        >
          <option value="">All</option>
          <option value="Provided">Provided</option>
          <option value="Not Provided">Not Provided</option>
        </Select>
      </Box>
      <Box>
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold" mb={3}>
          NAV TTC
        </Text>
        <Select
          value={selectedNavttc}
          onChange={(e) => setSelectedNavttc(e.target.value)}
          bg="white"
          size={{ base: 'sm', md: 'md' }}
          placeholder="Select NAV TTC"
        >
          <option value="">All</option>
          {yesNoOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
      </Box>
      <Box>
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold" mb={3}>
          Tags
        </Text>
        <Wrap spacing={2}>
          {popularTags.map((tag) => (
            <WrapItem key={tag}>
              <Button
                size={{ base: 'xs', md: 'sm' }}
                variant={selectedTags.includes(tag) ? "solid" : "outline"}
                bg={'#0a7450'}
                color={'white'}
                onClick={() => selectedTags.includes(tag) ? handleTagRemove(tag) : handleTagAdd(tag)}
              >
                {tag}
              </Button>
            </WrapItem>
          ))}
        </Wrap>
        {selectedTags.length > 0 && (
          <VStack mt={3} align="stretch">
            <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600">Selected Tags:</Text>
            <Wrap spacing={1}>
              {selectedTags.map((tag) => (
                <WrapItem key={tag}>
                  <Tag size="md" bg={'#0a7450'} color={'white'} variant="solid">
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton onClick={() => handleTagRemove(tag)} />
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </VStack>
        )}
      </Box>
      <Button
        variant="outline"
        colorScheme="red"
        size={{ base: 'sm', md: 'md' }}
        onClick={clearAllFilters}
      >
        Clear All Filters
      </Button>
      <Card bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" color="white" rounded="xl">
        <CardBody p={{ base: 4, md: 6 }} textAlign="center">
          <VStack spacing={3}>
            <Heading size={{ base: 'sm', md: 'md' }}>WE ARE HIRING</Heading>
            <Text fontSize={{ base: 'xs', md: 'sm' }}>Apply Today!</Text>
            <Button colorScheme="whiteAlpha" size={{ base: 'xs', md: 'sm' }}>
              Learn More
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default FilterSection;