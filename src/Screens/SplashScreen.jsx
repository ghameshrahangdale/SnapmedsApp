import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native-paper';

const SplashScreen = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1.1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, scaleAnim]);

  return (
    <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
      <LinearGradient colors={['#033c6b', '#1b6ca8']} style={styles.gradient}>
      <StatusBar backgroundColor="#033c6b" barStyle="light-content" />
        <View style={styles.container}>
          <Image source={require('../Assets/Images/flash.png')} style={styles.logoImage} />
          <Text variant="displayMedium" style={styles.logo}>
            snapmeds
          </Text>
          <Text variant="bodyLarge" style={styles.title}>
            Instant Medicine Delivery App
          </Text>
          <Text variant="bodyLarge" style={styles.title2}>
            Get medicines delivered in just 30M
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    color: "#fff",
    textAlign: 'center',
    marginBottom: 7,
    fontFamily: "Poppins-ExtraBold",
    fontSize: 50,
  },
  logoImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: "Poppins-Regular",
    fontSize: 17,
  },
  title2: {
    color: "#fff",
    textAlign: 'center',
    marginBottom: 7,
    fontFamily: "Poppins-Regular",
    fontSize: 11,
  },
});

export default SplashScreen;
