const mong = require('mongoose')
const Schema = mong.Schema

const chatSchema = new Schema({
    title: { type: String, required: true }
})

module.exports = mong.model('chat', chatSchema)
