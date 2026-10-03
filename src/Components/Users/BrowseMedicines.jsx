import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

import HomeRoute from './HomeRoute';
import Categories from './Tabs/Categories';
import UploadRX from './Tabs/UploadRX';
import Cart from './Tabs/Cart';
import Account from './Tabs/Account';

const Tab = createBottomTabNavigator();

export default function BrowseMedicines() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [location, setLocation] = useState('Choose Your Location');
  const [locationVisible, setLocationVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.replace('LoginScreen');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabelStyle: styles.labelText,
          tabBarStyle: styles.bottomNav,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Search':
                iconName = 'search';
                break;
              case 'UploadRX':
                iconName = 'file-upload';
                break;
              case 'Cart':
                iconName = 'shopping-cart';
                break;
              case 'Account':
                iconName = 'person';
                break;
              default:
                iconName = 'home';
            }

            return (
              <MaterialIcons
                name={iconName}
                size={26}
                color={focused ? '#1E88E5' : '#fff'}
              />
            );
          },
          tabBarActiveTintColor: '#1E88E5',
          tabBarInactiveTintColor: '#fff',
        })}>
        <Tab.Screen name="Home">
          {() => (
            <HomeRoute
              location={location}
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
          )}
        </Tab.Screen>
        <Tab.Screen name="Search" component={Categories} />
        <Tab.Screen name="UploadRX">
          {() => <UploadRX />}
        </Tab.Screen>
        <Tab.Screen name="Cart">
          {() => <Cart navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </>
  );
}

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
  labelText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 9,
    marginTop: 2,
  },
});
