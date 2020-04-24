import { SUCCESS_MESSAGE_SEND, sendMessage } from "../store/actions/messages_actions" ;
import chatReducer from '../store/reducers/chats_reducer';
import { Types } from 'mongoose';

import botData from './botData.json';
const randomBotData = () => Math.floor(Math.random() * botData.emoji.length);
const randomBotEmoj = () => String.fromCodePoint(botData.emoji[randomBotData()]);
const randomBotMsg = () => botData.msg[randomBotData()];

export default store => next => action => {
  switch (action.type) {
    case SUCCESS_MESSAGE_SEND:
      const chat = store.getState().chatsReducer.chats[action.payload.chat];
      if(action.payload.sender !== chat.bot) {
        setTimeout(() => {
          store.dispatch (
            sendMessage(
              new (Types.ObjectId),
              action.payload.chat,
              chat.bot,
              `${randomBotEmoj()} ${randomBotMsg()}`
            )
          )
        }, 500);
      };
  };
  return next(action);
};