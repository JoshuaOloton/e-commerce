import mongoose, { Schema, Document } from "mongoose";


interface IUserNotification extends Document {
  title: string;
  message: string;
  read: boolean;
  linkUrl: string;
}

const UserNotificationSchema = new Schema<IUserNotification>({
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false, index: true },
  linkUrl: { type: String, required: true },
});


const UserNotification = mongoose.models.UserNotification || mongoose.model<IUserNotification>("UserNotification", UserNotificationSchema);

export default UserNotification;