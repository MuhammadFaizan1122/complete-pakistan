import React from 'react';
import { Box, Text, Container, Flex, Icon } from '@chakra-ui/react';
import { FaMapPin, FaUsers, FaAward, FaShieldAlt, FaExclamationTriangle, FaHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FiFacebook, FiInstagram, FiLinkedin, FiYoutube } from 'react-icons/fi';
import Link from 'next/link';

// Mock data for the destinations
const destinations = [
    {
        id: 1,
        name: 'Martila',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop'
    },
    {
        id: 2,
        name: 'Lake Malawi',
        image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=250&fit=crop'
    },
    {
        id: 3,
        name: 'Ngorongoro Crater',
        image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=250&fit=crop'
    },
    {
        id: 4,
        name: 'Mauritius',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop'
    },
    {
        id: 5,
        name: 'Ndzwani',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop'
    },
    {
        id: 6,
        name: 'Mount Bisoke',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop'
    },
    {
        id: 7,
        name: 'Lake Abbe',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop'
    },
    {
        id: 8,
        name: 'Martila',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop'
    }
];

const topCategories = [
    { icon: FaMapPin, label: 'Top Ranking Gulf Co.', color: 'text-white' },
    { icon: FaUsers, label: 'Top Ranking Promoters', color: 'text-gray-600' },
    { icon: FaAward, label: 'Top Ranking Trade Centers', color: 'text-gray-600' },
    { icon: FaShieldAlt, label: 'Authorized NAVTTC Centers', color: 'text-gray-600' },
    { icon: FaExclamationTriangle, label: 'Fraud Alert', color: 'text-gray-600' },
    { icon: FaHeart, label: 'Ready Medical', color: 'text-gray-600' }
];

const SliderSection = () => {
    return (
        <Box className="bg-white py-8">
            {/* Top Navigation Bar */}
            <Container maxW="1440px" mb={8}>
                <Flex
                    className=" bg-gray-200 rounded-lg px-4 py-3"
                    flexWrap="wrap"
                    alignItems="center"
                    gap={4}
                >
                    {topCategories.map((category, index) => {
                        const IconComponent = category.icon;
                        return (
                            <Flex
                                key={index}
                                alignItems="center"
                                gap={2}
                                className={`cursor-pointer px-3 py-2 rounded-md transition-colors ${index === 0 ? 'bg-green-800' : ''
                                    }`}
                            >
                                <IconComponent size={18} className={category.color} />
                                <Text
                                    fontSize="sm"
                                    fontWeight={index === 0 ? 'bold' : 'medium'}
                                    className={category.color}
                                >
                                    {category.label}
                                </Text>
                            </Flex>
                        );
                    })}
                </Flex>
            </Container>

            {/* Swiper Slider */}
            <Container maxW="1440px" position="relative">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                    className="mySwiper"
                >
                    {destinations.map((destination) => (
                        <SwiperSlide key={destination.id}>
                            <Box
                                className="w-64 h-36 relative rounded-xl overflow-hidden cursor-pointer group mx-auto"
                                position="relative"
                            >
                                {/* Background Image */}
                                <Box
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${destination.image})` }}
                                />

                                {/* Overlay */}
                                {/* <Box className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300" /> */}

                                {/* Destination Name */}
                                <Box className="absolute bottom-0 left-0 right-0 p-6">
                                    <Text
                                        color="white"
                                        fontSize="md"
                                        fontWeight="semibold"
                                        className="drop-shadow-lg"
                                    >
                                        {destination.name}
                                    </Text>
                                </Box>

                                {/* Hover Effect Overlay */}
                                <Box className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation Buttons */}
                <Box
                    className="swiper-button-prev"
                    position="absolute"
                    top="40%"
                    transform="translateY(-50%)"
                    zIndex={10}
                    bg="white"
                    shadow="lg"
                    borderRadius="full"
                    w={{ base: "30px", md: "40px" }}
                    h={{ base: "30px", md: "40px" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    _hover={{ bg: 'gray.50' }}
                >
                    <FaChevronLeft className='p-2 text-[gray]' />
                </Box>
                <Box
                    className="swiper-button-next"
                    position="absolute"
                    top="40%"
                    transform="translateY(-50%)"
                    zIndex={10}
                    bg="white"
                    shadow="lg"
                    borderRadius="full"
                    w={{ base: "30px", md: "40px" }}
                    h={{ base: "30px", md: "40px" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    _hover={{ bg: 'gray.50' }}
                >
                    <FaChevronRight className='p-2 text-[gray]' />
                </Box>

                {/* Social Media Links */}
                <Flex justifyContent="center" alignItems="center" mt={12} gap={6}>
                    <Text color="gray.500" fontSize="sm" mr={{ base: 0, md: 4 }}>
                        Follow us:
                    </Text>
                    <Flex gap={4}>
                        {[
                            { icon: FiFacebook, bg: 'bg-green-100', link: "http://www.facebook.com/CompletePakistanOfficial" },
                            { icon: FaXTwitter, bg: 'bg-green-100', link: "#" },
                            { icon: FiInstagram, bg: 'bg-green-100', link: "#" },
                            { icon: FiLinkedin, bg: 'bg-green-100', link: "#" },
                            { icon: FiYoutube, bg: 'bg-green-100', link: "#" }
                        ].map((social, index) => (
                            <Box
                                key={index}
                                className={`w-10 h-10 ${social.bg} rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200`}
                            >
                                <Link href={social.link} target='_blank'>
                                    <Text fontSize="lg">
                                        <Icon as={social.icon} />
                                    </Text>
                                </Link>
                            </Box>
                        ))}
                    </Flex>
                </Flex>
            </Container>

            <style jsx global>{`
        .swiper-button-prev::after,
        .swiper-button-next::after {
          content: none;
        }
        .swiper {
          padding: 0 20px;
        }
      `}</style>
        </Box>
    );
};

export default SliderSection;