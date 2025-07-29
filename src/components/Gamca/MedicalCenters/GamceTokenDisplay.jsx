'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { handleGetGamcaToken } from '../../../handlers/gamca/gamca-token';

export function GamcaTokenDisplay() {
  const [gamcaToken, setGamcaToken] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await handleGetGamcaToken();
        if (response.data) {
          setGamcaToken(response.data);
        }
      } catch (error) {
        console.error('Error fetching GAMCA token:', error);
      }
    };
    fetchToken();
  }, []);

  return (
    <>
      <Box textAlign="center" py={4}>
        <Button
          bg="#309689"
          color="white"
          border="1px solid transparent"
          borderRadius="xl"
          py={6}
          px={8}
          fontSize="md"
          _hover={{ bg: "white", color: "black", border: "1px solid black" }}
          onClick={onOpen}
          isDisabled={!gamcaToken}
        >
          Get Your GAMCA Token / Appointment from Your City
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay bg="blackAlpha.600" />
        <ModalContent
          bg="white"
          borderRadius="xl"
          maxW={{ base: "90%", md: "600px" }}
          mx="auto"
          overflow="hidden"
        >
          <ModalHeader
            bg="#309689"
            color="white"
            fontWeight="bold"
            fontSize="2xl"
            textAlign="center"
            py={4}
          >
            GAMCA Token
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody p={6}>
            {gamcaToken ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                bg="gray.50"
                borderRadius="lg"
                overflow="hidden"
              >
                <Image
                  src={gamcaToken.imageUrl}
                  alt="GAMCA Token"
                  maxH="400px"
                  objectFit="contain"
                  borderRadius="lg"
                />
              </Box>
            ) : (
              <Box textAlign="center" py={4}>
                <Text fontSize="lg" color="gray.500">
                  No token image available
                </Text>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}