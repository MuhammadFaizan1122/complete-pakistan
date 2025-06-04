'use client'
import React from "react";
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname()
    return (
        <Box bg="white" boxShadow="sm" py={4}>
            <Container maxW="1440px" display="flex" justifyContent="space-between" alignItems="center">
                <Image width={150} height={50} src="/Images/logo.png" alt="CompletePakistan Logo" />
                <Flex gap={10} align="center">
                    <Link href={'/'}>
                        <Text _hover={{ color: '#309689' }} cursor="pointer" className={`duration-300 ${pathname === '/' ? 'text-[#309689] font-semibold' : ""}`}>Home</Text>
                    </Link>
                    <Link href={'#'}>
                        <Text _hover={{ color: '#309689' }} cursor="pointer" className={`duration-300 ${pathname === '/' ? '' : ""}`}>Make CV</Text>
                    </Link>
                    <Link href={'#'}>
                        <Text _hover={{ color: '#309689' }} cursor="pointer" className={`duration-300 ${pathname === '/' ? '' : ""}`}>Hajj & Umrah</Text>
                    </Link>
                    <Link href={'#'}>
                        <Text _hover={{ color: '#309689' }} cursor="pointer" className={`duration-300 ${pathname === '/' ? '' : ""}`}>Recruitment</Text>
                    </Link>
                    <Link href={'#'}>
                        <Text _hover={{ color: '#309689' }} cursor="pointer" className={`duration-300 ${pathname === '/' ? '' : ""}`}>Jobs Visa</Text>
                    </Link>
                    <Link href={'#'}>
                        <Text _hover={{ color: '#309689' }} cursor="pointer" className={`duration-300 ${pathname === '/' ? '' : ""}`}>Protector</Text>
                    </Link>
                    <Link href={'#'}>
                        <Text _hover={{ color: '#309689' }} cursor="pointer" className={`duration-300 ${pathname === '/' ? '' : ""}`}>Interview</Text>
                    </Link>
                    <Link href={'#'}>
                        <Text _hover={{ color: '#309689' }} cursor="pointer" className={`duration-300 ${pathname === '/' ? '' : ""}`}>About Us</Text>
                    </Link>
                    <Link href={'#'}>
                        <Text _hover={{ color: '#309689' }} cursor="pointer" className={`duration-300 ${pathname === '/' ? '' : ""}`}>Contact Us</Text>
                    </Link>
                </Flex>
                <Flex>
                    <Button bg={'#fff'} color={'#000'}>Login</Button>
                    <Button bg={'#309689'} color={'#fff'} border={"1px"} _hover={{ color: "#000", bg: '#fff', borderColor: "#000" }}>Register</Button>
                </Flex>
            </Container>
        </Box>
    );
}
