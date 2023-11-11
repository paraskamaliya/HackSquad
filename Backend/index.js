const express = require("express");
const app = express();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/start", async (req, res) => {
    try {
        const title = "Amazing Video Title";
        const description = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: 'user',
                    content: `Come up with a description for a YouTube video called ${title}`
                }
            ],
            max_tokens: 100
        });
        console.log(description.data.choices[0].content);
        res.send("Hi");
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(8000, () => {
    console.log("connected to server")
});