import { Dimensions, StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  // DashboardSearch
  DashboardSearch: {
    textAlign: "right",
    marginTop: hp("5%"),
    marginRight: hp("5%"),
    marginBottom: hp("1%")

  },
  // HeadingStyle
  HeadStyle: {
    marginLeft: wp("5%"),
    fontSize: wp(10),
    fontWeight: "bold",
    marginBottom: hp(2)

  },
  // FlatList
  ListImg: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(18),
    marginLeft: wp('3%'),
  },

  MainListView: {
    flexDirection: 'row',
    marginTop: hp('1%'),
    padding: hp('2%'),
    flex: 1,
  },
  ListView: {
    flexDirection: 'row',
  },
  ListTitle: { color: 'black', fontSize: wp(5) },
  LastMsgStyle: {
    color: "grey",
    fontSize: wp(4.5),
    paddingTop: wp(2)
  },
  NameTimeStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: wp(5)
  },
  msgNotiView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: wp(5)
  },
  MainNameView: {
    flex: 1,
    flexDirection: "column",
  },
  msgNoti: {
    backgroundColor: "rgb(28, 98, 219)",
    padding: wp(2),
    borderRadius: wp(3),
    paddingHorizontal: wp(3)
  },
  OnlineDot:{
    height:"30%",
    width:"25%",
    borderRadius:wp(10),
    position:"absolute",
    backgroundColor:"green",
    bottom:0,
    right:wp(0.5),
    borderWidth:3,
    borderColor:"white",

  },

  //   HorizonatlScroll Users
  UsersScroll: {
    flexDirection: 'row',
    flex: 1,

    // elevation: 1,
    height: hp('17%'),
    padding: hp('1%'),
    paddingRight: 0,
  },
  UserScrollText: {
    color: 'grey',
    marginLeft: wp('3%'),
    fontSize: 15,
    fontWeight: 'bold',
  },
  UsersMainView: {
    flexDirection: 'row',
    flex: 1,
    width: wp('20%'),
    marginLeft: wp('2%'),
  },
  UsersImg: {
    width: wp('19%'),
    borderRadius: 50,
    borderColor: 'grey',
    borderWidth: 3,
  },
  UsersName: { textAlign: 'center', fontWeight: 'bold' },

  // search
  SearchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 5,
  },
  SearchIcon: { marginTop: 10, marginLeft: 8 },

  SearchView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#c8c8c8',
    margin: 5,
    borderRadius: 50,
    elevation: 1,
    marginTop: 10,
    marginBottom:hp(2)
  },

  // GroupBUtton
  GroupBUtton: { position: 'absolute', bottom: 15, alignSelf: 'flex-end', right: 15, justifyContent: "center", },
  GroupIconView: {
    borderRadius: wp(18),
    height: wp(18),
    width: wp(18),
    backgroundColor: "rgb(215, 117, 235)",
    alignItems: "center",
    justifyContent: "center"
  },

  // MODAL
  mainView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
  },
  innerView:{
    backgroundColor: 'white',
    height: '90%',
    marginTop: '18%',
    width: '100%',
    alignSelf: 'center',
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
    padding: 10,
  },
  CloseButton:{
    alignSelf: 'flex-end',
    marginBottom:hp(3)
  },
  GroupAdd:{
    flexDirection:"row",
    alignItems:"center",
  },
  AddImg:{
    alignItems:"center"
  },
  NameIcon:{ 
    flex:1 ,
    flexDirection: "row", 
    alignItems: "center",
    // paddingTop:wp(1)
  },
  GroupInput:{
    marginHorizontal:wp(4),
    borderWidth:1,
    flex:1,
    fontSize:16,
    borderRadius:wp(10),
    elevation:1,
    borderColor:"#c8c8c8",
    paddingLeft:wp(3)
  },

// GroupList
MainList:{
flexDirection:"row",
justifyContent:"space-between",
paddingVertical:wp(2),
paddingHorizontal:wp(3)
},
GroupListView:{
  flexDirection:"row",
  alignItems:"center"
},
GroupListImg:{
  height:wp(15),
  width:wp(15),
  borderRadius:wp(15)
},
GroupListTitle:{
  marginLeft:wp(3),
  fontSize:wp(5)
}



});

