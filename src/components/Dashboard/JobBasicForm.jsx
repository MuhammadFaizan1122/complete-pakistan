'use client'
import {
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    Textarea,
    HStack,
    Flex,
    FormErrorMessage,
} from '@chakra-ui/react';

export default function JobBasicInfoForm({
    formData,
    setFormData,
    countries,
    states,
    industryList,
    categoryList,
    jobTypes,
    errors,
    handleCountryChange,
    handleStateChange,
    handleIndustryChange,
    handleCategoryChange
}) {
    return (
        <Stack spacing={4}>
            <HStack>
                <FormControl isRequired isInvalid={errors.jobTitle}>
                    <FormLabel>Job Title</FormLabel>
                    <Input
                        py={6}
                        background="white"
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="12px"
                        _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                        placeholder="e.g., Corporate Solutions Executive"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    />
                    <FormErrorMessage>{errors.jobTitle}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={errors.companyName}>
                    <FormLabel>Company Name</FormLabel>
                    <Input
                        py={6}
                        background="white"
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="12px"
                        _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                        placeholder="e.g., Lather and Sons"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                    <FormErrorMessage>{errors.companyName}</FormErrorMessage>
                </FormControl>
            </HStack>
            <FormControl isRequired isInvalid={errors.jobType}>
                <FormLabel>Job Type</FormLabel>
                <Select
                    placeholder="Select type"
                    rounded={'12px'}
                    h="50px"
                    border="1px solid"
                    borderColor="gray.300"
                    bg="white"
                    outline="1px solid"
                    outlineColor="gray.300"
                    _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                    value={formData.jobType}
                    onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                >
                    {jobTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </Select>
                <FormErrorMessage>{errors.jobType}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.country}>
                <FormLabel>Location</FormLabel>
                <HStack>
                    <Select
                        placeholder="Country"
                        rounded={'15px'}
                        h="50px"
                        border="1px solid"
                        borderColor="gray.300"
                        bg="white"
                        outline="1px solid"
                        outlineColor="gray.300"
                        _focus={{ ring: 2, ringColor: '#0a7450', borderColor: 'transparent', outline: 'none' }}
                        _active={{ outline: 'none' }}
                        transition="all 0.2s"
                        value={formData.country}
                        onChange={handleCountryChange}
                    >
                        {countries.map((c) => (
                            <option key={c.isoCode} value={c.name}>{c.name}</option>
                        ))}
                    </Select>
                    <Select
                        placeholder="State"
                        rounded={'15px'}
                        h="50px"
                        border="1px solid"
                        borderColor="gray.300"
                        bg="white"
                        outline="1px solid"
                        outlineColor="gray.300"
                        _focus={{ ring: 2, ringColor: '#0a7450', borderColor: 'transparent', outline: 'none' }}
                        _active={{ outline: 'none' }}
                        transition="all 0.2s"
                        value={formData.state}
                        onChange={handleStateChange}
                    >
                        {states.map((s) => (
                            <option key={s.isoCode} value={s.name}>{s.name}</option>
                        ))}
                    </Select>
                </HStack>
                <FormErrorMessage>{errors.country}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.salaryMin}>
                <FormLabel>Salary Range (USD)</FormLabel>
                <Flex gap={2}>
                    <Input
                        py={6}
                        background="white"
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="12px"
                        _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                        placeholder="Min"
                        type="number"
                        value={formData.salaryMin}
                        onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                    />
                    <Input
                        py={6}
                        background="white"
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="12px"
                        _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                        placeholder="Max"
                        type="number"
                        value={formData.salaryMax}
                        onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                    />
                </Flex>
                <FormErrorMessage>{errors.salaryMin}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.industry}>
                <FormLabel>Industry</FormLabel>
                <HStack>
                    <Select
                        placeholder="Industry"
                        value={formData.industry}
                        onChange={handleIndustryChange}
                        w="full"
                        h="50px"
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="12px"
                        bg="white"
                        outline="1px solid"
                        outlineColor="gray.300"
                        _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                        _active={{ outline: "none" }}
                        transition="all 0.2s"
                    >
                        {industryList.map((item) => (
                            <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                    </Select>
                    <Select
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleCategoryChange}
                        w="full"
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="12px"
                        h="50px"
                        bg="white"
                        outline="1px solid"
                        outlineColor="gray.300"
                        _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                        _active={{ outline: "none" }}
                        transition="all 0.2s"
                    >
                        {categoryList.map((item) => (
                            <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                    </Select>
                </HStack>
                <FormErrorMessage>{errors.industry}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.jobDescription}>
                <FormLabel>Job Description</FormLabel>
                <Textarea
                mb={4}
                    border="1px solid"
                    borderColor="gray.300"
                    bg="white"
                    outline="1px solid"
                    outlineColor="gray.300"
                    borderRadius="12px"
                    _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                    placeholder="Enter full job description..."
                    rows={5}
                    value={formData.jobDescription}
                    onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                />
                <FormErrorMessage>{errors.jobDescription}</FormErrorMessage>
            </FormControl>
        </Stack>
    );
}