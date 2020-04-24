import update from 'react-addons-update'

import { SUCCESS_MESSAGES_LOADING,
         SUCCESS_MESSAGE_SENDING } from '../actions/messages_action.js'
import { SUCCESS_CHATS_LOADING, 
         SUCCESS_CHAT_CREATING, 
         SUCCESS_CHAT_DELETING } from '../actions/chats_action.js'

const initialStore = {
   chatRooms: {},
   isLoading: true,
}

export default function chatReducer (store = initialStore, action) {
   switch (action.type) {
      
      // Load data cases
      case SUCCESS_CHATS_LOADING: {
         const chatRooms = {}
         action.payload.forEach(chat => {
            const { _id, title, messageList } = chat
            chatRooms[_id] = { title, messageList }
         })
         return update(store, {
            chatRooms: { $set: chatRooms },
         })
      }
      case SUCCESS_MESSAGES_LOADING: {
         const chatRooms = {...store.chatRooms}
         action.payload.forEach(msg => {
            chatRooms[msg.chatId].messageList.push(msg)
         })
         return update(store, {
            chatRooms: { $set: chatRooms },
            isLoading: { $set: false }
         })
      }

      // Change data cases
      case SUCCESS_CHAT_CREATING: {
         const { _id, title, messageList } = action.payload
         return update(store, {
            chatRooms: {
               $merge: { [_id]: { title, messageList } }
            }
         })
      }
      case SUCCESS_CHAT_DELETING: {
         const chatRooms = {...store.chatRooms}
         delete chatRooms[action.payload._id]
         return update(store, {
            chatRooms: { $set: chatRooms }
         })
      }
      case SUCCESS_MESSAGE_SENDING: {
         const { chatId } = action.payload
         return update(store, {
            chatRooms: {
               $merge: { [chatId]: { title: store.chatRooms[chatId].title, 
                  messageList: [...store.chatRooms[chatId].messageList, action.payload] } }
            }
         })
      }
      default:
         return store
   }
}