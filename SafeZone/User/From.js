import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, StyleSheet, PermissionsAndroid, TouchableOpacity, View, Text, Alert } from 'react-native';
import MapView, { Marker, Polygon, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { url } from '../url';

const From = ({ navigation }) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [zonesData, setZonesData] = useState([]);
    const [fromAddress1, setFromAddress1] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

    useEffect(() => {
        requestLocationPermission();
        fetchData();
        getCurrentLocation();
    }, []);

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

    const fetchData = async () => {
        try {
            const response = await fetch(url + 'AppUser/GetAllZonesColorswithLatLong?city=Rawalpindi');
            const data = await response.json();
            setZonesData(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            async (position) => {
                console.log('Received location:', position.coords.latitude, position.coords.longitude);
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                reverseGeocode(position.coords.latitude, position.coords.longitude);
                setSelectedLocation({
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

    const reverseGeocode = async (latitude, longitude) => {
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
            } else {
                const address = data.staddress || data.neighborhood || data.region || data.city || '';
                setFromAddress1(address);
            }
        } catch (error) {
            console.error('Error fetching reverse geocoding data:', error);
        }
    };

    const handleMapPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        const newCoordinates = { latitude, longitude };
        setSelectedLocation(newCoordinates);
        reverseGeocode(latitude, longitude); // Perform reverse geocoding
        console.log("New Coordinates:", newCoordinates);

        
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
            {currentLocation && (
                <MapView
                    style={{ flex: 1, backgroundColor: 'transparent' }}
                    zoomControlEnabled={true}
                    initialRegion={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onPress={handleMapPress}
                >

                    {/* Rendering Circles or Polygons */}
                    {zonesData.map(zone => {
                        if (zone.ZoneDetails.length === 1) {
                            // Render Circle
                            const coordinate = zone.ZoneDetails[0];
                            return (
                                <Circle
                                    key={zone.zoneId}
                                    center={{ latitude: parseFloat(coordinate.lat), longitude: parseFloat(coordinate.long) }}
                                    radius={1000}
                                    fillColor={`${zone.Color}80`}
                                    strokeColor={zone.Color}
                                />
                            );
                        } else if (zone.ZoneDetails.length > 1) {
                            // Render Polygon
                            return (
                                <Polygon
                                    key={zone.zoneId}
                                    coordinates={zone.ZoneDetails.map(detail => ({
                                        latitude: parseFloat(detail.lat),
                                        longitude: parseFloat(detail.long)
                                    }))}
                                    fillColor={`${zone.Color}80`}
                                    strokeColor={zone.Color}
                                />
                            );
                        } else {
                            return null;
                        }
                    })}
                    {/* Current Location Marker */}
                    {selectedLocation && (
                        <Marker
                            coordinate={{ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }}
                            title={fromAddress1}
                        />
                    )}

                </MapView>
            )}
            <View style={{ marginTop: 10 }}>
                <Text style={{ color: 'black', fontSize: 30, alignSelf: 'center' }}> Location: {selectedLocation ? `${fromAddress1}` : fromAddress1}</Text>
                {selectedLocation && (
                    <TouchableOpacity style={{ alignSelf: 'center', backgroundColor: '#20b2aa', width: 70, borderRadius: 30 }}  onPress={() => navigation.navigate('LetsMoveSafely', { backlocation:selectedLocation })}><Text style={{ color: 'black', alignSelf: 'center', fontSize: 20 }}>Add</Text></TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

export default From;
