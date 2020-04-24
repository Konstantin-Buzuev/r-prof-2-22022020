const express = require('express');
const messageRouter = express.Router();

const Message = require('../models/message')

messageRouter.get('/messages', async (req, res) => {
    let messages = await Message.find().sort({'created_at': "asc"}) 
    res.json(messages)
} )

messageRouter.post('/message', async (req, res) => {
    console.log(req.body)
    try {
        const { chatId, sender, text } = req.body
        const newMsg = await Message.create({
            chatId, sender, text
        })
        res.json({_id: newMsg._id})
    }
    catch {
          res.json({status: false})  
    }

} )

module.exports = messageRouter