"use client";
import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Flex,
    Button,
    Heading,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    useToast,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Preview from "./Preview";
import PersonalInfoForm from "./PersonalInfoForm";
import ContactInfoForm from "./ContactInfoForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import SkillsForm from "./SkillsForm";
import JobDetailsForm from "./JobDetailsForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./Schema";
import EmploymentPopup from "./EmploymentPopup";
import EducationPopup from "./EducationPopup";
import SkillPopup from "./SkillPopup";
import { handleCreateCV } from "../../../handlers/CV/create-cv";
import { handleUpload } from "../../../handlers/contentUploading/contentUploading";
import FileUpload from './FileUploading'
export default function CreateCVPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const toast = useToast();
    const previewRef = useRef(null);
    const [imgPreview, setImgPreview] = useState("");
    const [cvImage, setCvImage] = useState<File | null>(null);
    const [resetUploads, setResetUploads] = useState(false);

    const {
        isOpen: isEmploymentOpen,
        onOpen: onEmploymentOpen,
        onClose: onEmploymentClose,
    } = useDisclosure();
    const {
        isOpen: isEducationOpen,
        onOpen: onEducationOpen,
        onClose: onEducationClose,
    } = useDisclosure();
    const {
        isOpen: isSkillOpen,
        onOpen: onSkillOpen,
        onClose: onSkillClose,
    } = useDisclosure();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            objective:'Motivated and detail-oriented professional seeking a challenging position in a dynamic organization where I can utilize my skills, grow professionally, and contribute to achieving company goals. Committed to delivering high-quality results through strong work ethic, adaptability, and continuous learning.',
            fatherName: "",
            passport: "",
            cnic: "",
            dob: new Date(),
            livingcity: "",
            village: "",
            gender: "",
            passportIssue: "",
            passportExpiry: "",
            languages: [],
            countriesVisited: [],
            yearsOfExperience: '',
            email: "",
            phone: "",
            whatsapp: "",
            otherNumber: "",
            backupNumber: "",
            backupEmail: "",
            country: "",
            state: "",
            city: "",
            localAddress: "",
            education: [],
            experience: [],
            skills: [],
            jobTitle: "",
            industry: "",
            category: "",
            subcategory: "",
            jobDetails: "",
            attachments: [],
        },
        mode: "onChange",
    });

    const formValues = watch();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

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
        reader.onloadend = () => {
            setImgPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = async (data: any) => {
        try {
            console.log('working')
            const cvResp = cvImage ? await handleUpload(cvImage) : null;
            console.log('cvResp', cvResp)
            const cvImageUrl = cvResp?.data?.url || "";
            const uploadedAttachmentUrls = [];
            for (const file of data.attachments || []) {
                const res = await handleUpload(file);
                if (res?.data?.url) uploadedAttachmentUrls.push(res.data.url);
            }
            console.log('working2')

            const finalPayload = {
                ...data,
                photo: cvImageUrl,
                attachments: uploadedAttachmentUrls,
                // @ts-ignore
                userId: session?.user.id,
            };
            console.log('working3')

            const response = await handleCreateCV(finalPayload);
            console.log('working4')
            if (response?.status === 201) {
                toast({
                    title: "Success",
                    description: "Your CV has been created successfully.",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });
                reset();
                setCvImage(null);
                setImgPreview("");
                setResetUploads(true);
                setTimeout(() => setResetUploads(false), 100);
            } else {
                throw new Error(response?.data?.message || "CV creation failed");
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Something went wrong while submitting your CV.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    const downloadPDF = async () => {
        const element = previewRef.current;
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
            });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: "a4",
            });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const scaledWidth = imgWidth * ratio;
            const scaledHeight = imgHeight * ratio;

            pdf.addImage(imgData, "PNG", 0, 0, scaledWidth, scaledHeight);
            pdf.save("resume.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4} align="stretch" bg="#D3EFEC" p={8}>
                <Flex
                    direction={{ base: "column", md: "row" }}
                    gap={4}
                    maxW="1440px"
                    mx="auto"
                    w="full"
                >
                    <Box
                        w={{ base: "100%", md: "40%" }}
                        bg="white"
                        p={4}
                        rounded="15px"
                        shadow="md"
                        maxH="120vh"
                        overflowY="auto"
                        sx={{
                            "&::-webkit-scrollbar": { width: "8px" },
                            "&::-webkit-scrollbar-track": { bg: "#EEEEEE4D", rounded: "8px" },
                            "&::-webkit-scrollbar-thumb": { bg: "#fff", rounded: "8px" },
                            "&::-webkit-scrollbar-thumb:hover": { bg: "#2C7A7B", rounded: "8px" },
                            scrollbarWidth: "thin",
                            scrollbarColor: "#fff #EEEEEE4D",
                        }}
                    >
                        <Tabs variant="unstyled">
                            <TabList
                                borderBottom="1px solid"
                                borderColor="gray.200"
                                overflowX="auto"
                                sx={{
                                    "&::-webkit-scrollbar": { height: "4px" },
                                    "&::-webkit-scrollbar-track": { bg: "#EEEEEE4D" },
                                    "&::-webkit-scrollbar-thumb": { bg: "#309689" },
                                }}
                            >
                                <Tab
                                    fontSize="sm"
                                    px={3}
                                    py={2}
                                    _selected={{ borderBottom: "2px solid", borderColor: "#309689", color: "#309689", fontWeight: "bold" }}
                                >
                                    Personal
                                </Tab>
                                <Tab
                                    fontSize="sm"
                                    px={3}
                                    py={2}
                                    _selected={{ borderBottom: "2px solid", borderColor: "#309689", color: "#309689", fontWeight: "bold" }}
                                >
                                    Contact
                                </Tab>
                                <Tab
                                    fontSize="sm"
                                    px={3}
                                    py={2}
                                    _selected={{ borderBottom: "2px solid", borderColor: "#309689", color: "#309689", fontWeight: "bold" }}
                                >
                                    Education
                                </Tab>
                                <Tab
                                    fontSize="sm"
                                    px={3}
                                    py={2}
                                    _selected={{ borderBottom: "2px solid", borderColor: "#309689", color: "#309689", fontWeight: "bold" }}
                                >
                                    Experience
                                </Tab>
                                <Tab
                                    fontSize="sm"
                                    px={3}
                                    py={2}
                                    _selected={{ borderBottom: "2px solid", borderColor: "#309689", color: "#309689", fontWeight: "bold" }}
                                >
                                    Skills
                                </Tab>
                                <Tab
                                    fontSize="sm"
                                    px={3}
                                    py={2}
                                    _selected={{ borderBottom: "2px solid", borderColor: "#309689", color: "#309689", fontWeight: "bold" }}
                                >
                                    Job Details
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel p={0} pt={4}>
                                    <PersonalInfoForm
                                        register={register}
                                        setValue={setValue}
                                        watch={watch}
                                        errors={errors}
                                        handleImageChange={handleImageChange}
                                        imgPreview={imgPreview}
                                    />
                                </TabPanel>
                                <TabPanel p={0} pt={4}>
                                    <ContactInfoForm register={register} setValue={setValue} watch={watch} errors={errors} />
                                </TabPanel>
                                <TabPanel p={0} pt={4}>
                                    <EducationForm
                                        register={register}
                                        setValue={setValue}
                                        watch={watch}
                                        errors={errors}
                                        onEducationOpen={onEducationOpen}
                                    />
                                </TabPanel>
                                <TabPanel p={0} pt={4}>
                                    <ExperienceForm
                                        register={register}
                                        setValue={setValue}
                                        watch={watch}
                                        errors={errors}
                                        onEmploymentOpen={onEmploymentOpen}
                                    />
                                </TabPanel>
                                <TabPanel p={0} pt={4}>
                                    <SkillsForm
                                        register={register}
                                        setValue={setValue}
                                        watch={watch}
                                        errors={errors}
                                        onSkillOpen={onSkillOpen}
                                    />
                                </TabPanel>
                                <TabPanel p={0} pt={4}>
                                    <JobDetailsForm
                                        register={register}
                                        setValue={setValue}
                                        watch={watch}
                                        errors={errors}
                                        //  @ts-ignore 
                                        setUserIndustry={(val: string) => setValue("industry", val)}
                                        //  @ts-ignore 
                                        setUserCategory={(val: string) => setValue("category", val)}
                                        //  @ts-ignore 
                                        setUserSubCategory={(val: string) => setValue("subcategory", val)}
                                    />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                        {/* <FileUpload setFormData={setValue} formData={formValues} resetTrigger={resetUploads} /> */}
                        <Button
                            type="submit"
                            mt={4}
                            bg="#309689"
                            color="white"
                            rounded="15px"
                            px={6}
                            py={6}
                            _hover={{ bg: "#28796f" }}
                        >
                            Submit CV
                        </Button>
                        <Button
                            onClick={downloadPDF}
                            mt={4}
                            bg="#309689"
                            color="white"
                            rounded="15px"
                            px={6}
                            py={6}
                            _hover={{ bg: "#28796f" }}
                        >
                            Download CV
                        </Button>
                    </Box>
                    <Box
                        w={{ base: "100%", md: "60%" }}
                        bg="white"
                        rounded="12px"
                        shadow="md"
                        ref={previewRef}
                        p={4}
                        maxH="120vh"
                        overflowY="auto"
                        sx={{
                            "&::-webkit-scrollbar": { width: "8px" },
                            "&::-webkit-scrollbar-track": { bg: "#EEEEEE4D", rounded: "8px" },
                            "&::-webkit-scrollbar-thumb": { bg: "#fff", rounded: "8px" },
                            "&::-webkit-scrollbar-thumb:hover": { bg: "#2C7A7B", rounded: "8px" },
                            scrollbarWidth: "thin",
                            scrollbarColor: "#fff #EEEEEE4D",
                        }}
                    >
                        <Preview formData={formValues} imgPreview={imgPreview} watch={watch} />
                    </Box>
                </Flex>
                {/* @ts-ignore  */}
                <EmploymentPopup
                    isOpen={isEmploymentOpen}
                    onClose={onEmploymentClose}
                    formData={formValues}
                    setFormData={setValue}
                />
                {/* @ts-ignore  */}
                <EducationPopup
                    isOpen={isEducationOpen}
                    onClose={onEducationClose}
                    formData={formValues}
                    setFormData={setValue}
                />
                <SkillPopup
                    isOpen={isSkillOpen}
                    onClose={onSkillClose}
                    formData={formValues}
                    setFormData={setValue}
                    // @ts-ignore  
                    handleTagAdd={(value: string) => setValue("skills", [...formValues.skills, value.trim()])}
                />
            </VStack>
        </form>
    );
}