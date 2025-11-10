import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import auth from '@react-native-firebase/auth'; // adjust if you're using different firebase setup

// Screens
import SplashScreen from "../Screens/SplashScreen";
import LoginScreen from "../Screens/LoginScreen";
import SignUp from "../Screens/SignUp";
import BrowseMedicines from "../Components/Users/BrowseMedicines";
import JoinAsPartnersScreen from "../Screens/JoinAsPartnersScreen";
import PharmacyLogin from "../Components/PharmacyPartners/Login/PharmacyLogin";
import PharmacyRegister from "../Components/PharmacyPartners/Register/PharmacyRegister";
import PharmacyDashboard from "../Components/PharmacyPartners/PharmacyDashboard/PharmacyDashboard";
import DeliveryLogin from "../Components/DeliveryPartner/Login/DeliveryLogin";
import DeliveryRegister from "../Components/DeliveryPartner/Register/DeliveryRegister";
import DeliveryDashboard from "../Components/DeliveryPartner/DeliveryDashboard/DeliveryDashboard";
import Checkout from "../Components/Checkout/Checkout";
import OrderConfirmation from "../Components/Checkout/OrderConfirmation";
import ProfileScreen from "../Screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) return null; // or Splash screen

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Show different routes based on auth state */}
      {!user ? (
        // Not logged in
        <>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      ) : (
        // Logged in
        <>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="BrowseMedicines" component={BrowseMedicines} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />
        </>
      )}

      {/* Common Partner Screens - Optional: You can also restrict based on user roles */}
      <Stack.Screen name="JoinAsPartners" component={JoinAsPartnersScreen} />
      <Stack.Screen name="Pharmacy/Login" component={PharmacyLogin} />
      <Stack.Screen name="PharmacyRegister" component={PharmacyRegister} />
      <Stack.Screen name="PharmacyDashboard" component={PharmacyDashboard} />
      <Stack.Screen name="Delivery/Login" component={DeliveryLogin} />
      <Stack.Screen name="DeliveryRegister" component={DeliveryRegister} />
      <Stack.Screen name="DeliveryDashboard" component={DeliveryDashboard} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
