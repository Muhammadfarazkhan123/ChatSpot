/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification"



messaging().setBackgroundMessageHandler(async remoteMessage => {
    // PushNotification.localNotification({
    //     title: remoteMessage.notification.title,
    //     message:  remoteMessage.notification.body
    //   })
    console.log('Message handled in the background!', remoteMessage);
  });
  

AppRegistry.registerComponent(appName, () => App);
