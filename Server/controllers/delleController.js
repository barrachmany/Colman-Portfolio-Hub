import OpenAI from "openai";
import env from "dotenv";
import axios from "axios";
import fs from "fs";
import path from "path";
import sharp from "sharp";

env.config();


const downloadImage = async (imageUrl, filePath) => {
    const writer = fs.createWriteStream(filePath);

    const response = await axios({
        url: imageUrl,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
};

const createDellE = async (req, res) => {

    console.log("Dall-E");

    const projectDescription = req.body.description;
    const projectName = req.body.name;
    const filePath = path.resolve(process.cwd(), `./public/images/${projectName}.jpg`);
    console.log(filePath);

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY, //change key
    });


    const image = await openai.images.generate({
        model: "dall-e-3",
        prompt: `A background for a web page that descrive my project which is about ${projectDescription}
         and it should include the name of the project which is ${projectName}`,
        n: 1,
        size: "1024x1024",
        quality: "hd",
        style: "vivid"
    });

    await downloadImage(image.data[0].url, filePath);

    console.log(`Image saved to ${filePath}`);

    res.status(200).send(image.data[0].url);
}

const regenateImage = async (req, res) => {
    const projectName = req.body.name;
    const projectDescription = req.body.description;
    const filePath = path.resolve(process.cwd(), `./public/images/${projectName}.jpg`);

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const image = await openai.images.generate({
        model: "dall-e-3",
        prompt: `A background for a web page that descrive my project which is about ${projectDescription}
         and it should include the name of the project which is ${projectName}`,
        n: 1,
        size: "1024x1024",
        quality: "hd",
        style: "vivid"
    });

    await downloadImage(image.data[0].url, filePath);

    console.log(`Image saved to ${filePath}`);

    res.status(200).send(image.data[0].url);
}

export default { createDellE, regenateImage };