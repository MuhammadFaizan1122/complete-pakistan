'use client'
import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Text,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    IconButton,
    VStack,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const onToggle = () => setIsOpen(!isOpen);
    const onClose = () => setIsOpen(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/recent-jobs', label: 'Make CV' },
        { href: '#', label: 'Hajj & Umrah' },
        { href: '#', label: 'Recruitment' },
        { href: '/jobs', label: 'Jobs Visa' },
        { href: '#', label: 'Protector' },
        { href: '#', label: 'Interview' },
        { href: '#', label: 'About Us' },
        { href: '#', label: 'Contact Us' },
    ];

    return (
        <Box bg="white" boxShadow="sm" py={4}>
            <Container maxW="1440px" display="flex" justifyContent="space-between" alignItems="center">
                <Link href={'/'}>
                    <Image width={150} height={50} src="/Images/logo.png" alt="CompletePakistan Logo" />
                </Link>
                
                {/* Desktop Navigation */}
                <Flex 
                    gap={{ base: 4, md: 10 }} 
                    align="center" 
                    display={{ base: 'none', md: 'flex' }}
                >
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href}>
                            <Text 
                                _hover={{ color: '#309689' }} 
                                cursor="pointer" 
                                className={`duration-300 ${pathname === link.href ? 'text-[#309689] font-semibold' : ""}`}
                            >
                                {link.label}
                            </Text>
                        </Link>
                    ))}
                </Flex>
                
                {/* Mobile Menu Button */}
                <IconButton
                    aria-label="Open Menu"
                    icon={<FaBars />}
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onToggle}
                    variant="outline"
                />

                {/* Buttons */}
                <Flex gap={2} display={{ base: 'none', md: 'flex' }}>
                    <Button bg={'#fff'} color={'#000'}>Login</Button>
                    <Button 
                        bg={'#309689'} 
                        color={'#fff'} 
                        border="1px" 
                        _hover={{ color: "#000", bg: '#fff', borderColor: "#000" }}
                    >
                        Register
                    </Button>
                </Flex>
            </Container>

            {/* Mobile Drawer */}
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>
                    <DrawerBody>
                        <VStack align="start" spacing={4}>
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} onClick={onClose}>
                                    <Text 
                                        _hover={{ color: '#309689' }} 
                                        cursor="pointer" 
                                        className={`duration-300 ${pathname === link.href ? 'text-[#309689] font-semibold' : ""}`}
                                    >
                                        {link.label}
                                    </Text>
                                </Link>
                            ))}
                            <Button 
                                bg={'#fff'} 
                                color={'#000'} 
                                width="full"
                                onClick={onClose}
                            >
                                Login
                            </Button>
                            <Button 
                                bg={'#309689'} 
                                color={'#fff'} 
                                border="1px" 
                                width="full"
                                _hover={{ color: "#000", bg: '#fff', borderColor: "#000" }}
                                onClick={onClose}
                            >
                                Register
                            </Button>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}