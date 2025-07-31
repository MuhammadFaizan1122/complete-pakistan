'use client';

import {
    Box, Button, FormControl, FormLabel, Heading, Input, Link, Stack, Text,
    InputGroup, InputRightElement, IconButton, FormErrorMessage, useToast, Select, HStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AuthLayout } from "../Login/Login";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
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
    const router = useRouter();
    const { status } = useSession();
    const toast = useToast();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status, router]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(companySignupSchema),
    });

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
                headOffice: data.headOffice,
                branchOffice: data.branchOffice,
                ptcl: data.ptcl,
                whatsappNo: data.whatsappNo,
                websiteUrl: data.websiteUrl,
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
                        <FormControl isInvalid={!!errors.headOffice} flex="1">
                            <FormLabel>Head Office</FormLabel>
                            <StyledInput
                                type="text"
                                placeholder="Enter head office address"
                                {...register("headOffice")}
                            />
                            <FormErrorMessage>{errors.headOffice?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.branchOffice} flex="1">
                            <FormLabel>Branch Office</FormLabel>
                            <StyledInput
                                type="text"
                                placeholder="Enter branch office address"
                                {...register("branchOffice")}
                            />
                            <FormErrorMessage>{errors.branchOffice?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack spacing={4}>
                        <FormControl isInvalid={!!errors.ptcl} flex="1">
                            <FormLabel>PTCL</FormLabel>
                            <StyledInput
                                type="tel"
                                placeholder="Enter PTCL number"
                                {...register("ptcl")}
                            />
                            <FormErrorMessage>{errors.ptcl?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.whatsappNo} flex="1">
                            <FormLabel>WhatsApp No</FormLabel>
                            <StyledInput
                                type="tel"
                                placeholder="+923001234567"
                                {...register("whatsappNo")}
                            />
                            <FormErrorMessage>{errors.whatsappNo?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack spacing={4}>
                        <FormControl isInvalid={!!errors.websiteUrl} flex="1">
                            <FormLabel>Website URL</FormLabel>
                            <StyledInput
                                type="url"
                                placeholder="https://example.com"
                                {...register("websiteUrl")}
                            />
                            <FormErrorMessage>{errors.websiteUrl?.message}</FormErrorMessage>
                        </FormControl>
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
                    </HStack>
                    <FormControl isInvalid={!!errors.confirmPassword}>
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