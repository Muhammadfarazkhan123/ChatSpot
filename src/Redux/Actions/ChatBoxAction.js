import firestore from '@react-native-firebase/firestore';
import store from '../store.js';
import {
  FIRST_CHAT,
  NEW_CHAT,
  MSG_ARR,
  KEY,
  MESSAGE,
  IS_TYPING,
} from './type.js';

export const ChatBoxAction = () => {
  const UserUid = store.getState().UserReducer.user.uid;
  const ActiveUserUid = store.getState()?.ActiveChatReducer?.ChatUser.UserUid;
  let MsgArr = store.getState().ChatBoxReducer.MsgArr;
  const Text = store?.getState()?.ChatBoxReducer?.message;
  const Key = store?.getState()?.ChatBoxReducer?.key;
  // const UserTyping = firestore()
  //   .collection('Users')
  //   .doc(UserUid)
  //   .onSnapshot(data => {
  //     data?.data()?.ChatId.filter(val => {
  //       return val?.Uid === ActiveUserUid;
  //     });
  //   });
  return dispatch => {
    // UserTyping?.map(v => {
    //   dispatch(SET_TYPING(v?.Istyping));
    // });

    firestore()
      .collection('Users')
      .doc(UserUid)
      .onSnapshot(DocData => {
        console.log(DocData.data(), 'data');
        if (DocData.data()?.ChatId) {
          if (
            store
              .getState()
              ?.ActiveChatReducer?.ChatUser?.hasOwnProperty('MemberUid')
          ) {
            dispatch(
              SET_KEY(store.getState()?.ActiveChatReducer?.ChatUser?.ChatKey),
            );
            // if (isthisUpdate) {
            firestore()
              .collection('chat')
              .doc(store.getState()?.ActiveChatReducer?.ChatUser?.ChatKey)
              .collection('Chats')
              .orderBy('timestamp')
              .onSnapshot(v => {
                MsgArr = [];
                v.docs.forEach(MsgData => {
                  MsgArr.push(MsgData.data());
                });
                dispatch(SET_MSG_ARR(MsgArr));
              });
          } else if (
            !store
              .getState()
              ?.ActiveChatReducer?.ChatUser?.hasOwnProperty('MemberUid')
          ) {
            const Filter = DocData.data()?.ChatId.filter(v => {
              return v?.Uid == ActiveUserUid;
            });
            console.log(
              store.getState()?.ActiveChatReducer?.ChatUser.ChatKey,
              'ActiveUserUid',
            );
            // console.log(Filter, 'filterdata');
            // console.log(Filter.length, 'filternnn');
            if (Filter.length == 0) {
              dispatch(SET_NEW_CHAT(true));
              console.log('no uid ');
            } else {
              Filter.map(item => {
                // SetKey(item?.ChatKey);
                dispatch(SET_KEY(item?.ChatKey));
                // if (isthisUpdate) {
                firestore()
                  .collection('chat')
                  .doc(item?.ChatKey)
                  .collection('Chats')
                  .orderBy('timestamp')
                  .onSnapshot(v => {
                    MsgArr = [];
                    v.docs.forEach(MsgData => {
                      MsgArr.push(MsgData.data());
                    });
                    dispatch(SET_MSG_ARR(MsgArr));
                  });

                // SetisthisUpdate(false);
                // }
                console.log(item?.ChatKey, 'item?.ChatKey');
              });
            }
          }
        } else {
          dispatch(SET_FIRST_CHAT(true));
          console.log('no Chatid ');
        }
      });
  };
};

