import React, { useEffect, useState } from "react";
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
  Textarea,
  Switch,
} from "@chakra-ui/react";
import Image from "next/image";
interface PersonalInfoFormProps {
  register: any;
  setValue: any;
  watch: any;
  errors: any;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imgPreview: string;
  tabIndex: any;
  setTabIndex: any;
}

export default function PersonalInfoForm({
  register,
  setValue,
  watch,
  errors,
  handleImageChange,
  imgPreview,
  tabIndex,
  setTabIndex
}: PersonalInfoFormProps) {
  const [city, setCity] = useState("");
  const [showMedicalField, setShowMedicalField] = useState(false);

  function formatCNIC(value: string) {
    const cleaned = value.replace(/\D/g, '').slice(0, 13);
    const part1 = cleaned.slice(0, 5);
    const part2 = cleaned.slice(5, 12);
    const part3 = cleaned.slice(12, 13);

    let formatted = part1;
    if (part2) formatted += `-${part2}`;
    if (part3) formatted += `-${part3}`;
    return formatted;
  }

  function formatPassport(value: string) {
    let cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    let letters = cleaned.replace(/[^A-Za-z]/g, '').slice(0, 2);
    let digits = cleaned.replace(/[^0-9]/g, '').slice(0, 7);

    return letters + digits;
  }

  const pakistaniCities = [
    "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar",
    "Quetta", "Sialkot", "Gujranwala", "Hyderabad", "Bahawalpur", "Sargodha", "Other (Specify)"
  ];
  const languages = ["English", "Urdu", "Arabic", "Punjabi", "Saraiki", "Pashto", "Balochi", "Sindhi", "Kashmiri"];
  const gulfCountries = ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain"];
  const passport = watch("passport") || "";

  useEffect(() => {
    setValue("gender", "male");
  }, [])

  const goNext = () => setTabIndex((prev) => prev + 1);
  // Calculate date range (last 3 months)
  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];
  const minDate = new Date(today.setMonth(today.getMonth() - 3))
    .toISOString()
    .split("T")[0];
  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="lg" color="#2D3748" fontWeight="bold">Personal Information</Text>
      <HStack>
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
            {/* <Box
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
          </Box> */}
          </Flex>
        </FormControl>
        <FormControl isInvalid={!!errors.objective} mt={4}>
          <FormLabel className="text-[#2D3748] pl-1">Objective</FormLabel>
          <Textarea
            placeholder="Write your objective here..."
            rounded="15px"
            p={4}
            rows={5}
            border="1px solid"
            borderColor="gray.300"
            bg="white"
            outline="1px solid"
            outlineColor="gray.300"
            _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
            resize="vertical"
            {...register("objective")}
          />
          <FormErrorMessage>{errors.objective?.message}</FormErrorMessage>
        </FormControl>
      </HStack>

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
            _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
            {...register("name")}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.fatherName}>
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
            _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
            {...register("fatherName")}
          />
          <FormErrorMessage>{errors.fatherName?.message}</FormErrorMessage>
        </FormControl>
      </HStack>
      <HStack>
        <FormControl isInvalid={!!errors.passport}>
          <FormLabel className="text-[#2D3748] pl-1 mt-2">Passport # (2 letters + 7 digits)</FormLabel>
          <Input
            placeholder="Enter your passport number"
            rounded="15px"
            type="text"
            value={passport}
            onChange={(e) => {
              const formatted = formatPassport(e.target.value);
              setValue("passport", formatted);
            }}
            p={4}
            py={6}
            border="1px solid"
            borderColor="gray.300"
            bg="white"
            outline="1px solid"
            outlineColor="gray.300"
            _focus={{
              ring: 2,
              ringColor: "#0a7450",
              borderColor: "transparent",
              outline: "none",
            }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
          />
          <FormErrorMessage>{errors.passport?.message}</FormErrorMessage>
        </FormControl>;
        <FormControl isInvalid={!!errors.cnic}>
          <FormLabel className="text-[#2D3748] pl-1 mt-2">CNIC # (XXXXX-XXXXXXX-X)</FormLabel>
          <Input
            placeholder="Enter your CNIC"
            rounded="15px"
            type="text"
            value={watch("cnic") || ""}
            onChange={(e) => {
              const formatted = formatCNIC(e.target.value);
              setValue("cnic", formatted);
            }}
            p={4}
            py={6}
            border="1px solid"
            borderColor="gray.300"
            bg="white"
            outline="1px solid"
            outlineColor="gray.300"
            _focus={{
              ring: 2,
              ringColor: "#0a7450",
              borderColor: "transparent",
              outline: "none",
            }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
          />
          <FormErrorMessage>{errors.cnic?.message}</FormErrorMessage>
        </FormControl>
      </HStack>
      <HStack>
        <FormControl isInvalid={!!errors.dob}>
          <FormLabel>Date of Birth</FormLabel>
          <Input
            rounded="15px"
            p={4}
            py={6}
            outline="1px solid"
            outlineColor="gray.300"
            _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
            type="date"
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
            {...register("dob")}
          />
          <FormErrorMessage>{errors.dob?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.livingcity}>
          <FormLabel>Living City</FormLabel>
          <Select
            outline="1px solid"
            rounded="15px"
            outlineColor="gray.300"
            _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
            h={'50px'}
            placeholder="Select City" onChange={(e) => setCity(e.target.value)} {...register("livingcity")}>
            {pakistaniCities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </Select>
          <FormErrorMessage>{errors.livingcity?.message}</FormErrorMessage>
        </FormControl>
      </HStack>
      {city === "Other (Specify)" && (
        <FormControl isInvalid={!!errors.livingcity}>
          <FormLabel>Specify City</FormLabel>
          <Input
            rounded="15px"
            p={4}
            py={6}
            placeholder="Enter your city" {...register("livingcity")} />
          <FormErrorMessage>{errors.livingcity?.message}</FormErrorMessage>
        </FormControl>
      )}
      <HStack>
        <FormControl isInvalid={!!errors.village}>
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
            _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
            {...register("village")}
          />
          <FormErrorMessage>{errors.village?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.gender}>
          <FormLabel className="text-[#2D3748] pl-1 mt-2">Gender</FormLabel>
          <Select
            defaultValue="male"
            outline="1px solid"
            rounded="15px"
            outlineColor="gray.300"
            _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
            h={'50px'}
            placeholder="Gender"
            {...register("gender")}>
            <option value={'male'}>{'Male'}</option>
            <option value={'female'}>{'Female'}</option>
          </Select>
          <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
        </FormControl>
      </HStack>
      <HStack>
        <FormControl isInvalid={!!errors.passportIssue}>
          <FormLabel>Passport Issue Date</FormLabel>
          <Input
            rounded="15px"
            p={4}
            py={6}
            outline="1px solid"
            outlineColor="gray.300"
            _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
            type="date" {...register("passportIssue")} />
          <FormErrorMessage>{errors.passportIssue?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.passportExpiry}>
          <FormLabel>Passport Expiry Date</FormLabel>
          <Input
            rounded="15px"
            p={4}
            py={6}
            outline="1px solid"
            outlineColor="gray.300"
            _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
            type="date" {...register("passportExpiry")} />
          <FormErrorMessage>{errors.passportExpiry?.message}</FormErrorMessage>
        </FormControl>
      </HStack>
      <HStack>
        <FormControl isInvalid={!!errors.drivingLicence}>
          <FormLabel>Driving Licence</FormLabel>
          <Input
            rounded="15px"
            p={4}
            py={6}
            placeholder="Enter Driving Licence (If you have)"
            outline="1px solid"
            outlineColor="gray.300"
            _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
            type="text"
            maxLength={16}
            inputMode="numeric"
            pattern="[0-9]*"
            {...register("drivingLicence")}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            }}
          />
          <FormErrorMessage>{errors.drivingLicence?.message}</FormErrorMessage>
        </FormControl>

        {/* GAMCA Medical Switch or Date */}
        {!showMedicalField ? (
          <FormControl>
            <FormLabel>Have GAMCA Medical?</FormLabel>
            <Box pt={2}>
              <Switch
                colorScheme="teal"
                size="lg"
                onChange={() => setShowMedicalField(true)}
              />
            </Box>
          </FormControl>
        ) : (
          <FormControl isInvalid={!!errors.madicalDate}>
            <FormLabel>GAMCA Medical Date</FormLabel>
            <Input
              rounded="15px"
              p={4}
              py={6}
              outline="1px solid"
              outlineColor="gray.300"
              _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
              _active={{ outline: "none" }}
              transition="all 0.2s"
              type="date"
              min={minDate}
              max={maxDate}
              {...register("madicalDate")}
            />
            <FormErrorMessage>{errors.madicalDate?.message}</FormErrorMessage>
          </FormControl>

        )}
      </HStack>

      <FormControl isInvalid={!!errors.languages}>
        <FormLabel>Languages</FormLabel>
        <CheckboxGroup
          value={watch('languages')}
          onChange={(val) => setValue('languages', val)}
        >
          <Wrap>
            {["English", "Urdu", "Arabic", "Punjabi", "Siraiki", "Pashto", "Balochi", "Sindhi", "Kashmiri"].map(lang => (
              <WrapItem key={lang}>
                <Checkbox value={lang}>{lang}</Checkbox>
              </WrapItem>
            ))}
          </Wrap>
        </CheckboxGroup>
        <Input
          rounded="15px"
          p={4}
          py={6}
          outline="1px solid"
          outlineColor="gray.300"
          _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
          _active={{ outline: "none" }}
          transition="all 0.2s"
          mt={2} placeholder="Other languages (Comma Separated)"
          onChange={(val) => setValue('languages', val)}
        />
        <FormErrorMessage>{errors.languages?.message}</FormErrorMessage>
      </FormControl>


      {/* Gulf Countries */}
      <FormControl isInvalid={!!errors.countriesVisited}>
        <FormLabel>Countries Visited (Gulf Countries)</FormLabel>
        <CheckboxGroup
          // value={watch('countriesVisited')}
          onChange={(val) => setValue('countriesVisited', val)}
        >
          <Wrap>
            {gulfCountries.map((country) => (
              <WrapItem key={country}>
                <Checkbox value={country} >{country}</Checkbox>
              </WrapItem>
            ))}
          </Wrap>
        </CheckboxGroup>
        <Input
          rounded="15px"
          p={4}
          py={6}
          outline="1px solid"
          outlineColor="gray.300"
          _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
          _active={{ outline: "none" }}
          transition="all 0.2s"
          mt={2} placeholder="Other Countries (Comma Separated)"
          onChange={(val) => setValue('countriesVisited', val)}
        />
        <FormErrorMessage>{errors.countriesVisited?.message}</FormErrorMessage>
      </FormControl>

      {/* Experience */}
      <FormControl isInvalid={!!errors.yearsOfExperience}>
        <FormLabel>Experienced (Numerical Years)</FormLabel>
        <Select
          outline="1px solid"
          rounded="15px"
          outlineColor="gray.300"
          {...register("yearsOfExperience")}
          _focus={{ ring: 2, ringColor: "#0a7450", borderColor: "transparent", outline: "none" }}
          _active={{ outline: "none" }}
          transition="all 0.2s"
          h={'50px'}
          placeholder="Select Experience">
          <option value="1-3 Years">1-3 Years</option>
          <option value="4-6 Years">4-6 Years</option>
          <option value="7-10 Years">7-10 Years</option>
          <option value="11-15 Years">11-15 Years</option>
          <option value="16+ Years">16+ Years</option>
        </Select>
        <FormErrorMessage>{errors.yearsOfExperience?.message}</FormErrorMessage>
      </FormControl>
      <HStack>
        <Button
          mt={4}
          w={'full'}
          bg="#0a7450"
          color="white"
          rounded="15px"
          px={6}
          py={6}
          _hover={{ bg: "#28796f" }}
          onClick={goNext}
        >
          Next
        </Button>
      </HStack>
    </VStack>
  );
}