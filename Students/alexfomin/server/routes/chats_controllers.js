const express = require('express');
const chatRouter = express.Router();

const Chat = require('../models/chat')

chatRouter.get('/chats', async (req, res) => {
    let chats = await Chat.find().sort({'created_at': "asc"}) 
    res.json(chats)
} )

chatRouter.post('/chat', async (req, res) => {
    console.log(req.body)
    try {
        const { title, creator } = req.body
        const newMsg = await Chat.create({
            title, creator
        })
        res.json({_id: newMsg._id})
    }
    catch {
          res.json({status: false})  
    }

} )

chatRouter.delete('/chat/:id', async (req, res) => {
 //   console.log(req.params.id)
    try {
        const _id = req.params.id
        const newMsg = await Chat.deleteOne({'_id': _id})
        res.json({status: true})
    }
    catch {
          res.json({status: false})  
    }
    
} )

module.exports = chatRouter