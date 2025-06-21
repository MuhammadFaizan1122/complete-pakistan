import axios from "axios";
import { signIn } from "next-auth/react";

export const handleLogin = async (payload) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASEURL_2}/auth/login`, payload);

        if (res.status === 200) {
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
        console.error("Login error:", error);
        return error.response;
    }
};
