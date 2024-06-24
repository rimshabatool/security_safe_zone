import React, { useState ,useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity,ScrollView,Pressable,text, Modal,map ,Text, TextInput,FlatList,Alert, Button} from 'react-native';
import { url } from '../url';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
const ApprovedReports = ({ navigation }) => {
    const route = useRoute();
    const selectid2 = route.params?.pid2;
const[viewdata,setviewdata]=useState();
const[savedata,setsavedata]=useState();
 
  
  useEffect(() => {
    console.log(savedata)
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/Police/Approved?pid=${selectid2}`, {
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
      {savedata && savedata.length > 0 ? (
        savedata.map(item => (
            <View key={item.id} style={{marginLeft:5,marginTop:10,borderColor:'#20b2aa',borderWidth:2,borderRadius:15,width:375,height:200}}>
            <Icon name="check" size={60} color='black' style={{alignSelf:'center'}}/>
            <Text style={{ fontWeight: 'bold',color:'#20b2aa',fontWeight:'bold',fontSize:30 }}>Type:</Text><Text style={{color:'black',marginTop:-48,marginLeft:70,fontSize:25}}>{item.type}</Text>
            <Text style={{ fontWeight: 'bold',color:'#20b2aa',fontWeight:'bold' ,fontSize:30}}>Date:</Text><Text style={{color:'black',marginTop:-48,marginLeft:70,fontSize:25}}>{item.dateTime}</Text>
            <Text style={{color:'black',marginTop:-10,fontSize:27,alignSelf:'center',fontWeight:'bold'}}>{item.status}</Text>
           
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

export default ApprovedReports;
