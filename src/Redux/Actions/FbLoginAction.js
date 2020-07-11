import auth from '@react-native-firebase/auth';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
} from 'react-native-fbsdk';
import { Alert } from "react-native";
import NavigationService from '../../Navigation/NavigationService';
import {LinkingWithGoogle} from "./GoogleLoginaAction";

const _firebaseFbLogin = async accessToken => {
  try {
    const fbCredential = auth.FacebookAuthProvider.credential(accessToken);

  return await auth().signInWithCredential(fbCredential);
  } catch (error) {
    // console.log(error.code,"error with diff")
    if(error.code === 'auth/account-exists-with-different-credential'){
      Alert.alert(
        "warning",
        "You already Login with this Account Before",
        [
          {
            text:"ok",
            onPress:()=>{LinkingWithCredential(accessToken)}
          }
        ]

      )
    

    }else{
      console.log(error.code,"error")
    }
  }
};

const LinkingWithCredential=async (accessToken)=>{
 try {
  const fbCredential = auth.FacebookAuthProvider.credential(accessToken);
  return await LinkingWithGoogle(fbCredential)
 } catch (error) {
   console.log(error,"linking error")
 }
}
const FbLogin = props => {
  return dispatch => {
    try {
      LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        async result => {
          if (result.isCancelled) {
          } else {
            const {accessToken} = await AccessToken.getCurrentAccessToken();

            const responseInfoCallback = async (error, user) => {
              if (error) {
                console.log("Login fail with error:"+error)
              } else {
                const firebaseFacebookLogin = await _firebaseFbLogin(
                  accessToken,
                );
              }
            };

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken,
                parameters: {
                  fields: {
                    string: 'id,email,name,picture.width(240).height(240)',
                  },
                },
                version: 'v6.0',
              },
              responseInfoCallback,
            );

            new GraphRequestManager().addRequest(infoRequest).start();
          }
        },
        // function(error) {
        //   console.log('Login fail with error: ' + error);
        // },
      );
    } catch (error) {
      console.log(error,"error with diff");
    }
  };
};

export {FbLogin};
