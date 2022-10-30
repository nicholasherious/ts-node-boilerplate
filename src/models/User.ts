import mongoose, { Schema, Document } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
}

export interface IUserModel extends IUser, Document {}

const userSchema: Schema = new Schema<IUser>({
  name: { type: String, require: true },
  email: String,
});

export default mongoose.model<IUserModel>('User', userSchema);
