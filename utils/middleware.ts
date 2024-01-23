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
  const { role1, answers, creativity } = user;

  if (role1 === "admin") return { props: {} };

  if (!role1) return redirect("/registration", url!);
  if (answers.length < Number(process.env["NEXT_PUBLIC_NUMBER_OF_QUESTION"]!))
    return redirect("/questions", url!);

  if (!creativity) return redirect("/rating", url!);

  return redirect("/thankyou", url!);
}
