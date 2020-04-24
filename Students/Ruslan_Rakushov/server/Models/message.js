const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: { type: String, required: true },
  text: { type: String, required: true },
  chatId: { type: String, required: true },
});

module.exports = mongoose.model('message', messageSchema);
