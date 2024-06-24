import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, PermissionsAndroid, TouchableOpacity, View, Text, Alert } from 'react-native';
import MapView, { Marker, Polygon, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useRoute } from '@react-navigation/native';
import { url } from '../url';
const Planeroute = ({ navigation }) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [zonesData, setZonesData] = useState([]);
    const [fromAddress1, setFromAddress1] = useState('');

    const route = useRoute();
    const markerlocation = route.params?.locationforroute;

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

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log('Received location:', position.coords.latitude, position.coords.longitude);
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                reverseGeocode(position.coords.latitude, position.coords.longitude);
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

    const handleMapPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        const coordinate = { latitude, longitude };

        // Check if the tap is inside any zone (polygon or circle)
        const isInsideZone = zonesData.some(zone => {
            if (zone.ZoneDetails.length > 2) {
                return isCoordinateInsidePolygon(coordinate, zone.ZoneDetails);
            } else if (zone.ZoneDetails.length === 1) {
                const center = zone.ZoneDetails[0];
                const radius = 1000; // Assuming radius is always 1000 meters
                return isCoordinateInsideCircle(coordinate, center, radius);
            }
            return false;
        });

        if (isInsideZone) {
            Alert.alert('Alert', 'You choose danger zone! be safe:)');
        }

        // Add marker regardless of zone
        setMarkers(prevMarkers => [...prevMarkers, coordinate]);
    };

    const isCoordinateInsidePolygon = (coordinate, polygon) => {
        let isInside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = parseFloat(polygon[i].lat), yi = parseFloat(polygon[i].long);
            const xj = parseFloat(polygon[j].lat), yj = parseFloat(polygon[j].long);
            const intersect = ((yi > coordinate.longitude) !== (yj > coordinate.longitude)) &&
                (coordinate.latitude < (xj - xi) * (coordinate.longitude - yi) / (yj - yi) + xi);
            if (intersect) isInside = !isInside;
        }
        return isInside;
    };

    const isCoordinateInsideCircle = (coordinate, center, radius) => {
        const distanceSquared = (coordinate.latitude - parseFloat(center.lat)) ** 2 +
            (coordinate.longitude - parseFloat(center.long)) ** 2;
        return distanceSquared <= (radius / 100000) ** 2;
    };

    const handleRemoveMarker = () => {
        if (markers.length > 0) {
            const updatedMarkers = [...markers];
            updatedMarkers.pop(); // Remove the last marker
            setMarkers(updatedMarkers);
        }
    };

    const allMarkers = [markerlocation, ...markers];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
            <View style={{ flexDirection: 'row', color: 'black' }}>
                <Text style={{ color: 'black' }}>{markerlocation ? JSON.stringify(markerlocation) : ''}</Text>
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
                    {/* {currentLocation && (
                        <Marker
                            coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }}
                            title={fromAddress1}
                        />
                    )} */}
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={marker}
                            title="Marker"
                        />
                    ))}
                    {markerlocation && (
                        <Marker
                            coordinate={{ latitude: markerlocation.latitude, longitude: markerlocation.longitude }}
                            title="Current Location"
                        />
                    )}
                </MapView>
            )}
            <TouchableOpacity onPress={handleRemoveMarker} style={{ borderColor: 'black', borderWidth: 2, width: 100, alignSelf: 'center', borderRadius: 30 }}>
                <Text style={{ color: 'black', marginLeft: 8 }}>Remove Marker</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Next', { listofmarker: allMarkers })} style={{ backgroundColor: '#20b2aa', width: 100, alignSelf: 'center', borderRadius: 40, marginTop: 10 }}>
                <Text style={{ color: 'black', alignSelf: 'center', height: 40, fontSize: 20, fontWeight: 'bold' }}>Next</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Planeroute;

const styles = StyleSheet.create({
    textinput: {},
});
