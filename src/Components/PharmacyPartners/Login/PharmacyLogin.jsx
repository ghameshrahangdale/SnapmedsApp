import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const PharmacyLogin = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.titleMedium}>
        Welcome Back to Snapmeds!
      </Text>
      <Text variant="headlineSmall" style={styles.title}>
        Login to your Pharmacy Partner Account
      </Text>

      <TextInput
        label="Enter your email"
        mode="flat"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        label="Enter your password"
        mode="flat"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={() => console.log('Forgot Password?')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => console.log('Login Pressed')}>
        Login
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate('Pharmacy/Register')}>
        <Text style={styles.register}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ecfcff', // Light blue background
  },
  titleMedium: {
    textAlign: 'center',
    color: '#38b6ff',
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 18,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff', // White input background
  },
  forgotPassword: {
    textAlign: 'left',
    color: '#033c6b',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#033c6b', // Dark blue primary button
    borderRadius: 8,
    marginBottom: 10,
  },
  register: {
    textAlign: 'center',
    color: '#033c6b',
    marginTop: 15,
    fontWeight: 'bold',
  },
});

export default PharmacyLogin;
