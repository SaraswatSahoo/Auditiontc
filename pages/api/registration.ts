import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import updateUser from "../../utils/updateUser";
import errorMessage from "../../utils/ZErrorMessage";
import { departmentList, roleList } from "../../utils/data";

const IFormDataSchema = z.object({
  name: z.string().trim().min(3, { message: "Invalid name" }),
  rollNum: z
    .string()
    .trim()
    .refine(
      (val) => {
        const regex = new RegExp("23[A-Z]80[0-9]{3}");
        return val.match(regex);
      },
      {
        message: "Invalid Roll Number",
      }
    ),
  phoneNum: z
    .string()
    .trim()
    .refine(
      (val) => {
        const regex = new RegExp("[6-9][0-9]{9}");
        return val.match(regex) && val.length === 10;
      },
      {
        message: "Invalid Phone Number",
      }
    ),

  department: z.enum(departmentList, {
    errorMap: () => {
      return {
        message: "Invalid department",
      };
    },
  }),

  role1: z.enum(roleList, {
    errorMap: () => {
      return {
        message: "Invalid domain1",
      };
    },
  }),
  role2: z.enum(roleList, {
    errorMap: () => {
      return {
        message: "Invalid domain2",
      };
    },
  }),
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
