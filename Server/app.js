// main imports
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import env from "dotenv";
import cors from "cors";

// routes
import userRoute from "./routes/userRoute.js";
import projectRoute from "./routes/projectRoute.js";

env.config();

const initApp = () => {
    const promise = new Promise((resolve) => {

        const db = mongoose.connection;
        db.once("open", () => console.log("Connected to Database"));
        db.on("error", (error) => console.error(error));
        const url = process.env.DB_URL;

        mongoose.connect(url).then(() => {
            const app = express();
            
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(cors());

            app.get("/", (rec, res) => {
                res.send("hello word")
            });

            app.use("/user", userRoute);
            app.use("/project", projectRoute);

            resolve(app);
        });
    });
    return promise;
};

export default initApp;