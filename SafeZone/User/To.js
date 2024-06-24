import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput ,StyleSheet, PermissionsAndroid, TouchableOpacity,View} from 'react-native';
import MapView ,{Marker,Polyline,Polygon,Circle} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons'; // Importing MaterialIcons from Expo vector icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { url } from '../url';
const To = ({ navigation }) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [zonesData, setZonesData] = useState([]);
const[fromadress,setfromadress]=useState();
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
            const response = await fetch(url+'AppUser/GetAllZonesColorswithLatLong');
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
                reverseGeocodeCircle(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.log('Error fetching current location:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };
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
                const area = data.staddress || data.neighborhood || data.region || data.city || '';
                setfromadress(area);
                return area || null;
            }
        } catch (error) {
            console.error('Error fetching reverse geocoding data:', error);
            return null;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 ,backgroundColor:'transparent'}}>
          <View style={{flexDirection:'row',color:'black'}}>
            <TextInput placeholder="From:" placeholderTextColor="black" readOnly={true}   value={fromadress}
 style={{marginLeft:10,marginTop:10, borderColor:'#20b2aa', borderWidth:2,width:330,alignSelf: 'center',borderRadius:25,height:40,color:'black'}} />
            <TouchableOpacity >
                <Icon name="map" size={30} color='#20b2aa'style={{marginTop:12, marginLeft:-50 }} />
                </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row'}}>
            <TextInput placeholder="To:" placeholderTextColor="black" readOnly={true} style={{marginLeft:10,marginTop:10, borderColor:'#20b2aa', borderWidth:2,width:330,alignSelf: 'center',borderRadius:25,height:40}} />
            <TouchableOpacity >
                <Icon name="map-pin" size={30} color='#20b2aa'style={{marginTop:12, marginLeft:-50 }} />
                </TouchableOpacity>
            </View>
            {currentLocation && (
                <MapView 
                    style={{ flex: 1,backgroundColor:'transparent' }}
                    zoomControlEnabled={true}
                    initialRegion={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {/* Additional MapView components */}
                    {zonesData.map(zone => (
          <Polygon
            key={zone.zoneId}
            coordinates={zone.ZoneDetails.map(detail => ({ latitude: parseFloat(detail.lat), longitude: parseFloat(detail.long) }))}
            fillColor={`${zone.Color}80`}
            strokeColor={zone.Color}
          />
        ))}
         <Marker
                        coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }}
                        title="Current Location"
                    />
                </MapView>
            )}
        </SafeAreaView>
    );
};

export default To;

const styles = StyleSheet.create({
    textinput:{},
});
