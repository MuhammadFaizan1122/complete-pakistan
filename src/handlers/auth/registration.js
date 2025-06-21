import axios from "axios";
import { signIn } from "next-auth/react";

export const handleRegister = async (payload) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASEURL_2}/auth/register`, payload);

        if (res.status === 201) {
            const loginRes = await signIn("credentials", {
                redirect: false,
                email: payload.email,
                password: payload.password,
            });

            if (loginRes?.ok) {
                console.log("User is logged in and session contains token");
            } else {
                console.error("Auto-login failed");
            }
        }

        return res;
    } catch (error) {
        console.error("Registration error:", error);
        return error.response;
    }
};
