import OpenAI from "openai";
import env from "dotenv";

env.config();


const createDellE = async (req, res) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY, //change key
    });

    const prompt = req.response;

    try {
        const response = await openai.chat.images.generate(
            model = "dall-e-3",
            prompt = prompt,
            size = "1024x1024",
            quality = "standard",
            n = 1, )
            
            image_url = response.data[0].url; //need to decide if we want to save the image in memory
        }

        // console.log(response.choices[0].message.content);
        
    catch (error) {
        console.log(error);
    }

}

export default { createDellE };