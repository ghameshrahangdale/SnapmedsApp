import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {TextInput, Button, Text, Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setSnackbarMessage('Please enter both email and password.');
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      setSnackbarMessage('Login Successful! Welcome.');
      setSnackbarVisible(true);
      navigation.navigate('BrowseMedicines');
    } catch (error) {
      console.error('Login Error:', error);
      setSnackbarMessage('Invalid credentials. Please try again.');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo & Title Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../Assets/Images/flash.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Sign in to browse Medicines</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}>
            Don't have an account?{' '}
            <Text style={styles.signUpLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
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

        {/* Forgot Password Link */}
        <View style={styles.rowContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button with Activity Indicator */}
        <Button
          mode="contained"
          labelStyle={{fontFamily: 'Poppins-Regular'}}
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : 'Sign In'}
        </Button>

        {/* Alternative Login Option */}
        <Text style={styles.orText}>-- Or login with --</Text>
        <View style={styles.socialButtons}>
          <Button
            mode="outlined"
            labelStyle={{fontFamily: 'Poppins-Regular'}}
            style={styles.buttonGoogle}
            icon="google">
            Continue with Google
          </Button>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('JoinAsPartners')}>
          <Text style={styles.partnerText}>Partner With Us</Text>
        </TouchableOpacity>
      </View>

      {/* Snackbar for Login Success/Failure Messages */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}>
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#033c6b'},
  logoContainer: {height: 263, padding: 32},
  logo: {width: 30, height: 30, marginTop: 20, marginBottom: 20},
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
    textAlign: 'left',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 32,
  },
  signUpText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  partnerText: {
    color: '#6C7278',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  signUpLink: {
    color: '#4F8EF7',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  inputLabel: {
    width: '100%',
    fontSize: 12,
    color: '#6C7278',
    marginBottom: 5,
    fontFamily: 'Poppins-Medium',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 10,
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  forgotPassword: {
    color: '#4F8EF7',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  button: {
    width: '100%',
    backgroundColor: '#38b6ff',
    padding: 5,
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonGoogle: {
    width: '100%',
    padding: 5,
    marginVertical: 10,
    borderRadius: 10,
    color: '#000',
  },
  orText: {
    color: '#6C7278',
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});

export default LoginScreen;
