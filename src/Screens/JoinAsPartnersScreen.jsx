import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const JoinAsPartnersScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Become a Partner</Text>
      <Text style={styles.subtitle}>
        Join our network of healthcare providers and delivery partners to make healthcare accessible to millions
      </Text>

      {/* Pharmacy Partner Card */}
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://img.freepik.com/premium-vector/pharmacy-with-pharmacist-client-counter_36082-604.jpg' }}
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle}>Pharmacy Partner</Text>
        <Text style={styles.cardDescription}>
          Join our network of pharmacies and expand your business reach. Get access to thousands of customers and grow your revenue.
        </Text>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={() => navigation.navigate('Pharmacy/Login')}
        >
          <Text style={styles.buttonText}>Join Now</Text>
        </TouchableOpacity>
      </View>

      {/* Delivery Partner Card */}
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://img.freepik.com/premium-vector/way-concept-vector-illustration_1354720-3574.jpg' }}
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle}>Delivery Partner</Text>
        <Text style={styles.cardDescription}>
          Be your own boss! Join our delivery network and earn competitive income while helping people access essential medicines.
        </Text>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={() => navigation.navigate('Delivery/Login')}
        >
          <Text style={styles.buttonText}>Join Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 6,
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
    fontFamily: 'Poppins-Regular',
  },
  joinButton: {
    backgroundColor: '#033c6b',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
   
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
});

export default JoinAsPartnersScreen;
