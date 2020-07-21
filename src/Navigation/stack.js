import React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from "react-native-vector-icons/EvilIcons"
import FeatherIcon from "react-native-vector-icons/Feather";
import { navigationRef } from './NavigationService';
import store from '../Redux/store';
import { Image, Text, View } from 'react-native';

// Files
import Login from '../Screens/Login/index';
import ChatDashboard from '../Screens/ChatDashboard/index';
import AllUsers from '../Screens/AllUsers/index';
import Settings from '../Screens/Settings/index';
import ChatBox from '../Screens/ChatBox/index';
import styles from './style';
import style from '../Screens/ChatDashboard/style';

const Navigation = props => {
  const LoginStack = createStackNavigator();
  const LoginstackNavigator = () => {
    return (
      <LoginStack.Navigator
        screenOptions={{
          animationEnabled: false,
        }}>
        <LoginStack.Screen name="Login" component={Login} options={() => ({
          headerShown: false,
        })} />
      </LoginStack.Navigator>
    );
  };

  const Userstack = createStackNavigator();
  const AllUserStack = () => {
    const { user } = props;
    const chatUser = store?.getState()?.ActiveChatReducer?.ChatUser;
    const UserName = store?.getState()?.ActiveChatReducer?.ChatUser
      ?.displayName;
    const photouri = store?.getState()?.ActiveChatReducer?.ChatUser?.PhotoUrl;
    // console.log(store?.getState()?.ActiveChatReducer?.ChatUser, 'chatuser');
    const arr = UserName?.split(' ');
    var name = arr
      ?.map(item => item.charAt(0).toUpperCase() + item.slice(1))
      .join(' ');
    // console.log(name, 'name');

    return (
      <Userstack.Navigator>
        <Userstack.Screen
          name="Allusers"
          component={AllUsers}
          options={() => ({
            headerShown: false,
          })}
        />
        <Userstack.Screen
          name="ChatBox"
          component={ChatBox}
          options={() => ({
            headerShown:false,
            headerTitle: () => {
              return (
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  <Image
                    source={{ uri: chatUser?.PhotoUrl }}
                    style={styles.stackImage}
                  />
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                      {name}
                    </Text>
                    <Text>Active Now</Text>
                  </View>
                </View>
              );
            }
          })}
        />
      </Userstack.Navigator>
    );
  };

  const Stack = createStackNavigator();
  const ChatDashboardStackNavigator = () => {
    const { user } = props;
    const chatUser = store?.getState()?.ActiveChatReducer?.ChatUser;
    const UserName = store?.getState()?.ActiveChatReducer?.ChatUser?.displayName;
    const photouri = store?.getState()?.ActiveChatReducer?.ChatUser?.PhotoUrl;
    // console.log(store?.getState()?.ActiveChatReducer?.ChatUser, 'chatuser');
    const arr = UserName?.split(' ');
    var name = arr
      ?.map(item => item.charAt(0).toUpperCase() + item.slice(1))
      .join(' ');

    return (
      <Stack.Navigator>
        <Stack.Screen
          name="ChatDashboard"
          component={ChatDashboard}
          options={() => ({
            // headerLeft: () => (
            //   <Image source={{ uri: user.photoURL }} style={styles.stackImage} />
            // ),
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="ChatBox"
          component={ChatBox}
          options={() => ({
            // headerLeft: () => (
            //   <Image source={{uri: photouri}} style={styles.stackImage} />
            // ),
            // title: name,
            headerStyle: styles.headerStyling,
            headerShown: false,
            // headerTitle: () => {
            //   if (chatUser.hasOwnProperty('MemberUid')) {
            //     return (
            //       <View style={{ flexDirection: 'row', flex: 1 }}>
            //         <Image
            //           source={{ uri: chatUser?.GroupImage }}
            //           style={styles.stackImage}
            //         />
            //         <View>
            //           <Text
            //             style={{
            //               fontSize: 20,
            //               fontWeight: 'bold',
            //               marginTop: '10%',
            //             }}>
            //             {chatUser?.groupName}
            //           </Text>
            //           {/* <Text>Active Now</Text> */}
            //         </View>
            //       </View>
            //     );
            //   } else if (!chatUser.hasOwnProperty('MemberUid')) {
            //     return (
            //       <View style={{ flexDirection: 'row', flex: 1 }}>
            //         <Image
            //           source={{ uri: chatUser?.PhotoUrl }}
            //           style={styles.stackImage}
            //         />
            //         <View>
            //           <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            //             {name}
            //           </Text>
            //           <Text>Active Now</Text>
            //         </View>
            //       </View>
            //     );
            //   }
            // },
          })}
        />
      </Stack.Navigator>
    );
  };

  const NotShowTab = ['ChatBox'];

  const showTab = (route, array) => {
    const RouteName = route?.state?.routes[route.state.index]?.name;
    return !array.includes(RouteName);
  };

  const Tab = createBottomTabNavigator();
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Login') {
              return <Ionicons name="md-Login" size={30} color={focused ? 'black' : "grey"} />;
            } else if (route.name === 'Chat') {
              return <MatIcon name="chat-bubble-outline" size={30} color={focused ? 'black' : "grey"} />;

            } else if (route.name === 'Find Friends') {
              return <FeatherIcon name="user" size={30} color={focused ? 'black' : "grey"} />;
            } else if (route.name === 'Settings') {
              return <FeatherIcon name="settings" size={30} color={focused ? 'black' : "grey"} />;

            }

            // You can return any component that you like here!
          },

        })
        }
        initialRouteName="Chat"
        tabBarOptions={
          {
            showLabel: false
          }
        }
      >
        <Tab.Screen
          name="Chat"
          component={ChatDashboardStackNavigator}
          options={({ route }) => ({
            tabBarVisible: showTab(route, NotShowTab),

          })}
        />

        <Tab.Screen
          name="Find Friends"
          component={AllUserStack}
          options={({ route }) => ({
            tabBarVisible: showTab(route, NotShowTab),
          })}
        />

        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    );
  };

  const FINALStack = createStackNavigator();
  const FinalstackNavigator = () => {
    const { user } = props;
    return (
      <NavigationContainer>
        <FINALStack.Navigator headerMode="none">
          <FINALStack.Screen
            name="Final"
            component={user ? TabNavigator : LoginstackNavigator}
          />
        </FINALStack.Navigator>
      </NavigationContainer>
    );
  };

  return FinalstackNavigator();
};

export default Navigation;
