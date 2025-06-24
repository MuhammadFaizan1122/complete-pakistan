'use client'
import {
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
    InputGroup,
    InputRightElement,
    IconButton,
    FormErrorMessage,
    Box,
    Image as ChakraImage,
    useToast,
    Select
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
// import { handleRegister } from "../../handlers/auth/registration";
import { companySignupSchema } from "../../utils/validation";
import { companyRegistration } from "../../handlers/auth/companyRegistration";
import { ChevronDown } from 'lucide-react';
import { handleUpload } from "../../handlers/contentUploading/contentUploading";


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
            // Upload all files and get URLs
            const uploadFile = async (file) =>
                file ? (await handleUpload(file))?.data?.url || '' : '';

            const [
                agencyLogoUrl,
                supportingDocumentUrl,
                idFrontUrl,
                idBackUrl,
                coverPhotoUrl
            ] = await Promise.all([
                uploadFile(data.agencyLogo[0]),
                uploadFile(data.supportingDocument[0]),
                uploadFile(data.contactPersonIdFront[0]),
                uploadFile(data.contactPersonIdBack[0]),
                uploadFile(data.agencyCoverPhoto[0])
            ]);
            console.log('agencyLogoUrl', agencyLogoUrl)
            console.log('supportingDocumentUrl', supportingDocumentUrl)
            console.log('idFrontUrl', idFrontUrl)
            console.log('idBackUrl', idBackUrl)
            console.log('coverPhotoUrl', coverPhotoUrl)
            // Build final JSON payload
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
                confirmPassword: data.confirmPassword
            };

            // Send to API
            // console.log('finalPayload', finalPayload)
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
                Create a company account
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4} maxH="50vh" overflowY="scroll">
                    <FormControl isInvalid={!!errors.agencyName} px={2}>
                        <FormLabel>Agency Name</FormLabel>
                        <Input
                            type="text"
                            placeholder="Enter agency name"
                            rounded={'14px'}
                            p={4}
                            py={6}
                            {...register("agencyName")}
                            _focus={{
                                ring: 2,
                                ringColor: "#309689",
                                borderColor: "transparent",
                                outline: "none"
                            }}
                        />
                        <FormErrorMessage>{errors.agencyName?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.agencyEmail} px={2}>
                        <FormLabel>Agency Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="Enter agency email"
                            rounded={'14px'}
                            p={4}
                            py={6}
                            {...register("agencyEmail")}
                            _focus={{
                                ring: 2,
                                ringColor: "#309689",
                                borderColor: "transparent",
                                outline: "none"
                            }}
                        />
                        <FormErrorMessage>{errors.agencyEmail?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.agencyLogo} px={2}>
                        <FormLabel>Agency Logo</FormLabel>
                        <Input
                            type="file"
                            accept="image/jpeg,image/png,image/jpg"
                            rounded={'14px'}
                            p={2}
                            h={50}
                            py={3}
                            {...register("agencyLogo")}
                        />
                        <FormErrorMessage>{errors.agencyLogo?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.type} px={2}>
                        <FormLabel fontSize="md">Company Type</FormLabel>
                        <Select
                            name="type"
                            placeholder="Select"
                            borderRadius="15px"
                            h="50px"
                            {...register("type")}
                            focusBorderColor="#309689"
                            icon={
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            }
                        >
                            <option value="OEP">OEP</option>
                            <option value="TTC">TTC</option>
                            <option value="VTP">VTP</option>
                            <option value="consultancies">Consultancies</option>
                        </Select>
                        <FormErrorMessage>{errors.type}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.ntn} px={2}>
                        <FormLabel>NTN/Tax ID</FormLabel>
                        <Input
                            type="text"
                            placeholder="1234567-8"
                            rounded={'14px'}
                            p={4}
                            py={6}
                            {...register("ntn")}
                            _focus={{
                                ring: 2,
                                ringColor: "#309689",
                                borderColor: "transparent",
                                outline: "none"
                            }}
                        />
                        <FormErrorMessage>{errors.ntn?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.supportingDocument} px={2}>
                        <FormLabel>Supporting Document</FormLabel>
                        <Input
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
                            rounded={'14px'}
                            p={2}
                            h={50}
                            py={3}
                            {...register("supportingDocument")}
                        />
                        <FormErrorMessage>{errors.supportingDocument?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.contactPersonName} px={2}>
                        <FormLabel>Contact Person Name</FormLabel>
                        <Input
                            type="text"
                            placeholder="Enter contact person name"
                            rounded={'14px'}
                            p={4}
                            py={6}
                            {...register("contactPersonName")}
                            _focus={{
                                ring: 2,
                                ringColor: "#309689",
                                borderColor: "transparent",
                                outline: "none"
                            }}
                        />
                        <FormErrorMessage>{errors.contactPersonName?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.contactPersonPhone} px={2}>
                        <FormLabel>Contact Person Phone</FormLabel>
                        <Input
                            type="tel"
                            placeholder="+923001234567"
                            rounded={'14px'}
                            p={4}
                            py={6}
                            {...register("contactPersonPhone")}
                            _focus={{
                                ring: 2,
                                ringColor: "#309689",
                                borderColor: "transparent",
                                outline: "none"
                            }}
                        />
                        <FormErrorMessage>{errors.contactPersonPhone?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.contactPersonIdFront} px={2}>
                        <FormLabel>Contact Person ID (Front)</FormLabel>
                        <Input
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

                    <FormControl isInvalid={!!errors.contactPersonIdBack} px={2}>
                        <FormLabel>Contact Person ID (Back)</FormLabel>
                        <Input
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

                    <FormControl isInvalid={!!errors.agencyCoverPhoto} px={2}>
                        <FormLabel>Agency Cover Photo</FormLabel>
                        <Input
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

                    <FormControl isInvalid={!!errors.password} px={2}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                rounded={'14px'}
                                p={4}
                                py={6}
                                {...register("password")}
                                _focus={{
                                    ring: 2,
                                    ringColor: "#309689",
                                    borderColor: "transparent",
                                    outline: "none"
                                }}
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

                    <FormControl isInvalid={!!errors.confirmPassword} px={2}>
                        <FormLabel>Confirm Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                rounded="14px"
                                p={4}
                                py={6}
                                {...register("confirmPassword")}
                                _focus={{
                                    ring: 2,
                                    ringColor: "#309689",
                                    borderColor: "transparent",
                                    outline: "none"
                                }}
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
                    <Box px={2}>

                        <Button
                            bg={'#309689'}
                            color={'#fff'}
                            rounded={'14px'}
                            h="50px"
                            py={6}
                            px={2}
                            size="lg"
                            w="full"
                            type="submit"
                            isLoading={isSubmitting}
                        >
                            Create Account
                        </Button>
                        <Text fontSize="sm" textAlign="center">
                            Already have an account?{' '}
                            <NextLink href="/auth/login" passHref>
                                <Link color="#309689">Login</Link>
                            </NextLink>
                        </Text>
                    </Box>
                </Stack>
            </form>
        </AuthLayout>
    );
};

export default CompanyRegisterPage;