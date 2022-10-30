import { NextFunction, Request, Response } from 'express';
import User from '../models/User';

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email } = req.body;
  const user = new User({
    name,
    email,
  });
  return user
    .save()
    .then((user) => res.status(200).json({ user }))
    .catch((error) => res.status(500).json({ error }));
};

const getSingleUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  return User.findById(userId)
    .then((user) =>
      user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: 'user not found' })
    )
    .catch((error) => res.status(500).json({ error }));
};

const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find()
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(500).json({ error }));
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  return User.findById(userId)
    .then((user) => {
      if (user) {
        user.set(req.body);
        return user
          .save()
          .then((user) => res.status(200).json({ user }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  return User.findByIdAndDelete(userId)
    .then((user) =>
      user
        ? res.status(200).json({ message: 'deleted' })
        : res.status(404).json({ message: 'user not found' })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default { createUser, getUsers, updateUser, deleteUser, getSingleUser };
