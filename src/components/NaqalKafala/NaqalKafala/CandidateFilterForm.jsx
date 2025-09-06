'use client'
import { useState, useEffect } from "react";
import { Card, CardBody, FormControl, FormLabel, Select, Checkbox, Button, SimpleGrid, Grid, Icon, Text, Box } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { Country, City, State } from "country-state-city";

const CandidateFilterForm = ({ candidates }) => {
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
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

  const professions = [...new Set(candidates.map(c => c.profession))].sort();
  const iqamaStatuses = [
    "No Iqama",
    "3 Months Abshar",
    "1 Year",
  ];
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
  const handleCountryChange = (e) => {
    const iso = e.target.value;
    const selected = countries.find(c => c.isoCode === iso);

    const stateList = selected ? State.getStatesOfCountry(selected.isoCode) : [];
    setStates(stateList);
    setCities([]);

    setFilters(prev => ({
      ...prev,
      country: selected?.name || '',
      countryCode: selected?.isoCode || '',
      state: '',
      stateCode: '',
      city: ''
    }));
  };

  const handleStateChange = (e) => {
    const iso = e.target.value;
    const selected = states.find(s => s.isoCode === iso);

    const cityList = (filters.countryCode && selected)
      ? City.getCitiesOfState(filters.countryCode, selected.isoCode)
      : [];
    setCities(cityList);

    setFilters(prev => ({
      ...prev,
      state: selected?.name || '',
      stateCode: selected?.isoCode || '',
      city: ''
    }));
  };

  const handleCityChange = (e) => {
    setFilters(prev => ({ ...prev, city: e.target.value }));
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
              value={filters.countryCode}
              onChange={handleCountryChange}

            >
              {countries.map(country => (
                <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
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
              value={filters.stateCode}
              onChange={handleStateChange}
              isDisabled={!filters.countryCode}

            >
              {states.map(state => (
                <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
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
              onChange={handleCityChange}
              isDisabled={!filters.stateCode}

            >
              {cities.map(city => (
                <option key={city.isoCode} value={city.isoCode}>{city.name}</option>
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