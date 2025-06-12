// lib/auth.ts
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
    }),
  ],
//   callbacks: {
//     async session({ session, token, user }) {
//       return session
//     },
//   },
}
