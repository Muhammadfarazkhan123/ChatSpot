import {ALL_USERS, USERS_SEARCH,MODAL_ARR} from '../Actions/type';
const InitialState = {
  UsersDetail: [],
  searchArr: [],
  modalArr:[]
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case ALL_USERS: {
      return {...state, UsersDetail: action.UsersDetail};
    }

    case USERS_SEARCH: {
      return {...state, searchArr: action.searchArr};
    }
    case MODAL_ARR: {
      return {...state, modalArr: action.modalArr};
    }

    default: {
      return state;
    }
  }
};

export default reducer;
