import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const Checkout = ({ route, navigation }) => {
  const { cartItems } = route.params;
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('ASAP');
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const deliveryFee = 40;

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalPrice = () => {
    return (getSubtotal() + deliveryFee).toFixed(2);
  };

  const handlePlaceOrder = () => {
    Alert.alert('Order Placed!', 'Your order has been successfully placed.');
    navigation.navigate('OrderConfirmation'); // Replace 'home' with 'OrderConfirmation'
  };
  

  return (
    <LinearGradient
      colors={['#1E88E5', '#E3F2FD', '#E3F2FD', '#E3F2FD']}
      style={styles.container}
    >
      <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />

      {/* App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Checkout</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressBox}>
            <Text style={styles.addressText}>Home</Text>
            <Text style={styles.addressDetail}>123 Main Street, Apartment 4B, Mumbai, 400001</Text>
          </View>
          <TouchableOpacity style={styles.addAddressBtn}>
            <Text style={styles.addAddressText}>+ Add New Address</Text>
          </TouchableOpacity>
        </View>

        {/* Delivery Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Date</Text>
          <View style={styles.optionRow}>
            {['Today', 'Tomorrow', 'Custom'].map(date => (
              <TouchableOpacity
                key={date}
                style={[
                  styles.optionButton,
                  selectedDate === date && styles.selectedOption,
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text style={styles.optionText}>{date}</Text>
                <Text style={styles.subText}>
                  {date === 'Today'
                    ? '30 min delivery'
                    : date === 'Tomorrow'
                    ? 'Apr 19'
                    : 'Choose date'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Delivery Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Time</Text>
          <View style={styles.optionRow}>
            {['ASAP', 'Afternoon', 'Evening'].map(time => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.optionButton,
                  selectedTime === time && styles.selectedOption,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={styles.optionText}>{time}</Text>
                <Text style={styles.subText}>
                  {time === 'ASAP' ? '30 min' : time === 'Afternoon' ? '1-4 PM' : '5-8 PM'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'COD' && styles.selectedPayment,
            ]}
            onPress={() => setPaymentMethod('COD')}
          >
            <Text style={styles.optionText}>Cash on Delivery</Text>
            <Text style={styles.subText}>Pay when you receive your order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'Online' && styles.selectedPayment,
            ]}
            onPress={() => setPaymentMethod('Online')}
          >
            <Text style={styles.optionText}>Online Payment</Text>
            <Text style={styles.subText}>UPI, Credit/Debit Card, Netbanking</Text>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cartItems.map(item => (
            <View key={item.id} style={styles.summaryRow}>
              <Text style={styles.label}>{item.name}</Text>
              <Text style={styles.value}>₹{item.price * item.quantity}</Text>
            </View>
          ))}
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>₹{getSubtotal()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Delivery Fee</Text>
            <Text style={styles.value}>₹{deliveryFee}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalLabel}>₹{getTotalPrice()}</Text>
          </View>
        </View>

        {/* Place Order Button */}
        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderButtonText}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: 'transparent',
  },
  appBar: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  appBarTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    marginLeft: 12,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
    color: '#000',
  },
  addressBox: {
    marginBottom: 8,
  },
  addressText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#000',
  },
  addressDetail: {
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },
  addAddressBtn: {
    marginTop: 8,
  },
  addAddressText: {
    color: '#1E88E5',
    fontFamily: 'Poppins-Regular',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    padding: 10,
    margin: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  selectedOption: {
    borderColor: '#1E88E5',
    backgroundColor: '#E3F2FD',
  },
  optionText: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
  subText: {
    fontSize: 12,
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },
  paymentOption: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginVertical: 6,
    backgroundColor: '#f9f9f9',
  },
  selectedPayment: {
    borderColor: '#1E88E5',
    backgroundColor: '#E3F2FD',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  label: {
    color: '#444',
    fontFamily: 'Poppins-Regular',
  },
  value: {
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  totalLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#000',
  },
  placeOrderButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

export default Checkout;
