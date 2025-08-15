'use client';

import {
    Box, FormControl, FormLabel, Heading, Input, Link, Stack, Text,
    InputGroup, InputRightElement, IconButton, FormErrorMessage, useToast, Select, HStack, Tag, TagLabel, TagCloseButton
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AuthLayout } from "../Login/Login";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { companySignupSchema } from "../../utils/validation";
import { companyRegistration } from "../../handlers/auth/companyRegistration";
import { ChevronDown } from 'lucide-react';
import { handleUpload } from "../../handlers/contentUploading/contentUploading";
import StyledInput from "../CV/StyledInput";
import StyledSelect from "../CV/CvDirectory/StyledSelect";
import StyledButton from "../../utils/StyledButton";

const CompanyRegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [socialLinks, setSocialLinks] = useState([{ platform: 'facebook', url: '' }]);
    const [services, setServices] = useState([]);
    const [serviceInput, setServiceInput] = useState('');
    const router = useRouter();
    const { status } = useSession();
    const toast = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm({
        resolver: yupResolver(companySignupSchema),
        defaultValues: {
            socialMedia: { facebook: '', twitter: '', linkedin: '', instagram: '' },
            services: []
        }
    });

    const addSocialLink = () => {
        const availablePlatforms = ['facebook', 'twitter', 'linkedin', 'instagram'].filter(
            platform => !socialLinks.some(link => link.platform === platform)
        );
        if (availablePlatforms.length > 0) {
            setSocialLinks([...socialLinks, { platform: availablePlatforms[0], url: '' }]);
        } else {
            toast({
                title: 'Limit Reached',
                description: 'You can only add up to 4 social media links.',
                status: 'warning',
                duration: 4000,
                isClosable: true,
            });
        }
    };

    const handleServiceInput = (e) => {
        if (e.key === 'Enter' && serviceInput.trim() && services.length < 5) {
            e.preventDefault();
            const newServices = [...services, serviceInput.trim()];
            setServices(newServices);
            setValue('services', newServices);
            setServiceInput('');
        } else if (e.key === 'Enter' && services.length >= 5) {
            e.preventDefault();
            toast({
                title: 'Limit Reached',
                description: 'You can only add up to 5 services.',
                status: 'warning',
                duration: 4000,
                isClosable: true,
            });
        }
    };

    const removeService = (index) => {
        const newServices = services.filter((_, i) => i !== index);
        setServices(newServices);
        setValue('services', newServices);
    };

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status, router]);

    const onSubmit = async (data) => {
        try {
            const uploadFile = async (file) =>
                file ? (await handleUpload(file))?.data?.url || '' : '';

            const [
                agencyLogoUrl,
                supportingDocumentUrl,
                idFrontUrl,
                idBackUrl,
                coverPhotoUrl,
            ] = await Promise.all([
                uploadFile(data.agencyLogo[0]),
                uploadFile(data.supportingDocument[0]),
                uploadFile(data.contactPersonIdFront[0]),
                uploadFile(data.contactPersonIdBack[0]),
                uploadFile(data.agencyCoverPhoto[0]),
            ]);

            const socialMedia = socialLinks.reduce((acc, { platform, url }) => ({
                ...acc,
                [platform]: url || undefined
            }), {});

            const finalPayload = {
                agencyName: data.agencyName,
                agencyEmail: data.agencyEmail,
                agencyLogo: agencyLogoUrl,
                type: data.type,
                ntn: data.ntn,
                supportingDocument: supportingDocumentUrl,
                contactPersonName: data.contactPersonName,
                contactPersonPhone: data.contactPersonPhone,
                contactPersonIdFront: idFrontUrl,
                contactPersonIdBack: idBackUrl,
                agencyCoverPhoto: coverPhotoUrl,
                password: data.password,
                confirmPassword: data.confirmPassword,
                licenceNo: data.licenceNo,
                proprietorName: data.proprietorName,
                licenceTitle: data.licenceTitle,
                licenceStatus: data.licenceStatus,
                licenceExpiry: data.licenceExpiry,
                address: {
                    country: data.country,
                    state: data.state,
                    city: data.city
                },
                headOffice: data.headOffice,
                branchOffice: data.branchOffice,
                ptcl: data.ptcl,
                whatsappNo: data.whatsappNo,
                websiteUrl: data.websiteUrl,
                services: data.services,
                socialMedia
            };

            const response = await companyRegistration(finalPayload);

            if (response?.status === 201) {
                toast({
                    title: 'Success',
                    description: response.data.message || 'Registration successful',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                router.push("/auth/login");
            } else {
                throw new Error(response?.data?.message || 'Registration failed');
            }
        } catch (error) {
            console.error("Signup error:", error);
            toast({
                title: 'Error',
                description: error?.message || 'An error occurred during registration',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    };

    return (
        <AuthLayout>
            <Box display={'flex'} justifyContent={'center'} w={'full'} mx={'auto'}>
                <Image width={180} height={80} src="/Images/logo.png" alt="CompletePakistan Logo" />
            </Box>
            <Heading fontSize={{ base: "2xl", md: "3xl" }} my={4}>
                Create Agency Account
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4} maxH="60vh" overflowY="scroll" px={2}>
                    <HStack spacing={4}>
                        <FormControl isInvalid={!!errors.agencyName} flex="1">
                            <FormLabel>Agency Name</FormLabel>
                            <StyledInput
                                type="text"
                                placeholder="Enter agency name"
                                {...register("agencyName")}
                            />
                            <FormErrorMessage>{errors.agencyName?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.agencyEmail} flex="1">
                            <FormLabel>Agency Email</FormLabel>
                            <StyledInput
                                type="email"
                                placeholder="Enter agency email"
                                {...register("agencyEmail")}
                            />
                            <FormErrorMessage>{errors.agencyEmail?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack spacing={4}>
                        <FormControl isInvalid={!!errors.agencyLogo} flex="1">
                            <FormLabel>Agency Logo</FormLabel>
                            <StyledInput
                                type="file"
                                accept="image/jpeg,image/png,image/jpg"
                                p={2}
                                h={50}
                                py={3}
                                {...register("agencyLogo")}
                            />
                            <FormErrorMessage>{errors.agencyLogo?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.type} flex="1">
                            <FormLabel>Company Type</FormLabel>
                            <StyledSelect
                                name="type"
                                placeholder="Select"
                                {...register("type")}
                                icon={
                                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                }
                            >
                                <option value="OEP">OEP</option>
                                <option value="TTC">TTC</option>
                                <option value="VTP">VTP</option>
                                <option value="consultancies">Consultancies</option>
                            </StyledSelect>
                            <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack spacing={4}>
                        <FormControl isInvalid={!!errors.ntn} flex="1">
                            <FormLabel>NTN/Tax ID</FormLabel>
                            <StyledInput
                                type="text"
                                placeholder="1234567-8"
                                {...register("ntn")}
                            />
                            <FormErrorMessage>{errors.ntn?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.supportingDocument} flex="1">
                            <FormLabel>Supporting Document</FormLabel>
                            <StyledInput
                                type="file"
                                accept="application/pdf,image/jpeg,image/png"
                                p={2}
                                h={50}
                                py={3}
                                {...register("supportingDocument")}
                            />
                            <FormErrorMessage>{errors.supportingDocument?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack spacing={4}>
                        <FormControl isInvalid={!!errors.contactPersonName} flex="1">
                            <FormLabel>Contact Person Name</FormLabel>
                            <StyledInput
                                type="text"
                                placeholder="Enter contact person name"
                                {...register("contactPersonName")}
                            />
                            <FormErrorMessage>{errors.contactPersonName?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.contactPersonPhone} flex="1">
                            <FormLabel>Contact Person Phone</FormLabel>
                            <StyledInput
                                type="tel"
                                placeholder="+923001234567"
                                {...register("contactPersonPhone")}
                            />
                            <FormErrorMessage>{errors.contactPersonPhone?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack spacing={4}>
                        <FormControl isInvalid={!!errors.contactPersonIdFront} flex="1">
                            <FormLabel>Contact Person ID (Front)</FormLabel>
                            <StyledInput
                                type="file"
                                accept="image/jpeg,image/png,image/jpg"
                                rounded={'14px'}
                                p={2}
                                h={50}
                                py={3}
                                {...register("contactPersonIdFront")}
                            />
                            <FormErrorMessage>{errors.contactPersonIdFront?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.contactPersonIdBack} flex="1">
                            <FormLabel>Contact Person ID (Back)</FormLabel>
                            <StyledInput
                                type="file"
                                accept="image/jpeg,image/png,image/jpg"
                                rounded={'14px'}
                                h={50}
                                p={2}
                                py={3}
                                {...register("contactPersonIdBack")}
                            />
                            <FormErrorMessage>{errors.contactPersonIdBack?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack spacing={4}>
                        <FormControl isInvalid={!!errors.agencyCoverPhoto} flex="1">
                            <FormLabel>Agency Cover Photo</FormLabel>
                            <StyledInput
                                type="file"
                                accept="image/jpeg,image/png,image/jpg"
                                rounded={'14px'}
                                h={50}
                                p={2}
                                py={3}
                                {...register("agencyCoverPhoto")}
                            />
                            <FormErrorMessage>{errors.agencyCoverPhoto?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.licenceNo} flex="1">
                            <FormLabel>Licence No</FormLabel>
                            <StyledInput
                                type="text"
                                placeholder="Enter licence number"
                                {...register("licenceNo")}
                            />
                            <FormErrorMessage>{errors.licenceNo?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack spacing={4}>
                        <FormControl isInvalid={!!errors.proprietorName} flex="1">
                            <FormLabel>Proprietor Name</FormLabel>
                            <StyledInput
                                type="text"
                                placeholder="Enter proprietor name"
                                {...register("proprietorName")}
                            />
                            <FormErrorMessage>{errors.proprietorName?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.licenceTitle} flex="1">
                            <FormLabel>Licence Title</FormLabel>
                            <StyledInput
                                type="text"
                                placeholder="Enter licence title"
                                {...register("licenceTitle")}
                            />
                            <FormErrorMessage>{errors.licenceTitle?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack spacing={4}>
                        <FormControl isInvalid={!!errors.licenceStatus} flex="1">
                            <FormLabel>Licence Status</FormLabel>
                            <StyledSelect
                                name="licenceStatus"
                                placeholder="Select"
                                {...register("licenceStatus")}
                                icon={
                                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                }
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="suspended">Suspended</option>
                            </StyledSelect>
                            <FormErrorMessage>{errors.licenceStatus?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.licenceExpiry} flex="1">
                            <FormLabel>Licence Expiry</FormLabel>
                            <StyledInput
                                type="date"
                                {...register("licenceExpiry")}
                            />
                            <FormErrorMessage>{errors.licenceExpiry?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack spacing={4}>
                        <FormControl isInvalid={!!errors.country} flex="1">
                            <FormLabel>Country</FormLabel>
                            <StyledInput
                                type="text"
                                placeholder="Enter country"
                                {...register("country")}
                            />
                            <FormErrorMessage>{errors.country?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.state} flex="1">
                            <FormLabel>State</FormLabel>
                            <StyledInput
                                type="text"
                                placeholder="Enter state"
                                {...register("state")}
                            />
                            <FormErrorMessage>{errors.state?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack spacing={4}>
                        <FormControl isInvalid={!!errors.city} flex="1">
                            <FormLabel>City</FormLabel>
                            <StyledInput
                                type="text"
                                placeholder="Enter city"
                                {...register("city")}
                            />
                            <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.headOffice} flex="1">
                            <FormLabel>Head Office</FormLabel>
                            <StyledInput
                                type="text"
                                placeholder="Enter head office address"
                                {...register("headOffice")}
                            />
                            <FormErrorMessage>{errors.headOffice?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack spacing={4}>
                        <FormControl isInvalid={!!errors.branchOffice} flex="1">
                            <FormLabel>Branch Office</FormLabel>
                            <StyledInput
                                type="text"
                                placeholder="Enter branch office address"
                                {...register("branchOffice")}
                            />
                            <FormErrorMessage>{errors.branchOffice?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.ptcl} flex="1">
                            <FormLabel>PTCL</FormLabel>
                            <StyledInput
                                type="tel"
                                placeholder="Enter PTCL number"
                                {...register("ptcl")}
                            />
                            <FormErrorMessage>{errors.ptcl?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack spacing={4}>
                        <FormControl isInvalid={!!errors.whatsappNo} flex="1">
                            <FormLabel>WhatsApp No</FormLabel>
                            <StyledInput
                                type="tel"
                                placeholder="+923001234567"
                                {...register("whatsappNo")}
                            />
                            <FormErrorMessage>{errors.whatsappNo?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.websiteUrl} flex="1">
                            <FormLabel>Website URL</FormLabel>
                            <StyledInput
                                type="url"
                                placeholder="https://example.com"
                                {...register("websiteUrl")}
                            />
                            <FormErrorMessage>{errors.websiteUrl?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack>

                        <FormControl isInvalid={!!errors.services}>
                            <FormLabel>Services (Press Enter to add, max 5)</FormLabel>
                            <StyledInput
                                type="text"
                                placeholder="Type a service and press Enter"
                                value={serviceInput}
                                onChange={(e) => setServiceInput(e.target.value)}
                                onKeyDown={handleServiceInput}
                            />
                            <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
                                {services.map((service, index) => (
                                    <Tag
                                        key={index}
                                        size="lg"
                                        borderRadius="full"
                                        variant="solid"
                                        colorScheme="blue"
                                    >
                                        <TagLabel>{service}</TagLabel>
                                        <TagCloseButton onClick={() => removeService(index)} />
                                    </Tag>
                                ))}
                            </Box>
                            <FormErrorMessage>{errors.services?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.mapLink}>
                            <FormLabel>Map Link</FormLabel>
                            <StyledInput
                                type="text"
                                placeholder="Enter location map link"
                                value={serviceInput}
                                {...register("mapLink")}
                                // onChange={(e) => setServiceInput(e.target.value)}
                            />
                            
                            <FormErrorMessage>{errors.mapLink?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <Box>
                        <Text fontWeight="medium" mb={2}>Social Media Links</Text>
                        {socialLinks.map((link, index) => (
                            <HStack key={index} spacing={4} mb={2} alignItems="center">
                                <FormControl flex="1">
                                    <StyledSelect
                                        value={link.platform}
                                        onChange={(e) => {
                                            const newLinks = [...socialLinks];
                                            newLinks[index].platform = e.target.value;
                                            setSocialLinks(newLinks);
                                        }}
                                        icon={
                                            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        }
                                    >
                                        {['facebook', 'twitter', 'linkedin', 'instagram'].map(platform => (
                                            <option key={platform} value={platform} disabled={socialLinks.some(l => l.platform === platform && l.platform !== link.platform)}>
                                                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                            </option>
                                        ))}
                                    </StyledSelect>
                                </FormControl>
                                <FormControl isInvalid={!!errors.socialMedia?.[link.platform]} flex="2">
                                    <StyledInput
                                        type="url"
                                        placeholder={`Enter ${link.platform} URL`}
                                        value={link.url}
                                        onChange={(e) => {
                                            const newLinks = [...socialLinks];
                                            newLinks[index].url = e.target.value;
                                            setSocialLinks(newLinks);
                                            setValue(`socialMedia.${link.platform}`, e.target.value);
                                        }}
                                    />
                                    <FormErrorMessage>{errors.socialMedia?.[link.platform]?.message}</FormErrorMessage>
                                </FormControl>
                                <StyledButton
                                    type="button"
                                    onClick={() => {
                                        const newLinks = socialLinks.filter((_, i) => i !== index);
                                        setSocialLinks(newLinks);
                                        setValue('socialMedia', newLinks.reduce((acc, { platform, url }) => ({ ...acc, [platform]: url }), {}));
                                    }}
                                    w={'10%'}
                                    title={<FaTrash />}
                                    bg="red.600"
                                    hoverBg="red.700"
                                    px={3}
                                    py={4}
                                />
                            </HStack>
                        ))}
                        <StyledButton
                            type="button"
                            onClick={addSocialLink}
                            title="Add Social Page"
                            bg="secondary"
                            color={'gray'}
                            borderColor={'gray.300'}
                            mt={2}
                        />
                    </Box>
                    <HStack spacing={4}>
                        <FormControl isInvalid={!!errors.password} flex="1">
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <StyledInput
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    {...register("password")}
                                />
                                <InputRightElement h="full">
                                    <IconButton
                                        variant="ghost"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        icon={showPassword ? <FiEyeOff /> : <FiEye />}
                                    />
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.confirmPassword} flex="1">
                            <FormLabel>Confirm Password</FormLabel>
                            <InputGroup>
                                <StyledInput
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm password"
                                    {...register("confirmPassword")}
                                />
                                <InputRightElement h="full">
                                    <IconButton
                                        variant="ghost"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        icon={showPassword ? <FiEyeOff /> : <FiEye />}
                                    />
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <Box>
                        <StyledButton
                            type="submit"
                            isLoading={isSubmitting}
                            title="Create Account"
                        />
                        <Text fontSize="sm" textAlign="center" mt={2}>
                            Already have an account?{' '}
                            <NextLink href="/auth/login" passHref>
                                <Link color="#0a7450">Login</Link>
                            </NextLink>
                        </Text>
                    </Box>
                </Stack>
            </form>
        </AuthLayout>
    );
};

export default CompanyRegisterPage;