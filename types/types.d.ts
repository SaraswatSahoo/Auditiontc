import mongoose from "mongoose";
import type { departmentList, roleList } from "../utils/data";

export type IUser = {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  rollNum?: string;
  phoneNum?: string;
  department: (typeof departmentList)[number] | "";
  role1?: (typeof roleList)[number] | "";
  role2?: (typeof roleList)[number] | "";
  answers: string[];
  creativity?: string;
  hardworking?: string;
  punctuality?: string;
  dedication?: string;
};
