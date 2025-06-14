'use client'
import {
    Box,
    Container,
    Heading,
    Text,
    Input,
    Select,
    Button,
    Flex,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import { IoSearch } from 'react-icons/io5'

export function HeroSection() {
    return (
        <Box
            bgImage="url('/Images/hero-bg.png')"
            bgSize={{ base: 'auto', md: "cover" }}
            backgroundRepeat={'no-repeat'}
            bgPosition="center"
            py={{ base: 12, md: 28 }}
            color="white"
            textAlign="center"
            position="relative"
            h={{ base: "400px", md: '650px' }}
            minH={{ base: '500px', md: '650px' }}
        >
            <Container maxW={{ base: '100%', md: '5xl' }} px={{ base: 4, md: 8 }}>
                <Heading
                    fontSize={{ base: '2xl', sm: '3xl', md: '70px' }}
                    fontWeight="bold"
                    lineHeight={{ base: '1.2', md: '1.1' }}
                >
                    Find Your Dream Job Today!
                </Heading>
                <Text
                    fontSize={{ base: 'sm', sm: 'md', md: '18px' }}
                    fontWeight="semibold"
                    mt={{ base: 2, md: 3 }}
                    px={{ base: 2, md: 0 }}
                >
                    Discover the Agencies, Agents, Trade Centres & Candidates.
                </Text>

                <Flex
                    bg="white"
                    borderRadius="xl"
                    mt={{ base: 6, md: 8 }}
                    direction={{ base: "column", md: "row" }}
                    gap={{ base: 2, md: 3 }}
                    align="center"
                    boxShadow="lg"
                    p={{ base: 3, md: 0 }}
                >
                    <InputGroup flex={1} w={{ base: '100%', md: 'auto' }}>
                        <InputLeftElement pointerEvents="none">
                            <IoSearch color="gray.500" />
                        </InputLeftElement>
                        <Input
                            color={'black'}
                            border={'none'}
                            placeholder="Job Title or Company"
                            pl={{ base: 10, md: 12 }}
                            outline={'none'}
                            _active={{ outline: "none" }}
                            _focus={{
                                ring: 0,
                                ringColor: "transparent",
                                borderColor: "transparent",
                                outline: "none"
                            }}
                            fontSize={{ base: 'sm', md: 'md' }}
                        />
                    </InputGroup>
                    <Select
                        color={'black'}
                        border={'none'}
                        placeholder="Select Location"
                        flex={1}
                        w={{ base: '100%', md: 'auto' }}
                        outline={'none'}
                        _focus={{
                            ring: 0,
                            ringColor: "transparent",
                            borderColor: "transparent",
                            outline: "none"
                        }}
                        _active={{ outline: "none" }}
                        fontSize={{ base: 'sm', md: 'md' }}
                    />
                    <Select
                        color={'black'}
                        border={'none'}
                        placeholder="Select Category"
                        flex={1}
                        w={{ base: '100%', md: 'auto' }}
                        outline={'none'}
                        _focus={{
                            ring: 0,
                            ringColor: "transparent",
                            borderColor: "transparent",
                            outline: "none"
                        }}
                        _active={{ outline: "none" }}
                        fontSize={{ base: 'sm', md: 'md' }}
                    />
                    <Button
                        as={Flex}
                        bg="#309689"
                        color='#fff'
                        p={{ base: 4, md: 10 }}
                        borderRadius={{ base: 'lg', md: 'xl' }}
                        borderBottomLeftRadius={{ base: 'lg', md: '0px' }}
                        borderTopLeftRadius={{ base: 'lg', md: '0px' }}
                        w={{ base: '100%', md: 'auto' }}
                        justifyContent="center"
                        fontSize={{ base: 'sm', md: 'md' }}
                    >
                        <IoSearch className="mr-2" />
                        Search
                    </Button>
                </Flex>
            </Container>

            <Box
                bg="#383d46"
                py={{ base: 3, md: 2 }}
                position={'absolute'}
                bottom={0}
                w={'100%'}
                px={{ base: 2, md: 4 }}
                overflow="hidden"
            >
                <Box
                    as="div"
                    // display={{ base: 'block', md: 'none' }}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    width="100%"
                    position="relative"
                    py={2}
                    css={{
                        '@keyframes marquee': {
                            '0%': { transform: 'translateX(100%)' },
                            '100%': { transform: 'translateX(-100%)' },
                        },
                        '& > div': {
                            animation: 'marquee 20s linear infinite',
                        }
                    }}
                >
                    <Flex
                        display="inline-flex"
                        color="white"
                        fontSize={{ base: 'xs', sm: 'sm' }}
                        gap={{ base: 6, sm: 8 }}
                        align="center"
                        flexWrap="nowrap"
                        width="max-content"
                        whiteSpace="nowrap"
                        py={{ base: 0, md: 2 }}
                    >
                        {Array(1).fill(0).map((_, index) => (
                            <Box key={index}>
                                <Flex display="inline-flex" gap={{ base: 2, sm: 3 }} align="center" flexShrink={0}>
                                    <Text fontSize={'18px'} color="red.400" fontWeight="bold" display="inline">
                                        ⚠
                                    </Text>
                                    <Text fontSize={'18px'} color="white" display="inline" ml={2}>
                                        New Visa Policies Announced For Gulf Countries - Effective Immediately
                                    </Text>
                                </Flex>

                                <Text color="gray.400" display="inline" mx={4}>
                                    •
                                </Text>

                                <Flex display="inline-flex" gap={{ base: 2, sm: 3 }} align="center" flexShrink={0}>
                                    <Text fontSize={'18px'} color="yellow.400" fontWeight="bold" display="inline">
                                        UPDATE:
                                    </Text>
                                    <Text fontSize={'18px'} color="white" display="inline" ml={2}>
                                        Hajj Applications Now Open - Limited Slots Available.
                                    </Text>
                                </Flex>
                            </Box>
                        ))}
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
}


