const Chat = require('../Models/chat')

module.exports = {
    async create(req, res) {
        try {
            const { title } = req.body
            const newChat = await Chat.create({
                title
            })
            res.json({_id: newChat._id})
        }
        catch {
              res.json({status: false})  
        }
    },
    async load(req, res) {
        let chats = await Chat.find()
        res.json(chats)
    }
}