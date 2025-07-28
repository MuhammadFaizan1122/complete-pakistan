'use client';
import {
    Card, CardBody, VStack, HStack, Text, Button, Avatar, useDisclosure, useToast
} from '@chakra-ui/react';
import ApplicantSelectionModal from './ApplicantSelectionModal';
import { handleCreateOrUpdateJobApplication } from '../../../handlers/JobApplicants/JobApplicants';

const ApplicantCard = ({ applicant, onSeeDetails }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const handleStatusUpdate = async (status) => {
        try {
            const response = await handleCreateOrUpdateJobApplication(applicant._id, {
                status,
            });

            if (response.status === 200) {
                toast({
                    title: `Applicant ${status === 'shortlisted' ? 'selected' : 'rejected'} successfully`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                throw new Error(response.data?.message || 'Failed to update status');
            }
        } catch (error) {
            console.error(`Error updating status to ${status}:`, error);
            toast({
                title: 'Error updating status',
                description: error.message || 'Something went wrong',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Card bg="white" borderRadius="20px" shadow="sm" overflow="hidden" w="full">
                <CardBody p={{ base: 4, md: 6 }}>
                    <HStack spacing={4} align="start">
                        <Avatar size="lg" src={applicant.cvProfile?.image} name={applicant.cvProfile.name} />
                        <VStack align="start" spacing={0} flex="1">
                            <Text fontWeight="bold" fontSize="xl" color="black">
                                {applicant.cvProfile.name}
                            </Text>
                            <Text color="gray.700" fontWeight={'bold'}>Job Title: {applicant.job_id.jobTitle}</Text>
                            <Text color="gray.700">Father Name: {applicant.cvProfile.fatherName}</Text>
                            <HStack w={'full'}>
                                <Text color="gray.700">
                                    Age:{' '}
                                    {applicant.cvProfile.dob
                                        ? Math.floor((Date.now() - new Date(applicant.cvProfile.dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25)) + ' Years'
                                        : 'N/A'}
                                </Text>
                                <Text color="gray.700">Experience: {applicant.cvProfile.yearsOfExperience ? applicant.cvProfile.yearsOfExperience : 0} years</Text>
                            </HStack>
                        </VStack>
                    </HStack>
                    <HStack w={'full'} justify={'space-between'}>
                        <Button
                            mt={2}
                            colorScheme="teal"
                            size="sm"
                            onClick={() => onSeeDetails(applicant)}
                        >
                            See Details
                        </Button>
                        <Button
                            mt={2}
                            colorScheme="teal"
                            size="sm"
                            onClick={onOpen}
                            isDisabled={applicant.status === 'shortlisted' || applicant.status === 'rejected'}
                        >
                            {applicant.status === 'shortlisted' ? 'Selected' : 'Select'}
                        </Button>
                        <Button
                            mt={2}
                            colorScheme="teal"
                            size="sm"
                            onClick={() => handleStatusUpdate('shortlisted')}
                            isDisabled={applicant.status === 'shortlisted' || applicant.status === 'rejected'}
                        >
                            {applicant.status === 'shortlisted' ? 'Selected' : 'Self Selection'}
                        </Button>
                        <Button
                            mt={2}
                            colorScheme="red"
                            size="sm"
                            onClick={() => handleStatusUpdate('rejected')}
                            isDisabled={applicant.status === 'rejected' || applicant.status === 'shortlisted'}
                        >
                            {applicant.status === 'rejected' ? 'Rejected' : 'Reject'}
                        </Button>
                        {applicant.status === 'shortlisted' &&

                            <Button
                                mt={2}
                                colorScheme="teal"
                                size="sm"
                                onClick={onOpen}

                            >
                                Edit
                            </Button>
                        }
                    </HStack>
                </CardBody>
            </Card>
            <ApplicantSelectionModal isOpen={isOpen} onClose={onClose} applicant={applicant} />
        </>
    );
};

export default ApplicantCard;