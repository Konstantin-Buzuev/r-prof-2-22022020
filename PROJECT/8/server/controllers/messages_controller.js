const Message = require('../Models/message')

module.exports = {
    async load (req, res) {
        let messages = await Message.find()
        res.json(messages)
    },
    async send (req, res) {
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
    }
}