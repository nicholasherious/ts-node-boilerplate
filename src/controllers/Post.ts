import { NextFunction, Request, Response } from 'express';
import Post from '../models/Post';

const createPost = (req: Request, res: Response, next: NextFunction) => {
  const { title, user } = req.body;
  const post = new Post({
    title,
    user,
  });
  return post
    .save()
    .then((post) => res.status(200).json({ post }))
    .catch((error) => res.status(500).json({ error }));
};

const getPosts = (req: Request, res: Response, next: NextFunction) => {
  return Post.find()
    .populate('user')
    .then((post) => res.status(200).json({ post }))
    .catch((error) => res.status(500).json({ error }));
};

const getSinglePost = (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.postId;
  return Post.findById(postId)
    .populate('user')
    .then((post) =>
      post
        ? res.status(200).json({ post })
        : res.status(404).json({ message: 'post not found' })
    )
    .catch((error) => res.status(500).json({ error }));
};

const updatePost = (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.postId;
  return Post.findById(postId)
    .then((post) => {
      if (post) {
        post.set(req.body);
        return post
          .save()
          .then((post) => res.status(200).json({ post }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'post not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deletePost = (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.postId;
  return Post.findByIdAndDelete(postId)
    .then((post) =>
      post
        ? res.status(200).json({message: 'post deleted', post})
        : res
            .status(404)
            .json({ message: 'post not found' })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default { createPost, getPosts, getSinglePost, updatePost, deletePost };
