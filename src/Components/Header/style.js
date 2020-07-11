import { Dimensions, StyleSheet } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({

    MainHeader: {
        flexDirection: "row",
        justifyContent: "space-around",
        height: hp(14),
        backgroundColor: 'rgb(210, 211, 216)',
        alignItems: "center"
    },
    HeaderHeading: {
        fontSize:wp(6)
    }

});
