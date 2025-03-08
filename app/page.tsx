'use client';

import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import Hero from "@/components/Hero";

export default function Home() {
  const { data: session, status } = useSession();
  // const session = useSession();
  console.log(session);
  // console.log(status);
  
  return (
    <div>
      Home page
      <Hero />
      { session && (
        <>
          <p>Name: {session?.user?.name}</p>
          <p>Email: {session?.user?.email}</p>
        </>
      ) }
    </div>
  );
}
