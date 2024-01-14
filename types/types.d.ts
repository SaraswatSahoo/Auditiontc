import mongoose from "mongoose";

export type IUser = {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  registrationNum?: string;
  rollNum?: string;
  role?:
    | ""
    | "web-developer"
    | "event-manager"
    | "graphics-designer"
    | "content-writer"
    | "admin";
  answers: string[];
  rating?: number;
};
