import express from 'express';
import controller from '../controllers/Post';

const router = express.Router();

router.post('/create', controller.createPost);
router.get('/all', controller.getPosts);
router.get('/single/:postId', controller.getSinglePost);
router.put('/update/:postId', controller.updatePost);
router.delete('/delete/:postId', controller.deletePost);

export = router;
