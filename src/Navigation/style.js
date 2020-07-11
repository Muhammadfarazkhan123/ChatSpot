import {Dimensions, StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  stackImage: {
    width: wp('12%'),
    height: hp('7.2%'),
    // marginLeft: wp('4%'),
    borderRadius: 50,
  },
  headerStyling:{backgroundColor:"grey",
  elevation:0}
});
