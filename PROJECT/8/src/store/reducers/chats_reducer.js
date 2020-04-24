import update from 'react-addons-update'
//import ACTIONS
import { SUCCESS_CHAT_CREATE, SUCCESS_CHATS_LOADING, START_CHAT_CREATE, ERROR_CHAT_CREATE } from '../actions/chats_actions.js'

let initialStore = {
    chats: {}
}

export default function chatReducer(store = initialStore, action) {
    switch(action.type) {
        case SUCCESS_CHAT_CREATE: {
            let chatId = action.payload.json._id
            let title = action.payload.title

            return update(store, {
                chats: { 
                    $merge: { 
                        [chatId]: { 
                            title: title, 
                            //messagesList: []
                        } 
                    } 
                }
            });
        }
        
        case SUCCESS_CHATS_LOADING: {
            let dto = action.payload
            let chats = {}

            dto.forEach(d => {
                chats[d._id] = {title: d.title}
            })

            return update(store, {
                chats: { $set: chats }
            })
        }
        default: {
            return store
        }
    }
}