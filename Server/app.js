// main imports
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import env from "dotenv";
import cors from "cors";
import path from "path";

// routes
import userRoute from "./routes/userRoute.js";
import projectRoute from "./routes/projectRoute.js";
import chatRoute from "./routes/chatRoutes.js";
import delleRoute from "./routes/delleRoute.js";

env.config();

const initApp = () => {
    const promise = new Promise((resolve) => {

        const db = mongoose.connection;
        const imagesPath = path.resolve(process.cwd(), `./public/images`);
        const uploadsPath = path.resolve(process.cwd(), `./public/uploads`);


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
            app.use("/api", chatRoute);
            app.use("/api", delleRoute);
            app.use(express.static(imagesPath + "/"));
            app.use("/uploads",express.static(uploadsPath + "/"));

            resolve(app);
        });
    });
    return promise;
};

export default initApp;