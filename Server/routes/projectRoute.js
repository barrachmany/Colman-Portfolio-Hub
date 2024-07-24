import expsess from 'express';
import projectController from '../controllers/projectController.js';
import authenticate from '../common/authenticate.js';


const router = expsess.Router();

router.post("/create", authenticate, projectController.createProject);

export default router;