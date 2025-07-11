import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
  Text,
  Button,
} from "@chakra-ui/react";
// import { StepwiseDatePicker } from "./CustomDatePicker";
import { MdAdd } from "react-icons/md";
import Image from "next/image";

interface PersonalInfoFormProps {
  register: any;
  setValue: any;
  watch: any;
  errors: any;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imgPreview: string;
}

export default function PersonalInfoForm({
  register,
  setValue,
  watch,
  errors,
  handleImageChange,
  imgPreview,
}: PersonalInfoFormProps) {
  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="lg" color="#2D3748" fontWeight="bold">Personal Information</Text>
      <FormControl>
        <FormLabel className="text-[#2D3748] pl-1 mt-2">Photo</FormLabel>
        <Box
          bg="white"
          borderRadius="2xl"
          boxShadow="md"
          textAlign="center"
          p={2}
          w={{ base: "full", md: "200px" }}
        >
          <VStack spacing={2} my={2}>
            {imgPreview ? (
              <Image src={imgPreview} alt="Photo Preview" width={50}
                height={50}/>
            ) : (
              <Image
                src="/Images/Icons/camera.png"
                alt="icon"
                width={24}
                height={24}
                className="!h-[24px]"
              />
            )}
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.700" fontWeight="medium">
              Upload photo
            </Text>
            <Button
              as="label"
              htmlFor="photo-upload"
              border="1px dashed"
              borderColor="gray.600"
              bg="transparent"
              color="gray.600"
              rounded="full"
              px={{ base: 4, md: 4 }}
              py={{ base: 2, md: 3 }}
              cursor="pointer"
            >
              Choose file
              <input
                id="photo-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </Button>
          </VStack>
        </Box>
      </FormControl>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel className="text-[#2D3748] pl-1 mt-2">Name</FormLabel>
        <Input
          placeholder="Enter your name"
          rounded="15px"
          p={4}
          py={6}
          border="1px solid"
          borderColor="gray.300"
          bg="white"
          outline="1px solid"
          outlineColor="gray.300"
          _focus={{ ring: 2, ringColor: "#309689", borderColor: "transparent", outline: "none" }}
          _active={{ outline: "none" }}
          transition="all 0.2s"
          {...register("name")}
        />
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
      </FormControl>
      {/* <StepwiseDatePicker
        name="dob"
        label="Date of Birth"
        errors={errors}
        watch={watch}
        setValue={setValue}
      /> */}
    </VStack>
  );
}