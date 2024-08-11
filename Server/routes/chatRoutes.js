import Router from 'express';
import ChatController from '../controllers/chatController.js';

const router = new Router();

router.post('/chat', ChatController.createChat, (req, res) => {
    res.status(200).json({response: req.response});
});

export default router;

