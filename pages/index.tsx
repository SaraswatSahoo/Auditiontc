import Image from "next/image";
import { signIn } from "next-auth/react";
import type { GetServerSidePropsContext } from "next";
import middleware from "../utils/middleware";

export default function Index() {
  return (
    <>
      <div className='flex items-center justify-center h-screen dark:bg-gray-800'>
        <button
          onClick={() => {
            signIn("google", { callbackUrl: "/" });
          }}
          className='px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150'
        >
          <Image
            width={24}
            height={24}
            src='https://www.svgrepo.com/show/475656/google-color.svg'
            alt='google logo'
          />
          <span>Login with Google</span>
        </button>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await middleware(context);
}
