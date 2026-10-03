import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('ghameshrahangdale83@gmail.com');
  const [password, setPassword] = useState('Ghamesh@123');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      // 1. Sign in with email and password
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      console.log("User Login --------", user);

      // 2. Firestore user handling
      if (user?.uid) {
        const userRef = firestore().collection('users').doc(user.uid);
        const docSnap = await userRef.get();
        console.log("User Document Snapshot ----", docSnap);

        if (!docSnap.exists) {
          // Create new user document if doesn't exist
          await userRef.set({
            uid: user.uid,
            displayName: user.displayName || '',
            email: user.email,
            photoURL: user.photoURL || '',
            profileCompleted: false,
            accountStatus: "active",
            createdAt: firestore.FieldValue.serverTimestamp(),
            lastLoginAt: firestore.FieldValue.serverTimestamp(),
          });
          console.log("New user added to Firestore");
        } else {
          // Update existing user document
          await userRef.update({
            accountStatus: "active",
            lastLoginAt: firestore.FieldValue.serverTimestamp(),
            ...(user.displayName && { displayName: user.displayName }),
            ...(user.photoURL && { photoURL: user.photoURL }),
          });
          console.log("Existing user updated in Firestore");
        }
      }

      Toast.show({
        type: 'success',
        text1: 'Login Successful!',
        text2: `Welcome ${user.displayName || user.email}`,
        visibilityTime: 3000,
      });

      navigation.navigate('BrowseMedicines');
    } catch (error) {
      console.error('Login Error:', error);
      let errorMessage = 'Invalid credentials. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }
      
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: errorMessage,
        visibilityTime: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

   async function onGoogleButtonPress() {
    try {
      
      setLoading(true);

      // 1. Ensure Play Services
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // 2. Sign In
      const userSingin = await GoogleSignin.signIn();
      const idToken = userSingin.data.idToken;
      console.log("Google Sign-In Response ----", userSingin);
      if (!idToken) throw new Error('No idToken from Google Sign-In');

      // 3. Firebase credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // 4. Sign in with Firebase
      const result = await auth().signInWithCredential(googleCredential);
      const user = result.user;

      console.log("User Login --------", user);

      // 5. Firestore user handling
   
      if (user?.uid) {
    
        const userRef = firestore().collection('users').doc(user.uid);
        const docSnap = await userRef.get();
        console.log( "User Document Snapshot ----", docSnap, );

        if (!docSnap._exists) {
          await userRef.set({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            profileCompleted: false,
            accountStatus: "active",
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
          console.log("New user added to Firestore");
        } else if (docSnap.data()?.accountStatus === "inactive") {
          await userRef.update({
            accountStatus: "active",
            displayName: user.displayName,
            photoURL: user.photoURL,
            updatedAt: firestore.FieldValue.serverTimestamp(),
          });
        }
      }

      Toast.show({
        type: 'success',
        text1: 'Welcome!',
        text2: 'You have successfully signed in with Google.',
        visibilityTime: 3000,
      });

    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please Try Again',
      });
    } finally {
      setLoading(false);
    }
  }


  return (
    <View style={styles.container}>
      {/* Logo & Title Section with Linear Gradient */}
      <LinearGradient
        colors={['#033c6b', '#1b6ca8']}
        style={styles.logoContainer}>
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
      </LinearGradient>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            placeholderTextColor="#6C7278"
          />
          <Ionicons name="mail" size={20} color="#6C7278" style={styles.icon} />
        </View>

        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.inputContainer}>

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#6C7278"
          />
          <Ionicons
            name="lock-closed"
            size={20}
            color="#6C7278"
            style={styles.icon}
          />
        </View>

        {/* Forgot Password Link */}
        <View style={styles.rowContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button with Activity Indicator */}
        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        {/* Alternative Login Option */}
        <Text style={styles.orText}>Or</Text>
        <TouchableOpacity style={styles.buttonGoogle} onPress={onGoogleButtonPress}>
          <Image
            source={require('../Assets/Images/google.png')}
            style={styles.googleIcon}
          />
          <Text style={styles.buttonGoogleText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('JoinAsPartners')}>
          <Text style={styles.partnerText}>Partner With Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  logoContainer: { height: 260, padding: 32, justifyContent: 'center' },
  logo: { width: 30, height: 30, marginTop: 20, marginBottom: 20 },
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
    fontSize: 16,
    color: '#6C7278',
    marginBottom: 5,
    fontFamily: 'Poppins-Medium',
  },
  inputContainer: {
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
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
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
    padding: 12,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#6C7278',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  buttonGoogle: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
  buttonGoogleText: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  orText: {
    color: '#6C7278',
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
});

export default LoginScreen;