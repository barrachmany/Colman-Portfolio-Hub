import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import env from "dotenv";
import ChatRoute from "./routes/chatRoutes.js";
import session from "express-session";
import { v4 as uuid } from "uuid";

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
            app.use((req, res, next) => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Methods", "*");
                res.header("Access-Control-Allow-Headers", "*");
                res.header("Access-Control-Allow-Credentials", "true");
                next();
            })

            app.get("/", (rec, res) => {
                res.send("hello word")
            });

            app.use(session({
                genid: (req) => {
                    return uuid();
                },
                secret: process.env.SESSION_SECRET,
                resave: true,
                saveUninitialized: true
            }));
            app.use("/api", ChatRoute);

            resolve(app);
        });
    });
    return promise;
};

export default initApp;