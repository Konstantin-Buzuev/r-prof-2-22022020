const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
   sender: {
      type: String,
      required: true
   },
   text: {
      type: String,
      required: true
   },
   // messageId: {
   //    type: String,
   //    required: true,
   //    default: "timestamp"
   // },
   chatId: {
      type: String,
      required: true
   },
});

module.exports = mongoose.model('message', messageSchema);