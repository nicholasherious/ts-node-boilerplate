"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../controllers/User"));
const router = express_1.default.Router();
router.post('/create', User_1.default.createUser);
router.get('/all', User_1.default.getUsers);
router.get('/single/:userId', User_1.default.getSingleUser);
router.put('/update/:userId', User_1.default.updateUser);
router.delete('/delete/:userId', User_1.default.deleteUser);
module.exports = router;
