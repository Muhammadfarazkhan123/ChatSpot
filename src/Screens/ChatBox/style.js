import {Dimensions, StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  MsgBoxView: {
    flexDirection: 'row',
    width: wp(96),
    alignItems:"center",
    borderRadius: wp(8),
    borderColor: 'lightgrey',
    elevation: 1,
    borderWidth: 1,
    paddingHorizontal:wp(3),
    marginHorizontal:wp(2),
  },
  MsgBoxInput: {
    flex: 1,
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
    fontSize: 16,
    maxHeight: hp('20%'),
    minHeight: hp('8%'),
    paddingRight: 20,
    paddingLeft: 20,
  },
  MsgBoxIcon: {marginRight: wp(1),marginLeft:wp(2)},

  // MsgScrolView
  MsgScrolView:{
    borderTopLeftRadius:wp(8),
    borderTopRightRadius:wp(8),
    backgroundColor:"white",
    paddingHorizontal:wp(7),
    paddingTop:wp(3),
  }
});
