import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import MapView, { Marker, Polyline, Polygon, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useRoute } from '@react-navigation/native';
import { url } from '../url';

const Next = ({ navigation }) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [zonesData, setZonesData] = useState([]);
    const [fromAddress1, setFromAddress1] = useState('');
    const [intervalId, setIntervalId] = useState(null);

    const route = useRoute();
    const list = route.params?.listofmarker;

    useEffect(() => {
        requestLocationPermission();
        fetchData();
        getCurrentLocation();
        // Start checking location periodically
        const id = setInterval(() => {
            getCurrentLocation();
        }, 30000); // 2 minutes interval
        setIntervalId(id);

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []);

    useEffect(() => {
        // Log current location every 2 minutes
        const logLocationInterval = setInterval(() => {
            if (currentLocation) {
                console.log('Current location:', currentLocation);
            }}, 30000); 

        return () => {
            clearInterval(logLocationInterval);
        };
    }, [currentLocation]);

    const requestLocationPermission = async () => {
        try {
            // Your permission request code here
        } catch (err) {
            console.warn(err);
        }
    };

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log('Received location:', position.coords.latitude, position.coords.longitude);
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                reverseGeocode(position.coords.latitude, position.coords.longitude);
                checkLocation(position.coords.latitude, position.coords.longitude);
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

    const fetchData = async () => {
        try {
            const response = await fetch(url + 'AppUser/GetAllZonesColorswithLatLong?city=Rawalpindi');
            const data = await response.json();
            setZonesData(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const checkLocation = (latitude, longitude) => {
        // Check if the user's location is in a danger zone
        const isInDangerZone = zonesData.some(zone => {
            // Your code to check if the user's location is inside the zone
        });

        // Alert the user if they are in a danger zone
        if (isInDangerZone) {
            Alert.alert('Alert', 'You are in a danger zone!');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
            <View style={{ flexDirection: 'row', color: 'black' }}>
                {/* <Text style={{ color: 'black' }}>{list ? JSON.stringify(list) : ''}</Text> */}
            </View>
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
                >
                    {list && list.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                            title={`Marker ${index + 1}`}
                        />
                    ))}
                    {list && list.length > 1 && (
                        <Polyline
                            coordinates={list.map(marker => ({ latitude: marker.latitude, longitude: marker.longitude }))}
                            strokeWidth={2}
                            strokeColor="blue"
                        />
                    )}
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
                </MapView>
            )}
        </SafeAreaView>
    );
};

export default Next;

const styles = StyleSheet.create({
    textinput: {},
});
