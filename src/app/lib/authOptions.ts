import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                try {
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_BASEURL}/login`,
                        {
                            email: credentials.email,
                            password: credentials.password,
                        }
                    );

                    const user = response.data?.user;
                    const token = response.data?.token;

                    if (user && token) {
                        return { ...user, token };
                    }

                    return null;
                } catch (err) {
                    return null;
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                // @ts-ignore
                token.token = user.token;
                token.email = user.email;
                token.name = user.name;
                // @ts-ignore
                token.token = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                // @ts-ignore
                session.user.id = token.id;
                // @ts-ignore
                session.user.token = token.token;
                session.user.email = token.email;
                session.user.name = token.name;
                // @ts-ignore
                session.user.token = token.token;
            }
            return session;
        },
    },
};
