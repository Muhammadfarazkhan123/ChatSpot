import firestore from '@react-native-firebase/firestore';
import store from '../../Redux/store';
import { ALL_USERS, USERS_SEARCH,MODAL_ARR } from './type';

export const AllUserAction = () => {
  let UsersDetail = store?.getState()?.AllUsersReducer?.UsersDetail;
  let SearchArr = store?.getState()?.AllUsersReducer?.searchArr;
  let modalArr = store?.getState()?.AllUsersReducer?.modalArr;
  const UserUid = store?.getState()?.UserReducer?.user?.uid;

  return dispatch => {
    firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        UsersDetail = [];
        SearchArr = [];
        modalArr=[]
        // console.log(querySnapshot,"querySnapshot")
        querySnapshot?.forEach(UsersData => {
          // console.log(console.log(UsersData))
          if (UsersData.data().UserUid != UserUid) {
            UsersDetail.push(UsersData.data());
            SearchArr.push(UsersData.data());
            modalArr.push(UsersData.data());
          }
        });
        dispatch(SET_ALLUSERS(UsersDetail));
        dispatch(SET_ALLUSERS_SEARCH(SearchArr));
        dispatch(SET_MODAL_SEARCH(modalArr))
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
export const SET_MODAL_SEARCH = modalArr => {
  return {
    type: MODAL_ARR,
    modalArr,
  };
};