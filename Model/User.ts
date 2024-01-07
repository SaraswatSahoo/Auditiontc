import mongoose from "mongoose";
import { IUser } from "../types/types";

const UserSchema = new mongoose.Schema<IUser>(
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
    registrationNum: {
      type: String,
      unique: true,
    },
    rollNum: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      enum: [
        "web-developer",
        "event-manager",
        "graphics-designer",
        "content-writer",
      ],
    },
    answers: {
      type: [String],
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);
export default User;
