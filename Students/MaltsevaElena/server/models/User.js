const { Schema, model, Types } = require('mongoose')

const userSchema = new Schema({
   userName: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   chats: [{ type: Types.ObjectId, ref: 'Chat' }]
})

module.exports = model('User', userSchema)