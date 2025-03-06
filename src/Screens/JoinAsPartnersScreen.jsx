import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const JoinAsPartnersScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Join as a Partner</Text>

      {/* Pharmacy Partner Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Pharmacy/Login')}
        style={styles.button}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://img.freepik.com/premium-vector/pharmacy-with-pharmacist-client-counter_36082-604.jpg' }}
            style={styles.image}
          />
        </View>
        <Text style={styles.text}>Join as Pharmacy Partner</Text>
      </TouchableOpacity>

      {/* Delivery Partner Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Delivery/Login')}
        style={styles.button}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://img.freepik.com/premium-vector/way-concept-vector-illustration_1354720-3574.jpg' }}
            style={styles.image}
          />
        </View>
        <Text style={styles.text}>Join as Delivery Partner</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    marginBottom: 30,
    fontWeight: 'bold',
    fontSize: 25,
    color:"#38b6ff"
  },
  button: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    width: 200, // Increased size
    height: 200, // Increased size
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#38b6ff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default JoinAsPartnersScreen;
