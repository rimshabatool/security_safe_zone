import React, { useState ,useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity,ScrollView,Pressable,text, Modal,map ,Text, TextInput,FlatList,Alert, Button} from 'react-native';
import { url } from '../url';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
const Allreports = ({ navigation }) => {
    const route = useRoute();
    const selectid2 = route.params?.pid2;
const[savedata,setsavedata]=useState();
 
  
  useEffect(() => {
    console.log(savedata)
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/Police/GetAllReports?pidId=${selectid2}`, {
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
  const handleapproved = async (id) => {
    try {
     
        const response = await fetch(`${url}/Police/ApproveReport?pid=${selectid2}&id=${id}`, {
            method: 'PUT',
        });
        console.log(response)
        if (response.ok) {
            Alert.alert('updated')          
            fetchData()
         
      } else {
          const errorData = await response.json();
          throw new Error(errorData.message || ' failed');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
        console.error(' Error:', error);
      }
    };
    const handlereject = async (id) => {
        try {
         
            const response = await fetch(`${url}/Police/RejectReport?pid=${selectid2}&id=${id}`, {
                method: 'PUT',
            });
            console.log(response)
            if (response.ok) {
Alert.alert('updated')          
 fetchData()
             
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
           
            <View key={item.id} style={{marginLeft:5,marginTop:10,borderColor:'#20b2aa',borderWidth:2,borderRadius:15,width:375,height:270}}>
            <Icon name="close" size={60} color='black' style={{alignSelf:'center'}}/>
            <Text style={{ fontWeight: 'bold',color:'#20b2aa',fontWeight:'bold',fontSize:30 }}>Type:</Text><Text style={{color:'black',marginTop:-48,marginLeft:70,fontSize:25}}>{item.type}</Text>
            <Text style={{ fontWeight: 'bold',color:'#20b2aa',fontWeight:'bold' ,fontSize:30}}>Date:</Text><Text style={{color:'black',marginTop:-48,marginLeft:70,fontSize:25}}>{item.dateTime}</Text>
            <Text style={{ fontWeight: 'bold',color:'#20b2aa',fontWeight:'bold' ,fontSize:30}}>Category:</Text><Text style={{color:'black',marginTop:-48,marginLeft:110,fontSize:25}}>{item.category}</Text>

<View style={{flexDirection:'row'}}>
<TouchableOpacity  onPress={() => handleapproved(item.id)} style={{backgroundColor:'#20b2aa',width:130,marginLeft:15,borderRadius:20}}><Text style={{color:'black',fontWeight:'bold',fontSize:20,alignSelf:'center'}}>Approved</Text></TouchableOpacity>           
<TouchableOpacity onPress={() => handlereject(item.id)} style={{backgroundColor:'#20b2aa',width:130,marginLeft:80,borderRadius:20}}><Text style={{color:'black',fontWeight:'bold',fontSize:20,alignSelf:'center'}}>Rejected</Text></TouchableOpacity>           
</View>
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

export default Allreports;
