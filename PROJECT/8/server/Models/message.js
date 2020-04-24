const mong = require('mongoose')
const Schema = mong.Schema

let newMsgId = 'MS' + Date.now()

const messageSchema = new Schema({
    sender: { type: String, required: true },
    text: { type: String, required: true },
    messageId: { type: String, required: true, default: "timestamp"},
    chatId: { type: String, required: true },
})

module.exports = mong.model('message', messageSchema)
