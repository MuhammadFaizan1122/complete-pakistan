'use client';
import { useEffect, useState } from 'react';
import CompanyCard from './CompanyCard';
import { HeroSection } from '../../Gamca/MedicalCenters/HeroSection';
import { Center, Heading, Spinner } from '@chakra-ui/react';
import { handleGetOEPs } from '../../../handlers/recruitment/oep';
import Dashboard from '../../../components/Dashboard/Dashboard';

const ITEMS_PER_PAGE = 9;

export default function OEP() {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [sliderImages, setSliderImages] = useState([]);
    const [news, setNews] = useState([]);
    const [OepListing, setOepListing] = useState([])
    const [error, setError] = useState('');

    const totalPages = Math.ceil(OepListing.length / ITEMS_PER_PAGE);
    const paginatedData = OepListing.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const Resp = await handleGetOEPs();
            const response = await fetch(`/api/slider?page=OEP`);
            const sliderData = await response.json();
            setSliderImages(sliderData?.data?.sliderImgs || []);
            setNews(sliderData?.data?.news || []);
            if (Resp.status === 200) {
                setOepListing(Resp.data.data);
                setError(null);
            } else {
                setError("Failed to fetch medical records");
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    console.log('paginatedData', paginatedData)

    if (loading) {
        return (
            <Center minH="100vh" bg="gray.50">
                <Spinner size="xl" color="#0a7450" thickness="4px" />
            </Center>
        );
    }
    return (
        <>
            <Dashboard />
        </>
    );
}