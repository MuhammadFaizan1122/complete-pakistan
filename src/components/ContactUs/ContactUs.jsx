'use client';
import {
  Box,
  VStack,
  Text,
  SimpleGrid,
  Flex,
  Image,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

// Validation schema for the contact form
const contactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().required("Message is required").min(10, "Message must be at least 10 characters"),
});

const contactData = {
  details: [
    { icon: FaPhone, title: "Phone", value: "+92 300 123 4567" },
    { icon: FaEnvelope, title: "Email", value: "support@completepakistan.com" },
    { icon: FaMapMarkerAlt, title: "Address", value: "123 Overseas Plaza, Karachi, Pakistan" },
  ],
  socials: [
    { icon: FaFacebook, link: "https://facebook.com/completepakistan" },
    { icon: FaTwitter, link: "https://twitter.com/completepakistan" },
    { icon: FaLinkedin, link: "https://linkedin.com/company/completepakistan" },
  ],
};

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    // Simulate form submission (replace with actual API call)
    console.log("Form submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async request
    alert("Message sent successfully!");
  };

  return (
    <Box bg="#eaf7f7" px={{ base: 2, sm: 4, md: 4 }} py={{ base: 8, md: 16 }}>
      <Box maxW="1440px" mx="auto">
        {/* Hero Section */}
        <VStack spacing={{ base: 2, md: 3 }} textAlign="center" mb={{ base: 8, md: 12 }}>
          <Heading
            fontSize={{ base: "xl", sm: "2xl", md: "50px" }}
            fontWeight="bold"
            color="black"
          >
            Get in Touch
          </Heading>
          <Text
            maxW={{ base: "90%", md: "600px" }}
            fontSize={{ base: "sm", sm: "md", md: "16px" }}
            color="black"
            px={{ base: 2, md: 0 }}
          >
            We're here to assist you with your overseas employment journey. Reach out with any questions, feedback, or inquiries, and our team will respond promptly.
          </Text>
        </VStack>

        {/* Contact Form and Details Section */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }} mb={{ base: 8, md: 12 }}>
          {/* Contact Form */}
          <Box
            bg="white"
            p={{ base: 4, md: 6 }}
            rounded="20px"
            shadow="md"
            w={{ base: "100%", md: "auto" }}
          >
            <VStack spacing={{ base: 3, md: 4 }} as="form" onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel fontSize={{ base: "sm", md: "md" }} color="black">
                  Full Name
                </FormLabel>
                <Input
                  {...register("name")}
                  placeholder="Enter your name"
                  rounded="xl"
                  borderColor="gray.300"
                  fontSize={{ base: "sm", md: "md" }}
                  _focus={{
                    borderColor: "#0a7450",
                    boxShadow: "0 0 0 1px #0a7450",
                  }}
                />
                <FormErrorMessage fontSize="xs">{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel fontSize={{ base: "sm", md: "md" }} color="black">
                  Email Address
                </FormLabel>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email"
                  rounded="xl"
                  borderColor="gray.300"
                  fontSize={{ base: "sm", md: "md" }}
                  _focus={{
                    borderColor: "#0a7450",
                    boxShadow: "0 0 0 1px #0a7450",
                  }}
                />
                <FormErrorMessage fontSize="xs">{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.message}>
                <FormLabel fontSize={{ base: "sm", md: "md" }} color="black">
                  Message
                </FormLabel>
                <Textarea
                  {...register("message")}
                  placeholder="Enter your message"
                  rounded="xl"
                  borderColor="gray.300"
                  fontSize={{ base: "sm", md: "md" }}
                  rows={5}
                  _focus={{
                    borderColor: "#0a7450",
                    boxShadow: "0 0 0 1px #0a7450",
                  }}
                />
                <FormErrorMessage fontSize="xs">{errors.message?.message}</FormErrorMessage>
              </FormControl>
              <Button
                bg="#0a7450"
                color="white"
                rounded="xl"
                px={{ base: 6, md: 8 }}
                py={{ base: 3, md: 4 }}
                fontSize={{ base: "sm", md: "md" }}
                isLoading={isSubmitting}
                type="submit"
                _hover={{ bg: "#287a6f" }}
              >
                Send Message
              </Button>
            </VStack>
          </Box>

          {/* Contact Details */}
          <Box
            bg="#0a745026"
            p={{ base: 4, md: 6 }}
            rounded="20px"
            shadow="md"
            w={{ base: "100%", md: "auto" }}
          >
            <VStack spacing={{ base: 4, md: 6 }} align="start">
              {contactData.details.map((detail, idx) => (
                <HStack key={idx} spacing={3} align="start">
                  <Box
                    w={{ base: "40px", sm: "48px", md: "60px" }}
                    h={{ base: "40px", sm: "48px", md: "60px" }}
                    bg="#0a7450"
                    rounded="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Icon
                      as={detail.icon}
                      color="white"
                      boxSize={{ base: 4, sm: 5, md: 6 }}
                    />
                  </Box>
                  <VStack align="start" spacing={0}>
                    <Text
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "md" }}
                      color="black"
                    >
                      {detail.title}
                    </Text>
                    <Text
                      fontSize={{ base: "xs", sm: "sm", md: "14px" }}
                      color="black"
                    >
                      {detail.value}
                    </Text>
                  </VStack>
                </HStack>
              ))}
              <VStack align="start" spacing={2}>
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "sm", md: "md" }}
                  color="black"
                >
                  Follow Us
                </Text>
                <HStack spacing={3}>
                  {contactData.socials.map((social, idx) => (
                    <Button
                      key={idx}
                      as="a"
                      href={social.link}
                      target="_blank"
                      bg="#0a7450"
                      color="white"
                      rounded="full"
                      p={2}
                      _hover={{ bg: "#287a6f" }}
                    >
                      <Icon as={social.icon} boxSize={{ base: 4, md: 5 }} />
                    </Button>
                  ))}
                </HStack>
              </VStack>
            </VStack>
          </Box>
        </SimpleGrid>

        {/* Location Section */}
        <Box
          bg="white"
          rounded="20px"
          shadow="md"
          p={{ base: 4, md: 6 }}
          mb={{ base: 8, md: 12 }}
          textAlign="center"
        >
          <VStack spacing={{ base: 2, md: 3 }}>
            <Text
              fontSize={{ base: "lg", sm: "xl", md: "32px" }}
              fontWeight="bold"
              color="black"
            >
              Our Location
            </Text>
            <Box
              w={{ base: "100%", sm: "90%", md: "800px" }}
              h={{ base: "200px", sm: "250px", md: "400px" }}
              rounded="xl"
              overflow="hidden"
            >
              <Image
                src="/Images/map.webp"
                alt="Location Map"
                width={800}
                height={400}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 800px"
              />
            </Box>
            <Text
              fontSize={{ base: "sm", sm: "md", md: "16px" }}
              color="black"
              maxW={{ base: "90%", md: "600px" }}
            >
              Visit us at our headquarters in Karachi or connect with us virtually from anywhere in the world.
            </Text>
          </VStack>
        </Box>

        {/* CTA Section */}
        <Box
          bg="#0a7450"
          rounded="20px"
          shadow="md"
          p={{ base: 4, md: 6 }}
          textAlign="center"
        >
          <VStack spacing={{ base: 2, md: 3 }}>
            <Text
              fontSize={{ base: "lg", sm: "xl", md: "32px" }}
              fontWeight="bold"
              color="white"
            >
              Ready to Start Your Journey?
            </Text>
            <Text
              maxW={{ base: "90%", md: "600px" }}
              fontSize={{ base: "sm", sm: "md", md: "16px" }}
              color="white"
              mx="auto"
            >
              Explore job opportunities, connect with agencies, or list your openings with Complete Pakistan. Get started today!
            </Text>
            <Button
              bg="white"
              color="#0a7450"
              rounded="xl"
              px={{ base: 6, md: 8 }}
              py={{ base: 3, md: 4 }}
              fontSize={{ base: "sm", md: "md" }}
              _hover={{ bg: "#f0f0f0" }}
            >
              Join Now
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}