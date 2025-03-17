import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert("Account Created", "You can now log in.");
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error("Sign-Up Error:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../Assets/Images/flash.png')} style={styles.logo} />
        <Text style={styles.title}>Register</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInText}>
            Already have an account? <Text style={styles.signInLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              label="First Name"
              mode="outlined"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
            />
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              label="Last Name"
              mode="outlined"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
            />
          </View>
        </View>

        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <Text style={styles.inputLabel}>Confirm Password</Text>
        <TextInput
          label="Confirm Password"
          mode="outlined"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />

        <Button mode="contained" labelStyle={{fontFamily:"Poppins-Regular"}} style={styles.button} onPress={handleSignUp}>
          Sign Up
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#033c6b' },
  logoContainer: { height: 219, padding: 32 },
  logo: { width: 30, height: 30, marginTop: 20, marginBottom: 20 },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 10,
    fontFamily: "Poppins-Bold",
    textAlign: "left",
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#fff",
    padding: 32,
  },
  signInText: {
    color: '#FFFFFF',
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  signInLink: {
    color: '#4F8EF7',
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfInputContainer: {
    width: '48%',
  },
  inputLabel: {
    width: '100%',
    fontSize: 12,
    color: '#6C7278',
    marginBottom: 5,
    fontFamily: "Poppins-Medium",
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#38b6ff',
    padding: 5,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default SignUpScreen;