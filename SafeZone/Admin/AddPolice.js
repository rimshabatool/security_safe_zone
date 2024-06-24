import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Alert } from 'react-native';
import { url } from '../url';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';  // Adjust the import according to your library

const AddPolice = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [cnic, setCnic] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [databasearea, setDatabasearea] = useState([]);
  const [databaseCity, setDatabaseCity] = useState([]);
  const [selectedarea, setSelectedarea] = useState('');
const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    fetchCity();
  }, []);

  useEffect(() => {
      fetchArea();
    
   
   
  }, [selectedCity]);

  const handleRegisterPolice = async () => {
    try {
      const response = await fetch(`${url}Admin/AddPolice?pass=${password}&email=${email}&cnic=${cnic}&phone=${phone}&zid=${selectedarea}`, {
        method: 'POST',
      });
      console.log('Registration Error:', response);
     

      if (response.ok) {
        Alert.alert('Success', 'User registered successfully');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Registration Error:', error);
    }
  };

  const fetchCity = async () => {
    try {
      const response = await fetch(url + 'Admin/getAllCities');
     
      if (!response.ok) {
        throw new Error('Failed to fetch cities');
      }
      const result = await response.json();
      setDatabaseCity(result);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setDatabaseCity([]);
    }
  };
// const handlenewbutton= async()=>{
//   setSelectedCity('');
//   setSelectedOption('new');
// console.log("new selected");

// }

// const handleexistingbutton= async()=>{
//   setSelectedCity('');
//   setSelectedOption('existing');
//       console.log("existing selected");
     


// }
  const fetchArea = async () => {
    try {
      const response = await fetch(`${url}Admin/GetAreas?city=${selectedCity}`);
      if (!response.ok) {
        throw new Error('Failed to fetch areas');
      }
      const result = await response.json();
      setDatabasearea(result);
    } catch (error) {
      console.error('Error fetching areas:', error);
      setDatabasearea([]);
    }
  };
  const fetchAreaexisting = async () => {
    
    try {
      const response = await fetch(`${url}Admin/GetAreasofexixting?city=${selectedCity}`);
      if (!response.ok) {
        throw new Error('Failed to fetch areas');
      }
      const result = await response.json();
      setDatabasearea(result);
    } catch (error) {
      console.error('Error fetching areas:', error);
      setDatabasearea([]);
    }
  };
  return (
    <ScrollView style={styles.main}>
      <Text style={{ fontSize: 50, color: 'black', backgroundColor: 'white', fontWeight: 'bold', marginLeft: 30 }}>Add</Text>
      <Text style={{ fontSize: 20, color: 'black', backgroundColor: 'white', fontWeight: 'bold', marginLeft: 20, marginTop: -10 }}>Police Account</Text>
      <View style={{ marginTop: 29, marginLeft: 25 }}><Icon name="envelope" size={30} color='#20b2aa' /></View>
      <TextInput placeholder="Email" placeholderTextColor="black" textAlign='center' value={email} onChangeText={(text) => setEmail(text)} style={styles.textInput} />
      <View style={{ marginTop: 29, marginLeft: 25 }}><Icon name="lock" size={30} color='#20b2aa' /></View>
      <TextInput placeholder="Password" placeholderTextColor="black" textAlign='center' value={password} onChangeText={(text) => setPassword(text)} style={styles.textInput} />
      <View style={{ marginTop: 29, marginLeft: 25 }}><Icon name="lock" size={30} color='#20b2aa' /></View>
      <TextInput placeholder="Confirm Password" placeholderTextColor="black" textAlign='center' value={confirmpassword} onChangeText={(text) => setConfirmpassword(text)} style={styles.textInput} />
      <View style={{ marginTop: 29, marginLeft: 25 }}><Icon name="id-card" size={30} color='#20b2aa' /></View>
      <TextInput placeholder="CNIC" placeholderTextColor="black" textAlign='center' keyboardType='numeric' value={cnic} onChangeText={(text) => setCnic(text)} style={styles.textInput} />
      <View style={{ marginTop: 29, marginLeft: 25 }}><Icon name="phone" size={30} color='#20b2aa' /></View>
      <TextInput placeholder="Phone" placeholderTextColor="black" keyboardType='numeric' textAlign='center' value={phone} onChangeText={(text) => setPhone(text)} style={styles.textInput} />
      {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginTop: 20 }}>
        <RadioButton color='#20b2aa' value="new" status={selectedOption === 'new' ? 'checked' : 'unchecked'} onPress={handlenewbutton} />
        <Text style={{ color: 'black', fontSize: 20 }}>New</Text>
        <RadioButton color='#20b2aa' value="existing" status={selectedOption === 'existing' ? 'checked' : 'unchecked'} onPress={handleexistingbutton} />
        <Text style={{ color: 'black', fontSize: 20 }}>Existing</Text>
      </View> */}
      <Text style={{ fontSize: 20, color: 'black', marginLeft: 20, fontWeight: 'bold', marginTop: 10 }}>Location:</Text>
      <View style={{ borderColor: '#20b2aa', borderWidth: 1.5, width: 330, alignSelf: 'center', height: 60, marginLeft: -13, marginTop: 17 }}>

        <Picker
          style={{ color: 'black' }}
          selectedValue={selectedCity}
          dropdownIconColor={'black'}
          onValueChange={(itemValue) => {
            setSelectedCity(itemValue);
          }}
        >
          <Picker.Item label="Select City" value="select" />
          {databaseCity.map(city => (
            <Picker.Item key={city} label={city} value={city} />
          ))}
        </Picker>
      </View>
      <View style={{ borderColor: '#20b2aa', borderWidth: 1.5, width: 330, alignSelf: 'center', height: 60, marginLeft: -13, marginTop: 17 }}>
        <Picker
          style={{ color: 'black' }}
          selectedValue={selectedarea}
          dropdownIconColor={'black'}
          onValueChange={(itemValue) => setSelectedarea(itemValue)}
        >
          <Picker.Item label="Select Area" value="select" />
          {databasearea.map(area => (
            <Picker.Item key={area.id} label={area.name} value={area.id} />
          ))}
        </Picker>
      </View>
      <TouchableOpacity style={{alignSelf:'center',backgroundColor:'#20b2aa',borderRadius:20,marginTop:10}} onPress={handleRegisterPolice}><Text style={{ color: 'black' ,fontSize:22,width:70,marginLeft:20,fontWeight:'bold'}}>Add</Text></TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInput: {
    marginTop: -40,
    marginLeft: 20,
    color: 'black',
    borderColor: '#20b2aa',
    borderWidth: 1.5,
    width: 330,
  },
});

export default AddPolice;
