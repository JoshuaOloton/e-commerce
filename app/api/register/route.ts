import { AxiosError } from "axios";
import { connectDB } from "@/utils/db";
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

  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return new Response(error.response.data, { status: error.response.status });
    }
    return new Response("An error occurred while registering", { status: 500 });
  }
};
