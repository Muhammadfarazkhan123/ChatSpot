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
    // firestore()
    //   .collection('Users')
    //   .get()
    //   .then(querySnapshot => {
    //     UsersDetail = [];
    //     querySnapshot.forEach(UsersData => {
    //       if (UsersData.data().UserUid != UserUid) {
    //         UsersDetail.push(UsersData.data());
    //       }
    //     });
    //     dispatch(USER_DETAIL(UsersDetail));
    //   });
      firestore()
      .collection('Users')
      .doc(UserUid)
      .onSnapshot(async UserData => {
        ChatUser = [];
        GroupUser = [];
        ChatId=UserData?.data()?.ChatId
        // UserData?.data()?.ChatId?.map(value => {
        //   // console.log(value, 'value');
        //   if (value.hasOwnProperty('MemberUid')) {
        //     ChatUser.push(value);
        //     dispatch(SET_CHAT_USER(ChatUser));
        //   } else if (!value.hasOwnProperty('MemberUid')) {
        //     firestore()
        //       .collection('Users')
        //       .doc(value.Uid)
        //       .onSnapshot(Detail => {
        //         // console.log(Detail.data(),"detail on online")
        //         ChatUser.push(Detail.data());
        //     dispatch(SET_CHAT_USER(ChatUser));

        //       });
        //     }
        //     // console.log(ChatUser,"ChatUser")
        //     // dispatch(SET_CHAT_USER(ChatUser));
        //   });

      for (let i = 0; i < ChatId.length; i++) {
          // console.log(ChatId[i], 'value');
          let value=ChatId[i]
        if (value.hasOwnProperty('MemberUid')) {
                ChatUser.push(value);
              } else if (!value.hasOwnProperty('MemberUid')) {
                await firestore()
                .collection('Users')
                .doc(value.Uid)
                .onSnapshot(Detail => {
                  // console.log(Detail.data(),"detail on online")
                  ChatUser.push({...Detail.data()});
                });
              }
            }
            console.log(ChatUser,"chatuser")
            dispatch(SET_CHAT_USER(ChatUser));
          });
  };
};

export const GroupCreate = props => {
  const {AllUsersReducer,ChatDashboardReducer}=store.getState()
  const states = store.getState().ChatDashboardReducer;
  const SearchArray=AllUsersReducer?.searchArr;
  console.log(states.imageUrl)
  return async dispatch => {
    if (states.groupName != '' && states.imageUrl != '') {
    dispatch(SET_SHOW_LOADER(true))

      const reference = storage().ref('Images/' + new Date().getTime());
      await reference.putFile(states.imageUrl);
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
            dispatch(SET_GROUP_IMAGE(""))
            dispatch(ActiveChat(GroupObj));
            dispatch(SET_ISGROUP(true));
            dispatch(SET_SHOW_LOADER(false))
            dispatch(SET_SHOW_LOTTIE(true))
            

          }
            
          )
    } else {
      if(states.groupName === "" && states.imageUrl === ""){
        alert("please select image and enter your group name")
      }
      else if(states.groupName === ""){
        alert('please enter group name');
      }
      else if(states.imageUrl === ""){
        alert('please Select group Image');
      }
      console.log(states.groupName === "" && states.imageUrl === "","check")
      console.log(states,"check state")
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
