'use client'
import { Box, Text, SimpleGrid, VStack, Icon, Button, List, ListItem, ListIcon } from "@chakra-ui/react";
import Image from "next/image";
import { FaSyncAlt, FaRegCheckCircle, FaRegComments, FaBell, FaUserAlt, FaBuilding, FaBriefcase, FaCheckCircle, FaCheck } from "react-icons/fa";

const features = [
  {
    title: "Daily Updates",
    description:
      "Our team verifies BEOE permissions, contacts agencies, and posts real job data daily.",
    icon: FaSyncAlt,
  },
  {
    title: "Transparency",
    description:
      "We display real company names and trades tried to permission numbers for complete transparency",
    icon: FaRegCheckCircle,
  },
  {
    title: "Live Matching",
    description:
      "Our system matches CVs from candidates, agents, and TTCs to active job listings in real-time",
    icon: FaRegComments,
  },
  {
    title: "Notifications",
    description:
      "Stay updated with WhatsApp and email alerts for job matches, visa updates, and medical expiries.",
    icon: FaBell,
  },
];

const services = [
  {
    title: "For Applicants",
    icon: '/Images/Icons/service-icon-1.png',
    points: [
      "Create professional CVs",
      "Connect with verified agencies",
      "Access real job opportunities",
      "Report fraudulent activities",
    ],
  },
  {
    title: "For Agencies",
    icon: '/Images/Icons/service-icon-2.png',
    points: [
      "Access qualified candidate profiles",
      "Post verified job opportunities",
      "Track visa processing status",
      "Manage recruitment efficiently",
    ],
  },
  {
    title: "For Agents",
    icon: '/Images/Icons/service-icon-3.png',
    points: [
      "Manage candidate pools efficiently",
      "Get automated job matching alerts",
      "Calculate employment offers",
      "Track medical and visa status",
    ],
  },
];

export default function ServiceSection() {
  return (
    <>
      {/* Services Section */}
      <Box px={4} py={16} bg="#eaf7f7">
        <Box maxW={'1440px'} mx={'auto'}>
          <VStack spacing={3} textAlign="center" mb={12}>
            <Text fontSize={{ base: "2xl", md: "50px" }} fontWeight="bold">
              Our services
            </Text>
            <Text maxW="600px" fontSize="16px" color="black">
              Empowering connections between skilled Pakistani worker and global opportunities through our innovative platform.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {services.map((service, idx) => (
              <Box
                key={idx}
                bg="white"
                p={6}
                rounded="xl"
                shadow="md"
                textAlign="left"
              >
                <Box
                  rounded="md"
                  display="flex"
                  alignItems="center"
                  mb={4}
                >
                  <Image src={service.icon} alt="icon" width={35} height={35} />
                  <Text fontWeight="bold" fontSize="lg" ml={2}>
                    {service.title}
                  </Text>
                </Box>
                <List spacing={2} mb={4}>
                  {service.points.map((point, i) => (
                    <ListItem key={i} display="flex" alignItems="center">
                      <ListIcon as={FaCheck} color="#0a7450" />
                      {point}
                    </ListItem>
                  ))}
                </List>
                <Button bg={'#0a7450'} variant="solid" w="full" color={'#fff'}>
                  Learn More
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
