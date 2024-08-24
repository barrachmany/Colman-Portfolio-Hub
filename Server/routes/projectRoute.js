import expsess from "express";
import projectController from "../controllers/projectController.js";
import chatController from "../controllers/chatController.js";
import authenticate from "../common/authenticate.js";

const router = expsess.Router();

router.post("/create", authenticate, projectController.createProject);

router.get("/get", projectController.getProjects);

router.get("/get/:id", projectController.getProjectById);

router.get("/get/category/:category", projectController.getProjectsByCategory);

router.get("/get/member/:id", authenticate, projectController.getProjectsByUserID);

router.get("/search", projectController.searchProjects);

router.delete("/delete/:id", authenticate, projectController.deleteProject);


router.post("/like/:_id", authenticate, projectController.likeProject);

router.get("/findbestfit", projectController.findBestFit, chatController.createChat);

export default router;
