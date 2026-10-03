import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Orders from './Orders'; // Import Orders Component
import Inventory from './Inventory';

export default function PharmacyDashboard() {
  const [activeTab, setActiveTab] = useState('orders');

  const renderScene = () => {
    switch (activeTab) {
      case 'orders':
        return <Orders />;
      case 'inventory':
        return <Inventory/>;
      case 'transactions':
        return <Text style={styles.placeholderText}>Transactions Content</Text>;
      case 'feedback':
        return <Text style={styles.placeholderText}>Feedback Content</Text>;
      case 'profile':
        return <Text style={styles.placeholderText}>Profile Content</Text>;
      default:
        return <Orders />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.contentContainer}>{renderScene()}</View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {[
          { key: 'orders', title: 'Orders', icon: 'list-alt' },
          { key: 'inventory', title: 'Inventory', icon: 'inventory' },
          { key: 'transactions', title: 'Transactions', icon: 'account-balance-wallet' },
          { key: 'feedback', title: 'Feedback', icon: 'rate-review' },
          { key: 'profile', title: 'Profile', icon: 'person' },
        ].map(route => (
          <TouchableOpacity
            key={route.key}
            style={styles.navItem}
            onPress={() => setActiveTab(route.key)}
          >
            <MaterialIcons
              name={route.icon}
              size={26}
              color={activeTab === route.key ? '#117A65' : '#B0BEC5'}
            />
            <Text
              style={[
                styles.labelText,
                { color: activeTab === route.key ? '#117A65' : '#B0BEC5' },
              ]}
            >
              {route.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#757575',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 70,
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopColor: '#F5F5F5',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    marginTop: 4,
  },
});

