import { GetServerSidePropsContext } from "next";
import middleware from "../utils/middleware";

export default function Thankyou() {
  return (
    <>
      <div className='flex flex-col gap-10'>
        <div>Thankyou</div>
        <div>Will see you soon in the audition </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await middleware(context);
}
