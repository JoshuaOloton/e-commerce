"use client";

import axios, { AxiosError } from "axios";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Bell } from "lucide-react";
import { NotificationType } from "@/types";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const NotificationsPane = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    if (!session) return;

    let fetchUrl = "";
    if (session.user?.role === "admin") {
      fetchUrl = "/api/notifications/admin";
    } else {
      fetchUrl = "/api/notifications/user";
    }

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${fetchUrl}?read=false`);
        setNotifications(response.data);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    fetchNotifications();
  }, [session]);

  const clickNotification = async (id: string, navigateUrl: string) => {
    if (!session) return;

    let fetchUrl = "";
    if (session.user?.role === "admin") {
      fetchUrl = `/api/notifications/admin/${id}/mark-as-read`;
    } else {
      fetchUrl = `/api/notifications/user/${id}/mark-as-read`;
    }

    // Navigate to Product page
    router.push(navigateUrl);

    try {
      const response = await axios.patch(fetchUrl);

      if (response.status == 200) {
        console.log("Notification marked as read");
        setNotifications(
          notifications.filter((notification) => notification._id !== id)
        );
      }
    } catch (error: unknown) {
      console.log(error);

      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data);
      } else {
        toast.error(
          `An error occurred while marking notification as read: ${String(
            error
          )}.`
        );
      }
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          size={"icon"}
          className="cursor-pointer relative rounded-lg border border-gray-300 hover:bg-gray-200 transition-all"
        >
          <div className="relative p-2 rounded">
            <Bell
              className={
                notifications.length > 0 ? "animate-pulse text-red-900" : ""
              }
            />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                {notifications?.length}
              </span>
            )}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Unread Notifications</SheetTitle>
          <SheetDescription>
            Get caught up on your latest notifications.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-4">
          <ScrollArea>
            {notifications.length == 0 && (
              <p className="text-center text-sm text-gray-500 font-bold italic">
                No new notifications :)
              </p>
            )}
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className="flex flex-col justify-between p-3 rounded-lg transition-all border-b hover:bg-gray-200 cursor-pointer"
                onClick={() =>
                  clickNotification(notification._id, notification.linkUrl)
                }
              >
                <h3 className="text-sm text-gray-700 font-bold mb-2 italic">
                  {notification.title}
                </h3>
                <p className="text-xs text-gray-400">{notification.message}</p>
              </div>
            ))}
          </ScrollArea>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button">ok</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationsPane;
