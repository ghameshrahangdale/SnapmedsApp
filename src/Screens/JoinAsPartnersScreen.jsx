import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const JoinAsPartnersScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#033c6b', '#1b6ca8']} style={styles.container}>
      <Text style={styles.heading}>Become a Partner</Text>

      {/* Pharmacy Partner */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Pharmacy/Login')}
        style={styles.button}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://img.freepik.com/premium-vector/pharmacy-with-pharmacist-client-counter_36082-604.jpg' }}
            style={styles.image}
          />
          <View style={styles.overlay}>
            <Text style={styles.imageText}>Pharmacy Partner</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Delivery Partner */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Delivery/Login')}
        style={styles.button}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://img.freepik.com/premium-vector/way-concept-vector-illustration_1354720-3574.jpg' }}
            style={styles.image}
          />
          <View style={styles.overlay}>
            <Text style={styles.imageText}>Delivery Boy</Text>
          </View>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    marginBottom: 20,
    fontSize: 26,
    color: "#38b6ff",
    fontFamily: 'Poppins-Bold',
  },
  button: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
  },
});

export default JoinAsPartnersScreen;
