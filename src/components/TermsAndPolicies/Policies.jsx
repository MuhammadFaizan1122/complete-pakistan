'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  UnorderedList,
  ListItem,
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
    <Heading as="h2" size="md" mb={3} color="black">
      {title}
    </Heading>
    <Box color="gray.700">{children}</Box>
  </Box>
);

export default function PrivacyPolicyPage() {

  return (
    <Box bg="gray.50" py={{ base: 10, md: 16 }}>
      <Container maxW="1440px" fontSize={'lg'}>
        <Heading as="h1" size="lg" textAlign="center" color="black" mb={3}>
          Privacy Policy
        </Heading>

        <Text color="gray.700" mb={6}>
          This Privacy Policy explains how <b>Complete Pakistan</b> (“we”,
          “our”, “us”) collects, uses, shares, and protects your information
          when you use our platform and services, including job visa assistance,
          interview scheduling, overseas employment facilitation, GAMCA medical
          appointments and approved centers, <i>naqal kafala</i> assistance, CV
          creation, Hajj & Umrah services, NAVTTC-related information, ticketing
          services, and more.
        </Text>

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
              ['Information We Collect', 'collect'],
              ['How We Use Information', 'use'],
              ['Sharing & Disclosure', 'share'],
              ['Cookies & Tracking', 'cookies'],
              ['Data Security', 'security'],
              ['Data Retention', 'retention'],
              ['International Transfers', 'transfers'],
              ['Your Rights', 'rights'],
              ['Children’s Privacy', 'children'],
              ['Updates to this Policy', 'updates'],
              ['Contact Us', 'contact'],
            ].map(([label, id]) => (
              <ListItem key={id}>
                <CLink as={Link} href={`#${id}`} color="#0a7450">
                  {label}
                </CLink>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>

        <Section id="collect" title="1. Information We Collect">
          <UnorderedList spacing={2}>
            <ListItem>
              <b>Personal Identifiers:</b> Name, CNIC/Passport, date of birth,
              email, phone/WhatsApp, address.
            </ListItem>
            <ListItem>
              <b>Service Data:</b> Job preferences, CV details, interview
              schedules, visa documentation, GAMCA appointment info, medical
              center selection, ticketing details, Hajj/Umrah requirements.
            </ListItem>
            <ListItem>
              <b>Technical Data:</b> IP address, device/browser type, pages
              visited, approximate location, and usage analytics.
            </ListItem>
            <ListItem>
              <b>Communications:</b> Messages you send via forms, email, or
              chat, and support records.
            </ListItem>
          </UnorderedList>
        </Section>

        <Section id="use" title="2. How We Use Information">
          <UnorderedList spacing={2}>
            <ListItem>To provide and manage requested services.</ListItem>
            <ListItem>
              To connect you with consultants, promoters, medical centers,
              airlines, and trade partners.
            </ListItem>
            <ListItem>To verify identity, prevent fraud, and ensure safety.</ListItem>
            <ListItem>To communicate confirmations, updates, and support.</ListItem>
            <ListItem>To comply with legal and regulatory obligations.</ListItem>
            <ListItem>To improve our platform and user experience.</ListItem>
          </UnorderedList>
        </Section>

        <Section id="share" title="3. Sharing & Disclosure">
          <Text mb={3}>
            We do not sell your personal data. We may share information with:
          </Text>
          <UnorderedList spacing={2}>
            <ListItem>
              <b>Service Providers/Partners:</b> Consultants, OEPs, GAMCA
              medical centers, airlines/travel agents, NAVTTC/governmental
              bodies where required.
            </ListItem>
            <ListItem>
              <b>Compliance & Legal:</b> To comply with applicable law or
              protect rights, safety, and security.
            </ListItem>
            <ListItem>
              <b>With Your Consent:</b> When you ask or authorize us to share.
            </ListItem>
          </UnorderedList>
        </Section>

        <Section id="cookies" title="4. Cookies & Tracking">
          <Text mb={3}>
            We use cookies and similar technologies to operate and improve the
            platform. You can manage cookies via your browser settings. Some
            features may not function properly if cookies are disabled.
          </Text>
        </Section>

        <Section id="security" title="5. Data Security">
          <Text>
            We use reasonable administrative, technical, and physical safeguards
            to protect personal information. However, no method of transmission
            or storage is 100% secure, and we cannot guarantee absolute
            security.
          </Text>
        </Section>

        <Section id="retention" title="6. Data Retention">
          <Text>
            We retain personal data for as long as necessary to provide
            services, meet legal/regulatory requirements, resolve disputes, and
            enforce agreements. When no longer needed, we take steps to delete
            or anonymize data.
          </Text>
        </Section>

        <Section id="transfers" title="7. International Transfers">
          <Text>
            Depending on the service (e.g., Gulf employment, airline ticketing,
            GAMCA processes), your data may be transferred to or processed in
            other countries with different data protection laws. We take steps
            to protect your data consistent with this Policy.
          </Text>
        </Section>

        <Section id="rights" title="8. Your Rights">
          <UnorderedList spacing={2}>
            <ListItem>Access, correct, or delete certain personal data.</ListItem>
            <ListItem>Object to or restrict certain processing.</ListItem>
            <ListItem>Withdraw consent where processing is based on consent.</ListItem>
            <ListItem>
              To exercise rights, contact us at{' '}
              <CLink href="mailto:info@completepakistan.com" color="#0a7450">
                info@completepakistan.com
              </CLink>
              .
            </ListItem>
          </UnorderedList>
        </Section>

        <Section id="children" title="9. Children’s Privacy">
          <Text>
            Our platform is intended for individuals 18+ or those using the
            platform under guardian supervision for lawful purposes. We do not
            knowingly collect data from children without appropriate consent.
          </Text>
        </Section>

        <Section id="updates" title="10. Updates to this Policy">
          <Text>
            We may update this Policy periodically. Material changes will be
            indicated by updating the “Effective Date.” Continued use after
            changes constitutes acceptance.
          </Text>
        </Section>

        <Section id="contact" title="11. Contact Us">
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
