
const express = require('express');
const cors = require('cors');
const ChatGPT = require('./chatgpt');
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(express.urlencoded())
const PORT = process.env.PORT ?? 3000;
app.use(cors())
app.get('/', (req, res) => {
    res.json({ message: 'success' })
});

app.post('/chat', async (req, res) => {
    try {
        // return res.json({ message: 'thanks' })
        const messages = req.body.messages.map((message) => {
            return { role: message.role, content: message.content ?? '' }
        })
        const chatGpt = new ChatGPT()
        const output = await chatGpt.send(messages)
        res.json({ message: output })
    } catch (error) {
        res.status(500).send({ error })
    }
})

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    } else {
        console.log("Error occurred, server can't start", error);
    }
});