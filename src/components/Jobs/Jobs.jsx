'use client'
import { HeroSection } from './HeroSection';
import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Container,
  Flex,
  useToast,
  Spinner,
  Button,
  Text,
} from '@chakra-ui/react';
import TopCompanies from './TopCompanies';
import FilterSection from './FilterSection';
import JobList from './JobList';
import { handleGetJobs, handleGetJobsByUser } from '../../handlers/Jobs/jobs';
import FilterDrawer from './FilterDrawer';
import { useParams } from 'next/navigation';

const Jobs = ({ type, setTotalJobs }) => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [selectedDatePosted, setSelectedDatePosted] = useState([]);
  const [salaryRange, setSalaryRange] = useState([0, 100000]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLicense, setSelectedLicense] = useState('');
  const [selectedOvertime, setSelectedOvertime] = useState('');
  const [selectedAccommodation, setSelectedAccommodation] = useState('');
  const [selectedMedicalInsurance, setSelectedMedicalInsurance] = useState('');
  const [selectedTransportation, setSelectedTransportation] = useState('');
  const [selectedNavttc, setSelectedNavttc] = useState('');
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const params = useParams();

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = type !== 'trade-partner' ? await handleGetJobs() : await handleGetJobsByUser(params.id);
        if (res?.status === 200) {
          setJobs(res.data?.data || []);
          setTotalJobs(res.data.data.length)
          setFilteredJobs(res.data?.data || []);
        } else {
          toast({
            title: 'Failed to Load Jobs',
            description: res?.data?.message || 'Something went wrong while fetching job listings.',
            status: 'error',
            duration: 4000,
            isClosable: true,
          });
        }
      } catch (err) {
        console.error('Fetch jobs error:', err);
        toast({
          title: 'Server Error',
          description: err?.message || 'Unable to connect to the server.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const applyFilters = () => {
    let filtered = [...jobs];

    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(job => job.state?.toLowerCase() === selectedLocation.toLowerCase());
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(job => selectedCategories.includes(job.category));
    }

    if (selectedJobTypes.length > 0) {
      filtered = filtered.filter(job => selectedJobTypes.includes(job.jobType));
    }

    if (selectedExperience.length > 0) {
      filtered = filtered.filter(job => selectedExperience.includes('All') || job.jobDescription?.includes(selectedExperience.join(' ')));
    }

    if (selectedDatePosted.length > 0) {
      const now = new Date();
      filtered = filtered.filter(job => {
        const createdAt = new Date(job.createdAt);
        if (selectedDatePosted.includes('Last Hour')) return (now - createdAt) < 3600000;
        if (selectedDatePosted.includes('Last 24 Hours')) return (now - createdAt) < 86400000;
        if (selectedDatePosted.includes('Last 7 Days')) return (now - createdAt) < 604800000;
        if (selectedDatePosted.includes('Last 30 Days')) return (now - createdAt) < 2592000000;
        return true;
      });
    }

    if (salaryRange[0] > 0 || salaryRange[1] < 100000) {
      filtered = filtered.filter(job => {
        const minSalary = job.salaryMin || 0;
        const maxSalary = job.salaryMax || 100000;
        return minSalary >= salaryRange[0] && maxSalary <= salaryRange[1];
      });
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(job => selectedTags.some(tag => job.selectedTags.includes(tag)));
    }

    if (selectedLicense) {
      filtered = filtered.filter(job => job.license === selectedLicense);
    }

    if (selectedOvertime) {
      filtered = filtered.filter(job => job.overtime === selectedOvertime);
    }

    if (selectedAccommodation) {
      filtered = filtered.filter(job => job.accommodation === selectedAccommodation);
    }

    if (selectedMedicalInsurance) {
      filtered = filtered.filter(job => job.medicalInsurance === selectedMedicalInsurance);
    }

    if (selectedTransportation) {
      filtered = filtered.filter(job => job.transportation === selectedTransportation);
    }

    if (selectedNavttc) {
      filtered = filtered.filter(job => job.navttc === selectedNavttc);
    }

    setFilteredJobs(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedLocation, selectedCategories, selectedJobTypes, selectedExperience, selectedDatePosted, salaryRange, selectedTags, selectedLicense, selectedOvertime, selectedAccommodation, selectedMedicalInsurance, selectedTransportation, selectedNavttc, jobs]);

  const onOpen = useMemo(() => () => setIsOpen(true), []);
  const onClose = useMemo(() => () => setIsOpen(false), []);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      {
        type !== 'trade-partner'
        && <HeroSection />
      }
      <Box bg={'#0a74501A'} minH="100vh">
        <Container
          maxW={{ base: '100%', sm: 'container.sm', md: 'container.md', lg: '1440px' }}
          py={{ base: 4, md: 8 }}
        >
          <Flex
            gap={{ base: 4, md: 6, lg: 8 }}
            direction={{ base: 'column', lg: 'row' }}
            w="full"
          >
            {
              type !== 'trade-partner' &&
              <>
                <Box
                  w={{ base: 'full', lg: '300px' }}
                  display={{ base: 'none', lg: 'block' }}
                  flexShrink={0}
                >
                  <Box
                    bg="white"
                    p={{ base: 4, md: 6 }}
                    rounded="xl"
                    shadow="sm"
                  >
                    <FilterSection
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      selectedLocation={selectedLocation}
                      setSelectedLocation={setSelectedLocation}
                      selectedCategories={selectedCategories}
                      setSelectedCategories={setSelectedCategories}
                      selectedJobTypes={selectedJobTypes}
                      setSelectedJobTypes={setSelectedJobTypes}
                      selectedExperience={selectedExperience}
                      setSelectedExperience={setSelectedExperience}
                      selectedDatePosted={selectedDatePosted}
                      setSelectedDatePosted={setSelectedDatePosted}
                      salaryRange={salaryRange}
                      setSalaryRange={setSalaryRange}
                      selectedTags={selectedTags}
                      setSelectedTags={setSelectedTags}
                      selectedLicense={selectedLicense}
                      setSelectedLicense={setSelectedLicense}
                      selectedOvertime={selectedOvertime}
                      setSelectedOvertime={setSelectedOvertime}
                      selectedAccommodation={selectedAccommodation}
                      setSelectedAccommodation={setSelectedAccommodation}
                      selectedMedicalInsurance={selectedMedicalInsurance}
                      setSelectedMedicalInsurance={setSelectedMedicalInsurance}
                      selectedTransportation={selectedTransportation}
                      setSelectedTransportation={setSelectedTransportation}
                      selectedNavttc={selectedNavttc}
                      setSelectedNavttc={setSelectedNavttc}
                      applyFilters={applyFilters}
                      clearAllFilters={() => {
                        setSearchQuery('');
                        setSelectedLocation('');
                        setSelectedCategories([]);
                        setSelectedJobTypes([]);
                        setSelectedExperience([]);
                        setSelectedDatePosted([]);
                        setSalaryRange([0, 100000]);
                        setSelectedTags([]);
                        setSelectedLicense('');
                        setSelectedOvertime('');
                        setSelectedAccommodation('');
                        setSelectedMedicalInsurance('');
                        setSelectedTransportation('');
                        setSelectedNavttc('');
                      }}
                    />
                  </Box>
                </Box>

                <Box display={{ base: 'block', lg: 'none' }} mb={{ base: 4, md: 6 }}>
                  <Button
                    onClick={onOpen}
                    bg={'#0a7450'}
                    color={'white'}
                    leftIcon={<Text fontSize={{ base: 'sm', md: 'md' }}>⚙️</Text>}
                    size={{ base: 'sm', md: 'md' }}
                    w={{ base: 'full', sm: 'auto' }}
                  >
                    Filters
                  </Button>
                </Box>
              </>
            }
            <Box flex={1} w="full">
              <JobList
                loading={loading}
                filteredJobs={filteredJobs}
                viewMode={viewMode}
                setViewMode={setViewMode}
                bookmarkedJobs={bookmarkedJobs}
                setBookmarkedJobs={setBookmarkedJobs}
              />
            </Box>
          </Flex>
          {
            type !== 'trade-partner' &&
            <FilterDrawer
              isOpen={isOpen}
              onClose={onClose}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedJobTypes={selectedJobTypes}
              setSelectedJobTypes={setSelectedJobTypes}
              selectedExperience={selectedExperience}
              setSelectedExperience={setSelectedExperience}
              selectedDatePosted={selectedDatePosted}
              setSelectedDatePosted={setSelectedDatePosted}
              salaryRange={salaryRange}
              setSalaryRange={setSalaryRange}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              selectedLicense={selectedLicense}
              setSelectedLicense={setSelectedLicense}
              selectedOvertime={selectedOvertime}
              setSelectedOvertime={setSelectedOvertime}
              selectedAccommodation={selectedAccommodation}
              setSelectedAccommodation={setSelectedAccommodation}
              selectedMedicalInsurance={selectedMedicalInsurance}
              setSelectedMedicalInsurance={setSelectedMedicalInsurance}
              selectedTransportation={selectedTransportation}
              setSelectedTransportation={setSelectedTransportation}
              selectedNavttc={selectedNavttc}
              setSelectedNavttc={setSelectedNavttc}
              applyFilters={applyFilters}
            // clearAllFilters={clearAllFilters}
            />
          }
        </Container>
      </Box>
      {
        type !== 'trade-partner' &&
        <TopCompanies />
      }
    </Box>
  );
};

export default Jobs;