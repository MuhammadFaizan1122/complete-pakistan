'use client'
// import React from 'react'
// import Hero from '../../../../components/Recruitment/Consultant/Hero'
// import Info from '../../../../components/Recruitment/Consultant/Info'

// const page = () => {
//   return (
//     <div>
//       <Hero />
//       <Info />
//     </div>
//   )
// }

// export default page

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Hero from '../../../../components/Recruitment/Consultant/Hero';
import Info from '../../../../components/Recruitment/Consultant/Info';
import { Button, Center, Spinner, Text } from '@chakra-ui/react';

const page = () => {
  const { id } = useParams();
  const [consultant, setConsultant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('consultant', consultant)
  useEffect(() => {
    const fetchConsultant = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/consultant/${id}`);
        const data = await response.json();
        console.log('consultant', data)
        if (data.success) {
          setConsultant(data.data || null);
        } else {
          setError(data.error || "Failed to fetch consultant details");
        }
      } catch (err) {
        setError("An error occurred while fetching consultant details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchConsultant();
  }, [id]);

  if (loading) {
    return (
      <Center minH="100vh" bg="gray.50">
        <Spinner size="xl" color="#0a7450" thickness="4px" />
      </Center>
    );
  }

  if (error || !consultant) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-10 text-center text-red-500">
        <Text>{error || "Consultant not found"}</Text>
        <Button mt={4} colorScheme="green" onClick={() => window.location.href = "/recruitment/consultancies"}>
          Back to Consultants
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Hero consultant={consultant} />
      <Info consultant={consultant} />
    </div>
  );
};

export default page;