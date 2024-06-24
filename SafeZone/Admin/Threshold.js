import React, { useState ,useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity,ScrollView,Pressable,text, Modal,map ,Text, TextInput,FlatList,Alert, Button} from 'react-native';
import { url } from '../url';
import Icon from 'react-native-vector-icons/FontAwesome';

const Threshold = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const[maxreport,setmaxreport]=useState('');
  const[color,setcolor]=useState('');
  const[viewdata,setviewdata]=useState();
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editValue, setEditValue] = useState();
  const [editmacreport, setEditmaxreport] = useState();
  const [editcolor, setEditcolor] = useState();
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(url+'Admin/getAllThresholds');
      const result = await response.json();
      setviewdata(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 
  const handleAddData = async () => {
    if (!name || !value || !maxreport || !color) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try {
     
        const response = await fetch(url+'/Admin/AddThreshold', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            crimeName: name,
            value: value,
            maxReport:maxreport,
            color: color
          }),
        });
        if(response.status==400){
          Alert.alert('Already Exists');
          setName('');
          setValue('');
          setmaxreport('');
          setcolor('');
          fetchData();
          setModalVisible(false);
        }
    
        if (response.ok) {
          Alert.alert('Success', 'Threshold Added successfully');
          setName('');
          setValue('');
          setmaxreport('');
          setcolor('');
          fetchData();
          setModalVisible(false);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Add failed');
        
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Error:', error);
    }
  };

  const handleCancelButton = async () => {
    setModalVisible(false);
    setName('');
    setValue('');
    setmaxreport('');
    setcolor('');
    fetchData();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${url}/Admin/DeleteThreshold/?id=${id}`, {
        method: 'DELETE',
      });
console.log(response)
      if (response.ok) {
        Alert.alert('Success', 'Item deleted successfully');
        fetchData();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Delete failed');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Delete Error:', error);
    }
  };
  const handleUpdate = async () => {
    try {
      const response = await fetch(`${url}/Admin/UpdateThreshold?id=${editId}&name=${editName}&value=${editValue}&maxReport=${editmacreport}&color=${editcolor}`, {
        method: 'PUT',
        headers: {
    
            'Content-Type': 'application/json',
          },
        });
  
console.log(response)
      if (response.ok) {
        Alert.alert('Success', 'Threshold Updated successfully');
        fetchData();
        setModalVisible2(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Update failed');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Error:', error);
    }
  };

 
    const handleedit = (id, crimeName, value, maxReport, color) => {
      setEditId(id);
      setEditName(crimeName);
      setEditValue(value.toString());
      setEditmaxreport(maxReport.toString());
      setEditcolor(color);
      setModalVisible2(true);
    };
  
  return (
    
    <View style={{flex:1}}>


<ScrollView>
      {viewdata && viewdata.length > 0 ? (
        viewdata.map(item => (
          <View key={item.id} style={{marginLeft:10,marginTop:10,borderColor:'#20b2aa',borderWidth:2,height:110,width:360,borderRadius:15}}>
            <Text style={{ fontWeight: 'bold',color:'black' }}>Name: {item.crimeName}</Text>
            <Text style={{ fontWeight: 'bold',color:'black'}}>Value: {item.value}</Text>
            <Text style={{ fontWeight: 'bold',color:'black'}}>Max Reports: {item.maxReport}</Text>
            <Text style={{ fontWeight: 'bold',color:'black'}}>Color: {item.color}</Text>
            <TouchableOpacity style={{marginTop:-50}}  onPress={() => handleedit(item.Tid, item.crimeName, item.value, item.maxReport, item.color)}>
                <Icon name="edit" size={25} color='#20b2aa' style={{marginLeft:320}}/>
              </TouchableOpacity>  
              <TouchableOpacity onPress={() => handleDelete(item.Tid)}>
                <Icon name="trash" size={25} color='#20b2aa' style={{marginLeft:320}}/>
              </TouchableOpacity> 
          </View>
        ))
      ) : (
        <Text style={{color:'black'}}>No data available</Text>
      )}
</ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           <Text style={{color:'black',marginTop:-20,fontWeight:'bold',fontSize:25}}>Add Threshold</Text>
           <TextInput placeholder='Name' placeholderTextColor={'black'} value={name} onChangeText={(text) => setName(text)}style={{borderColor:'#20b2aa',borderWidth:2,height:40,width:200,color:'black'}}></TextInput>
           <TextInput placeholder='Value' placeholderTextColor={'black'} value={value} onChangeText={(text) => setValue(text)}style={{borderColor:'#20b2aa',borderWidth:2,height:40,width:200 ,marginTop:10,color:'black'}}></TextInput>
           <TextInput placeholder='Maximum Report' placeholderTextColor={'black'} value={maxreport} onChangeText={(text) => setmaxreport(text)}style={{borderColor:'#20b2aa',borderWidth:2,height:40,width:200,color:'black',marginTop:10}}></TextInput>
           <TextInput placeholder='Colour' placeholderTextColor={'black'} value={color} onChangeText={(text) => setcolor(text)}style={{borderColor:'#20b2aa',borderWidth:2,height:40,width:200,color:'black',marginTop:10}}></TextInput>

            <TouchableOpacity onPress={handleCancelButton}><Text style={{color:'#20b2aa',fontWeight:'bold',fontSize:20,marginLeft:130,marginTop:10}}>Cancel</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleAddData}><Text style={{color:'#20b2aa',fontWeight:'bold',fontSize:20,marginTop:-35}}>Add</Text></TouchableOpacity>

          </View>
          
        </View>

      </Modal>
      {/* --------------2nd modal-------------- */}
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible2}
  onRequestClose={() => setModalVisible2(false)} // Close the second modal
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text style={{ color: 'black', marginTop: -20, fontWeight: 'bold', fontSize: 25 }}>Update Threshold</Text>
      <TextInput placeholder='Name' placeholderTextColor={'black'} value={editName} onChangeText={(text) => setEditName(text)} style={{ borderColor: '#20b2aa', borderWidth: 2, height: 40, width: 200, color: 'black' }} />
      <TextInput placeholder='Value' placeholderTextColor={'black'} value={editValue} onChangeText={(text) => setEditValue(text)} style={{ borderColor: '#20b2aa', borderWidth: 2, height: 40, width: 200, marginTop: 10, color: 'black' }} />
      <TextInput placeholder='Maximum Report' placeholderTextColor={'black'} value={editmacreport} onChangeText={(text) => setEditmaxreport(text)}style={{borderColor:'#20b2aa',borderWidth:2,height:40,width:200,color:'black',marginTop:10}}></TextInput>
           <TextInput placeholder='Colour' placeholderTextColor={'black'} value={editcolor} onChangeText={(text) => setEditcolor(text)}style={{borderColor:'#20b2aa',borderWidth:2,height:40,width:200,color:'black',marginTop:10}}></TextInput>
      <TouchableOpacity onPress={() => setModalVisible2(false)}>
        <Text style={{ color: '#20b2aa', fontWeight: 'bold', fontSize: 20, marginLeft: 130, marginTop: 10 }}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUpdate}>
        <Text style={{ color: '#20b2aa', fontWeight: 'bold', fontSize: 20, marginTop: -35 }}>Update</Text>
      </TouchableOpacity>

    </View>
  </View>

</Modal >
<View style={{width:100,marginLeft:300,backgroundColor:'transparent'}}>
<TouchableOpacity onPress={() => setModalVisible(true)} style={{backgroundColor:'#20b2aa',width:70,marginTop:-60,alignSelf:'center',borderRadius:40,height:70}}><Text style={{fontSize:30,color:'black',alignSelf:'center',marginTop:10,fontWeight:'bold'}}>+</Text></TouchableOpacity> 
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

export default Threshold;
