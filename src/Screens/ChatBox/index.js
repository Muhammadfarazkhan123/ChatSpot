import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import styles from './style';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import store from '../../Redux/store';
import EmojiSelector from 'react-native-emoji-selector'
import EmojiBoard from '../../Components/react-native-emoji-board'
import {
  ChatBoxAction,
  SendAction,
  SET_MESSAGE,
  Typing,
  EndTyping,
  SET_EMOJI
} from '../../Redux/Actions/ChatBoxAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from "../../Components/Header/index"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ChatBox = (props) => {
  const [isthisUpdate, SetisthisUpdate] = useState(true);
  const [scrollRef, SetScrollRef] = useState();
  const [reducerState, SetReducerState] = useState();
  const [groupReducer, SetgroupReducer] = useState();
  const [emoji, SetEmoji] = useState(false)

  const UserUid = store.getState()?.UserReducer?.user?.uid;
  const ActiveUserUid = !store.getState().GroupReducer.group && store.getState()?.ActiveChatReducer?.ChatUser?.UserUid;
  const Details = store.getState()?.ActiveChatReducer?.ChatUser
  useEffect(() => {
    if (isthisUpdate) {
      store.dispatch(ChatBoxAction());
      store.subscribe(() => {
        SetReducerState(store.getState().ChatBoxReducer);
        SetgroupReducer(store.getState()?.GroupReducer);
        SetisthisUpdate(false);
      });
    }

  }, []);
  // console.log(groupReducer, 'groupred');
  const send = () => {
    store.dispatch(SendAction(scrollRef));
  };

  const SetTyping = text => {
    // store.dispatch(Typing(text));
    store.dispatch(SET_MESSAGE(text));
  };



  return (
    <View style={{ flex: 1, backgroundColor: "rgb(210, 211, 216)" }}>

      <Header HeaderName={!groupReducer?.group ? Details?.displayName : Details?.groupName} chatProps={props} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={ref => {
          SetScrollRef(ref);
        }}
        onContentSizeChange={() => scrollRef.scrollToEnd({ animated: true })}
        style={styles.MsgScrolView}
        contentContainerStyle={{ paddingBottom: wp(5) }}
      >
        {reducerState?.MsgArr.map((v, i) => {
          return (
            <View style={{ marginBottom: wp(3) }}>
              <View
                style={{
                  backgroundColor: v.Uid == UserUid ? 'rgb(28, 98, 219)' : 'rgb(235, 238, 244)',
                  maxHeight: hp('20%'),
                  minHeight: hp('6%'),
                  marginTop: hp('1.5%'),
                  maxWidth: wp('70%'),
                  minWidth: wp('25%'),
                  alignSelf: v.Uid == UserUid ? 'flex-end' : 'flex-start',
                  padding: wp('2%'),
                  borderColor: v.Uid == UserUid ? 'black' : '#d2d2d2',
                  borderBottomLeftRadius: v.Uid == UserUid ? 50 : 0,
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  borderBottomRightRadius: v.Uid != UserUid ? 50 : 0,
                  paddingHorizontal: wp(6),
                  paddingVertical: wp(5),
                }}
                key={i}>
                {groupReducer?.group && <Text
                  style={{
                    color: v.Uid == UserUid ? 'white' : 'black',
                    fontWeight: 'bold',
                  }}

                >
                  {v.Uid == UserUid ? 'You:' : v.name + ':'}
                </Text>}
                <Text
                  style={{
                    color: v.Uid == UserUid ? 'white' : 'black',
                    textAlign: "left",

                  }}>
                  {v.Msg}
                </Text>

              </View>
              <Text
                style={{
                  color: 'grey',
                  textAlign: v.Uid == UserUid ? 'right' : "left",
                  fontWeight: "bold"
                }}

              >
                {moment(v?.timestamp?.seconds * 1000).fromNow()}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      {/* <View style={{height:"50%"}}>
      <EmojiSelector onEmojiSelected={emoji => store.dispatch(SET_EMOJI(emoji))} showSearchBar={false}/>
            
          </View> */}
      <View style={{ backgroundColor: "white", paddingBottom: wp(3), paddingTop: wp(2) }}>
        <View style={{justifyContent:'space-between'}}>
          <View style={styles.MsgBoxView}>
            <TouchableOpacity onPress={()=>{SetEmoji(!emoji)}}><EntypoIcon name="emoji-happy" size={25} color="grey" /></TouchableOpacity>
            <TextInput
              placeholder="Type a message"
              style={styles.MsgBoxInput}
              autoCapitalize="sentences"
              onChangeText={text => {
                SetTyping(text);
              }}
    
    onFocus={()=>{SetEmoji(false)}}
              // onEndEditing={store.dispatch(EndTyping())}
              multiline
              value={reducerState?.message}
            />
            {!reducerState?.message ? <EntypoIcon name="circle-with-plus" size={30} color="rgb(28, 98, 219)" />
              :
              <TouchableOpacity
                onPress={() => {
                  send();
                }}>
                <Ionicons
                  name="md-send"
                  size={30}
                  color="rgb(28, 98, 219)"
                  style={styles.MsgBoxIcon}
                />
              </TouchableOpacity>}
          </View>
        </View>
                {emoji && <View>
        <EmojiBoard 
        showBoard={emoji} onClick={emoji => store.dispatch(SET_EMOJI(emoji.code))} 
        numCols={4} 
        tabBarPosition='top' 
        hideBackSpace={true} 
        tabBarStyle={{marginLeft:"10%"}}
        categoryDefautColor="rgb(28, 98, 219)"
        />

                </View>}
      </View>
    </View>
  );
};
export default ChatBox;
