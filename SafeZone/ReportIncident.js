import React ,{useState,useEffect}from 'react'
import { View,StyleSheet,Text,Image,TouchableOpacity,TextInput, Settings, ScrollView, Alert,} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { url } from './url';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRoute } from '@react-navigation/native';

const ReportIncident = ({ navigation }) => {
  const route = useRoute();
  const selectid = route.params?.useridreport;
  const latitude = route.params?.latitude;
    const longitude = route.params?.longitude;
    const mappageid = route.params?.userrid;

    
    const[description,setdes]=useState();
    const [selectedValue, setSelectedValue] = useState('select');
    const [databasepicker, setdatabasepicker] = useState([]);
    const [dateTime, setDateTime] = useState({ date: '', time: '' });
const[thres,setthres]  =useState();
const[selectcity,setselectcity]=useState();
const[selectarea,setselectarea]=useState();
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const[databasearea,setdatabasearea]=useState([]);
    const[databasecity,setdatabasecity]=useState([]);
    
    useEffect(() => {
        fetchallthreshold();
        fetchCity();
        fetcharea();
      }, []);
      useEffect(() => {
        if (selectcity) {
            fetcharea();
        }
    }, [selectcity]);
      const fetchallthreshold = async () => {
        try {
            const response = await fetch(url + 'Admin/getAllThresholds');
            const result = await response.json();
            setdatabasepicker(result); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchCity = async () => {
      try {
        const response = await fetch(url + 'Admin/getAllCities');
        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }
        const result = await response.json();
        console.log("Fetched cities:", result);
        setdatabasecity(result);
      
      } catch (error) {
        console.error('Error fetching cities:', error);
        setdatabasecity([]);
      }
    };
    
    const fetcharea = async () => {
      console.log('Selected city = ', selectcity); 
      try {
        const response = await fetch(`${url}AppUser/GetAreas?city=${selectcity}`);
        if (!response.ok) {
          throw new Error('Failed to fetch areas');
        }   
        const result = await response.json();
        console.log("Fetched areas:", result); // Log fetched areas
        setdatabasearea(result); // Update state with fetched areas
      } catch (error) {
        console.error('Error fetching areas:', error);
        setdatabasearea([]); // Clear the state in case of an error
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
      const response = await fetch(url+`AppUser/AddCrime?type=${selectedValue}&des=${description}&cat=${thres}&thresholdId=${thres}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const formattedDateTime = `${dateTime.date} ${dateTime.time}`;

        const response2 = await fetch(url+`AppUser/ReportIncident?lat=${latitude}&longg=${longitude}&zoneid=${selectarea}&des=${description}&dateTime=${formattedDateTime}&reportedBy=${mappageid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response2);
        if (response2.status === 409) {
          Alert.alert('Thank you! You have already reported this incident.');
        } else 
       if(response2.ok){
Alert.alert('Thank You ! Your report send successfully :)')
       }}
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'An error occurred while connecting to the server');
    }
  }
    return(
    <ScrollView style={styles.Main}>
                 <Text style={{color:'black'}}>userid: {selectid}</Text>
                 <Text style={{color:'black'}}>abi wali: {mappageid}</Text>

<Image style={styles.upperlogo}source={require('../assests/uparlogo.png')}/>
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
    <View style={{borderColor:'#20b2aa',borderWidth:1.5,width:330,alignSelf:'center',height:60,marginLeft:-13,marginTop:15}}>
    <Picker
                    style={{ color: 'black' }}
                    selectedValue={selectcity}
                    dropdownIconColor={'black'}
                    onValueChange={(itemValue) => {
                        console.log("Selected value from City Picker:", itemValue);
                        setselectcity(itemValue);
                    }}>
                    <Picker.Item label="Select City" value={null} />
                    {databasecity.map(city => (
                        <Picker.Item key={city} label={city} value={city} />
                    ))}
                </Picker>
      </View>
      <View style={{borderColor:'#20b2aa',borderWidth:1.5,width:330,alignSelf:'center',height:60,marginLeft:-13,marginTop:15}}>
    <Picker
                    style={{ color: 'black' }}
                    selectedValue={selectarea}
                    dropdownIconColor={'black'}
                    onValueChange={(itemValue) => {
                        console.log("Selected value from City Picker:", itemValue);
                        setselectarea(itemValue);
                        fetcharea(); // Fetch areas based on selected city
                    }}>
                    <Picker.Item label="Select Area" value={null} />
                    {databasearea.map(area => (
                        <Picker.Item key={area.id} label={area.name} value={area.id} />
                    ))}
                </Picker>
      </View>

 <TouchableOpacity onPress={() => navigation.navigate ('Selectlocation', { selectedAreaId: selectarea , reportid:selectid})}><Text style={styles.text}>Open Map</Text></TouchableOpacity>

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
      
 <Image style={styles.niche}source={require('../assests/niche.png')}/>
    </ScrollView>
)
}
export default ReportIncident
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
    
   