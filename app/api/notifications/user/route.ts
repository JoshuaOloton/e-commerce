import { AxiosError } from "axios";
import { connectDB } from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import UserNotification from "@/models/UserNotification";


// GET ALL NOTIFICATIONS : /api/notifications/user
export const GET = async (request: NextRequest) => {
  const session = await getServerSession(options);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const read = searchParams.get("read");

    const userId = String(session.user._id);
    if (!userId) {
      return new Response("User ID not found", { status: 400 });
    }
    
    let notifications = [];

    if (read) {
      notifications = await UserNotification.find({ read, user: userId });
    } else {
      notifications = await UserNotification.find({ user: userId });
    }

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
