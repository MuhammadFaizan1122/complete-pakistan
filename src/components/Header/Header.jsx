'use client'
import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    Flex,
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
    Collapse,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [cvMenuOpen, setCvMenuOpen] = useState(false);
    const [recruitmentOpen, setRecruitmentOpen] = useState(false);

    const onToggle = () => setIsOpen(!isOpen);
    const onClose = () => {
        setIsOpen(false);
        setCvMenuOpen(false);
    };

    const { data: session, status } = useSession();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/create-cv', label: 'Make CV' },
        { href: '#', label: 'Hajj & Umrah' },
        { href: '#', label: 'Recruitment' },
        { href: '/jobs', label: 'Jobs Visa' },
        { href: '#', label: 'Protector' },
        { href: '#', label: 'Interview' },
        { href: '/about-us', label: 'About Us' },
        { href: '/contact-us', label: 'Contact Us' },
    ];

    const makeCvLinks = [
        { href: '/create-cv', label: 'Create CV' },
        { href: '/cv-directory', label: 'Create Other CV' },
        { href: '/cv-directory', label: 'CV Directory' },
    ];
    const recruitmentLinks = [
        { href: '/dashboard', label: 'Overseas Employement Promoters - OEP' },
        { href: '/dashboard', label: 'Trade Test & Trade Center - TTC' },
        { href: '/dashboard', label: 'Verified Trade Partners' },
        { href: '/dashboard', label: 'Consultancies' },
    ];
    console.log('session', session)

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
                        link.label === "Make CV" ? (
                            <Menu key={i} isLazy>
                                <MenuButton fontWeight={pathname.startsWith("/create") ? "semibold" : "normal"} color={pathname.startsWith("/create") ? "#309689" : ""}>
                                    <Flex align="center" gap={1} cursor="pointer" _hover={{ color: "#309689" }} fontWeight={pathname.startsWith("/create") ? "semibold" : "normal"}>
                                        Make CV
                                    </Flex>
                                </MenuButton>
                                <MenuList>
                                    {makeCvLinks.map((subLink, j) => (
                                        <MenuItem key={j} as={Link} href={status === 'authenticated' ? subLink.href :'/auth/login'}>
                                            {subLink.label}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                        ) : link.label === "Recruitment" ? (
                            <Menu key={i} isLazy>
                                <MenuButton fontWeight={'normal'}>
                                    <Flex align="center" gap={1} cursor="pointer" _hover={{ color: "#309689" }} >
                                        Recruitment
                                    </Flex>
                                </MenuButton>
                                <MenuList>
                                    {recruitmentLinks.map((subLink, j) => (
                                        <MenuItem key={j} as={Link} href={subLink.href}>
                                            {subLink.label}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                        ) : (
                            <Link key={i} href={link.href}>
                                <Text
                                    _hover={{ color: '#309689' }}
                                    cursor="pointer"
                                    className={`duration-300 ${pathname === link.href ? 'text-[#309689] font-semibold' : ""}`}
                                >
                                    {link.label}
                                </Text>
                            </Link>
                        )
                    ))}
                </Flex>

                {/* Desktop Auth */}
                <Flex gap={2} align="center" display={{ base: 'none', md: 'flex' }}>
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
                        <>
                            <Button as={Link} href={'/auth/login'} bg={'#fff'} color={'#000'}>
                                Login
                            </Button>
                            <Button
                                as={Link}
                                href={'/auth/signup'}
                                bg={'#309689'}
                                color={'#fff'}
                                rounded={'8px'}
                                border="1px"
                                _hover={{ color: "#000", bg: '#fff', borderColor: "#000" }}
                            >
                                Register
                            </Button>
                        </>
                    )}
                </Flex>

                {/* Mobile Menu Button */}
                <IconButton
                    aria-label="Open Menu"
                    icon={<FaBars />}
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onToggle}
                    variant="outline"
                />
            </Container>

            {/* Mobile Drawer */}
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        {status === "authenticated" && (
                            <Flex align="center" mt={4} gap={3}>
                                <Avatar size="md" src={session?.user?.image || undefined} />
                                <Text>{session?.user?.name || "User"}</Text>
                            </Flex>
                        )}
                    </DrawerHeader>
                    <DrawerBody>
                        <VStack align="start" spacing={4}>
                            {status === 'authenticated'
                                &&
                                <Link href={'/profile'} onClick={onClose}>
                                    <Text
                                        _hover={{ color: '#309689' }}
                                        cursor="pointer"
                                        className={`duration-300 ${pathname === '/profile' ? 'text-[#309689] font-semibold' : ""}`}
                                    >
                                        Profile
                                    </Text>
                                </Link>
                            }
                            {navLinks.map((link, i) => {
                                if (link.label === "Make CV") {
                                    return (
                                        <Box key={i} width="full">
                                            <Flex
                                                justify="space-between"
                                                align="center"
                                                onClick={() => setCvMenuOpen(!cvMenuOpen)}
                                                cursor="pointer"
                                                _hover={{ color: "#309689" }}
                                            >
                                                <Text
                                                    className={`duration-300 ${pathname.startsWith("/create") || pathname === "/cv-directory" ? 'text-[#309689] font-semibold' : ""}`}
                                                >
                                                    Make CV
                                                </Text>

                                            </Flex>
                                            <Collapse in={cvMenuOpen} animateOpacity>
                                                <VStack pl={4} pt={2} align="start">
                                                    {makeCvLinks.map((sub, j) => (
                                                        <Link key={j} href={sub.href} onClick={onClose}>
                                                            <Text
                                                                _hover={{ color: "#309689" }}
                                                                className={`duration-300 ${pathname === sub.href ? 'text-[#309689] font-semibold' : ""}`}
                                                            >
                                                                {sub.label}
                                                            </Text>
                                                        </Link>
                                                    ))}
                                                </VStack>
                                            </Collapse>
                                        </Box>
                                    );
                                } else if (link.label === "Recruitment") {
                                    return (
                                        <Box key={i} width="full">
                                            <Flex
                                                justify="space-between"
                                                align="center"
                                                onClick={() => setRecruitmentOpen(!recruitmentOpen)}
                                                cursor="pointer"
                                                _hover={{ color: "#309689" }}
                                            >
                                                <Text
                                                    className={`duration-300 ${pathname.includes("/create") || pathname === "/cv-directory" ? 'text-[#309689] font-semibold' : ""}`}
                                                >
                                                    Recruitment
                                                </Text>

                                            </Flex>
                                            <Collapse in={recruitmentOpen} animateOpacity>
                                                <VStack pl={4} pt={2} align="start">
                                                    {recruitmentLinks.map((sub, j) => (
                                                        <Link key={j} href={sub.href} onClick={onClose}>
                                                            <Text
                                                                _hover={{ color: "#309689" }}
                                                                className={`duration-300 truncate ${pathname === sub.href ? 'text-[#309689] font-semibold' : ""}`}
                                                            >
                                                                {sub.label}
                                                            </Text>
                                                        </Link>
                                                    ))}
                                                </VStack>
                                            </Collapse>
                                        </Box>
                                    );
                                }
                                return (
                                    <Link key={i} href={link.href} onClick={onClose}>
                                        <Text
                                            _hover={{ color: '#309689' }}
                                            cursor="pointer"
                                            className={`duration-300 ${pathname === link.href ? 'text-[#309689] font-semibold' : ""}`}
                                        >
                                            {link.label}
                                        </Text>
                                    </Link>
                                );
                            })}
                            {status !== "authenticated" ? (
                                <>
                                    <Button
                                        as={Link}
                                        href={'/auth/login'}
                                        bg={'#fff'}
                                        color={'#000'}
                                        width="full"
                                        onClick={onClose}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        as={Link}
                                        href={'/auth/signup'}
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
                                </>
                            ) :
                                <Button
                                    bg={'#309689'}
                                    color={'#fff'}
                                    border="1px"
                                    width="full"
                                    _hover={{ color: "#000", bg: '#fff', borderColor: "#000" }}
                                    onClick={() => { signOut(), onClose() }}
                                    rounded={'8px'}
                                >
                                    Logout
                                </Button>
                            }
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}
