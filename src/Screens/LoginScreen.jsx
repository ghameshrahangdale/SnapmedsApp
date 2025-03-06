import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.titleMedium}>
        Welcome back to Snapmeds!
      </Text>
      <Text variant="headlineSmall" style={styles.title}>
        Login to continue
      </Text>

      <TextInput
        label="Enter your email"
        mode="flat"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        label="Enter your password"
        mode="flat"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('BrowseMedicines')}>
        Login
      </Button>

      <Button mode="text" onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Sign Up
      </Button>

      {/* Join as Partner Button at the Bottom */}
      <View style={styles.bottomContainer}>
        <Button 
          mode="contained" 
          style={styles.partnerButton} 
          onPress={() => navigation.navigate('JoinAsPartners')}
        >
          Join as Partner
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ecfcff',
  },
  titleMedium: {
    textAlign: 'center',
    color: "#38b6ff",
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 18,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#033c6b',
    borderRadius: 8,
    marginBottom: 10,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  partnerButton: {
    borderColor: '#033c6b',
    backgroundColor: '#033c6b',
    borderRadius: 8,

  },
});

export default LoginScreen;