'use client'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
    useColorModeValue,
    InputGroup,
    InputRightElement,
    IconButton,
    FormErrorMessage
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import NextLink from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { handleLogin } from "../../handlers/auth/login";
import { toast } from "react-toastify";

// Validation schema
const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});


export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { status } = useSession();

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
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            const payload = { email: data.email, password: data.password }
            const response = await handleLogin(payload)
            if (response.status !== 201) {
                console.log('response', response)
                // toast.error(response.data.errors.email[0])
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };
    return (
        <AuthLayout>
            <Box display={'flex'} justifyContent={'center'} w={'full'} mx={'auto'}>
                <Image width={180} height={80} src="/Images/logo.png" alt="CompletePakistan Logo" />
            </Box>
            <Heading fontSize={{ base: "2xl", md: "3xl" }} my={4}>
                Sign in to your account
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                    <FormControl isInvalid={!!errors.email}>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            rounded={'14px'}
                            p={4}
                            py={6}
                            _focus={{
                                ring: 2,
                                ringColor: "#309689",
                                borderColor: "transparent",
                                outline: "none"
                            }}
                            {...register("email")}
                        />
                        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.password}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                rounded={'14px'}
                                p={4}
                                py={6}
                                _focus={{
                                    ring: 2,
                                    ringColor: "#309689",
                                    borderColor: "transparent",
                                    outline: "none"
                                }}
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
                    <Flex justify="space-between" align="center">
                        <NextLink href="/auth/forgot-password" passHref>
                            <Link color="#309689" fontSize="sm" href="/forgot-password">
                                Forgot password?
                            </Link>
                        </NextLink>
                    </Flex>
                    <Button
                        bg={'#309689'}
                        color={'#fff'}
                        size="lg"
                        w="full"
                        rounded={'14px'}
                        type="submit"
                        isLoading={isSubmitting}
                    >
                        Sign In
                    </Button>
                    <Button
                        onClick={() => signIn('google')}
                        bg={'#309689'}
                        color={'#fff'}
                        size="lg"
                        w="full"
                        rounded={'14px'}
                    >
                        <FaGoogle className="mb-[2px] mr-2 text-[20px]" />
                        Sign In with Google
                    </Button>
                    <Text fontSize="sm" textAlign="center">
                        Don't have an account?{' '}
                        <NextLink href="/auth/signup" passHref>
                            <Link color="#309689">Sign up</Link>
                        </NextLink>
                    </Text>
                </Stack>
            </form>
        </AuthLayout>
    );
};

export const AuthLayout = ({ children }) => {
    return (
        <Flex minH="100vh" align="center" justify="center" bg={'#BADDD9'} >
            <Box
                bg={useColorModeValue('white', 'gray.700')}
                px={8}
                py={10}
                rounded="2xl"
                shadow="lg"
                w={{ base: '90%', sm: '600px' }}
            >
                {children}
            </Box>
        </Flex>
    );
};