import { AxiosError } from "axios";
import { connectDB } from "@/utils/db";
import { NextRequest } from "next/server";
import UserNotification from "@/models/UserNotification";


// GET ALL NOTIFICATIONS : /api/notifications/user
export const GET = async (request: NextRequest) => {

  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const read = searchParams.get("read");

    let notifications = [];

    if (read) {
      notifications = await UserNotification.find({ read });
    } else {
      notifications = await UserNotification.find();
    }

    console.log(notifications);
    console.log(notifications.length);

    notifications.sort((a, b) => b.createdAt - a.createdAt); // sort newest to oldest

    return Response.json(notifications, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return new Response(error.response.data, {
        status: error.response.status,
      });
    }
    return new Response(
      `An error occurred while fetching notifications: ${String(error)}`,
      {
        status: 500,
      }
    );
  }
};
