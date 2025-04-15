import { AxiosError } from "axios";
import { connectDB } from "@/utils/db";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import UserNotification from "@/models/UserNotification";


// PATCH: Mark a user notification as read
export const PATCH = async (request: Request, { params } : { params: Promise<{ notificationId: string }> }) => {
  // Verify active user session before proceeding
  const session = await getServerSession(options);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // Extract notificationId from request parameters and connect to MongoDB
    const { notificationId } = await params;

    await connectDB();

    // Update the notification's 'read' status to true and return the updated notification
    const notification = await UserNotification.findByIdAndUpdate(notificationId, { read: true }, { new: true });

    return new Response(JSON.stringify(notification), { status: 200 });

  } catch (error: unknown) {

    if (error instanceof AxiosError && error.response) {
      return new Response(error.response.data, {
        status: error.response.status,
      });
    } else {
      // Return a generic server error message if something else went wrong
      return new Response(`An error occurred while marking notification as read: ${String(error)}.`, {
        status: 500,
      });
    }
  }
};