import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

const Logo = ({ navigation }) => {
    useEffect(() => {
        const splashTimeout = setTimeout(() => {
          navigation.replace('Signup');
        }, 2000);
    })
    return (
        <View style={styles.Main}>
            <Image style={styles.pic} source={require('../assests//FullLogo.png')} />
           
        </View>
    );
};

export default Logo;

const styles = StyleSheet.create({
    Main: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 10,
        borderColor: 'white',
    },
    pic: {
        marginTop: 150,
        height: 270,
        width: 250,
        marginLeft: 65,
    },
    text: {
        fontSize: 40,
        alignSelf: 'center',
        height: 70,
        width: 150,
        backgroundColor: '#20b2aa',
        borderRadius: 20,
        textAlign: 'center',
        marginTop: 30,
        alignContent: 'center',
    },
});
