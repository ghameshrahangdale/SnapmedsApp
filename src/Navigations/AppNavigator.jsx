import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../Screens/SplashScreen";
import LoginScreen from "../Screens/LoginScreen";
import SignUp from "../Screens/SignUp";
import BrowseMedicines from "../Components/Users/BrowseMedicines";
import Cart from "../Components/Cart/Cart";
import JoinAsPartnersScreen from "../Screens/JoinAsPartnersScreen";
import PharmacyLogin from "../Components/PharmacyPartners/Login/PharmacyLogin";
import PharmacyRegister from "../Components/PharmacyPartners/Register/PharmacyRegister";
import DeliveryLogin from "../Components/DeliveryPartner/Login/DeliveryLogin";
import PharmacyDashboard from "../Components/PharmacyPartners/PharmacyDashboard";
import DeliveryRegister from "../Components/DeliveryPartner/Register/DeliveryRegister";
import DeliveryDashboard from "../Components/DeliveryPartner/DeliveryDashboard/DeliveryDashboard";


const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Main Screens */}
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="BrowseMedicines" component={BrowseMedicines} />
      
      <Stack.Screen name="Cart" component={Cart} />

      {/* Partner Screens */}
      <Stack.Screen name="JoinAsPartners" component={JoinAsPartnersScreen} />
      <Stack.Screen name="Pharmacy/Login" component={PharmacyLogin} />
      <Stack.Screen name="PharmacyRegister" component={PharmacyRegister} />
      <Stack.Screen name="PharmacyDashboard" component={PharmacyDashboard} />

      {/* Delivery Partner Screens */}
      <Stack.Screen name="Delivery/Login" component={DeliveryLogin} />
      <Stack.Screen name="DeliveryRegister" component={DeliveryRegister} />
      <Stack.Screen name="DeliveryDashboard" component={DeliveryDashboard} />

      
    </Stack.Navigator>
  );
};

export default AppNavigator;
