import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
  Text,
  Button,
  Flex,
  HStack,
  Select,
  CheckboxGroup,
  Wrap,
  WrapItem,
  Checkbox,
} from "@chakra-ui/react";
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
  const [city, setCity] = useState("");

  const pakistaniCities = [
    "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar",
    "Quetta", "Sialkot", "Gujranwala", "Hyderabad", "Bahawalpur", "Sargodha", "Other (Specify)"
  ];
  const languages = ["English", "Urdu", "Arabic", "Punjabi", "Saraiki", "Pashto", "Balochi", "Sindhi", "Kashmiri"];
  const gulfCountries = ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain"];

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="lg" color="#2D3748" fontWeight="bold">Personal Information</Text>
      <FormControl>
        <FormLabel className="text-[#2D3748] pl-1 mt-2">Photo</FormLabel>
        <Flex justify={'space-around'}>
          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="md"
            textAlign="center"
            p={2}
            w={{ base: "full", md: "200px" }}
          >
            <VStack spacing={2} my={2} alignItems={'center'} display={'flex'} flexDir={'column'} h={'full'}>
              <Image
                src="/Images/Icons/camera.png"
                alt="icon"
                width={24}
                height={24}
                className="!h-[24px]"
              />
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
                <Image src={imgPreview} alt="Photo Preview" width={120}
                  height={120} />
              ) : (
                <Text fontSize={{ base: "md", md: "lg" }} my={4} color="gray.700" fontWeight="medium">
                  Image Preview
                </Text>
              )}

            </VStack>
          </Box>
        </Flex>
      </FormControl>
      <HStack>
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
        <FormControl isInvalid={!!errors.name}>
          <FormLabel className="text-[#2D3748] pl-1 mt-2">Father Name</FormLabel>
          <Input
            placeholder="Enter your father name"
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
      </HStack>
      <HStack>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel className="text-[#2D3748] pl-1 mt-2">Passport # (2 letters + 7 digits)</FormLabel>
          <Input
            placeholder="Enter your passport number"
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
        <FormControl isInvalid={!!errors.name}>
          <FormLabel className="text-[#2D3748] pl-1 mt-2">CNIC # (XXXXX-XXXXXXX-X)</FormLabel>
          <Input
            placeholder="Enter your CNIC"
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
      </HStack>
      <HStack>
        <FormControl>
          <FormLabel>Date of Birth</FormLabel>
          <Input
            rounded="15px"
            p={4}
            py={6}
            outline="1px solid"
            outlineColor="gray.300"
            _focus={{ ring: 2, ringColor: "#309689", borderColor: "transparent", outline: "none" }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
            type="date" {...register("dob")} />
        </FormControl>
        <FormControl>
          <FormLabel>Living City</FormLabel>
          <Select
            outline="1px solid"
            rounded="15px"
            outlineColor="gray.300"
            _focus={{ ring: 2, ringColor: "#309689", borderColor: "transparent", outline: "none" }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
            h={'50px'}
            placeholder="Select City" onChange={(e) => setCity(e.target.value)} {...register("city")}>
            {pakistaniCities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </Select>
        </FormControl>
      </HStack>
      {city === "Other (Specify)" && (
        <FormControl>
          <FormLabel>Specify City</FormLabel>
          <Input rounded="15px"
            p={4}
            py={6} placeholder="Enter your city" {...register("otherCity")} />
        </FormControl>
      )}
      <HStack>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel className="text-[#2D3748] pl-1 mt-2">Village/Town</FormLabel>
          <Input
            placeholder="Native Village/Town"
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
        <FormControl>
          <FormLabel className="text-[#2D3748] pl-1 mt-2">Gender</FormLabel>
          <Select
            outline="1px solid"
            rounded="15px"
            outlineColor="gray.300"
            _focus={{ ring: 2, ringColor: "#309689", borderColor: "transparent", outline: "none" }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
            h={'50px'}
            placeholder="Gender" onChange={(e) => setCity(e.target.value)} {...register("gender")}>
            <option value={'male'}>{'Male'}</option>
            <option value={'female'}>{'Female'}</option>
            <option value={'trans'}>{'Trans'}</option>
          </Select>
        </FormControl>
      </HStack>
      <HStack>
        <FormControl>
          <FormLabel>Passport Issue Date</FormLabel>
          <Input
            rounded="15px"
            p={4}
            py={6}
            outline="1px solid"
            outlineColor="gray.300"
            _focus={{ ring: 2, ringColor: "#309689", borderColor: "transparent", outline: "none" }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
            type="date" {...register("passportIssueDate")} />
        </FormControl>
        <FormControl>
          <FormLabel>Passport Expiry Date</FormLabel>
          <Input
            rounded="15px"
            p={4}
            py={6}
            outline="1px solid"
            outlineColor="gray.300"
            _focus={{ ring: 2, ringColor: "#309689", borderColor: "transparent", outline: "none" }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
            type="date" {...register("passportExpiryDate")} />
        </FormControl>
      </HStack>
      <FormControl>
        <FormLabel>Languages</FormLabel>
        <CheckboxGroup>
          <Wrap>
            {languages.map((lang) => (
              <WrapItem key={lang}>
                <Checkbox value={lang} {...register("languages")}>{lang}</Checkbox>
              </WrapItem>
            ))}
          </Wrap>
        </CheckboxGroup>
        <Input mt={2} placeholder="Other Languages (Comma Separated)" {...register("otherLanguages")} />
      </FormControl>

      {/* Gulf Countries */}
      <FormControl>
        <FormLabel>Countries Visited (Gulf Countries)</FormLabel>
        <CheckboxGroup>
          <Wrap>
            {gulfCountries.map((country) => (
              <WrapItem key={country}>
                <Checkbox value={country} {...register("gulfCountries")}>{country}</Checkbox>
              </WrapItem>
            ))}
          </Wrap>
        </CheckboxGroup>
        <Input mt={2} placeholder="Other Countries (Comma Separated)" {...register("otherCountries")} />
      </FormControl>

      {/* Experience */}
      <FormControl>
        <FormLabel>Experienced (Numerical Years)</FormLabel>
        <Select placeholder="Select Experience">
          <option value="1-3 Years">1-3 Years</option>
          <option value="4-6 Years">4-6 Years</option>
          <option value="7-10 Years">7-10 Years</option>
          <option value="11-15 Years">11-15 Years</option>
          <option value="16+ Years">16+ Years</option>
        </Select>
      </FormControl>
    </VStack>
  );
}