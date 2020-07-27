import React, { useState, useEffect } from 'react';
import { View, Text, AsyncStorage,AppState } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import Navigation from './src/Navigation/stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen'
import { ChatDashboard } from './src/Redux/Actions/ChatDashboardAction'
import {AllUserAction} from './src/Redux/Actions/AllUserAction'
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification"

const App = () => {
  const [user, setUser] = useState();
  const [Update, setUpdate] = useState(true);
  const checkUser = () => {
    
    auth().onAuthStateChanged(user => {
      store.dispatch({
        type: 'USER',
        user,
      });
      setUser(user);
      if (user) {
        // console.log(user, 'user hai');
        // console.log("app js User")
        AppState.addEventListener('change', _handleAppStateChange)
        const UserObj = {
          displayName: user.displayName,
          PhotoUrl: user.photoURL,
          UserEmail: user.email,
          UserUid: user.uid,
          // IsOnline:false
        };
        // console.log(user, 'uid');
        checkPermission(user)
        store.dispatch(ChatDashboard());
      store.dispatch(AllUserAction());

        firestore()
        .collection('Users')
        .doc(user?.uid)
        .set(UserObj, { merge: true });
      }
      
    });
  };
  const _handleAppStateChange = (NextAppState) => {
    const UserUid = store?.getState()?.UserReducer?.user?.uid;

    console.log(NextAppState, "next state")
    if (NextAppState === 'active') {
      // console.log("online")
      firestore().collection('Users').doc(UserUid).update({ IsOnline: true })

    } else {
      alert(NextAppState)
      // console.log('offline')
      firestore().collection('Users').doc(UserUid).update({ IsOnline: false })

    }
  }
  useEffect(() => {
    console.log("app js useeffect")

    checkUser();
    // messaging().onMessage((msg)=>{console.log(msg,"foreground")})
    messaging().onMessage(async remoteMessage => {
      // console.log(JSON.stringify(remoteMessage), "check forground");
      PushNotification.localNotification({
        title: remoteMessage.notification.title,
        message:  remoteMessage.notification.body
      })
    });

    SplashScreen.hide()
  }, []);


  const checkPermission = async (userUId) => {
    messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          console.log("Permission granted");
          getToken(userUId);
        } else {
          console.log("Request Permission");
          requestPermission(userUId);
        }
      });
  }
  const requestPermission = async (userUId) => {
    messaging().requestPermission(userUId)
      .then(() => {
        getToken(userUId);
      })
      .catch(error => {
        console.log('permission rejected');
      });
  }

  const getToken = async (userUId) => {
    let fcmToken = await messaging().getToken();
    console.log("after fcmToken: ", fcmToken);
    firestore().collection("FcmTokens").doc(fcmToken).set({ uid: userUId?.uid })
  }
  return (
    <Provider store={store}>
      <Navigation user={user} />
    </Provider>
  );
};

export default App;
