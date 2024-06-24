import React ,{useState,useEffect}from 'react'
import { View,StyleSheet,Text,Image,TouchableOpacity,TextInput, Settings, ScrollView, Alert,} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { url } from '../url';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRoute } from '@react-navigation/native';
import Zones from '../Admin/Zones';

const AddIncidentByPolice = ({ navigation }) => {
  const route = useRoute();
  const selectid2 = route.params?.pid2;
  // agliscreen se aye ha//
const latitude = route.params?.latitude;
    const longitude = route.params?.longitude;
    const bckidofpolice=route.params.pid
const bckidofzone=route.params.selectid3
    
    const[description,setdes]=useState();
    const [selectedValue, setSelectedValue] = useState('select');
    const [databasepicker, setdatabasepicker] = useState([]);
    const [dateTime, setDateTime] = useState({ date: '', time: '' });
const[thres,setthres]  =useState();
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [policezone, setpolicezone] = useState([]);
    const [selectzone, setselectzone] = useState('');


    useEffect(() => {
        fetchallthreshold();
        getpolicezone();
       ;
      }, []);
     
      const fetchallthreshold = async () => {
        try {
            const response = await fetch(url + 'Admin/getAllThresholds');
            const result = await response.json();
            setdatabasepicker(result); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
   
  
  
// ---------DAte----------
const showDatePicker = () => {
  setDatePickerVisibility(true);
};

const hideDatePicker = () => {
  setDatePickerVisibility(false);
};

const handleConfirmDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  setDateTime(prevState => ({ ...prevState, date: formattedDate }));

  hideDatePicker();
};


const showTimePicker = () => {
  setTimePickerVisibility(true);
};

const hideTimePicker = () => {
  setTimePickerVisibility(false);
};

const handleConfirmTime = (time) => {
  const formattedTime = time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  setDateTime(prevState => ({ ...prevState, time: formattedTime }));

  hideTimePicker();
};


const handleDateTimeSelection = () => {
  showTimePicker();
  showDatePicker();
};

const report = async () => {
    try {
      const response = await fetch(url+`Police/AddCrime?type=${selectedValue}&des=${description}&cat=${thres}&thresholdId=${thres}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const formattedDateTime = `${dateTime.date} ${dateTime.time}`;

        const response2 = await fetch(url+`Police/AddIncident?lat=${latitude}&longg=${longitude}&pid=${bckidofpolice}&des=${description}&dateTime=${formattedDateTime}&zoneid=${selectzone}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response2)
        console.log('AddIncident API response status:', response2.status); // Print status of the AddIncident response
        if (response2.status === 409) {
          Alert.alert('Thank you! You have already reported this incident.');
        } else 

       if(response2.ok ){
Alert.alert('thank You reported :)')
       }}
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'An error occurred while connecting to the server');
    }
  }
  const getpolicezone = async () => {
    try {
      const response = await fetch(`${url}Admin/getZonesForPolice?pid=${selectid2}`);
     
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
    return(
    <ScrollView style={styles.Main}>
                 {/* <Text style={{color:'black'}}>{selectid2}</Text>
                 <Text style={{color:'black'}}>{selectzone}</Text>
                 <Text style={{color:'black'}}>{bckidofpolice}</Text>
                 <Text style={{color:'black'}}>{bckidofzone}</Text> */}


<Image style={styles.upperlogo}source={require('../../assests/uparlogo.png')}/>
        <Text style={{fontSize:50,color:'black',backgroundColor:'white',fontWeight:'bold',alignSelf:'center'}}>Report Incident</Text>    
        <View style={{borderColor:'#20b2aa',borderWidth:1.5,width:330,alignSelf:'center',height:60,marginLeft:-13}}>
        <Picker style={{color:'black'}} selectedValue={thres} dropdownIconColor={'black'}  on onValueChange={(itemValue) => {
        console.log("Selected value from Picker:", itemValue);
        setthres(itemValue);
    }}
>
        <Picker.Item label="Category" value={null} />
  {databasepicker.map(item => (
            <Picker.Item key={item.id} label={item.crimeName} value={item.crimeName} />))}
         </Picker>
      </View>
      
      
    <View style={styles.picker}>
 <Picker style={styles.pickerItem} dropdownIconColor={'black'} selectedValue={selectedValue}  onValueChange={setSelectedValue}>
 <Picker.Item label="Type" value={null}  />
<Picker.Item label="Car" value="Car"  />
 <Picker.Item label="Bike" value="Bike" />
 <Picker.Item label="Other" value="Other" />
      </Picker>
      </View>
      <TouchableOpacity onPress={handleDateTimeSelection} style={{backgroundColor:'#20b2aa',height:40,width:170,marginLeft:20,marginTop:10,borderRadius:20}}><Text style={{color:'black',alignSelf:'center',fontWeight:'bold',fontSize:20}}>Select Date & Time</Text></TouchableOpacity>
         <Text style={{color:'black',marginTop:10,marginLeft:40,fontSize:15}}>{dateTime.date && dateTime.time ? `${dateTime.date} ${dateTime.time}` : 'Please pick Date & Time'}</Text>
    <TextInput placeholder="Description" placeholderTextColor="black" value={description} onChangeText={(text) => setdes(text)}  style={styles.textinput} />
    <View style={{borderColor:'#20b2aa',borderWidth:1.5,width:330,alignSelf:'center',height:60,marginLeft:-13,marginTop:20}}>
        <Picker style={{color:'black'}} selectedValue={selectzone} dropdownIconColor={'black'}  on onValueChange={(itemValue) => {
        console.log("Selected value from Picker:", itemValue);
        setselectzone(itemValue);
    }}
>
        <Picker.Item label="select" value={null} />
  {policezone.map(item => (
            <Picker.Item key={item.id} label={item.name} value={item.id} />))}
            
         </Picker>
      </View>
   
 <TouchableOpacity onPress={() => navigation.navigate ('PoliceSelectLocation',{zid:selectzone,policeid: selectid2})}><Text style={styles.text}>Open Map</Text></TouchableOpacity>

            <TouchableOpacity><Text style={{color:'black',fontSize:20,marginLeft:40,marginTop:-40,fontWeight:'bold'}}>Location</Text></TouchableOpacity>
            <Text style={{color:'black',marginLeft:140,marginTop:10}}>Latitude: {latitude ? latitude.toFixed(6) : ''}</Text>
            <Text style={{color:'black',marginLeft:140}}>Longitude: {longitude ? longitude.toFixed(6) : ''}</Text>

            <TouchableOpacity onPress={report}><Text style={{ fontSize:30,alignSelf:'center',height:50, width:150, backgroundColor:'#20b2aa', borderRadius:30,  textAlign:'center',marginTop:10, alignContent:'center',borderColor:'black',borderWidth:1}}>Report</Text></TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
            />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={hideTimePicker}
            />
      
    </ScrollView>
)
}
export default AddIncidentByPolice
const styles = StyleSheet.create(
    {
        Main:
        {
        flex: 1,
        backgroundColor:'white'
         },
        upperlogo:
        {
      
          
            height:100,
            width:100,
           marginLeft:300,
           marginTop:-50
        
        },
       textinput:{
        marginTop:3,
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
        width:140,
        backgroundColor:'#20b2aa',
        borderRadius:10,
        textAlign:'center',
        marginTop:10,
        alignContent:'center'

        
       },
       picker: {
       height:60,
       width:330,
        borderWidth: 2,
        backgroundColor:'white',
        marginLeft:20,
        marginTop:20,
        borderColor: '#20b2aa',
    },
    pickerItem: {
        color: 'black', // Styling for the selected item
    },
    niche:{
        marginTop:80,
        height:100,
        width:100
    }
   
    });
    
   