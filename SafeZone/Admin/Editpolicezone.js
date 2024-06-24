import React, { useEffect, useState } from 'react';
import { View,StyleSheet, Text, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { url } from '../url';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

Editpolicezone = ({ navigation }) => {
    const route = useRoute();
    const pidd = route.params?.policeid;
const[city,setcity]=useState([]);
 const[area,setarea]=useState([]);
 const[selectedCity,setselectedcity]=useState();
 const [selectedarea, setSelectedarea] = useState('');
 const [policezone, setpolicezone] = useState('');
 const[assignzone,setassignzone]=useState();
 const [areaId, setAreaId] = useState(null); // State to store the id


 useEffect(() => {
  fetchCity();
  getpolicezone();
}, []);
useEffect(() => {
  fetchArea();



}, [selectedCity]);
//  ----get all citites------
 const fetchCity = async () => {
  try {
    const response = await fetch(url + 'Admin/getAllCities');
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    const result = await response.json();
    setcity(result);
  } catch (error) {
    console.error('Error fetching cities:', error);
    setcity([]);
  }
};
//  ----get police zone------

const getpolicezone = async () => {
  try {
    const response = await fetch(`${url}Admin/getZonesForPolice?pid=${pidd}`);
    if (!response.ok) {
      throw new Error('Failed to fetch areas');
    }
    const result = await response.json();
    setpolicezone(result);
  } catch (error) {
    console.error('Error fetching areas:', error);
    setpolicezone([]);
  }
};
// ---get all areas------

const fetchArea = async () => {
  try {
    const response = await fetch(`${url}Admin/GetAllAreas?city=${selectedCity}`);
    if (!response.ok) {
      throw new Error('Failed to fetch areas');
    }
    const result = await response.json();
    setarea(result);

    if (result.id) {
      setAreaId(result.id); // Save the id in state
    }

    console.log(result);
  } catch (error) {
    console.error('Error fetching areas:', error);
    setarea([]);
    setAreaId(null); // Reset the id in case of error
  }
};
const Assignzonetopolice = async () => {

  try {
    const response = await fetch(url+`Admin/AssignZoneToPolice?pid=${pidd}&zoneid=${selectedarea}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    

    if (response.ok) {
      Alert.alert('Assigned :)')
      console.log('Assign Successfully');
      getpolicezone();
    }
  
  } catch (error) {
    console.error('Error adding zone:', error);
    setassignzone([]);
  }
};
const handleDelete = async (id) => {
  try {
    const response = await fetch(`${url}Admin/RemovePoliceFromTheZone/?pid=${pidd}&zid=${id}`, {
      method: 'DELETE',
    });
console.log(response)
console.log(selectedarea)
console.log(pidd)

    if (response.ok) {
      Alert.alert('Success', 'zone deleted successfully');
      getpolicezone();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Delete failed');
    }
  } catch (error) {
    Alert.alert('Error', error.message);
    console.error('Delete Error:', error);
  }
};
 const renderItem = ({ item }) => (
    <View style={{flexDirection:'row',marginTop:30,backgroundColor:'white',}}>
      <Text style={{color:'black',fontSize:20,fontWeight:'bold',marginLeft:10,marginRight:20}}>{item.id}</Text>
      <Text style={{color:'black',fontSize:20,fontWeight:'bold',marginRight:200}}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
     <Icon name="trash" size={20} color='black' style={{marginRight:100}} /> 
     </TouchableOpacity>
      </View>
      
  );
  return (
    <ScrollView>
      <View style={styles.container}>
       
          <Text style={{color:'black',marginTop:-30,marginLeft:-350}}>{pidd}</Text>
<Text style={{color:'black',fontSize:25,fontWeight:'bold'}}>Add New</Text>
       <View style={{ borderColor: '#20b2aa', borderWidth:2, width: 360, alignSelf: 'center', height: 60, marginLeft: -13, marginTop: 17 }}>
       <Icon name="building" size={20} color='#20b2aa' style={{marginTop:20,marginLeft:5}} />
<Picker
          style={{ color: 'black',marginTop:-39,marginLeft:15 }}
          selectedValue={selectedCity}
          dropdownIconColor={'black'}
          onValueChange={(itemValue) => {
            setselectedcity(itemValue);
          }}
         >
        <Picker.Item label="Select City" value="select" />
          {city.map(city => (
            <Picker.Item key={city} label={city} value={city} />
          ))}
        </Picker>
      </View>
      <View style={{ borderColor: '#20b2aa', borderWidth:2, width: 360, alignSelf: 'center', height: 60, marginLeft: -13, marginTop: 17 }}>
       <Icon name="building" size={20} color='#20b2aa' style={{marginTop:20,marginLeft:5}} />
<Picker
          style={{ color: 'black',marginTop:-39,marginLeft:15 }}
          selectedValue={selectedarea}
          dropdownIconColor={'black'}
          onValueChange={(itemValue) => {
            setSelectedarea(itemValue);
          }}
         >
        <Picker.Item label="Select Area" value="select" />
          {area.map(area => (
            <Picker.Item key={area.id} label={area.name} value={area.id} />
          ))}
        </Picker>
      </View>
      <TouchableOpacity style={{alignSelf:'center',backgroundColor:'#20b2aa',borderRadius:20,marginTop:10}} onPress={Assignzonetopolice}><Text style={{ color: 'black' ,fontSize:22,width:70,marginLeft:20,fontWeight:'bold'}}>Add</Text></TouchableOpacity>

        <FlatList data={policezone} renderItem={renderItem} />
    
      </View>
    </ScrollView>
  );
};

export default Editpolicezone;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30,
    color: 'black',
  },
  addButton: {
    color: 'black',
    fontSize: 30,
    backgroundColor: '#20b2aa',
    alignSelf: 'center',
    borderRadius: 30,
    height: 50,
    width: 150,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center', // Centers the text vertically
    marginVertical: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '110%',
  },
  cellText: {
    color: 'black',
    flex: 1,
    textAlign: 'center',
    margin: 5,
    height: '100%',
    textAlignVertical: 'center', // Centers the text vertically
    
  },
  cellTextHeader: {
    color: 'black',
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 50,
    height: '100%',
    fontSize: 20,
    textAlignVertical: 'center', // Centers the text vertically
  },
});
