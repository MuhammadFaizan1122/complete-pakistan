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
  console.log('sliderImages', sliderImages)
  return (
    <>
      <Box
        position="relative"
        h={{ base: "300px", md: "700px" }}
        overflow="hidden"
      >
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          loop
          effect="fade"
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          style={{ height: "100%" }}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        >
          {(sliderImages.length ? sliderImages : [
            {
              url: "/Images/approved-medical.jpg",
              title: "Complete Pakistan",
              subtitle: "Find Approved Medical Centers in Pakistan",
              description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
              buttons: [
                { text: "Explore Opportunities", link: "#" },
                { text: "Register Agency", link: "#" },
              ],
            },
          ]).map((slide, index) => {
            return (
              <SwiperSlide key={index}>
                <Box
                  bgImage={`url("https://completepakistann.s3.ap-south-1.amazonaws.com/1757104882802-6021032.jpg")`}
                  bgSize="cover"
                  bgPosition="center"
                  h={{ base: "300px", md: "700px" }}
                  w="100%"
                />
              </SwiperSlide>
            )
          })}

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
          <Container
            maxW={{ base: "100%", md: "1440px" }}
            pointerEvents="auto"
            px={{ base: 4, md: 0 }}
          >
            <Heading
              fontSize={{ base: "2xl", md: "70px" }}
              fontWeight="bold"
            >
              {sliderImages.length > 0 ? (
                <>
                  {sliderImages[currentSlide]?.title.split(" ").map((word, idx) => (
                    <span
                      key={idx}
                      className={idx === 1 ? "text-green-500" : ""}
                    >
                      {word}{" "}
                    </span>
                  ))}
                </>
              ) : (
                <>
                  Complete <span className="text-green-500">Pakistan</span>
                </>
              )}
            </Heading>
            {sliderImages.length > 0 && sliderImages[currentSlide]?.subtitle && (
              <Text
                fontWeight="semibold"
                fontSize={{ base: "md", md: "22px" }}
                mt={{ base: 2, md: 0 }}
              >
                {sliderImages[currentSlide].subtitle}
              </Text>
            )}
            {sliderImages.length > 0 && sliderImages[currentSlide]?.description && (
              <Text
                fontWeight="semibold"
                fontSize={{ base: "sm", md: "18px" }}
                maxW={{ base: "100%", md: "700px" }}
                mt={{ base: 2, md: 4 }}
              >
                {sliderImages[currentSlide].description}
              </Text>
            )}
            <Box
              display="flex"
              justifyContent="start"
              mt={{ base: 3, md: 4 }}
              flexWrap="wrap"
              gap={{ base: 2, md: 4 }}
              flexDirection={{ base: "column", md: "row" }}
            >
              {(sliderImages.length > 0 && sliderImages[currentSlide]?.buttons?.length > 0
                ? sliderImages[currentSlide].buttons
                : [
                  { text: "Explore Opportunities", link: "/jobs" },
                  { text: "Register Agency", link: "/auth/company-registration" },
                ]
              ).map((button, index) => (
                <Button
                  key={index}
                  as={Link}
                  href={button.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  bg="#0a7450"
                  w={{ base: "full", md: "200px" }}
                  color="white"
                  border="1px solid transparent"
                  borderRadius="xl"
                  py={{ base: 3, md: 6 }}
                  fontSize={{ base: "sm", md: "md" }}
                  _hover={{ bg: "white", color: "black", border: "1px solid black" }}
                >
                  {button.text}
                </Button>
              ))}
            </Box>
          </Container>
        </Box>
      </Box>

      {news.length > 0 && (
        <Box w="full" bg="#0a7450" height={{ base: "auto", md: "50px" }} overflow="hidden">
          <Box w="full" py={{ base: 2, sm: 0 }} textAlign="left" maxW={{ base: "100%", md: "1420px" }} mx="auto">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={10}
              slidesPerView={1}
              loop
              effect="slide"
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              style={{ height: "100%" }}
            >
              {news.map((item, idx) => (
                <SwiperSlide key={idx} style={{ width: "max-content" }}>
                  <Flex align="center" h={{ base: "40px", md: "50px" }} px={{ base: 2, md: 4 }}>
                    <Text
                      fontWeight="semibold"
                      color="orange"
                      fontSize={{ base: "sm", md: "22px" }}
                    >
                      Latest News /{" "}
                      <span className="text-[16px] text-white">{item}</span>
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