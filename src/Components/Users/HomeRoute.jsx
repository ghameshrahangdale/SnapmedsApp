import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { IconButton, Menu } from 'react-native-paper';
import LocationPicker from './LocationPicker';
import UploadPrescription from './UploadPrescription';
import CategoriesSection from './CategorySection';
import PopularMedicines from './PopularMedicines';
import { auth } from '../../firebaseConfig'; // adjust path as needed


export default function HomeRoute({
  setActiveTab,
  location,
  setLocation,
  locationVisible,
  setLocationVisible,
  menuVisible,
  setMenuVisible,
  handleLogout,
  navigation,
  cart,
  search,
  setSearch,
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    setUser(currentUser);
  }, []);

  return (
    <LinearGradient
      colors={['#1E88E5', '#E3F2FD', '#E3F2FD', '#E3F2FD', '#E3F2FD']}
      style={styles.container}
    >
      {/* Status Bar */}
      <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />

      <Text style={styles.snapMedsText}>Snapmeds in</Text>
      <Text style={styles.deliveryTimeText}>29 Minutes Delivery</Text>

      <View style={styles.locationContainer}>
        <TouchableOpacity
          style={styles.locationWrapper}
          onPress={() => setLocationVisible(true)}
        >
          <MaterialIcons name="location-on" size={22} color="#033c6b" />
          <Text style={styles.locationText}>{location}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={18} color="#fff" />
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <IconButton
            icon="cart"
            size={26}
            onPress={() => setActiveTab('cart')}
            iconColor="#033c6b"
          />
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Image
                  source={{
                    uri:
                      user?.photoURL ||
                      'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                  }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            }
          >
            <Menu.Item
              onPress={() => navigation.navigate('MyProfile')}
              title="My Profile"
            />
            <Menu.Item
              onPress={() => navigation.navigate('Orders')}
              title="Orders"
            />
            <Menu.Item onPress={handleLogout} title="Logout" />
          </Menu>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={22}
          color="#757575"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Search Medicine Ex Paracetamol"
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#B0BEC5"
        />
      </View>

      {/* Scrollable Content After Search */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <UploadPrescription setActiveTab={setActiveTab} navigation={navigation}/>
        <CategoriesSection />
        <PopularMedicines />
      </ScrollView>

      {/* Location Picker Modal */}
      <LocationPicker
        visible={locationVisible}
        onClose={() => setLocationVisible(false)}
        onSelect={setLocation}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  snapMedsText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#fff',
  },
  deliveryTimeText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: '#fff',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -16,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#fff',
    marginLeft: 5,
    fontFamily: 'Poppins-Regular',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    marginTop: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    fontFamily: 'Poppins-Regular',
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
});
