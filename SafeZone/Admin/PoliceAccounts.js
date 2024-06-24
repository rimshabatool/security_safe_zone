import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { url } from '../url';

const PoliceAccounts = ({ navigation }) => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url + 'Admin/getAllPoliceAccounts');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.cellText}>{item.Pid}</Text>
      <Text style={styles.cellText}>{item.PEmail}</Text>
      <Text style={styles.cellText}>{item.Pphone}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Editpolicezone', { policeid:item.Pid})}>
     <Icon name="edit" size={30} color='black' /> 
     </TouchableOpacity>
      </View>
      
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Icon name="user" size={100} color="black" />
        <TouchableOpacity onPress={() => navigation.navigate('AddPolice')}>
          <Text style={styles.addButton}>Add New</Text>
        </TouchableOpacity>
        <View style={styles.tableRow}>
          <Text style={styles.cellTextHeader}>Id</Text>
          <Text style={styles.cellTextHeader}>Email</Text>
          <Text style={styles.cellTextHeader}>Phone</Text>
          <Text style={styles.cellTextHeader}>Edit</Text>

        </View>
        <FlatList data={Data} renderItem={renderItem} keyExtractor={(item) => item.Pid.toString()} />
      </View>
    </ScrollView>
  );
};

export default PoliceAccounts;

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
