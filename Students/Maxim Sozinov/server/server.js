const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');

const config = require('./config.json');

mongoose.connect( "mongodb://localhost:27017", config)
   .then ( () => { console.log('connected to DB'); } )
   .catch ( err => { console.log(err); } );

const app = express();

app.use(express.json());
// app.use(express.static(path.resolve(__dirname, 'dist')));

// app.use('/', Router);

const Message = require('./models/Message');
const Chat = require('./models/Chat');

app.post ('/message', async (req, res) => {
   const message = new Message (req.body);
   const newMessage = await message.save();
   res.send(newMessage);
});

app.get('/messages', async (req, res) => {
   const messages = await Message.find();
   res.json(messages);
});

app.post('/chat', async (req, res) => {
   const chat = new Chat (req.body);
   const newChat = await chat.save();
   res.send(newChat);
});

app.get('/chats', async (req, res) => {
   const chats = await Chat.find();
   res.json(chats);
});

app.listen(3300, () => {
    console.log('Server listening at port 3300...', new Date());
});