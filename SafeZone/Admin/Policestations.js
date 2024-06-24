import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Table, Row } from 'react-native-table-component';
import MapView, { Marker, Polyline, Polygon, Circle } from 'react-native-maps';
import { url } from '../url';

const Policestations = ({ navigation }) => {
  const [viewdata, setViewData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(url + 'Admin/getAllPoliceStationsonmap');
      const result = await response.json();
      setViewData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 33.6491,
          longitude: 73.0833,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0321,
        }}>
         {viewdata.map(item => (
 <Marker
 key={item.id}
 coordinate={{
   latitude: parseFloat(item.PLat),
   longitude: parseFloat(item.Plong),
   Area:item.PArea
 }}
>
 <Image source={require('../../assests/police.png')} 
   style={{ width: 30, height: 30 }} // Adjust the width and height as needed
   />
</Marker>
))}

      </MapView>
    </SafeAreaView>
  );
};

export default Policestations;
