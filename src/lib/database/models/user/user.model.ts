import { Document, model, models, Schema } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  firstName: string;
  lastName?: string;
  photo?: string;
  email: string;
}

export const UserSchema: Schema<IUser> = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
  photo: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
}, {timestamps: true})

const User = models?.User || model('User', UserSchema)

export default User;