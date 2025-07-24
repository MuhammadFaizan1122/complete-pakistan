'use client';

import {
    Box,
    Container,
    Heading,
    Text,
    Flex,
} from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import { useEffect, useState } from 'react';

export function HeroSection({ sliderImages, news }) {


    const handleFetchSliders = async (page) => {

    };

    useEffect(() => {
        handleFetchSliders('GAMCAApprovedMedicals');
    }, []);

    return (
        <>
            {/* Hero Image Slider */}
            <Box position="relative" h={{ base: '240px', md: '600px' }} overflow="hidden">
                <Swiper
                    modules={[Autoplay, EffectFade, Pagination]}
                    spaceBetween={10}
                    slidesPerView={1}
                    loop
                    effect="fade"
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    style={{ height: '100%' }}
                >
                    {(sliderImages.length > 0 ? sliderImages : ['/Images/approved-medical.jpg']).map((img, index) => (
                        <SwiperSlide key={index}>
                            <Box
                                bgImage={`url('${img}')`}
                                bgSize="cover"
                                bgPosition="center"
                                h={{ base: '240px', md: '600px' }}
                                w="100%"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Overlay Text */}
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    w="100%"
                    h="100%"
                    zIndex={1}
                    bg="rgba(0, 0, 0, 0.4)"
                    color="white"
                    textAlign="center"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    px={4}
                    pointerEvents="none"
                >
                    <Container maxW="5xl" pointerEvents="auto">
                        <Heading fontSize={{ base: '3xl', md: '70px' }} fontWeight="bold">
                            GAMCA Medical Centers
                        </Heading>
                        <Text fontWeight="semibold" fontSize="22px">
                            Find Approved Medical Centers in Pakistan
                        </Text>
                    </Container>
                </Box>
            </Box>

            {news.length > 0 && (
                <Box w="full" bg="gray.300" height="50px" overflow="hidden">
                    <Box w={'full'} py={0} textAlign={'left'} maxW={'1420px'} mx={'auto'}>
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={10}
                            slidesPerView={1}
                            loop
                            effect="slide"
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            style={{ height: '100%' }}
                        >
                            {news.map((item, idx) => (
                                <SwiperSlide key={idx} style={{ width: 'max-content' }}>
                                    <Flex align="center" h="50px" px={4}>
                                        <Text fontWeight="semibold" color="#309689" fontSize="22px">
                                            Latest News / <span className="text-[18px] text-black">{item}</span>
                                        </Text>
                                    </Flex>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Box>
                </Box>
            )}
        </>
    );
}
