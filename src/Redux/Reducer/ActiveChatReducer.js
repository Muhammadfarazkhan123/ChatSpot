const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'ACTIVE_CHAT': {
      return {...state, ChatUser: action.ChatUser};
    }

    default: {
      return state;
    }
  }
};

export default reducer;
