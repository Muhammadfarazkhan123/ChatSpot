import {ALL_USERS, USERS_SEARCH} from '../Actions/type';
const InitialState = {
  UsersDetail: [],
  searchArr: [],
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case ALL_USERS: {
      return {...state, UsersDetail: action.UsersDetail};
    }

    case USERS_SEARCH: {
      return {...state, searchArr: action.searchArr};
    }

    default: {
      return state;
    }
  }
};

export default reducer;
