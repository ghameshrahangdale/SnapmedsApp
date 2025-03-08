import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, Button, IconButton } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function OrderByPrescription({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.locationContainer}>
        <View style={styles.locationWrapper}>
          <MaterialIcons name="location-on" size={22} color="#1E88E5" />
          <Text style={styles.locationText}>Chhatrapati Square, Nagpur</Text>
        </View>
        <View style={styles.iconContainerHeader}>
          <IconButton icon="cart" size={26} onPress={() => navigation.navigate('Cart')} iconColor="#1E88E5" />
          <Image source={require('../../Assets/Images/background.jpg')} style={styles.profileImage} />
        </View>
      </View>

      {/* First Card: Order with Prescription */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="cloud-upload" size={60} color="#033c6b" />
        </View>
        <Text style={styles.title}>Order with Prescription</Text>
        <Text style={styles.subtitle}>
          Upload prescription and we will deliver your medicines
        </Text>
        <Button mode="contained" style={styles.uploadButton}>
          Upload Prescription & Checkout
        </Button>
      </View>

      {/* Second Card: How does this work? */}
      <View style={styles.card}>
        <Text style={styles.title}>How does this work?</Text>
        <View style={styles.stepContainer}>
          <Text style={styles.step}>1. Upload a photo of your prescription</Text>
          <Text style={styles.step}>2. Add delivery address and place the order</Text>
          <Text style={styles.step}>3. We will call you to confirm the medicines</Text>
          <Text style={styles.step}>4. Now, sit back! Your medicines will get delivered at your doorstep</Text>
        </View>
      </View>

      {/* Bottom Button: Search your medicine */}
      <Button mode="contained" style={styles.searchButton}>
        Search your medicine
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 0,
    marginBottom: 16,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#1E88E5',
    marginLeft: 8,
  },
  iconContainerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 8,
  },
  card: {
    width: '100%',
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 0,
    shadowOpacity: 0.1,
    marginBottom: 16,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#033c6b',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 16,
  },
  uploadButton: {
    backgroundColor: '#033c6b',
    borderRadius: 8,
    width: '100%',
    alignSelf: 'center',
  },
  searchButton: {
    backgroundColor: '#38b6ff',
    borderRadius: 8,
    width: '100%',
    alignSelf: 'center',
  },
  stepContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  step: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
});
