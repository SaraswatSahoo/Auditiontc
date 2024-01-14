import type { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import redirect from "./redirect";

export default async function (context: GetServerSidePropsContext) {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);
  const { url } = req;

  if (!session) return redirect("/", url!);

  const { user } = session;

  if (!(user.rollNum && user.registrationNum && user.role))
    return redirect("/registration", url!);
  if (
    user.answers.length < Number(process.env["NEXT_PUBLIC_NUMBER_OF_QUESTION"]!)
  )
    return redirect("/questions", url!);

  if (!user.rating) return redirect("/rating", url!);

  return redirect("/thankyou", url!);
}
