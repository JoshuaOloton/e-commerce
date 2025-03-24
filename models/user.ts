import mongoose, { model, models, Schema, Document } from "mongoose";
import  bcrypt from "bcryptjs";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  language: string;
  role: string;
  offers: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      unique: [true, "name already exists"],
      required: [true, "please provide a name"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    language: {
      type: String,
      default: "en",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    offers: [{ type: Schema.Types.ObjectId, ref: "Offer" }],
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre<IUser>("save", async function (next) {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  });

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
