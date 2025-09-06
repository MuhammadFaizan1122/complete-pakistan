"use client";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    VStack,
    HStack,
    Tag,
    TagLabel,
    TagCloseButton,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import { Country, State, City } from "country-state-city";
import StyledInput from "../../CV/StyledInput";
import StyledSelect from "../../CV/CvDirectory/StyledSelect";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { useSession } from "next-auth/react";
import axios from "axios";


const schema = Yup.object().shape({
    profileImage: Yup.mixed().required("Profile image is required"),
    name: Yup.string().required("Name is required"),
    passportNumber: Yup.string()
        .matches(/^[A-Za-z]{2}\d{7}$/, "Passport must be 2 letters followed by 7 digits")
        .required("Passport number is required"),
    iqamaStatus: Yup.string().required("Status is required"),
    iqamaExpiry: Yup.date().required("Expiry date is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    contactAbroad: Yup.string().required("Contact number abroad is required"),
    contactPakistani: Yup.string().required("Pakistani number is required"),
    whatsapp: Yup.string().required("WhatsApp number is required"),
    profession: Yup.string().required("Profession is required"),
    education: Yup.string().required("Education is required"),
    completeAddress: Yup.string().required("Complete Address is required"),
    experties: Yup.array().min(1, "At least one expertise is required"),
    yearsOfExperience: Yup.number()
        .typeError("Must be a number")
        .required("Years of experience is required"),
});

export default function ProfilePopup({ isOpen, onClose }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [countries] = useState(Country.getAllCountries());
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [experties, setExperties] = useState([]);
    const { data: session } = useSession();

    const handleCountryChange = (e) => {
        const countryName = e.target.value;
        const selectedCountry = countries.find((c) => c.name === countryName);
        if (selectedCountry) {
            setStates(State.getStatesOfCountry(selectedCountry.isoCode));
            setCities([]);
            setValue("country", countryName);
            setValue("state", "");
            setValue("city", "");
        }
    };

    const handleStateChange = (e) => {
        const stateName = e.target.value;
        const selectedState = states.find((s) => s.name === stateName);
        if (selectedState) {
            setCities(City.getCitiesOfState(selectedState.countryCode, selectedState.isoCode));
            setValue("state", stateName);
            setValue("city", "");
        }
    };

    const handleExpertiesKeyDown = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();
            const newTag = e.target.value.trim();
            setExperties((prev) => [...prev, newTag]);
            setValue("experties", [...experties, newTag]);
            e.target.value = "";
        }
    };

    const removeExpertise = (tag) => {
        const updated = experties.filter((item) => item !== tag);
        setExperties(updated);
        setValue("experties", updated);
    };

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                experties,
                userId: session?.user?.id,
            };
            console.log("Submitting:", payload);
            const res = await axios.post("/api/naqal-kafala", payload);
            if (res.data.success) {
                alert("Request submitted successfully!");
                reset();
                onClose();
            } else {
                alert(res.data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Submit error:", error);
            alert("Failed to submit request");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalOverlay />
            <ModalContent borderRadius="2xl" p={4}>
                <ModalHeader>Add Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>

                        {/* Profile Image */}
                        <FormControl isInvalid={!!errors.profileImage}>
                            <FormLabel>Profile Image</FormLabel>
                            <StyledInput type="file" {...register("profileImage")} />
                            <FormErrorMessage>{errors.profileImage?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.name}>
                            <FormLabel>Name</FormLabel>
                            <StyledInput placeholder="Enter name" {...register("name")} />
                            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.passportNumber}>
                            <FormLabel>Passport Number</FormLabel>
                            <StyledInput placeholder="Enter passport number" {...register("passportNumber")} />
                            <FormErrorMessage>{errors.passportNumber?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.iqamaStatus}>
                            <FormLabel>Iqama / Betaqa / Permit Status</FormLabel>
                            <StyledSelect placeholder="Select status" {...register("iqamaStatus")}>
                                <option value="no iqama">No Iqama</option>
                                <option value="3 months abshar">3 Months Abshar</option>
                                <option value="1 year">1 Year</option>
                            </StyledSelect>
                            <FormErrorMessage>{errors.iqamaStatus?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.iqamaExpiry}>
                            <FormLabel>Iqama Expiry</FormLabel>
                            <StyledInput type="date" {...register("iqamaExpiry")} />
                            <FormErrorMessage>{errors.iqamaExpiry?.message}</FormErrorMessage>
                        </FormControl>

                        {/* Country / State / City */}
                        <HStack spacing={4} w="100%">
                            <FormControl isInvalid={!!errors.country}>
                                <FormLabel>Country</FormLabel>
                                <StyledSelect placeholder="Select country" onChange={handleCountryChange}>
                                    {countries.map((c) => (
                                        <option key={c.isoCode} value={c.name}>{c.name}</option>
                                    ))}
                                </StyledSelect>
                                <FormErrorMessage>{errors.country?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.state}>
                                <FormLabel>State</FormLabel>
                                <StyledSelect placeholder="Select state" onChange={handleStateChange}>
                                    {states.map((s) => (
                                        <option key={s.isoCode} value={s.name}>{s.name}</option>
                                    ))}
                                </StyledSelect>
                                <FormErrorMessage>{errors.state?.message}</FormErrorMessage>
                            </FormControl>
                        </HStack>

                        <FormControl isInvalid={!!errors.city}>
                            <FormLabel>City</FormLabel>
                            <StyledSelect placeholder="Select city" {...register("city")}>
                                {cities.map((c) => (
                                    <option key={c.name} value={c.name}>{c.name}</option>
                                ))}
                            </StyledSelect>
                            <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.contactAbroad}>
                            <FormLabel>Contact Number (Abroad)</FormLabel>
                            <PhoneInput
                                country={"sa"} // default abroad country (Saudi Arabia example, adjust as needed)
                                {...register("contactAbroad")}
                                onChange={(value) => setValue("contactAbroad", value)}
                                inputStyle={{
                                    width: "100%",
                                    height: "50px",
                                    border: "1px solid #D1D5DB",
                                    borderRadius: "15px",
                                    outline: "1px solid #D1D5DB",
                                    fontSize: "16px",
                                    paddingLeft: "48px",
                                    paddingRight: "16px",
                                    paddingTop: "24px",
                                    paddingBottom: "24px",
                                    backgroundColor: "white",
                                    transition: "all 0.2s",
                                }}
                                buttonStyle={{
                                    border: "none",
                                    background: "none",
                                    borderRadius: "15px 0 0 15px",
                                }}
                                containerStyle={{
                                    width: "100%",
                                    position: "relative",
                                }}
                                inputProps={{
                                    name: "contactAbroad",
                                    required: true,
                                    placeholder: "Contact Number (Abroad)",
                                }}
                            />
                            <FormErrorMessage>{errors.contactAbroad?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.contactPakistani}>
                            <FormLabel>Contact Number (Pakistani)</FormLabel>
                            <PhoneInput
                                country={"pk"}
                                {...register("contactPakistani")}
                                onChange={(value) => setValue("contactPakistani", value)}
                                inputStyle={{
                                    width: "100%",
                                    height: "50px",
                                    border: "1px solid #D1D5DB",
                                    borderRadius: "15px",
                                    outline: "1px solid #D1D5DB",
                                    fontSize: "16px",
                                    paddingLeft: "48px",
                                    paddingRight: "16px",
                                    paddingTop: "24px",
                                    paddingBottom: "24px",
                                    backgroundColor: "white",
                                    transition: "all 0.2s",
                                }}
                                buttonStyle={{
                                    border: "none",
                                    background: "none",
                                    borderRadius: "15px 0 0 15px",
                                }}
                                containerStyle={{
                                    width: "100%",
                                    position: "relative",
                                }}
                                inputProps={{
                                    name: "contactPakistani",
                                    required: true,
                                    placeholder: "Pakistani Number",
                                }}
                            />
                            <FormErrorMessage>{errors.contactPakistani?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.whatsapp}>
                            <FormLabel>WhatsApp Number</FormLabel>
                            <PhoneInput
                                country={"pk"}
                                {...register("whatsapp")}
                                onChange={(value) => setValue("whatsapp", value)}
                                inputStyle={{
                                    width: "100%",
                                    height: "50px",
                                    border: "1px solid #D1D5DB",
                                    borderRadius: "15px",
                                    outline: "1px solid #D1D5DB",
                                    fontSize: "16px",
                                    paddingLeft: "48px",
                                    paddingRight: "16px",
                                    paddingTop: "24px",
                                    paddingBottom: "24px",
                                    backgroundColor: "white",
                                    transition: "all 0.2s",
                                }}
                                buttonStyle={{
                                    border: "none",
                                    background: "none",
                                    borderRadius: "15px 0 0 15px",
                                }}
                                containerStyle={{
                                    width: "100%",
                                    position: "relative",
                                }}
                                inputProps={{
                                    name: "whatsapp",
                                    required: true,
                                    placeholder: "WhatsApp Number",
                                }}
                            />
                            <FormErrorMessage>{errors.whatsapp?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.profession}>
                            <FormLabel>Profession</FormLabel>
                            <StyledInput placeholder="Enter profession" {...register("profession")} />
                            <FormErrorMessage>{errors.profession?.message}</FormErrorMessage>
                        </FormControl>

                        {/* Education Dropdown */}
                        <FormControl isInvalid={!!errors.education}>
                            <FormLabel>Education</FormLabel>
                            <StyledSelect placeholder="Select" {...register("education")}>
                                <option value="High School">High School</option>
                                <option value="Bachelor's Degree">Bachelor's Degree</option>
                                <option value="Master's Degree">Master's Degree</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Certificate">Certificate</option>
                            </StyledSelect>
                            <FormErrorMessage>{errors.education?.message}</FormErrorMessage>
                        </FormControl>

                        {/* Complete Address */}
                        <FormControl isInvalid={!!errors.completeAddress}>
                            <FormLabel>Complete Address</FormLabel>
                            <StyledInput placeholder="Enter complete address" {...register("completeAddress")} />
                            <FormErrorMessage>{errors.completeAddress?.message}</FormErrorMessage>
                        </FormControl>

                        {/* Experties (Tag Input) */}
                        <FormControl isInvalid={!!errors.experties}>
                            <FormLabel>Experties</FormLabel>
                            <StyledInput placeholder="Type and press Enter" onKeyDown={handleExpertiesKeyDown} />
                            <HStack spacing={2} mt={2} wrap="wrap">
                                {experties.map((tag, i) => (
                                    <Tag key={i} size="lg" borderRadius="full" colorScheme="green">
                                        <TagLabel>{tag}</TagLabel>
                                        <TagCloseButton onClick={() => removeExpertise(tag)} />
                                    </Tag>
                                ))}
                            </HStack>
                            <FormErrorMessage>{errors.experties?.message}</FormErrorMessage>
                        </FormControl>

                        {/* Years of Experience */}
                        <FormControl isInvalid={!!errors.yearsOfExperience}>
                            <FormLabel>Years of Experience</FormLabel>
                            <StyledInput type="number" placeholder="Enter years" {...register("yearsOfExperience")} />
                            <FormErrorMessage>{errors.yearsOfExperience?.message}</FormErrorMessage>
                        </FormControl>

                        <Button type="submit" color={"white"} bg="#0a7450" _hover={{ color: "black", bg: "gray.100" }} w="full" size={"lg"} rounded={"15px"} mt={4}>
                            Save
                        </Button>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose} variant="ghost" colorScheme="gray">Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
