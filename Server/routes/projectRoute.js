import expsess from "express";
import projectController from "../controllers/projectController.js";
import chatController from "../controllers/chatController.js";
import authenticate from "../common/authenticate.js";
// import upload from "../common/fileHandler.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(process.cwd(), "./public/uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

const router = expsess.Router();

router.post("/create", authenticate, upload.single("image"), projectController.createProject);

router.get("/get", projectController.getProjects);

router.get("/get/:id", projectController.getProjectById);

router.get("/get/category/:category", projectController.getProjectsByCategory);

router.get("/get/member/:id", authenticate, projectController.getProjectsByUserID);

router.get("/search", projectController.searchProjects);

router.delete("/delete/:id", authenticate, projectController.deleteProject);

router.post("/like/:projectId", projectController.likeProject);

router.get("/findbestfit", projectController.findBestFit, chatController.createChat);

router.put("/update/:id", projectController.updateProject);

export default router;
