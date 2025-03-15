"use client";

import { useSession } from "next-auth/react";

const page = () => {
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);

  return (
    <div>admin home</div>
  )
}

export default page