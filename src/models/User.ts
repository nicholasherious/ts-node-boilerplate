import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, require: true },
  email: String,
  password: String,
});

const User = model<IUser>('User', userSchema)

export default User