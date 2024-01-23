import type { GetServerSidePropsContext } from "next";
import middleware from "../utils/middleware";

export default function Thankyou() {
  return (
    <>
      <div className='flex flex-col gap-20 laptop:gap-20 items-center justify-center h-screen text-4xl laptop:text-8xl uppercase text-[#9b6f6f] text-center'>
        <div>Thankyou</div>
        <div className='flex flex-col gap-2'>
          <div>Will see you soon</div>
          <div>in the</div>
          <div>auditions</div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await middleware(context);
}
