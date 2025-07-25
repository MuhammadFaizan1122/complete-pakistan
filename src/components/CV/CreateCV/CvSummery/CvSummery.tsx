import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    VStack,
    FormErrorMessage,
    Text,
    Button,
    HStack,
    Select,
    CheckboxGroup,
    Wrap,
    WrapItem,
    Checkbox,
    Textarea,
    useToast,
    useDisclosure,
    Tag,
    TagLabel,
    TagCloseButton,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../Schema";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import StyledInput from "../../StyledInput";
import { handleUpload } from "../../../../handlers/contentUploading/contentUploading";
import { handleCreateCV } from "../../../../handlers/CV/create-cv";
import EducationPopup from "../EducationPopup";
import { MdAdd } from "react-icons/md";
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
    "ENGLISH", "URDU", "PUNJABI", "SIRAIKI", "BALOCHI", "SINDHI", "PUSHTO",
    "TURKISH", "MEMON", "KATHIAWAR", "MARWARI", "BENGALI", "OTHERS",
];

const SummaryForm = ({ type }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const toast = useToast();
    const [imgPreview, setImgPreview] = useState("");
    const [cvImage, setCvImage] = useState<File | null>(null);
    const [passportCopy, setPassportCopy] = useState<File | null>(null);
    const [isAdding, setIsAdding] = useState(false);

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
            dob: new Date(),
            passport: "",
            passportExpiry: "",
            cnic: "",
            city: "",
            whatsapp: "",
            phone: "",
            backupNumber: "",
            industry: "",
            jobTitle: "",
            education: [],
            technicalEducation: "",
            pakistaniDrivingLicense: "",
            gulfDrivingLicense: "",
            licenseType: "",
            languages: [],
        },
        mode: "onChange",
    });
    const education = watch("education") || [];
    const formValues = watch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        isOpen: isEducationOpen,
        onOpen: onEducationOpen,
        onClose: onEducationClose,
    } = useDisclosure();
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
    const handlePassportImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setPassportCopy(file);
        const reader = new FileReader();
        // reader.onloadend = () => setImgPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const onSubmit = async (data: any) => {
        console.log('working', data)
        if (!session) {
            router.push("/auth/signin");
            return;
        }
        setIsSubmitting(true);
        try {
            const cvResp = cvImage ? await handleUpload(cvImage) : null;
            const cvResp2 = passportCopy ? await handleUpload(passportCopy) : null;
            const cvImageUrl = cvResp?.data?.url || "";
            const passportImageUrl = cvResp2?.data?.url || "";

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
            const finalPayload = {
                ...data,
                photo: cvImageUrl,
                passportCopy: passportImageUrl,
                type,
                // @ts-ignore
                userId: session?.user.id,
            };
            console.log('formData==>', data)
            const response = await handleCreateCV(finalPayload);
            if (response?.status === 201) {
                toast({
                    title: "Submitted",
                    description: "Summary submitted successfully!",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });
                reset();
                setCvImage(null);
                setImgPreview("");
                // router.push("/");
            } else {
                throw new Error(response?.data?.message || "CV creation failed");
            }
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
    const handleTagRemove = (index: number) => {
        const updated = [...education];
        updated.splice(index, 1);
        setValue("education", updated, { shouldValidate: true });
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4} align="stretch" maxW={'1440px'} mx={'auto'} >
                    <Text ml={{ base: 2, sm: 0 }} fontSize="xl" fontWeight="bold">Summary Form</Text>

                    <HStack flexWrap={{ base: 'wrap', sm: 'nowrap' }} spacing={{ base: 2, sm: 4, md: 6 }} align="flex-start" justify="center" px={{ base: 2, sm: 0 }}>
                        <FormControl>
                            <FormLabel>Upload Your Picture (White Background Only)</FormLabel>
                            <StyledInput
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Upload Passport Copy</FormLabel>
                            <StyledInput
                                type="file"
                                accept="application/pdf,image/*"
                                onChange={handlePassportImageChange}
                            />
                        </FormControl>
                        <FormControl isInvalid={!!errors.name}>
                            <FormLabel>Name</FormLabel>
                            <StyledInput
                                placeholder="Enter name"
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
                            <StyledInput
                                placeholder="Enter father name"
                                {...register("fatherName", { required: true })} />
                        </FormControl>
                        <FormControl isInvalid={!!errors.dob}>
                            <FormLabel>Date of Birth</FormLabel>
                            <StyledInput
                                rounded="15px"
                                type="date"
                                max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
                                {...register("dob")}
                            />
                            <FormErrorMessage>{errors.dob?.message}</FormErrorMessage>
                        </FormControl>


                        <FormControl isInvalid={!!errors.passport}>
                            <FormLabel>Passport Number</FormLabel>
                            <StyledInput
                                placeholder="Enter passport number"
                                {...register("passport", { required: true })} />
                            <FormErrorMessage>{errors.passport?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack flexWrap={{ base: 'wrap', sm: 'nowrap' }}
                        spacing={{ base: 2, sm: 4, md: 6 }}
                        align="flex-start"
                        justify="center"
                        px={{ base: 2, sm: 0 }}
                    >
                        <FormControl isInvalid={!!errors.passportExpiry}>
                            <FormLabel>Passport Expiry Date</FormLabel>
                            <StyledInput type="date" {...register("passportExpiry")} />
                            <FormErrorMessage>{errors.passportExpiry?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.cnic}>
                            <FormLabel>CNIC Number</FormLabel>
                            <StyledInput
                                placeholder="Enter CNIC"
                                {...register("cnic", { required: true })} />
                            <FormErrorMessage>{errors.cnic?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.city}>
                            <FormLabel>City</FormLabel>
                            <StyledInput
                                placeholder="Enter city"
                                {...register("city", { required: true })} />
                            <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
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
                            <StyledInput
                                placeholder="Enter whatsapp number"
                                {...register("whatsapp", { required: true })} />
                        </FormControl>

                        <FormControl isInvalid={!!errors.phone}>
                            <FormLabel>Call Number</FormLabel>
                            <StyledInput
                                placeholder="Enter call number"

                                {...register("phone", { required: true })} />
                            <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.phone}>
                            <FormLabel>Backup Contact Number</FormLabel>
                            <StyledInput
                                placeholder="Enter backup contact"
                                {...register("backupNumber")} />
                        </FormControl>
                    </HStack>
                    <HStack flexWrap={{ base: 'wrap', sm: 'nowrap' }}
                        spacing={{ base: 2, sm: 4, md: 6 }}
                        align="flex-start"
                        justify="center"
                        px={{ base: 2, sm: 0 }}
                    >
                        <FormControl isInvalid={!!errors.industry}>
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
                            <FormErrorMessage>{errors.industry?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.jobTitle}>
                            <FormLabel>Applied Position</FormLabel>
                            <StyledInput
                                placeholder="Enter applied position"
                                {...register("jobTitle")} />
                            <FormErrorMessage>{errors.jobTitle?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.education}>
                            <FormLabel className="text-[#2D3748] pl-1 my-2">Education</FormLabel>
                            <HStack
                                border="1px solid"
                                borderColor="gray.300"
                                rounded="15px"
                                bg="white"
                                outline="1px solid"
                                outlineColor="gray.300"
                                px={5}
                                py={3}
                                flexWrap="wrap"
                            >
                                {education.map((edu: any, idx: number) => (
                                    <Tag
                                        key={idx}
                                        bg="#309689"
                                        color="white"
                                        m={1}
                                        rounded="8px"
                                        px={2}
                                    >
                                        <TagLabel>{edu?.institute}</TagLabel>
                                        <TagCloseButton onClick={() => handleTagRemove(idx)} />
                                    </Tag>
                                ))}
                                <Button
                                    onClick={() => { onEducationOpen(), setIsAdding(true) }}
                                    rounded="15px"
                                    border="1px dashed"
                                    borderColor="gray.400"
                                    bg="white"
                                    color="black"
                                    display="flex"
                                    alignItems="center"
                                    gap={2}
                                    isDisabled={isAdding}
                                >
                                    <MdAdd size={24} />
                                    Add
                                </Button>
                            </HStack>
                            <FormErrorMessage>{errors.education?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack flexWrap={{ base: 'wrap', sm: 'nowrap' }}
                        spacing={{ base: 2, sm: 4, md: 6 }}
                        align="flex-start"
                        justify="center"
                        px={{ base: 2, sm: 0 }}
                    >
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
                                placeholder="Select License Type" {...register("pakistaniDrivingLicense")}>
                                <option value="LTV">LTV</option>
                                <option value="HTV">HTV</option>
                            </Select>
                        </FormControl>
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
                                placeholder="Select Country" {...register("gulfDrivingLicense")}>{licenseCountries.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}</Select>
                        </FormControl>
                    </HStack>
                    <HStack flexWrap={{ base: 'wrap', sm: 'nowrap' }}
                        spacing={{ base: 2, sm: 4, md: 6 }}
                        align="flex-start"
                        justify="center"
                        px={{ base: 2, sm: 0 }}
                    >
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

                        <FormControl isInvalid={!!errors.languages}>
                            <FormLabel>Languages</FormLabel>
                            <CheckboxGroup>
                                <Wrap>{languages.map(lang => (
                                    <WrapItem key={lang}>
                                        <Checkbox value={lang} {...register("languages")}>{lang}</Checkbox>
                                    </WrapItem>
                                ))}</Wrap>
                            </CheckboxGroup>
                            <FormErrorMessage>{errors.languages?.message}</FormErrorMessage>
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
            <EducationPopup
                isOpen={isEducationOpen}
                onOpen={onEducationOpen}
                onClose={onEducationClose}
                formData={formValues}
                setFormData={setValue}
                setIsAdding={setIsAdding}
            />
        </>
    );
};

export default SummaryForm;