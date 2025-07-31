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
    useToast
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AuthLayout } from "../Login/Login";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { handleRegister } from "../../handlers/auth/registration";

const signupSchema = yup.object().shape({
    fullName: yup
        .string()
        .min(2, "Full name must be at least 2 characters")
        .required("Full name is required"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        )
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
});
const SignupPage = () => {
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
        resolver: yupResolver(signupSchema),
    });

    const onSubmit = async (data) => {
        try {
            const payload = { name: data.fullName, email: data.email, password: data.password, password_confirmation: data.confirmPassword }
            const response = await handleRegister(payload)
            if (response.status !== 201) {
                // toast.error(response)
                toast({
                    title: 'Error',
                    description: response.data.message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            }
            if (response.status === 201) {
                toast({
                    title: 'Success',
                    description: response.data.message,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                router.push("/auth/login");
            }
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <AuthLayout>
            <Box display={'flex'} justifyContent={'center'} w={'full'} mx={'auto'}>
                <Image width={180} height={80} src="/Images/logo.png" alt="CompletePakistan Logo" />
            </Box>
            <Heading fontSize={{ base: "2xl", md: "3xl" }} my={4}>
                Create an account
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                    <FormControl isInvalid={!!errors.fullName}>
                        <FormLabel>Full Name</FormLabel>
                        <Input
                            type="text"
                            placeholder="Enter your full name"
                            rounded={'14px'}
                            p={4}
                            py={6}
                            _focus={{
                                ring: 2,
                                ringColor: "#0a7450",
                                borderColor: "transparent",
                                outline: "none"
                            }}
                            {...register("fullName")}
                        />
                        <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.email}>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            rounded={'14px'}
                            p={4}
                            py={6}
                            {...register("email")}
                            _focus={{
                                ring: 2,
                                ringColor: "#0a7450",
                                borderColor: "transparent",
                                outline: "none"
                            }}
                        />
                        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.password}>
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
                                    ringColor: "#0a7450",
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
                    <FormControl isInvalid={!!errors.confirmPassword}>
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
                                    ringColor: "#0a7450",
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

                    <Button
                        bg={'#0a7450'}
                        color={'#fff'}
                        rounded={'14px'}
                        size="lg"
                        w="full"
                        type="submit"
                        isLoading={isSubmitting}
                    >
                        Sign Up
                    </Button>
                    <Text fontSize="sm" textAlign="center">
                        Already have an account?{' '}
                        <NextLink href="/auth/login" passHref>
                            <Link color="#0a7450">Login</Link>
                        </NextLink>
                    </Text>
                    <Text fontSize="sm" textAlign="center">
                        Wanna continue as a company?{' '}
                        <NextLink href="/auth/company-registration" passHref>
                            <Link color="#0a7450">Register company</Link>
                        </NextLink>
                    </Text>
                </Stack>
            </form>
        </AuthLayout>
    );
};

export default SignupPage;