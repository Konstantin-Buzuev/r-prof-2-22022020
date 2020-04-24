const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   // chatId: {
   //    type: Number,
   //    required: true
   // },
});

module.exports = mongoose.model('chat', chatSchema);