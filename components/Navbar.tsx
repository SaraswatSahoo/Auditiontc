import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data: session, status } = useSession();
  const authButtonClass =
    "bg-slate-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10";
  return (
    <>
      <div className='h-20 w-full bg-gradient-to-b from-[#17212e] to-100% fixed flex justify-between p-5'>
        <div>
          <Image
            src='/mntc.png'
            alt='logo'
            width={120}
            height={60}
            className='w-20 laptop:w-auto'
          />
        </div>
        <div className='text-white'>
          <span className='hidden laptop:inline'>{session?.user.email}</span>
          {status === "authenticated" && (
            <button className={authButtonClass} onClick={() => signOut()}>
              Signout
            </button>
          )}
        </div>
      </div>
    </>
  );
}
