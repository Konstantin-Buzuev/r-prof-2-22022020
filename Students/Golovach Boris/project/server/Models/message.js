const mong = require('mongoose')
const Schema = mong.Schema

//let newMsgId = 'MS' + Date.now()
function newMsgId() {
    let Id = 'MS' + Date.now()
    return Id
}
const messageSchema = new Schema({
    sender: { type: String, required: true },
    text: { type: String, required: true },
    messageId: { type: String, required: true, default: newMsgId},
    chatId: { type: String, required: true },
})

module.exports = mong.model('message', messageSchema)
