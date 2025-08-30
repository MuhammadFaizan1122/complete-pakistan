import { Box, Flex, Grid, Text, FormControl, FormLabel, Input, Icon } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useFormContext } from "react-hook-form";

export default function ProfessionalDetails() {
  const { register } = useFormContext();

  return (
    <Box bg="white" borderRadius="md" p={6} shadow="md">
      <Flex align="center" gap={2} mb={6}>
        <Icon as={FaUser} color="gray.600" boxSize={5} />
        <Text fontSize="lg" fontWeight="semibold">
          Professional Details
        </Text>
      </Flex>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input {...register("fullName")} placeholder="Full Name" />
        </FormControl>
        <FormControl>
          <FormLabel>Professional Title</FormLabel>
          <Input {...register("title")} placeholder="Senior Consultant" />
        </FormControl>
        <FormControl>
          <FormLabel>City</FormLabel>
          <Input {...register("locationCity")} placeholder="City" />
        </FormControl>
        <FormControl>
          <FormLabel>Country</FormLabel>
          <Input {...register("locationCountry")} placeholder="Country" />
        </FormControl>
        <FormControl>
          <FormLabel>Years of Experience</FormLabel>
          <Input type="number" {...register("experienceYears")} />
        </FormControl>
        <FormControl>
          <FormLabel>Success Rate (%)</FormLabel>
          <Input type="number" {...register("successRate")} />
        </FormControl>
        <FormControl>
          <FormLabel>Clients Helped</FormLabel>
          <Input type="number" {...register("clientsHelped")} />
        </FormControl>
      </Grid>
    </Box>
  );
}
