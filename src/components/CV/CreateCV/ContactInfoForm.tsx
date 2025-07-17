import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  HStack,
  VStack,
  FormErrorMessage,
  Text,
  Button,
} from "@chakra-ui/react";
import { Country, State, City } from "country-state-city";
// import { StepwiseDatePicker } from "./CustomDatePicker";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface ContactInfoFormProps {
  register: any;
  setValue: any;
  watch: any;
  errors: any;
  tabIndex: any;
  setTabIndex: any;
}

export default function ContactInfoForm({ register, setValue, watch, errors, setTabIndex }: ContactInfoFormProps) {
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const goNext = () => setTabIndex((prev) => prev + 1);
  const goBack = () => setTabIndex((prev) => Math.max(prev - 1, 0));
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    const selectedCountry = countries.find((c) => c.name === countryCode);
    const stateList = State.getStatesOfCountry(selectedCountry?.isoCode);
    setStates(stateList);
    setCities([]);
    setValue("state", "");
    setValue("city", "");
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateCode = e.target.value;
    const selectedState = states.find((s) => s.name === stateCode);
    const cityList = City.getCitiesOfState(selectedState?.countryCode, selectedState?.isoCode);
    setCities(cityList);
    setValue("city", "");
  };

  useEffect(() => {
    if (countries.length) {
      const selectedCountry = countries.find((c) => c.name === "Pakistan");
      setValue("country", "Pakistan");
      const stateList = State.getStatesOfCountry(selectedCountry?.isoCode);
      setStates(stateList);
      setCities([]);
      setValue("state", "");
      setValue("city", "");
    }
  }, [countries, setValue]);

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="lg" color="#2D3748" fontWeight="bold">Contact Information</Text>
      <HStack>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel className="text-[#2D3748] pl-1 mt-2">Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
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
            {...register("email")}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.phone}>
          <FormLabel className="text-[#2D3748] pl-1 mt-2">Phone Number</FormLabel>
          <PhoneInput
            country={'pk'}
            inputStyle={{
              width: '100%',
              height: '50px',
              border: '1px solid #D1D5DB',
              borderRadius: '15px',
              outline: '1px solid #D1D5DB',
              fontSize: '16px',
              paddingLeft: '48px',
              paddingRight: '16px',
              paddingTop: '24px',
              paddingBottom: '24px',
              backgroundColor: 'white',
              transition: 'all 0.2s',
            }}
            buttonStyle={{
              border: 'none',
              background: 'none',
              borderRadius: '15px 0 0 15px',
            }}
            containerStyle={{
              width: '100%',
              position: 'relative',
            }}
            inputClass="phone-input-custom"
            onChange={(value) => setValue('phone', value)}
            value={watch('phone')}
            inputProps={{
              name: 'phone',
              required: true,
              placeholder: 'Enter WhatsApp number',
            }}
          />
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>
      </HStack>
      <HStack>
        <FormControl isInvalid={!!errors.whatsapp}>
          <FormLabel className="text-[#2D3748] pl-1 mt-2">Whatsapp Number</FormLabel>
          <PhoneInput
            country={'pk'}
            inputStyle={{
              width: '100%',
              height: '50px',
              border: '1px solid #D1D5DB',
              borderRadius: '15px',
              outline: '1px solid #D1D5DB',
              fontSize: '16px',
              paddingLeft: '48px',
              paddingRight: '16px',
              paddingTop: '24px',
              paddingBottom: '24px',
              backgroundColor: 'white',
              transition: 'all 0.2s',
            }}
            buttonStyle={{
              border: 'none',
              background: 'none',
              borderRadius: '15px 0 0 15px',
            }}
            containerStyle={{
              width: '100%',
              position: 'relative',
            }}
            inputClass="phone-input-custom"
            onChange={(value) => setValue('whatsapp', value)}
            value={watch('whatsapp')}
            inputProps={{
              name: 'whatsapp',
              required: false,
              placeholder: 'Enter WhatsApp number',
            }}
          />
          <FormErrorMessage>{errors.whatsapp?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.otherNumber}>
          <FormLabel className="text-[#2D3748] pl-1 mt-2">Other Country Number</FormLabel>
          <PhoneInput
            country={'pk'}
            inputStyle={{
              width: '100%',
              height: '50px',
              border: '1px solid #D1D5DB',
              borderRadius: '15px',
              outline: '1px solid #D1D5DB',
              fontSize: '16px',
              paddingLeft: '48px',
              paddingRight: '16px',
              paddingTop: '24px',
              paddingBottom: '24px',
              backgroundColor: 'white',
              transition: 'all 0.2s',
            }}
            buttonStyle={{
              border: 'none',
              background: 'none',
              borderRadius: '15px 0 0 15px',
            }}
            containerStyle={{
              width: '100%',
              position: 'relative',
            }}
            inputClass="phone-input-custom"
            onChange={(value) => setValue('otherNumber', value)}
            value={watch('otherNumber')}
            inputProps={{
              name: 'otherNumber',
              required: false,
              placeholder: 'Enter Other Country number',
            }}
          />
          <FormErrorMessage>{errors.otherNumber?.message}</FormErrorMessage>
        </FormControl>
      </HStack>
      <HStack>
        <FormControl isInvalid={!!errors.backupNumber}>
          <FormLabel className="text-[#2D3748] pl-1 mt-2">Backup Number</FormLabel>
          <PhoneInput
            country={'pk'}
            inputStyle={{
              width: '100%',
              height: '50px',
              border: '1px solid #D1D5DB',
              borderRadius: '15px',
              outline: '1px solid #D1D5DB',
              fontSize: '16px',
              paddingLeft: '48px',
              paddingRight: '16px',
              paddingTop: '24px',
              paddingBottom: '24px',
              backgroundColor: 'white',
              transition: 'all 0.2s',
            }}
            buttonStyle={{
              border: 'none',
              background: 'none',
              borderRadius: '15px 0 0 15px',
            }}
            containerStyle={{
              width: '100%',
              position: 'relative',
            }}
            inputClass="phone-input-custom"
            onChange={(value) => setValue('backupNumber', value)}
            value={watch('backupNumber')}
            inputProps={{
              name: 'backupNumber',
              required: false,
              placeholder: 'Enter backup number',
            }}
          />
          <FormErrorMessage>{errors.backupNumber?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.backupEmail}>
          <FormLabel className="text-[#2D3748] pl-1 mt-2">Backup Email</FormLabel>
          <Input
            type="email"
            placeholder="backup email"
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
            {...register("backupEmail")}
          />
          <FormErrorMessage>{errors.backupEmail?.message}</FormErrorMessage>
        </FormControl>
      </HStack>

      {/* <FormControl display="flex" alignItems="center" mt={4}>
        <FormLabel className="text-[#2D3748] mt-2 pl-1">GAMCA medical fitness report</FormLabel>
        <Switch id="gamca" {...register("gamca")} />
      </FormControl>
      {watch("gamca") && (
        <StepwiseDatePicker
          name="madicalDate"
          label="GAMCA Medical Date"
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
      )} */}
      <FormControl isInvalid={!!errors.country || !!errors.state}>
        <FormLabel className="text-[#2D3748] pl-1">Address</FormLabel>
        <HStack spacing={4} flexWrap="wrap">
          <Select
            placeholder="Country"
            rounded="15px"
            h="50px"
            border="1px solid"
            borderColor="gray.300"
            bg="white"
            outline="1px solid"
            outlineColor="gray.300"
            _focus={{ ring: 2, ringColor: "#309689", borderColor: "transparent", outline: "none" }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
            {...register("country")}
            onChange={(e) => {
              handleCountryChange(e);
            }}
          >
            {countries.map((c) => (
              <option key={c.isoCode} value={c.name}>{c.name}</option>
            ))}
          </Select>
          <Select
            placeholder="State"
            rounded="15px"
            h="50px"
            border="1px solid"
            borderColor="gray.300"
            bg="white"
            outline="1px solid"
            outlineColor="gray.300"
            _focus={{ ring: 2, ringColor: "#309689", borderColor: "transparent", outline: "none" }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
            {...register("state")}
            onChange={(e) => {
              handleStateChange(e);
            }}
          >
            {states.map((s) => (
              <option key={s.isoCode} value={s.name}>{s.name}</option>
            ))}
          </Select>
        </HStack>
        <FormErrorMessage>{errors.country?.message || errors.state?.message}</FormErrorMessage>
      </FormControl>
      <HStack spacing={4} flexWrap="wrap">
        <FormControl isInvalid={!!errors.city}>
          <Select
            placeholder="City"
            rounded="15px"
            h="50px"
            border="1px solid"
            borderColor="gray.300"
            bg="white"
            outline="1px solid"
            outlineColor="gray.300"
            _focus={{ ring: 2, ringColor: "#309689", borderColor: "transparent", outline: "none" }}
            _active={{ outline: "none" }}
            transition="all 0.2s"
            {...register("city")}
          >
            {cities.map((c) => (
              <option key={c.isoCode} value={c.name}>{c.name}</option>
            ))}
          </Select>
          <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.localAddress}>
          <FormLabel className="text-[#2D3748] pl-1 mt-2">Local Address (as on CNIC)</FormLabel>
          <Input
            placeholder="Address"
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
            {...register("localAddress")}
          />
          <FormErrorMessage>{errors.localAddress?.message}</FormErrorMessage>
        </FormControl>
      </HStack>
      <HStack>
        <Button
          mt={4}
          w={'full'}
          bg="#309689"
          color="white"
          rounded="15px"
          px={6}
          py={6}
          _hover={{ bg: "#28796f" }}
          onClick={goBack}
        >
          Previous
        </Button>
        <Button
          mt={4}
          w={'full'}
          bg="#309689"
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