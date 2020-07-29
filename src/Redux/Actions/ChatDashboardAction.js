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
  SHOW_LOADER,
  LAST_MSG,
} from './type';
import storage from '@react-native-firebase/storage';
import {ActiveChat} from './ActiveChatAction';
import {SET_ISGROUP} from './GroupAction';
import {SET_ALLUSERS_SEARCH} from './AllUserAction';
import {SET_MSG_ARR} from './ChatBoxAction';

export const ChatDashboard = () => {
  const UserUid = store?.getState()?.UserReducer?.user?.uid;
  return dispatch => {
     firestore()
      .collection('Users')
      .doc(UserUid)
      .onSnapshot(ChatDetail => {
        // console.log(ChatDetail.data(), 'chatDetail');
        let Chats=[]
        // console.log(cha)
        ChatDetail?.data()?.ChatId?.forEach(value=>{
          // for (let ind = 0; ind < ChatDetail?.data()?.ChatId?.length; ind++) {
            // let value=ChatDetail?.data()?.ChatId[ind]
    if(value.hasOwnProperty('MemberUid')){
      Chats.push(value)
      // dispatch(SET_CHAT_USER(Chats))

    }else{
            var obj={
              Lmsg:value.lastMsg,
              lTime:value.timestamp
            } 
      firestore().collection('Users').doc(value?.Uid).onSnapshot(Detail=>{
        // console.log(Detail.data(),"user ki detail")
        var Data={...Detail?.data(),...obj}
            console.log(Data,"obj")
        let index
        Chats.map((v,i)=>{
          if(v.UserUid===value.Uid){
            index=i
          }
        })
        if(index!= undefined){
          if(Detail?.data()){
            Chats.splice(index,1,Data)
            // dispatch(SET_CHAT_USER(Chats))
          }
        }
        else{
          Chats.push(Data)
        }
      })
    }
    // }
    
  })
  dispatch(SET_CHAT_USER(Chats))
        //   console.log(v,'foreach')
        //   firestore().collection('chat').doc(v.ChatKey).onSnapshot(LMsgs=>{
        //     console.log(LMsgs.data(),"last msg")
        //     var obj={
        //       Lmsg:LMsgs.data().lastMsg,
        //       lTime:LMsgs.data().Time
        //     }
        //   if(v.hasOwnProperty('MemberUid')){
        //       let index
        //     Chats.map((val,i)=>{
        //       // console.log(val,"chat ka v")
        //       if(val.ChatKey===v.ChatKey){
        //         index=i
        //       }
        //     })
        //     var Details={...v,...obj}
        //       if(index != undefined){
        //         Chats.splice(index,1,Details)
        //       }else{

        //   Chats.push(Details)
        //       }
        //   dispatch(SET_CHAT_USER(Chats))

        //   }
        //   else{
        //     firestore().collection('Users').doc(v.Uid).onSnapshot(value=>{
        //       console.log(value.data(),"value")
        //       console.log(Chats,"chatass")
        //     let index
        //     Chats.map((val,i)=>{
        //       // console.log(val,"chat ka v")
        //       if(val.UserUid===v.Uid){
        //         index=i
        //       }
        //     })
        //     var Details={...value.data(),...obj}
        //       if(index != undefined){
        //         Chats.splice(index,1,Details)
        //       }else{

        //   Chats.push(Details)
        //       }
        //             dispatch(SET_CHAT_USER(Chats))

        //     })
            
        //   }

        //   })
        // })
         
      });
      // });
  };
};

export const GroupCreate = props => {
  const {AllUsersReducer, ChatDashboardReducer} = store.getState();
  const states = store.getState().ChatDashboardReducer;
  const SearchArray = AllUsersReducer?.searchArr;
  console.log(states.imageUrl);
  return async dispatch => {
    const GroupMem = SearchArray.filter(memb => memb.isSelected);
    if (states.groupName.trim() != '' && states.imageUrl != '' && GroupMem.length != 0 ) {
      dispatch(SET_SHOW_LOADER(true));
      dispatch(ActiveChat(""));
      console.log(store.getState().ChatBoxReducer.MsgArr,"first msg")
     

      const reference = storage().ref('Images/' + new Date().getTime());
      await reference.putFile(states.imageUrl);
      const url = await reference.getDownloadURL();
      console.log(url, 'url');

      const UserUid = store?.getState()?.UserReducer?.user?.uid;
      let UidArr = [UserUid];

      const PushKey = await firestore()
        .collection('chat')
        .add({});
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
              ChatKey: PushKey._documentPath._parts[1],
              Istyping: false,
            }),
          });
      });
      firestore()
        .collection('Users')
        .doc(UserUid)
        .update({
          ChatId: firestore.FieldValue.arrayUnion({
            groupName: states.groupName,
            GroupImage: url,
            CreatorUid: UserUid,
            MemberUid: UidArr,
            ChatKey: PushKey._documentPath._parts[1],
            Istyping: false,
          }),
        })
        .then(getData => {
          const GroupObj = {
            groupName: states.groupName,
            GroupImage: url,
            CreatorUid: UserUid,
            MemberUid: UidArr,
            ChatKey: PushKey._documentPath._parts[1],
            Istyping: false,
          };
          const isSelectedItem = SearchArray.filter(val => val.isSelected);
          isSelectedItem.map(item => {
            item.isSelected = false;
          });
          dispatch(SET_MSG_ARR([]));
          console.log(store.getState().ChatBoxReducer.MsgArr,"second msg")
          dispatch(SET_ALLUSERS_SEARCH(SearchArray));
          dispatch(SET_GROUP_IMAGE(''));
          dispatch(ActiveChat(GroupObj));
          dispatch(SET_ISGROUP(true));
          dispatch(SET_SHOW_LOADER(false));
          dispatch(SET_SHOW_LOTTIE(true));
        });
    } else {
      if (states.groupName.trim() === '' && states.imageUrl === '') {
        alert('please select image and enter your group name');
      } else if (states.groupName.trim() === '') {
        alert('please enter group name');
      } else if (states.imageUrl === '') {
        alert('please Select group Image');
      }
      else if(GroupMem.length === 0){
        alert('please Select group participants');
      }
      console.log(states.groupName.trim(), 'check');
      console.log(states, 'check state');
    }
  };
};

export const GroupSelection = index => {
  return dispatch => {
    const {AllUsersReducer, ChatDashboardReducer} = store.getState();
    const SearchArray = AllUsersReducer?.searchArr;
    const arr = AllUsersReducer?.searchArr[index];

    const isSelectedItem = SearchArray.filter(val => val.isSelected).length;
    if (isSelectedItem >= 3 && !arr.isSelected) {
      alert('you already selected 3 participants');
    } else {
      arr.isSelected = !arr.isSelected;
      store.dispatch(SET_ALLUSERS_SEARCH(SearchArray));
    }
  };
};

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

export const SET_SHOW_MODAL = showModal => {
  return {
    type: SHOW_MODAL,
    showModal,
  };
};

export const SET_SHOW_LOTTIE = showLottie => {
  return {
    type: SHOW_LOTIE,
    showLottie,
  };
};

export const SET_SHOW_LOADER = showLoader => {
  return {
    type: SHOW_LOADER,
    showLoader,
  };
};

export const SetlastMsg = lastMsg => {
  return {
    type: LAST_MSG,
    lastMsg,
  };
};
