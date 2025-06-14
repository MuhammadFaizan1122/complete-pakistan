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
            bgImage="url('/Images/JobsBanner.jpg')"
            bgSize="cover"
            backgroundRepeat={'no-repeat'}
            bgPosition="center"
            py={28}
            color="white"
            textAlign="center"
            position="relative"
            h={{ base: '240px', md: '350px' }}
        >
            <Container maxW="5xl">
                <Heading fontSize={{ base: "3xl", md: "70px" }} fontWeight="bold">
                    Jobs
                </Heading>

            </Container>

        </Box>
    );
}
