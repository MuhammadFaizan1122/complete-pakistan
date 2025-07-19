'use client'
import {
    Box, Text, VStack, HStack, Grid, Avatar, Button, Badge, Card, useToast, Spinner,
    Select, Checkbox
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { handleGetCV } from '../../../handlers/CV/create-cv'
import { RiTeamFill } from 'react-icons/ri'
import { Country } from 'country-state-city'
import StyledSelect from './StyledSelect'

const CvDirectory = () => {
    const [cvs, setCvs] = useState([]);
    const [filteredCVList, setFilteredCVList] = useState([]);
    const [countries, setCountries] = useState(Country.getAllCountries());
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    const [filteredCVs, setFilteredCVs] = useState({
        today: [],
        yesterday: [],
        thisMonth: [],
        gulfExp: [],
        pakistani: [],
    });
    const [industry, setIndustry] = useState('');
    const [experience, setExperience] = useState('');
    const [education, setEducation] = useState('');
    const [location, setLocation] = useState('');
    const [skills, setSkills] = useState('');
    const [ageLimit, setAgeLimit] = useState('');
    const [gulfExpOnly, setGulfExpOnly] = useState(false);
    const handleCVs = async () => {
        try {
            const response = await handleGetCV();
            if (response.status === 200) {
                setCvs(response.data.data);
                setFilteredCVList(response.data.data);
                const now = new Date();
                const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const yesterdayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

                const result = {
                    today: [],
                    yesterday: [],
                    thisMonth: [],
                    gulfExp: [],
                    pakistani: [],
                };

                response.data.data.forEach((item) => {
                    const createdAt = new Date(item.createdAt);

                    const createdDateOnly = new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate());

                    if (createdDateOnly.getTime() === todayDate.getTime()) {
                        result.today.push(item);
                    }

                    if (createdDateOnly.getTime() === yesterdayDate.getTime()) {
                        result.yesterday.push(item);
                    }

                    if (createdDateOnly >= startOfMonth) {
                        result.thisMonth.push(item);
                    }

                    if (Array.isArray(item.countriesVisited) && item.countriesVisited.length > 0) {
                        result.gulfExp.push(item);
                    }
                    if (item.country?.toLowerCase() === 'pakistan') {
                        result.pakistani.push(item);
                    }
                });

                setFilteredCVs(result);
            } else {
                throw new Error(response?.message || 'Failed to fetch CVs');
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message || 'Something went wrong while fetching CVs.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
        } finally {
            setLoading(false);
        }
    };
    const handleFilter = () => {
        const filtered = cvs.filter(candidate => {
            const { totalYears } = calculateTotalExperience(candidate.experience || []);
            const candidateIndustry = candidate.industry || '';
            const candidateEducationLevels = (candidate.education || []).map(e => e.level.toLowerCase());
            const candidateSkills = (candidate.skills || []).map(s => s.toLowerCase());
            const candidateCountry = candidate.country || '';
            const candidateDOB = candidate.dob ? new Date(candidate.dob) : null;
            const candidateAge = candidateDOB ? new Date().getFullYear() - candidateDOB.getFullYear() : null;
            const candidateVisitedCountries = candidate.countriesVisited || [];

            const experienceMatch = experience ? totalYears >= parseInt(experience) : true;
            const industryMatch = industry ? candidateIndustry.toLowerCase() === industry.toLowerCase() : true;
            const educationMatch = education ? candidateEducationLevels.includes(education.toLowerCase()) : true;
            const skillsMatch = skills ? candidateSkills.includes(skills.toLowerCase()) : true;
            const locationMatch = location ? candidateCountry.toLowerCase() === location.toLowerCase() : true;

            const ageLimitValue = parseInt(ageLimit);
            let ageMatch = true;
            if (ageLimitValue === 18) ageMatch = candidateAge >= 18 && candidateAge <= 25;
            else if (ageLimitValue === 25) ageMatch = candidateAge > 25 && candidateAge <= 35;
            else if (ageLimitValue === 35) ageMatch = candidateAge > 35 && candidateAge <= 45;
            else if (ageLimitValue === 45) ageMatch = candidateAge > 45 && candidateAge <= 55;

            const gulfMatch = gulfExpOnly ? candidateVisitedCountries.length > 0 : true;

            return experienceMatch &&
                industryMatch &&
                educationMatch &&
                skillsMatch &&
                locationMatch &&
                ageMatch &&
                gulfMatch;
        });

        setFilteredCVList(filtered);
    };

    useEffect(() => {
        handleCVs();
    }, []);

    useEffect(() => {
        if (
            !industry &&
            !experience &&
            !education &&
            !skills &&
            !location &&
            !ageLimit &&
            !gulfExpOnly
        ) {
            setFilteredCVList(cvs);
        }
    }, [industry, experience, education, skills, location, ageLimit, gulfExpOnly, cvs]);

    const calculateYears = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        let years = end.getFullYear() - start.getFullYear();
        const monthDiff = end.getMonth() - start.getMonth();
        const dayDiff = end.getDate() - start.getDate();
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) years--;
        let months = monthDiff;
        if (dayDiff < 0) months--;
        if (months < 0) months += 12;
        return { years, months };
    };

    const calculateTotalExperience = (experienceArray) => {
        let totalYears = 0, totalMonths = 0;
        experienceArray.forEach(exp => {
            const { years, months } = calculateYears(exp.startDate, exp.endDate);
            totalYears += years;
            totalMonths += months;
        });
        totalYears += Math.floor(totalMonths / 12);
        totalMonths = totalMonths % 12;
        return { totalYears, totalMonths };
    };

    return (
        <Box flex={1} maxW={'1440px'} mx={'auto'} p={4}>
            <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(6, 1fr)" }} gap={4} mb={6}>
                {[
                    { label: "Total CVs", value: cvs.length },
                    { label: "Today's CVs", value: filteredCVs.today.length },
                    { label: "Yesterday's CVs", value: filteredCVs.yesterday.length },
                    { label: "This Month", value: filteredCVs.thisMonth.length },
                    { label: "Gulf Experienced", value: filteredCVs.gulfExp.length },
                    { label: "Pakistan Experienced", value: filteredCVs.pakistani.length }
                ].map((item, idx) => (
                    <Box key={idx} p={{ base: 2, md: 4 }} bg="white" borderRadius="xl" boxShadow="lg" border={'10px'} borderColor={'red'} className='!border-t-4 !border-[#309689]'>
                        <Text fontSize="xl" fontWeight="bold">{item.value}</Text>
                        <Text fontSize="sm" color="gray.500">{item.label}</Text>
                    </Box>
                ))}
            </Grid>
            <Box bg="white" py={4} borderRadius="md" boxShadow="sm" mb={6}>
                <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
                    <StyledSelect placeholder="All Industries" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                        <option value="Construction">Construction</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="IT">IT</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                    </StyledSelect>
                    <StyledSelect placeholder="Experience" value={experience} onChange={(e) => setExperience(e.target.value)}>
                        <option value="1">1+ year</option>
                        <option value="2">2+ years</option>
                        <option value="3">3+ years</option>
                        <option value="5">5+ years</option>
                    </StyledSelect>
                    <StyledSelect placeholder="Education" value={education} onChange={(e) => setEducation(e.target.value)}>
                        <option value="Middle">Middle</option>
                        <option value="Bachelar">Bachelar</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Course">Course</option>
                    </StyledSelect>

                    <StyledSelect placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} >
                        {countries.map((c) => (
                            <option key={c.isoCode} value={c.name}>
                                {c.name}
                            </option>
                        ))}
                    </StyledSelect>
                    <StyledSelect placeholder="Skills" value={skills} onChange={(e) => setSkills(e.target.value)}>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="React">React</option>
                        <option value="Node.js">Node.js</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="SQL">SQL</option>
                        <option value="TypeScript">TypeScript</option>
                        <option value="Git">Git</option>
                    </StyledSelect>
                    <StyledSelect placeholder="Age Limit" value={ageLimit} onChange={(e) => setAgeLimit(e.target.value)}>
                        <option value="18">18 - 25</option>
                        <option value="25">25 - 35</option>
                        <option value="55">35 - 45</option>
                        <option value="45">45 - 55</option>
                    </StyledSelect>
                    <Checkbox isChecked={gulfExpOnly} onChange={(e) => setGulfExpOnly(e.target.checked)}>Gulf Exp</Checkbox>
                    <HStack justify="end" alignItems={'end'}>
                        <HStack>
                            <Button bg={'#309689'} color={'#fff'} onClick={handleFilter} >Filter</Button>
                            <Button variant="outline">Export</Button>
                        </HStack>
                    </HStack>
                </Grid>
            </Box>
            <HStack spacing={2} mb={4}>
                {industry && <Badge colorScheme="blue">{industry}</Badge>}
                {experience && <Badge colorScheme="green">{experience}+ yrs</Badge>}
                {education && <Badge colorScheme="purple">{education}</Badge>}
                {skills && <Badge colorScheme="orange">{skills}</Badge>}
                {location && <Badge colorScheme="teal">{location}</Badge>}
                {ageLimit && <Badge colorScheme="pink">Age: {ageLimit}+</Badge>}
                {gulfExpOnly && <Badge colorScheme="red">Gulf Exp</Badge>}
            </HStack>

            <HStack >
                <Text display={'flex'} alignItems={'center'} as={'h2'} fontSize={'24px'} fontWeight={'bold'}><RiTeamFill className='mr-2' /> CV Directory <Badge px={2} py={1} fontSize={'14px'}>{cvs.length} CVs</Badge></Text>
                <span></span>
            </HStack>
            <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={6}>
                {loading ? (
                    <Spinner />
                ) : (
                    filteredCVList.map((candidate, index) => {
                        const { totalYears } = calculateTotalExperience(candidate.experience || []);
                        return (
                            <Card key={index} bg="white" borderRadius="20px" overflow="hidden" shadow="md">
                                <VStack p={4} spacing={3} align="center">
                                    <Box position="relative">
                                        <Avatar size="xl" name={candidate?.name} src={candidate?.avatar} borderRadius="full" />
                                        {candidate?.isNew && (
                                            <Badge position="absolute" top="0" left="0" colorScheme="red">NEW</Badge>
                                        )}
                                        {candidate?.gulfExp && (
                                            <Badge position="absolute" top="0" right="0" colorScheme="green">Gulf Exp</Badge>
                                        )}
                                    </Box>

                                    <VStack spacing={0} textAlign="center">
                                        <Text fontWeight="bold" fontSize="lg">{candidate?.name}</Text>
                                        <Text fontSize="sm" color="gray.600">{candidate?.role}</Text>
                                    </VStack>

                                    <VStack spacing={1} align="start" w="full" fontSize="sm" color="gray.700">
                                        <HStack><Text>📍</Text><Text>{candidate?.city}</Text></HStack>
                                        <HStack><Text>⏳</Text><Text>{totalYears} years</Text></HStack>
                                        <HStack><Text>🆔</Text><Text>{candidate?.passport}</Text></HStack>
                                        {candidate?.license && <HStack><Text>🚗</Text><Text>{candidate?.license}</Text></HStack>}
                                        <HStack><Text>🌍</Text><Text>{candidate?.country}</Text></HStack>
                                    </VStack>

                                    <HStack pt={2}>
                                        <Button size="sm" variant="outline" colorScheme="green">View</Button>
                                        <Button size="sm" variant="outline" colorScheme="green">Recommend</Button>
                                        <Button size="sm" colorScheme="yellow">Matches</Button>
                                    </HStack>
                                </VStack>
                            </Card>
                        );
                    })
                )}
            </Grid>
        </Box >
    );
}

export default CvDirectory;