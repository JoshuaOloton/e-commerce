import { AxiosError } from "axios";
import { connectDB } from "@/utils/db";
import { getServerSession } from "next-auth";
import AdminNotification from "@/models/AdminNotification";
import { options } from "@/app/api/auth/[...nextauth]/options";


export const PATCH = async (request: Request, { params } : { params: Promise<{ notificationId: string }> }) => {
  const session = await getServerSession(options);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { notificationId } = await params;

    await connectDB();

    const notification = await AdminNotification.findByIdAndUpdate(notificationId, { read: true }, { new: true });

    console.log('notification', notification);

    return new Response(JSON.stringify(notification), { status: 200 });

  } catch (error: unknown) {
    
    if (error instanceof AxiosError && error.response) {
      return new Response(error.response.data, {
        status: error.response.status,
      });
    } else {
      return new Response(`An error occurred while marking notification as read: ${String(error)}.`, {
        status: 500,
      });
    }
  }
};