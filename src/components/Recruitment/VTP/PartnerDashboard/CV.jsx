"use client";

import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Tag, Flex, IconButton } from "@chakra-ui/react";
import { FaPlus, FaCheckCircle, FaTimesCircle, FaEdit } from "react-icons/fa";

export default function CVTable() {
  // Example data
  const cvs = [
    {
      name: "Ali Hassan",
      trade: "Electrician",
      city: "Karachi",
      age: 28,
      medicalStatus: "Valid",
      education: "Diploma",
      gulfVisited: true,
    },
    {
      name: "Usman Khan",
      trade: "Plumber",
      city: "Lahore",
      age: 32,
      medicalStatus: "Pending",
      education: "Certificate",
      gulfVisited: false,
    },
    {
      name: "Tariq Ahmed",
      trade: "Mason",
      city: "Islamabad",
      age: 29,
      medicalStatus: "Valid",
      education: "Matric",
      gulfVisited: true,
    },
  ];

  return (
    <Box className="px-4 bg-white rounded-lg shadow">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={4}>
        <Box as="h2" fontSize="xl" fontWeight="bold">
          CVs Data Showcase
        </Box>
        {/* <Button
          leftIcon={<FaPlus />}
          colorScheme="blackAlpha"
          bg="black"
          _hover={{ bg: "gray.800" }}
          color="white"
          className="rounded-md"
        >
          Add New CV
        </Button> */}
      </Flex>

      {/* Table */}
      <Table variant="simple" size="md">
        <Thead bg="gray.50">
          <Tr>
            <Th>Name</Th>
            <Th>Trade</Th>
            <Th>City</Th>
            <Th>Age</Th>
            <Th>Medical Status</Th>
            <Th>Education</Th>
            <Th>Gulf Visited</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cvs.map((cv, idx) => (
            <Tr key={idx}>
              <Td>{cv.name}</Td>
              <Td>{cv.trade}</Td>
              <Td>{cv.city}</Td>
              <Td>{cv.age}</Td>
              <Td>
                {cv.medicalStatus === "Valid" ? (
                  <Tag colorScheme="green" variant="subtle">
                    Valid
                  </Tag>
                ) : (
                  <Tag colorScheme="yellow" variant="subtle">
                    Pending
                  </Tag>
                )}
              </Td>
              <Td>{cv.education}</Td>
              <Td>
                {cv.gulfVisited ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaTimesCircle className="text-red-500" />
                )}
              </Td>
             
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
