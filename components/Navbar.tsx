import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    return <p>Not authenticated</p>;
  }
  return (
    <>
      <div className='h-10 w-full bg-gray-400'>
        {session?.user.email}
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10'
          onClick={() => signOut()}
        >
          Signout
        </button>
      </div>
    </>
  );
}
