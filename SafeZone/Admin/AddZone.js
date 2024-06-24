import React, { useState,useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity,Alert } from 'react-native';
import MapView, { Marker, Polygon, Circle } from 'react-native-maps';
import { RadioButton, TextInput,ScrollView } from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import Geocoding from 'react-native-geocoding';
import { url } from '../url';
const AddZone = () => {
  const [markers, setMarkers] = useState([]); // state to store markers
  const [circleCenter, setCircleCenter] = useState(null); // state to store circle center
  const [polygonMarkers, setPolygonMarkers] = useState([]); // state to store polygon markers
  const [selectedOption, setSelectedOption] = useState(null); // state to keep track of selected option
  const[zonename,setzonename]=useState();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [circleCity, setCircleCity] = useState(null);
  const[adrss,setadress]=useState();

useEffect(() => {
  requestLocationPermission
   getCurrentLocation()
  if (selectedOption === 'circle' && circleCenter) {
    reverseGeocodeCircle(circleCenter.latitude, circleCenter.longitude)
      .then(city => setCircleCity(city))
      .catch(error => console.error('Error getting circle city:', error));
  } else if (selectedOption === 'polygon' && polygonMarkers.length > 0) {
    reverseGeocodePolygon(polygonMarkers[0].latitude, polygonMarkers[0].longitude)
      .then(city => setCircleCity(city))
      .catch(error => console.error('Error getting polygon city:', error));
  }
}, [selectedOption, circleCenter, polygonMarkers]);
// ---------permisssion--------
const requestLocationPermission = async () => {
  try {
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
          getCurrentLocation();
      } else {
          console.log('Location permission denied');
      }
  } catch (err) {
      console.warn(err);
  }
};
// --------map handle--------
  const handleMapTap = (event) => {
    const newMarker = event.nativeEvent.coordinate;
  if (selectedOption === 'circle') {
      setCircleCenter(newMarker);
      setPolygonMarkers([]); // Clear polygon markers
      setMarkers([])
      setMarkers([]); // Clear other markers
    } else if (selectedOption === 'polygon') {
      setPolygonMarkers([...polygonMarkers, newMarker]);
      setCircleCenter(null);
    } else {
      // Handle other options if needed
    }
  };
  // --get lat and long ---------
    const renderLatitudeAndLongitude = () => {
    if (selectedOption === 'circle') {
      return circleCenter ? (
        <Text style={{color:'black'}}>Latitude: {circleCenter.latitude.toFixed(6)}, Longitude: {circleCenter.longitude.toFixed(6)}</Text>
      ) : null;
    } else  if (selectedOption === 'polygon' && polygonMarkers.length > 0) {
      return polygonMarkers.map((marker, index) => (
        <Text style={{color:'black'}} key={index}>Latitude & Longitude: {marker.latitude.toFixed(6)}, {marker.longitude.toFixed(6)}</Text>
      ));
    }
    return null;
  };
  // -------currentlocation-------
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
        async (position) => {
            console.log('Received location:', position.coords.latitude, position.coords.longitude);
            setCurrentLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        },
        (error) => {
            console.log('Error fetching current location:', error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
};
// -----circle city----
const reverseGeocodeCircle = async (latitude, longitude) => {
  try {
    const response = await fetch(`https://geocode.xyz/${latitude.toFixed(6)},${longitude.toFixed(6)}?json=1`);
    if (!response.ok) {
      throw new Error('Failed to fetch geocoding data');
    }
    const data = await response.json();
    if (data.error) {
      if (data.error.code === '006') {
        console.log('Throttled! See geocode.xyz/pricing');
      } else {
        console.error('Reverse geocoding error:', data.error);
      }
      return null;
    } else {
      setadress( [data.city].filter(Boolean).join(', '))
      
      return adrss || null;
    }
  } catch (error) {
    console.error('Error fetching reverse geocoding data:', error);
    return null;
  }
};
// ------polygon city-----
const reverseGeocodePolygon = async (latitude, longitude) => {
  try {
    const response = await fetch(`https://geocode.xyz/${latitude.toFixed(6)},${longitude.toFixed(6)}?json=1`);
    if (!response.ok) {
      throw new Error('Failed to fetch geocoding data');
    }
    const data = await response.json();
    if (data.error) {
      if (data.error.code === '006') {
        console.log('Throttled! See geocode.xyz/pricing');
      } else {
        console.error('Reverse geocoding error:', data.error);
      }
      return null;
    } else {
      setadress( [data.city].filter(Boolean).join(', '))
      
      return adrss || null;
    }
  } catch (error) {
    console.error('Error fetching reverse geocoding data:', error);
    return null;
  }
};
const AddZone = async () => {
  try {
    let dataToSend = [];

    // Populate dataToSend based on selectedOption
    if (selectedOption === 'circle' && circleCenter) {
      dataToSend.push({ lat: circleCenter.latitude.toFixed(6), long: circleCenter.longitude.toFixed(6) });
    } else if (selectedOption === 'polygon' && polygonMarkers.length > 0) {
      polygonMarkers.forEach(marker => {
        dataToSend.push({ lat: marker.latitude.toFixed(6), long: marker.longitude.toFixed(6) });
      });
    } else {
      // Handle other options if needed
    }

    // Check if dataToSend is empty
    if (dataToSend.length === 0) {
      Alert.alert('No zone details to save');
      return;
    }

    console.log('Data to send:', dataToSend); // Debugging statement

    // Send request to create zone
    const zoneResponse = await fetch(url + `Admin/createZone?city=${adrss}&area=${zonename}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!zoneResponse.ok) {
      throw new Error('Failed to create zone');
    }

    console.log('Zone created successfully'); // Debugging statement

    // Send request to save zone details
    const saveDetailsResponse = await fetch(url + '/Admin/SaveZoneDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    if (saveDetailsResponse.ok) {
      Alert.alert('Details saved successfully');
    } else {
      const errorData = await saveDetailsResponse.json();
      throw new Error(errorData.message || 'Failed to save zone details');
    }
  } catch (error) {
    console.error('Error:', error);
    Alert.alert('An error occurred while saving zone details');
  }
};


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <TextInput  placeholder="Enter Zone Name" placeholderTextColor="#20b2aa" value={zonename}onChangeText={(text) => setzonename(text)} style={{ backgroundColor: 'white', borderColor: '#20b2aa', borderWidth: 1, marginBottom: 10 }} />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'center' }}>
        <RadioButton color='#20b2aa' value="circle" status={selectedOption === 'circle' ? 'checked' : 'unchecked'} onPress={() => setSelectedOption('circle')} />
        <Text style={{ color: 'black', fontSize: 20 }}>Circle</Text>
        <View style={{ marginLeft: 50 }}></View>
        <RadioButton color='#20b2aa' value="polygon" status={selectedOption === 'polygon' ? 'checked' : 'unchecked'} onPress={() => setSelectedOption('polygon')} />
        <Text style={{ color: 'black', fontSize: 20 }}>Polygon</Text>
      </View>
      {currentLocation && currentLocation.latitude !== 0 && currentLocation.longitude !== 0 && (
<MapView
                    zoomControlEnabled={true}
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                onPress={handleMapTap} // Handle tap on map
      >
       {polygonMarkers.map((polygonMarker, index) => (
        <Marker
          key={index}
          coordinate={polygonMarker}
          pinColor={'#FF5733'}
        />
      ))}
  
  
        {/* Render circle */}
        {circleCenter && selectedOption === 'circle' && (
          <Circle
            center={circleCenter}
            radius={1000} // Adjust the radius as needed
            fillColor="rgba(255, 87, 51, 0.3)"
            strokeColor="#FF5733"
          />
        )}
        {/* Render polygon */}
        {polygonMarkers.length > 0 && selectedOption === 'polygon' && (
          <Polygon
            coordinates={polygonMarkers}
            fillColor="rgba(51, 166, 255, 0.3)"
            strokeColor="#33A6FF"
          />
          
        )}
   {circleCenter && selectedOption === 'circle' && (
  <Marker
    coordinate={circleCenter}
    pinColor={'#FF5733'}
  />
)}

      </MapView>
      
      )}
        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:20 }}>
          {renderLatitudeAndLongitude()}
        </View>
        <TouchableOpacity onPress={AddZone}><Text style={{color:'black',fontSize:20,alignSelf:'center',backgroundColor:'#20b2aa',width:50,borderRadius:15}}>Add</Text></TouchableOpacity>
      
    </SafeAreaView>
  );
};

export default AddZone;
