import Router from 'express';
import delleController from '../controllers/delleController.js';

const router = new Router();

router.post('/delle', delleController.createDellE);


export default router;