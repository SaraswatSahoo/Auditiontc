import type { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import dbConnect from "../dbConnect";
import redirect from "../utils/redirect";
import User from "../Model/User";
import { IUser } from "../types/types";

export default function admin({ users }: { users: IUser[] }) {
  return (
    <>
      <div className='text-white overflow-auto max-h-screen pt-28'>
        <h1 className='text-2xl mb-10'>Total Registrations:{users.length}</h1>
        <div className='flex flex-col gap-10 '>
          {users.map((user, index) => (
            <div key={index}>
              {Object.entries(user).map(([key, value]) => (
                <p key={key}>
                  {key}: {JSON.stringify(value)}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role1 !== "admin")
    return redirect("/", req.url!);

  await dbConnect();
  const users = await User.find({ role1: { $ne: "admin", $exists: true } });
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
