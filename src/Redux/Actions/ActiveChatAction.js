const ActiveChat = ChatUser => {
  return dispatch => {
    dispatch({
      type: 'ACTIVE_CHAT',
      ChatUser,
    });
  };
};

export {ActiveChat};
