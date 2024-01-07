import type { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export default async function (context: GetServerSidePropsContext) {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);
  const { url } = req;

  if (!session) return redirect("/");

  const { user } = session;

  if (!(user.rollNum && user.registrationNum && user.role))
    return redirect("/registration");
  if (
    user.answers.length < Number(process.env["NEXT_PUBLIC_NUMBER_OF_QUESTION"]!)
  )
    return redirect("/questions");

  if (!user.rating) return redirect("/rating");

  return redirect("/thankyou");

  function redirect(destination: string) {
    if (url === destination || url?.startsWith("/_next")) return { props: {} };
    return {
      redirect: {
        destination,
        permanent: false,
      },
    };
  }
}
