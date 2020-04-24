const mong = require('mongoose')
const timestamps = require('mongoose-unix-timestamp')
const Schema = mong.Schema

const messageSchema = new Schema({
    sender: { type: String, required: true },
    text: { type: String, required: true },
    messageTime: { type: Date },
    chatId: { type: Number, required: true }
})
messageSchema.plugin(timestamps)

module.exports = mong.model('message', messageSchema)