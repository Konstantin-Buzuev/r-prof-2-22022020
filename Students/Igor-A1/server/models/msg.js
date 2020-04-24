const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MsgSchema = new Schema({
  _id: Schema.Types.ObjectId,
  chat: { 
      type: Schema.Types.ObjectId, 
      required: true,
      ref: 'Chat'
  },
  sender: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const collectionName = 'msgs';
const model = mongoose.model('Msg', MsgSchema, collectionName);

module.exports = { model, collectionName };
