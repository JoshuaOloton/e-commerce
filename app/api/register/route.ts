import { connectDB } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user";

export const POST = async (req: Request) => {
  const { name, email, password } = await req.json();

  try {
    await connectDB();

    const user = await User.findOne({ email });
    if (user) {
      return new Response("User already exists", { status: 400 });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error: any) {
    return new Response(error.message || "An error occurred while registering", { status: 500 });
  }
};
