import mongoose, { Schema, Document } from 'mongoose';

interface IUser {
  name: string;
  email: string;
}

export interface IUserModel extends IUser, Document {}

const userSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, require: true },
    email: String,
  },
  { versionKey: false }
);

export default mongoose.model<IUserModel>('User', userSchema);
