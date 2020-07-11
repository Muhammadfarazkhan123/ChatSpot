import { Dimensions, StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { color } from 'react-native-reanimated';

export default styles = StyleSheet.create({
  // OR LINE
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    // marginTop: hp('2%'),
  },
  hairline: {
    backgroundColor: '#e3e6e4',
    height: 1,
    width: wp('40%'),
  },
  // Slider Style
  SliderView: {
    width: wp(100),
    height: hp(70),
    marginTop: hp(3)
  },
  SliderItemView: {
    alignItems: "center",
    flex: 1
    // borderWidth:1
  },
  SliderImage: {
    width: '55%',
    height: "55%",
    marginTop: "10%"

  },
  SliderTitle: {
    fontSize: wp(7),
    fontWeight:"700",
    color:"rgb(59, 89, 152)"
  },
  SliderText: {
    fontSize: wp(5),
    color: 'grey',
    textAlign: "center",
    marginHorizontal:wp(5)
  },
  // BUTTONS
  ButtonView: {
    marginHorizontal: wp(5),
    marginTop: hp(0)

  },
  ButtonStyleFb: {
    flexDirection:"row",
    alignItems: 'center',
    paddingVertical: hp(2),
    borderRadius: hp(7),
    backgroundColor: "rgb(59, 89, 152)",
    justifyContent: "center",
    marginTop: hp(1)
  },
  ButtonStyleGoogle: {
    flexDirection:"row",
    alignItems: 'center',
    paddingVertical: hp(2),
    borderRadius: hp(7),
    backgroundColor: "white",
    justifyContent: "center",
    elevation: 0.5,
    marginTop: hp(3)
  },
  ButtonIcon:{
    height:wp(7),
    width:"10%",
    marginRight:wp(2)

  }



});
