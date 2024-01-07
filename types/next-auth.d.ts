import NextAuth from "next-auth";
import type { IUser } from "./types";

declare module "next-auth" {
  interface Session {
    user: IUser;
  }
}
