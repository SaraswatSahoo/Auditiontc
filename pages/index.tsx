import Image from "next/image";
import { signIn } from "next-auth/react";
import type { GetServerSidePropsContext } from "next";
import middleware from "../utils/middleware";

export default function Index() {
  return (
    <>
      <div className='py-20 px-20 flex relative '>
        <div className='absolute left-10 top-5'>
          <Image src='/mntc.png' alt='logo' width={60} height={60} />
        </div>
        <div className='flex flex-col flex-1 gap-20'>
          <p className='text-white text-8xl'>
            {" "}
            <span className='text-orange-500 block'>Welcome to </span>
            <span className='block'> MNTC</span>
            Auditions
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
          <Image alt='main-image' src='/Artboard.png' height={50} width={700} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await middleware(context);
}
