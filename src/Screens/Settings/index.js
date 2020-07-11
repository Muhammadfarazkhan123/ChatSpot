import React, { useEffect } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LoginManager } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import Icons from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcons from 'react-native-vector-icons/MaterialIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome5'


import store from '../../Redux/store';
import styles from './style';
import style from './style';

const Data = [
  {
    UserName: 'Faraz Khan',
    ImgUrl:
      'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png',
  },
];



const Settings = props => {
  const { user } = store.getState().UserReducer
  // console.log(user.photoURL,"userreducer")
  const logout = async () => {
    LoginManager.logOut();
    auth().signOut();
    await GoogleSignin.signOut();
    props.navigation.navigate('Chat');
  };
  return (
    <View>
      <View style={styles.ProfileView}>
        <Image source={{ uri: user.photoURL }} style={styles.ProfileImage} />
        {/* <Image source={user}/> */}
        <Text style={styles.ProfileName}>{user.displayName}</Text>
      </View>
      <View style={styles.MainListView}>
        <TouchableOpacity style={styles.TouchStyle} onPress={() => {
          props.navigation.navigate('Find Friends');
        }}>
          <View style={{ flexDirection: "row" }}>
            <Icons
              name="user"
              size={30}
              color="rgb(28, 98, 219)"
            />
            <Text style={styles.TextStyle}>Peoples</Text>
          </View>
          <FontIcon
            name="greater-than"
            size={15}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchStyle}>
          <View style={{ flexDirection: "row" }}>
            <Icons
              name="wrench"
              size={30}
              color="rgb(28, 98, 219)"
            />
            <Text style={styles.TextStyle}>Account Settings</Text>
          </View>
          <FontIcon
            name="greater-than"
            size={15}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchStyle}>
            <View style={{ flexDirection: "row" }}>

              <MatIcons
                name="report-problem"
                size={30}
                color="rgb(28, 98, 219)"
              />
              <Text style={styles.TextStyle}>Report Problem</Text>
            </View>
            <FontIcon
            name="greater-than"
            size={15}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.TouchStyle}>
            <View style={{ flexDirection: "row" }}>
              <MatIcons
                name="help"
                size={30}
                color="rgb(28, 98, 219)"
              />
              <Text style={styles.TextStyle}>Help</Text>
            </View>
            <FontIcon
            name="greater-than"
            size={15}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchStyle} onPress={() => {
          logout();
        }}>
          <View style={{ flexDirection: "row" }}>

            <MaterialIcons
              name="logout"
              size={30}
              color="rgb(28, 98, 219)"
            />
            <Text style={styles.TextStyle}>Logout</Text>
          </View>
          <FontIcon
            name="greater-than"
            size={15}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Settings;

