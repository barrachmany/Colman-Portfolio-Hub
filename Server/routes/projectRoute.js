import expsess from 'express';

const router = expsess.Router();

router.post("/create", (req, res) => {
    res.send("Create");
});

router.post("/read", (req, res) => {
    res.send("Read");
});

router.post("/update", (req, res) => { 
    res.send("Update");
});

router.post("/delete", (req, res) => {
    res.send("Delete");
});

export default router;