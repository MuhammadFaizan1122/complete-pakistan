'use client';
import {
  Box,
  Text,
  Flex,
  Avatar,
  Divider,
  Grid,
  GridItem,
  Tag,
  VStack,
  HStack,
  Heading,
  Stack,
  Badge
} from "@chakra-ui/react";

export default function PreviewProfile({ data }) {
    console.log('data', data)
  return (
    <Box
      bg="white"
      rounded="2xl"
      shadow="lg"
      p={{ base: 6, md: 10 }}
      maxW="1200px"
      w="full"
      mx="auto"
    >
      {/* Header */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-start" }}
        gap={6}
        mb={8}
      >
        <Avatar
          size="2xl"
          name={data.name}
          src={data.photo || ""}
          border="4px solid #0a7450"
        />
        <Box>
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>{data.name}</Heading>
          <Text fontSize="lg" color="gray.600">{data.jobTitle} — {data.industry}</Text>
          <Text color="gray.500">{data.city}, {data.country}</Text>
        </Box>
      </Flex>

      <Divider mb={8} />

      {/* Personal Details */}
      <Section title="Personal Information">
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
          <Info label="Father Name" value={data.fatherName} />
          <Info label="CNIC" value={data.cnic} />
          <Info label="Date of Birth" value={new Date(data.dob).toLocaleDateString()} />
          <Info label="Gender" value={data.gender} />
          <Info label="Phone" value={data.phone} />
          <Info label="Whatsapp" value={data.whatsapp} />
          <Info label="Other Number" value={data.otherNumber} />
          <Info label="Email" value={data.email} />
          <Info label="Local Address" value={data.localAddress} />
        </Grid>
      </Section>

      {/* Passport Info */}
      <Section title="Passport Information">
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
          <Info label="Passport No." value={data.passport} />
          <Info label="Issue Date" value={new Date(data.passportIssue).toLocaleDateString()} />
          <Info label="Expiry Date" value={new Date(data.passportExpiry).toLocaleDateString()} />
          <Info label="Medical Date" value={data.madicalDate ? new Date(data.madicalDate).toLocaleDateString() : "-"} />
        </Grid>
      </Section>

      {/* Languages & Skills */}
      <Section title="Languages & Skills">
        <HStack wrap="wrap" spacing={2}>
          {data.languages?.map((lang, i) => (
            <Tag key={i} colorScheme="green">{lang}</Tag>
          ))}
        </HStack>
        <HStack wrap="wrap" spacing={2} mt={3}>
          {data.skills?.map((skill, i) => (
            <Badge key={i} px={3} py={1} colorScheme="blue" rounded="md">
              {skill}
            </Badge>
          ))}
        </HStack>
      </Section>

      {/* Education */}
      <Section title="Education">
        <VStack align="stretch" spacing={4}>
          {data.education?.map((edu, i) => (
            <Box key={i} p={4} rounded="lg" border="1px solid #e2e8f0">
              <Text fontWeight="bold">{edu.level} — {edu.institute}</Text>
              <Text color="gray.600">{edu.city}, {edu.country}</Text>
              <Text color="gray.500" fontSize="sm">
                {new Date(edu.startDate).toLocaleDateString()} - {new Date(edu.endDate).toLocaleDateString()}
              </Text>
              <Text mt={1}>{edu.details}</Text>
            </Box>
          ))}
        </VStack>
      </Section>

      {/* Experience */}
      <Section title="Experience">
        <VStack align="stretch" spacing={4}>
          {data.experience?.map((exp, i) => (
            <Box key={i} p={4} rounded="lg" border="1px solid #e2e8f0">
              <Text fontWeight="bold">{exp.designation} — {exp.company}</Text>
              <Text color="gray.600">{exp.city}, {exp.country}</Text>
              <Text color="gray.500" fontSize="sm">
                {new Date(exp.startDate).toLocaleDateString()} - {new Date(exp.endDate).toLocaleDateString()}
              </Text>
              <Text mt={1}>{exp.description}</Text>
            </Box>
          ))}
        </VStack>
      </Section>
    </Box>
  );
}

/* Section Wrapper */
const Section = ({ title, children }) => (
  <Box mb={8}>
    <Heading fontSize="xl" mb={4} color="gray.700">{title}</Heading>
    {children}
  </Box>
);

/* Info Item */
const Info = ({ label, value }) => (
  <Box>
    <Text fontSize="sm" fontWeight="medium" color="gray.500">{label}</Text>
    <Text fontSize="md" color="gray.800">{value || "-"}</Text>
  </Box>
);
