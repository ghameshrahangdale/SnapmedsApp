import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth } from '../../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AppBar from '../../../Common/AppBar';
import { useAuth } from '../../../contexts/authContext';

const { width } = Dimensions.get('window');

const UserAccount = () => {
  const { user, userData, logout } = useAuth();
  const navigation = useNavigation();

  const handleCardPress = async (title) => {
    switch (title) {
      case 'Your Profile':
        navigation.navigate('ProfileScreen');
        break;
      case 'Your Orders':
        navigation.navigate('OrdersScreen');
        break;
      case 'Your Address':
        navigation.navigate('AddressScreen');
        break;
      case 'Payment Methods':
        navigation.navigate('PaymentScreen');
        break;
      case 'Settings':
        navigation.navigate('SettingsScreen');
        break;
      case 'Help & Support':
        navigation.navigate('SupportScreen');
        break;
      case 'Logout':
        await handleLogout();
        break;
      default:
        Toast.show({
          type: 'info',
          text1: `${title}`,
          text2: 'Feature coming soon!',
        });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      Toast.show({
        type: 'success',
        text1: 'Logout Successful',
        text2: 'You have been logged out 👋',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Logout Failed',
        text2: error.message,
      });
    }
  };

  const accountOptions = [
    {
      title: 'Your Profile',
      subtitle: 'Manage your personal information',
      icon: 'person-outline',
      color: '#4CAF50'
    },
    {
      title: 'Your Orders',
      subtitle: 'View your order history & track orders',
      icon: 'cart-outline',
      color: '#FF9800'
    },
    {
      title: 'Your Address',
      subtitle: 'Update your delivery addresses',
      icon: 'location-outline',
      color: '#2196F3'
    },
    {
      title: 'Payment Methods',
      subtitle: 'Manage your payment options',
      icon: 'card-outline',
      color: '#9C27B0'
    },
    {
      title: 'Settings',
      subtitle: 'App preferences and notifications',
      icon: 'settings-outline',
      color: '#607D8B'
    },
    {
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      icon: 'help-circle-outline',
      color: '#795548'
    },
    {
      title: 'Logout',
      subtitle: 'Sign out from your account',
      icon: 'log-out-outline',
      color: '#F44336'
    },
  ];

  return (
    <LinearGradient
      colors={['#1E88E5', '#E3F2FD', '#FFFFFF']}
      style={styles.container}
    >
      <AppBar title="My Account" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri:
                  user?.photoURL ||
                  userData?.photoURL ||
                  'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
              }}
              style={styles.profileImage}
            />
            <TouchableOpacity 
              style={styles.editProfileButton}
              onPress={() => navigation.navigate('ProfileScreen')}
            >
              <Icon name="camera-outline" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {user?.displayName || userData?.displayName || 'Guest User'}
            </Text>
            <Text style={styles.profileEmail}>
              {user?.email || userData?.email || 'Not logged in'}
            </Text>
            <View style={styles.profileStatus}>
              <View style={[styles.statusDot, { backgroundColor: user ? '#4CAF50' : '#FF9800' }]} />
              <Text style={styles.statusText}>
                {user ? 'Verified Account' : 'Guest Mode'}
              </Text>
            </View>
          </View>
        </View>

        {/* Account Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Delivered</Text>
          </View>
        </View>

        {/* Account Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.cardContainer}>
            {accountOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => handleCardPress(option.title)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: `${option.color}15` }]}>
                  <Icon name={option.icon} size={22} color={option.color} />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{option.title}</Text>
                  <Text style={styles.cardSubtitle}>{option.subtitle}</Text>
                </View>
                <Icon name="chevron-forward" size={20} color="#B0BEC5" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>MediCare App v1.0.0</Text>
          <Text style={styles.appTagline}>Your Health, Our Priority</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 24,
  },
  profileHeader: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#1E88E5',
  },
  editProfileButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1E88E5',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#033c6b',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#757575',
    marginBottom: 8,
  },
  profileStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  statsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1E88E5',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#757575',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0E0E0',
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#033c6b',
    marginLeft: 8,
  },
  cardContainer: {
    gap: 12,
  },
  card: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#033c6b',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#757575',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  appVersion: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#666',
    marginBottom: 4,
  },
  appTagline: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#999',
  },
});

export default UserAccount;