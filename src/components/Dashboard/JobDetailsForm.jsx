'use client'
import {
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    Button,
    Flex,
    Checkbox,
    CheckboxGroup,
    Tag,
    TagLabel,
    Wrap,
    Image,
    Box,
    FormErrorMessage,
    HStack,
} from '@chakra-ui/react';

export default function JobDetailsForm({
    formData,
    setFormData,
    keyResponsibilities,
    setKeyResponsibilities,
    selectedSkills,
    setSelectedSkills,
    selectedTags,
    setSelectedTags,
    skillsList,
    tags,
    image,
    imagePreview,
    fileInputRef,
    handleImageChange,
    errors
}) {
    return (
        <Stack spacing={4}>
            <HStack>
                <FormControl>
                    <FormLabel>License</FormLabel>
                    <Select
                        value={formData.license}
                        onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                        rounded={'12px'}
                        h="50px"
                        border="1px solid"
                        borderColor="gray.300"
                        bg="white"
                        outline="1px solid"
                        outlineColor="gray.300"
                        _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Duty Hours</FormLabel>
                    <Input
                        py={6}
                        background="white"
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="12px"
                        _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                        value={formData.dutyHours}
                        onChange={(e) => setFormData({ ...formData, dutyHours: e.target.value })}
                    />
                </FormControl>
            </HStack>
            <HStack>
            <FormControl>
                <FormLabel>Overtime</FormLabel>
                <Select
                    value={formData.overtime}
                    onChange={(e) => setFormData({ ...formData, overtime: e.target.value })}
                    rounded={'12px'}
                    h="50px"
                    border="1px solid"
                    borderColor="gray.300"
                    bg="white"
                    outline="1px solid"
                    outlineColor="gray.300"
                    _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Duration</FormLabel>
                <Input
                    py={6}
                    background="white"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="12px"
                    _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
            </FormControl>

            </HStack>
            <HStack>
            <FormControl>
                <FormLabel>Accommodation</FormLabel>
                <Select
                    value={formData.accommodation}
                    onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
                    rounded={'12px'}
                    h="50px"
                    border="1px solid"
                    borderColor="gray.300"
                    bg="white"
                    outline="1px solid"
                    outlineColor="gray.300"
                    _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                >
                    <option value="Provided">Provided</option>
                    <option value="Not Provided">Not Provided</option>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Medical Insurance</FormLabel>
                <Select
                    value={formData.medicalInsurance}
                    onChange={(e) => setFormData({ ...formData, medicalInsurance: e.target.value })}
                    rounded={'12px'}
                    h="50px"
                    border="1px solid"
                    borderColor="gray.300"
                    bg="white"
                    outline="1px solid"
                    outlineColor="gray.300"
                    _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </Select>
            </FormControl>
            </HStack>
            <HStack>
            <FormControl>
                <FormLabel>Transportation</FormLabel>
                <Select
                    value={formData.transportation}
                    onChange={(e) => setFormData({ ...formData, transportation: e.target.value })}
                    rounded={'12px'}
                    h="50px"
                    border="1px solid"
                    borderColor="gray.300"
                    bg="white"
                    outline="1px solid"
                    outlineColor="gray.300"
                    _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                >
                    <option value="Provided">Provided</option>
                    <option value="Not Provided">Not Provided</option>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Return Ticket</FormLabel>
                <Input
                    py={6}
                    background="white"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="12px"
                    _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                    value={formData.returnTicket}
                    onChange={(e) => setFormData({ ...formData, returnTicket: e.target.value })}
                />
            </FormControl>
            </HStack>
            <HStack>
            <FormControl>
                <FormLabel>First Departure</FormLabel>
                <Input
                    py={6}
                    background="white"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="12px"
                    _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                    type="date"
                    value={formData.firstDeparture}
                    onChange={(e) => setFormData({ ...formData, firstDeparture: e.target.value })}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Interview Date</FormLabel>
                <Input
                    py={6}
                    background="white"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="12px"
                    _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                    type="date"
                    value={formData.interviewDate}
                    onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
                />
            </FormControl>
            </HStack>
            <HStack>
            <FormControl>
                <FormLabel>Interview Venue</FormLabel>
                <Input
                    py={6}
                    background="white"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="12px"
                    _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                    value={formData.interviewVenue}
                    onChange={(e) => setFormData({ ...formData, interviewVenue: e.target.value })}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Interview Location</FormLabel>
                <Input
                    py={6}
                    background="white"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="12px"
                    _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                    value={formData.interviewLocation}
                    onChange={(e) => setFormData({ ...formData, interviewLocation: e.target.value })}
                />
            </FormControl>
            </HStack>
            <HStack>
            <FormControl>
                <FormLabel>Interview Address</FormLabel>
                <Input
                    py={6}
                    background="white"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="12px"
                    _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                    value={formData.interviewAddress}
                    onChange={(e) => setFormData({ ...formData, interviewAddress: e.target.value })}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Visa Number</FormLabel>
                <Input
                    py={6}
                    background="white"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="12px"
                    _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                    value={formData.visaNumber}
                    onChange={(e) => setFormData({ ...formData, visaNumber: e.target.value })}
                />
            </FormControl>
            </HStack>
            <HStack>
            <FormControl>
                <FormLabel>NAV TTC</FormLabel>
                <Select
                    value={formData.navttc}
                    onChange={(e) => setFormData({ ...formData, navttc: e.target.value })}
                    rounded={'12px'}
                    h="50px"
                    border="1px solid"
                    borderColor="gray.300"
                    bg="white"
                    outline="1px solid"
                    outlineColor="gray.300"
                    _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Visa Category</FormLabel>
                <Input
                    py={6}
                    background="white"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="12px"
                    _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                    value={formData.visaCategory}
                    onChange={(e) => setFormData({ ...formData, visaCategory: e.target.value })}
                />
            </FormControl>
            </HStack>
            <FormControl isInvalid={errors.keyResponsibilities}>
                <FormLabel>Key Responsibilities</FormLabel>
                <Stack spacing={2}>
                    {keyResponsibilities.map((item, idx) => (
                        <Flex key={idx} gap={2} align="center">
                            <Input
                                placeholder={`Responsibility ${idx + 1}`}
                                value={item}
                                bg="white"
                                py={6}
                                outline="1px solid"
                                outlineColor="gray.300"
                                borderRadius="12px"
                                _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
                                onChange={(e) => {
                                    const updated = [...keyResponsibilities];
                                    updated[idx] = e.target.value;
                                    setKeyResponsibilities(updated);
                                }}
                            />
                            <Button
                                size="sm"
                                colorScheme="red"
                                variant="ghost"
                                onClick={() => {
                                    setKeyResponsibilities((prev) => prev.filter((_, i) => i !== idx));
                                }}
                            >
                                Remove
                            </Button>
                        </Flex>
                    ))}
                    <Button
                        size="sm"
                        colorScheme="teal"
                        variant="outline"
                        onClick={() => setKeyResponsibilities((prev) => [...prev, ''])}
                        alignSelf="flex-start"
                    >
                        + Add Responsibility
                    </Button>
                </Stack>
                <FormErrorMessage>{errors.keyResponsibilities}</FormErrorMessage>
            </FormControl>

            <FormControl>
                <FormLabel>Professional Skills</FormLabel>
                <CheckboxGroup value={selectedSkills} onChange={(val) => setSelectedSkills(val)}>
                    <Wrap spacing={3}>
                        {skillsList.map((skill) => (
                            <Checkbox key={skill} value={skill}>{skill}</Checkbox>
                        ))}
                    </Wrap>
                </CheckboxGroup>
            </FormControl>

            <FormControl>
                <FormLabel>Tags</FormLabel>
                <Wrap spacing={2}>
                    {tags.map((tag) => (
                        <Tag
                            key={tag}
                            size="md"
                            variant={selectedTags.includes(tag) ? 'solid' : 'outline'}
                            bg={'#0a7450'}
                            color="#fff"
                            cursor="pointer"
                            onClick={() =>
                                setSelectedTags((prev) =>
                                    prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                                )
                            }
                        >
                            <TagLabel>{tag}</TagLabel>
                        </Tag>
                    ))}
                </Wrap>
            </FormControl>

            <FormControl isInvalid={errors.image}>
                <FormLabel>Job Banner Image</FormLabel>
                <Input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    py={2}
                    border="none"
                />
                {imagePreview && (
                    <Box mt={4}>
                        <Image src={imagePreview} alt="Banner Preview" maxH="200px" objectFit="cover" />
                    </Box>
                )}
                <FormErrorMessage>{errors.image}</FormErrorMessage>
            </FormControl>
        </Stack>
    );
}