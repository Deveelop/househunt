import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPassword
        ) {
          return { id: "1", name: "Admin", email: adminEmail };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60,      
    updateAge: 30,   
  },

  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user?.email === process.env.ADMIN_EMAIL) {
        (session.user as any).role = "admin";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
