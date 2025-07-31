'use client'
import { Box, Text, SimpleGrid, VStack, HStack, Avatar, Badge, Flex } from "@chakra-ui/react";
import Image from "next/image";

const categories = [
  { label: "Agriculture", jobs: 1254, icon: '/Images/Icons/plant.png' },
  { label: "Metal Production", jobs: 816, icon: '/Images/Icons/agriculture.png' },
  { label: "Commerce", jobs: 2082, icon: '/Images/Icons/shoppingbag.png' },
  { label: "Construction", jobs: 1520, icon: '/Images/Icons/buffet.png' },
  { label: "Hotels & Tourism", jobs: 1022, icon: '/Images/Icons/luggeg.png' },
  { label: "Education", jobs: 1496, icon: '/Images/Icons/cap.png' },
  { label: "Financial Services", jobs: 1529, icon: '/Images/Icons/db.png' },
  { label: "Transport", jobs: 1244, icon: '/Images/Icons/bus.png' },
];

const videos = [
  { image: '/Images/image-1.png', user: "Haris", title: "Tips to playing skateboard on the ramp", views: "53K", time: "2 weeks ago" },
  { image: '/Images/image-2.png', user: "Wajaya Abadi", title: "Basic Equipment to play skateboard safely", views: "53K", time: "2 weeks ago" },
  { image: '/Images/image-3.png', user: "kamon", title: "Basic how to ride your skateboard comfortably", views: "53K", time: "2 weeks ago" },
  { image: '/Images/image-1.png', user: "Arslan", title: "Prepare for your first skateboard jump", views: "53K", time: "2 weeks ago" },
  { image: '/Images/image-2.png', user: "Adeel", title: "Tips to playing skateboard on the ramp", views: "53K", time: "2 weeks ago" },
];

export default function BrowseByCategory() {
  return (
    <Box px={{ base: 2, sm: 4, md: 4 }} py={{ base: 6, md: 10 }} bg="#eaf7f7">
      <Box maxW="1440px" mx="auto">
        <VStack spacing={{ base: 2, md: 3 }} textAlign="center" mb={{ base: 6, md: 10 }}>
          <Text fontSize={{ base: "2xl", sm: "2xl", md: "50px" }} fontWeight="bold">
            Browse by Category
          </Text>
          <Text
            maxW={{ base: "90%", md: "600px" }}
            fontSize={{ base: "sm", sm: "md", md: "16px" }}
            color="black"
            px={{ base: 2, md: 0 }}
          >
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id scel...
          </Text>
        </VStack>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 4, sm: 5, md: 6 }} mb={{ base: 8, md: 16 }}>
          {categories.map((cat, idx) => (
            <Box
              key={idx}
              bg="white"
              p={{ base: 4, md: 6 }}
              rounded="20px"
              w={{ base: "100%", sm: "90%", md: "340px" }}
              h={{ base: "180px", md: "280px" }}
              shadow="md"
              textAlign="center"
            >
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="space-evenly"
                w="full"
                mx="auto"
                h="full"
              >
                <Box
                  w={{ base: "32px", sm: "36px", md: "40px" }}
                  h={{ base: "32px", sm: "36px", md: "40px" }}
                >
                  <Image
                    src={cat.icon}
                    alt="icon"
                    width={40}
                    height={40}
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 640px) 32px, (max-width: 768px) 36px, 40px"
                  />
                </Box>
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                  color="black"
                >
                  {cat.label}
                </Text>
                <Box
                  bg="#0a74501A"
                  rounded="8px"
                  px={{ base: "8px", md: "12px" }}
                  py="8px"
                  w={{ base: "80px", sm: "90px", md: "97px" }}
                  h={{ base: "24px", md: "28px" }}
                  mx="auto"
                >
                  <Text
                    fontSize={{ base: "12px", sm: "14px", md: "16px" }}
                    mt={{ base: -0.5, md: -1 }}
                    color="#0a7450"
                  >
                    {cat.jobs} jobs
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>

        <VStack spacing={{ base: 2, md: 3 }} textAlign="center" mb={{ base: 6, md: 8 }}>
          <Text fontSize={{ base: "2xl", sm: "2xl", md: "50px" }} fontWeight="bold">
            I Am CompletePakistan
          </Text>
          <Text
            maxW={{ base: "90%", md: "600px" }}
            fontSize={{ base: "sm", sm: "md", md: "16px" }}
            color="black"
            px={{ base: 2, md: 0 }}
          >
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id scel...
          </Text>
        </VStack>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
          spacing={{ base: 2, sm: 3, md: 4 }}
          overflowX={{ base: "auto", lg: "unset" }}
          pb={{ base: 2, md: 4 }}
          css={{
            display: "flex",
            flexWrap: "nowrap",
            "& > *": {
              flex: "0 0 auto",
              minWidth: { base: "200px", sm: "220px", md: "260px" },
            },
          }}
        >
          {videos.map((vid, idx) => (
            <Box key={idx} px={{ base: 2, md: 4 }} py={{ base: 6, md: 12 }}>
              <Box
                bg="black"
                w={{ base: "200px", sm: "220px", md: "260px" }}
                h={{ base: "auto", md: "313px" }}
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="md"
              >
                <Box pos="relative" w={{ base: "200px", sm: "220px", md: "259px" }} h={{ base: "120px", sm: "140px", md: "160px" }}>
                  <Image
                    src={vid.image}
                    alt="Video Thumbnail"
                    width={259}
                    height={160}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    sizes="(max-width: 640px) 200px, (max-width: 768px) 220px, 259px"
                  />
                  <Badge
                    pos="absolute"
                    top={{ base: 1, md: 2 }}
                    right={{ base: 1, md: 2 }}
                    bg="gray.800"
                    color="white"
                    fontSize={{ base: "2xs", sm: "xs" }}
                    px={{ base: 1, md: 2 }}
                    py={1}
                    borderRadius="md"
                  >
                    7 min
                  </Badge>
                </Box>
                <Box
                  bg="#1d1d29"
                  color="white"
                  p={{ base: 2, md: 4 }}
                  pos="relative"
                  className="flex flex-col justify-evenly border border-white"
                  h={{ base: "auto", md: "155px" }}
                >
                  <HStack spacing={{ base: 2, md: 3 }} mb={1} alignItems="center">
                    <Text fontSize={{ base: "xs", sm: "sm" }} color="gray.300">
                      {vid.user}
                    </Text>
                    <Box w={2} h={2} bg="green.400" borderRadius="full" />
                    <Avatar
                      size={{ base: "xs", md: "sm" }}
                      name="Wijaya Abadi"
                      src="https://via.placeholder.com/32"
                      pos="absolute"
                      right={{ base: 2, md: 4 }}
                      top={{ base: -2, md: -4 }}
                      border="2px solid white"
                    />
                  </HStack>
                  <Text fontWeight="semibold" fontSize={{ base: "sm", md: "md" }} mb={1}>
                    {vid.title}
                  </Text>
                  <Text fontSize={{ base: "2xs", sm: "xs" }} color="gray.400">
                    {vid.views} views ・ {vid.time}
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
