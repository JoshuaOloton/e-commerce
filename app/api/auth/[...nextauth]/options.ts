import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import { connectDB } from "@/utils/db";
import { DefaultUser } from "next-auth";
import { LoginSchema } from "@/schemas";
import type { NextAuthOptions } from "next-auth";



declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    };
  }

  interface User extends DefaultUser {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface DefaultJWT {
    role: string;
  }
}

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
          console.log("User => ", user);

          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        const sessionUser = await User.findOne({ email: session.user.email });

        session.user._id = sessionUser?._id;
        session.user.role = token.role;
      }
      return session;
    }
  }
};
