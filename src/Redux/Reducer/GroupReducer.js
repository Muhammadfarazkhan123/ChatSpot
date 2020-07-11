import {IS_GROUP} from '../Actions/type';
const InitialState = {
  group: false,
};

const reducer = (state = InitialState, action) => {
  // console.log(action, 'actiongroup');
  switch (action.type) {
    case IS_GROUP: {
      return {...state, group: action.group};
    }

    // case CHAT_USER: {
    //   return {...state, chatUser: action.chatUser};
    // }

    default: {
      return state;
    }
  }
};

export default reducer;
