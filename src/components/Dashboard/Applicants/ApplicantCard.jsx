'use client';
import {
    Card, CardBody, VStack, HStack, Text, Button, Avatar
} from '@chakra-ui/react';

const ApplicantCard = ({ applicant, onSeeDetails }) => {
    console.log('applicant', applicant)
    return (
        <Card bg="white" borderRadius="20px" shadow="sm" overflow="hidden" w="full">
            <CardBody p={{ base: 4, md: 6 }}>
                <HStack spacing={4} align="start">
                    <Avatar size="xl" src={applicant.cvProfile.image} name={applicant.cvProfile.name} />
                    <VStack align="start" spacing={0} flex="1">
                        <Text fontWeight="bold" fontSize="xl" color="black">
                            {applicant.cvProfile.name}
                        </Text>
                        <Text color="gray.700" fontWeight={'bold'}>Job Title: {applicant.job_id.jobTitle}</Text>
                        <Text color="gray.700">Father Name: {applicant.cvProfile.fatherName}</Text>
                        <HStack>

                            <Text color="gray.700">
                                Age:{' '}
                                {applicant.cvProfile.dob
                                    ? Math.floor((Date.now() - new Date(applicant.cvProfile.dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25)) + ' Years'
                                    : 'N/A'}
                            </Text>
                            <Text color="gray.700">Experience: {applicant.cvProfile.yearsOfExperience ? applicant.cvProfile.yearsOfExperience : 0} years</Text>
                        </HStack>
                        <HStack>
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
                                // onClick={() => onSeeDetails(applicant)}
                            >
                                Select
                            </Button>
                            <Button
                                mt={2}
                                colorScheme="red"
                                size="sm"
                                // onClick={() => onSeeDetails(applicant)}
                            >
                                Drop
                            </Button>
                        </HStack>
                    </VStack>
                </HStack>
            </CardBody>
        </Card>
    );
};

export default ApplicantCard;
