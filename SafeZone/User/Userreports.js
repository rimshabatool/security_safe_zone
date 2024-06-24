import React, { useState ,useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity,ScrollView,Pressable,text, Modal,map ,Text, TextInput,FlatList,Alert, Button} from 'react-native';
import { url } from '../url';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
const Userreports = ({ navigation }) => {
    const route = useRoute();
    const selectid2 = route.params?.useridreport;
const[savedata,setsavedata]=useState();
 
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/AppUser/GetUserAllReports?Uid=${selectid2}`, {
        method: 'GET',
      });
      
      if (response.ok) {
        const result = await response.json();
        setsavedata(result)
    } else {
        const errorData = await response.json();
        throw new Error(errorData.message || ' failed');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error(' Error:', error);
    }
  };
  
 return (
    
    <View style={{flex:1}}>

<ScrollView>
    <Text style={{color:'black',fontSize:20}}>{selectid2}</Text>
      {savedata && savedata.length > 0 ? (
        savedata.map(item => (
           
            <View key={item.id} style={{marginLeft:5,marginTop:10,borderColor:'#20b2aa',borderWidth:2,borderRadius:15,width:375,height:270}}>
            <Icon name="close" size={60} color='black' style={{alignSelf:'center'}}/>
            <Text style={{ fontWeight: 'bold',color:'#20b2aa',fontWeight:'bold',fontSize:30 }}>Type:</Text><Text style={{color:'black',marginTop:-48,marginLeft:70,fontSize:25}}>{item.type}</Text>
            <Text style={{ fontWeight: 'bold',color:'#20b2aa',fontWeight:'bold' ,fontSize:30}}>Date:</Text><Text style={{color:'black',marginTop:-48,marginLeft:70,fontSize:25}}>{item.dateTime}</Text>
            <Text style={{ fontWeight: 'bold',color:'#20b2aa',fontWeight:'bold' ,fontSize:30}}>Category:</Text><Text style={{color:'black',marginTop:-48,marginLeft:110,fontSize:25}}>{item.category}</Text>
            <Text style={{ fontWeight: 'bold',color:'#20b2aa',fontWeight:'bold' ,fontSize:30}}>Status:</Text><Text style={{color:'black',marginTop:-48,marginLeft:110,fontSize:25}}>{item.status}</Text>


          </View>
        ))
      ) : (
        <Text style={{color:'black'}}>No data available</Text>
      )}
</ScrollView>
   
  


<View style={{width:100,marginLeft:300,backgroundColor:'transparent'}}>
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
   
    padding: 35,
    alignItems: 'center',
    width:250,
    height:300
   
  },
});

export default Userreports;
