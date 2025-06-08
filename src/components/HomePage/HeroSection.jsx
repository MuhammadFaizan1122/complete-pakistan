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
            bgSize="cover"
            backgroundRepeat={'no-repeat'}
            bgPosition="center"
            py={28}
            color="white"
            textAlign="center"
            position="relative"
            h={'650px'}
        >
            <Container maxW="5xl">
                <Heading fontSize={{ base: "3xl", md: "70px" }} fontWeight="bold">
                    Find Your Dream Job Today!
                </Heading>
                <Text fontSize={{ base: "md", md: "18px" }} className="font-semibold" mt={3}>
                    Discover the Agencies, Agents, Trade Centres & Candidates.
                </Text>

                {/* Search Bar */}
                <Flex
                    bg="white"
                    borderRadius="xl"
                    // p={4}
                    mt={8}
                    direction={{ base: "column", md: "row" }}
                    gap={3}
                    align="center"
                    boxShadow="lg"
                >
                    <Input color={'black'} border={'none'} placeholder="Job Title or Company" flex={1} pl={10} outline={'0px'} />
                    <Select color={'black'} border={'none'} placeholder="Select Location" flex={1} outline={'none'} />
                    <Select color={'black'} border={'none'} placeholder="Select Category" flex={1} outline={'none'} />
                    <Button as={Flex} bg="#309689" color='#fff' p={10} borderRadius="xl" borderBottomLeftRadius={'0px'} borderTopLeftRadius={'0px'} >
                        <IoSearch className="mr-2" />
                        Search
                    </Button>
                </Flex>
            </Container>

            <Box bg="#383d46" py={2} position={'absolute'} bottom={0} w={'100%'} px={4} >
                <Flex
                    maxW="7xl"
                    mx="auto"
                    color="white"
                    fontSize="md"
                    gap={4}
                    h={16}
                    align="center"
                    justifyContent={'center'}
                    flexWrap="wrap"
                >
                    <Text color="red.400" fontWeight="bold">
                        ⚠ <span className="text-white ml-2"> New Visa Policies Announced For Gulf Countries - Effective Immediately</span>
                    </Text>
                    <Text color="yellow.400" fontWeight="bold">
                        UPDATE:
                    </Text>
                    <Text>
                        Hajj Applications Now Open - Limited Slots Available
                    </Text>
                </Flex>
            </Box>
        </Box>
    );
}
