"use client";

import { useSession } from "next-auth/react";


const Profile = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div>
      <h1>Profile</h1>
      <p>{session?.user.name}</p>
      <p>{session?.user.email}</p>
      <p>{session?.user._id}</p>
      <p>{session?.user.language}</p>
    </div>
  )
}

export default Profile