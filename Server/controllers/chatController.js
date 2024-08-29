import OpenAI from "openai";
import env from "dotenv";

env.config();


const createChat = async (req, res) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = req.prompt;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: 'system', content: `you are a smart engine to search best fitting projects to user query` },
                { role: 'user', content: prompt },
            ],
            temperature: 1,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        req.response = response.choices[0].message.content;
        res.status(200).send(req.response);
    }
    catch (error) {
        console.log(error);
    }

}

export default { createChat };