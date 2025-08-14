"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";

export default function Notice({ setTotalNotices }) {

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);
  const params = useParams()
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch(`/api/trade-partner/notice?id=${params.id}`, { cache: "no-store" });
        const data = await res.json();
        console.log('data', data)
        if (!data.success) {
          setError(err.message);
        }
        setTotalNotices(data.data[0].images.length)
        setNotices(data.data[0].images || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);
  const handleImageClick = (img) => {
    setSelectedImage(img);
    onOpen();
  };
  return (
    <Box p={4} bg="white" rounded="lg" shadow="md" minH="60vh">
      {loading ? (
        <Flex justify="center" align="center" py={6}>
          <Spinner size="lg" />
        </Flex>

      ) : notices.length === 0 ? (
        <Text color="gray.500" textAlign="center">
          No notices found.
        </Text>
      ) : (
        <>
          <Flex gap={3} wrap="wrap">
            {notices.slice(0, 3).map((img, idx) => (
              <Image
                key={idx}
                src={img.url}
                alt={`Notice ${idx}`}
                w="120px"
                h="120px"
                objectFit="cover"
                rounded="md"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ transform: "scale(1.05)" }}
                onClick={() => handleImageClick(img.url)}
              />
            ))}
          </Flex>

          {/* Image Popup */}
          <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
            <ModalOverlay />
            <ModalContent bg="transparent" boxShadow="none" maxW="90%">
              <ModalCloseButton color="black" />
              <ModalBody p={0} bg={'white'} rounded={'lg'}>
                {selectedImage && (
                  <Image
                    src={selectedImage}
                    alt="Selected Notice"
                    w="100%"
                    h="auto"
                    maxH="80vh"
                    objectFit="contain"
                    rounded="md"
                  />
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
}
