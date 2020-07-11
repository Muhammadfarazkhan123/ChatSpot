import firestore from '@react-native-firebase/firestore';
import store from '../../Redux/store';
import { ALL_USERS, USERS_SEARCH } from './type';

export const AllUserAction = () => {
  let UsersDetail = store?.getState()?.AllUsersReducer?.UsersDetail;
  let SearchArr = store?.getState()?.AllUsersReducer?.searchArr;
  const UserUid = store?.getState()?.UserReducer?.user?.uid;

  return dispatch => {
    firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        UsersDetail = [];
        SearchArr = [];
        querySnapshot.forEach(UsersData => {

          if (UsersData.data().UserUid != UserUid) {
            UsersDetail.push(UsersData.data());
            SearchArr.push(UsersData.data());
            dispatch(SET_ALLUSERS(UsersDetail));
            dispatch(SET_ALLUSERS_SEARCH(SearchArr));
          }
        });
      });
  };
};

const SET_ALLUSERS = UsersDetail => {
  return {
    type: ALL_USERS,
    UsersDetail,
  };
};

export const SET_ALLUSERS_SEARCH = searchArr => {
  return {
    type: USERS_SEARCH,
    searchArr,
  };
};
