import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from 'react-native-google-signin';

export const WelcomeScreen = props => {

    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
        });
    }, []);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const signInData = await GoogleSignin.signIn()
            const { user } = signInData
            const { name, photo } = user
            setloggedIn(true);
            setuserInfo([name, photo])
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Signin in progress');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('PLAY_SERVICES_NOT_AVAILABLE');
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setloggedIn(false);
            setuserInfo([]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            {loggedIn && userInfo.length ?
                <View>
                    <Text style={styles.welcomeHeader}>Hello {userInfo[0]}</Text>
                    {userInfo[1] && <Image source={{ uri: userInfo[1] }} style={styles.imageProfile} />}
                    <TouchableOpacity onPress={signOut} >
                        <Text style={[styles.button, styles.logout]}>Logout</Text>
                    </TouchableOpacity>
                </View>
                :
                <View>
                    <Text style={styles.welcomeHeader}>Welcome!</Text>
                    <GoogleSigninButton
                        style={[styles.button, styles.googleButton]}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={signIn}
                    />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    welcomeHeader: {
        fontSize: 32,
        textAlign: 'center',
    },
    button: {
        alignSelf: 'center',
        margin: 20
    },
    googleButton: {
        width: 192,
        height: 48,
    },
    logout: {
        color: 'red',
        fontSize: 20
    },
    imageProfile: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    }
})
