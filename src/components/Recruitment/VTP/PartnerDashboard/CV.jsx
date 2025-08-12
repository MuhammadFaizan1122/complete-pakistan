"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function CVTable({ setTotalCvs }) {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const calculateAge = (dob) => {
    if (!dob) return "-";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const res = await fetch("/api/trade-partner/cv", { cache: "no-store" });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch CVs");
        }
        setTotalCvs(data.data.length)
        setCvs(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCVs();
  }, []);

  return (
    <Box className="px-4 bg-white rounded-lg shadow">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={4}>
        <Box as="h2" fontSize="xl" fontWeight="bold">
          CVs Data Showcase
        </Box>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" py={6}>
          <Spinner size="lg" />
        </Flex>
      ) : error ? (
        <Text color="red.500" textAlign="center">
          {error}
        </Text>
      ) : cvs.length === 0 ? (
        <Text color="gray.500" textAlign="center">
          No CVs found.
        </Text>
      ) : (
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
                <Td>{calculateAge(cv.dateOfBirth)} Years</Td>

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
      )}
    </Box>
  );
}
