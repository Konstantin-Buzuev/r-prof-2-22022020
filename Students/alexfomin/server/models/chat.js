const mong = require('mongoose')
const timestamps = require('mongoose-unix-timestamp')
const Schema = mong.Schema

const chatSchema = new Schema({
    title: { type: String, required: true },
    _creatorId:{ type: String },
    members: { type: Array }
})
chatSchema.plugin(timestamps)

module.exports = mong.model('chat', chatSchema)