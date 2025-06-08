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
    <Box px={4} py={10} bg="#eaf7f7">
      <Box maxW={'1440px'} mx="auto">
        <VStack spacing={3} textAlign="center" mb={10}>
          <Text fontSize={{ base: "2xl", md: "50px" }} fontWeight="bold">
            Browse by Category
          </Text>
          <Text maxW="600px" fontSize="16px" color="black">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id scel...
          </Text>
        </VStack>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6} mb={16}>
          {categories.map((cat, idx) => (
            <Box
              key={idx}
              bg="white"
              p={6}
              rounded="20px"
              w={{ base: "100%", sm: "340px" }}
              h={{ base: "100%", sm: "280px" }}
              shadow="md"
              textAlign="center"
            >
              <Flex direction={'column'} alignItems={'center'} justifyContent={'space-evenly'} w={'full'} mx={'auto'} h={'full'}>
                <Image src={cat.icon} alt="icon" width={40} height={40} />
                <Text fontWeight="bold" fontSize={'24px'} color={'black'}>{cat.label}</Text>
                <Box bg={'#3096891A'} rounded={'8px'} px={'12px'} py={'8px'} w={'97px'} h={'28px'} mx={'auto'}>
                  <Text fontSize="16px" mt={-1} color="#309689">
                    {cat.jobs} jobs
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>

        <VStack spacing={3} textAlign="center" mb={8}>
          <Text fontSize={{ base: "2xl", md: "50px" }} fontWeight="bold">
            I Am CompletePakistan
          </Text>
          <Text maxW="600px" fontSize="16px" color="black">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id scel...
          </Text>
        </VStack>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
          spacing={4}
          overflowX={{ base: "scroll", lg: "unset" }}
          pb={4}
        >
          {videos.map((vid, idx) => (
            <Box px={4} py={12} bg="#eaf7f7" key={idx}>
              <Box
                bg="black"
                w={{ base: "100%", md: "260px" }}
                h={{ base: "100%", md: "313px" }}
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="md"
              >
                <Box pos="relative" w={'259px'} h={'160px'}>
                  <img
                    src={vid.image}
                    alt="Video Thumbnail"
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Badge
                    pos="absolute"
                    top={2}
                    right={2}
                    bg="gray.800"
                    color="white"
                    fontSize="xs"
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    7 min
                  </Badge>
                </Box>
                <Box bg="#1d1d29" color="white" p={4} pos="relative" className="flex flex-col justify-evenly  border border-white" h={'155px'}>
                  <HStack spacing={3} mb={1} alignItems="center">
                    <Text fontSize="sm" color="gray.300">
                      {vid.user}
                    </Text>
                    <Box w={2} h={2} bg="green.400" borderRadius="full" />
                    <Avatar
                      size="sm"
                      name="Wijaya Abadi"
                      src="https://via.placeholder.com/32"
                      pos="absolute"
                      right={4}
                      top={-4}
                      border="2px solid white"
                    />
                  </HStack>
                  <Text fontWeight="semibold" mb={1}>
                    {vid.title}
                  </Text>
                  <Text fontSize="xs" color="gray.400">
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
