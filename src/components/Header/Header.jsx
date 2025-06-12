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
    Menu,
    MenuButton,
    Avatar,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const onToggle = () => setIsOpen(!isOpen);
    const onClose = () => setIsOpen(false);
    const { data: session, status } = useSession()
    console.log('session', session, status)

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/create-cv', label: 'Make CV' },
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
                    {navLinks.map((link, i) => (
                        <Link key={i} href={link.href}>
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
                <Flex gap={2} align="center">
                    {status === "authenticated" ? (
                        <Menu>
                            <MenuButton>
                                <Avatar
                                    size="md"
                                    name={session?.user?.name || "User"}
                                    src={session?.user?.image || undefined}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem as={Link} href="/profile">
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={() => signOut()}>
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <Flex gap={2} display={{ base: 'none', md: 'flex' }}>
                            <Button as={Link} href={'/login'} bg={'#fff'} color={'#000'}>
                                Login
                            </Button>
                            <Button
                                as={Link}
                                href={'/signup'}
                                bg={'#309689'}
                                color={'#fff'}
                                rounded={'8px'}
                                border="1px"
                                _hover={{ color: "#000", bg: '#fff', borderColor: "#000" }}
                            >
                                Register
                            </Button>
                        </Flex>
                    )}
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
                            {navLinks.map((link, i) => (
                                <Link key={i} href={link.href} onClick={onClose}>
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
                                as={Link}
                                href={'/login'}
                                bg={'#fff'}
                                color={'#000'}
                                width="full"
                                onClick={onClose}
                            >
                                Login
                            </Button>
                            <Button
                                as={Link}
                                href={'/signup'}
                                bg={'#309689'}
                                color={'#fff'}
                                border="1px"
                                width="full"
                                _hover={{ color: "#000", bg: '#fff', borderColor: "#000" }}
                                onClick={onClose}
                                rounded={'8px'}
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