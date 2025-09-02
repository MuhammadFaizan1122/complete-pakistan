'use client';

import {
    Box,
    Container,
    Heading,
    Text,
    ListItem,
    UnorderedList,
    OrderedList,
    Divider,
    Link as CLink,
} from '@chakra-ui/react';
import Link from 'next/link';

const Section = ({
    title,
    children,
    id,
}) => (
    <Box id={id} mt={{ base: 8, md: 10 }}>
        <Heading
            as="h2"
            size="md"
            mb={3}
            fontWeight="bold"
            letterSpacing="tight"
            color="black"
        >
            {title}
        </Heading>
        <Box color="gray.700">{children}</Box>
    </Box>
);

export default function TermsAndConditionsPage() {
    const updated = new Date().toLocaleDateString();

    return (
        <Box bg="gray.50" py={{ base: 10, md: 16 }}>
            <Container maxW="1440px" fontSize={'lg'}>
                <Heading
                    as="h1"
                    size="lg"
                    textAlign="center"
                    mb={{ base: 3, md: 4 }}
                    color="black"
                >
                    Terms & Conditions
                </Heading>

                {/* Intro */}
                <Text color="gray.700" mb={6}>
                    Welcome to <b>Complete Pakistan</b> (“we”, “our”, “us”). By accessing
                    or using our platform, you agree to these Terms & Conditions. If you
                    do not agree, please discontinue use of our services.
                </Text>

                {/* Quick Nav */}
                <Box
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    rounded="xl"
                    p={{ base: 4, md: 6 }}
                >
                    <Heading as="h3" size="sm" mb={2} color="black">
                        Table of Contents
                    </Heading>
                    <UnorderedList spacing={1} color="gray.700">
                        {[
                            ['Introduction', 'introduction'],
                            ['Services & Role', 'services'],
                            ['User Responsibilities', 'user-responsibilities'],
                            ['Payments & Fees', 'payments'],
                            ['Third-Party Services', 'third-parties'],
                            ['No Guarantees & Limitation of Liability', 'liability'],
                            ['Prohibited Use', 'prohibited'],
                            ['Intellectual Property', 'ip'],
                            ['Suspension/Termination', 'termination'],
                            ['Governing Law & Disputes', 'law'],
                            ['Changes to Terms', 'changes'],
                            ['Contact', 'contact'],
                        ].map(([label, id]) => (
                            <ListItem key={id}>
                                <CLink as={Link} href={`#${id}`} color="#0a7450">
                                    {label}
                                </CLink>
                            </ListItem>
                        ))}
                    </UnorderedList>
                </Box>

                <Section id="introduction" title="1. Introduction">
                    <Text>
                        Complete Pakistan is a service platform that facilitates and/or
                        provides: job visa assistance, interview scheduling with Gulf
                        companies, connections with consultants, trade partners and overseas
                        employment promoters (OEPs), GAMCA medical appointments and
                        approved centers, <i>naqal kafala</i> assistance, CV creation,
                        Hajj/Umrah facilitation, NAVTTC-related information, ticketing
                        services, and related offerings (“Services”).
                    </Text>
                </Section>

                <Section id="services" title="2. Services & Role">
                    <UnorderedList spacing={2}>
                        <ListItem>
                            We primarily act as a <b>facilitator/intermediary</b> connecting
                            users with relevant third parties (consultants, promoters, medical
                            centers, airlines, etc.).
                        </ListItem>
                        <ListItem>
                            Service availability, timelines, and outcomes may depend on
                            <b> third-party processes</b> and <b>government regulations</b>.
                        </ListItem>
                        <ListItem>
                            Information on the platform is provided in good faith but may
                            change without notice due to policy/regulatory updates.
                        </ListItem>
                    </UnorderedList>
                </Section>

                <Section id="user-responsibilities" title="3. User Responsibilities">
                    <UnorderedList spacing={2}>
                        <ListItem>Provide accurate, current, and complete information.</ListItem>
                        <ListItem>
                            Use the Services only for lawful purposes and in compliance with
                            applicable laws and immigration rules.
                        </ListItem>
                        <ListItem>
                            Maintain the confidentiality of account credentials and restrict
                            unauthorized access.
                        </ListItem>
                        <ListItem>
                            Promptly respond to requests for documents or clarifications.
                        </ListItem>
                    </UnorderedList>
                </Section>

                <Section id="payments" title="4. Payments & Fees">
                    <UnorderedList spacing={2}>
                        <ListItem>
                            Paid Services will display fees prior to purchase/booking.
                        </ListItem>
                        <ListItem>
                            Unless expressly stated otherwise, all payments are{' '}
                            <b>non-refundable</b>.
                        </ListItem>
                        <ListItem>
                            You are responsible for any <b>third-party charges</b> (e.g.,
                            consultants, OEPs, medical centers, airlines, visa centers,
                            couriers).
                        </ListItem>
                    </UnorderedList>
                </Section>

                <Section id="third-parties" title="5. Third-Party Services">
                    <Text mb={3}>
                        We may refer, link, or connect you to third-party providers. We do
                        not control and are not responsible for their actions, omissions, or
                        policies.
                    </Text>
                    <UnorderedList spacing={2}>
                        <ListItem>
                            Any disputes should be resolved directly with the relevant third
                            party.
                        </ListItem>
                        <ListItem>
                            Your use of third-party services is subject to their own terms and
                            privacy policies.
                        </ListItem>
                    </UnorderedList>
                </Section>

                <Section
                    id="liability"
                    title="6. No Guarantees & Limitation of Liability"
                >
                    <UnorderedList spacing={2}>
                        <ListItem>
                            We do <b>not guarantee</b> employment offers, visa approvals,
                            immigration outcomes, or timelines.
                        </ListItem>
                        <ListItem>
                            To the maximum extent permitted by law, we are not liable for
                            indirect, incidental, special, consequential, or punitive damages,
                            or loss of data, profits, or business opportunities.
                        </ListItem>
                        <ListItem>
                            Service outcomes can be affected by government policies, embassy
                            rules, security checks, and third-party processing—outside our
                            control.
                        </ListItem>
                    </UnorderedList>
                </Section>

                <Section id="prohibited" title="7. Prohibited Use">
                    <UnorderedList spacing={2}>
                        <ListItem>Fraudulent or misleading submissions.</ListItem>
                        <ListItem>
                            Uploading unlawful, defamatory, or infringing content.
                        </ListItem>
                        <ListItem>Attempting to breach platform security or integrity.</ListItem>
                        <ListItem>Spamming or abusive behavior.</ListItem>
                    </UnorderedList>
                </Section>

                <Section id="ip" title="8. Intellectual Property">
                    <Text>
                        The platform, brand, logos, content, guides, templates, and tools
                        are protected by intellectual property laws. You may not copy,
                        distribute, or create derivative works without our prior written
                        consent.
                    </Text>
                </Section>

                <Section id="termination" title="9. Suspension/Termination">
                    <Text>
                        We may suspend or terminate access to the platform for violations of
                        these Terms, unlawful activity, or to comply with legal
                        obligations.
                    </Text>
                </Section>

                <Section id="law" title="10. Governing Law & Disputes">
                    <Text>
                        These Terms are governed by the laws of Pakistan. Courts in Pakistan
                        shall have exclusive jurisdiction over disputes, subject to
                        applicable mandatory laws.
                    </Text>
                </Section>

                <Section id="changes" title="11. Changes to Terms">
                    <Text>
                        We may update these Terms from time to time. Continued use of the
                        platform after changes constitutes acceptance of the revised Terms.
                    </Text>
                </Section>

                <Section id="contact" title="12. Contact">
                    <Text>
                        Email:{' '}
                        <CLink href="mailto:info@completepakistan.com" color="#0a7450">
                            info@completepakistan.com
                        </CLink>{' '}
                        | Phone:{' '}
                        <CLink href="tel:+923102632470" color="#0a7450">
                            +92 310 2632470
                        </CLink>{' '}
                        | Address: Islamabad, Pakistan
                    </Text>
                </Section>
            </Container>
        </Box>
    );
}
