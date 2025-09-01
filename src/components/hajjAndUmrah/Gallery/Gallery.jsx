import React from 'react';
import { Box, Text, Flex, Icon, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import { FaCamera } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import Image from 'next/image';

const Gallery = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = React.useState(null);

    return (
        <Box p={4} bg="gray.100" borderRadius="md" maxW="1020px" overflow="hidden">
            <Text fontWeight="bold" mb={2} fontSize={{ base: "md", md: "lg" }}>
                Gallery
            </Text>
            <Box position="relative" w="100%" overflow="hidden">
                {/* Main Swiper */}
                <Box w="100%" h={{ base: "250px", md: "450px" }} overflow="hidden" borderRadius="md">
                    <Swiper
                        modules={[Navigation, Thumbs, Autoplay]}
                        spaceBetween={10}
                        slidesPerView={1}
                        thumbs={{ swiper: thumbsSwiper }}
                        navigation
                        loop
                        autoplay={{ delay: 6000, disableOnInteraction: false }}
                        style={{ width: "100%", height: "100%" }}
                    >
                        {images.map((item, i) => (
                            <SwiperSlide key={item.id || i}>
                                <Box
                                    position="relative"
                                    w="full"
                                    h={{ base: "250px", md: "450px" }}
                                    borderRadius="md"
                                    overflow="hidden"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.caption || "Slide image"}
                                        style={{
                                            width: "auto",
                                            height: "100%",
                                            maxHeight: "100%",
                                            objectFit: "contain",
                                            objectPosition: "center",
                                            display: "block"
                                        }}
                                        loading="lazy"
                                    />
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>

                {/* Thumbnails Swiper */}
                <Box w="100%" h="80px" mt={3} overflow="hidden" borderRadius="md">
                    <Swiper
                        modules={[Thumbs]}
                        onSwiper={setThumbsSwiper}
                        spaceBetween={5}
                        slidesPerView={4}
                        watchSlidesProgress
                        style={{ width: "100%", height: "100%" }}
                    >
                        {images.map((item, i) => (
                            <SwiperSlide key={item.id || i}>
                                <Flex
                                    align="center"
                                    justify="center"
                                    h="full"
                                    w="full"
                                    bg="gray.200"
                                    borderRadius="md"
                                    cursor="pointer"
                                >
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.caption || "Slide image"}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: "center",
                                            display: "block"
                                        }}
                                        loading="lazy"
                                    />
                                </Flex>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            </Box>
        </Box>
    );
};

export default Gallery;