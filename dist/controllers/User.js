"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const createUser = (req, res, next) => {
    const { name, email } = req.body;
    const user = new User_1.default({
        name,
        email,
    });
    return user
        .save()
        .then((user) => res.status(200).json({ user }))
        .catch((error) => res.status(500).json({ error }));
};
const getSingleUser = (req, res, next) => {
    const userId = req.params.userId;
    return User_1.default.findById(userId)
        .then((user) => user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: 'user not found' }))
        .catch((error) => res.status(500).json({ error }));
};
const getUsers = (req, res, next) => {
    return User_1.default.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }));
};
const updateUser = (req, res, next) => {
    const userId = req.params.userId;
    return User_1.default.findById(userId)
        .then((user) => {
        if (user) {
            user.set(req.body);
            return user
                .save()
                .then((user) => res.status(200).json({ user }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    return User_1.default.findByIdAndDelete(userId)
        .then((user) => user
        ? res.status(200).json({ message: 'deleted' })
        : res.status(404).json({ message: 'user not found' }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createUser, getUsers, updateUser, deleteUser, getSingleUser };
