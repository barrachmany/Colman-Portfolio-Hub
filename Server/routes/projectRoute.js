import expsess from 'express';
import projectController from '../controllers/projectController.js';
import authenticate from '../common/authenticate.js';


const router = expsess.Router();

router.post("/create", authenticate, projectController.createProject);

router.get("/get", projectController.getProjects);

router.get("/get/:id", projectController.getProjectById);

router.get("/get/category/:category", projectController.getProjectsByCategory);

router.get("/get/creator/:creator", projectController.getProjectsByCreator);

router.get("/search", projectController.searchProjects);


export default router;