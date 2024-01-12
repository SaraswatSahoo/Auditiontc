import Image from "next/image";
import { signIn } from "next-auth/react";
import type { GetServerSidePropsContext } from "next";
import middleware from "../utils/middleware";

export default function Index() {
  return (
    <>
      <div className='h-screen p-14'>
        <div className='bg-gradient-to-b from-red-700 to-[#17212e] to-25% h-full rounded-3xl py-20 px-20 flex relative'>
          <div className='absolute left-10 top-5'>
            <Image src='/mntc.png' alt='logo' width={60} height={60} />
          </div>
          <div className='flex flex-col flex-1 gap-20'>
            <p className='text-white text-8xl'>
              {" "}
              <span className='text-orange-500 block'>Welcome to </span>
              <span className='block'> MNTC</span>
              Audtitions
            </p>
            <div className='pr-40'>
              <button
                onClick={() => {
                  signIn("google", { callbackUrl: "/" });
                }}
                className='px-6 py-2 bg-orange-500 hover:bg-orange-600 hoverEffect rounded-2xl w-full'
              >
                <span className='text-white text-3xl'> Register</span>
              </button>
            </div>
          </div>
          <div className='flex-1 -mt-24'>
            <Image
              alt='main-image'
              src='/Artboard.png'
              height={50}
              width={700}
            />
          </div>
        </div>
      </div>
      {/* <div className='flex items-center justify-center h-screen dark:bg-gray-800'>
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
      </div> */}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await middleware(context);
}
