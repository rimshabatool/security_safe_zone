import React from 'react'
import { View,StyleSheet,Text,Image,TouchableOpacity,TextInput} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useRoute } from '@react-navigation/native';

const PoliceHome = ({ navigation }) => {
    const route = useRoute();
    const selectid = route.params?.pid;
    return(
        <View>
            <Text style={{backgroundColor:'black',width:430,height:80,fontSize:50,textAlign:'center',color:'#20b2aa',fontWeight:'bold'}}>Safe Zone</Text>
            <Image style={styles.upperlogo}source={require('../../assests/uparlogo.png')}/>
            <Text style={{color:'black',fontSize:26,fontWeight:'bold',alignSelf:'center',marginTop:40}}>Welcome to dear Police</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Allreports',{pid2:selectid})}><Text style={{color:'black',fontSize:30,backgroundColor:'#20b2aa',alignSelf:'center',borderRadius:30,height:50,width:250,fontWeight:'bold',textAlign:'center',marginTop:20}}>Verify Reports</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ApprovedReports',{pid2:selectid})}><Text style={{color:'black',fontSize:30,backgroundColor:'#20b2aa',alignSelf:'center',borderRadius:30,height:50,width:250,fontWeight:'bold',textAlign:'center',marginTop:20}}>Approved</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Rejected',{pid2:selectid})}><Text style={{color:'black',fontSize:30,backgroundColor:'#20b2aa',alignSelf:'center',borderRadius:30,height:50,width:250,fontWeight:'bold',textAlign:'center',marginTop:20}}>Rejected</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AddIncidentByPolice',{pid2:selectid})}><Text style={{color:'black',fontSize:30,backgroundColor:'#20b2aa',alignSelf:'center',borderRadius:30,height:50,width:250,fontWeight:'bold',textAlign:'center',marginTop:20}}>Add Incidents</Text></TouchableOpacity>

            <Image style={styles.niche}source={require('../../assests/niche.png')}/>
        </View>

    )
}
export default PoliceHome
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
            marginTop:250,
            height:100,
            width:100
        }
    })