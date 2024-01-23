import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import updateUser from "../../utils/updateUser";
import errorMessage from "../../utils/ZErrorMessage";

const numberOfQuestion = Number(process.env["NEXT_PUBLIC_NUMBER_OF_QUESTION"]!);

const errorMsg = "Answer all questions";
const IAnswerSchema = z.object({
  answers: z
    .array(z.string().trim().min(10, errorMsg))
    .min(numberOfQuestion, errorMsg),
});

async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const data = IAnswerSchema.parse(req.body);
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
