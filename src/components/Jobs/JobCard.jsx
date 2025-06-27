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
    Text,
    VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
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

    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
const CompanyAvatar = ({ colors, company }) => (
    <Box position="relative" w="40px" h="40px">
        <Box
            w="40px"
            h="40px"
            borderRadius="full"
            position="relative"
            overflow="hidden"
        >
            {colors.map((color, index) => (
                <Box
                    key={index}
                    position="absolute"
                    w="20px"
                    h="20px"
                    bg={color}
                    top={index < 2 ? 0 : '20px'}
                    left={index % 2 === 0 ? 0 : '20px'}
                />
            ))}
        </Box>
    </Box>
);
const toggleBookmark = (jobId) => {
    const newBookmarked = new Set(bookmarkedJobs);
    if (newBookmarked.has(jobId)) {
        newBookmarked.delete(jobId);
    } else {
        newBookmarked.add(jobId);
    }
    setBookmarkedJobs(newBookmarked);
};
const JobCard = memo(({ job }) => (
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
                <Flex justify="space-between" align="center">
                    <Box bg="#3096891A" px={{ base: 3, md: 4 }} py={2} borderRadius="md">
                        <Text fontSize={{ base: '14px', md: '16px' }} color="gray.500">
                            {getTimeAgo(job.createdAt)}
                        </Text>
                    </Box>
                    <IconButton
                        icon={
                            <Image
                                src="/Images/Icons/bookmark.png"
                                alt="icon"
                                width={24}
                                height={24}
                            />
                        }
                        variant="ghost"
                        size={{ base: 'sm', md: 'md' }}
                        onClick={() => toggleBookmark(job.id)}
                        aria-label="Bookmark job"
                    />
                </Flex>

                <Flex gap={{ base: 2, md: 3 }} align="flex-start">
                    <CompanyAvatar
                        colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']}
                        company={job.companyName}
                    />
                    <VStack align="flex-start" spacing={1} flex={1}>
                        <Heading size={{ base: 'sm', md: 'md' }} color="gray.800" fontWeight="semibold">
                            {job.jobTitle}
                        </Heading>
                        <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
                            {job.companyName}
                        </Text>
                    </VStack>
                </Flex>

                <Flex
                    justify="space-between"
                    align="center"
                    direction={{ base: 'column', lg: 'row' }}
                    gap={{ base: 3, md: 4 }}
                >
                    <HStack spacing={{ base: 4, md: 6 }} wrap="wrap" align="center" justify="flex-start">
                        <HStack spacing={2}>
                            <Image src="/Images/Icons/briefcase.png" alt="icon" width={24} height={24} />
                            <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
                                {job.industry}
                            </Text>
                        </HStack>
                        <HStack spacing={2}>
                            <Image src="/Images/Icons/clock.png" alt="icon" width={24} height={24} />
                            <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
                                {job.jobType}
                            </Text>
                        </HStack>
                        <HStack spacing={2}>
                            <Image src="/Images/Icons/wallet.png" alt="icon" width={24} height={24} />
                            <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
                                {'$' + job.salaryMin + ' - $' + job.salaryMax}
                            </Text>
                        </HStack>
                        <HStack spacing={2}>
                            <Image src="/Images/Icons/location.png" alt="icon" width={24} height={24} />
                            <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
                                {job.country}
                            </Text>
                        </HStack>
                    </HStack>

                    <Button
                        as={Link}
                        href={`/job-details/${job.id}`}
                        bg="#309689"
                        size={{ base: 'sm', md: 'md' }}
                        rounded="8px"
                        px={{ base: 4, md: 6 }}
                        flexShrink={0}
                        color="white"
                        _hover={{ bg: '#309689' }}
                    >
                        Job Details
                    </Button>
                </Flex>
            </Flex>
        </CardBody>
    </Card>
));

export default JobCard;
