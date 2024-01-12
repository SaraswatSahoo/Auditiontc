import User from "@/Model/User";
import dbConnect from "@/dbConnect";
import NextAuth from "next-auth";
import type { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env["GOOGLE_CLIENT_ID"]!,
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"]!,
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      await dbConnect();
      const { email } = session.user;
      const user = await User.findOne({ email });
      if (user) session.user = user;
      return session;
    },
    async signIn({ user }) {
      await dbConnect();
      const isUser = await User.findOne({ email: user.email });
      if (!isUser) {
        try {
          const newUser = new User({
            name: user.name,
            email: user.email,
          });
          await newUser.save();
        } catch (error: any) {
          console.log(error.message);
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
    signOut: "/",
  },
};

export default NextAuth(authOptions);
