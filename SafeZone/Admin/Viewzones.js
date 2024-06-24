import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import { url } from '../url';
const Viewzones = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url + 'Admin/GetAllZones');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        latitude: 33.6844,
        longitude: 73.0479,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}>
        {data.map((zone, index) => (
          <Polygon
            key={index}
            coordinates={zone.ZoneDetails.map(detail => ({
              latitude: parseFloat(detail.lat),
              longitude: parseFloat(detail.long),
            }))}
            fillColor="rgba(0, 200, 0, 0.5)"
            strokeColor="rgba(0,0,0,0.5)"
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Viewzones;
