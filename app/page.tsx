"use client";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function Page(context: NextPageContext) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  return (
    <>
      <h1 className="text-2xl text-green-500">Hello World</h1>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Sign Out
      </button>
    </>
  );
}
