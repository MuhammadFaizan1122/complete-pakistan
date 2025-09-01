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
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
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
    const [gamcaOpen, setgamcaOpen] = useState(false);
    const [othersOpen, setothersOpen] = useState(false);
    const [jobsOpen, setjobsOpen] = useState(false);

    const onToggle = () => setIsOpen(!isOpen);
    const onClose = () => {
        setIsOpen(false);
        setCvMenuOpen(false);
    };

    const { data: session, status } = useSession();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/create-cv', label: 'Make CV' },
        { href: '#', label: 'Management' },
        { href: '#', label: 'Gulfs Jobs' },
        { href: '#', label: 'GAMCA' },
        { href: '/naqal-kafala', label: 'Naqal Kafala' },
        { href: '/fraud-alert', label: 'Fraud Alert' },
        { href: '#', label: 'Help Center' },
        // { href: '#', label: 'More' },
    ];

    const makeCvLinks = [
        { href: '/create-cv', label: 'Create CV' },
        { href: '/create-others-cv', label: 'Create Other CV' },
        { href: '/cv-directory', label: 'CV Directory' },
    ];
    const gamcaLinks = [
        { href: '/gamca/approved-medical-centers', label: 'GAMCA approved medical centers' },
        { href: '/gamca/issues-and-solutions', label: 'Medical Issues, Solution & Tips' },
        { href: '/gamca/medical-appointment', label: 'GAMCA Medical Appointment' },

    ];
    const recruitmentLinks = [
        { href: '/recruitment/gulf-companies', label: 'Gulf Companies Directory' },
        { href: '/recruitment/oep', label: 'Overseas Employement Promoters - OEP' },
        { href: '/recruitment/ttc', label: 'Trade Test & Traning Center - TTC' },
        { href: '/recruitment/vtp', label: 'Verified Trade Partners' },
        { href: '/gamca/ready-medical-cases', label: 'Ready Medical Cases' },
        { href: '/hajj-and-umrah', label: 'Hajj & Umrah' },
        { href: '/ticketing', label: 'Ticketing' },
        { href: '/recruitment/consultancies', label: 'Consultant Directory' },
        { href: '/navttc', label: 'NAVTTC' },
        { href: '/protectors', label: 'Protector Information' },
    ];
    const othersLinks = [
    ];
    const jobs = [
        { href: '/jobs', label: 'Jobs' },
        { href: '/interviews', label: 'Interviews' },
    ];

    return (
        <Box bg="white" boxShadow="sm" py={4}>
            <Container maxW="1440px" display="flex" justifyContent="space-between" alignItems="center">
                <Link href={'/'}>
                    <Image width={150} height={50} src="/Images/header-logo.png" alt="CompletePakistan Logo" />
                </Link>
                {/* Desktop Navigation */}
                <Flex
                    gap={{ base: 4, md: 10 }}
                    align="center"
                    display={{ base: 'none', md: 'flex' }}
                >
                    {navLinks.map((link, i) => {
                        if (link.label === 'GAMCA') {
                            return (
                                <Popover trigger="hover" placement="bottom-start" key={i}>
                                    <PopoverTrigger>
                                        <Text
                                            fontWeight={pathname.startsWith('/gamca') ? 'semibold' : 'normal'}
                                            color={pathname.startsWith('/gamca') ? '#0a7450' : ''}
                                            cursor="pointer"
                                            _hover={{ color: '#0a7450' }}
                                        >
                                            GAMCA
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent w="fit-content">
                                        <PopoverBody p={2}>
                                            {gamcaLinks.map((subLink, j) => (
                                                <abbr key={j} title={subLink.label} style={{ textDecoration: 'none' }}>
                                                    <Box

                                                        as={Link}
                                                        href={status === 'authenticated' ? subLink.href : '/auth/login'}
                                                        display="block"
                                                        px={3}
                                                        py={2}
                                                        borderRadius="md"
                                                        _hover={{ bg: 'gray.100' }}
                                                    >
                                                        {subLink.label}
                                                    </Box>
                                                </abbr>
                                            ))}
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            )
                        } else if (link.label === 'Make CV') {
                            return (
                                <Popover trigger="hover" placement="bottom-start" key={i}>
                                    <PopoverTrigger>
                                        <Text
                                            fontWeight={pathname.startsWith('/create') ? 'semibold' : 'normal'}
                                            color={pathname.startsWith('/create') ? '#0a7450' : ''}
                                            cursor="pointer"
                                            _hover={{ color: '#0a7450' }}
                                        >
                                            Make CV
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent w="fit-content">
                                        <PopoverBody p={2}>
                                            {makeCvLinks.map((subLink, j) => (
                                                <abbr key={j} title={subLink.label} style={{ textDecoration: 'none' }}>
                                                    <Box

                                                        as={Link}
                                                        href={status === 'authenticated' ? subLink.href : '/auth/login'}
                                                        display="block"
                                                        px={3}
                                                        py={2}
                                                        borderRadius="md"
                                                        _hover={{ bg: 'gray.100' }}
                                                    >
                                                        {subLink.label}
                                                    </Box>
                                                </abbr>
                                            ))}
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            )
                        } else if (link.label === 'Gulfs Jobs') {
                            return (
                                <Popover trigger="hover" placement="bottom-start" key={i}>
                                    <PopoverTrigger>
                                        <Text
                                            fontWeight={pathname.startsWith('/create') ? 'semibold' : 'normal'}
                                            color={pathname.startsWith('/create') ? '#0a7450' : ''}
                                            cursor="pointer"
                                            _hover={{ color: '#0a7450' }}
                                        >
                                            Gulfs Jobs
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent w="fit-content">
                                        <PopoverBody p={2}>
                                            {jobs.map((subLink, j) => (
                                                <abbr key={j} title={subLink.label} style={{ textDecoration: 'none' }}>
                                                    <Box
                                                        as={Link}
                                                        href={status === 'authenticated' ? subLink.href : '/auth/login'}
                                                        display="block"
                                                        px={3}
                                                        py={2}
                                                        borderRadius="md"
                                                        _hover={{ bg: 'gray.100' }}
                                                    >
                                                        {subLink.label}
                                                    </Box>
                                                </abbr>
                                            ))}
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            )
                        } else if (link.label === 'Management') {
                            return (
                                <Popover trigger="hover" placement="bottom-start" key={i}>
                                    <PopoverTrigger>
                                        <Text
                                            cursor="pointer"
                                            _hover={{ color: '#0a7450' }}
                                        >
                                            Management
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent w="fit-content">
                                        <PopoverBody p={2}>
                                            {recruitmentLinks.map((subLink, j) => (
                                                <abbr key={j} title={subLink.label} style={{ textDecoration: 'none' }}>
                                                    <Box
                                                        as={Link}
                                                        href={subLink.href}
                                                        display="block"
                                                        px={3}
                                                        py={2}
                                                        borderRadius="md"
                                                        _hover={{ bg: 'gray.100' }}
                                                    >
                                                        {subLink.label}
                                                    </Box>
                                                </abbr>
                                            ))}
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            )
                        } 
                        // else if (link.label === 'More') {
                        //     return (
                        //         <Popover trigger="hover" placement="bottom-start" key={i}>
                        //             <PopoverTrigger>
                        //                 <Text
                        //                     cursor="pointer"
                        //                     _hover={{ color: '#0a7450' }}
                        //                 >
                        //                     More
                        //                 </Text>
                        //             </PopoverTrigger>
                        //             <PopoverContent w="fit-content">
                        //                 <PopoverBody p={2}>
                        //                     {othersLinks.map((subLink, j) => (
                        //                         <abbr key={j} title={subLink.label} style={{ textDecoration: 'none' }}>
                        //                             <Box
                        //                                 as={Link}
                        //                                 href={subLink.href}
                        //                                 display="block"
                        //                                 px={3}
                        //                                 py={2}
                        //                                 borderRadius="md"
                        //                                 _hover={{ bg: 'gray.100' }}
                        //                             >
                        //                                 {subLink.label}
                        //                             </Box>
                        //                         </abbr>
                        //                     ))}
                        //                 </PopoverBody>
                        //             </PopoverContent>
                        //         </Popover>
                        //     )
                        // }

                        // Regular non-dropdown links
                        return (
                            <Link key={i} href={link.href}>
                                <Text
                                    _hover={{ color: '#0a7450' }}
                                    cursor="pointer"
                                    fontWeight={pathname === link.href ? 'semibold' : 'normal'}
                                    color={pathname === link.href ? '#0a7450' : ''}
                                    transition="color 0.3s"
                                >
                                    {link.label}
                                </Text>
                            </Link>
                        )
                    })}
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
                                {session.user?.role === 'company' && (
                                    <MenuItem as={Link} href="/dashboard">
                                        Dashboard
                                    </MenuItem>
                                )}
                                {session.user?.role !== 'company' && (
                                    <MenuItem as={Link} href="/auth/company-registration">
                                        Company Registration
                                    </MenuItem>
                                )}
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
                                href={'/auth/company-registration'}
                                bg={'#0a7450'}
                                color={'#fff'}
                                rounded={'8px'}
                                border="1px"
                                _hover={{ color: "#000", bg: '#fff', borderColor: "#000" }}
                            >
                                Register Agency
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
                                        _hover={{ color: '#0a7450' }}
                                        cursor="pointer"
                                        className={`duration-300 ${pathname === '/profile' ? 'text-[#0a7450] font-semibold' : ""}`}
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
                                                _hover={{ color: "#0a7450" }}
                                            >
                                                <Text
                                                    className={`duration-300 ${pathname.startsWith("/create") || pathname === "/cv-directory" ? 'text-[#0a7450] font-semibold' : ""}`}
                                                >
                                                    Make CV
                                                </Text>

                                            </Flex>
                                            <Collapse in={cvMenuOpen} animateOpacity>
                                                <VStack pl={4} pt={2} align="start">
                                                    {makeCvLinks.map((sub, j) => (
                                                        <Link key={j} href={sub.href} onClick={onClose}>
                                                            <Text
                                                                _hover={{ color: "#0a7450" }}
                                                                className={`duration-300 ${pathname === sub.href ? 'text-[#0a7450] font-semibold' : ""}`}
                                                            >
                                                                {sub.label}
                                                            </Text>
                                                        </Link>
                                                    ))}
                                                </VStack>
                                            </Collapse>
                                        </Box>
                                    );
                                } else if (link.label === "Gulfs Jobs") {
                                    return (
                                        <Box key={i} width="full">
                                            <Flex
                                                justify="space-between"
                                                align="center"
                                                onClick={() => setjobsOpen(!jobsOpen)}
                                                cursor="pointer"
                                                _hover={{ color: "#0a7450" }}
                                            >
                                                <Text
                                                    className={`duration-300 ${pathname.includes("/jobs") || pathname === "/jobs" ? 'text-[#0a7450] font-semibold' : ""}`}
                                                >
                                                    Gulfs Jobs
                                                </Text>

                                            </Flex>
                                            <Collapse in={jobsOpen} animateOpacity>
                                                <VStack pl={4} pt={2} align="start">
                                                    {jobs.map((sub, j) => (
                                                        <Link key={j} href={sub.href} onClick={onClose}>
                                                            <Text
                                                                _hover={{ color: "#0a7450" }}
                                                                className={`duration-300 truncate ${pathname === sub.href ? 'text-[#0a7450] font-semibold' : ""}`}
                                                            >
                                                                {sub.label}
                                                            </Text>
                                                        </Link>
                                                    ))}
                                                </VStack>
                                            </Collapse>
                                        </Box>
                                    );
                                } else if (link.label === "Management") {
                                    return (
                                        <Box key={i} width="full">
                                            <Flex
                                                justify="space-between"
                                                align="center"
                                                onClick={() => setRecruitmentOpen(!recruitmentOpen)}
                                                cursor="pointer"
                                                _hover={{ color: "#0a7450" }}
                                            >
                                                <Text
                                                    className={`duration-300 ${pathname.includes("/create") || pathname === "/cv-directory" ? 'text-[#0a7450] font-semibold' : ""}`}
                                                >
                                                    Management
                                                </Text>

                                            </Flex>
                                            <Collapse in={recruitmentOpen} animateOpacity>
                                                <VStack pl={4} pt={2} align="start">
                                                    {recruitmentLinks.map((sub, j) => (
                                                        <Link key={j} href={sub.href} onClick={onClose}>
                                                            <Text
                                                                _hover={{ color: "#0a7450" }}
                                                                className={`duration-300 truncate ${pathname === sub.href ? 'text-[#0a7450] font-semibold' : ""}`}
                                                            >
                                                                {sub.label}
                                                            </Text>
                                                        </Link>
                                                    ))}
                                                </VStack>
                                            </Collapse>
                                        </Box>
                                    );
                                } else if (link.label === "GAMCA") {
                                    return (
                                        <Box key={i} width="full">
                                            <Flex
                                                justify="space-between"
                                                align="center"
                                                onClick={() => setgamcaOpen(!gamcaOpen)}
                                                cursor="pointer"
                                                _hover={{ color: "#0a7450" }}
                                            >
                                                <Text
                                                    className={`duration-300 ${pathname.includes("/gamca") || pathname === "/gamca" ? 'text-[#0a7450] font-semibold' : ""}`}
                                                >
                                                    GAMCA
                                                </Text>

                                            </Flex>
                                            <Collapse in={gamcaOpen} animateOpacity>
                                                <VStack pl={4} pt={2} align="start">
                                                    {gamcaLinks.map((sub, j) => (
                                                        <Link key={j} href={sub.href} onClick={onClose}>
                                                            <Text
                                                                _hover={{ color: "#0a7450" }}
                                                                className={`duration-300 truncate ${pathname === sub.href ? 'text-[#0a7450] font-semibold' : ""}`}
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
                                // else if (link.label === "More") {
                                //     return (
                                //         <Box key={i} width="full">
                                //             <Flex
                                //                 justify="space-between"
                                //                 align="center"
                                //                 onClick={() => setothersOpen(!othersOpen)}
                                //                 cursor="pointer"
                                //                 _hover={{ color: "#0a7450" }}
                                //             >
                                //                 <Text
                                //                     className={`duration-300 ${pathname.includes("/others") || pathname === "/cv-directory" ? 'text-[#0a7450] font-semibold' : ""}`}
                                //                 >
                                //                     More
                                //                 </Text>

                                //             </Flex>
                                //             <Collapse in={othersOpen} animateOpacity>
                                //                 <VStack pl={4} pt={2} align="start">
                                //                     {othersLinks.map((sub, j) => (
                                //                         <Link key={j} href={sub.href} onClick={onClose}>
                                //                             <Text
                                //                                 _hover={{ color: "#0a7450" }}
                                //                                 className={`duration-300 truncate ${pathname === sub.href ? 'text-[#0a7450] font-semibold' : ""}`}
                                //                             >
                                //                                 {sub.label}
                                //                             </Text>
                                //                         </Link>
                                //                     ))}
                                //                 </VStack>
                                //             </Collapse>
                                //         </Box>
                                //     );
                                // }
                                return (
                                    <Link key={i} href={link.href} onClick={onClose}>
                                        <Text
                                            _hover={{ color: '#0a7450' }}
                                            cursor="pointer"
                                            className={`duration-300 ${pathname === link.href ? 'text-[#0a7450] font-semibold' : ""}`}
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
                                        bg={'#0a7450'}
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
                                    bg={'#0a7450'}
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
