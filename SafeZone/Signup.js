import React,{useState} from 'react'
import { View,StyleSheet,Text,Image,TouchableOpacity,TextInput, ScrollView} from 'react-native'
import { Alert } from 'react-native';
import { url } from './url';
import Icon from 'react-native-vector-icons/FontAwesome';
const Signup = ({ navigation }) => {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword,setconfirmPassword]=useState('');
 const handleSignup = async () => {
        try {
        
      
          const response = await fetch(url+'/AppUser/RegisterUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              UName: name,
              UPassword: password,
              UCNIC: cnic,
              UEmail: email,
              URole: 'User',
              UStatus: 'Active'
            }),
          });
      
          if (response.ok) {
            Alert.alert('Success', 'User registered successfully');
            navigation.navigate('Login');
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
          }
        } catch (error) {
          Alert.alert('Error', error.message);
          console.error('Registration Error:', error);
        }
      };
      
  
     
  
 
    return(
    <ScrollView style={styles.Main}>
        <Image style={styles.upperlogo}source={require('../assests/uparlogo.png')}/>
        <Text style={{fontSize:50,color:'black',backgroundColor:'white',fontWeight:'bold',marginLeft:30,marginTop:1}}>Sign Up</Text>
          <View style={{marginTop:29,marginLeft:25}}><Icon name="user" size={30} color='#20b2aa' /></View>
    <TextInput placeholder="Name" placeholderTextColor="black" textAlign='center' value={name} onChangeText={(text) =>setName(text)} style={styles.textinput} />
    <View style={{marginTop:29,marginLeft:25}}><Icon name="lock" size={30} color='#20b2aa' /></View>
    <TextInput placeholder="Password" placeholderTextColor="black" textAlign='center' secureTextEntry={true} value={password} onChangeText={(text)=>setPassword(text)} style={styles.textinput} />
    <View style={{marginTop:29,marginLeft:25}}><Icon name="lock" size={30} color='#20b2aa' /></View>
    <TextInput placeholder="Confirm Password" placeholderTextColor="black" textAlign='center' secureTextEntry={true} value={confirmpassword} onChangeText={(text) => setconfirmPassword(text)} style={styles.textinput} />
    <View style={{marginTop:29,marginLeft:25}}><Icon name="id-card" size={30} color='#20b2aa' /></View>
    <TextInput placeholder="CNIC" placeholderTextColor="black" textAlign='center'  value={cnic} onChangeText={(text) => setCnic(text)}style={styles.textinput} />
    <View style={{marginTop:29,marginLeft:25}}><Icon name="envelope" size={30} color='#20b2aa' /></View>
    <TextInput placeholder="Email" placeholderTextColor="black" textAlign='center' value={email} onChangeText={(text) => setEmail(text)}style={styles.textinput} />
    <TouchableOpacity onPress={handleSignup}><Text style={styles.text}>SignUp</Text></TouchableOpacity>
 <Text style={{fontSize:20,color:'black',backgroundColor:'white',marginLeft:80,marginTop:5,fontWeight:'bold'}}>already have an accounr??</Text>
    <TouchableOpacity onPress={() => navigation.navigate ('Login')}><Text style={{color:'#20b2aa',fontSize:20,marginLeft:270,marginTop:-32}}>Signin</Text></TouchableOpacity>
    <Image style={styles.niche}source={require('../assests/niche.png')}/>
    
    </ScrollView>
)
}
export default Signup
const styles = StyleSheet.create(
    {
        Main:
        {
        flex: 1,
        backgroundColor:'white',
        
         },
        upperlogo:
        {
      
          
            height:130,
            width:130,
           marginLeft:250,
           marginTop:-5
        
        },
       textinput:{
        marginTop:-40,
        marginLeft:20,
        color: 'black',
        borderColor:'#20b2aa',
        borderWidth:1.5,
        width:330
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
        alignContent:'center'

        
       },
      
       niche:{
        marginTop:10,
        height:80,
        width:80
    }
   
    });
    
   