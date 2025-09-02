"use client";
import { useState } from "react";
import { Button, Input, Stack, Text, FormControl, FormLabel, useToast, Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "../Login/Login";
import Image from "next/image";

const ForgotPasswordOtpVerify = ({ searchParams }) => {
    const [otp, setOtp] = useState();
    const router = useRouter();
    const toast = useToast()

    const handleVerify = async () => {
        const param = await searchParams;
        const res = await fetch("/api/auth/forgot-password-verify-otp", {
            method: "POST",
            body: JSON.stringify({ email: param.email, otp }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.success) {
            toast({
                title: "Verfication completed successfully!",
                description: "OTP Verification completed successfully",
                status: "success",
                duration: 6000,
                isClosable: true,
            });
            router.push(`/auth/set-new-password?email=${param.email}`);
        } else {
            alert(data.error);
        }
    };

    return (
        <AuthLayout>
            <Box display={'flex'} justifyContent={'center'} w={'full'} mx={'auto'}>
                <Image width={180} height={80} src="/Images/logo.png" alt="CompletePakistan Logo" />
            </Box>
            <Heading fontSize={{ base: "2xl", md: "3xl" }} my={4} textAlign={'center'}>
                Verify your OTP
            </Heading>
            <Text fontSize="sm" color="gray.600" mb={4} textAlign={'center'}>
                We've sent an OTP to your entered email address.
            </Text>
            <Stack spacing={4}>
                <FormControl>
                    <FormLabel>Enter OTP</FormLabel>
                    <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit OTP" />
                </FormControl>
                <Button onClick={handleVerify} bg="#0a7450" color="white">Verify OTP</Button>
            </Stack>
        </AuthLayout>
    );
};

export default ForgotPasswordOtpVerify;
