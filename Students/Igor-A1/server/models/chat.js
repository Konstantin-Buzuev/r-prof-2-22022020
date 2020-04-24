const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  bot: {
    type: String,
    required: true
  }
});

const collectionName = 'chats';
const model = mongoose.model('Chat', ChatSchema, collectionName);
const defaultChatId = '5e736fcf7d35460190d8b1d4';

module.exports = { model, collectionName, defaultChatId };
