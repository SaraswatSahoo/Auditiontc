import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import updateUser from "../../utils/updateUser";
import errorMessage from "../../utils/ZErrorMessage";

const rangeSliderValidator = z.string().refine(
  (val) => {
    const num = Number(val);
    return num >= 1 && num <= 10;
  },
  { message: "Rating should be between 1 and 10" }
);

const IRatingSchema = z.object({
  creativity: rangeSliderValidator,
  hardworking: rangeSliderValidator,
  punctuality: rangeSliderValidator,
  dedication: rangeSliderValidator,
});

async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const data = IRatingSchema.parse(req.body);
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
