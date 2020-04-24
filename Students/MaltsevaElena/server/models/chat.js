const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema ({
   title: { type: String, required: true },
   messageList: {type: Array, default: [] }
})

module.exports = mongoose.model('Chat', chatSchema)