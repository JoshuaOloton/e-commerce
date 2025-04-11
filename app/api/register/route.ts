import { AxiosError } from "axios";
import { connectDB } from "@/utils/db";
import User from "@/models/User";

export const POST = async (req: Request) => {
  const { name, email, password, language } = await req.json(); // Destructure POST body

  try {
    await connectDB(); // connect to Mongo database

    // If User exists, return Bad Request
    const user = await User.findOne({ email });
    if (user) {
      return new Response("User already exists", { status: 400 });
    }

    // create new user
    const newUser = new User({ name, email, password, language });
    await newUser.save();

    return new Response(JSON.stringify(newUser), { status: 201 }); // return JSON Response

  } catch (error: unknown) { // catch Errors
    console.log(error); // log error
    if (error instanceof AxiosError && error.response) {
      return new Response(error.response.data, { status: error.response.status });
    }
    return new Response("An error occurred while registering", { status: 500 });
  }
};
