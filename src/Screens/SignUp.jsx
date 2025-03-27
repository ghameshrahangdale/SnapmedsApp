import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Account Created', 'You can now log in.');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Sign-Up Error:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#033c6b', '#1b6ca8']}
        style={styles.logoContainer}>
        <Image
          source={require('../Assets/Images/flash.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Register to create your account</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInText}>
            Already have an account?{' '}
            <Text style={styles.signInLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.formContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.inputLabel}>First Name</Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="person"
                size={20}
                color="#6C7278"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input}
                placeholderTextColor="#6C7278"
              />
            </View>
          </View>

          <View style={styles.halfInputContainer}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="person"
                size={20}
                color="#6C7278"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
                placeholderTextColor="#6C7278"
              />
            </View>
          </View>
        </View>

        <Text style={styles.inputLabel}>Email</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="email"
            size={20}
            color="#6C7278"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            placeholderTextColor="#6C7278"
          />
        </View>

        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="lock"
            size={20}
            color="#6C7278"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#6C7278"
          />
        </View>

        <Text style={styles.inputLabel}>Confirm Password</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="lock"
            size={20}
            color="#6C7278"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#6C7278"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#033c6b'},
  logoContainer: {height: 260, padding: 32},
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
  signInText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  signInLink: {
    color: '#4F8EF7',
    fontFamily: 'Poppins-Regular',
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
    fontFamily: 'Poppins-Regular',
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
  },
  button: {
    width: '100%',
    backgroundColor: '#38b6ff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});

export default SignUpScreen;
