const express = require("express");
const mongoose = require("mongoose");

const Message = require("./models/message.js");

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/reactgram-v2', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to database reactgram-v2")
    })
    .catch(() => {
        console.log("Connect to database reactgram-v2 failed")
    })

app.post('/message', async (req, res) => {
    console.log(req.body)
    let message = new Message(req.body)
    await message.save();
    res.json(message)
})
app.get('/messages', async (req, res) => {
    const messages = await Message.find()
    res.json(messages)
})


app.listen(3300, () => {
    console.log("Server listening 3300...");
});