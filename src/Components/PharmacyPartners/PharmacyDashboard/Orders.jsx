import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Orders = () => {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <View style={styles.container}>
      {/* App Bar */}
      <View style={styles.appBar}>
        {/* Toggle Button */}
        <TouchableOpacity
          style={[styles.toggleButton, isOnline ? styles.online : styles.offline]}
          onPress={() => setIsOnline(!isOnline)}
        >
          <Text style={styles.toggleText}>{isOnline ? 'Online' : 'Offline'}</Text>
        </TouchableOpacity>

        {/* Notification & Dashboard Icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="notifications-none" size={26} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="space-dashboard" size={26} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Orders Section */}
      <View style={styles.ordersContainer}>
        <Text style={styles.orderText}>Orders List</Text>
        <View style={styles.centeredContainer}>
          <Text style={styles.placeholderText}>No new orders available</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F8F9FA',
  },
  appBar: {
    height: 60, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#117A65', 
    elevation: 4, 
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  online: {
    backgroundColor: '#D4EDDA', 
  },
  offline: {
    backgroundColor: '#F8D7DA', 
  },
  toggleText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
  ordersContainer: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 10,
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#757575',
  },
});

export default Orders;
 