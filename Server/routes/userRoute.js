import Router from "express";

const router = new Router();

router.post("/register", (req, res) => {
    res.send("Register");
});

router.post("/login", (req, res) => {
    res.send("Login");
});

router.post("/logout", (req, res) => {
    res.send("Logout");
});

router.post("/update", (req, res) => {
    res.send("Update");
});


export default router;