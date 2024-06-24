import React ,{useEffect,useState}from 'react'
import { View,StyleSheet,Text,Image,TouchableOpacity,TextInput,FlatList,item,ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { url } from '../url';
const UserSecurity = ({ navigation }) => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url+'Admin/getAllUsers');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
 
  const renderItem = ({ item }) => (
    <View style={styles.tableRow} >
    <Text style={styles.cellText}>{item.Uid}</Text>
    <Text style={styles.cellText}>{item.UName}</Text>
    <Text style={styles.cellText}>{item.UPassword}</Text>
    <Text style={styles.cellText}>{item.UCNIC}</Text>
    <Text style={styles.cellText}>{item.UEmail}</Text>
    <Text style={styles.cellText}>{item.UStatus}</Text>
  </View>
  );

  

    return(
      <ScrollView horizontal>
        <View style={{alignItems:'center' ,marginTop:30,color:'black'}}>
             <Icon name="user" size={100} color="black" />
             <View style={styles.tableRow}>
          <Text style={styles.cellTextHeader}>Uid</Text>
          <Text style={styles.cellTextHeader}>Name</Text>
          <Text style={styles.cellTextHeader}>Password</Text>
          <Text style={styles.cellTextHeader}>Email</Text>
          <Text style={styles.cellTextHeader}>Status</Text>

        </View>
             <FlatList
      data={Data}
      renderItem={renderItem}
    />
    </View>
    </ScrollView>
    )}
export default UserSecurity
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30,
    color: 'black',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
   
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cellText: {
    color: 'black',
    flex: 1,
    textAlign: 'center',
    margin: 5,
    height: '155%' ,
    left:1,
    
    // Add margin to all sides of the cell
  },
  cellTextHeader: {
    color: 'black',
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 5,
    height: '100%' ,
    fontSize:20// Add margin to all sides of the cell
  },
 
});

