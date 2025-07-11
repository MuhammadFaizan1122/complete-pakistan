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
} from "@chakra-ui/react";
import { Country, State, City } from "country-state-city";
// import { StepwiseDatePicker } from "./CustomDatePicker";

interface ContactInfoFormProps {
  register: any;
  setValue: any;
  watch: any;
  errors: any;
}

export default function ContactInfoForm({ register, setValue, watch, errors }: ContactInfoFormProps) {
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

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
      <FormControl display="flex" alignItems="center" mt={4}>
        <FormLabel className="text-[#2D3748] mt-2 pl-1">GAMCA medical fitness report</FormLabel>
        <Switch id="gamca" {...register("gamca")} />
      </FormControl>
      {/* {watch("gamca") && (
        <StepwiseDatePicker
          name="madicalDate"
          label="GAMCA Medical Date"
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
      )} */}
      <HStack spacing={4} flexWrap="wrap">
        <FormControl isInvalid={!!errors.passport}>
          <FormLabel className="text-[#2D3748] pl-1 mt-2">Passport</FormLabel>
          <Input
            type="number"
            placeholder="Enter your passport"
            rounded="15px"
            maxLength={9}
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
            {...register("passport")}
          />
          <FormErrorMessage>{errors.passport?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.phone}>
          <FormLabel className="text-[#2D3748] pl-1 mt-2">Phone Number</FormLabel>
          <Input
            type="tel"
            placeholder="Enter your phone"
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
            {...register("phone")}
          />
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>
      </HStack>
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
              register("country").onChange(e);
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
              register("state").onChange(e);
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
        <FormControl isInvalid={!!errors.address}>
          <FormLabel className="text-[#2D3748] pl-1 mt-2">Address</FormLabel>
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
            {...register("address")}
          />
          <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
        </FormControl>
      </HStack>
    </VStack>
  );
}