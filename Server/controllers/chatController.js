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

const createDescription = async (rawDescription) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = rawDescription;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: 'system', content: `you are a smart engine to create the best looking project description based on a prompt, 
                        do this in one paragraph and make it look professional and appealing to the user.
                    ` },
                { role: 'user', content: prompt },
            ],
            temperature: 1,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        return response.choices[0].message.content;
    }
    catch (error) {
        console.log(error);
    }
}

export default { createChat, createDescription };