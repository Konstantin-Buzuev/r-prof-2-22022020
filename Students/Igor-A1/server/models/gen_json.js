console.log('---> starting...');

const chats = [
  {
    title:  'Чат 1',
    user:   'Я',
    bot:    'робот'
  },
  {
    title:  'Chat 2',
    user:   'Me',
    bot:    'bot'
  },
  {
    title:  'Курам на смех!',
    user:   'Васисуалий Пупкин-Таврический',
    bot:    'конь-голова'
  }
];
    
const msgs = [
  {
    chat:  0,
    sender: 'Darth Vader',
    text:   'Hallo'
  },
  {
    chat:  0,
    sender: 'Luke',
    text:   'Who are you?'
  },
  {
    chat:  0,
    sender: 'Darth Vader',
    text:   'I am your father'
  },
  {
    chat:  0,
    sender: 'Luke',
    text:   'NOOOOOOOOO!'
  },
  {
    chat:  1,
    sender: 'Geek',
    text:   'Превед!'
  },
  {
    chat:  1,
    sender: 'bot',
    text:   'goto null'
  },
  {
    chat:  1,
    sender: 'Geek',
    text:   'Чё ты гонишь?'
  },
  {
    chat:  2,
    sender: 'Администратор',
    text:   'Всем выйти из чата!'
  },
  {
    chat:  2,
    sender: 'SysAdmin',
    text:   'Расслабьтесь, это была шутка юмора.'
  }
];

const mongoose = require('mongoose');

chats.forEach((chat, index) => {
  chat._id = new (mongoose.Types.ObjectId);
  let chatsMsgs = msgs.filter(m => m.chat === index)
  chatsMsgs.forEach(m => {
    m._id = new (mongoose.Types.ObjectId);
    m.chat = chat._id;
  })  
});

const fs = require('fs')
const path = require('path')

fs.writeFile(path.join(__dirname, 'chats.json'), JSON.stringify(chats, null, 2), 
  e => {
    if(e) throw e
    console.log(`chats[${chats.length}] written to file`)
  }
); 

fs.writeFile(path.join(__dirname, 'msgs.json'), JSON.stringify(msgs, null, 2), 
  e => {
    if(e) throw e
    console.log(`msgs[${msgs.length}] written to file`)
  }
); 

console.log('<--- done.');
