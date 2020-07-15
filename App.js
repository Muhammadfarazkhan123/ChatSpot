import React, { useState, useEffect } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import Navigation from './src/Navigation/stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen'
import { ChatDashboard } from './src/Redux/Actions/ChatDashboardAction'
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification"

const App = () => {
  const [user, setUser] = useState();
  const [Update, setUpdate] = useState(true);
  const checkUser = () => {
    
    auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        console.log(user, 'user hai');
        store.dispatch({
          type: 'USER',
          user,
        });
        console.log("app js User")
        const UserObj = {
          displayName: user.displayName,
          PhotoUrl: user.photoURL,
          UserEmail: user.email,
          UserUid: user.uid,
          // IsOnline:false
        };
        console.log(user, 'uid');
        checkPermission(user)
        store.dispatch(ChatDashboard());
        firestore()
        .collection('Users')
        .doc(user?.uid)
        .set(UserObj, { merge: true });
      }
      
    });
  };
  useEffect(() => {
    console.log("app js useeffect")

    checkUser();
    // messaging().onMessage((msg)=>{console.log(msg,"foreground")})
    messaging().onMessage(async remoteMessage => {
      console.log(JSON.stringify(remoteMessage), "check forground");
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
