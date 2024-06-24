import React, { useEffect, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Polygon, Circle } from 'react-native-maps';
import { url } from '../url';
import Geolocation from '@react-native-community/geolocation';
import { useRoute } from '@react-navigation/native';

const Viewspecificzone = ({ navigation }) => {
  const [data, setData] = useState([]);
  const route = useRoute();
  const selectid = route.params?.id;

  useEffect(() => {
    handleviewzone();
    requestLocationPermission();
  }, []);

  const handleviewzone = async () => {
    try {
      const response = await fetch(`${url}Admin/ViewASpecificZone?zid=${selectid}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
        } else {
          console.log('Location permission denied');
        }
      } else {
        // iOS location permission request can be handled here
        getCurrentLocation();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const renderMapElement = () => {
    if (data.length === 1) {
      const { lat, long } = data[0];
      return (
        <Circle
          center={{ latitude: parseFloat(lat), longitude: parseFloat(long) }}
          radius={500}
          fillColor="rgba(0, 200, 0, 0.5)"
          strokeColor="rgba(0, 0, 0, 0.5)"
        />
      );
    } else if (data.length > 1) {
      const coordinates = data.map(point => ({
        latitude: parseFloat(point.lat),
        longitude: parseFloat(point.long),
      }));
      return (
        <Polygon
          coordinates={coordinates}
          fillColor="rgba(0, 200, 0, 0.5)"
          strokeColor="rgba(0, 0, 0, 0.5)"
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <MapView
        zoomControlEnabled={true}
        style={styles.map}
        initialRegion={{
          latitude: 33.6547, // Default latitude, can be changed
          longitude: 73.0696, // Default longitude, can be changed
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {renderMapElement()}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Viewspecificzone;
