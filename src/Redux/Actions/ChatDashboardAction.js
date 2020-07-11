import firestore from '@react-native-firebase/firestore';
import store from '../store';
import {
  USER_DATA,
  CHAT_USER,
  GROUP_USER,
  GROUP_NAME,
  GROUP_IMG,
  GROUP_ARR,
  SHOW_MODAL,
  SHOW_LOTIE,
  SHOW_LOADER
} from './type';
import storage from '@react-native-firebase/storage';
import {ActiveChat} from './ActiveChatAction';
import { SET_ISGROUP } from "./GroupAction";
import { SET_ALLUSERS_SEARCH } from "./AllUserAction";

export const ChatDashboard = () => {
  const UserUid = store?.getState()?.UserReducer?.user?.uid;
  return dispatch => {
    let UsersDetail = store?.getState()?.ChatDashboardReducer?.usersDetail;
    let ChatUser = store?.getState()?.ChatDashboardReducer?.chatUser;
    let GroupUser = store?.getState()?.ChatDashboardReducer?.GroupUser;
    console.log(UserUid,"userUid")
    console.log(store?.getState()?.UserReducer?.user,"userUid data")

    // const UsersArray = [];
    firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        UsersDetail = [];
        querySnapshot.forEach(UsersData => {
          if (UsersData.data().UserUid != UserUid) {
            UsersDetail.push(UsersData.data());
            dispatch(USER_DETAIL(UsersDetail));
          }
        });
      });
    firestore()
      .collection('Users')
      .doc(UserUid)
      .onSnapshot(UserData => {
        ChatUser = [];
        GroupUser = [];
        UserData?.data()?.ChatId?.map(value => {
          console.log(value, 'value');
          if (value.hasOwnProperty('MemberUid')) {
            ChatUser.push(value);
            dispatch(SET_CHAT_USER(ChatUser));
          } else if (!value.hasOwnProperty('MemberUid')) {
            firestore()
              .collection('Users')
              .doc(value.Uid)
              .onSnapshot(Detail => {
                ChatUser.push(Detail.data());
                dispatch(SET_CHAT_USER(ChatUser));
              });
          }
        });
      });
  };
};

export const GroupCreate = props => {
  const {AllUsersReducer,ChatDashboardReducer}=store.getState()
  const states = store.getState().ChatDashboardReducer;
  const SearchArray=AllUsersReducer?.searchArr;
  return async dispatch => {
    if (states.groupName != '') {
      const reference = storage().ref('Images/' + new Date().getTime());
      await reference.putFile(states.imageUrl.uri);
      const url = await reference.getDownloadURL();
      console.log(url, 'url');

      const UserUid = store?.getState()?.UserReducer?.user?.uid;
      let UidArr = [UserUid];

      const PushKey = await firestore()
        .collection('chat')
        .doc().id;
        const GroupMem=SearchArray.filter(memb=>memb.isSelected)
        GroupMem.map(v => {
        UidArr.push(v.UserUid);
      });
      console.log(UidArr, 'uidarr');
      GroupMem.map(val => {
        firestore()
          .collection('Users')
          .doc(val.UserUid)
          .update({
            ChatId: firestore.FieldValue.arrayUnion({
              groupName: states.groupName,
              GroupImage: url,
              CreatorUid: UserUid,
              MemberUid: UidArr,
              ChatKey: PushKey,
              Istyping: false,
            }),
          });
        })  
        firestore()
          .collection('Users')
          .doc(UserUid)
          .update({
            ChatId: firestore.FieldValue.arrayUnion({
              groupName: states.groupName,
              GroupImage: url,
              CreatorUid: UserUid,
              MemberUid: UidArr,
              ChatKey: PushKey,
              Istyping: false,
            }),
          }).then(getData=>{
            const GroupObj={
              groupName: states.groupName,
              GroupImage: url,
              CreatorUid: UserUid,
              MemberUid: UidArr,
              ChatKey: PushKey,
              Istyping: false,
            }
            const isSelectedItem=SearchArray.filter(val=>val.isSelected)
            isSelectedItem.map(item=>{
              item.isSelected=false
              store.dispatch(SET_ALLUSERS_SEARCH(SearchArray));

            })
            dispatch(SET_SHOW_LOADER(false))
            dispatch(SET_SHOW_LOTTIE(true))
            
            dispatch(ActiveChat(GroupObj));
            dispatch(SET_ISGROUP(true));

          }
            
          )
    } else {
      alert('please enter group name');
    }
  };
};

export const GroupSelection=(index)=>{
  return dispatch=>{
    const {AllUsersReducer,ChatDashboardReducer}=store.getState()
  const SearchArray=AllUsersReducer?.searchArr;
  const arr = AllUsersReducer?.searchArr[index]; 

  const isSelectedItem=SearchArray.filter(val=>val.isSelected).length
  if(isSelectedItem >=3 && !arr.isSelected){
    alert("you already selected 3 participants")
  }else{
    arr.isSelected = !arr.isSelected;
  store.dispatch(SET_ALLUSERS_SEARCH(SearchArray));
  }
 
  }
}

const USER_DETAIL = usersDetail => {
  return {
    type: USER_DATA,
    usersDetail,
  };
};

const SET_CHAT_USER = chatUser => {
  return {
    type: CHAT_USER,
    chatUser,
  };
};
export const SET_GROUP_NAME = groupName => {
  return {
    type: GROUP_NAME,
    groupName,
  };
};

export const SET_GROUP_IMAGE = imageUrl => {
  return {
    type: GROUP_IMG,
    imageUrl,
  };
};

export const SET_SHOW_MODAL=showModal=>{
  return{
    type:SHOW_MODAL,
    showModal
  }
}

export const SET_SHOW_LOTTIE=showLottie=>{
  return{
    type:SHOW_LOTIE,
    showLottie
  }
}

export const SET_SHOW_LOADER=showLoader=>{
  return{
    type:SHOW_LOADER,
    showLoader
  }
}
