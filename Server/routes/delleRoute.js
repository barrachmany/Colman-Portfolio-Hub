import Router from 'express';
import delleController from '../controllers/delleController.js';

const router = new Router();

router.post('/delle', delleController.createDellE);
router.post('/regenerate', delleController.regenateImage);


export default router;