export const SendAction = (scrollRef) => {
  const states = store?.getState()?.ChatBoxReducer;
  const UserUid = store?.getState()?.UserReducer?.user?.uid;
  const ActiveUserUid = store.getState()?.ActiveChatReducer?.ChatUser.UserUid;
  return async dispatch => {
    console.log('dispatch work');
    dispatch(SET_MESSAGE(''));
    console.log('dispatch work2');

    const chatObj = {
      Msg: states.message,
      Uid: store.getState().UserReducer?.user?.uid,
      timestamp: firestore.FieldValue.serverTimestamp(),
      name: store.getState().UserReducer?.user?.displayName,
    };

    if (states.firstChat) {
      console.log('no chatid ');

      const PushKey = await firestore()
        .collection('chat')
        .add({});
      console.log(PushKey._documentPath._parts[1], 'FirstChat');
      firestore()
        .collection('chat')
        .doc(PushKey._documentPath._parts[1])
        .collection('Chats')
        .add(chatObj);

        firestore()
        .collection('Notification').add({
          name:store.getState().UserReducer?.user?.displayName,
          Uid:ActiveUserUid,
          Msg:states.message
        })

        

      firestore()
        .collection('Users')
        .doc(UserUid)
        .set({ ChatId }, { merge: true });
      firestore()
        .collection('Users')
        .doc(ActiveUserUid)
        .set(
          {
            ChatId: [
              {
                Uid: UserUid,
                ChatKey: PushKey._documentPath._parts[1],
                // Istyping: false,
                lastMsg:states.message,
                timestamp: new Date().getTime()


              },
            ],
          },
          { merge: true },
        );
      dispatch(SET_KEY(PushKey));
      dispatch(SET_FIRST_CHAT(false));
    }

else if (states.newChat) {
      console.log('no uid ');

      const PushKey = await firestore()
        .collection('chat')
        .add({});
      firestore()
        .collection('chat')
        .doc(PushKey._documentPath._parts[1])
        .collection('Chats')
        .add(chatObj);

        firestore()
        .collection('Notification').add({
          name:store.getState().UserReducer?.user?.displayName,
          Uid:ActiveUserUid,
          Msg:states.message
        })

      firestore()
        .collection('Users')
        .doc(UserUid)
        .update({
          ChatId: firestore.FieldValue.arrayUnion({
            Uid: ActiveUserUid,
            ChatKey: PushKey._documentPath._parts[1],
            lastMsg:states.message,
            timestamp: new Date().getTime()
            // Istyping: false,


          }),
        });

      firestore()
        .collection('Users')
        .doc(ActiveUserUid)
        .update({
          ChatId: firestore.FieldValue.arrayUnion({
            Uid: UserUid,
            ChatKey: PushKey._documentPath._parts[1],
            // Istyping: false,
            lastMsg:states.message,
            timestamp: new Date().getTime()

          }),
        });

      dispatch(SET_KEY(PushKey));
      dispatch(SET_NEW_CHAT(false));
    } else if (!states.firstChat && !states.newChat) {
      console.log('else hai');
      firestore()
        .collection('chat')
        .doc(states.key)
        .collection('Chats')
        .add(chatObj);

        firestore()
        .collection('Notification').add({
          name:store.getState().UserReducer?.user?.displayName,
          Uid:ActiveUserUid,
          Msg:states.message
        })
        var index;
        var CHATID
        firestore()
        .collection('Users')
        .doc(UserUid).get()
        .then(val=>{
          CHATID = [...val?.data().ChatId];
          console.log(CHATID, 'hhhhh');
          const filter = CHATID?.filter((v, i) => {
            if (v.Uid === ActiveUserUid) {
              index = i;
            }
        })
          CHATID[index].lastMsg = states.message;
          CHATID[index].Time=new Date().getTime()
          console.log(CHATID, 'chatid');
          firestore()
            .collection('Users')
            .doc(UserUid)
            .update({ ChatId: CHATID });
          console.log(CHATID[index].lastMsg, 'msg last');
      })

      var index1;
        var CHATID1
        firestore()
        .collection('Users')
        .doc(ActiveUserUid).get()
        .then(val=>{
          CHATID1 = [...val?.data().ChatId];
          console.log(CHATID1, 'hhhhh');
          const filter = CHATID1?.filter((v, i) => {
            if (v.Uid === UserUid) {
              index1 = i;
            }
        })
          CHATID1[index1].lastMsg = states.message;
          CHATID1[index1].Time=new Date().getTime()
          console.log(CHATID1, 'chatid');
          firestore()
            .collection('Users')
            .doc(ActiveUserUid)
            .update({ ChatId: CHATID1 });
          console.log(CHATID1[index1].lastMsg, 'msg last');
      })
      
    }
    scrollRef.scrollToEnd({ animated: true })
  };
};

