import React from 'react'
import { View,StyleSheet,Text,Image,TouchableOpacity,TextInput} from 'react-native'
import { Picker } from '@react-native-picker/picker'
const AdminHome = ({ navigation }) => {
    return(
        <View>
            <Text style={{backgroundColor:'black',width:430,height:80,fontSize:50,textAlign:'center',color:'#20b2aa',fontWeight:'bold'}}>Safe Zone</Text>
            <Image style={styles.upperlogo}source={require('../../assests/uparlogo.png')}/>
            <Text style={{color:'black',fontSize:26,fontWeight:'bold',alignSelf:'center',marginTop:40}}>Welcome to dear Admin</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PoliceAccounts')}><Text style={{color:'black',fontSize:30,backgroundColor:'#20b2aa',alignSelf:'center',borderRadius:30,height:50,width:250,fontWeight:'bold',textAlign:'center',marginTop:20}}>Police Accounts</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('UserSecurity')}><Text style={{color:'black',fontSize:30,backgroundColor:'#20b2aa',alignSelf:'center',borderRadius:30,height:50,width:250,fontWeight:'bold',textAlign:'center',marginTop:20}}>User Security</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Threshold')}><Text style={{color:'black',fontSize:30,backgroundColor:'#20b2aa',alignSelf:'center',borderRadius:30,height:50,width:250,fontWeight:'bold',textAlign:'center',marginTop:20}}>Threshold</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Zones')}><Text style={{color:'black',fontSize:30,backgroundColor:'#20b2aa',alignSelf:'center',borderRadius:30,height:50,width:250,fontWeight:'bold',textAlign:'center',marginTop:20}}>Zones</Text></TouchableOpacity>

            <Image style={styles.niche}source={require('../../assests/niche.png')}/>
        </View>

    )
}
export default AdminHome
const styles = StyleSheet.create(
    {
        upperlogo:
        {
      
          
            height:70,
            width:60,
           marginLeft:60,
           marginTop:-75
        
        },
        niche:{
            marginTop:280,
            height:100,
            width:100
        }
    })