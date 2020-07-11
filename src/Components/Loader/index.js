import React from 'react'
import { ActivityIndicator,View } from "react-native";

const Loader=()=>{
    return(
        <View style={{height:'100%',width:"100%",position:"absolute",flex:1,justifyContent:"center",zIndex:1,backgroundColor:"rgba(0,0,0,0.7)"}}>
            <ActivityIndicator color="rgb(28, 98, 219)" size={80}/>
        </View>
    )
}

export default Loader