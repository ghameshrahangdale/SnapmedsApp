import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text, Button } from 'react-native-paper';

const SplashScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('../Assets/Images/background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text variant="displayMedium" style={styles.logo}>
          Snapmeds
        </Text>

        <Text variant="bodyLarge" style={styles.title}>
          Nagpur's First Medicine Delivery Application. Designed by Nagpurkars for Nagpurkars. Aims to deliver medicines in 60 minutes.
        </Text>

        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('LoginScreen')}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Get Started
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Align children at the bottom
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay for better contrast
    padding: 20,
    paddingBottom: 50, // Extra padding at the bottom
  },
  logo: {
    fontWeight: 'bold',
    color: "#38b6ff",
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#000"
  },
});

export default SplashScreen;
