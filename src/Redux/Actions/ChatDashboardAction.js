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
  LAST_MSG
} from './type';
import storage from '@react-native-firebase/storage';
import { ActiveChat } from './ActiveChatAction';
import { SET_ISGROUP } from "./GroupAction";
import { SET_ALLUSERS_SEARCH } from "./AllUserAction";
import { SET_MSG_ARR } from './ChatBoxAction'

export const ChatDashboard = () => {
  const UserUid = store?.getState()?.UserReducer?.user?.uid;
  return dispatch => {
    let UsersDetail = store?.getState()?.ChatDashboardReducer?.usersDetail;
    // let ChatUser = store?.getState()?.ChatDashboardReducer?.chatUser;
    let GroupUser = store?.getState()?.ChatDashboardReducer?.GroupUser;
    console.log(UserUid, "userUid")
    console.log(store?.getState()?.UserReducer?.user, "userUid data")

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
        let ChatUserArr = [];
        console.log(ChatUserArr,"check first data")
        let ChatId = UserData?.data()?.ChatId
        // UserData?.data()?.ChatId?.map(value => {
        console.log(UserData.data(), 'UserData.data()');
        // console.log(ChatId, 'ChatId');
        //   if (value.hasOwnProperty('MemberUid')) {
        //     farazArr.push(value);
        //     dispatch(SET_CHAT_USER(ChatUserArr));
        //   } else if (!value.hasOwnProperty('MemberUid')) {
        //   console.log(ChatUserArr, 'ChatUser2');

        //     firestore()
        //       .collection('Users')
        //       .doc(value.Uid)
        //       .onSnapshot(Detail => {
        //         console.log(Detail.data(),"detail on online")
        //         ChatUserArr.push(Detail.data());
        //   console.log(ChatUserArr, 'ChatUser3');

        //     dispatch(SET_CHAT_USER(ChatUserArr));

        //       });
        //     }
        //     // console.log(ChatUser,"ChatUser")
        //     // dispatch(SET_CHAT_USER(ChatUser));
        //   });
        //  ChatId.map(v=>{
        //   firestore().collection('chat').doc(v.ChatKey).onSnapshot(data=>{
        //     console.log(data?.data(),"check this is data")
        //     // console.log("map last msg")
        //     dispatch(SetlastMsg(data.data()));

        //   })
        //  })
        console.log(ChatUserArr,"chatUserArr0")

        if (ChatId) {
          for (let i = 0; i < ChatId?.length; i++) {
            console.log(ChatId[i].ChatKey, 'value');
            // console.log(ChatUserArr,"chatuser hai yeh ")
            let value = ChatId[i]
            console.log(ChatUserArr,"chatUserArr1")
            ChatUserArr = [];

            firestore().collection('chat').doc(value?.ChatKey).onSnapshot(async data => {
              
              let ind
              var obj = {
                Lmsg: data?.data().lastMsg,
                lTime: data?.data().Time
              }
              if (value.hasOwnProperty('MemberUid')) {
                console.log("check group first check")
                ChatUserArr.map((v, i) => {
                  console.log(v.ChatKey === value.ChatKey,"map check")
                  if (v.ChatKey === value.ChatKey) {
                    ind = i
                    console.log(ind, "index2 group")
                  }
                })
                var Details = { ...value, ...obj }
                if (ind != undefined) {
                  // if(Detail?.data()){
                  // console.log(ind,"ye kab chala")
                  ChatUserArr.splice(ind, 1, Details)
                  // dispatch(SET_CHAT_USER(ChatUserArr));

                }
                else {
                  console.log("else chala hai yeh")
                  ChatUserArr.push(Details);
                }
                
                // dispatch(SET_CHAT_USER(ChatUserArr));

              } else if (!value.hasOwnProperty('MemberUid')) {
            console.log(ChatUserArr,"chatUserArr2")
                
                await firestore()
                  .collection('Users')
                  .doc(value.Uid)
                  .get().then(Detail => {
                    console.log(Detail.data(),"detail.data()")
                    let ind
                    ChatUserArr.map((v, i) => {
                      // console.log(v.UserUid === value.Uid,"map check")
                      if (v.UserUid === value.Uid) {
                        ind = i
                        console.log(ind, "index2")
                      }
                    })
                    console.log(ind, "index1")
                    var Details = { ...Detail?.data(), ...obj }
                    // console.log(ind,'index hai yeh')
                    if (ind != undefined) {
                      if (Detail?.data()) {
                        // console.log(ind,"ye kab chala")
                        ChatUserArr.splice(ind, 1, Details)
                        // dispatch(SET_CHAT_USER(ChatUserArr));

                      }
                    } else {
                    console.log(ChatUserArr,"chatUserArr else single")
                      ChatUserArr.push(Details);

                    }
                  })
                }
                dispatch(SET_CHAT_USER(ChatUserArr));
          })
          console.log(ChatUserArr,"chatUserArr3")

          }
        } else {
          console.log(ChatUserArr,"chatUserArr else")

          dispatch(SET_CHAT_USER(ChatUserArr));
        }




        // lastmessage=obj
        //  console.log(obj,"chatuser hai yeh 2")
        // console.log(Detail.data(),"detail on online")
        // let ChatUser = store?.getState()?.ChatDashboardReducer?.chatUser;
        // console.log(ChatUser,"ChatUser")

        // var Indexchat=[...ChatUser]
        // for (let index = 0; index < ChatUserArr.length; index++) {
        //   // const element = array[index];
        //   if(Indexchat[index].UserUid === value.Uid){
        //     ind=index
        // console.log(ind,"index2")
        //   }
        // }

        // dispatch(SET_CHAT_USER(ChatUserArr));



        // ChatUser=ChatUserArr
        // dispatch(SET_CHAT_USER(ChatUserArr));
        console.log(ChatUserArr, "chatusercheck")
        // ChatUserArr.map(v=>{
        //   // console.log(v,"check vv")
        //   if(v.hasOwnProperty('MemberUid')){

        //   }
        // })

        });
      };
  };

  export const GroupCreate = props => {
    const { AllUsersReducer, ChatDashboardReducer } = store.getState()
    const states = store.getState().ChatDashboardReducer;
    const SearchArray = AllUsersReducer?.searchArr;
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
          .add({});
        const GroupMem = SearchArray.filter(memb => memb.isSelected)
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
              ChatKey: PushKey._documentPath._parts[1],
              Istyping: false,
            }),
          }).then(getData => {
            const GroupObj = {
              groupName: states.groupName,
              GroupImage: url,
              CreatorUid: UserUid,
              MemberUid: UidArr,
              ChatKey: PushKey._documentPath._parts[1],
              Istyping: false,
            }
            const isSelectedItem = SearchArray.filter(val => val.isSelected)
            isSelectedItem.map(item => {
              item.isSelected = false

            })
            dispatch(SET_ALLUSERS_SEARCH(SearchArray));
            dispatch(SET_GROUP_IMAGE(""))
            dispatch(ActiveChat(GroupObj));
            dispatch(SET_ISGROUP(true));
            dispatch(SET_SHOW_LOADER(false))
            dispatch(SET_SHOW_LOTTIE(true))
            dispatch(SET_MSG_ARR([]));


          }

          )
      } else {
        if (states.groupName === "" && states.imageUrl === "") {
          alert("please select image and enter your group name")
        }
        else if (states.groupName === "") {
          alert('please enter group name');
        }
        else if (states.imageUrl === "") {
          alert('please Select group Image');
        }
        console.log(states.groupName === "" && states.imageUrl === "", "check")
        console.log(states, "check state")
      }
    };
  };

  export const GroupSelection = (index) => {
    return dispatch => {
      const { AllUsersReducer, ChatDashboardReducer } = store.getState()
      const SearchArray = AllUsersReducer?.searchArr;
      const arr = AllUsersReducer?.searchArr[index];

      const isSelectedItem = SearchArray.filter(val => val.isSelected).length
      if (isSelectedItem >= 3 && !arr.isSelected) {
        alert("you already selected 3 participants")
      } else {
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

  export const SET_SHOW_MODAL = showModal => {
    return {
      type: SHOW_MODAL,
      showModal
    }
  }

  export const SET_SHOW_LOTTIE = showLottie => {
    return {
      type: SHOW_LOTIE,
      showLottie
    }
  }

  export const SET_SHOW_LOADER = showLoader => {
    return {
      type: SHOW_LOADER,
      showLoader
    }
  }

  export const SetlastMsg = lastMsg => {
    return {
      type: LAST_MSG,
      lastMsg
    }
  }