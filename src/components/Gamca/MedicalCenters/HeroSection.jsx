'use client';

import {
    Box,
    Container,
    Heading,
    Text,
    Flex,
    Button,
} from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export function HeroSection({ sliderImages, news }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleFetchSliders = async (page) => {
        try {
            const response = await fetch(`/api/slider?page=${page}`);
            if (!response.ok) throw new Error('Failed to fetch sliders');
            return await response.json();
        } catch (error) {
            console.error('Fetch sliders error:', error);
            return { data: { sliderImgs: [], news: [] } };
        }
    };

    useEffect(() => {
        const fetchSliders = async () => {
            const res = await handleFetchSliders('GAMCAApprovedMedicals');
            if (res && res.data) {
                // Assuming sliderImages and news are passed as props, no need to set state here
            }
        };
        fetchSliders();
    }, []);

    return (
        <>
            {/* Hero Image Slider */}
            <Box position="relative" h={{ base: '240px', md: '700px' }} overflow="hidden">
                <Swiper
                    modules={[Autoplay, EffectFade, Pagination]}
                    spaceBetween={10}
                    slidesPerView={1}
                    loop
                    effect="fade"
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    style={{ height: '100%' }}
                    onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
                >
                    {(sliderImages.length > 0
                        ? sliderImages
                        : [{
                            url: '/Images/approved-medical.jpg',
                            title: 'GAMCA Medical Centers',
                            subtitle: 'Find Approved Medical Centers in Pakistan',
                            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
                            buttons: [
                                { text: 'Explore Opportunities', link: '#' },
                                { text: 'Register Agency', link: '#' },
                            ],
                        }]
                    ).map((slide, index) => (
                        <SwiperSlide key={index}>
                            <Box
                                bgImage={`url('${slide.url}')`}
                                bgSize="cover"
                                bgPosition="center"
                                h={{ base: '240px', md: '700px' }}
                                w="100%"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    w="100%"
                    h="100%"
                    zIndex={1}
                    bg="linear-gradient(to right, rgba(48, 150, 137, 0.7), rgba(48, 150, 137, 0))"
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="start"
                    pointerEvents="none"
                >
                    <Container maxW="1440px" pointerEvents="auto">
                        <Heading fontSize={{ base: '3xl', md: '70px' }} fontWeight="bold">
                            {sliderImages.length > 0 ? (
                                <>
                                    {sliderImages[currentSlide]?.title.split(' ').map((word, idx) => (
                                        <span
                                            key={idx}
                                            className={idx === 1 ? 'text-green-500' : ''}
                                        >
                                            {word}{' '}
                                        </span>
                                    ))}
                                </>
                            ) : (
                                <>
                                    GAMCA <span className="text-green-500">Medical</span> Centers
                                </>
                            )}
                        </Heading>
                        {sliderImages.length > 0 && sliderImages[currentSlide]?.subtitle && (
                            <Text fontWeight="semibold" fontSize="22px">
                                {sliderImages[currentSlide].subtitle}
                            </Text>
                        )}
                        {sliderImages.length > 0 && sliderImages[currentSlide]?.description && (
                            <Text fontWeight="semibold" fontSize="18px" maxW="700px" mt={4}>
                                {sliderImages[currentSlide].description}
                            </Text>
                        )}
                        <Box
                            display="flex"
                            justifyContent="start"
                            mt={4}
                            flexWrap="wrap"
                            gap={4}
                        >
                            {(sliderImages.length > 0 && sliderImages[currentSlide]?.buttons?.length > 0
                                ? sliderImages[currentSlide].buttons
                                : [
                                    { text: 'Explore Opportunities', link: '#' },
                                    { text: 'Register Agency', link: '#' },
                                ]
                            ).map((button, index) => (
                                <Button
                                    key={index}
                                    as={Link}
                                    href={button.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    bg="#309689"
                                    w="200px"
                                    color="white"
                                    border="1px solid transparent"
                                    borderRadius="xl"
                                    py={{ base: 4, md: 6 }}
                                    fontSize={{ base: 'sm', md: 'md' }}
                                    _hover={{ bg: 'white', color: 'black', border: '1px solid black' }}
                                >
                                    {button.text}
                                </Button>
                            ))}
                        </Box>
                    </Container>
                </Box>
            </Box>

            {news.length > 0 && (
                <Box w="full" bg="gray.300" height="50px" overflow="hidden">
                    <Box w="full" py={0} textAlign="left" maxW="1420px" mx="auto">
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