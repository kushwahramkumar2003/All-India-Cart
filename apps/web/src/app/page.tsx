// mark as client component
"use client";

// importing necessary functions
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  // extracting data from usesession as session
  const { data: session } = useSession();

  // checking if sessions exists
  if (session) {
    // rendering components for logged in users
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div className="relative mb-4 w-44 h-44">
          <Image
            src={session.user?.image as string}
            fill
            alt=""
            className="object-cover rounded-full"
          />
        </div>
        <p className="mb-2 text-2xl">
          Welcome <span className="font-bold">{session.user?.name}</span>.
          Signed In As
        </p>
        <p className="mb-4 font-bold">{session.user?.email}</p>
        <button
          className="px-6 py-2 bg-red-600 rounded-md"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }

  // rendering components for not logged in users
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <p className="mb-2 text-2xl">Not Signed In</p>
      <button
        className="px-6 py-2 mb-2 bg-blue-600 rounded-md"
        onClick={() => signIn("google")}
      >
        Sign in with google
      </button>
      <button
        className="px-6 py-2 mb-2 border border-gray-300 rounded-md bg-none"
        onClick={() => signIn("github")}
      >
        Sign in with github
      </button>
    </div>
  );
}
