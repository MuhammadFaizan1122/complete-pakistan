'use client';
import { useEffect, useState } from 'react';
import { Box, SimpleGrid, Spinner, Center } from '@chakra-ui/react';
import { handleGetJobApplications } from '../../../handlers/JobApplicants/JobApplicants';
import ApplicantCard from './ApplicantCard';
import ApplicantDetailsModal from './ApplicantDetailsModal';

const ApplicantList = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (applicant) => {
    setSelectedApplicant(applicant);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      const res = await handleGetJobApplications();
      console.log('Fetched Applicants:', res);
      if (res?.data) setApplicants(res.data.data);
      setLoading(false);
    };
    fetchApplicants();
  }, []);

  if (loading) {
    return (
      <Center h="300px">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  return (
    <Box px={{ base: 4, md: 8 }} py={6}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {applicants?.map((applicant) => (
          <ApplicantCard
            key={applicant._id}
            applicant={applicant}
            onSeeDetails={handleOpenModal}
          />
        ))}
      </SimpleGrid>

      <ApplicantDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        applicant={selectedApplicant}
      />
    </Box>
  );
};

export default ApplicantList;
