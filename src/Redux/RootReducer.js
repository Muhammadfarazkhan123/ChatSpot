import {combineReducers} from 'redux';
import AuthReducer from './Reducer/AuthReducer';
import UserReducer from './Reducer/UserReducer';
import ActiveChatReducer from './Reducer/ActiveChatReducer';
import ChatBoxReducer from './Reducer/ChatBoxReducer';
import ChatDashboardReducer from './Reducer/ChatDashboardreducer';
import AllUsersReducer from './Reducer/AllUserReducer';
import GroupReducer from './Reducer/GroupReducer';

export default combineReducers({
  AuthReducer,
  UserReducer,
  ActiveChatReducer,
  ChatBoxReducer,
  ChatDashboardReducer,
  AllUsersReducer,
  GroupReducer,
});
