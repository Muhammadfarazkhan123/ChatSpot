import {
  FIRST_CHAT,
  NEW_CHAT,
  MSG_ARR,
  KEY,
  MESSAGE,
  IS_TYPING,
} from '../Actions/type';
const InitialState = {
  firstChat: false,
  newChat: false,
  MsgArr: [],
  typing: false,
  message:""
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case FIRST_CHAT: {
      return {...state, firstChat: action.firstChat};
    }
    case NEW_CHAT: {
      return {...state, newChat: action.newChat};
    }
    case MSG_ARR: {
      return {...state, MsgArr: action.MsgArr};
    }
    case KEY: {
      return {...state, key: action.key};
    }
    case MESSAGE: {
      return {...state, message: action.message};
    }

    case IS_TYPING: {
      return {...state, typing: action.typing};
    }
    default: {
      return state;
    }
  }
};

export default reducer;
