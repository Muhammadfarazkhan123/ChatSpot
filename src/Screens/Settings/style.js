import { Dimensions, StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  // profile Image
  ProfileView: { alignItems: "center", marginTop: hp(3) },
  ProfileImage: { width: wp(40), height: wp(40), borderRadius: wp(40), borderWidth: 1 },
  ProfileName: {
    fontSize: wp(6),
    fontWeight: "bold",
  },
  MainListView: {
    elevation: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: wp(5),
    paddingTop:wp(3),
    paddingBottom: wp(2),
  },
  TouchStyle: {
    flexDirection: "row",
    paddingHorizontal: wp(8),
    paddingVertical: wp(4),
    justifyContent: "space-between"
  },
  IconStyle: {
    fontWeight: "bold"
  },
  TextStyle: {
    fontSize: wp(5),
    marginLeft: wp(5)
  }

});
