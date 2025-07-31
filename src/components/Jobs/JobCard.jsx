'use client';
import {
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    Heading,
    HStack,
    IconButton,
    Image,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { memo, useState } from 'react';
import { handleCreateJobApplication } from '../../handlers/JobApplicants/JobApplicants';
import { useSession } from 'next-auth/react';
export function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days === 1) return 'Yesterday';
    if (days <= 30) return `${days} days ago`;

    return date?.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

const JobCard = memo(({ job }) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const toast = useToast();
    const [isApplying, setIsApplying] = useState(false);
    const handleApply = async () => {
        if (!userId) {
            toast({
                title: 'Login required',
                description: 'Please log in to apply for this job.',
                status: 'warning',
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        setIsApplying(true);
        const res = await handleCreateJobApplication({
            applicant_user_id: userId,
            job_id: job._id,
        });
        setIsApplying(false);

        if (res?.status === 201) {
            toast({
                title: 'Application Submitted',
                description: 'Your job application was submitted successfully.',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Application Failed',
                description: res?.data?.message || 'Something went wrong.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    };
    return (

        <Card
            bg="#fff"
            shadow="sm"
            border="1px"
            rounded="20px"
            borderColor="gray.200"
            _hover={{ shadow: 'md' }}
            transition="all 0.2s"
        >
            <CardBody p={{ base: 4, md: 6 }}>
                <Flex direction="column" gap={{ base: 3, md: 4 }}>
                    <Flex gap={{ base: 2, md: 3 }} align="flex-start">
                        {/* <CompanyAvatar
                        colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']}
                        company={job.companyName}
                    /> */}
                        <Box>
                            <Image src="/Images/CEO.jpg" alt="company" width={24} height={24} borderRadius={'lg'} />
                        </Box>

                        <VStack align="flex-start" spacing={1} flex={1}>
                            <Heading size={{ base: 'sm', md: 'md' }} color="gray.800" fontWeight="semibold">
                                {job.jobTitle}
                            </Heading>
                            <Text fontSize={{ base: 'xs', md: 'md' }} color="blue.600" display={'flex'} alignItems={'center'} fontWeight={'bold'}>
                                {job.companyName}
                                <Text fontSize={{ base: '12px', md: '14px' }} color="gray.500" ml={2} mb={0}>
                                    - {job.country}
                                </Text>
                                <Text fontSize={{ base: '12px', md: '14px' }} color="gray.500" ml={2} mb={0}>
                                    - {getTimeAgo(job.createdAt)}
                                </Text>
                            </Text>
                        </VStack>
                    </Flex>

                    <HStack w={'100%'}>
                        <VStack align="flex-start" spacing={2} w={'50%'}>
                            <Text fontSize="lg" fontWeight="bold" color={'#0a7450'}>Job Details</Text>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>Skills:</Text>
                                <Text fontSize="sm" color="gray.600">{job.selectedSkills.join(', ')}</Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>Education:</Text>
                                <Text fontSize="sm" color="gray.600">{job.education}</Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>Location:</Text>
                                <Text fontSize="sm" color="gray.600">{job.country}, {job.state}</Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>License:</Text>
                                <Text fontSize="sm" color="gray.600">{job.license}</Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>Duty Hours:</Text>
                                <Text fontSize="sm" color="gray.600">{job.dutyHours}</Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>Overtime:</Text>
                                <Text fontSize="sm" color="gray.600">{job.overtime}</Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>Interview Date:</Text>
                                <Text fontSize="sm" color="gray.600">
                                    {job?.interviewDate ? new Date(job.interviewDate).toLocaleDateString() : 'N/A'}
                                </Text>
                            </HStack>
                        </VStack>

                        <VStack align="flex-start" spacing={2} w={'50%'}>
                            <Text fontSize="lg" fontWeight="bold" color={'#0a7450'}>Company Benefits</Text>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>Duration:</Text>
                                <Text fontSize="sm" color="gray.600">{job.duration}</Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>Accommodation:</Text>
                                <Text fontSize="sm" color="gray.600">{job.accommodation}</Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>Medical Insurance:</Text>
                                <Text fontSize="sm" color="gray.600">{job.medicalInsurance}</Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>Transportation:</Text>
                                <Text fontSize="sm" color="gray.600">{job.transportation}</Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>Return Ticket:</Text>
                                <Text fontSize="sm" color="gray.600">{job.returnTicket}</Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>First Departure:</Text>
                                <Text fontSize="sm" color="gray.600">
                                    {job?.firstDeparture ? new Date(job.firstDeparture).toLocaleDateString() : 'N/A'}
                                </Text>

                            </HStack>
                        </VStack>
                    </HStack>
                    <HStack w={'100%'}>
                        <VStack align="flex-start" spacing={2} w={'50%'}>
                            <Text fontSize="lg" fontWeight="bold" color={'#0a7450'}>Interview Details</Text>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>Venue:</Text>
                                <Text fontSize="sm" color="gray.600">{job.interviewVenue}</Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>Location:</Text>
                                <Text fontSize="sm" color="gray.600">{job.interviewLocation}</Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>Address:</Text>
                                <Text fontSize="sm" color="gray.600">{job.interviewAddress}</Text>
                            </HStack>
                        </VStack>

                        <VStack align="flex-start" spacing={2} w={'50%'}>
                            <Text fontSize="lg" fontWeight="bold" color={'#0a7450'}>Visa Details</Text>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>Visa Number:</Text>
                                <Text fontSize="sm" color="gray.600">{job.visaNumber}</Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>NAVTT:</Text>
                                <Text fontSize="sm" color="gray.600">{job.navttc}</Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Text fontSize="sm" color="#0a7450" fontWeight={'semibold'}>Visa Category:</Text>
                                <Text fontSize="sm" color="gray.600">{job.visaCategory}</Text>
                            </HStack>
                        </VStack>
                    </HStack>

                    {/* <Flex justify="space-between" align="center" mt={4}>
                    <HStack spacing={2}>
                        <Text fontSize="sm" color="gray.600">{job.companyName}</Text>
                        <Text fontSize="sm" color="gray.600">LIC #1265</Text>
                        <Text fontSize="sm" color="gray.600">Since 2005</Text>
                        <Text fontSize="sm" color="gray.600">4.8/5 Rating</Text>
                    </HStack>
                    <HStack spacing={2}>
                        <Text fontSize="sm" color="gray.600">{job.userId}</Text>
                        <Text fontSize="sm" color="gray.600">16 CVs match this job</Text>
                        <Text fontSize="sm" color="gray.600">24 Recommendations</Text>
                    </HStack>
                </Flex> */}

                    <Flex justify="space-between" mt={4} gap={4}>

                        <Button
                            bg="#0a7450"
                            w="full"
                            color="white"
                            borderRadius="xl"
                            py={{ base: 4, md: 6 }}
                            _hover={{ bg: "white", color: "black", border: "1px solid black" }}
                            onClick={() => alert('Apply Now clicked')}
                        >
                            Share Via Email
                        </Button>
                        <Button
                            bg="#0a7450"
                            w="full"
                            color="white"
                            borderRadius="xl"
                            py={{ base: 4, md: 6 }}
                            _hover={{ bg: "white", color: "black", border: "1px solid black" }}
                            onClick={() => alert('Apply Now clicked')}
                        >
                            Share Via Whatsapp
                        </Button>
                        <Button
                            bg="#0a7450"
                            w="full"
                            color="white"
                            borderRadius="xl"
                            py={{ base: 4, md: 6 }}
                            _hover={{ bg: "white", color: "black", border: "1px solid black" }}
                            onClick={handleApply}
                            isLoading={isApplying}
                            loadingText="Applying..."
                        >
                            Apply Now
                        </Button>

                        <Button
                            bg="#0a7450"
                            w="full"
                            color="white"
                            borderRadius="xl"
                            py={{ base: 4, md: 6 }}
                            _hover={{ bg: "white", color: "black", border: "1px solid black" }}
                            as={Link}
                            href={`/job-details/${job.id}`}
                        >
                            View Details
                        </Button>
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    )
});

export default JobCard;