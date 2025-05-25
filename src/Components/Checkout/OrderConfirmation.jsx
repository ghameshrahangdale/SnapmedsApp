import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderConfirmation = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#1E88E5', '#E3F2FD', '#E3F2FD']}
      style={styles.container}
    >
      <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />

      {/* AppBar */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Order Confirmed</Text>
      </View>

      <View style={styles.contentBox}>
        <Icon name="checkmark-circle" size={100} color="#1E88E5" style={styles.icon} />
        <Text style={styles.title}>Thank You!</Text>
        <Text style={styles.message}>Your order has been placed successfully.</Text>
        <Text style={styles.subMessage}>You will receive a confirmation SMS shortly.</Text>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('home')}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    position: 'absolute',
    top: 20,
    left: 16,
    right: 16,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  appBarTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    marginLeft: 12,
  },
  contentBox: {
    flex: 1,
    marginTop: 100,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    color: '#1E88E5',
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
    marginBottom: 4,
  },
  subMessage: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  homeButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

export default OrderConfirmation;
