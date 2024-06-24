import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput, Alert,ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { url } from './url';
import Icon from 'react-native-vector-icons/FontAwesome';
const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required');
      return;}
    if (userType === 'police') { 
      try {
        const response = await fetch(url+`Police/PoliceLogin?email=${email}&password=${password}&role=${userType}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log('Id:', responseData); // Log the entire response data;
          navigation.navigate('PoliceHome', { pid: responseData});
        }
      } catch (error) {
        console.error('API Error:', error);
        Alert.alert('Error', 'An error occurred while connecting to the server');
      }
    }
  
    // ----------------------------------------//
    else if (userType === 'admin') {
      try {
        const response = await fetch(url+`Admin/AdminLogin?email=${email}&password=${password}&role=${userType}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const responseData = await response.json();
          navigation.navigate('AdminHome');
        }
      } catch (error) {
        console.error('API Error:', error);
        Alert.alert('Error', 'An error occurred while connecting to the server');
      }}
      // --------------------------
      else {
        try {
          const response = await fetch(url+`AppUser/UserLogin?email=${email}&password=${password}&role=${userType}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            const responseData = await response.json();
            console.log('Id:', responseData); // Log the entire response data
        
            navigation.navigate('UserHome', { user: responseData})};
          
        } catch (error) {
          console.error('API Error:', error);
          Alert.alert('Error', 'An error occurred while connecting to the server');
        }
      }
  
};
    return(
    <ScrollView style={styles.Main}>
        <Image style={styles.upperlogo}source={require('../assests/uparlogo.png')}/>
        <Text style={{fontSize:50,color:'black',backgroundColor:'white',fontWeight:'bold',marginLeft:30}}>Log In</Text>
        <Text style={{fontSize:20,color:'black',backgroundColor:'white',marginLeft:30,marginTop:-20}}>Please Sign-in to continue</Text>
        <View style={{marginTop:10,marginLeft:20,  color: 'black', borderColor:'#20b2aa', borderWidth:1.5, width:340,height:55,}}>
    
        <View>

  <TextInput
    placeholder="Email"
placeholderTextColor={'black'}
    value={email}
    onChangeText={(text) => setEmail(text)}
    style={{color:'black',alignSelf:'center'}}
  />
      {/* <Icon name="envelope" size={25} color='#20b2aa' style={{marginLeft:6,marginTop:1-30}} /> */}

</View>
    <Icon name="lock" size={30} color='#20b2aa' style={{marginLeft:5,marginTop:25}}/>

   </View>
    <View style={{marginTop:10,marginLeft:20,  color: 'black', borderColor:'#20b2aa', borderWidth:1.5, width:340,height:55}}>
    <TextInput placeholder="Password" placeholderTextColor="black" textAlign='center' value={password}onChangeText={(text) => setPassword(text)} style={{color:'black'}}  />



</View>
    <View style={styles.picker}>
    
    <Picker  style={styles.pickerItem}  selectedValue={userType} onValueChange={(itemValue) => setUserType(itemValue)} >
        <Picker.Item label="User" value="user"  />
        <Picker.Item label="Admin" value="admin" />
        <Picker.Item label="Police" value="police" />
       
      </Picker>
      <View style={{marginTop:-50,marginLeft:5}}>
      {userType === 'user' && <Icon name="user" size={30} color='#20b2aa'/> }
        {userType === 'admin' && <Icon name="users" size={30} color='#20b2aa' />}
        {userType === 'police' && <Icon name="shield" size={30} color='#20b2aa' />}
      </View>
      </View>

    <TouchableOpacity onPress={handleLogin} ><Text style={styles.text}>SignIn</Text></TouchableOpacity>
    <Text style={{fontSize:20,color:'black',backgroundColor:'white',marginLeft:80,marginTop:5,fontWeight:'bold'}}>or dont have an accounr??</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Signup')}><Text style={{color:'#20b2aa',fontSize:20,marginLeft:270,marginTop:-32}}>Signup</Text></TouchableOpacity>
    
    <Image style={styles.niche}source={require('../assests/niche.png')}/>
    
    </ScrollView>
)
    }
export default Login
const styles = StyleSheet.create(
    {
        Main:
        {
        flex: 1,
        backgroundColor:'white'
         },
         
        upperlogo:
        {
      
          
            height:130,
            width:130,
           marginLeft:250,
           marginTop:-30
        
        },
      
       text:{
        fontSize:30,
        alignSelf:'center',
        height:50,
        width:150,
        backgroundColor:'#20b2aa',
        borderRadius:30,
        textAlign:'center',
        marginTop:30,
        alignContent:'center',
      

        
       },
       picker: {
       height:60,
       width:340,
        borderWidth: 2,
        backgroundColor:'rgba',
        marginLeft:20,
        borderColor: '#20b2aa',
         marginTop:10,
          // Center items vertically
    },
    pickerItem: {
        color: 'black',
        marginLeft:120,
       
        // Styling for the selected item
    },
    niche:{
        marginTop:200,
        height:100,
        width:100
    }
   
    });
    
  