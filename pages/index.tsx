import Image from "next/image";
import { signIn } from "next-auth/react";
import type { GetServerSidePropsContext } from "next";
import middleware from "../utils/middleware";

export default function Index() {
  return (
    <>
      <div className='h-screen flex justify-center items-center laptop:px-20'>
        <div className='flex flex-col laptop:justify-center flex-1 gap-20 text-center laptop:text-left'>
          <p className='text-white text-6xl laptop:text-8xl'>
            {" "}
            <span className=' text-[#1AC0E6] font-medium'>Welcome to </span>
            <span className='block font-bold'> MNTC</span>
            <span className=" text-[#1AC0E6] font-medium">Auditions</span>
          </p>
          <div className='laptop:pr-40'>
            <button
              onClick={() => {
                signIn("google", { callbackUrl: "/" });
              }}
              className='px-6 py-3 bg-[#1AC0E6] hover:bg-[#1a80e6] hoverEffect rounded-2xl w-1/2'
            >
              <span className='text-white text-2xl font-semibold'> Register</span>
            </button>
          </div>
        </div>
        <div className='flex-1 -mt-24 hidden laptop:block'>
          <Image alt='main-image' src='/Artboard.png' height={50} width={700} />
        </div>
      </div>
      <br />
      <br />
      <div className=" flex justify-center items-center">
        <p className=" text-white font-semibold text-[20px]">Domains</p>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await middleware(context);
}
