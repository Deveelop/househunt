import NextAuth from "next-auth/next";
import { authOptions } from "../../../lib/auth"; // Adjust path based on your project structure

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };