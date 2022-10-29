import express from 'express';
import controller from '../controllers/User';

const router = express.Router();

router.post('/create', controller.createUser);
router.get('/all', controller.getUsers);
router.get('/single/:userId', controller.getSingleUser)
router.put('/update/:userId', controller.updateUser);
router.delete('/delete/:userId', controller.deleteUser);

export = router;
