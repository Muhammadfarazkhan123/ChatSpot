import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/Redux/store';
import Navigation from './src/Navigation/stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen'
import {ChatDashboard} from './src/Redux/Actions/ChatDashboardAction'

const App = () => {
  const [user, setUser] = useState();
  const [Update, setUpdate] = useState(true);
  const checkUser = () => {
    auth().onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        console.log(user, 'user hai');
        store.dispatch({
          type: 'USER',
          user,
        });
        
        const UserObj = {
          displayName: user.displayName,
          PhotoUrl: user.photoURL,
          UserEmail: user.email,
          UserUid: user.uid,
          // IsOnline:false
        };
        console.log(user, 'uid');
        firestore()
          .collection('Users')
          .doc(user?.uid)
          .set(UserObj, {merge: true});
      }
    store.dispatch(ChatDashboard());

    });
  };
  useEffect(() => {
    checkUser();
    SplashScreen.hide()
  }, []);
  return (
    <Provider store={store}>
      <Navigation user={user} />
    </Provider>
  );
};

export default App;
