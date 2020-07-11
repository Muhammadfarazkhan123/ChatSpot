import React from 'react'
import {View,Text,TouchableOpacity } from "react-native";
import MatIcon from 'react-native-vector-icons/MaterialIcons'
import styles from './style'

const Header=props=>{
    return(
        <View style={styles.MainHeader}>
            <TouchableOpacity onPress={()=>{props.chatProps.navigation.goBack()}}><MatIcon size={30} color="black" name="arrow-back" /></TouchableOpacity>
            <Text style={styles.HeaderHeading}>{props.HeaderName}</Text>
            <MatIcon size={30} color="black" name="info-outline"/>
        </View>
    )
}
export default Header

