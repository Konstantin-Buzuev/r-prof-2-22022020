console.log('---> wait, please: lo-o-ong api server initialization on first run...')

const express = require('express')
const api = express()
const bodyParser = require('body-parser')

api.use(bodyParser.json())
api.use(express.urlencoded({extended: true}))

const config = require('./config')
const mongoose = require('mongoose')
const Chat = require('./models/chat');
const Msg = require('./models/msg');

const connString = `mongodb+srv://${config.db.user}:${config.db.password}@` +
  `${config.db.cluster}-7ykbr.mongodb.net/${config.db.db}?retryWrites=true&w=majority`

const connOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }

mongoose.connection.on('connected', () => {  
  console.log('---> mongoose default connection opened.')
}) 
mongoose.connection.on('error', e => {  
  console.log(`-!!!- mongoose default connection error: ${e}`)
}) 
mongoose.connection.on('disconnected', () => {  
  console.log('<--- mongoose default connection disconnected.')
})
process.on('SIGTERM', () => {  
  mongoose.connection.close(() => { 
    console.log('<--- SIGTERM: mongoose default connection disconnected through api termination.')
    process.exit(0)
  })
})
process.on('SIGINT', () => {  
  mongoose.connection.close(() => { 
    console.log('<--- SIGINT: mongoose default connection disconnected.')
    process.exit(0)
  })
})
process.on('SIGKILL', () => {  
  mongoose.connection.close(() => { 
    console.log('<--- SIGKILL: mongoose default connection disconnected.')
    process.exit(0)
  })
})

async function startBackend() {
  const backend = mongoose.connect(connString, connOpts)
  
  await backend
    .then(() => {
      console.log('---> connected to mongoose database.');
      
      // REST :: CRUD :: CREATE
      api.post('/chat', async (req, res) => {
        console.log(`-----> creating a new chat "${req.body.title}"`);
        const newChat = new Chat.model({
          _id: req.body._id,
          title: req.body.title,
          user: req.body.user,
          bot: req.body.bot
        });

        await newChat.save()
        .then(doc => res.json(
          {
            success: true,
            chat: doc
          })
        )
        .catch(e => {
          console.log('!!! ERROR: New chat not saved:', e);
          res.status(404).send(
            {
              success: false,
              message: 'ошибка при сохранении нового чата, вернитесь и повторите попытку'
            })
        });
      });
      
      api.post('/msg', async (req, res) => {
        console.log(`-----> adding a new message by "${req.body.sender}"`);
        const newMsg = new Msg.model({
          _id: req.body._id,
          chat: req.body.chat,
          sender: req.body.sender,
          text: req.body.text
        })

        await newMsg.save()
        .then(doc => res.json(
          {
            success: true,
            msg: doc
          })
        )
        .catch(e => {
          console.log('!!! ERROR: New msg not saved:', e)
          res.status(404).send(
            {
              success: false,
              message: 'ошибка при сохранении нового сообщения, вернитесь и повторите попытку'
            })
        })
      });
      
      // REST :: CRUD :: READ
      api.get('/chats', async (req, res) => {
        console.log(`<----- reading a chats list`);
        await Chat.model.find()
        .then(docs => res.json(
          {
            success: true, 
            chats: docs ? docs : []
          })
        )
        .catch(e => {
          console.log('!!! ERROR: Chats not found:', e)
          res.status(404).send(
            {
              success: false,
              message: 'ошибка при получении списка чатов, вернитесь и повторите попытку'
            })
        })
      });

      api.get('/chat/:id', async (req, res) => {
        console.log(`<----- reading all messages of single chat`);
        let filter = {}
        if(req.params.id) filter._id = req.params.id
        await Chat.model.findOne(filter)
        .then(doc => res.json(
          {
            success: true, 
            chat: doc ? doc : []
          })
        )
        .catch(e => {
          console.log('!!! ERROR: Chat not found:', e)
          res.status(404).send(
            {
              success: false,
              message: 'ошибка при получении свойств чата, вернитесь и повторите попытку'
            })
        })
      });

      api.get('/msgs', async (req, res) => {
        console.log(`<----- reading a last 100 messages`);
        await Msg.model.find().sort({date: -1}).limit(100).sort({date: 1})
        .then(docs => res.json(
          {
            success: true, 
            msgs: docs ? docs : []
          })
        )
        .catch(e => {
          console.log('!!! ERROR: Msgs not found:', e)
          res.status(404).send(
            {
              success: false,
              message: 'ошибка при получении полного списка сообщений, вернитесь и повторите попытку'
            })
        })
      });

      api.get('/msgs/:id', async (req, res) => {
        console.log(`<----- reading a last 50 messages of single chat`);
        let filter = {}
        if(req.params.id) filter.chat = req.params.id
        await Msg.model.find(filter).sort({date: -1}).limit(50).sort({date: 1})
        .then(doc => res.json(
          {
            success: true, 
            msgs: doc ? doc : []
          })
        )
        .catch(e => {
          console.log('!!! ERROR: Msgs not found:', e)
          res.status(404).send(
            {
              success: false,
              message: 'ошибка при получении списка сообщений чата, вернитесь и повторите попытку'
            })
        })
      });

      // REST :: CRUD :: DELETE
      api.delete('/chat/:id', async (req, res) => {
        console.log(`-----> deleting a single chat`);
        // TODO: Firstly need deleting messages of this chat!
        if(!req.params.id) {
          res.status(403).send(
            {
              success: false,
              message: 'идентификатор чата отсутствует?'
            }
          )
        } else {
          await Chat.model.deleteOne({_id: req.params.id})
          .then(status => res.json(
            {
              success: true,
              status: status
            })
          )
          .catch(e => {
            console.log(`!!! ERROR: Chat._id ${req.params.id} not removed:`, e)
            res.status(404).send(
              {
                success: false,
                message: 'ошибка при удалении чата, вернитесь и повторите попытку'
              })
          })
        }
      });

      api.delete('/msg/:id', async (req, res) => {
        console.log(`-----> deleting a single message`);
        if(!req.params.id) {
          res.status(403).send(
            {
              success: false,
              message: 'идентификатор сообщения отсутствует?'
            }
          )
        } else {
          await Msg.model.deleteOne({_id: req.params.id})
          .then(status => res.json(
            {
              success: true,
              status: status
            })
          )
          .catch(e => {
            console.log(`!!! ERROR: Msg._id ${req.params.id} not removed:`, e)
            res.status(404).send(
              {
                success: false,
                message: 'ошибка при удалении сообщения, вернитесь и повторите попытку'
              })
          })
        }
      });

      api.listen(config.serve.port, () =>
        console.log(`---> [${new Date().toLocaleTimeString()}]` +
          ` backend started on "${config.serve.url}:${config.serve.port}"`)
      )
    })
    .catch(e => {
      console.log('!!! ERROR on backend starting:', e)
      mongoose.connection.close(() => { 
        console.log('<--- mongoose connection closed.')
        process.exit(0)
      })
    })
}

startBackend()
