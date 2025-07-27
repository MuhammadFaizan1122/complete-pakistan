'use client';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody,
    ModalCloseButton, Avatar, VStack, Text, Divider, Box, SimpleGrid
} from '@chakra-ui/react';
import Preview from '../../CV/CreateCV/Preview';
import { useState } from 'react';

const ApplicantDetailsModal = ({ isOpen, onClose, applicant }) => {
    if (!applicant) return null;
    const [imgPreview, setImgPreview] = useState("");

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent borderRadius="lg">
                <ModalHeader>{applicant.cvProfile.name}'s CV</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    {/* <VStack spacing={4} align="start">
            <Avatar src={applicant.image} name={applicant.name} size="xl" />
            <Text><b>Father Name:</b> {applicant.fatherName}</Text>
            <Text><b>Age:</b> {applicant.age}</Text>
            <Text><b>Experience:</b> {applicant.experienceYears} years</Text>
            <Text><b>Phone:</b> {applicant.phone}</Text>
            <Text><b>WhatsApp:</b> {applicant.whatsapp}</Text>
            <Text><b>City:</b> {applicant.city}</Text>

            <Divider />

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} w="full">
              <Box>
                <Text fontWeight="bold">Industry</Text>
                <Text>{applicant.industry}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Applied Position</Text>
                <Text>{applicant.appliedPosition}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Education</Text>
                <Text>{applicant.education}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Languages</Text>
                <Text>{applicant.languages?.join(', ')}</Text>
              </Box>
            </SimpleGrid>

            <Divider />

            <Text><b>Summary:</b></Text>
            <Text color="gray.700">{applicant.summary}</Text>
          </VStack> */}
                    <Preview formData={applicant.cvProfile} imgPreview={imgPreview} watch={''} />

                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ApplicantDetailsModal;
