'use client'
import React, { useEffect, useState } from 'react'
// import { HeroSection } from './HeroSection'
import { StatsSection } from './StatsSection'
import BrowseByCategory from './BrowseSection'
import CoreFeatures from './CoreFeature'
import ServiceSection from './ServicesSection'
import { Center, Spinner, useToast } from '@chakra-ui/react'
import { HeroSection } from '../Gamca/MedicalCenters/HeroSection'

const Homepage = () => {
    const toast = useToast();
    const [sliderImages, setSliderImages] = useState([]);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                setLoading(true);
                const response2 = await fetch(`/api/slider?page=Homepage`);
                const sliderData = await response2.json();

                setSliderImages(sliderData?.data?.sliderImgs || []);
                setNews(sliderData?.data?.news || []);
            } catch (error) {
                toast({
                    title: "Error",
                    description: error.message || "Something went wrong while fetching slides.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchCandidates();
    }, []);
    if (loading) {
        return (
            <Center minH="100vh">
                <Spinner size="xl" color="#0a7450" thickness="4px" />
            </Center>
        );
    }
    return (
        <div>
            <HeroSection sliderImages={sliderImages} news={news} />
            <StatsSection />
            <BrowseByCategory />
            <CoreFeatures />
            <ServiceSection />
        </div>
    )
}

export default Homepage