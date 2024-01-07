import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import User from "../Model/User";
import dbConnect from "../dbConnect";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
  data: unknown
) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res.status(400).json({ success: false, message: "No session" });

  let { user } = session;

  const updatedUser = await User.findById(user._id);
  updatedUser.set(data);
  await updatedUser.save();
  res.json({ success: true, updatedUser });
}
