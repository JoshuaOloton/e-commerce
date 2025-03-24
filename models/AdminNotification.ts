import mongoose, { Schema, Document } from "mongoose";

interface IAdminNotification extends Document {
  title: string;
  message: string;
  read: boolean;
  linkUrl: string;
}

const AdminNotificationSchema = new Schema<IAdminNotification>(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false, index: true },
    linkUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const AdminNotification =
  mongoose.models.AdminNotification ||
  mongoose.model<IAdminNotification>(
    "AdminNotification",
    AdminNotificationSchema
  );

export default AdminNotification;
