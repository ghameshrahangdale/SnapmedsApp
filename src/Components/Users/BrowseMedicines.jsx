import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HomeRoute from './HomeRoute'; // Import the new HomeRoute component
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
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

  // Renders the correct content based on the selected tab
  const renderScene = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeRoute
            location={location}
            setActiveTab={setActiveTab}
            setLocation={setLocation}
            setLocationVisible={setLocationVisible}
            menuVisible={menuVisible}
            setMenuVisible={setMenuVisible}
            handleLogout={handleLogout}
            navigation={navigation}
            search={search}
            setSearch={setSearch}
            locationVisible={locationVisible}
            cart={cart}
          />
        );

      case 'search':
        return <Categories />;
      case 'upload':
        return <UploadRX setActiveTab={setActiveTab} />;
      case 'cart':
        return <Cart />;
      case 'account':
        return <Account />;
      default:
        return <HomeRoute />;
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor="#1E88E5"  // customize this color to match your theme
        barStyle="light-content"   // or "dark-content" depending on background
      />
      {renderScene()}

      {/* Custom Bottom Navigation */}
      <View style={styles.bottomNav}>
        {[
          {key: 'home', title: 'Home', icon: 'home'},
          {key: 'search', title: 'Search', icon: 'search'},
          {key: 'upload', title: 'Upload RX', icon: 'file-upload'},
          {key: 'cart', title: 'Cart', icon: 'shopping-cart'},
          {key: 'account', title: 'Account', icon: 'person'},
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
                {color: activeTab === route.key ? '#1E88E5' : '#fff'},
              ]}>
              {route.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// Styles for BrowseMedicines component
const styles = StyleSheet.create({
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
});
