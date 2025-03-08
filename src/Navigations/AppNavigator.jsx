import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../Screens/SplashScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignUp from '../Screens/SignUp';
import BrowseMedicines from '../Components/Users/BrowseMedicines';
import Cart from '../Components/Cart/Cart';
import JoinAsPartnersScreen from '../Screens/JoinAsPartnersScreen';
import PharmacyLogin from '../Components/PharmacyPartners/Login/PharmacyLogin';
import PharmacyRegister from '../Components/PharmacyPartners/Register/PharmacyRegister';
import DeliveryLogin from '../Components/DeliveryPartner/Login/DeliveryLogin';
import PharmacyHome from '../Components/PharmacyPartners/PharmacyHome';
import OrderByPrescription from '../Components/Users/OrderByPrescription';


const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="BrowseMedicines" component={BrowseMedicines} />
      <Stack.Screen name="OrderByPrescription" component={OrderByPrescription}/>
      <Stack.Screen name="Cart" component={Cart} />

      <Stack.Screen name="JoinAsPartners" component={JoinAsPartnersScreen} />
      <Stack.Screen name="Pharmacy/Login" component={PharmacyLogin} />
      <Stack.Screen name="Pharmacy/Register" component={PharmacyRegister} />
      <Stack.Screen name="Pharmacy/Home" component={PharmacyHome} />

      <Stack.Screen name="Delivery/Login" component={DeliveryLogin} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
