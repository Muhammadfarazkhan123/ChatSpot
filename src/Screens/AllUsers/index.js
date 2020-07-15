import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import store from '../../Redux/store';
import {
  AllUserAction,
  SET_ALLUSERS_SEARCH,
} from '../../Redux/Actions/AllUserAction';
import {SET_MSG_ARR} from '../../Redux/Actions/ChatBoxAction';

import {ActiveChat} from '../../Redux/Actions/ActiveChatAction';
import styles from './style';

const AllUsers = props => {
  const [ThisUpdate, SetThisUpdate] = useState(true);
  const [UsersDetail, SetUserDetail] = useState([]);
  const [ReducerState, SetReducerState] = useState();

  useEffect(() => {
    const UserUid = store?.getState()?.UserReducer?.user?.uid;

    if (ThisUpdate) {
      store.dispatch(AllUserAction());
      store.subscribe(() => {
        console.log('subscribe all user')
        SetReducerState(store.getState().AllUsersReducer);
      });
      SetThisUpdate(false);
    }
  }, []);

  const ChatStart = Item => {
    store.dispatch(SET_MSG_ARR([]));

    store.dispatch(ActiveChat(Item));

    props.navigation.navigate('ChatBox');
  };

  const Search = Text => {
    const Result = ReducerState?.UsersDetail?.filter(Res =>
      Res.displayName.toLowerCase().startsWith(Text.toLowerCase()),
    );

    store.dispatch(SET_ALLUSERS_SEARCH(Result));
  };

  const Item = Item => {
    return (
      <TouchableOpacity
        style={styles.MainListView}
        onPress={() => {
          ChatStart(Item);
        }}>
        <View style={styles.ListView}>
          <Image source={{uri: Item.PhotoUrl}} style={styles.ListImg} />
        {Item.IsOnline && <View style={styles.OnlineDot}></View>}
        </View>
        <View style={{flex: 3}}>
          <Text style={styles.ListTitle}>{Item.displayName}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View style={styles.SearchView}>
        <Icon size={25} color="grey" name="search" style={styles.SearchIcon} />
        <TextInput
          placeholder="Find Friends"
          style={styles.SearchInput}
          onChangeText={Text => {
            Search(Text);
          }}
        />
      </View>
      <FlatList
        data={ReducerState?.searchArr}
        renderItem={({item}) => Item(item)}
        keyExtractor={(item, index) => index.toString()}
        style={styles.FlatListStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AllUsers;
