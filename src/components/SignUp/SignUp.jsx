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
    FormErrorMessage
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AuthLayout } from "../Login/Login";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
});
const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(signupSchema),
    });

    const onSubmit = async (data) => {
        try {
            console.log("Signup data:", data);
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <AuthLayout>
            <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={6}>
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
                    <Button
                        bg={'#309689'}
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
                        <NextLink href="/login" passHref>
                            <Link color="#309689">Login</Link>
                        </NextLink>
                    </Text>
                </Stack>
            </form>
        </AuthLayout>
    );
};

export default SignupPage;