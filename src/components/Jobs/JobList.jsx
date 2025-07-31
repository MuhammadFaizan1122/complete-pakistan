import {
    VStack,
    Flex,
    Text,
    Select,
    IconButton,
    Button,
    HStack,
    Spinner,
} from '@chakra-ui/react';
import JobCard from './JobCard';

const JobList = ({ loading, filteredJobs, viewMode, setViewMode, bookmarkedJobs, setBookmarkedJobs }) => {
    return (
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
            <Flex
                justify="space-between"
                align={{ base: 'start', md: 'center' }}
                direction={{ base: 'column', md: 'row' }}
                gap={{ base: 2, md: 4 }}
            >
                <Text
                    color="gray.500"
                    fontSize={{ base: 'xs', md: 'sm' }}
                >
                    Showing 6-6 of {filteredJobs.length} results
                </Text>
                <Select
                    placeholder="Sort by latest"
                    w={{ base: 'full', md: '180px', lg: '200px' }}
                    size={{ base: 'xs', md: 'sm' }}
                    bg="white"
                    fontSize={{ base: 'xs', md: 'sm' }}
                    onChange={(e) => setViewMode(e.target.value)}
                    value={viewMode}
                >
                    <option value="list">Sort by latest</option>
                    <option value="salary">Sort by salary</option>
                    <option value="location">Sort by location</option>
                </Select>
            </Flex>

            <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                {loading ? (
                    <Spinner size="lg" color="#0a7450" mx={'auto'} />
                ) : filteredJobs.length === 0 ? (
                    <Text textAlign={'center'} my={{ base: 5, md: 10 }}>No jobs found.</Text>
                ) : filteredJobs.map((job, index) => (
                    <div key={index}>
                        <JobCard key={index} job={job} index={index} />
                    </div>
                ))}
            </VStack>
            {filteredJobs.length > 10 && (
                <Flex justify="center" mt={{ base: 4, md: 8 }}>
                    <HStack spacing={{ base: 1, md: 2 }}>
                        <IconButton
                            icon={<Text fontSize={{ base: 'xs', md: 'sm' }}>←</Text>}
                            variant="ghost"
                            size={{ base: 'xs', md: 'sm' }}
                            aria-label="Previous page"
                        />
                        <Button
                            size={{ base: 'xs', md: 'sm' }}
                            bg={'#0a7450'}
                            color={'white'}
                            variant="solid"
                            fontSize={{ base: 'xs', md: 'sm' }}
                        >
                            01
                        </Button>
                        <Button
                            size={{ base: 'xs', md: 'sm' }}
                            variant="ghost"
                            fontSize={{ base: 'xs', md: 'sm' }}
                        >
                            02
                        </Button>
                        <Button
                            size={{ base: 'xs', md: 'sm' }}
                            variant="ghost"
                            fontSize={{ base: 'xs', md: 'sm' }}
                        >
                            03
                        </Button>
                        <Button
                            size={{ base: 'xs', md: 'sm' }}
                            variant="ghost"
                            fontSize={{ base: 'xs', md: 'sm' }}
                        >
                            04
                        </Button>
                        <Button
                            size={{ base: 'xs', md: 'sm' }}
                            variant="ghost"
                            fontSize={{ base: 'xs', md: 'sm' }}
                        >
                            05
                        </Button>
                        <IconButton
                            icon={<Text fontSize={{ base: 'xs', md: 'sm' }}>→</Text>}
                            variant="ghost"
                            size={{ base: 'xs', md: 'sm' }}
                            aria-label="Next page"
                        />
                    </HStack>
                </Flex>
            )}
        </VStack>
    );
};

export default JobList;