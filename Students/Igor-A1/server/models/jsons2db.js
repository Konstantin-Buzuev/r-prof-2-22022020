console.log('---> starting');

const mongoose = require('mongoose');
const config = require('../config.json');

const Chat = require('./chat');
const chatsData = require('./chats.json');

const Msg = require('./msg');
const msgsData = require('./msgs.json');


const connString = `mongodb+srv://${config.db.user}:${config.db.password}@` +
  `${config.db.cluster}-7ykbr.mongodb.net/${config.db.db}?retryWrites=true&w=majority`;
  
const connOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};
    
mongoose.connection.on('connected', () => {  
  console.log('---> mongoose default connection opened.');
});
mongoose.connection.on('error', e => {  
  console.log(`-!!!- mongoose default connection error: ${e}`);
});
mongoose.connection.on('disconnected', () => {  
  console.log('<--- mongoose default connection disconnected.');
});
process.on('SIGINT', () => {  
  mongoose.connection.close(() => { 
    console.log('<--- SIGINT: mongoose default connection disconnected through app termination.');
    process.exit(0);
  });
});

async function dropCollection(name) {
  await mongoose.connection.dropCollection(name)
  .then(res => {
    console.log(`---> result of drop collection '${name}': `, res);
  })
  .catch(e => {
    console.log(`!!! ERROR on drop collection '${name}': `, e);
  });
};

async function insertChats() {
  await Chat.model.insertMany(chatsData)
  .then(docs => {
    console.log('---> ' + docs.length + ' chats items inserted')
  })
  .catch(e => {
    console.log('!!! ERROR on insert chat items: ', e)
  })
};

async function insertMsgs() {
  await Msg.model.insertMany(msgsData)
  .then(docs => {
    console.log('---> ' + docs.length + ' msg items inserted')
  })
  .catch(e => {
    console.log('!!! ERROR on insert msg items: ', e)
  })
};

///////////////////////////////////////////////////////
;(async () => {  
  let connected = true;
  await mongoose.connect(connString, connOpts)
  .catch(e => {
    console.log('!!! ERROR on connect:', e);
    connected = false;
  });
  
  if(connected) {
    console.log('---+++---');
    
    await dropCollection(Msg.collectionName);
    //await dropCollection(Chat.collectionName);
    
    //await insertChats();
    await insertMsgs();
    
    await mongoose.connection.close()
    console.log('---+++---');
  };
})();

console.log('<--- done')
