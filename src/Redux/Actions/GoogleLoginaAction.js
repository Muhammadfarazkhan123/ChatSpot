import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

const GoogleLogin = () => {
  return async dispatch => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
  };
};

export const LinkingWithGoogle=async (fbCredentials)=>{
  console.log(fbCredentials,"fbcredential")
 const googleLogin= await GoogleSignin.signIn();
 const credential=auth.GoogleAuthProvider.credential(
   googleLogin.idToken,
   googleLogin.accessToken
 )
 console.log(googleLogin.accessToken,"accessToken")
 await auth().signInWithCredential(credential);
  await auth().currentUser.linkWithCredential(fbCredentials)

}
export {GoogleLogin};