const SET_FIRST_CHAT = firstChat => {
  return {
    type: FIRST_CHAT,
    firstChat,
  };
};

const SET_NEW_CHAT = newChat => {
  return {
    type: NEW_CHAT,
    newChat,
  };
};

export const SET_MSG_ARR = MsgArr => {
  return {
    type: MSG_ARR,
    MsgArr,
  };
};

const SET_KEY = key => {
  return {
    type: KEY,
    key,
  };
};

export const SET_MESSAGE = message => {
  return {
    type: MESSAGE,
    message,
  };
};

const SET_TYPING = typing => {
  return {
    type: IS_TYPING,
    typing,
  };
};

export const SET_EMOJI= emoji=>{
return disptch=>{
  console.log(emoji,"emoji")
let Msg=store.getState().ChatBoxReducer.message
Msg += emoji
disptch(SET_MESSAGE(Msg))
}
}

export const Typing = Text => {
  const UserUid = store.getState()?.UserReducer?.user?.uid;
  const ActiveUserUid = store.getState()?.ActiveChatReducer?.ChatUser.UserUid;
  const states = store?.getState()?.ChatBoxReducer;

  return dispatch => {
    console.log('typing');
    let CHATID;
    let index;
    
    if (Text != '') {
      if (!states.firstChat) {
        if(!states.newChat){
        firestore()
          .collection('Users')
          .doc(ActiveUserUid).get()
          .then(val=>{
            CHATID = [...val?.data().ChatId];
            // console.log(CHATID, 'hhhhh');
            const filter = CHATID?.filter((v, i) => {
              if (v.Uid === UserUid) {
                index = i;
              }
          })
            CHATID[index].Istyping = true;
            // console.log(CHATID, 'chatid');
            firestore()
              .collection('Users')
              .doc(ActiveUserUid)
              .update({ ChatId: CHATID });
            // console.log(CHATID[index].Istyping, 'true');
          
            
            // setTimeout(()=>{
            //   CHATID[index].Istyping = false;
            //   console.log(CHATID, 'chatid');
            //   firestore()
            //     .collection('Users')
            //     .doc(ActiveUserUid)
            //     .update({ ChatId: CHATID });
            //   console.log(CHATID[index].Istyping, 'false');
            // },3000)
          });
      }
    }
  };
};
}
export const EndTyping = () => {
  const UserUid = store.getState().UserReducer.user.uid;
  const ActiveUserUid = store.getState()?.ActiveChatReducer?.ChatUser.UserUid;
  const states = store?.getState()?.ChatBoxReducer;

  return dispatch => {
    console.log('typing');
    let CHATID;
    let index;
    console.log(states.newChat,"new chat")
    console.log(states.firstChat,"new chat")
    
    if(states.message != ""){
      if (!states.firstChat) {
        if(!states.newChat){
        firestore()
          .collection('Users')
          .doc(ActiveUserUid)
          .onSnapshot(val => {
            CHATID = [...val?.data()?.ChatId];
            // console.log(CHATID, 'hhhhh');
            const filter = CHATID?.filter((v, i) => {
              if (v.Uid === UserUid) {
                index = i;
              }
            });
            CHATID[index].Istyping = false;
            // console.log(CHATID, 'chatid');
            firestore()
              .collection('Users')
              .doc(ActiveUserUid)
              .update({ChatId: CHATID});
            // console.log(CHATID[index].Istyping, 'false');
          });
    }
      console.log("typnig false")

    }  
    }
  }
  };

