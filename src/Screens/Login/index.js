import React, { Component, useEffect } from 'react';
import { Container } from 'native-base';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import AppIntroSlider from 'react-native-app-intro-slider';

import styles from './style';
import store from '../../Redux/store';
import { FbLogin } from '../../Redux/Actions/FbLoginAction';
import { GoogleLogin } from '../../Redux/Actions/GoogleLoginaAction';

const Login = (props) => {
  const slides = [
    {
      key: 'one',
      title: 'Friends Chat',
      text: 'Chat with your Friends and \enjoy your moments',
      image: require('../../Assets/13-512.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 'two',
      title: 'Group Chat',
      text: 'Groups for connecting office Employes and friends',
      image: require('../../Assets/mobile.sms.communication-512.png'),
      backgroundColor: '#febe29',
    },
    {
      key: 'three',
      title: 'Notification',
      text: 'Get your Important message on time with notification',
      image: require('../../Assets/kisspng-digital-marketing-web-banner-advertising-promotion-creative-ideas-5adb74b5f08834.2506242615243317019852.jpg'),
      backgroundColor: '#22bcb5',
    }
    
  ];
  useEffect(() => {
    GoogleSignin.configure({
      forceCodeForRefreshToken:true,
      webClientId:
        '107228495211-631plvhq99de2uro3nl2e1418bqg83u9.apps.googleusercontent.com',
    });
  }, []);

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.SliderItemView}>
        <Text style={styles.SliderTitle}>{item.title}</Text>
        <Image source={ item.image } style={styles.SliderImage} resizeMode="contain"/>
        <Text style={styles.SliderText}>{item.text}</Text>
      </View>
    );
  }
  return (
    <View>
      <View style={styles.SliderView}>
        <AppIntroSlider renderItem={_renderItem} data={slides} 
        activeDotStyle={{backgroundColor:"rgb(59, 89, 152)"}}
        // dotStyle={{marginTop:"5%"}}
        />
      </View>

      <View
        style={styles.ButtonView}>
        <TouchableOpacity
          style={styles.ButtonStyleGoogle}
          onPress={() => {
            store.dispatch(GoogleLogin());
          }}>
            <Image source={require('../../Assets/google-logo-google-search-icon-png-favpng-DLXaPGArrFH6yJjYE8USnMuvX.jpg')} resizeMode="contain" style={styles.ButtonIcon}/>
          <Text style={{ color: 'black'}}>
            Continue With Google
          </Text>
        </TouchableOpacity>

        {/* <View style={styles.lineContainer}>
          <View style={styles.hairline} />
          <Text>OR</Text>
          <View style={styles.hairline} />
        </View> */}

        <TouchableOpacity
          style={styles.ButtonStyleFb}
          onPress={() => {
            store.dispatch(FbLogin(props));
          }}>
            <Image source={require("../../Assets/facebook-f-logo-white-background-21.jpg")} resizeMode="contain" style={styles.ButtonIcon}/>

          <Text style={{ color: 'white'}}>
          Continue with facebook
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
