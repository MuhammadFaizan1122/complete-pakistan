'use client';

import { useEffect, useState } from 'react';
import CompanyCard from './CompanyCard';
import { HeroSection } from '../../Gamca/MedicalCenters/HeroSection';
import { Center, Heading, Spinner } from '@chakra-ui/react';


const allCompanies = new Array(24).fill(0).map((_, idx) => ({
  name: `TechSolutions Pro ${idx + 1}`,
  logoUrl: '/logo.png',
  location: 'New York, USA',
  services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
  contactPerson: 'John Smith',
  phone: '+1 (555) 123-4567',
  email: 'contact@techsolutions.com',
  since: '2018',
  license: 'LIC-2024-001',
  address: 'Manhattan',
}));


const ITEMS_PER_PAGE = 9;

export default function OEP() {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [sliderImages, setSliderImages] = useState([]);
    const [news, setNews] = useState([]);

    const totalPages = Math.ceil(allCompanies.length / ITEMS_PER_PAGE);
    const paginatedData = allCompanies.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // const data = await handleFetchMadicals();
            const response = await fetch(`/api/slider?page=OEP`);
            const sliderData = await response.json();
            setSliderImages(sliderData?.data?.sliderImgs || []);
            setNews(sliderData?.data?.news || []);

            // if (data.success === true) {
            //     setMedicals(data.data);
            //     setError(null);
            // } else {
            //     setError("Failed to fetch medical records");
            // }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <Center minH="100vh" bg="gray.50">
                <Spinner size="xl" color="#0a7450" thickness="4px" />
            </Center>
        );
    }
    return (
        <>
            <HeroSection sliderImages={sliderImages} news={news} />
            <div className="space-y-8 px-4  py-8 max-w-[1440px] mx-auto">
                <Heading
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="#1A3C34"
                    textAlign="center"
                    fontWeight="bold"
                    bgGradient="linear(to-r, #0a7450, #0a7450)"
                    bgClip="text"
                    mb={6}
                >
                    Overseas Employement Promoters - OEP
                </Heading>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
                    {paginatedData.map((company, idx) => (
                        <CompanyCard key={idx} {...company} />
                    ))}
                </div>
                <div className="flex justify-center items-center flex-wrap gap-4 pt-6">
                    <button
                        onClick={() => setPage(p => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <span className="text-sm text-gray-700">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}