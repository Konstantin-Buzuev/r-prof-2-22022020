const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const Message = require('./models/Message.js')
const Chat = require('./models/Chat.js')
const User = require('./models/User.js')

const app = express()

// Middlewares
app.use(express.json({ extended: true }))
app.use('/auth', require('./routes/auth.routes.js'))

const PORT = config.get('port') || 3300

async function start() {
   try {
      await mongoose.connect(config.get('mongoUri'), {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false,
         useCreateIndex: true
      })
      app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
   } catch (e) {
      console.log('Server Error:', e.message)
      process.exit(1)
   }
}

start()



// API for messages
app.get('/messages', async (req, res) => {
   const messages = await Message.find()
   res.json(messages)
})

app.post('/message', async (req, res) => {
   let message = new Message (req.body)
   message = await message.save()
   res.json(message)
})


// API for chats
app.get('/chats', async(req, res) => {
   const chats = await Chat.find()
   res.json(chats)
})

app.post('/chat', async (req, res) => {
   let chat = new Chat (req.body)
   chat = await chat.save()
   res.json(chat)
})

app.delete('/chat', async (req, res) => {
   await Chat.findOneAndDelete({ _id: req.body.chatId })
   await Message.deleteMany({ chatId: req.body.chatId })
   res.json({ _id: req.body.chatId })
})


// API for contacts
app.get('/users', async (req, res) => {
   const users = await User.find()
   res.json(users)
})