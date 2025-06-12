// app/api/auth/[...nextauth]/route.ts
// import NextAuth from "next-auth"
// import { authConfig } from "../../../../lib/auth"

// const handler = NextAuth(authConfig)

// export const GET = handler
// export const POST = handler

import NextAuth from "next-auth";
// // import { authOptions } from "../../../app/lib/authOptions";
import GoogleProvider from "next-auth/providers/google";
import { authOptions } from "../../../lib/authOptions";


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }