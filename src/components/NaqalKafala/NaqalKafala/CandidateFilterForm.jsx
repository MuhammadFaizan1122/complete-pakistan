'use client'
import { useState, useEffect } from "react";
import { Card, CardBody, FormControl, FormLabel, Select, Checkbox, Button, SimpleGrid, Grid, Icon, Text, Box } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

const CandidateFilterForm = ({ candidates }) => {
  const [filters, setFilters] = useState({
    country: "",
    state: "",
    city: "",
    profession: "",
    iqamaStatus: "",
    languages: [],
    hasDrivingLicense: false,
    jobSwitch: false,
    azadVisa: false,
  });
  const [filteredCandidates, setFilteredCandidates] = useState(candidates);

  // Extract unique values for dropdowns
  const countries = [...new Set(candidates.map(c => c.country))].sort();
  const states = [...new Set(candidates.map(c => c.state))].sort();
  const cities = [...new Set(candidates.map(c => c.city))].sort();
  const professions = [...new Set(candidates.map(c => c.profession))].sort();
  const iqamaStatuses = [...new Set(candidates.map(c => c.iqamaStatus))].sort();
  const languages = [...new Set(candidates.flatMap(c => c.experties))].sort();

  useEffect(() => {
    let result = [...candidates];
    
    if (filters.country) {
      result = result.filter(c => c.country === filters.country);
    }
    if (filters.state) {
      result = result.filter(c => c.state === filters.state);
    }
    if (filters.city) {
      result = result.filter(c => c.city === filters.city);
    }
    if (filters.profession) {
      result = result.filter(c => c.profession === filters.profession);
    }
    if (filters.iqamaStatus) {
      result = result.filter(c => c.iqamaStatus === filters.iqamaStatus);
    }
    if (filters.languages.length > 0) {
      result = result.filter(c => 
        filters.languages.every(lang => c.experties.includes(lang))
      );
    }
    if (filters.jobSwitch) {
      result = result.filter(c => c.status === "approved");
    }
    if (filters.azadVisa) {
      result = result.filter(c => c.iqamaStatus.toLowerCase().includes("azad"));
    }

    setFilteredCandidates(result);
  }, [filters, candidates]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleLanguageChange = (lang) => {
    setFilters(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  return (
    <Card
      variant="outline"
      p={{ base: 4, md: 6 }}
      bg="white"
      borderRadius="xl"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
      maxW="1440px"
      mx="auto"
    >
      <CardBody>
        <Text
          fontWeight="bold"
          fontSize={{ base: "md", md: "lg" }}
          mb={4}
          display="flex"
          alignItems="center"
        >
          <Icon as={FaUser} color="blue.500" mr={2} boxSize={{ base: 4, md: 5 }} /> Find Skilled Candidates
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 2, md: 4 }}>
          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Select Country</FormLabel>
            <Select
              placeholder="Select Country"
              variant="outline"
              bg="gray.50"
              size={{ base: "sm", md: "md" }}
              value={filters.country}
              onChange={(e) => handleFilterChange("country", e.target.value)}
            >
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Province/State</FormLabel>
            <Select
              placeholder="Province/State"
              variant="outline"
              bg="gray.50"
              size={{ base: "sm", md: "md" }}
              value={filters.state}
              onChange={(e) => handleFilterChange("state", e.target.value)}
            >
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>City</FormLabel>
            <Select
              placeholder="City"
              variant="outline"
              bg="gray.50"
              size={{ base: "sm", md: "md" }}
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Profession</FormLabel>
            <Select
              placeholder="Profession"
              variant="outline"
              bg="gray.50"
              size={{ base: "sm", md: "md" }}
              value={filters.profession}
              onChange={(e) => handleFilterChange("profession", e.target.value)}
            >
              {professions.map(profession => (
                <option key={profession} value={profession}>{profession}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Iqama Status</FormLabel>
            <Select
              placeholder="Iqama Status"
              variant="outline"
              bg="gray.50"
              size={{ base: "sm", md: "md" }}
              value={filters.iqamaStatus}
              onChange={(e) => handleFilterChange("iqamaStatus", e.target.value)}
            >
              {iqamaStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </Select>
          </FormControl>
        </SimpleGrid>
        <Box mt={{ base: 4, md: 6 }} textAlign="left">
          <FormLabel fontSize={{ base: "sm", md: "md" }}>Languages</FormLabel>
          <Grid templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)" }} gap={2}>
            {languages.map(lang => (
              <Checkbox
                key={lang}
                colorScheme="blue"
                mb={2}
                size={{ base: "sm", md: "md" }}
                isChecked={filters.languages.includes(lang)}
                onChange={() => handleLanguageChange(lang)}
              >
                {lang}
              </Checkbox>
            ))}
          </Grid>
        </Box>
        <Box mt={{ base: 4, md: 6 }} textAlign="left">
          <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={2}>
            <Checkbox
              colorScheme="blue"
              mb={2}
              size={{ base: "sm", md: "md" }}
              isChecked={filters.hasDrivingLicense}
              onChange={(e) => handleFilterChange("hasDrivingLicense", e.target.checked)}
            >
              Has Driving License
            </Checkbox>
            <Checkbox
              colorScheme="blue"
              mb={2}
              size={{ base: "sm", md: "md" }}
              isChecked={filters.jobSwitch}
              onChange={(e) => handleFilterChange("jobSwitch", e.target.checked)}
            >
              Job Switch Candidates
            </Checkbox>
            <Checkbox
              colorScheme="blue"
              mb={2}
              size={{ base: "sm", md: "md" }}
              isChecked={filters.azadVisa}
              onChange={(e) => handleFilterChange("azadVisa", e.target.checked)}
            >
              Azad Visa Candidates
            </Checkbox>
          </Grid>
        </Box>
        <Button
          colorScheme="blue"
          mt={{ base: 4, md: 6 }}
          size={{ base: "md", md: "lg" }}
          width="full"
          borderRadius="md"
          onClick={() => setFilteredCandidates([...filteredCandidates])}
        >
          Search Candidates
        </Button>
      </CardBody>
    </Card>
  );
};

export default CandidateFilterForm;