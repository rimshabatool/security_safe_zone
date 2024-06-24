import React from 'react'
import { View,StyleSheet,Text,Image,TouchableOpacity,TextInput} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useRoute } from '@react-navigation/native';

const UserHome = ({ navigation }) => {
    const route = useRoute();
    const selectid = route.params?.user;
    return(
        <View>

            <Text style={{backgroundColor:'black',width:430,height:80,fontSize:50,textAlign:'center',color:'#20b2aa',fontWeight:'bold'}}>Safe Zone</Text>
            <Image style={styles.upperlogo}source={require('../../assests/uparlogo.png')}/>
            <Text style={{color:'black',fontSize:26,fontWeight:'bold',alignSelf:'center',marginTop:40}}>Welcome to dear User</Text>
            <TouchableOpacity onPress={() => navigation.navigate('LetsMoveSafely')}><Text style={{color:'black',fontSize:30,backgroundColor:'#20b2aa',alignSelf:'center',borderRadius:30,height:50,width:250,fontWeight:'bold',textAlign:'center',marginTop:20}}>Let's Move Safely</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ReportIncident', { useridreport: selectid})}><Text style={{color:'black',fontSize:30,backgroundColor:'#20b2aa',alignSelf:'center',borderRadius:30,height:50,width:250,fontWeight:'bold',textAlign:'center',marginTop:20}}>Report Incident</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Userreports', { useridreport: selectid})}><Text style={{color:'black',fontSize:30,backgroundColor:'#20b2aa',alignSelf:'center',borderRadius:30,height:50,width:250,fontWeight:'bold',textAlign:'center',marginTop:20}}>All Reports</Text></TouchableOpacity>
            <Image style={styles.niche}source={require('../../assests/niche.png')}/>
        </View>

    )
}
export default UserHome
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
            marginTop:360,
            height:100,
            width:100
        }
    })