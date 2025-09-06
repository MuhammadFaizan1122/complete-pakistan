'use client'
import { useState, useEffect } from "react";
import { Card, CardBody, FormControl, FormLabel, Select, Button, SimpleGrid, Icon, Text } from "@chakra-ui/react";
import { LuBuilding2 } from "react-icons/lu";
import { City, Country, State } from "country-state-city";

const AgentFilterForm = ({ agents }) => {
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [filters, setFilters] = useState({
    country: "",
    state: "",
    city: "",
    specialization: "",
    serviceType: "",
    rating: "",
  });
  const [filteredAgents, setFilteredAgents] = useState(agents);

  const services = [...new Set(agents.flatMap(a => a.services))].sort();

  useEffect(() => {
    let result = [...agents];
    console.log('result', result)
    if (filters.country) {
      result = result.filter(a => a.vtpDetails[0]?.address.country === filters.country);
    }
    if (filters.state) {
      result = result.filter(a => a.vtpDetails[0]?.address.state === filters.state);
    }
    if (filters.city) {
      result = result.filter(a => a.vtpDetails[0]?.address.city === filters.city);
    }
    if (filters.specialization) {
      result = result.filter(a => a.services.includes(filters.specialization));
    }
    if (filters.serviceType) {
      result = result.filter(a => a.services.includes(filters.serviceType));
    }
    // Note: Rating filter is not implemented as the schema doesn't include ratings
    setFilteredAgents(result);
  }, [filters, agents]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  const handleCountryChange = (e) => {
    const iso = e.target.value; // we keep value = isoCode
    const selected = countries.find(c => c.isoCode === iso);

    // Load states for this country
    const stateList = selected ? State.getStatesOfCountry(selected.isoCode) : [];
    setStates(stateList);
    setCities([]); // reset cities

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
    const iso = e.target.value; // state isoCode
    const selected = states.find(s => s.isoCode === iso);

    // Load cities for this state
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

  const clearAll = () => {
    setFilters({
      country: '',
      countryCode: '',
      state: '',
      stateCode: '',
      city: ''
    });
    setStates([]);
    setCities([]);
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
          <Icon as={LuBuilding2} color="blue.500" mr={2} boxSize={{ base: 4, md: 5 }} /> Find Trusted Agents
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
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Specialization</FormLabel>
            <Select
              placeholder="Specialization"
              variant="outline"
              bg="gray.50"
              size={{ base: "sm", md: "md" }}
              value={filters.specialization}
              onChange={(e) => handleFilterChange("specialization", e.target.value)}
            >
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Service Type</FormLabel>
            <Select
              placeholder="Service Type"
              variant="outline"
              bg="gray.50"
              size={{ base: "sm", md: "md" }}
              value={filters.serviceType}
              onChange={(e) => handleFilterChange("serviceType", e.target.value)}
            >
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Rating</FormLabel>
            <Select
              placeholder="Rating"
              variant="outline"
              bg="gray.50"
              size={{ base: "sm", md: "md" }}
              value={filters.rating}
              onChange={(e) => handleFilterChange("rating", e.target.value)}
            >
              <option value="4+">4+ Stars</option>
              <option value="3+">3+ Stars</option>
              <option value="2+">2+ Stars</option>
            </Select>
          </FormControl>
        </SimpleGrid>
        <Button
          colorScheme="yellow"
          mt={{ base: 4, md: 6 }}
          size={{ base: "md", md: "lg" }}
          width="full"
          borderRadius="md"
          onClick={() => setFilteredAgents([...filteredAgents])}
        >
          Search Agents
        </Button>
      </CardBody>
    </Card>
  );
};

export default AgentFilterForm;