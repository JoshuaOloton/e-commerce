import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import { connectDB } from "@/utils/db";
import { LoginSchema } from "@/schemas";
import type { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
    verifyRequest: "/login"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDB();

          const validatedCredentials = LoginSchema.safeParse(credentials);
          if (!validatedCredentials.success) {
            // throw new Error("Invalid credentials provided");
            return null;
          }
          
          const { email, password } = validatedCredentials.data;

          const user = await User.findOne({
            email,
            password: password,
          });
          if (!user) {
            // throw new Error("Incorrect credentials provided"); 
            return null;
          }

          return user;
        } catch (error: any) {
          // throw new Error(error.message || "An error occurred while authenticating");
          return null;
        }
      },
    }),
  ],
};
