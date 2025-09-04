'use client'
import { useState, useEffect } from "react";
import { Card, CardBody, FormControl, FormLabel, Select, Button, SimpleGrid, Icon, Text } from "@chakra-ui/react";
import { LuBuilding2 } from "react-icons/lu";

const AgentFilterForm = ({ agents }) => {
  const [filters, setFilters] = useState({
    country: "",
    state: "",
    city: "",
    specialization: "",
    serviceType: "",
    rating: "",
  });
  const [filteredAgents, setFilteredAgents] = useState(agents);

  // Extract unique values for dropdowns
  const countries = [...new Set(agents.map(a => a.address?.country))].sort();
  const states = [...new Set(agents.map(a => a.address?.state))].sort();
  const cities = [...new Set(agents.map(a => a.address?.city))].sort();
  const services = [...new Set(agents.flatMap(a => a.services))].sort();

  useEffect(() => {
    let result = [...agents];
    
    if (filters.country) {
      result = result.filter(a => a.address.country === filters.country);
    }
    if (filters.state) {
      result = result.filter(a => a.address.state === filters.state);
    }
    if (filters.city) {
      result = result.filter(a => a.address.city === filters.city);
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