import React, { useRef, useState } from "react";
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
    useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../Schema";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SummarySchema } from "../SummarySchema";

const industries = ["Construction", "IT", "Healthcare", "Engineering", "Hospitality", "Logistics", "Others"];
const licenseCountries = ["Saudi", "UAE", "Bahrain", "Kuwait", "Iraq", "Iran", "Qatar", "Oman", "Others"];
const licenseTypes = [
    "SAIQ KHAS",
    "NAQAL KHAFEEF",
    "NAQAL SAQEEL",
    "HTV",
    "LTV",
    "HEAVY MACHINERY LICENSE",
    "TOWER CRANE OPERATOR",
    "OTHERS",
];
const languages = [
    "ENGLISH", "URDU", "PUNJABI", "SIRAIKI", "BALOCHI", "HINDI", "PUSHTO",
    "TURKISH", "MEMON", "KATHIAWAR", "MARWARI", "BENGALI", "OTHERS",
];

const SummaryForm = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const toast = useToast();
    const [imgPreview, setImgPreview] = useState("");
    const [cvImage, setCvImage] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(SummarySchema),
        defaultValues: {
            name: "",
            fatherName: "",
            birthYear: undefined,
            birthMonth: "",
            passport: "",
            passportExpiryMonth: "",
            passportExpiryYear: undefined,
            cnic: "",
            city: "",
            whatsapp: "",
            phone: "",
            backupNumber: "",
            bestCallbackTime: "",
            industry: "",
            appliedPosition: "",
            education: "",
            technicalEducation: "",
            localLicense: "",
            licenseCountry: "",
            licenseType: "",
            languages: [],
            saudiExp: "",
            uaeExp: "",
            gulfExp: "",
            cvImage: null,
            passportCopy: null,
        },
        mode: "onChange",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) {
            toast({
                title: "Invalid file type",
                description: "Only JPG, PNG, and WEBP files are allowed.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            return;
        }
        setCvImage(file);
        const reader = new FileReader();
        reader.onloadend = () => setImgPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const onSubmit = async (data: any) => {
        if (!session) {
            router.push("/auth/signin");
            return;
        }
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (key === "cvImage" || key === "passportCopy") return;
                if (Array.isArray(data[key])) {
                    formData.append(key, JSON.stringify(data[key]));
                } else {
                    formData.append(key, data[key]);
                }
            });
            if (data.cvImage && data.cvImage[0]) {
                formData.append("cvImage", data.cvImage[0]);
            }
            if (data.passportCopy && data.passportCopy[0]) {
                formData.append("passportCopy", data.passportCopy[0]);
            }
            if (session?.user) {
                // @ts-ignore
                formData.append("userId", session.user.id || session.user.email);
            }
            console.log('formData==>', data)
            // const response = await fetch("/api/submit-summary", {
            //     method: "POST",
            //     body: formData,
            // });

            // if (!response.ok) {
            //     throw new Error("Failed to submit form");
            // }

            toast({
                title: "Submitted",
                description: "Summary submitted successfully!",
                status: "success",
                duration: 4000,
                isClosable: true,
            });

            // reset();
            // setImgPreview("");
            // router.push("/success");
        } catch (error) {
            console.error("Submission error:", error);
            toast({
                title: "Error",
                description: "Failed to submit summary. Please try again.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4} align="stretch" maxW={'1440px'} mx={'auto'} >
                <Text ml={{ base: 2, sm: 0 }} fontSize="xl" fontWeight="bold">Summary Form</Text>

                <HStack flexWrap={{ base: 'wrap', sm: 'nowrap' }} spacing={{ base: 2, sm: 4, md: 6 }} align="flex-start" justify="center" px={{ base: 2, sm: 0 }}>
                    <FormControl isInvalid={!!errors.cvImage}>
                        <FormLabel>Upload Your Picture (White Background Only)</FormLabel>
                        <Input
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
                            type="file"
                            accept="image/*"
                            {...register("cvImage", { required: true })}
                            onChange={handleImageChange}
                        />
                        <FormErrorMessage>{errors.cvImage?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.passportCopy}>
                        <FormLabel>Upload Passport Copy</FormLabel>
                        <Input
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
                            type="file"
                            accept="application/pdf,image/*"
                            {...register("passportCopy", { required: true })}
                        />
                        <FormErrorMessage>{errors.passportCopy?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.name}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            placeholder="Enter name"
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
                            {...register("name", { required: true })}
                        />
                        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                    </FormControl>
                </HStack>
                <HStack flexWrap={{ base: 'wrap', sm: 'nowrap' }}
                    spacing={{ base: 2, sm: 4, md: 6 }}
                    align="flex-start"
                    justify="center"
                    px={{ base: 2, sm: 0 }}
                >
                    <FormControl isInvalid={!!errors.fatherName}>
                        <FormLabel>Father Name</FormLabel>
                        <Input
                            placeholder="Enter father name"
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
                            {...register("fatherName", { required: true })} />
                    </FormControl>
                    <FormControl isInvalid={!!errors.birthYear}>
                        <FormLabel>Birth Year</FormLabel>
                        <Input
                            placeholder="Enter birth year"
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
                            type="number" {...register("birthYear", { required: true })} />
                    </FormControl>
                    <FormControl isInvalid={!!errors.birthMonth}>
                        <FormLabel>Birth Month</FormLabel>
                        <Input
                            placeholder="Enter birth month"
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
                            type="text" {...register("birthMonth", { required: true })} />
                    </FormControl>
                </HStack>
                <HStack flexWrap={{ base: 'wrap', sm: 'nowrap' }}
                    spacing={{ base: 2, sm: 4, md: 6 }}
                    align="flex-start"
                    justify="center"
                    px={{ base: 2, sm: 0 }}
                >

                    <FormControl isInvalid={!!errors.passport}>
                        <FormLabel>Passport Number</FormLabel>
                        <Input
                            placeholder="Enter passport number"
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
                            {...register("passport", { required: true })} />
                    </FormControl>

                    <FormControl isInvalid={!!errors.cnic}>
                        <FormLabel>CNIC Number</FormLabel>
                        <Input
                            placeholder="Enter CNIC number"
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
                            {...register("cnic", { required: true })} />
                    </FormControl>

                    <FormControl isInvalid={!!errors.city}>
                        <FormLabel>City</FormLabel>
                        <Input
                            placeholder="Enter city"
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
                            {...register("city", { required: true })} />
                    </FormControl>
                </HStack>
                <HStack flexWrap={{ base: 'wrap', sm: 'nowrap' }}
                    spacing={{ base: 2, sm: 4, md: 6 }}
                    align="flex-start"
                    justify="center"
                    px={{ base: 2, sm: 0 }}
                >

                    <FormControl isInvalid={!!errors.whatsapp}>
                        <FormLabel>WhatsApp Number</FormLabel>
                        <Input
                            placeholder="Enter whatsapp number"
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
                            {...register("whatsapp", { required: true })} />
                    </FormControl>

                    <FormControl isInvalid={!!errors.phone}>
                        <FormLabel>Call Number</FormLabel>
                        <Input
                            placeholder="Enter call number"
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
                            {...register("phone", { required: true })} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Backup Contact Number</FormLabel>
                        <Input
                            placeholder="Enter backup contact"
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
                            {...register("backupNumber")} />
                    </FormControl>
                </HStack>
                <HStack flexWrap={{ base: 'wrap', sm: 'nowrap' }}
                    spacing={{ base: 2, sm: 4, md: 6 }}
                    align="flex-start"
                    justify="center"
                    px={{ base: 2, sm: 0 }}
                >

                    <FormControl>
                        <FormLabel>Best Time for Official Call Back</FormLabel>
                        <Input
                            placeholder="Enter time"
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
                            {...register("bestCallbackTime")} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Select Industry</FormLabel>
                        <Select
                            h="50px"
                            border="1px solid"
                            borderColor="gray.300"
                            borderRadius="15px"
                            bg="white"
                            outline="1px solid"
                            outlineColor="gray.300"
                            _focus={{
                                ring: 2,
                                ringColor: "#309689",
                                borderColor: "transparent",
                                outline: "none"
                            }}
                            _active={{
                                outline: "none"
                            }}
                            transition="all 0.2s"
                            placeholder="Select Industry" {...register("industry")}>{industries.map(ind => (
                                <option key={ind} value={ind}>{ind}</option>
                            ))}</Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Applied Position</FormLabel>
                        <Input
                            placeholder="Enter applied position"
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
                            {...register("appliedPosition")} />
                    </FormControl>
                </HStack>
                <HStack flexWrap={{ base: 'wrap', sm: 'nowrap' }}
                    spacing={{ base: 2, sm: 4, md: 6 }}
                    align="flex-start"
                    justify="center"
                    px={{ base: 2, sm: 0 }}
                >

                    <FormControl>
                        <FormLabel>Education</FormLabel>
                        <Input
                            placeholder="Enter education"
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
                            {...register("education")} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Technical Education</FormLabel>
                        <Textarea
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
                            {...register("technicalEducation")}
                            placeholder="e.g. Diploma 6 month, BE Civil..." />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Driving License (Pakistani)</FormLabel>
                        <Select
                            h="50px"
                            border="1px solid"
                            borderColor="gray.300"
                            borderRadius="15px"
                            bg="white"
                            outline="1px solid"
                            outlineColor="gray.300"
                            _focus={{
                                ring: 2,
                                ringColor: "#309689",
                                borderColor: "transparent",
                                outline: "none"
                            }}
                            _active={{
                                outline: "none"
                            }}
                            transition="all 0.2s"
                            placeholder="Select License Type" {...register("localLicense")}>
                            <option value="LTV">LTV</option>
                            <option value="HTV">HTV</option>
                        </Select>
                    </FormControl>
                </HStack>
                <HStack flexWrap={{ base: 'wrap', sm: 'nowrap' }}
                    spacing={{ base: 2, sm: 4, md: 6 }}
                    align="flex-start"
                    justify="center"
                    px={{ base: 2, sm: 0 }}
                >

                    <FormControl>
                        <FormLabel>Gulf Driving License</FormLabel>
                        <Select
                            h="50px"
                            border="1px solid"
                            borderColor="gray.300"
                            borderRadius="15px"
                            bg="white"
                            outline="1px solid"
                            outlineColor="gray.300"
                            _focus={{
                                ring: 2,
                                ringColor: "#309689",
                                borderColor: "transparent",
                                outline: "none"
                            }}
                            _active={{
                                outline: "none"
                            }}
                            transition="all 0.2s"
                            placeholder="Select Country" {...register("licenseCountry")}>{licenseCountries.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}</Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Type of License</FormLabel>
                        <Select
                            h="50px"
                            border="1px solid"
                            borderColor="gray.300"
                            borderRadius="15px"
                            bg="white"
                            outline="1px solid"
                            outlineColor="gray.300"
                            _focus={{
                                ring: 2,
                                ringColor: "#309689",
                                borderColor: "transparent",
                                outline: "none"
                            }}
                            _active={{
                                outline: "none"
                            }}
                            transition="all 0.2s"
                            placeholder="Select Type" {...register("licenseType")}>{licenseTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}</Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Languages</FormLabel>
                        <CheckboxGroup>
                            <Wrap>{languages.map(lang => (
                                <WrapItem key={lang}>
                                    <Checkbox value={lang} {...register("languages")}>{lang}</Checkbox>
                                </WrapItem>
                            ))}</Wrap>
                        </CheckboxGroup>
                    </FormControl>
                </HStack>
                <HStack flexWrap={{ base: 'wrap', sm: 'nowrap' }}
                    spacing={{ base: 2, sm: 4, md: 6 }}
                    align="flex-start"
                    justify="center"
                    px={{ base: 2, sm: 0 }}
                >

                    <FormControl>
                        <FormLabel>Saudi Experience</FormLabel>
                        <Input
                            placeholder="Enter saudi experience"
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
                            {...register("saudiExp")} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>UAE Experience</FormLabel>
                        <Input
                            placeholder="Enter UAE experience"
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
                            {...register("uaeExp")} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Gulf Experience</FormLabel>
                        <Input
                            placeholder="Enter gulf experience"
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
                            {...register("gulfExp")} />
                    </FormControl>
                </HStack>

                <HStack flexWrap={{ base: 'wrap', sm: 'nowrap' }}
                    spacing={{ base: 2, sm: 4, md: 6 }}
                    align="flex-start"
                    justify="center"
                    px={{ base: 2, sm: 0 }}
                >
                    <FormControl>
                        <FormLabel>Passport Expiry Month</FormLabel>
                        <Input
                            placeholder="Enter passport expiry month"
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
                            type="text" {...register("passportExpiryMonth")} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Passport Expiry Year</FormLabel>
                        <Input
                            placeholder="Enter passport expiry year"
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
                            type="number" {...register("passportExpiryYear")} />
                    </FormControl>
                </HStack>

                <Button type="submit"
                    mt={4}
                    bg="#309689"
                    color="white"
                    rounded="15px"
                    px={6}
                    py={6}
                    mx={{ base: 2, sm: 0 }}
                    _hover={{ bg: "#28796f" }}
                >Submit Summary</Button>
            </VStack>
        </form>
    );
};

export default SummaryForm;