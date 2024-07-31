import Router from "express";
import userController from "../controllers/userController.js";

const router = new Router();

//add 404 page
router.get("/", (req, res) => {
    res.status(404).send("404 Page Not Found");
});

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/logout", userController.logout);


export default router;