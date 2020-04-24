import update from 'immutability-helper';
import {
  SET_USER_DATA,
  START_PROFILE_LOADING, SUCCESS_PROFILE_LOADING, ERROR_PROFILE_LOADING,
} from '../actions/profileActions';

const initialStore = {
  profile: {
    // userName: '',
    // userEmail: '',
    // userAge: 0,
  }
};

export default function profileReducer(store = initialStore, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return update(store, {
        profile: { $merge: {
          userName: action.userName,
          userEmail: action.userEmail,
          userAge: +action.userAge,
        }}
      });
    
    case START_PROFILE_LOADING:
      return store;
    
    case SUCCESS_PROFILE_LOADING:
      return update(store, {
        profile: { $set: action.payload.profile }
      });
    
    case ERROR_PROFILE_LOADING:
      return store;
  
    default:
      return store;
  }
}