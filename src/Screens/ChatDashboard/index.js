import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  TextInput,
  AppState
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import store from '../../Redux/store';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import { ActiveChat } from '../../Redux/Actions/ActiveChatAction';
import { SET_MSG_ARR } from '../../Redux/Actions/ChatBoxAction';
import Loader from "../../Components/Loader/index";
import {
  ChatDashboard,
  SET_GROUP_NAME,
  SET_GROUP_IMAGE,
  GroupCreate,
  GroupSelection,
  SET_SHOW_MODAL,
  SET_SHOW_LOTTIE,
  SET_SHOW_LOADER
} from '../../Redux/Actions/ChatDashboardAction';
import { SET_ISGROUP } from '../../Redux/Actions/GroupAction';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from "react-native-vector-icons/Feather";
import ImagePicker from 'react-native-image-picker';
import IonIcons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import LottieView from 'lottie-react-native'
import storage from '@react-native-firebase/storage';

import {
  AllUserAction,
  SET_ALLUSERS_SEARCH,
} from '../../Redux/Actions/AllUserAction';
import style from './style';
import { set } from 'react-native-reanimated';

const Chat = props => {
  const [DidUpdate, setDidUpdate] = useState(true);
  const [ReducerState, SetReducerState] = useState();
  const [Groupstate, setGroupstate] = useState();
  const [ImageSource, SetImageSource] = useState();
  const [loader, SetLoader] = useState(false)

  useEffect(() => {
    console.log('run');
    AppState.addEventListener('change', _handleAppStateChange)

    store.dispatch(AllUserAction());

    store.subscribe(() => {
      SetReducerState(store.getState().ChatDashboardReducer);
      setGroupstate(store.getState().AllUsersReducer);
    });


    console.log(store.getState().ChatDashboardReducer, 'reducer');
  }, []);


  const _handleAppStateChange = (NextAppState) => {
    const UserUid = store?.getState()?.UserReducer?.user?.uid;

    console.log(NextAppState, "next state")
    if (NextAppState === 'active') {
      console.log("online")
      firestore().collection('Users').doc(UserUid).update({ IsOnline: true })

    } else {
      alert(NextAppState)
      console.log('offline')
      firestore().collection('Users').doc(UserUid).update({ IsOnline: false })

    }
  }

  const ChatStart = v => {
    store.dispatch(SET_MSG_ARR([]));
    store.dispatch(ActiveChat(v));
    store?.dispatch(SET_ISGROUP(false));

    props.navigation.navigate('ChatBox');
  };

  const GroupChatStart = v => {
    store.dispatch(SET_MSG_ARR([]));
    store.dispatch(ActiveChat(v));
    store?.dispatch(SET_ISGROUP(true));

    props.navigation.navigate('ChatBox');
  };

  const Item = Item => {
    if (Item.hasOwnProperty('MemberUid')) {
      return (
        <TouchableOpacity
          style={styles.MainListView}
          onPress={() => {
            GroupChatStart(Item);
          }}>

          <View style={styles.ListView}>
            <Image source={{ uri: Item.GroupImage }} style={styles.ListImg} />
          </View>

          <View style={styles.MainNameView}>
            <View style={styles.NameTimeStyle}>
              <Text style={styles.ListTitle}>{Item.groupName}</Text>
              <Text style={{ color: "grey" }}>5 min</Text>
            </View>


            <View style={styles.msgNotiView}>
              <Text style={styles.LastMsgStyle}>you:kese ho</Text>
              <View style={styles.msgNoti}>
                <Text style={{ color: "white", fontWeight: "bold" }}>1</Text>
              </View>
            </View>
          </View>


        </TouchableOpacity>
      );
    }
    if (!Item.hasOwnProperty('MemberUid')) {
      return (
        <TouchableOpacity
          style={styles.MainListView}
          onPress={() => {
            ChatStart(Item);
          }}>
          <View style={styles.ListView}>
            <Image source={{ uri: Item?.PhotoUrl }} style={styles.ListImg} />
            {Item.IsOnline && <View style={styles.OnlineDot}></View>}

          </View>

          <View style={styles.MainNameView}>
            <View style={styles.NameTimeStyle}>
              <Text style={styles.ListTitle}>{Item?.displayName}</Text>
              <Text style={{ color: "grey" }}>5 min</Text>
            </View>


            <View style={styles.msgNotiView}>
              <Text style={styles.LastMsgStyle}>you:kese ho</Text>
              <View style={styles.msgNoti}>
                <Text style={{ color: "white", fontWeight: "bold" }}>1</Text>
              </View>
            </View>
          </View>

        </TouchableOpacity>
      );
    }
  };
  const gropFunc = (index) => {
    store.dispatch(GroupSelection(index))
  };
  const groupChat = () => {
    store.dispatch(SET_SHOW_LOADER(true))
    store.dispatch(GroupCreate(props));

  };
  const GroupItem = (Item, index) => {
    return (
      <TouchableOpacity
        style={styles.MainList}
        onPress={() => {
          gropFunc(index);
        }}>
        <View style={styles.GroupListView}>
          <Image source={{ uri: Item?.PhotoUrl }} style={styles.GroupListImg} />
          <Text style={styles.GroupListTitle}>{Item?.displayName}</Text>
        </View>
        {Item.isSelected && (
          <Icon name="check-circle" size={30} color="green" />
        )}
      </TouchableOpacity>
    );
  };

  const Search = Text => {
    const Result = Groupstate?.UsersDetail?.filter(Res =>
      Res.displayName.toLowerCase().startsWith(Text.toLowerCase()),
    );

    store.dispatch(SET_ALLUSERS_SEARCH(Result));
  };
  const AddImage = () => {
    ImagePicker.showImagePicker(response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        store.dispatch(SET_GROUP_IMAGE(source));

        if (
          store.getState().ChatDashboardReducer.imageUrl.hasOwnProperty('uri')
        ) {
          alert('Image selected succesfully');
        }
        SetImageSource(source);
      }
    });
  };
  return (
    <View style={{ flex: 1 }}>

      {/* <View
        style={{
          borderBottomColor: '#cfcfcf',
          borderBottomWidth: 1,
          elevation: 1,
        }}>
        <Text style={styles.UserScrollText}>Friends Active</Text>
        <ScrollView
          horizontal={true}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.UsersScroll}>
            {ReducerState?.usersDetail.map((v, i) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    ChatStart(v);
                  }}
                  key={i}>
                  <View style={styles.UsersMainView}>
                    <Image
                      source={{uri: v?.PhotoUrl}}
                      style={styles.UsersImg}
                    />
                  </View>
                  <View>
                    <Text style={styles.UsersName}>{v?.displayName}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View> */}
      <View>
        <FeatherIcon
          size={25}
          name="search"
          style={styles.DashboardSearch}
        />
        <Text style={styles.HeadStyle}>Messages</Text>
      </View>
      {ReducerState?.chatUser.length == 0 && (
        <Text style={{ alignSelf: "center", marginTop: "40%", fontSize: 25, fontWeight: "bold", color: "grey" }}>You have no conversations</Text>
      )}
      <FlatList
        data={ReducerState?.chatUser}
        renderItem={({ item }) => Item(item)}
        keyExtractor={(item, index) => index.toString()}
        style={styles.FlatListStyle}
        showsVerticalScrollIndicator={false}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={ReducerState?.showModal}
        onRequestClose={() => {
          alert('Modal has been closed.');
          store.dispatch(SET_SHOW_MODAL(!ReducerState.showModal));

        }}>
        {ReducerState?.showLoader && <Loader />}

        <View
          style={styles.mainView}>
          {ReducerState?.showLottie && <View style={{ height: "30%", width: "70%", alignSelf: "center", marginTop: "50%", position: "absolute", zIndex: 3 }}><LottieView source={require('../../Assets/animation.json')} autoPlay loop={false} style={{ zIndex: 1 }}
            onAnimationFinish={() => {
              SetLoader(true)
              store.dispatch(SET_SHOW_MODAL(false))
              props.navigation.navigate('ChatBox');
              store.dispatch(SET_SHOW_LOTTIE(false))

            }} /></View>}
          <View
            style={styles.innerView}>
            <TouchableOpacity
              style={styles.CloseButton}
              onPress={() => {
                store.dispatch(SET_SHOW_MODAL(!ReducerState.showModal));
              }}>
              <Entypo size={30} name="circle-with-cross" color="rgb(28, 98, 219)" />
            </TouchableOpacity>
            <View>
              <View style={styles.GroupAdd}>

                <TouchableOpacity
                  onPress={() => {
                    AddImage();
                  }}
                  style={styles.AddImg}
                >
                  <MaterialIcons size={35} name="image-plus" color="rgb(215, 117, 235)" />
                </TouchableOpacity>

                <View style={styles.NameIcon}>
                  <TextInput
                    placeholder="Group Name"
                    onChangeText={text => {
                      store.dispatch(SET_GROUP_NAME(text));
                    }}
                    style={styles.GroupInput}
                  />

                </View>
                <TouchableOpacity
                  onPress={() => {
                    groupChat();
                  }}
                  style={styles.CreateBtn}

                >
                  <IonIcons
                    name="md-send"
                    size={30}
                    color="rgb(28, 98, 219)"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.SearchView}>
                <Icon
                  size={25}
                  color="grey"
                  name="search"
                  style={styles.SearchIcon}
                />

                <TextInput
                  placeholder="Find Friends"
                  style={styles.SearchInput}
                  onChangeText={Text => {
                    Search(Text);
                  }}
                />

              </View>

            </View>
            <FlatList
              data={Groupstate?.searchArr}
              renderItem={({ item, index }) => GroupItem(item, index)}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>


        </View>
      </Modal>

      <TouchableOpacity
        style={styles.GroupBUtton}
        onPress={() => {
          store.dispatch(SET_SHOW_MODAL(true))
        }}>
        <View style={styles.GroupIconView}>
          <MatIcon size={40} name="group-add" color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Chat;
