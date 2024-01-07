import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import updateUser from "../../utils/updateUser";
import errorMessage from "../../utils/ZErrorMessage";

const IFormDataSchema = z.object({
  registrationNum: z.string().refine(
    (val) => {
      const regex = new RegExp("23U10[0-9]{3}");
      return val.match(regex);
    },
    { message: "Invalid Registration Number" }
  ),
  rollNum: z.string().refine(
    (val) => {
      const regex = new RegExp("23[A-Z]80[0-9]{3}");
      return val.match(regex);
    },
    {
      message: "Invalid Roll Number",
    }
  ),
  role: z.enum([
    "web-developer",
    "event-manager",
    "graphics-designer",
    "content-writer",
  ]),
});

async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const data = IFormDataSchema.parse(req.body);
  return await updateUser(req, res, data);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") await PUT(req, res);
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: errorMessage(error) });
  }
}
