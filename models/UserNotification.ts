import mongoose, { Schema, Document } from "mongoose";


interface IUserNotification extends Document {
  title: string;
  message: string;
  read: boolean;
  linkUrl: string;
  user: Schema.Types.ObjectId;
}

const UserNotificationSchema = new Schema<IUserNotification>({
  title: { 
    en: { type: String, required: true, unique: true },
    yo: { type: String, required: true, unique: true },
    ig: { type: String, required: true, unique: true },
    ha: { type: String, required: true, unique: true }
   },
  message: { type: String, required: true },
  read: { type: Boolean, default: false, index: true },
  linkUrl: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});


const UserNotification = mongoose.models.UserNotification || mongoose.model<IUserNotification>("UserNotification", UserNotificationSchema);

export default UserNotification;