import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Card, Button, IconButton, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import LocationPicker from './LocationPicker';
import Categories from './Navigations/Categories';
import UploadRX from './Navigations/UploadRX';
import Cart from './Navigations/Cart';
import Account from './Navigations/Account';

export default function BrowseMedicines() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();
  const [location, setLocation] = useState('Choose Your Location');
  const [locationVisible, setLocationVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('home');


  // Logout function
  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.replace('LoginScreen');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Home Tab
  const HomeRoute = () => (
    <LinearGradient
      colors={['#1E88E5', '#E3F2FD', '#E3F2FD', '#E3F2FD', '#E3F2FD']}
      style={styles.container}>
      <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: '#fff' }}>
        Snapmeds in
      </Text>
      <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 22, color: '#fff' }}>
        59 Minutes Delivery
      </Text>
      <View style={styles.locationContainer}>
        <TouchableOpacity
          style={styles.locationWrapper}
          onPress={() => setLocationVisible(true)}>
          <MaterialIcons name="location-on" size={22} color="#033c6b" />
          <Text style={styles.locationText}>{location}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={18} color="#fff" />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <IconButton
            icon="cart"
            size={26}
            onPress={() => navigation.navigate('Cart', { cart })}
            iconColor="#033c6b"
          />
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Image
                  source={require('../../Assets/Images/background.jpg')}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            }>
            <Menu.Item onPress={() => navigation.navigate('MyProfile')} title="My Profile" />
            <Menu.Item onPress={() => navigation.navigate('Orders')} title="Orders" />
            <Menu.Item onPress={handleLogout} title="Logout" />
          </Menu>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={22} color="#757575" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search Medicine Ex Paracetamol"
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#B0BEC5"
        />
      </View>

      {/* Search by Categories Section */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesTitle}>Search by Categories</Text>
        <View style={styles.categoriesList}>
          {[
            { name: 'Pain Relief' },
            { name: 'Cold & Cough' },
            { name: 'Diabetes' },
            { name: 'Heart Care' },
            { name: 'Vitamins' },
            { name: 'Skin Care' },
            { name: 'Weight Management' },
            { name: 'Immunity Boosters' },
          ].map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryItem}
              onPress={() => console.log(`Selected: ${category.name}`)}>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Upload Prescription Section */}
      <View style={styles.uploadContainer}>
        <Text style={styles.uploadText}>Order with Prescription</Text>
        <Text style={styles.SubText}>Upload Prescription and we will deliver medicine at your door step</Text>

        <Button
          mode="contained"
          color="#033c6b"
          labelStyle={{ fontFamily: 'Poppins-Regular' }}
          style={styles.uploadButton}
          onPress={() => navigation.navigate('OrderByPrescription')}>
          Upload Prescription
        </Button>
      </View>

      {/* Location Picker Modal */}
      <LocationPicker
        visible={locationVisible}
        onClose={() => setLocationVisible(false)}
        onSelect={setLocation}
      />
    </LinearGradient>
  );
  
  // Renders the correct content based on the selected tab
  const renderScene = () => {
    switch (activeTab) {
      case 'home':
        return <HomeRoute />;
      case 'categories':
        return <Categories/>;
      case 'upload':
        return <UploadRX setActiveTab={setActiveTab}/>;
      case 'cart':
        return <Cart />;
      case 'account':
        return <Account />;
      default:
        return <HomeRoute />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScene()}

      {/* Custom Bottom Navigation */}
      <View style={styles.bottomNav}>
        {[
          { key: 'home', title: 'Home', icon: 'home' },
          { key: 'categories', title: 'Categories', icon: 'apps' },
          { key: 'upload', title: 'Upload RX', icon: 'file-upload' },
          { key: 'cart', title: 'Cart', icon: 'shopping-cart' },
          { key: 'account', title: 'Account', icon: 'person' },
        ].map(route => (
          <TouchableOpacity
            key={route.key}
            style={styles.navItem}
            onPress={() => setActiveTab(route.key)}>
            <MaterialIcons
              name={route.icon}
              size={26}
              color={activeTab === route.key ? '#1E88E5' : '#fff'}
            />
            <Text
              style={[
                styles.labelText,
                { color: activeTab === route.key ? '#1E88E5' : '#fff' },
              ]}>
              {route.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    borderRadius: 20,
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
  uploadContainer: {
    width: '100%',
    marginTop: 16,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    borderRadius: 10,
  },
  uploadText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#033c6b',
  },
  SubText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#757575',
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 16,
  },
  uploadButton: {
    width: '100%',
    backgroundColor: '#033c6b',
    borderRadius: 8,
  },
  centeredContainer: {
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
    justifyContent: 'space-around',
    backgroundColor: '#033c6b',
    height: 65,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 9,
    marginTop: 2,
  },

  //Catogories
  categoriesContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius:10,
  },
  categoriesTitle: {
    fontSize: 12,
    marginBottom: 12,
    fontFamily:"Poppins-Bold"
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '23%',
    height: 120,
    aspectRatio: 1, // Ensures the item is square
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 9,
    textAlign: 'center',
    fontFamily:"Poppins-Regular"
  },

});