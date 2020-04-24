const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema ({
   sender: { type: String, required: true },
   text: { type: String, required: true },
   messageId: { type: String, default: Date.now },
   chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
})

module.exports = mongoose.model('Message', messageSchema)