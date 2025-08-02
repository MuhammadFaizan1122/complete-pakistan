'use client';

import { useEffect, useState } from 'react';
import CompanyCard from './CompanyCard';
import { HeroSection } from '../../Gamca/MedicalCenters/HeroSection';
import { Center, Heading, Spinner } from '@chakra-ui/react';

const allCompanies = [
    {
        name: 'TechSolutions Pro',
        location: 'New York, USA',
        services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
        contactPerson: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'contact@techsolutions.com',
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.850020506004!2d-74.00601548459341!3d40.712775779331794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1615261526583!5m2!1sen!2sus',
        since: '2018',
    },
    {
        name: 'TechSolutions Pro',
        location: 'New York, USA',
        services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
        contactPerson: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'contact@techsolutions.com',
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.850020506004!2d-74.00601548459341!3d40.712775779331794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1615261526583!5m2!1sen!2sus',
        since: '2018',
    },
    {
        name: 'TechSolutions Pro',
        location: 'New York, USA',
        services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
        contactPerson: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'contact@techsolutions.com',
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.850020506004!2d-74.00601548459341!3d40.712775779331794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1615261526583!5m2!1sen!2sus',
        since: '2018',
    },
    {
        name: 'TechSolutions Pro',
        location: 'New York, USA',
        services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
        contactPerson: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'contact@techsolutions.com',
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.850020506004!2d-74.00601548459341!3d40.712775779331794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1615261526583!5m2!1sen!2sus',
        since: '2018',
    },
    {
        name: 'TechSolutions Pro',
        location: 'New York, USA',
        services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
        contactPerson: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'contact@techsolutions.com',
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.850020506004!2d-74.00601548459341!3d40.712775779331794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1615261526583!5m2!1sen!2sus',
        since: '2018',
    },
    {
        name: 'TechSolutions Pro',
        location: 'New York, USA',
        services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
        contactPerson: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'contact@techsolutions.com',
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.850020506004!2d-74.00601548459341!3d40.712775779331794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1615261526583!5m2!1sen!2sus',
        since: '2018',
    },
    {
        name: 'TechSolutions Pro',
        location: 'New York, USA',
        services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
        contactPerson: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'contact@techsolutions.com',
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.850020506004!2d-74.00601548459341!3d40.712775779331794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1615261526583!5m2!1sen!2sus',
        since: '2018',
    },
    {
        name: 'TechSolutions Pro',
        location: 'New York, USA',
        services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
        contactPerson: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'contact@techsolutions.com',
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.850020506004!2d-74.00601548459341!3d40.712775779331794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1615261526583!5m2!1sen!2sus',
        since: '2018',
    },
    {
        name: 'TechSolutions Pro',
        location: 'New York, USA',
        services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
        contactPerson: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'contact@techsolutions.com',
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.850020506004!2d-74.00601548459341!3d40.712775779331794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1615261526583!5m2!1sen!2sus',
        since: '2018',
    },
    {
        name: 'TechSolutions Pro',
        location: 'New York, USA',
        services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
        contactPerson: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'contact@techsolutions.com',
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.850020506004!2d-74.00601548459341!3d40.712775779331794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1615261526583!5m2!1sen!2sus',
        since: '2018',
    },
    {
        name: 'TechSolutions Pro',
        location: 'New York, USA',
        services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
        contactPerson: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'contact@techsolutions.com',
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.850020506004!2d-74.00601548459341!3d40.712775779331794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1615261526583!5m2!1sen!2sus',
        since: '2018',
    },
    {
        name: 'TechSolutions Pro',
        location: 'New York, USA',
        services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
        contactPerson: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'contact@techsolutions.com',
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.850020506004!2d-74.00601548459341!3d40.712775779331794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1615261526583!5m2!1sen!2sus',
        since: '2018',
    },
    {
        name: 'TechSolutions Pro',
        location: 'New York, USA',
        services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
        contactPerson: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'contact@techsolutions.com',
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.850020506004!2d-74.00601548459341!3d40.712775779331794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1615261526583!5m2!1sen!2sus',
        since: '2018',
    },
    {
        name: 'TechSolutions Pro',
        location: 'New York, USA',
        services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
        contactPerson: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'contact@techsolutions.com',
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.850020506004!2d-74.00601548459341!3d40.712775779331794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1615261526583!5m2!1sen!2sus',
        since: '2018',
    },
    {
        name: 'TechSolutions Pro',
        location: 'New York, USA',
        services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
        contactPerson: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'contact@techsolutions.com',
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.850020506004!2d-74.00601548459341!3d40.712775779331794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1615261526583!5m2!1sen!2sus',
        since: '2018',
    },
    {
        name: 'TechSolutions Pro',
        location: 'New York, USA',
        services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
        contactPerson: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'contact@techsolutions.com',
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.850020506004!2d-74.00601548459341!3d40.712775779331794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1615261526583!5m2!1sen!2sus',
        since: '2018',
    },
    {
        name: 'TechSolutions Pro',
        location: 'New York, USA',
        services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
        contactPerson: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'contact@techsolutions.com',
        mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.850020506004!2d-74.00601548459341!3d40.712775779331794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1615261526583!5m2!1sen!2sus',
        since: '2018',
    },
    // Add more companies here
];

const ITEMS_PER_PAGE = 9;

export default function TTC() {
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
            const response = await fetch(`/api/slider?page=TTC`);
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
                    Trade Test & Traning Center - TTC
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