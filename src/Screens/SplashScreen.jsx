import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Snapmeds</Text>
      <Text style={styles.title}>Nagpur's First Medicine Delivery Application Designed  By Nagpurkars for Nagpurkars. Aims to Deliver medicines in 60 Minutes</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#033c6b',
  },
  logo: {
    fontSize: 50,
    fontWeight: 'bold',
    color:"#38b6ff",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"#fff",
    marginBottom: 20,
    padding:20
  },
  button: {
    backgroundColor: '#38b6ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
