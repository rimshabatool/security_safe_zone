import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, PermissionsAndroid } from 'react-native';
import MapView, { Marker,Circle,Polygon } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useRoute } from '@react-navigation/native';
import { url } from '../url';

const Selectlocation = ({ navigation }) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [data, setdata] = useState([]);
    const [initialRegion, setInitialRegion] = useState(null);
    const [markers, setMarkers] = useState([]);

    const route = useRoute();
    const areaid = route.params?.selectedAreaId;
    const userrid = route.params?.reportid;


    useEffect(() => {
        // requestLocationPermission();
        fetchcoordinates();
        
    }, []);
    const handleMapPress = (e) => {
        const newCoordinate = e.nativeEvent.coordinate;
        if (markers.length === 0) {
          setMarkers([newCoordinate]);
        } else {
          setMarkers([newCoordinate]);
        }
      };
    
    // const requestLocationPermission = async () => {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //             {
    //                 title: 'Location Permission',
    //                 message: 'This app needs access to your location.',
    //                 buttonNeutral: 'Ask Me Later',
    //                 buttonNegative: 'Cancel',
    //                 buttonPositive: 'OK',
    //             }
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             console.log('Location permission granted');
    //             getCurrentLocation();
    //         } else {
    //             console.log('Location permission denied');
    //         }
    //     } catch (err) {
    //         console.warn(err);
    //     }
    // };

    // const getCurrentLocation = () => {
    //     Geolocation.getCurrentPosition(
    //         async (position) => {
    //             console.log('Received location:', position.coords.latitude, position.coords.longitude);
    //             setCurrentLocation({
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude,
    //             });
    //         },
    //         (error) => {
    //             console.log('Error fetching current location:', error);
    //         },
    //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    //     );
    // };

   
   
    const fetchcoordinates = async () => {
        try {
            const response = await fetch(`${url}/AppUser/GetAreaCoordinate?id=${areaid}`);
            console.log(response);
            if (!response.ok) {
                throw new Error('Failed to fetch coordinates');
            }
            const result = await response.json();
            setdata(result);
            console.log(result);
    
            if (result.length > 0) {
                setInitialRegion({
                    latitude: parseFloat(result[0].lat),
                    longitude: parseFloat(result[0].long),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    
    
      const createCircleOrPolygon = () => {
        console.log("Data length:", data.length);
        if (data.length === 1) {
            console.log("Creating circle");
            const radius = 3000;
            return <Circle center={{ latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].long) }} radius={radius} fillColor="rgba(255, 0, 0, 0.5)" strokeColor="red" />;
        } else if (data.length > 1) {
            console.log("Creating polygon");
            const coordinates = data.map(coord => ({ latitude: parseFloat(coord.lat), longitude: parseFloat(coord.long) }));
            console.log("Polygon coordinates:", coordinates);
            return <Polygon coordinates={coordinates} fillColor="rgba(255, 0, 0, 0.5)" strokeColor="red" />;
        } else {
            console.log("No data available");
            return null;
        }
    };
    
    const handleAddLocation = () => {
        if (markers.length > 0) {
            const { latitude, longitude } = markers[0];
            navigation.navigate('ReportIncident', { latitude, longitude,userrid  });
        }
    };
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
        <Text style={{color:'black'}}>Selected Area ID: {areaid}</Text>
        <Text style={{color:'black'}}>Selected Area ID: {userrid}</Text>



                <MapView
                    zoomControlEnabled={true}
                    style={{ flex: 1 }}
                    initialRegion={initialRegion}
                    onPress={handleMapPress}
                  
                >
                    {createCircleOrPolygon()}
                   
                    {markers.map((coordinate, index) => (
          <Marker
            key={index}
            coordinate={coordinate}
          />
        ))}
                </MapView>
            
            <View>
            {markers.length > 0 && (
        <View>
            <Text style={{ color: 'black', marginTop: 8, alignSelf: 'center', fontSize: 20 }}>Latitude: {markers[0].latitude.toFixed(6)}</Text>
            <Text style={{ color: 'black', marginTop: 8, alignSelf: 'center', fontSize: 20 }}>Longitude: {markers[0].longitude.toFixed(6)}</Text>
        </View>
    )}
                
                <TouchableOpacity onPress={handleAddLocation} style={{ backgroundColor: '#20b2aa', width: 70, alignSelf: 'center', borderRadius: 20, height: 40 }}><Text style={{ color: 'black', alignSelf: 'center', fontSize: 20 }}>Add</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Selectlocation;
