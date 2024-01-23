import mongoose from "mongoose";
import { departmentList, roleList } from "../utils/data";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    rollNum: {
      type: String,
      unique: true,
      default: Math.random().toString(),
    },
    phoneNum: {
      type: String,
      unique: true,
    },
    department: {
      type: String,
      enum: departmentList,
    },
    role1: {
      type: String,
      enum: roleList,
    },
    role2: {
      type: String,
      enum: roleList,
    },
    answers: {
      type: [String],
    },
    creativity: {
      type: Number,
      min: 1,
      max: 10,
    },
    hardworking: {
      type: Number,
      min: 1,
      max: 10,
    },
    punctuality: {
      type: Number,
      min: 1,
      max: 10,
    },
    dedication: {
      type: Number,
      min: 1,
      max: 10,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export default User;
