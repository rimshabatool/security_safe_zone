import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { url } from '../url';

const Zones = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(url + 'Admin/GetAllZones');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${url}Admin/DeleteZone?zoneId=${id}`, {
        method: 'DELETE',
      });

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

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.cellText}>{item.ZoneId}</Text>
      <Text style={styles.cellText}>{item.ZoneCity}</Text>
      <Text style={styles.cellText}>{item.ZoneName}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => handleDelete(item.ZoneId)}>
          <Icon name="trash" size={24} color='#20b2aa' style={styles.iconButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Viewspecificzone', { id: item.ZoneId })}>
          <Icon name="eye" size={24} color='#20b2aa' style={styles.iconButton} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddZone')}>
        <Text style={styles.buttonText}>Add New Zone</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Viewzones')}>
        <Text style={styles.buttonText}>View Zone</Text>
      </TouchableOpacity>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Id</Text>
        <Text style={styles.headerText}>City</Text>
        <Text style={styles.headerText}>Area</Text>
        <Text style={styles.headerText}>Action</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.ZoneId.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#20b2aa',
    borderRadius: 30,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    width:110,
    alignSelf:'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    color:'black'
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
  },
  cellText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: 'black',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  iconButton: {
    marginHorizontal: 10,
  },
  list: {
    paddingBottom: 20,
  },
});

export default Zones;
