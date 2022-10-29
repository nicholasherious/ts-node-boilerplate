import mongoose, { Schema, Document, Types } from 'mongoose';

interface IPost {
  title: string;
  user: Types.ObjectId;
}

export interface IPostModel extends IPost, Document {}

const postSchema: Schema = new Schema<IPost>({
  title: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
});

export default mongoose.model<IPostModel>('Post', postSchema);
