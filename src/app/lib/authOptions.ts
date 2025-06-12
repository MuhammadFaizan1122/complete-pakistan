// import connectDB from "../src/app/config/mongoose";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import connectDB from "../config/mongoose";
// import { Users } from "../config/models/users";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
        
            // try {
            //     if (user && account?.provider === "google") {
                    
            //         // await connectDB();
            //         // Find or create the user in the database
            //         const existingUser = await Users.findOne({ email: user.email });
            //         if (!existingUser) {
            //             const newUser = await Users.create({
            //                 email: user.email,
            //                 name: user.name,
            //                 image: user.image || "",
            //                 role: "user",
            //                 user_status: 1,
            //             });
            //             token.role = newUser.role;
            //         } else {
            //             token.role = existingUser.role;
            //         }
            //         // @ts-ignore
            //         token.id = existingUser?._id || newUser._id;
            //     }
            // } catch (error) {
            //     console.error("Error in JWT callback:", error);
            //     throw new Error("JWT callback failed.");
            // }

            return token;
        },
        async session({ session, token }) {
            // try {
            //     // Attach custom data from token to the session
            //     // @ts-ignore
            //     session.user.id = token.id as string;
            //     // @ts-ignore
            //     session.user.role = token.role as string;
            //     // @ts-ignore
            //     session.token = token;
            // } catch (error) {
            //     console.error("Error in session callback:", error);
            //     throw new Error("Session callback failed.");
            // }
            return session;
        },
    },
};
